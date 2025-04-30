import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SectionItem = {
  id: string
  type: string
  title?: string
  subtitle?: string
  organization?: string
  date?: string
  description?: string
  bullets: string[]
  [key: string]: any
}

export type Section = {
  id: string
  title: string
  items: SectionItem[]
}

export type ResumeData = {
  name: string
  description: string
  contact: {
    email: string
    phone: string
    location: string
    [key: string]: any
  }
  sections: Section[]
}

export type ResumeColors = {
  background: string
  title: string
  subtitle: string
  text: string
  border: string
  accent: string
  [key: string]: string
}

export type ResumeState = {
  resume: ResumeData
  colors: ResumeColors
  layout: 'one-column' | 'two-column'
  page: { width: number; height: number }
}

export type ResumeHistoryStore = {
  past: ResumeState[]
  present: ResumeState
  future: ResumeState[]
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  updateResume: (data: Partial<ResumeData>) => void
  updateColors: (colors: Partial<ResumeColors>) => void
  updateLayout: (layout: 'one-column' | 'two-column') => void
  updatePage: (page: Partial<{ width: number; height: number }>) => void
  reset: () => void
}

export const defaultColors: ResumeColors = {
  background: '#ffffff',
  title: '#22223b',
  subtitle: '#4a4e69',
  text: '#22223b',
  border: '#e0e0e0',
  accent: '#3a86ff',
}

const defaultResume: ResumeData = {
  name: '',
  description: '',
  contact: { email: '', phone: '', location: '' },
  sections: [],
}

const defaultState: ResumeState = {
  resume: defaultResume,
  colors: defaultColors,
  layout: 'two-column',
  page: { width: 210, height: 297 },
}

function makePresent(state: ResumeHistoryStore) {
  return {
    resume: state.present.resume,
    colors: state.present.colors,
    layout: state.present.layout,
    page: state.present.page,
  }
}

export const useResumeHistoryStore = create<ResumeHistoryStore>()(
  persist(
    (set, get) => ({
      past: [],
      present: defaultState,
      future: [],
      canUndo: false,
      canRedo: false,
      undo: () => {
        const { past, present, future } = get()
        if (past.length === 0) return
        const previous = past[past.length - 1]
        set({
          past: past.slice(0, -1),
          present: previous,
          future: [present, ...future],
          canUndo: past.length - 1 > 0,
          canRedo: true,
        })
      },
      redo: () => {
        const { past, present, future } = get()
        if (future.length === 0) return
        const next = future[0]
        set({
          past: [...past, present],
          present: next,
          future: future.slice(1),
          canUndo: true,
          canRedo: future.length - 1 > 0,
        })
      },
      updateResume: (data) => {
        set(state => {
          const newPresent = {
            ...state.present,
            resume: {
              ...state.present.resume,
              ...data,
              contact: {
                ...state.present.resume.contact,
                ...(data.contact || {})
              }
            }
          }
          return {
            past: [...state.past, makePresent(state)],
            present: newPresent,
            future: [],
            canUndo: true,
            canRedo: false,
          }
        })
      },
      updateColors: (colors) => {
        set(state => {
          const newColors = { ...state.present.colors }
          for (const key in colors) {
            if (typeof colors[key] === 'string') {
              newColors[key] = colors[key] as string
            }
          }
          const newPresent = {
            ...state.present,
            colors: newColors
          }
          return {
            past: [...state.past, makePresent(state)],
            present: newPresent,
            future: [],
            canUndo: true,
            canRedo: false,
          }
        })
      },
      updateLayout: (layout) => {
        set(state => {
          const newPresent = {
            ...state.present,
            layout
          }
          return {
            past: [...state.past, makePresent(state)],
            present: newPresent,
            future: [],
            canUndo: true,
            canRedo: false,
          }
        })
      },
      updatePage: (page) => {
        set(state => {
          const newPresent = {
            ...state.present,
            page: { ...state.present.page, ...page }
          }
          return {
            past: [...state.past, makePresent(state)],
            present: newPresent,
            future: [],
            canUndo: true,
            canRedo: false,
          }
        })
      },
      reset: () => set({ past: [], present: defaultState, future: [], canUndo: false, canRedo: false }),
    }),
    { name: 'resume-history-storage' }
  )
)

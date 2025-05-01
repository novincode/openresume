import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type SectionItem = {
  id: string
  label1?: string
  label2?: string
  label3?: string
  notes?: string
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

export type ResumeFonts = {
  headingSize: number // For main name
  subheadingSize: number // For description, section titles
  bodySize: number // For general text, notes, bullets, secondary labels, contact
  accentSize: number // For primary item labels (e.g., job title, degree)
  contactSize: number // For contact info
  labelSize: number // For secondary labels like dates
  // Consider adding fontFamily, fontWeight etc. here later if needed
}

export type ResumeState = {
  resume: ResumeData
  colors: ResumeColors
  layout: 'one-column' | 'two-column'
  page: { width: number; height: number }
  fonts: ResumeFonts // <-- add fonts here
  previewRenderPdf?: boolean
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
  fonts: ResumeFonts
  updateFonts: (fonts: Partial<ResumeFonts>) => void
  updatePreviewRenderPdf: (val: boolean) => void
}

export const defaultColors: ResumeColors = {
  background: '#ffffff',
  title: '#22223b',
  subtitle: '#4a4e69',
  text: '#22223b',
  border: '#e0e0e0',
  accent: '#3a86ff',
}

export const defaultFonts: ResumeFonts = {
  headingSize: 28,
  subheadingSize: 18,
  accentSize: 14, // Was jobTitleSize
  bodySize: 12, // Was textSize
  contactSize: 11, // New default
  labelSize: 11, // New default
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
  fonts: defaultFonts, // <-- add fonts here
  previewRenderPdf: false,
}

const createNewSectionItem = (): SectionItem => ({
  id: uuidv4(),
  label1: '',
  label2: '',
  label3: '',
  notes: '',
  bullets: [],
})

function makePresent(state: ResumeHistoryStore): ResumeState {
  return {
    resume: state.present.resume,
    colors: state.present.colors,
    layout: state.present.layout,
    page: state.present.page,
    fonts: state.present.fonts, // Ensure fonts are included
    previewRenderPdf: state.present.previewRenderPdf,
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
      // Ensure fonts state is managed correctly
      fonts: defaultFonts, // Initialize with new defaults
      updateFonts: (fonts) => {
        set(state => {
          const newPresent = {
            ...state.present,
            fonts: { ...state.present.fonts, ...fonts }
          }
          return {
            past: [...state.past, makePresent(state)], // Add current state to past
            present: newPresent,
            future: [],
            canUndo: true,
            canRedo: false,
          }
        })
      },
      updatePreviewRenderPdf: (val) => {
        set(state => ({
          past: [...state.past, makePresent(state)],
          present: { ...state.present, previewRenderPdf: val },
          future: [],
          canUndo: true,
          canRedo: false,
        }))
      },
    }),
    { name: 'resume-history-storage' }
  )
)

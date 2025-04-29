import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Generic section item, can be extended for different types
type SectionItem = {
  id: string
  type: string // e.g. 'work', 'education', 'paragraph', etc.
  title?: string
  subtitle?: string
  organization?: string
  date?: string
  description?: string
  bullets?: string[]
  [key: string]: any // for extensibility
}

// Generic section
type Section = {
  id: string
  title: string
  items: SectionItem[]
}

// Resume data
export type ResumeData = {
  name?: string
  description?: string
  contact?: {
    email?: string
    phone?: string
    location?: string
    [key: string]: any
  }
  sections?: Section[]
}

// Store type
export type ResumeColors = {
  background: string;
  title: string;
  subtitle: string;
  text: string;
  border: string;
  accent: string;
  [key: string]: string;
};

export type ResumeStore = {
  meta: {
    version: string
    createdAt: string
  }
  colors: ResumeColors;
  layout: 'one-column' | 'two-column'
  page: {
    width: number // mm
    height: number // mm
  }
  resume: ResumeData

  // Actions
  updateResume: (data: Partial<ResumeData>) => void
  updateColors: (colors: Partial<ResumeColors>) => void
  updateColor: (key: keyof ResumeColors, value: string) => void
  updateLayout: (layout: 'one-column' | 'two-column') => void
  updatePage: (page: Partial<{ width: number; height: number }>) => void
}

type ResumeHistoryState = {
  past: ResumeStore[];
  present: ResumeStore;
  future: ResumeStore[];
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  // Wraps all update actions to record history
  updateResume: (data: Partial<ResumeData>) => void;
  updateColors: (colors: Partial<ResumeColors>) => void;
  updateColor: (key: keyof ResumeColors, value: string) => void;
  updateLayout: (layout: 'one-column' | 'two-column') => void;
  updatePage: (page: Partial<{ width: number; height: number }>) => void;
  resetResume: () => void;
}

// Helper to create a new present state from previous and patch
function patchPresent(present: ResumeStore, patch: Partial<ResumeStore>): ResumeStore {
  return {
    ...present,
    ...patch,
    page: patch.page ? { ...present.page, ...patch.page } : present.page,
    resume: patch.resume ? { ...present.resume, ...patch.resume } : present.resume,
  }
}

// Default color palette (can use Tailwind/shadcn variables or hex)
export const defaultColors: ResumeColors = {
  background: '#ffffff', // white
  title: '#22223b',      // deep blue-gray
  subtitle: '#4a4e69',   // muted blue-gray
  text: '#22223b',       // same as title for strong contrast
  border: '#e0e0e0',     // light gray
  accent: '#3a86ff',     // modern blue accent
};

// Default data for resume store (no sample resume data)
const defaultResumeStore: Omit<ResumeStore, 'updateResume' | 'updateColors' | 'updateColor' | 'updateLayout' | 'updatePage'> = {
  meta: {
    version: '1.1',
    createdAt: new Date().toISOString(),
  },
  colors: defaultColors,
  layout: 'two-column',
  page: {
    width: 210,
    height: 297,
  },
  resume: {
    // no sample data
  },
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      ...defaultResumeStore,
      updateResume: (data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            ...data,
          },
        })),
      updateColors: (colors) =>
        set((state) => ({
          colors: Object.keys(colors).reduce((acc, key) => {
            const value = colors[key as keyof ResumeColors];
            if (typeof value === 'string') {
              acc[key] = value;
            } else if (state.colors[key]) {
              acc[key] = state.colors[key];
            }
            return acc;
          }, { ...state.colors } as ResumeColors),
        })),
      updateColor: (key, value) =>
        set((state) => ({
          colors: {
            ...state.colors,
            [key]: value ?? state.colors[key],
          },
        })),
      updateLayout: (layout) => set({ layout }),
      updatePage: (page) =>
        set((state) => ({
          page: {
            ...state.page,
            ...page,
          },
        })),
      resetResume: () => set(() => ({
        ...defaultResumeStore
      })),
    }),
    {
      name: 'resume-storage',
    }
  )
)

export const useResumeHistoryStore = create<ResumeHistoryState>()(
  persist(
    (set, get) => {
      // Define the update* actions here so we can spread them into present
      const updateResume = (data: Partial<ResumeData>) => {
        const { past, present } = get()
        const next = patchPresent(present, { resume: { ...present.resume, ...data } })
        set({
          past: [...past, present].slice(-50),
          present: { ...next, updateResume, updateColors, updateColor, updateLayout, updatePage },
          future: [],
        })
      }
      const updateColors = (colors: Partial<ResumeColors>) => {
        const { past, present } = get()
        const next = patchPresent(present, { colors: Object.keys(colors).reduce((acc, key) => {
          const value = colors[key as keyof ResumeColors];
          if (typeof value === 'string') {
            acc[key] = value;
          } else if (present.colors[key]) {
            acc[key] = present.colors[key];
          }
          return acc;
        }, { ...present.colors } as ResumeColors) })
        set({
          past: [...past, present].slice(-50),
          present: { ...next, updateResume, updateColors, updateColor, updateLayout, updatePage },
          future: [],
        })
      }
      const updateColor = (key: keyof ResumeColors, value: string) => {
        const { past, present } = get()
        const next = patchPresent(present, { colors: { ...present.colors, [key]: value ?? present.colors[key] } })
        set({
          past: [...past, present].slice(-50),
          present: { ...next, updateResume, updateColors, updateColor, updateLayout, updatePage },
          future: [],
        })
      }
      const updateLayout = (layout: 'one-column' | 'two-column') => {
        const { past, present } = get()
        const next = patchPresent(present, { layout })
        set({
          past: [...past, present].slice(-50),
          present: { ...next, updateResume, updateColors, updateColor, updateLayout, updatePage },
          future: [],
        })
      }
      const updatePage = (page: Partial<{ width: number; height: number }>) => {
        const { past, present } = get()
        const next = patchPresent(present, { page: { ...present.page, ...page } })
        set({
          past: [...past, present].slice(-50),
          present: { ...next, updateResume, updateColors, updateColor, updateLayout, updatePage },
          future: [],
        })
      }

      return {
        past: [],
        present: {
          ...defaultResumeStore,
          updateResume,
          updateColors,
          updateColor,
          updateLayout,
          updatePage,
        },
        future: [],
        undo: () => {
          const { past, present, future } = get()
          if (past.length === 0) return
          const previous = past[past.length - 1]
          set({
            past: past.slice(0, -1),
            present: { ...previous, updateResume, updateColors, updateColor, updateLayout, updatePage },
            future: [present, ...future].slice(0, 50),
          })
        },
        redo: () => {
          const { past, present, future } = get()
          if (future.length === 0) return
          const next = future[0]
          set({
            past: [...past, present].slice(-50),
            present: { ...next, updateResume, updateColors, updateColor, updateLayout, updatePage },
            future: future.slice(1),
          })
        },
        clearHistory: () => set({ past: [], future: [] }),
        updateResume,
        updateColors,
        updateColor,
        updateLayout,
        updatePage,
        resetResume: () => set({
          past: [],
          present: {
            ...defaultResumeStore,
            updateResume,
            updateColors,
            updateColor,
            updateLayout,
            updatePage,
          },
          future: [],
        }),
      }
    },
    {
      name: 'resume-history-storage',
    }
  )
)

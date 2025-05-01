import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import ResumeLayoutDefault from '@/components/resume/layouts/ResumeLayoutDefault'
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'

// Export the resume as PDF and trigger download (browser)
export async function exportResumePdf() {
  const present = useResumeHistoryStore.getState().present
  const blob = await pdf(
    ResumeLayoutDefault({
      pdfRender: true,
      colors: present.colors,
      page: present.page,
      resume: present.resume,
      fonts: present.fonts,
    })
  ).toBlob()
  saveAs(blob, 'resume.pdf')
}

// Save resume as JSON file (all present data)
export function saveResume() {
  const present = useResumeHistoryStore.getState().present
  const json = JSON.stringify(present, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  saveAs(blob, 'resume.json')
}

// Import resume from JSON file
export function importResumeFromJson(json: any): boolean {
  // Basic validation: check for required fields
  if (!json || !json.resume || !json.colors || !json.layout || !json.page || !json.fonts) {
    return false
  }
  useResumeHistoryStore.getState().reset()
  useResumeHistoryStore.setState({
    present: json,
    past: [],
    future: [],
    canUndo: false,
    canRedo: false,
  })
  return true
}

// Export resume as JSON (all present data)
export function exportResumeJson() {
  const present = useResumeHistoryStore.getState().present
  const json = JSON.stringify(present, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  saveAs(blob, 'resume.json')
}

// Action for creating a new resume (currently just logs a message)
export function newResumeAction() {
  console.log('Creating new resume - action triggered')
  // Additional logic for creating a new resume can be added here
}

// Reset resume to default state
export function resetResume() {
  useResumeHistoryStore.getState().reset()
}

// Undo action
export function undo() {
  useResumeHistoryStore.getState().undo()
}

// Redo action
export function redo() {
  useResumeHistoryStore.getState().redo()
}

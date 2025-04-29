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
    })
  ).toBlob()
  saveAs(blob, 'resume.pdf')
}

// Placeholder for saving resume (implement as needed)
export function saveResume() {
  // Implement save logic (e.g., localStorage, API call, etc)
  alert('Save functionality not implemented yet.')
}

// Action for creating a new resume (currently just logs a message)
export function newResumeAction() {
  console.log('Creating new resume - action triggered')
  // Additional logic for creating a new resume can be added here
}

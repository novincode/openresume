import { useHotkeys } from 'react-hotkeys-hook'
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'
import { useRef } from 'react'
import { useFileUploader } from '@/lib/hooks/useFileUploader'
import { importJsonFromFile, saveResume } from '@/lib/actions'

const Hotkeys = () => {
  const undo = useResumeHistoryStore(state => state.undo)
  const redo = useResumeHistoryStore(state => state.redo)
  const inputRef = useRef<HTMLInputElement>(null)
  const { inputProps, trigger } = useFileUploader({
    accept: 'application/json',
    onFile: importJsonFromFile
  })

  useHotkeys(
    ['ctrl+z', 'meta+z'],
    () => { undo() },
    { preventDefault: true },
    [undo]
  )
  useHotkeys(
    ['ctrl+y', 'meta+shift+z'],
    () => { redo() },
    { preventDefault: true },
    [redo]
  )
  useHotkeys(
    ['ctrl+s', 'meta+s'],
    (e) => {
      e.preventDefault();
      saveResume();
    },
    { enableOnFormTags: true }
  )
  useHotkeys(
    ['ctrl+o', 'meta+o'],
    (e) => {
      e.preventDefault();
      trigger();
    },
    { enableOnFormTags: true }
  )

  return <input {...inputProps} />
}

export default Hotkeys

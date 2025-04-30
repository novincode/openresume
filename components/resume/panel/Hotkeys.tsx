import { useHotkeys } from 'react-hotkeys-hook'
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'

const Hotkeys = () => {
  const undo = useResumeHistoryStore(state => state.undo)
  const redo = useResumeHistoryStore(state => state.redo)

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
  return null
}

export default Hotkeys

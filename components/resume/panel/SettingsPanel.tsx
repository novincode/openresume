import { useResumeHistoryStore } from '@/lib/stores/resumeStore'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const SettingsPanel = () => {
  const previewRenderPdf = useResumeHistoryStore(s => s.present.previewRenderPdf)
  const updatePreviewRenderPdf = useResumeHistoryStore(s => s.updatePreviewRenderPdf)

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex items-center gap-4">
        <Label htmlFor="previewRenderPdf" className="text-sm">PDF Preview Mode</Label>
        <Switch
          id="previewRenderPdf"
          checked={!!previewRenderPdf}
          onCheckedChange={updatePreviewRenderPdf}
        />
      </div>
      <span className="text-xs text-muted-foreground pl-1">PDF renders are more accurate but slower.</span>
    </div>
  )
}

export default SettingsPanel

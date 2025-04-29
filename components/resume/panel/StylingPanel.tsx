'use client'
import { useResumeHistoryStore, defaultColors } from '@/lib/stores/resumeStore'
import { HexColorPicker } from 'react-colorful'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

const COLOR_LABELS: Record<string, string> = {
    background: 'Background',
    title: 'Title',
    subtitle: 'Subtitle',
    text: 'Text',
    border: 'Border',
    accent: 'Accent',
}

function ColorControl({ colorKey, colorValue, onChange }: { colorKey: string, colorValue: string, onChange: (val: string) => void }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex items-center gap-3 justify-between mb-4">
            <div className='flex items-center gap-3'>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="w-8 h-8 rounded border border-border shadow-sm hover:scale-105 transition-transform"
                            style={{ background: colorValue }}
                            aria-label={`Pick ${colorKey} color`}
                        />
                    </PopoverTrigger>
                    <PopoverContent className="p-2 w-auto" align="start">
                        <HexColorPicker color={colorValue} onChange={val => { onChange(val); }} />
                    </PopoverContent>
                </Popover>
                <span className="w-24 text-xs text-muted-foreground tracking-widest uppercase font-medium">
                    {COLOR_LABELS[colorKey] || colorKey}
                </span>
            </div>
            <input
                className="border rounded px-2 py-1 text-xs w-28 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 tracking-widest font-mono focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
                value={colorValue}
                onChange={e => onChange(e.target.value)}
                aria-label={`${colorKey} hex`}
                spellCheck={false}
                autoComplete="off"
                maxLength={7}
            />
        </div>
    )
}

const StylingPanel = () => {
    const colors = { ...defaultColors, ...useResumeHistoryStore(s => s.present.colors) }
    const updateColor = useResumeHistoryStore(s => s.updateColor)
    const updateColors = useResumeHistoryStore(s => s.updateColors)

    return (
        <div>
            <h4 className="font-semibold mb-2">Colors</h4>
            <div className="space-y-2 relative">
                {Object.entries(colors).map(([key, value]) => (
                    <ColorControl
                        key={key}
                        colorKey={key}
                        colorValue={value}
                        onChange={val => updateColor(key as any, val)}
                    />
                ))}
            </div>
            <Button
                className="w-full font-semibold"
                variant="outline"
                onClick={() => updateColors(defaultColors)}
                type="button"
            >
                Reset to Default Colors
            </Button>
        </div>
    )
}

export default StylingPanel;

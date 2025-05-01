'use client'
import { useResumeHistoryStore, defaultColors, defaultFonts, ResumeFonts } from '@/lib/stores/resumeStore'
import { HexColorPicker } from 'react-colorful'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { SidebarSection } from '../ResumeSidebar'

const COLOR_CONTROLS = [
    { key: 'background', label: 'Background' },
    { key: 'title', label: 'Title' },
    { key: 'subtitle', label: 'Subtitle' },
    { key: 'text', label: 'Text' },
    { key: 'border', label: 'Border' },
    { key: 'accent', label: 'Accent' },
]

const FONT_CONTROLS: { key: keyof ResumeFonts; label: string; min: number; max: number }[] = [
    { key: 'headingSize', label: 'Name', min: 16, max: 64 },
    { key: 'subheadingSize', label: 'Section Title/Desc', min: 12, max: 48 },
    { key: 'accentSize', label: 'Primary Label', min: 10, max: 36 }, // e.g., Job Title
    { key: 'bodySize', label: 'Body Text', min: 8, max: 28 }, // e.g., Bullets, Notes
    { key: 'contactSize', label: 'Contact Info', min: 8, max: 24 }, // New
    { key: 'labelSize', label: 'Secondary Label', min: 8, max: 24 }, // New, e.g., Dates
]

function ColorControl({ colorKey, colorValue, onChange, label }: { colorKey: string, colorValue: string, onChange: (val: string) => void, label: string }) {
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
                    {label}
                </span>
            </div>
            <Input
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

function FontControl({ label, value, min, max, onChange }: { label: string, value: number, min: number, max: number, onChange: (v: number) => void }) {
    return (
        <div className="flex items-center justify-between gap-4 mb-2">
            <Label className="w-40 text-xs text-muted-foreground font-medium">{label}</Label>
            <div className='flex items-center gap-2'>
                <Input
                    type="number"
                    min={min}
                    max={max}
                    value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="w-16 text-xs font-mono"
                />
                <span className="text-xs text-muted-foreground">px</span>
            </div>
        </div>
    )
}

const StylingPanel = () => {
    const colors = { ...defaultColors, ...useResumeHistoryStore(s => s.present.colors) }
    const updateColors = useResumeHistoryStore(s => s.updateColors)
    const presentFonts = useResumeHistoryStore(s => s.present.fonts)
    const fonts = presentFonts || defaultFonts // fallback to defaultFonts if undefined
    const updateFonts = useResumeHistoryStore(s => s.updateFonts)

    return (
        <>
            <SidebarSection
                title="Colors"
                action={
                    <Button size="xs" variant="outline" className="text-xs px-2 py-1" onClick={() => updateColors(defaultColors)}>
                        Reset Colors
                    </Button>
                }
            >
                <div className="space-y-2 relative mb-6">
                    {COLOR_CONTROLS.map(ctrl => (
                        <ColorControl
                            key={ctrl.key}
                            colorKey={ctrl.key}
                            colorValue={colors[ctrl.key]}
                            label={ctrl.label}
                            onChange={val => updateColors({ [ctrl.key]: val })}
                        />
                    ))}
                </div>
            </SidebarSection>
            <SidebarSection
                title="Font Sizes"
                action={
                    <Button size="xs" variant="outline" className="text-xs px-2 py-1" onClick={() => updateFonts(defaultFonts)}>
                        Reset Font Sizes
                    </Button>
                }
            >
                <div className="space-y-2 mb-4">
                    {FONT_CONTROLS.map(ctrl => (
                        <FontControl
                            key={ctrl.key}
                            label={ctrl.label}
                            value={fonts[ctrl.key]}
                            min={ctrl.min}
                            max={ctrl.max}
                            onChange={v => updateFonts({ [ctrl.key]: v })}
                        />
                    ))}
                </div>
            </SidebarSection>
        </>
    )
}

export default StylingPanel;

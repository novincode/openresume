import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Lock, Unlock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

const PAGE_PRESETS = [
    { label: 'A4', value: 'a4', width: 210, height: 297 },
    { label: 'Letter', value: 'letter', width: 216, height: 279 },
    { label: 'Legal', value: 'legal', width: 216, height: 356 },
    { label: 'Tabloid', value: 'tabloid', width: 279, height: 432 },
    { label: 'Executive', value: 'executive', width: 184, height: 267 },
    { label: 'A5', value: 'a5', width: 148, height: 210 },
    { label: 'B5', value: 'b5', width: 176, height: 250 },
    { label: 'Custom', value: 'custom' }
]

function findPreset(width: number, height: number) {
    for (const preset of PAGE_PRESETS) {
        if (
            preset.width &&
            preset.height &&
            Math.abs(width - preset.width) < 0.5 &&
            Math.abs(height - preset.height) < 0.5
        ) {
            return preset.value
        }
    }
    return 'custom'
}

type SizePanelProps = {
    page: { width: number; height: number }
    updatePage: (page: Partial<{ width: number; height: number }>) => void
}

const MIN_SIZE = 50
const MAX_SIZE = 500

const SizePanel = ({ page, updatePage }: SizePanelProps) => {
    const [locked, setLocked] = useState(true)
    const [width, setWidth] = useState(page.width.toString())
    const [height, setHeight] = useState(page.height.toString())
    const lastChanged = useRef<'width' | 'height'>('width')

    useEffect(() => {
        setWidth(page.width.toString())
        setHeight(page.height.toString())
    }, [page.width, page.height])

    const preset = findPreset(Number(width), Number(height))

    const handlePresetChange = (val: string) => {
        if (val === 'custom') return
        const presetObj = PAGE_PRESETS.find(p => p.value === val)
        if (presetObj && presetObj.width && presetObj.height) {
            setWidth(presetObj.width.toString())
            setHeight(presetObj.height.toString())
            updatePage({ width: presetObj.width, height: presetObj.height })
        }
    }

    const clamp = (val: number) => Math.max(MIN_SIZE, Math.min(MAX_SIZE, val))

    const handleWidthChange = (val: string) => {
        setWidth(val)
        lastChanged.current = 'width'
        const num = clamp(Number(val))
        if (!val || isNaN(num)) return
        if (locked) {
            const aspect = page.width / page.height || 210 / 297
            const newHeight = Math.round((num / aspect) * 100) / 100
            setHeight(newHeight.toString())
            updatePage({ width: num, height: newHeight })
        } else {
            updatePage({ width: num })
        }
    }

    const handleHeightChange = (val: string) => {
        setHeight(val)
        lastChanged.current = 'height'
        const num = clamp(Number(val))
        if (!val || isNaN(num)) return
        if (locked) {
            const aspect = page.width / page.height || 210 / 297
            const newWidth = Math.round((num * aspect) * 100) / 100
            setWidth(newWidth.toString())
            updatePage({ width: newWidth, height: num })
        } else {
            updatePage({ height: num })
        }
    }

    const handleLockToggle = () => {
        setLocked(l => !l)
    }

    useEffect(() => {
        if (!locked) return
        if (Number(width) > 0 && Number(height) > 0) {
            if (lastChanged.current === 'width') {
                const aspect = page.width / page.height || 210 / 297
                const newHeight = Math.round((Number(width) / aspect) * 100) / 100
                if (newHeight !== Number(height)) {
                    setHeight(newHeight.toString())
                    updatePage({ width: Number(width), height: newHeight })
                }
            } else {
                const aspect = page.width / page.height || 210 / 297
                const newWidth = Math.round((Number(height) * aspect) * 100) / 100
                if (newWidth !== Number(width)) {
                    setWidth(newWidth.toString())
                    updatePage({ width: newWidth, height: Number(height) })
                }
            }
        }
    }, [locked])

    return (
        <div>
            <Select value={preset} onValueChange={handlePresetChange}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select preset" />
                </SelectTrigger>
                <SelectContent>
                    {PAGE_PRESETS.map(p => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="flex items-center gap-2 mt-2">
                <Input
                    type="number"
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    value={width}
                    onChange={e => handleWidthChange(e.target.value)}
                    className="w-20"
                    aria-label="Page width"
                    step="any"
                />
                <span className="text-muted-foreground">×</span>
                <Input
                    type="number"
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    value={height}
                    onChange={e => handleHeightChange(e.target.value)}
                    className="w-20"
                    aria-label="Page height"
                    step="any"
                />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleLockToggle}
                    aria-label={locked ? "Unlock aspect ratio" : "Lock aspect ratio"}
                >
                    {locked ? <Lock size={16} /> : <Unlock size={16} />}
                </Button>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
                Dimensions in mm (min {MIN_SIZE}, max {MAX_SIZE})
            </div>
        </div>
    )
}

export default SizePanel;

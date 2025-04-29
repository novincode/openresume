'use client'
import { AspectRatio, useAspectRatio } from '@/components/ui/aspect-ratio'
import React, { useEffect, useState } from 'react'
import ResumeLayoutDefault from '@/components/resume/layouts/ResumeLayoutDefault'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import ResumeSidebar from '@/components/resume/ResumeSidebar'
import { useMobile } from '@/lib/hooks/useMobile'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'
import { type ResumeStore } from '@/lib/stores/resumeStore'
import { useHotkeys } from 'react-hotkeys-hook'

type ResumeAppProps = {
    initialData?: Partial<ResumeStore>
}

const ResumeApp = ({ initialData }: ResumeAppProps) => {
    const isMobile = useMobile()
    const [open, setOpen] = useState(false)

    // Hotkeys for undo/redo
    const { undo, redo, present, updateResume,  updateLayout,updateColors, updatePage } = useResumeHistoryStore()
    useHotkeys(
        ['ctrl+z', 'meta+z'],
        () => {
            undo()
        },
        { preventDefault: true },
        [undo]
    )
    useHotkeys(
        ['ctrl+y', 'meta+shift+z'],
        () => {
            console.log("REDO")
            redo()
        },
        { preventDefault: true },
        [redo]
    )

    // On mount, if initialData is provided, set it into the store
    useEffect(() => {
        if (!initialData) return
        if (initialData.resume) updateResume(initialData.resume)
        if (initialData.colors) updateColors(initialData.colors)
        if (initialData.layout) updateLayout(initialData.layout)
        if (initialData.page) updatePage(initialData.page)
        // meta is not usually user-editable, so we skip it
    }, [initialData])

    return (
        <div className='bg-muted flex-1 flex flex-col items-center justify-center'>
            {isMobile ? (
                <div className="w-full flex flex-col items-center">
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button
                                variant="outline"
                                className='m-2'
                                onClick={() => setOpen(true)}
                            >
                                <Menu className="mr-2" size={18} />
                                Edit Resume
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="max-w-full w-[90vw] mx-auto">
                            <DrawerHeader>
                                <DrawerTitle>Edit Resume</DrawerTitle>
                                <DrawerClose asChild>
                                    <Button variant="ghost" className="absolute right-4 top-4" onClick={() => setOpen(false)}>
                                        Close
                                    </Button>
                                </DrawerClose>
                            </DrawerHeader>
                            <div className="p-2 max-h-[80vh] overflow-y-auto">
                                <ResumeSidebar
                                    page={present.page}
                                    updatePage={updatePage}
                                // ...pass other props as needed...
                                />
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <div className="w-full flex justify-center"><ResumePreview /></div>
                </div>
            ) : (
                <ResizablePanelGroup direction="horizontal" className="flex-1">
                    <ResizablePanel maxSize={50} defaultSize={20} minSize={15} className="bg-muted flex flex-col gap-2 ">
                        <ResumeSidebar
                            page={present.page}
                            updatePage={updatePage}
                        // ...pass other props as needed...
                        />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={50} defaultSize={80} maxSize={85} className="flex flex-col items-center justify-center bg-transparent">
                        <ResumePreview />
                    </ResizablePanel>
                </ResizablePanelGroup>
            )}
        </div>
    )
}

const ResumePreview = () => {
    const present = useResumeHistoryStore(state => state.present)
    const ratio = useAspectRatio(present.page.width, present.page.height)
    return (
        <AspectRatio
            ratio={ratio}
            height="max"
            width="auto"
            className=" rounded-md m-4 overflow-hidden"
        >
            <ResumeLayoutDefault className="w-full h-full" {...present} />
        </AspectRatio>
    )
}

export default ResumeApp

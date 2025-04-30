'use client'
import { AspectRatio, useAspectRatio } from '@/components/ui/aspect-ratio'
import React, { useEffect, useState, useMemo, useRef } from 'react'
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
import { useResumeHistoryStore, ResumeState } from '@/lib/stores/resumeStore'
import { useHotkeys } from 'react-hotkeys-hook'
import AppMenu from './AppMenu'
import { Document, Page, PDFViewer } from '@react-pdf/renderer'
import { ErrorBoundary } from '@/components/main/ErrorBoundary'
import { v4 as uuidv4 } from 'uuid'
import Hotkeys from './panel/Hotkeys'

type ResumeAppProps = {
    initialData?: Partial<ResumeState>
}

const ResumeApp = ({ initialData }: ResumeAppProps) => {
    const isMobile = useMobile()
    const [open, setOpen] = useState(false)
 

    return (
        <>
            <Hotkeys />
            <AppMenu />
            <div className='bg-muted flex-1 flex flex-col items-center justify-center'>
                {isMobile ? (
                    <div className="w-full flex flex-col flex-1">
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
                                        page={initialData?.page || { width: 210, height: 297 }}
                                        updatePage={useResumeHistoryStore.getState().updatePage}
                                    />
                                </div>
                            </DrawerContent>
                        </Drawer>
                        <div className="w-full flex justify-center flex-1 flex-col"><ResumePreview /></div>
                    </div>
                ) : (
                    <ResizablePanelGroup direction="horizontal" className="flex-1 flex md:max-h-screen">
                        <ResizablePanel maxSize={50} defaultSize={40} minSize={15} className="bg-muted flex flex-col gap-2 ">
                            <ResumeSidebar
                                page={initialData?.page || { width: 210, height: 297 }}
                                updatePage={useResumeHistoryStore.getState().updatePage}
                            />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel minSize={50} defaultSize={60} maxSize={85} className="flex flex-col items-center justify-center bg-transparent">
                            <ResumePreview />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                )}
            </div>
        </>
    )
}

// Custom hook to subscribe to zustand and debounce updates
function useDebouncedResumeData(delay = 500) {
    const [pdfData, setPdfData] = useState(() => {
        const state = useResumeHistoryStore.getState()
        return {
            resume: state.present.resume,
            colors: state.present.colors,
            page: state.present.page,
        }
    })
    const [pdfKey, setPdfKey] = useState(() => uuidv4())
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Subscribe to zustand store changes
        const unsub = useResumeHistoryStore.subscribe((state) => {
            const newData = {
                resume: state.present.resume,
                colors: state.present.colors,
                page: state.present.page,
            }
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
                setPdfData(newData)
                setPdfKey(uuidv4())
            }, delay)
        })
        return () => {
            unsub()
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [delay])

    return { pdfData, pdfKey }
}

const ResumePreview = () => {
    const { pdfData, pdfKey } = useDebouncedResumeData(500)

    return (
        <ErrorBoundary>
            <PDFViewer
                key={pdfKey}
                showToolbar={false}
                height="100%"
                width="100%"
                className="bg-transparent flex-1"
            >
                <ResumeLayoutDefault pdfRender page={pdfData.page} colors={pdfData.colors} resume={pdfData.resume} />
            </PDFViewer>
        </ErrorBoundary>
    )
}

export default ResumeApp

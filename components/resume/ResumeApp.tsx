'use client'
import { AspectRatio, useAspectRatio } from '@/components/ui/aspect-ratio'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import ResumeLayoutDefault from '@/components/resume/layouts/ResumeLayoutDefault'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ResumeInfoSidebar, ResumeSettingsSidebar } from '@/components/resume/ResumeSidebar'
import { useMobile } from '@/lib/hooks/useMobile'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { User, Settings as SettingsIcon, Menu } from 'lucide-react'
import { useResumeHistoryStore, ResumeState } from '@/lib/stores/resumeStore'
import { useHotkeys } from 'react-hotkeys-hook'
import AppMenu from './AppMenu'
import { Document, Page, PDFViewer } from '@react-pdf/renderer'
import { ErrorBoundary } from '@/components/main/ErrorBoundary'
import { v4 as uuidv4 } from 'uuid'
import Hotkeys from './panel/Hotkeys'
import dynamic from 'next/dynamic'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const ResumePreview = dynamic(() => import('./ResumePreview'), { ssr: false })

const ResumeApp = () => {
    const isMobile = useMobile()
    const [open, setOpen] = useState(false)
    const [infoOpen, setInfoOpen] = useState(false)

    return (
        <div className='h-screen max-h-screen  flex flex-col'>
            <Hotkeys />
            <div className=' flex-1 flex flex-col  max-h-full'>
                <AppMenu />

                {isMobile ? (
                    <div className="w-full flex flex-col flex-1">
                        <div className='flex flex-wrap *:flex-1'>
                            <Drawer open={open} onOpenChange={setOpen}>
                                <DrawerTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className='m-2'
                                        onClick={() => setOpen(true)}
                                    >
                                        <SettingsIcon className="mr-2" size={18} />
                                        Resume Settings
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent className="max-w-full w-[90vw] mx-auto">
                                    <DrawerHeader>
                                        <DrawerTitle>Resume Settings</DrawerTitle>
                                        <DrawerClose asChild>
                                            <Button variant="ghost" className="absolute right-4 top-4" onClick={() => setOpen(false)}>
                                                Close
                                            </Button>
                                        </DrawerClose>
                                    </DrawerHeader>
                                    <div className="p-2 max-h-[80vh] overflow-y-auto">
                                        <ResumeSettingsSidebar />
                                    </div>
                                </DrawerContent>
                            </Drawer>

                            <Sheet open={infoOpen} onOpenChange={setInfoOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className='m-2'
                                        onClick={() => setInfoOpen(true)}
                                    >
                                        <User className="mr-2" size={18} />
                                        Edit Info
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Edit Resume</SheetTitle>
                                    </SheetHeader>
                                    <div className="p-2 max-h-[80vh] overflow-y-auto">
                                        <ResumeInfoSidebar />
                                    </div>
                                    <SheetFooter>
                                        <SheetClose asChild>
                                            <Button type="button" variant="secondary">Close</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="w-full flex justify-center flex-1 flex-col"><ResumePreview /></div>
                    </div>
                ) : (
                    <ResizablePanelGroup direction="horizontal" className="flex-1 flex max-h-full">
                        <ResizablePanel  defaultSize={30} minSize={15} className="bg-muted flex flex-col gap-2 ">
                            <ResumeSettingsSidebar />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel  defaultSize={35} maxSize={50} className="flex flex-col items-center justify-center bg-transparent">
                            <ResumePreview />
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={35} minSize={35} className="bg-muted flex flex-col gap-2 ">
                            <ResumeInfoSidebar />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                )}
            </div>
        </div>
    )
}

export default ResumeApp

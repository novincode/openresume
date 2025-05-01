import Logo from '../main/Logo'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
} from "@/components/ui/menubar"
import { exportResumePdf, exportResumeJson, importResumeFromJson, newResumeAction, saveResume, resetResume, undo, redo } from '@/lib/actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { Input } from '@/components/ui/input'
import { useFileUploader } from '@/lib/hooks/useFileUploader'
import { importJsonFromFile } from '@/lib/actions'
import { ThemeToggle } from '../main/ThemeToggle'
import { Github } from 'lucide-react'
import { Download } from 'lucide-react'

const AppMenu = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const appVersion = '0.1.0'

    // Use modular file uploader hook for JSON import
    const {
        inputProps,
        trigger: triggerImport,
        error: importError,
        loading: importLoading,
        setError: setImportError
    } = useFileUploader({
        accept: 'application/json',
        onFile: importJsonFromFile
    })

    return (
        <nav className='bg-muted border-b border-border'>
            {/* Modular file input for import (never unmounts) */}
            <Input {...inputProps} />
            <div className="flex items-center w-full justify-between">
                <div className="flex items-center">
                    <Logo className='border-r-2 border-border rounded-none mx-2' />
                    <Menubar className="bg-muted border-none shadow-none px-0">
                        <MenubarMenu>
                            <MenubarTrigger className=" ">File</MenubarTrigger>
                            <MenubarContent>
                                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                    <DialogTrigger asChild>
                                        <MenubarItem onSelect={e => { e.preventDefault(); setDialogOpen(true) }}>
                                            New Resume <MenubarShortcut>⌘N</MenubarShortcut>
                                        </MenubarItem>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Save current resume?</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-2">Are you going to save this current file? All progress will be lost.</div>
                                        <DialogFooter className="flex justify-between sm:justify-between *:flex-auto">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    saveResume();
                                                    newResumeAction();
                                                    resetResume();
                                                    setDialogOpen(false);
                                                }}
                                            >
                                                Yes
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    newResumeAction();
                                                    resetResume();
                                                    setDialogOpen(false);
                                                }}
                                            >
                                                No
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setDialogOpen(false);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <MenubarItem onClick={triggerImport} disabled={importLoading}>
                                    Import (JSON)
                                </MenubarItem>
                                {importError && <div className="text-red-500 px-3 py-1 text-xs">{importError}</div>}
                                <MenubarSeparator />
                                <MenubarItem onClick={saveResume}>
                                    Save <MenubarShortcut>⌘S</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSub>
                                    <MenubarSubTrigger>Export</MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem onClick={exportResumePdf}>
                                            Export PDF
                                        </MenubarItem>
                                        <MenubarItem onClick={exportResumeJson}>
                                            Export JSON
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className=" ">Edit</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem onClick={undo}>
                                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem onClick={redo}>
                                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger className=" ">Help</MenubarTrigger>
                            <MenubarContent>
                                <div className="px-3 py-2 text-xs text-muted-foreground select-none">Version {appVersion}</div>
                                <MenubarItem asChild>
                                    <Link href="/about">About</Link>
                                </MenubarItem>
                                <MenubarItem asChild>
                                    <a
                                        href="https://github.com/novincode/openresume"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </a>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem asChild>
                                    <a href="https://codeideal.com" target="_blank" rel="noopener noreferrer">Made by CodeIdeal</a>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
                <div className="flex items-center gap-2 pr-4">
                    <Button size="icon_xs" variant="ghost" onClick={exportResumePdf} title="Download as PDF" aria-label="Download PDF">
                        <Download size={20} />
                    </Button>
                    <Button size="icon_xs" variant="ghost" asChild title="GitHub Repository" aria-label="GitHub">
                        <a href="https://github.com/novincode/openresume" target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                    </Button>
                    <ThemeToggle mini />
                </div>
            </div>
        </nav>
    )
}

export default AppMenu
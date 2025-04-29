import Logo from '../main/Logo'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { exportResumePdf, newResumeAction, saveResume } from '@/lib/actions'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '../ui/separator'

const AppMenu = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const resetResume = useResumeHistoryStore(state => state.resetResume)
    const undo = useResumeHistoryStore(state => state.undo)
    const redo = useResumeHistoryStore(state => state.redo)
    const appVersion = '0.1.0'

    return (
        <nav className='bg-muted border-b border-border'>
            <div className="flex items-center ">
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
                            <MenubarItem>
                                Open... <MenubarShortcut>⌘O</MenubarShortcut>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                Save <MenubarShortcut>⌘S</MenubarShortcut>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger className=" ">Export</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem onClick={exportResumePdf}>
                                Export PDF
                            </MenubarItem>
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
                            <MenubarSeparator />
                            <MenubarItem>
                                Cut <MenubarShortcut>⌘X</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>
                                Copy <MenubarShortcut>⌘C</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>
                                Paste <MenubarShortcut>⌘V</MenubarShortcut>
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
        </nav>
    )
}

export default AppMenu
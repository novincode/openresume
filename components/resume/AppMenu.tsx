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
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Separator } from '../ui/separator'
import { Input } from '@/components/ui/input'

const AppMenu = () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [importError, setImportError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const appVersion = '0.1.0'

    // Add debug logs and reset input after reading
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        console.log('File selected:', file.name); // Debug
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                const ok = importResumeFromJson(json);
                if (!ok) setImportError('Invalid JSON file.');
                else setImportError(null);
                console.log('JSON import result:', ok, json); // Debug
            } catch (err: any) {
                setImportError('Invalid JSON file.');
                console.error('JSON parse error:', err); // Debug
            }
            // Reset input so user can select the same file again
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    }

    return (
        <nav className='bg-muted border-b border-border'>
            {/* Always render the file input at the root so it never unmounts */}
            <Input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                style={{ display: 'none' }}
                onChange={handleImport}
                tabIndex={-1}
                aria-hidden="true"
            />
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
                            <MenubarItem onClick={() => fileInputRef.current?.click()}>
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
        </nav>
    )
}

export default AppMenu
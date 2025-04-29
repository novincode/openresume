'use client'
import React from 'react'
import Logo from './Logo'
import { ThemeToggle } from './ThemeToggle'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { exportResumePdf, saveResume } from '@/lib/actions'

const TopNav = () => {
    return (
        <nav className='bg-muted border-b border-border'>
                <div className="flex items-center ">
                    <Logo />

                    <Menubar className="bg-muted border-none shadow-none px-0">
                        <MenubarMenu>
                            <MenubarTrigger className=" ">File</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Resume <MenubarShortcut>⌘N</MenubarShortcut>
                                </MenubarItem>
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
                                <MenubarItem>
                                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
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
                                <MenubarItem>
                                    Documentation
                                </MenubarItem>
                                <MenubarItem>
                                    Contact Support
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    About
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>

                </div>
        </nav>
    )
}

export default TopNav
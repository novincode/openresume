'use client'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Github } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const TopNav = () => {
    return (
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between py-4">
                <Logo />
              
                <div className="flex items-center gap-4">
                    <Button className='hidden sm:inline' variant="ghost" asChild>
                        <Link href="/about" className="">About</Link>
                    </Button>
                    <Button variant="ghost" asChild className="gap-x-2">
                        <a href="https://github.com/novincode/openresume" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            <span className="hidden sm:inline">GitHub</span>
                        </a>
                    </Button>
                    <ThemeToggle />
                    <Button asChild className="gap-x-2">
                        <Link href="/create">
                            <FileText className="h-4 w-4" />
                            <span className="hidden sm:inline">Create Resume</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default TopNav
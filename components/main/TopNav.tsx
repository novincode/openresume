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
                <div className='flex items-center gap-3'>
                    <Button variant="ghost" asChild>
                        <Link href="/about">About</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <a href="https://github.com/novincode/openresume" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" /> GitHub
                        </a>
                    </Button>
                </div>
                <div className="flex items-center gap-4">

                    <ThemeToggle />

                    <Button asChild>
                        <Link href="/create">
                            Create Resume
                        </Link>
                    </Button>

                </div>
            </div>
        </header>
    )
}

export default TopNav
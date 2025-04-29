import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

type LogoProps = {
    className?: string
}

const Logo = ({ className }: LogoProps) => {
    return (
        <Button variant={'ghost'} asChild className={className}>
            <Link className='font-black' href={'/'}>
                <FileText className="h-5 w-5 text-primary" />
                <strong>
                    ResumeMaker
                </strong>
            </Link>
        </Button>
    )
}

export default Logo
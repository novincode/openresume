import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'

const Logo = () => {
    return (
        <h2>
            <Button variant={'ghost'} asChild>
                <Link className='font-black' href={'/'}>
                    <FileText className="h-5 w-5 text-primary" />

                    ResumeMaker
                </Link>
            </Button>
        </h2>
    )
}

export default Logo
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'

const Logo = () => {
    return (
        <h2>
            <Button variant={'ghost'} asChild>
                <Link className='font-black' href={'/'}>
                    ResumeMaker
                </Link>
            </Button>
        </h2>
    )
}

export default Logo
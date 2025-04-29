import TopNav from '@/components/main/TopNav'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='min-h-screen flex flex-col'>
            <TopNav />
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    )
}

export default layout
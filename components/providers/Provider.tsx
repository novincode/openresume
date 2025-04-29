import React, { ReactNode } from 'react'
import { ThemeProvider } from './ThemeProvider'

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="default"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    )
}

export default Provider
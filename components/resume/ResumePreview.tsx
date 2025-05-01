"use client"
import { useEffect, useRef, useState } from 'react'
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'
import { v4 as uuidv4 } from 'uuid'
import { ErrorBoundary } from '@/components/main/ErrorBoundary'
import { PDFViewer } from '@react-pdf/renderer'
import ResumeLayoutDefault from './layouts/ResumeLayoutDefault'
import { AspectRatio } from '@/components/ui/aspect-ratio'

function useDebouncedResumeData(delay = 500) {
    const [pdfData, setPdfData] = useState(() => {
        const state = useResumeHistoryStore.getState()
        return {
            resume: state.present.resume,
            colors: state.present.colors,
            page: state.present.page,
            fonts: state.present.fonts, // <-- FIXED: use present.fonts
        }
    })
    const [pdfKey, setPdfKey] = useState(() => uuidv4())
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Only subscribe on the client
        if (typeof window === 'undefined') return;
        const unsub = useResumeHistoryStore.subscribe((state) => {
            const newData = {
                resume: state.present.resume,
                colors: state.present.colors,
                page: state.present.page,
                fonts: state.present.fonts, // <-- FIXED: use present.fonts
            }
            if (timerRef.current) clearTimeout(timerRef.current)
            timerRef.current = setTimeout(() => {
                setPdfData(newData)
                setPdfKey(uuidv4())
            }, delay)
        })
        return () => {
            unsub()
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [delay])

    return { pdfData, pdfKey }
}

const ResumePreview = () => {
    const { pdfData, pdfKey } = useDebouncedResumeData(300)
    const previewRenderPdf = useResumeHistoryStore(s => s.present.previewRenderPdf)

    if (previewRenderPdf) {
        return (
            <ErrorBoundary>
                <PDFViewer
                    key={pdfKey}
                    showToolbar={false}
                    height="100%"
                    width="100%"
                    className="bg-transparent flex-1   "
                >
                    <ResumeLayoutDefault pdfRender page={pdfData.page} colors={pdfData.colors} resume={pdfData.resume} fonts={pdfData.fonts} />
                </PDFViewer>
            </ErrorBoundary>
        )
    }

    // Calculate aspect ratio from page size (width/height)
    const aspect = pdfData.page.width / pdfData.page.height

    return (
        <AspectRatio height={'max'} width={'auto'} ratio={aspect} className="w-full h-auto bg-white border rounded shadow">
            <ResumeLayoutDefault page={pdfData.page} colors={pdfData.colors} resume={pdfData.resume} fonts={pdfData.fonts} />
        </AspectRatio>
    )
}

export default ResumePreview

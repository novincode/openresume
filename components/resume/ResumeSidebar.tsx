'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import SizePanel from './panel/SizePanel'
import StylingPanel from './panel/StylingPanel'
import ResumeInfoPanel from './panel/ResumeInfoPanel'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// Simple section wrapper
const Section = ({
    title,
    children
}: {
    title: string
    children: React.ReactNode
}) => (
    <section className="border-b border-border p-4 last:border-none">
        <h3 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider px-1">{title}</h3>
        <div className="space-y-2">{children}</div>
    </section>
)

type ResumeSidebarProps = {
    page: { width: number; height: number }
    updatePage: (page: Partial<{ width: number; height: number }>) => void
}

export default function ResumeSidebar({ page, updatePage }: ResumeSidebarProps) {
    return (
        <ScrollArea className="h-full w-full">
            <Tabs defaultValue="general" className="w-full">
                <div className="p-2">
                    <TabsList className="w-full grid grid-cols-2 mb-2 p-1">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="styling">Styling</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="general">
                    <Section title="Page Size">
                        <SizePanel page={page} updatePage={updatePage} />
                    </Section>
                    <Section title="Your Information">
                        <ResumeInfoPanel />
                    </Section>
                </TabsContent>
                <TabsContent value="styling">
                    <Section title="Colors">
                        <StylingPanel />
                    </Section>
                </TabsContent>
            </Tabs>
        </ScrollArea>
    )
}

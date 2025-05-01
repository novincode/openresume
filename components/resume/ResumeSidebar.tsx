'use client'
import { ScrollArea } from '@/components/ui/scroll-area'
import SizePanel from './panel/SizePanel'
import StylingPanel from './panel/StylingPanel'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import SettingsPanel from './panel/SettingsPanel'
import ResumeInfoPanel from './panel/ResumeInfoPanel'
import SectionsPanel from './panel/SectionsPanel'

// Simple section wrapper
export const SidebarSection = ({
    title,
    children,
    action
}: {
    title: string
    children: React.ReactNode
    action?: React.ReactNode
}) => (
    <section className="border-b border-border p-4 last:border-none">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">{title}</h3>
            {action && <div>{action}</div>}
        </div>
        <div className="space-y-2">{children}</div>
    </section>
)

const ResumeInfoSidebar = () => (
    <ScrollArea className="h-full w-full">
        <Tabs defaultValue="basic" className="w-full">
            <div className="p-2">
                <TabsList className="w-full grid grid-cols-2 mb-2 p-1">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="sections">Sections</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="basic">
                <SidebarSection title="Basic Info">
                    <ResumeInfoPanel />
                </SidebarSection>
            </TabsContent>
            <TabsContent value="sections">
                <SidebarSection title="Sections">
                    <SectionsPanel />
                </SidebarSection>
            </TabsContent>
        </Tabs>
    </ScrollArea>
)

const ResumeSettingsSidebar = () => (
    <ScrollArea className="h-full w-full">
        <Tabs defaultValue="general" className="w-full">
            <div className="p-2">
                <TabsList className="w-full grid grid-cols-2 mb-2 p-1">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="styling">Styling</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="general">
                <SidebarSection title="Page Size">
                    <SizePanel />
                </SidebarSection>
                <SidebarSection title="Settings">
                    <SettingsPanel />
                </SidebarSection>
            </TabsContent>
            <TabsContent value="styling">
                <StylingPanel />

            </TabsContent>
        </Tabs>
    </ScrollArea>
)

export { ResumeInfoSidebar, ResumeSettingsSidebar }

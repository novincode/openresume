"use client"

import { useState } from "react"
import { useResumeHistoryStore, type Section, type SectionItem } from "@/lib/stores/resumeStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { SortableList, SortableItem } from "@/components/ui/custom/SortableList"

const SectionsPanel = () => {
  const sections = useResumeHistoryStore(s => s.present.resume.sections)
  const updateResume = useResumeHistoryStore(s => s.updateResume)
  const [openSections, setOpenSections] = useState<string[]>([])

  // Add section
  const addSection = () => {
    updateResume({
      sections: [
        ...sections,
        { id: uuidv4(), title: 'New Section', items: [] }
      ]
    })
  }

  // Delete section
  const deleteSection = (id: string) => {
    const newSections = sections.filter(s => s && s.id !== id).filter(Boolean)
    updateResume({ sections: newSections })
    setOpenSections(prev => prev.filter(x => x !== id))
  }

  // Update section title
  const updateSectionTitle = (id: string, title: string) => {
    updateResume({
      sections: sections.map(s => s.id === id ? { ...s, title } : s)
    })
  }

  // Add item
  const addSectionItem = (sectionId: string) => {
    updateResume({
      sections: sections.map(s =>
        s.id === sectionId
          ? { ...s, items: [...s.items, { id: uuidv4(), type: 'default', title: '', organization: '', date: '', description: '', bullets: [] }] }
          : s
      )
    })
  }

  // Delete item
  const deleteSectionItem = (sectionId: string, itemId: string) => {
    updateResume({
      sections: sections.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.filter(i => i && i.id !== itemId).filter(Boolean) }
          : s
      ).filter(Boolean)
    })
  }

  // Update item field
  const updateSectionItem = (sectionId: string, itemId: string, field: string, value: any) => {
    updateResume({
      sections: sections.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) }
          : s
      )
    })
  }

  // Add bullet
  const addBulletPoint = (sectionId: string, itemId: string) => {
    updateResume({
      sections: sections.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, bullets: [...(i.bullets || []), ''] } : i) }
          : s
      )
    })
  }

  // Update bullet
  const updateBulletPoint = (sectionId: string, itemId: string, idx: number, value: string) => {
    updateResume({
      sections: sections.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, bullets: (i.bullets ?? []).map((b, bidx) => bidx === idx ? value : b) } : i) }
          : s
      )
    })
  }

  // Delete bullet
  const deleteBulletPoint = (sectionId: string, itemId: string, idx: number) => {
    updateResume({
      sections: sections.map(s =>
        s.id === sectionId
          ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, bullets: (i.bullets ?? []).filter((_, bidx) => bidx !== idx) } : i) }
          : s
      )
    })
  }

  // Sort sections
  const handleSectionSort = (ids: string[]) => {
    const map = Object.fromEntries(sections.map(s => [s.id, s]))
    updateResume({ sections: ids.map(id => map[id]).filter(Boolean) })
  }

  // Sort items in section
  const handleItemSort = (sectionId: string, ids: string[]) => {
    updateResume({
      sections: sections.map(s =>
        s.id === sectionId
          ? { ...s, items: ids.map(id => s.items.find(i => i.id === id)).filter((i): i is SectionItem => Boolean(i)) }
          : s
      )
    })
  }

  // Toggle open/close
  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Resume Sections</h3>
        <Button size="sm" variant="outline" onClick={addSection}>
          <Plus size={16} className="mr-1" /> Add Section
        </Button>
      </div>
      {sections.length > 0 ? (
        <SortableList
          items={sections.map(s => s.id)}
          onSortEnd={handleSectionSort}
          className="w-full space-y-4"
        >
          {sections.map(section => (
            <SortableItem key={section.id} id={section.id}>
              <div className="border rounded-md">
                <div className="flex items-center p-3">
                  <div className="mr-2 cursor-move">
                    <GripVertical size={16} className="text-muted-foreground" />
                  </div>
                  <Input
                    value={section.title}
                    onChange={e => updateSectionTitle(section.id, e.target.value)}
                    className="h-7 flex-1 text-sm mr-2"
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => toggleSection(section.id)}
                    >
                      {openSections.includes(section.id) ? '−' : '+'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteSection(section.id)}
                      className="h-7 w-7"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
                {openSections.includes(section.id) && (
                  <div className="p-3 pt-0 space-y-3">
                    {section.items.length > 0 ? (
                      <SortableList
                        items={section.items.map(i => i.id)}
                        onSortEnd={ids => handleItemSort(section.id, ids)}
                        className="space-y-3"
                      >
                        {section.items.map((item, idx) => (
                          <SortableItem key={item.id} id={item.id}>
                            <div className="mb-3 relative border rounded">
                              <div className="absolute left-1 top-3 cursor-move opacity-50 hover:opacity-100">
                                <GripVertical size={16} />
                              </div>
                              <div className="py-2 px-4 border-b">
                                <div className="text-sm flex justify-between">
                                  <span>Item {idx + 1}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteSectionItem(section.id, item.id)}
                                    className="h-6 w-6"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </div>
                              <div className="py-2 px-4 space-y-2">
                                <div>
                                  <Label className="text-xs">Title</Label>
                                  <Input
                                    value={item.title || ''}
                                    onChange={e => updateSectionItem(section.id, item.id, 'title', e.target.value)}
                                    className="h-7 text-sm"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Organization</Label>
                                  <Input
                                    value={item.organization || ''}
                                    onChange={e => updateSectionItem(section.id, item.id, 'organization', e.target.value)}
                                    className="h-7 text-sm"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Date</Label>
                                  <Input
                                    value={item.date || ''}
                                    onChange={e => updateSectionItem(section.id, item.id, 'date', e.target.value)}
                                    className="h-7 text-sm"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Description</Label>
                                  <Textarea
                                    value={item.description || ''}
                                    onChange={e => updateSectionItem(section.id, item.id, 'description', e.target.value)}
                                    className="text-sm min-h-[60px]"
                                    rows={2}
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <Label className="text-xs">Bullet Points</Label>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="h-5 text-xs py-0 px-1"
                                      onClick={() => addBulletPoint(section.id, item.id)}
                                    >
                                      <Plus size={12} className="mr-1" /> Add
                                    </Button>
                                  </div>
                                  {(item.bullets || []).map((bullet, bulletIdx) => (
                                    <div key={bulletIdx} className="flex items-center gap-1 mb-1">
                                      <span className="text-sm ml-1">•</span>
                                      <Input
                                        value={bullet}
                                        onChange={e => updateBulletPoint(section.id, item.id, bulletIdx, e.target.value)}
                                        className="h-7 text-sm"
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteBulletPoint(section.id, item.id, bulletIdx)}
                                        className="h-6 w-6"
                                      >
                                        <Trash2 size={12} />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </SortableItem>
                        ))}
                      </SortableList>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No items added yet
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => addSectionItem(section.id)}
                    >
                      <Plus size={14} className="mr-1" /> Add Item
                    </Button>
                  </div>
                )}
              </div>
            </SortableItem>
          ))}
        </SortableList>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          <p className="mb-4">No sections added yet</p>
          <Button variant="outline" onClick={addSection}>
            <Plus size={16} className="mr-1" /> Add Your First Section
          </Button>
        </div>
      )}
    </div>
  )
}

export default SectionsPanel

import { cn } from "@/lib/utils"; // Make sure cn is imported
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Keep Card imports if SectionItemEditor still uses them internally, otherwise remove
import { SortableItem, SortableList } from '@/components/ui/custom/SortableList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeHistoryStore, type Section, type SectionItem } from '@/lib/stores/resumeStore';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react'; // Keep if needed, otherwise remove
import { v4 as uuidv4 } from 'uuid';

// --- Helper Functions for State Updates ---

const createNewSection = (): Section => ({
  id: uuidv4(),
  title: 'New Section',
  items: [],
});

const createNewSectionItem = (): SectionItem => ({
  id: uuidv4(),
  type: 'default',
  label1: '',
  label2: '',
  label3: '',
  notes: '',
  bullets: [],
});

// --- Sub-Components for Rendering ---

interface BulletPointEditorProps {
  sectionId: string;
  itemId: string;
  bullet: string;
  index: number;
  updateBulletPoint: (sectionId: string, itemId: string, idx: number, value: string) => void;
  deleteBulletPoint: (sectionId: string, itemId: string, idx: number) => void;
}

const BulletPointEditor: React.FC<BulletPointEditorProps> = ({
  sectionId,
  itemId,
  bullet,
  index,
  updateBulletPoint,
  deleteBulletPoint,
}) => (
  <div className="flex items-center gap-1 mb-1">
    <span className="text-sm ml-1 text-muted-foreground"> • </span>
    <Input
      value={bullet}
      onChange={(e) => updateBulletPoint(sectionId, itemId, index, e.target.value)}
      className="h-7 text-sm flex-1"
      placeholder="Enter bullet point"
    />
    <Button
      variant="ghost"
      size="icon"
      onClick={() => deleteBulletPoint(sectionId, itemId, index)}
      className="h-6 w-6 text-muted-foreground hover:text-destructive"
      aria-label="Delete bullet point"
    >
      <Trash2 size={12} />
    </Button>
  </div>
);

// SectionItemEditor: Renders only the fields, no Card wrapper needed anymore
interface SectionItemEditorProps {
  sectionId: string;
  item: SectionItem;
  index: number; // Keep index if needed for display, otherwise remove
  updateSectionItem: (sectionId: string, itemId: string, field: string, value: any) => void;
  // deleteSectionItem is handled in the trigger now
  addBulletPoint: (sectionId: string, itemId: string) => void;
  updateBulletPoint: (sectionId: string, itemId: string, idx: number, value: string) => void;
  deleteBulletPoint: (sectionId: string, itemId: string, idx: number) => void;
}

const SectionItemEditor: React.FC<SectionItemEditorProps> = ({
  sectionId,
  item,
  updateSectionItem,
  addBulletPoint,
  updateBulletPoint,
  deleteBulletPoint,
}) => (
  <div className="space-y-3">
    <div>
      <Label className="text-xs">Field 1</Label>
      <Input
        value={item.label1 || ''} // Use label1
        onChange={(e) => updateSectionItem(sectionId, item.id, 'label1', e.target.value)} // Update label1
        className="h-7 text-sm"
      />
    </div>
    <div>
      <Label className="text-xs">Field 2</Label>
      <Input
        value={item.label2 || ''} // Use label2
        onChange={(e) => updateSectionItem(sectionId, item.id, 'label2', e.target.value)} // Update label2
        className="h-7 text-sm"
      />
    </div>
    <div>
      <Label className="text-xs">Field 3</Label>
      <Input
        value={item.label3 || ''} // Use label3
        onChange={(e) => updateSectionItem(sectionId, item.id, 'label3', e.target.value)} // Update label3
        className="h-7 text-sm"
      />
    </div>
    <div>
      <Label className="text-xs">Notes</Label>
      <Textarea
        value={item.notes || ''} // Use notes
        onChange={(e) => updateSectionItem(sectionId, item.id, 'notes', e.target.value)} // Update notes
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
          className="h-5 text-xs py-0 px-1 text-muted-foreground hover:text-foreground"
          onClick={() => addBulletPoint(sectionId, item.id)}
        >
          <Plus size={12} className="mr-1" /> Add
        </Button>
      </div>
      {(item.bullets || []).map((bullet, bulletIdx) => (
        <BulletPointEditor
          key={bulletIdx}
          sectionId={sectionId}
          itemId={item.id}
          bullet={bullet}
          index={bulletIdx}
          updateBulletPoint={updateBulletPoint}
          deleteBulletPoint={deleteBulletPoint}
        />
      ))}
      {(item.bullets || []).length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-1">No bullet points added.</p>
      )}
    </div>
  </div>
);


// --- Reusable Sortable Accordion Card ---
interface SortableAccordionCardProps {
  id: string;
  value: string;
  triggerTitle: React.ReactNode; // Only text or <span> for button
  controls?: React.ReactNode; // Controls (input, delete button, etc.)
  children: React.ReactNode;
  className?: string;
}

const SortableAccordionCard: React.FC<SortableAccordionCardProps> = ({
  id,
  value,
  triggerTitle,
  controls,
  children,
  className,
}) => {
  return (
    <SortableItem id={id} className={cn("bg-card rounded-md border overflow-hidden", className)}>
      <AccordionItem value={value} className="border-b-0">
        <div className="flex items-center p-2 gap-2 border-b">
          {/* Drag Handle */}
          <div
            className="cursor-move text-muted-foreground hover:text-foreground flex-shrink-0"
            onMouseDown={e => e.stopPropagation()}
            onTouchStart={e => e.stopPropagation()}
          >
            <GripVertical size={16} />
          </div>
          {/* AccordionTrigger: only text/span allowed */}
         <div className="flex-auto">
         <AccordionTrigger className="flex-auto w-full left-auto items-center p-2">
            {triggerTitle}
          </AccordionTrigger>

         </div>
          {/* Controls (input, delete button, etc.) */}
          {controls}
        </div>
        <AccordionContent className="px-3 pb-3 pt-3">
          {children}
        </AccordionContent>
      </AccordionItem>
    </SortableItem>
  );
};


// --- Main Component ---

const SectionsPanel = () => {
  const sections = useResumeHistoryStore(s => Array.isArray(s.present.resume.sections) ? s.present.resume.sections : []);
  const updateResume = useResumeHistoryStore(s => s.updateResume);

  // --- State Update Handlers (Simplified) ---

  const handleUpdate = (newSections: Section[]) => {
    updateResume({ sections: newSections.filter(Boolean) });
  };

  const addSection = () => {
    handleUpdate([...sections, createNewSection()]);
  };

  const deleteSection = (id: string) => {
    handleUpdate(sections.filter(s => s.id !== id));
  };

  const updateSectionTitle = (id: string, title: string) => {
    handleUpdate(sections.map(s => s.id === id ? { ...s, title } : s));
  };

  const addSectionItem = (sectionId: string) => {
    handleUpdate(sections.map(s =>
      s.id === sectionId
        ? { ...s, items: [...s.items, createNewSectionItem()] }
        : s
    ));
  };

  const deleteSectionItem = (sectionId: string, itemId: string) => {
    handleUpdate(sections.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.filter(i => i.id !== itemId) }
        : s
    ));
  };

  const updateSectionItem = (sectionId: string, itemId: string, field: keyof SectionItem, value: any) => {
    handleUpdate(sections.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) }
        : s
    ));
  };

  const addBulletPoint = (sectionId: string, itemId: string) => {
    handleUpdate(sections.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, bullets: [...(i.bullets || []), ''] } : i) }
        : s
    ));
  };

  const updateBulletPoint = (sectionId: string, itemId: string, idx: number, value: string) => {
    handleUpdate(sections.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, bullets: (i.bullets ?? []).map((b, bidx) => bidx === idx ? value : b) } : i) }
        : s
    ));
  };

  const deleteBulletPoint = (sectionId: string, itemId: string, idx: number) => {
    handleUpdate(sections.map(s =>
      s.id === sectionId
        ? { ...s, items: s.items.map(i => i.id === itemId ? { ...i, bullets: (i.bullets ?? []).filter((_, bidx) => bidx !== idx) } : i) }
        : s
    ));
  };

  // --- Sorting Handlers ---

  const handleSectionSort = (ids: string[]) => {
    const map = Object.fromEntries(sections.map(s => [s.id, s]));
    handleUpdate(ids.map(id => map[id]));
  };

  const handleItemSort = (sectionId: string, ids: string[]) => {
    handleUpdate(sections.map(s => {
      if (s.id === sectionId) {
        const itemMap = Object.fromEntries(s.items.map(i => [i.id, i]));
        return { ...s, items: ids.map(id => itemMap[id]).filter(Boolean) };
      }
      return s;
    }));
  };

  // --- Render Logic ---

  return (
    <div className="space-y-4 p-1">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-sm font-medium">Resume Sections</h3>
        <Button size="sm" variant="outline" onClick={addSection}>
          <Plus size={16} className="mr-1" /> Add Section
        </Button>
      </div>

      {sections.length > 0 ? (
        <SortableList
          items={sections.map(s => s.id)}
          onSortEnd={handleSectionSort}
          className="w-full "
        > 
          {/* Accordion itself doesn't need space-y if SortableList provides it */}
          <Accordion type="multiple" className="w-full space-y-2">
            {sections.map(section => (
              <SortableAccordionCard
                key={section.id}
                id={section.id}
                value={section.id}
                triggerTitle={
                  <Input
                    value={section.title}
                    onChange={e => updateSectionTitle(section.id, e.target.value)}
                    onClick={e => e.stopPropagation()} // Prevent accordion toggle
                    className="h-7 flex-1 text-sm"
                    placeholder="Section Title"
                  />
                }
                controls={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={e => { e.stopPropagation(); deleteSection(section.id); }}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0"
                    aria-label="Delete section"
                  >
                    <Trash2 size={14} />
                  </Button>
                }
              >
                {/* Content for the main section accordion */}
                <div className="space-y-3">
                  {section.items.length > 0 ? (
                    <SortableList
                      items={section.items.map(i => i.id)}
                      onSortEnd={ids => handleItemSort(section.id, ids)}
                      className="space-y-3"
                    >
                      {section.items.map((item, idx) => (
                        // Use SortableAccordionCard for items
                        <SortableAccordionCard
                          key={item.id}
                          id={item.id}
                          value={item.id} // Unique value for item accordion
                          triggerTitle={
                            <span className="text-sm font-medium flex-1 truncate">Item {idx + 1}</span>
                          }
                          controls={
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => { e.stopPropagation(); deleteSectionItem(section.id, item.id); }}
                              className="h-6 w-6 text-muted-foreground hover:text-destructive flex-shrink-0"
                              aria-label="Delete item"
                            >
                              <Trash2 size={14} />
                            </Button>
                          }
                        >
                          {/* Content for the item accordion: The editor fields */}
                          <SectionItemEditor
                            sectionId={section.id}
                            item={item}
                            index={idx}
                            updateSectionItem={updateSectionItem}
                            addBulletPoint={addBulletPoint}
                            updateBulletPoint={updateBulletPoint}
                            deleteBulletPoint={deleteBulletPoint}
                          />
                        </SortableAccordionCard>
                      ))}
                    </SortableList>
                  ) : (
                     <div className="text-center py-4 text-muted-foreground text-sm">
                       No items in this section yet.
                     </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => addSectionItem(section.id)}
                  >
                    <Plus size={14} className="mr-1" /> Add Item to Section
                  </Button>
                </div>
              </SortableAccordionCard>
            ))}
          </Accordion>
        </SortableList>
      ) : (
        <div className="text-center py-6 text-muted-foreground border rounded-md p-4">
          <p className="mb-4">No sections added yet.</p>
          <Button variant="outline" onClick={addSection}>
            <Plus size={16} className="mr-1" /> Add Your First Section
          </Button>
        </div>
      )}
      {/* Add new section button below all sections */}
      {sections.length > 0 && (
        <div className="flex justify-center pt-2">
          <Button variant="outline" onClick={addSection}>
            <Plus size={16} className="mr-1" /> Add New Section
          </Button>
        </div>
      )}
    </div>  
  );
};

export default SectionsPanel;
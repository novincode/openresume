'use client'

import React, { ReactNode } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/utils'

// Props for the sortable item
interface SortableItemProps {
  id: string
  children: ReactNode
  className?: string
}

// Sortable item component
export function SortableItem({ id, children, className }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : undefined,
    position: isDragging ? 'relative' : undefined,
    zIndex: isDragging ? 1 : undefined,
  } as React.CSSProperties

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={cn(
        isDragging && "ring-1 ring-primary ring-opacity-20 bg-background shadow-lg",
        className
      )}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

// Props for the sortable list
interface SortableListProps {
  items: string[]
  onSortEnd: (items: string[]) => void
  children: ReactNode
  className?: string
  strategy?: 'vertical' | 'horizontal'
}

// The main sortable list component
export function SortableList({ 
  items, 
  onSortEnd, 
  children,
  className,
  strategy = 'vertical'
}: SortableListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum drag distance before activation
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id.toString())
      const newIndex = items.indexOf(over.id.toString())
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = arrayMove(items, oldIndex, newIndex)
        onSortEnd(newItems)
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items} 
        strategy={strategy === 'vertical' ? verticalListSortingStrategy : undefined}
      >
        <div className={className}>
          {children}
        </div>
      </SortableContext>
    </DndContext>
  )
}

// Default export is the SortableList for convenience
export default SortableList

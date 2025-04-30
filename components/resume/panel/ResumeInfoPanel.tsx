'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import SectionsPanel from './SectionsPanel'

const ResumeInfoPanel = () => {
  const resume = useResumeHistoryStore(state => state.present.resume)
  const updateResume = useResumeHistoryStore(state => state.updateResume)

  // Track if the update is from user input or from store
  const isLocalUpdate = useRef(false)

  const [formData, setFormData] = useState({
    name: resume.name || '',
    description: resume.description || '',
    email: resume.contact?.email || '',
    phone: resume.contact?.phone || '',
    location: resume.contact?.location || '',
  })

  // Only update local state if the store values actually changed (not just on every render)
  useEffect(() => {
    if (
      resume.name !== formData.name ||
      resume.description !== formData.description ||
      (resume.contact?.email || '') !== formData.email ||
      (resume.contact?.phone || '') !== formData.phone ||
      (resume.contact?.location || '') !== formData.location
    ) {
      // Only update if not a local update (i.e., from store)
      if (!isLocalUpdate.current) {
        setFormData({
          name: resume.name || '',
          description: resume.description || '',
          email: resume.contact?.email || '',
          phone: resume.contact?.phone || '',
          location: resume.contact?.location || '',
        })
      }
    }
    isLocalUpdate.current = false
  }, [
    resume.name,
    resume.description,
    resume.contact?.email,
    resume.contact?.phone,
    resume.contact?.location
  ])

  // Update a single form field and the store immediately
  const updateField = (field: string, value: string) => {
    isLocalUpdate.current = true
    const newFormData = {
      ...formData,
      [field]: value
    }
    setFormData(newFormData)
    updateResume({
      name: field === 'name' ? value : newFormData.name,
      description: field === 'description' ? value : newFormData.description,
      contact: {
        email: field === 'email' ? value : newFormData.email,
        phone: field === 'phone' ? value : newFormData.phone,
        location: field === 'location' ? value : newFormData.location,
      }
    })
  }

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="w-full grid grid-cols-2 mb-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="sections">Sections</TabsTrigger>
      </TabsList>
      <TabsContent value="basic" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Professional Summary</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="A brief description of your professional background"
            rows={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="Phone number"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="City, Country"
          />
        </div>
      </TabsContent>
      <TabsContent value="sections">
        <SectionsPanel />
      </TabsContent>
    </Tabs>
  )
}

export default ResumeInfoPanel

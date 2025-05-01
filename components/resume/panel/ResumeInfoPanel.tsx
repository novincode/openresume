'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useResumeHistoryStore } from '@/lib/stores/resumeStore'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type FormFields = 'name' | 'description' | 'email' | 'phone' | 'location'

const fieldMeta: { key: FormFields; label: string; type?: string; component?: 'input' | 'textarea'; placeholder: string; rows?: number }[] = [
  { key: 'name', label: 'Name', placeholder: 'Enter your name' },
  { key: 'description', label: 'Professional Summary', component: 'textarea', placeholder: 'A brief description of your professional background', rows: 3 },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'your.email@example.com' },
  { key: 'phone', label: 'Phone', placeholder: 'Phone number' },
  { key: 'location', label: 'Location', placeholder: 'City, Country' },
]

const getInitialFormData = (resume: any) => ({
  name: resume.name || '',
  description: resume.description || '',
  email: resume.contact?.email || '',
  phone: resume.contact?.phone || '',
  location: resume.contact?.location || '',
})

const ResumeInfoPanel = () => {
  const resume = useResumeHistoryStore(state => state.present.resume)
  const updateResume = useResumeHistoryStore(state => state.updateResume)
  const isLocalUpdate = useRef(false)
  const [formData, setFormData] = useState(() => getInitialFormData(resume))

  // Sync local state with store
  useEffect(() => {
    const storeData = getInitialFormData(resume)
    if (JSON.stringify(storeData) !== JSON.stringify(formData) && !isLocalUpdate.current) {
      setFormData(storeData)
    }
    isLocalUpdate.current = false
  }, [resume])

  // Update a single form field and the store immediately
  const updateField = useCallback((field: FormFields, value: string) => {
    isLocalUpdate.current = true
    const newFormData = { ...formData, [field]: value }
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
  }, [formData, updateResume])

  return (
    <div className="space-y-4">
      {fieldMeta.map(({ key, label, type, component, placeholder, rows }) => (
        <div className="space-y-2" key={key}>
          <Label htmlFor={key}>{label}</Label>
          {component === 'textarea' ? (
            <Textarea
              id={key}
              value={formData[key]}
              onChange={e => updateField(key, e.target.value)}
              placeholder={placeholder}
              rows={rows}
            />
          ) : (
            <Input
              id={key}
              type={type}
              value={formData[key]}
              onChange={e => updateField(key, e.target.value)}
              placeholder={placeholder}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ResumeInfoPanel

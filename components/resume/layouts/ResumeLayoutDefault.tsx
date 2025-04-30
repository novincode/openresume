'use client'
import React from 'react'
import { mmToPx } from '@/lib/utils'
import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import { ResumeColors, ResumeData } from '@/lib/stores/resumeStore'
import {
  PDFSafeRender,
  Div,
  Section,
  H1,
  H2,
  P,
  Span,
  Strong,
  Ul,
  Li,
  H3,
} from '@/components/resume/component-mapping'

export interface ResumeLayoutProps {
  className?: string
  pdfRender?: boolean
  colors: ResumeColors
  page: { width: number; height: number }
  resume: ResumeData
}

const getStyles = (colors: ResumeColors) => StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: colors.background,
    minHeight: '100%',
  },
  section: {
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.title,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtitle,
    marginBottom: 4,
  },
  contact: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 0,
  },
  accent: {
    color: colors.accent,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    display: 'flex',
  },
  leftColumn: {
    width: '65%',
  },
  rightColumn: {
    width: '35%',
  },
  sectionTitle: {
    fontSize: 18,
    color: colors.title,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 8,
    paddingBottom: 2,
  },
  jobTitle: {
    fontSize: 14,
    color: colors.subtitle,
    fontWeight: 'bold',
  },
  org: {
    color: colors.accent,
    fontSize: 13,
  },
  date: {
    color: colors.subtitle,
    fontSize: 12,
    marginBottom: 2,
  },
  text: {
    color: colors.text,
    fontSize: 12,
    marginBottom: 2,
  },
  bullet: {
    color: colors.text,
    fontSize: 12,
    marginBottom: 2,
    paddingLeft: 10,
  },
  bulletMarker: {
    color: colors.accent,
    marginRight: 5,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginVertical: 8,
  },
})

const ResumeLayoutDefault = ({
  page,
  colors,
  resume,
  pdfRender = false,
}: ResumeLayoutProps) => {
  const styles = getStyles(colors)
  const sections = Array.isArray(resume.sections)
    ? resume.sections.filter(Boolean)
    : [];
  const midPoint = Math.ceil(sections.length / 2);
  const leftSections = sections.slice(0, midPoint);
  const rightSections = sections.slice(midPoint);

  const content = (
    <PDFSafeRender pdfRender={pdfRender}>
      <Div style={pdfRender ? styles.page : { padding: 24 }}>
        <Section style={pdfRender ? styles.header : { marginBottom: 32 }}>
          <H1 style={styles.name}>{resume.name || 'Your Name'}</H1>
          <H2 style={styles.subtitle}>{resume.description || ''}</H2>
          {(resume.contact?.email || resume.contact?.phone || resume.contact?.location) && (
            <P style={styles.contact}>
              {resume.contact?.email && <Span><Strong style={styles.accent}>Email:</Strong> {resume.contact.email}</Span>}
              {resume.contact?.email && (resume.contact?.phone || resume.contact?.location) && <Span style={{ margin: '0 8px' }}>|</Span>}
              {resume.contact?.phone && <Span><Strong style={styles.accent}>Phone:</Strong> {resume.contact.phone}</Span>}
              {resume.contact?.phone && resume.contact?.location && <Span style={{ margin: '0 8px' }}>|</Span>}
              {resume.contact?.location && <Span><Strong style={styles.accent}>Location:</Strong> {resume.contact.location}</Span>}
            </P>
          )}
        </Section>
        <Div style={pdfRender ? styles.content : { display: 'flex', flexDirection: 'row' }}>
          <Div style={pdfRender ? styles.leftColumn : { width: '65%' }}>
            {leftSections.map(section => (
              <Section key={section.id} style={pdfRender ? styles.section : { marginBottom: 16 }}>
                {section.title && <H2 style={styles.sectionTitle}>{section.title}</H2>}
                {section.items.map(item => (
                  <Div key={item.id} style={{ marginBottom: 10 }}>
                    {item.title && <H3 style={styles.jobTitle}>{item.title}</H3>}
                    {item.organization && <P style={styles.org}>{item.organization}</P>}
                    {item.date && <P style={styles.date}>{item.date}</P>}
                    {item.description && <P style={styles.text}>{item.description}</P>}
                    {item.bullets && item.bullets.length > 0 && (
                      <Ul>
                        {item.bullets.map((bullet, idx) => bullet ? <Li key={idx}><Span style={styles.bulletMarker}>•</Span>{bullet}</Li> : null)}
                      </Ul>
                    )}
                  </Div>
                ))}
              </Section>
            ))}
          </Div>
          <Div style={pdfRender ? styles.rightColumn : { width: '35%' }}>
            {rightSections.map(section => (
              <Section key={section.id} style={pdfRender ? styles.section : { marginBottom: 16 }}>
                {section.title && <H2 style={styles.sectionTitle}>{section.title}</H2>}
                {section.items.map(item => (
                  <Div key={item.id} style={{ marginBottom: 10 }}>
                    {item.title && <H3 style={styles.jobTitle}>{item.title}</H3>}
                    {item.organization && <P style={styles.org}>{item.organization}</P>}
                    {item.date && <P style={styles.date}>{item.date}</P>}
                    {item.description && <P style={styles.text}>{item.description}</P>}
                    {item.bullets && item.bullets.length > 0 && (
                      <Ul>
                        {item.bullets.map((bullet, idx) => bullet ? <Li key={idx}><Span style={styles.bulletMarker}>•</Span>{bullet}</Li> : null)}
                      </Ul>
                    )}
                  </Div>
                ))}
              </Section>
            ))}
          </Div>
        </Div>
      </Div>
    </PDFSafeRender>
  )

  if (pdfRender) {
    return (
      <Document>
        <Page size={{ width: mmToPx(page.width), height: mmToPx(page.height) }} style={styles.page}>
          {content}
        </Page>
      </Document>
    )
  }

  // HTML preview (for web, not PDF)
  return <div className="p-6">{content}</div>
}

export default ResumeLayoutDefault
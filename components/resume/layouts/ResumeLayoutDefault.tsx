'use client'
import React from 'react'
import { mmToPx } from '@/lib/utils'
import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import { ResumeColors, ResumeData, ResumeFonts, defaultFonts } from '@/lib/stores/resumeStore'
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
  fonts: ResumeFonts
}

const getStyles = (colors: ResumeColors, fonts: ResumeFonts) => StyleSheet.create({
  page: {
    padding: 12,
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
  name: { // Use headingSize
    fontSize: fonts.headingSize,
    fontWeight: 'bold',
    color: colors.title,
    marginBottom: 2,
  },
  subtitle: { // Use subheadingSize
    fontSize: fonts.subheadingSize,
    color: colors.subtitle,
    marginBottom: 4,
  },
  contact: { // Use contactSize (New)
    fontSize: fonts.contactSize,
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
  sectionTitle: { // Use subheadingSize
    fontSize: fonts.subheadingSize,
    color: colors.title,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 8,
    paddingBottom: 2,
  },
  itemLabel1: { // Use accentSize (e.g., for Job Title, Degree)
    fontSize: fonts.accentSize,
    color: colors.subtitle, // Keep color for now, maybe make configurable later
    fontWeight: 'bold',
  },
  itemLabel2: { // Use bodySize (e.g., for Organization, School)
    color: colors.accent, // Keep accent color for now
    fontSize: fonts.bodySize,
  },
  itemLabel3: { // Use labelSize (New, e.g., for Date)
    color: colors.subtitle,
    fontSize: fonts.labelSize,
    marginBottom: 2,
  },
  notesText: { // Use bodySize
    color: colors.text,
    fontSize: fonts.bodySize,
    marginBottom: 2,
  },
  bullet: { // Use bodySize
    color: colors.text,
    fontSize: fonts.bodySize,
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
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  contactItem: { // Use contactSize (New)
    fontSize: fonts.contactSize,
    color: colors.text,
    marginRight: 8,
  },
  contactSeparator: {
    color: colors.accent,
    marginRight: 8,
    marginLeft: 8,
    fontWeight: 'bold',
  },
})

export default function ResumeLayoutDefault({
  resume,
  colors,
  page,
  fonts = defaultFonts, // use defaultFonts from resumeStore
  pdfRender,
}: {
  resume: ResumeData;
  colors: ResumeColors;
  page: { width: number; height: number };
  fonts?: ResumeFonts;
  pdfRender?: boolean;
}) {
  const styles = getStyles(colors, fonts)
  const sections = Array.isArray(resume.sections)
    ? resume.sections.filter(Boolean)
    : [];
  const midPoint = Math.ceil(sections.length / 2);
  const leftSections = sections.slice(0, midPoint);
  const rightSections = sections.slice(midPoint);

  const contactItems = [
    resume.contact?.email && (
      <Span key="email" style={styles.contactItem}>
        <Strong style={styles.accent}>Email:</Strong> {resume.contact.email}
      </Span>
    ),
    resume.contact?.phone && (
      <Span key="phone" style={styles.contactItem}>
        <Strong style={styles.accent}>Phone:</Strong> {resume.contact.phone}
      </Span>
    ),
    resume.contact?.location && (
      <Span key="location" style={styles.contactItem}>
        <Strong style={styles.accent}>Location:</Strong> {resume.contact.location}
      </Span>
    ),
  ].filter(Boolean);

  const contactRow = (
    <Div style={styles.contactRow}>
      {contactItems.map((item, idx) => (
        <React.Fragment key={idx}>
          {item}
          {idx < contactItems.length - 1 && (
            <Span style={styles.contactSeparator}>|</Span>
          )}
        </React.Fragment>
      ))}
    </Div>
  );

  const content = (
    <PDFSafeRender pdfRender={pdfRender}>
      <Div style={styles.page}>
        <Section style={styles.header}>
          <H1 style={styles.name}>{resume.name || 'Your Name'}</H1>
          <H2 style={styles.subtitle}>{resume.description || ''}</H2>
          {contactItems.length > 0 && contactRow}
        </Section>
        <Div style={styles.content}>
          <Div style={styles.leftColumn}>
            {leftSections.map(section => (
              <Section key={section.id} style={styles.section}>
                {section.title && <H2 style={styles.sectionTitle}>{section.title}</H2>}
                {section.items.map(item => (
                  <Div key={item.id} style={{ marginBottom: 10 }}>
                    {/* Use new semantic styles */} 
                    {item.label1 && <H3 style={styles.itemLabel1}>{item.label1}</H3>}
                    {item.label2 && <P style={styles.itemLabel2}>{item.label2}</P>}
                    {item.label3 && <P style={styles.itemLabel3}>{item.label3}</P>}
                    {item.notes && <P style={styles.notesText}>{item.notes}</P>}
                    {item.bullets && item.bullets.length > 0 && (
                      <Ul>
                        {item.bullets.map((bullet, idx) => bullet ? <Li key={idx} style={styles.bullet}><Span style={styles.bulletMarker}>•</Span>{bullet}</Li> : null)}
                      </Ul>
                    )}
                  </Div>
                ))}
              </Section>
            ))}
          </Div>
          <Div style={styles.rightColumn}>
            {rightSections.map(section => (
              <Section key={section.id} style={styles.section}>
                {section.title && <H2 style={styles.sectionTitle}>{section.title}</H2>}
                {section.items.map(item => (
                  <Div key={item.id} style={{ marginBottom: 10 }}>
                    {/* Use new semantic styles */} 
                    {item.label1 && <H3 style={styles.itemLabel1}>{item.label1}</H3>}
                    {item.label2 && <P style={styles.itemLabel2}>{item.label2}</P>}
                    {item.label3 && <P style={styles.itemLabel3}>{item.label3}</P>}
                    {item.notes && <P style={styles.notesText}>{item.notes}</P>}
                    {item.bullets && item.bullets.length > 0 && (
                      <Ul>
                        {item.bullets.map((bullet, idx) => bullet ? <Li key={idx} style={styles.bullet}><Span style={styles.bulletMarker}>•</Span>{bullet}</Li> : null)}
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
  return <div style={styles.page}>{content}</div>
}
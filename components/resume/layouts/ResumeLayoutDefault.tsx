'use client'
import { cn, mmToPx } from '@/lib/utils'
import React from 'react'
import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import { Div, H1, H2, H3, P, PDFSafeRender, Span, Strong } from '../component-mapping'
import { useResumeHistoryStore, ResumeColors, ResumeData } from '@/lib/stores/resumeStore'

// Steady layout props type for all resume layouts/components
export interface ResumeLayoutProps {
  className?: string
  pdfRender?: boolean
  colors: ResumeColors
  page: { width: number; height: number }
  resume: ResumeData
}

const ResumeLayoutDefault = ({ className = "", page, colors, resume, pdfRender = false }: ResumeLayoutProps) => {
  // Get colors from resume store

  // Only use StyleSheet.create for all styles
  const styles = StyleSheet.create({
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
      gap: '5%', // use percentage for gap if supported, otherwise remove gap and rely on column widths
      display: 'flex',
    },
    leftColumn: {
      width: '65%', // already percentage
    },
    rightColumn: {
      width: '35%', // already percentage
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
      marginBottom: 4,
    },
    divider: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginVertical: 8,
    },
  });

  const layoutContent = (
    <PDFSafeRender pdfRender={pdfRender}>
      <Div style={styles.page}>
        {/* Header Section */}
        <Div style={styles.header}>
          <H1 style={styles.name}>John Doe</H1>
          <P style={styles.subtitle}>Frontend Developer</P>
          <P style={styles.contact}>
            <Span style={styles.accent}>Email:</Span> john.doe@example.com {'  '}
            <Span style={styles.accent}>Phone:</Span> (123) 456-7890 {'  '}
            <Span style={styles.accent}>Location:</Span> New York, NY
          </P>
        </Div>

        {/* Content Section */}
        <Div style={styles.content}>
          {/* Left Column */}
          <Div style={styles.leftColumn}>
            {/* Experience Section */}
            <Div style={styles.section}>
              <H2 style={styles.sectionTitle}>Experience</H2>
              <Div style={{ marginBottom: 10 }}>
                <H3 style={styles.jobTitle}>Senior Frontend Developer</H3>
                <P style={styles.org}>Tech Company Inc.</P>
                <P style={styles.date}>Jan 2020 - Present</P>
                <P style={styles.text}>Led the development of responsive web applications using React, Next.js, and TypeScript. Implemented design systems and improved performance by 40%.</P>
              </Div>
              <Div style={{ marginBottom: 10 }}>
                <H3 style={styles.jobTitle}>Frontend Developer</H3>
                <P style={styles.org}>Digital Solutions LLC</P>
                <P style={styles.date}>Mar 2018 - Dec 2019</P>
                <P style={styles.text}>Developed and maintained client websites, optimized for performance and accessibility.</P>
              </Div>
            </Div>
            {/* Education Section */}
            <Div style={styles.section}>
              <H2 style={styles.sectionTitle}>Education</H2>
              <Div>
                <H3 style={styles.jobTitle}>BS in Computer Science</H3>
                <P style={styles.org}>University of Technology</P>
                <P style={styles.date}>2014 - 2018</P>
                <P style={styles.text}>Focus on Web Technologies and User Interface Design</P>
              </Div>
            </Div>
          </Div>
          {/* Right Column */}
          <Div style={styles.rightColumn}>
            {/* Skills Section */}
            <Div style={styles.section}>
              <H2 style={styles.sectionTitle}>Skills</H2>
              <Div style={{ marginBottom: 8 }}>
                <H3 style={styles.jobTitle}>Programming</H3>
                <P style={styles.text}>JavaScript, TypeScript, HTML, CSS, React, Next.js</P>
              </Div>
              <Div style={{ marginBottom: 8 }}>
                <H3 style={styles.jobTitle}>Tools</H3>
                <P style={styles.text}>Git, VS Code, Figma, Jest</P>
              </Div>
              <Div style={{ marginBottom: 8 }}>
                <H3 style={styles.jobTitle}>Languages</H3>
                <P style={styles.text}>English (Native), Spanish (Intermediate)</P>
              </Div>
            </Div>
            {/* Certifications Section */}
            <Div style={styles.section}>
              <H2 style={styles.sectionTitle}>Certifications</H2>
              <Div style={{ marginBottom: 8 }}>
                <P style={styles.text}><Strong style={styles.accent}>Frontend Developer Certification</Strong></P>
                <P style={styles.date}>Tech Academy, 2019</P>
              </Div>
              <Div style={{ marginBottom: 8 }}>
                <P style={styles.text}><Strong style={styles.accent}>UI/UX Design Fundamentals</Strong></P>
                <P style={styles.date}>Design Institute, 2020</P>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </PDFSafeRender>
  );

  if (pdfRender) {
    return (
      <Document>
        <Page size={{ width: mmToPx(page.width), height: mmToPx(page.height) }}>{layoutContent}</Page>
      </Document>
    );
  }

  return (
    <>
      {layoutContent}
    </>
  );
};

export default ResumeLayoutDefault
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Github, ArrowLeft } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-8 bg-gradient-to-b from-background to-muted">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            About <span className="text-primary">OpenResume</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            OpenResume is a free, open source, privacy-first resume builder. Our mission is to empower job seekers with beautiful, ATS-friendly resumes—no sign-up, no paywall, no nonsense.
          </p>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-8 px-6 sm:px-10">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                {/* Replace this sample text with your own story or project details */}
                OpenResume was created to make professional resume building accessible to everyone. We believe your data should stay yours, and you shouldn’t have to pay or register to get a great job application. Our platform is open source, so you can contribute, customize, or self-host as you wish.
              </p>
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
                <li>Modern, ATS-optimized templates</li>
                <li>Instant PDF downloads</li>
                <li>No sign-up or account required</li>
                <li>100% privacy—your data stays on your device</li>
                <li>Completely open source</li>
              </ul>
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="text-muted-foreground mb-6">
                Want to contribute or report an issue? Check out our GitHub repo or contact us. We welcome feedback and contributions from the community!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/">
                    <ArrowLeft className="h-4 w-4" /> Home
                  </Link>
                </Button>
                <Button asChild variant="default" className="gap-2">
                  <a href="https://github.com/novincode/openresume" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-background mt-auto">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold">OpenResume</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Made by <a href="https://codeideal.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">CodeIdeal</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

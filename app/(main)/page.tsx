import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Github, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  Download
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center space-y-8 bg-gradient-to-b from-background to-muted">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Create an <span className="text-primary">ATS-Friendly</span> Resume in Minutes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Free, fast, and no sign-up required. Build a professional resume that passes applicant tracking systems and lands you interviews.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Button asChild size="lg" className="gap-2">
              <Link href="/create">
                Start Creating <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="https://github.com/yourusername/resumemaker" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" /> GitHub Repo
              </a>
            </Button>
          </div>
        </div>
        
        {/* Mock Resume Preview */}
        <div className="relative w-full max-w-3xl mt-12">
          <div className="bg-card rounded-lg shadow-2xl p-6 border border-border">
            <div className="h-64 md:h-80 bg-accent/10 rounded-md flex items-center justify-center">
              <FileText size={64} className="text-primary opacity-50" />
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
            <Zap size={24} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use Our Resume Builder?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="ATS Optimized"
              description="Our resumes are designed to pass through Applicant Tracking Systems with ease, increasing your chances of landing interviews."
            />
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-primary" />}
              title="Quick & Easy"
              description="Create a professional resume in minutes, not hours. Our intuitive interface guides you through each step."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="100% Private"
              description="No sign-up required. Your data stays on your device and is never stored on our servers."
            />
            <FeatureCard 
              icon={<Download className="h-8 w-8 text-primary" />}
              title="Free Downloads"
              description="Download your resume in PDF format for free. No hidden fees or premium features."
            />
            <FeatureCard 
              icon={<FileText className="h-8 w-8 text-primary" />}
              title="Modern Templates"
              description="Choose from professionally designed templates that employers love."
            />
            <FeatureCard 
              icon={<Github className="h-8 w-8 text-primary" />}
              title="Open Source"
              description="This project is completely open source. Contribute, customize, or self-host as you like."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Create Your Resume?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No sign-up, no credit card, no nonsense. Just a beautiful, ATS-friendly resume in minutes.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/create">
              Start Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold">Resume Maker</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Built with ❤️ for job seekers everywhere • {new Date().getFullYear()}
          </div>
          <div>
            <a 
              href="https://github.com/yourusername/resumemaker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
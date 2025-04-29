import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Provider from "@/components/providers/Provider";
import { HotkeysProvider } from "react-hotkeys-hook";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Resume Builder | CodeIdeal",
  description: "Create professional resumes easily and quickly with the Online Resume Builder by CodeIdeal.",
  authors: [{ name: "CodeIdeal" }],
  creator: "CodeIdeal",
  keywords: [
    "resume builder",
    "online resume",
    "CV generator",
    "professional resume",
    "CodeIdeal",
    "job application",
    "resume template"
  ],
  openGraph: {
    title: "Online Resume Builder | CodeIdeal",
    description: "Build your professional resume online with ease. Made by CodeIdeal.",
    // url: "https://your-domain.com",
    siteName: "Online Resume Builder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Resume Builder | CodeIdeal",
    description: "Create your professional resume online. Made by CodeIdeal.",
    creator: "@CodeIdeal",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}

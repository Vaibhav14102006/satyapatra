import type React from "react"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { CursorTrail } from "@/components/cursor-trail"
import "./globals.css"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins"
})

export const metadata = {
  title: "SatyaPatra - AI Email Security | सत्यपत्र",
  description: "Detect phishing and spam emails with advanced AI analysis | उन्नत AI विश्लेषण के साथ फिशिंग और स्पैम ईमेल का पता लगाएं",
  generator: "SatyaPatra",
  keywords: "email security, phishing detection, AI analysis, spam detection, सत्यपत्र, ईमेल सुरक्षा",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="neon">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider defaultTheme="neon" defaultLanguage="en">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "neon" | "government" | "system"
type Language = "en" | "hi"

interface ThemeContextType {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultLanguage = "en",
  storageKey = "satyapatra-theme",
  languageKey = "satyapatra-language",
  ...props
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultLanguage?: Language
  storageKey?: string
  languageKey?: string
} & React.ComponentProps<"div">) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("neon", "government", "light", "dark")

    // Load saved preferences
    const savedTheme = localStorage.getItem(storageKey) as Theme
    const savedLanguage = localStorage.getItem(languageKey) as Language
    
    if (savedTheme) {
      setTheme(savedTheme)
    }
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [storageKey, languageKey])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("neon", "government", "light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "neon" : "government"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Set CSS variables based on theme
    if (theme === "neon" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      // Neon futuristic theme
      root.style.setProperty('--background', 'oklch(0.05 0 0)')
      root.style.setProperty('--foreground', 'oklch(0.98 0 0)')
      root.style.setProperty('--card', 'oklch(0.08 0 0)')
      root.style.setProperty('--primary', 'oklch(0.7 0.25 260)') // Neon blue
      root.style.setProperty('--accent', 'oklch(0.65 0.25 285)') // Electric purple
      root.style.setProperty('--secondary', 'oklch(0.6 0.3 200)') // Cyan
      root.style.setProperty('--border', 'oklch(0.15 0.1 260)')
      root.style.setProperty('--muted', 'oklch(0.2 0 0)')
      root.style.setProperty('--ring', 'oklch(0.7 0.25 260)')
    } else {
      // Government-friendly theme (professional)
      root.style.setProperty('--background', 'oklch(0.99 0 0)')
      root.style.setProperty('--foreground', 'oklch(0.08 0 0)')
      root.style.setProperty('--card', 'oklch(1 0 0)')
      root.style.setProperty('--card-foreground', 'oklch(0.08 0 0)')
      root.style.setProperty('--primary', 'oklch(0.35 0.18 230)') // Professional dark blue
      root.style.setProperty('--primary-foreground', 'oklch(0.99 0 0)')
      root.style.setProperty('--accent', 'oklch(0.45 0.25 25)') // Professional orange
      root.style.setProperty('--secondary', 'oklch(0.4 0.12 140)') // Professional green
      root.style.setProperty('--border', 'oklch(0.88 0 0)')
      root.style.setProperty('--muted', 'oklch(0.96 0 0)')
      root.style.setProperty('--muted-foreground', 'oklch(0.35 0 0)')
      root.style.setProperty('--ring', 'oklch(0.35 0.18 230)')
    }

    // Store preferences
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  useEffect(() => {
    localStorage.setItem(languageKey, language)
    document.documentElement.lang = language
  }, [language, languageKey])

  const value = {
    theme,
    language,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme)
    },
    setLanguage: (newLanguage: Language) => {
      setLanguage(newLanguage)
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      <div className="relative">
        {children}
        {/* Neon theme specific background effects */}
        {(theme === "neon" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) && (
          <>
            <div className="fixed inset-0 pointer-events-none z-0">
              {/* Animated background blobs */}
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00bfff]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob opacity-70"></div>
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 opacity-70"></div>
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#00bfff]/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 opacity-70"></div>
              
              {/* Grid overlay */}
              <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0, 191, 255, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 191, 255, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />
            </div>
          </>
        )}
      </div>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

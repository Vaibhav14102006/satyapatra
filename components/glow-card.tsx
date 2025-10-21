"use client"

import type React from "react"

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: "primary" | "accent" | "secondary"
}

export function GlowCard({ children, className = "", glowColor = "primary" }: GlowCardProps) {
  const glowClasses = {
    primary: "hover:shadow-lg hover:shadow-primary/50",
    accent: "hover:shadow-lg hover:shadow-accent/50",
    secondary: "hover:shadow-lg hover:shadow-secondary/50",
  }

  return (
    <div
      className={`p-6 rounded-lg bg-card border border-border transition-all duration-300 ${glowClasses[glowColor]} ${className}`}
    >
      {children}
    </div>
  )
}

"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "./theme-provider"

interface CursorPosition {
  x: number
  y: number
  id: number
}

export function CursorTrail() {
  const { theme } = useTheme()
  const [positions, setPositions] = useState<CursorPosition[]>([])

  useEffect(() => {
    if (theme !== "neon" && theme !== "system") return

    let animationFrame: number
    let mousePositions: { x: number; y: number; timestamp: number }[] = []
    let idCounter = 0

    const handleMouseMove = (e: MouseEvent) => {
      mousePositions.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      })

      // Keep only recent positions (last 100ms)
      const now = Date.now()
      mousePositions = mousePositions.filter(pos => now - pos.timestamp < 100)
    }

    const animate = () => {
      const now = Date.now()
      
      // Create new trail points
      if (mousePositions.length > 0) {
        const latest = mousePositions[mousePositions.length - 1]
        setPositions(prev => [
          ...prev.slice(-8), // Keep only last 8 trail points
          {
            x: latest.x,
            y: latest.y,
            id: idCounter++
          }
        ])
      }

      // Remove old positions
      setPositions(prev => prev.filter((_, index) => index >= prev.length - 8))

      animationFrame = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [theme])

  if (theme !== "neon" && theme !== "system") return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {positions.map((pos, index) => (
        <div
          key={pos.id}
          className="absolute w-4 h-4 rounded-full pointer-events-none"
          style={{
            left: pos.x - 8,
            top: pos.y - 8,
            background: `radial-gradient(circle, rgba(0, 191, 255, ${0.8 - index * 0.1}) 0%, rgba(139, 92, 246, ${0.4 - index * 0.05}) 50%, transparent 70%)`,
            transform: `scale(${1 - index * 0.1})`,
            animation: `pulse-glow 0.5s ease-out`,
            animationDelay: `${index * 50}ms`
          }}
        />
      ))}
    </div>
  )
}
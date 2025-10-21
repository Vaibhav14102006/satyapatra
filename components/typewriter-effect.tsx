"use client"

import React, { useState, useEffect } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export function TypewriterEffect({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "",
  onComplete 
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, currentIndex === 0 ? delay : speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete])

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </span>
  )
}

interface MultilineTypewriterProps {
  lines: string[]
  speed?: number
  lineDelay?: number
  className?: string
}

interface MultiWordTypewriterProps {
  words: { text: string; className?: string }[]
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
  className?: string
}

export function MultilineTypewriter({ 
  lines, 
  speed = 50, 
  lineDelay = 1000, 
  className = "" 
}: MultilineTypewriterProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  const handleLineComplete = () => {
    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1)
      }, lineDelay)
    }
  }

  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={index} className="min-h-[1.5em]">
          {index <= currentLineIndex && (
            <TypewriterEffect
              text={line}
              speed={speed}
              delay={index === 0 ? 0 : 0}
              onComplete={index === currentLineIndex ? handleLineComplete : undefined}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export function MultiWordTypewriter({
  words,
  typeSpeed = 150,
  deleteSpeed = 100,
  delayBetweenWords = 2000,
  className = ""
}: MultiWordTypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[currentWordIndex].text
    
    if (isWaiting) {
      const timer = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, delayBetweenWords)
      return () => clearTimeout(timer)
    }

    if (!isDeleting && currentText === currentWord) {
      setIsWaiting(true)
      return
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
      }
    }, isDeleting ? deleteSpeed : typeSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentWordIndex, isDeleting, isWaiting, words, typeSpeed, deleteSpeed, delayBetweenWords])

  if (words.length === 0) return null

  const currentWordClassName = words[currentWordIndex].className || ""

  return (
    <span className={`${className} ${currentWordClassName}`}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
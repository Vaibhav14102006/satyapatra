"use client"

import { Lightbulb } from "lucide-react"

const TIPS = [
  "Always verify sender email addresses carefully - phishers often use similar-looking addresses",
  "Hover over links to see the actual URL before clicking",
  "Be suspicious of urgent requests for personal or financial information",
  "Check for spelling and grammar errors - legitimate companies usually proofread",
  "Never download attachments from unknown senders",
  "Look for generic greetings like 'Dear Customer' instead of your name",
  "Verify unexpected requests by contacting the company directly",
  "Enable two-factor authentication on important accounts",
]

export function QuickTips() {
  return (
    <div className="space-y-3">
      {TIPS.map((tip, i) => (
        <div key={i} className="p-4 rounded-lg bg-card border border-border flex gap-3">
          <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">{tip}</p>
        </div>
      ))}
    </div>
  )
}

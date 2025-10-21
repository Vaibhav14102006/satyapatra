"use client"

import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

interface ThreatIndicator {
  name: string
  description: string
  severity: "high" | "medium" | "low"
}

const COMMON_THREATS: ThreatIndicator[] = [
  {
    name: "Urgency Language",
    description: "Emails using urgent language to pressure action",
    severity: "high",
  },
  {
    name: "Suspicious URLs",
    description: "Links to unknown or shortened domains",
    severity: "high",
  },
  {
    name: "Phishing Keywords",
    description: "Common phishing-related words and phrases",
    severity: "medium",
  },
  {
    name: "Unusual Sender",
    description: "Email from unexpected or spoofed sender",
    severity: "high",
  },
  {
    name: "Request for Credentials",
    description: "Asking for passwords or personal information",
    severity: "high",
  },
  {
    name: "Attachment Warnings",
    description: "Suspicious or unexpected attachments",
    severity: "medium",
  },
]

export function ThreatIndicators() {
  return (
    <div className="space-y-3">
      {COMMON_THREATS.map((threat) => (
        <div key={threat.name} className="p-4 rounded-lg bg-card border border-border">
          <div className="flex items-start gap-3">
            {threat.severity === "high" ? (
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            ) : threat.severity === "medium" ? (
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            ) : (
              <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-semibold">{threat.name}</h4>
              <p className="text-sm text-muted-foreground">{threat.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

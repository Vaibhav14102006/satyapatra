"use client"

import { useState, useEffect } from "react"
import { Trash2, Eye } from "lucide-react"
import type { AnalysisResult } from "@/lib/email-utils"
import { getRiskColor } from "@/lib/email-utils"

interface HistoryItem {
  id: string
  subject: string
  sender: string
  result: AnalysisResult
  timestamp: Date
}

export function AnalysisHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("analysisHistory")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setHistory(parsed.map((item: HistoryItem) => ({ ...item, timestamp: new Date(item.timestamp) })))
      } catch (e) {
        console.error("Failed to load history:", e)
      }
    }
  }, [])

  const deleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id)
    setHistory(updated)
    localStorage.setItem("analysisHistory", JSON.stringify(updated))
  }

  if (history.length === 0) {
    return (
      <div className="p-8 rounded-lg bg-card border border-border border-dashed text-center">
        <p className="text-muted-foreground">No analysis history yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div
          key={item.id}
          className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{item.subject || "(No subject)"}</p>
              <p className="text-sm text-muted-foreground truncate">{item.sender}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.timestamp.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${getRiskColor(item.result.riskScore)}`}>
                {item.result.riskScore}%
              </span>
              <button className="p-2 hover:bg-background rounded transition-colors">
                <Eye className="w-4 h-4 text-muted-foreground" />
              </button>
              <button onClick={() => deleteItem(item.id)} className="p-2 hover:bg-background rounded transition-colors">
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

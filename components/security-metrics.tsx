"use client"

import { TrendingUp, Shield, Lock, AlertCircle } from "lucide-react"

interface AnalysisResult {
  riskScore: number
  trustScore: number
  legitimacyScore: number
  securityScore: number
}

export function SecurityMetrics({ result }: { result: AnalysisResult }) {
  const metrics = [
    {
      label: "Trust Score",
      value: result.trustScore,
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Legitimacy",
      value: result.legitimacyScore,
      icon: Lock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Security",
      value: result.securityScore,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Risk Level",
      value: result.riskScore,
      icon: AlertCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((metric, i) => {
        const Icon = metric.icon
        return (
          <div key={i} className="p-3 sm:p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">{metric.label}</span>
              <div className={`p-1.5 sm:p-2 rounded-lg ${metric.bgColor}`}>
                <Icon className={`w-3 h-3 sm:w-4 sm:h-4 ${metric.color}`} />
              </div>
            </div>
            <div className={`text-xl sm:text-2xl font-bold ${metric.color}`}>{metric.value}%</div>
            <div className="w-full bg-muted rounded-full h-1 sm:h-1.5 mt-2">
              <div
                className={`h-1 sm:h-1.5 rounded-full ${
                  metric.label === "Risk Level"
                    ? "bg-red-500"
                    : metric.label === "Trust Score"
                      ? "bg-green-500"
                      : metric.label === "Legitimacy"
                        ? "bg-blue-500"
                        : "bg-purple-500"
                }`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

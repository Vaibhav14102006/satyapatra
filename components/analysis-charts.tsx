"use client"

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalysisResult {
  riskScore: number
  trustScore: number
  legitimacyScore: number
  securityScore: number
  riskFactors: {
    name: string
    weight: number
    detected: boolean
  }[]
}

export function AnalysisCharts({ result }: { result: AnalysisResult }) {
  const scoreData = [
    { name: "Risk", value: result.riskScore, fill: "#ef4444" },
    { name: "Trust", value: result.trustScore, fill: "#22c55e" },
    { name: "Legitimacy", value: result.legitimacyScore, fill: "#3b82f6" },
    { name: "Security", value: result.securityScore, fill: "#8b5cf6" },
  ]

  const riskFactorData = result.riskFactors
    .filter((f) => f.detected)
    .map((f) => ({
      name: f.name,
      weight: f.weight,
    }))

  const scoreDistribution = [
    { name: "Safe", value: Math.max(0, 100 - result.riskScore), fill: "#22c55e" },
    { name: "Risk", value: result.riskScore, fill: "#ef4444" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {/* Score Comparison */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-sm sm:text-base">Security Scores</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Comprehensive analysis metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={scoreData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <YAxis stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {scoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Distribution */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="text-sm sm:text-base">Risk Distribution</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Safe vs Risk percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={scoreDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      {riskFactorData.length > 0 && (
        <Card className="bg-card border-border md:col-span-2">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-sm sm:text-base">Detected Risk Factors</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Breakdown of identified threats</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={riskFactorData} layout="vertical" margin={{ top: 5, right: 10, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis type="number" stroke="var(--color-muted-foreground)" tick={{ fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={75}
                  stroke="var(--color-muted-foreground)"
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Bar dataKey="weight" fill="#f97316" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

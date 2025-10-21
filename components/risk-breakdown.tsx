"use client"

interface AnalysisResult {
  riskFactors: {
    name: string
    weight: number
    detected: boolean
  }[]
}

export function RiskBreakdown({ result }: { result: AnalysisResult }) {
  const detectedFactors = result.riskFactors.filter((f) => f.detected)

  if (detectedFactors.length === 0) {
    return (
      <div className="p-4 sm:p-6 rounded-lg bg-card border border-border">
        <h3 className="font-semibold mb-3 text-sm sm:text-base">Risk Factors</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">No significant risk factors detected.</p>
      </div>
    )
  }

  const totalWeight = detectedFactors.reduce((sum, f) => sum + f.weight, 0)

  return (
    <div className="p-4 sm:p-6 rounded-lg bg-card border border-border">
      <h3 className="font-semibold mb-4 text-sm sm:text-base">Risk Factor Breakdown</h3>
      <div className="space-y-3">
        {detectedFactors.map((factor, i) => {
          const percentage = (factor.weight / totalWeight) * 100
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs sm:text-sm font-medium">{factor.name}</span>
                <span className="text-xs text-muted-foreground">{factor.weight} pts</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

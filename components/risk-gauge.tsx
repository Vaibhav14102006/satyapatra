"use client"

interface RiskGaugeProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function RiskGauge({ score, size = "md" }: RiskGaugeProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  const getColor = (score: number) => {
    if (score < 20) return "from-green-500 to-green-600"
    if (score < 40) return "from-blue-500 to-blue-600"
    if (score < 60) return "from-yellow-500 to-yellow-600"
    if (score < 80) return "from-orange-500 to-orange-600"
    return "from-red-500 to-red-600"
  }

  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={getColor(score).split(" ")[1]} />
            <stop offset="100%" stopColor={getColor(score).split(" ")[3]} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`font-bold ${textSizeClasses[size]}`}>{score}%</span>
      </div>
    </div>
  )
}

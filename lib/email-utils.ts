export interface EmailData {
  subject: string
  sender: string
  content: string
  timestamp: Date
}

export interface AnalysisResult {
  isPhishing: boolean
  riskScore: number
  indicators: string[]
  keywords: string[]
  urls: string[]
  recommendations: string[]
}

/**
 * Extract URLs from email content
 */
export function extractUrls(content: string): string[] {
  const urlRegex = /(https?:\/\/[^\s]+)/gi
  return content.match(urlRegex) || []
}

/**
 * Extract domain from email address
 */
export function extractDomain(email: string): string {
  const match = email.match(/@(.+)$/)
  return match ? match[1] : ""
}

/**
 * Check if domain is suspicious
 */
export function isSuspiciousDomain(domain: string): boolean {
  const suspiciousDomains = ["bit.ly", "tinyurl.com", "short.link", "goo.gl", "ow.ly"]
  return suspiciousDomains.some((suspicious) => domain.toLowerCase().includes(suspicious))
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
  ])

  return text
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word))
    .slice(0, 10)
}

/**
 * Calculate text similarity (simple implementation)
 */
export function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.toLowerCase().split(/\s+/))
  const words2 = new Set(text2.toLowerCase().split(/\s+/))

  const intersection = new Set([...words1].filter((x) => words2.has(x)))
  const union = new Set([...words1, ...words2])

  return union.size === 0 ? 0 : intersection.size / union.size
}

/**
 * Format risk score as readable text
 */
export function getRiskLevel(score: number): string {
  if (score < 20) return "Very Low"
  if (score < 40) return "Low"
  if (score < 60) return "Medium"
  if (score < 80) return "High"
  return "Very High"
}

/**
 * Get risk color based on score
 */
export function getRiskColor(score: number): string {
  if (score < 20) return "text-green-500"
  if (score < 40) return "text-blue-500"
  if (score < 60) return "text-yellow-500"
  if (score < 80) return "text-orange-500"
  return "text-red-500"
}

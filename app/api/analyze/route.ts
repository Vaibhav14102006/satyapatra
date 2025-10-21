import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email address is required" }, { status: 400 })
    }

    // Analyze email address
    const analysis = analyzeEmailAddress(email)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze email" }, { status: 500 })
  }
}

interface EmailAnalysis {
  email: string
  domain: string
  isPhishing: boolean
  riskScore: number
  trustScore: number
  legitimacyScore: number
  securityScore: number
  indicators: {
    category: string
    items: string[]
    severity: "low" | "medium" | "high"
  }[]
  domainAnalysis: {
    age: string
    reputation: string
    isPopular: boolean
    suspiciousPatterns: string[]
  }
  recommendations: string[]
  riskFactors: {
    name: string
    weight: number
    detected: boolean
  }[]
}

function analyzeEmailAddress(email: string): EmailAnalysis {
  const emailLower = email.toLowerCase().trim()
  const [localPart, domain] = emailLower.split("@")

  if (!domain) {
    return {
      email: emailLower,
      domain: "",
      isPhishing: true,
      riskScore: 100,
      trustScore: 0,
      legitimacyScore: 0,
      securityScore: 0,
      indicators: [
        {
          category: "Format",
          items: ["Invalid email format"],
          severity: "high",
        },
      ],
      domainAnalysis: {
        age: "Unknown",
        reputation: "Invalid",
        isPopular: false,
        suspiciousPatterns: ["No domain found"],
      },
      recommendations: ["This is not a valid email address"],
      riskFactors: [],
    }
  }

  let riskScore = 0
  const indicators: EmailAnalysis["indicators"] = []
  const riskFactors: EmailAnalysis["riskFactors"][] = []

  // 1. Domain Analysis
  const domainAnalysis = analyzeDomain(domain)
  if (domainAnalysis.suspiciousPatterns.length > 0) {
    riskScore += domainAnalysis.suspiciousPatterns.length * 15
    indicators.push({
      category: "Domain Reputation",
      items: domainAnalysis.suspiciousPatterns,
      severity: "high",
    })
  }

  // 2. Local Part Analysis
  const localAnalysis = analyzeLocalPart(localPart)
  if (localAnalysis.suspiciousPatterns.length > 0) {
    riskScore += localAnalysis.suspiciousPatterns.length * 10
    indicators.push({
      category: "Username Pattern",
      items: localAnalysis.suspiciousPatterns,
      severity: "medium",
    })
  }

  // 3. Typosquatting Detection
  const typosquattingRisk = detectTyposquatting(domain)
  if (typosquattingRisk.detected) {
    riskScore += 20
    riskFactors.push({
      name: "Typosquatting Risk",
      weight: 20,
      detected: true,
    })
    indicators.push({
      category: "Typosquatting",
      items: typosquattingRisk.details,
      severity: "high",
    })
  }

  // 4. Domain Age & Reputation
  const domainReputation = assessDomainReputation(domain)
  if (!domainReputation.isLegitimate) {
    riskScore += domainReputation.riskIncrease
    riskFactors.push({
      name: "Domain Reputation",
      weight: domainReputation.riskIncrease,
      detected: true,
    })
  }

  // 5. Free Email Service Detection
  const freeEmailRisk = detectFreeEmailService(domain)
  if (freeEmailRisk.isFreeService) {
    riskScore += 5
    riskFactors.push({
      name: "Free Email Service",
      weight: 5,
      detected: true,
    })
  }

  // 6. Special Character Analysis
  const specialCharRisk = analyzeSpecialCharacters(email)
  if (specialCharRisk.suspicious) {
    riskScore += 10
    riskFactors.push({
      name: "Suspicious Characters",
      weight: 10,
      detected: true,
    })
  }

  // Normalize scores
  riskScore = Math.min(100, riskScore)
  const trustScore = Math.max(0, 100 - riskScore)
  const legitimacyScore = calculateLegitimacyScore(domain, localPart, riskScore)
  const securityScore = calculateSecurityScore(email, riskScore)

  const isPhishing = riskScore > 45

  const recommendations = generateRecommendations(isPhishing, riskScore, domain, localAnalysis, domainAnalysis)

  return {
    email: emailLower,
    domain,
    isPhishing,
    riskScore,
    trustScore,
    legitimacyScore,
    securityScore,
    indicators,
    domainAnalysis,
    recommendations,
    riskFactors,
  }
}

function analyzeDomain(domain: string): {
  suspiciousPatterns: string[]
  reputation: string
} {
  const patterns: string[] = []

  // Check for suspicious TLDs
  const suspiciousTLDs = [".tk", ".ml", ".ga", ".cf", ".pw", ".xyz", ".top", ".download"]
  if (suspiciousTLDs.some((tld) => domain.endsWith(tld))) {
    patterns.push(`Suspicious TLD: ${domain.split(".").pop()}`)
  }

  // Check for numbers in domain
  if (/\d{3,}/.test(domain)) {
    patterns.push("Excessive numbers in domain")
  }

  // Check for hyphens (common in phishing)
  if ((domain.match(/-/g) || []).length > 2) {
    patterns.push("Multiple hyphens in domain")
  }

  // Check for very long domain
  if (domain.length > 30) {
    patterns.push("Unusually long domain name")
  }

  // Check for homograph attacks
  if (/[0O][0O]|[1l][1l]|[5S]/.test(domain)) {
    patterns.push("Potential homograph attack characters")
  }

  return {
    suspiciousPatterns: patterns,
    reputation: patterns.length === 0 ? "Good" : "Suspicious",
  }
}

function analyzeLocalPart(localPart: string): {
  suspiciousPatterns: string[]
} {
  const patterns: string[] = []

  // Check for generic names
  const genericNames = ["admin", "support", "noreply", "no-reply", "info", "contact", "help"]
  if (genericNames.includes(localPart)) {
    patterns.push(`Generic username: ${localPart}`)
  }

  // Check for random characters
  if (/[^a-z0-9._-]/.test(localPart)) {
    patterns.push("Contains special characters")
  }

  // Check for excessive dots
  if ((localPart.match(/\./g) || []).length > 2) {
    patterns.push("Excessive dots in username")
  }

  return { suspiciousPatterns: patterns }
}

function detectTyposquatting(domain: string): {
  detected: boolean
  details: string[]
} {
  const details: string[] = []
  const commonDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com", "protonmail.com"]

  // Check for common typos
  for (const common of commonDomains) {
    const similarity = calculateStringSimilarity(domain, common)
    if (similarity > 0.7 && similarity < 1) {
      details.push(`Resembles legitimate domain: ${common}`)
    }
  }

  return {
    detected: details.length > 0,
    details,
  }
}

function detectFreeEmailService(domain: string): {
  isFreeService: boolean
  service: string
} {
  const freeServices: { [key: string]: string } = {
    "gmail.com": "Gmail",
    "yahoo.com": "Yahoo",
    "outlook.com": "Outlook",
    "hotmail.com": "Hotmail",
    "aol.com": "AOL",
    "protonmail.com": "ProtonMail",
    "mail.com": "Mail.com",
    "yandex.com": "Yandex",
  }

  return {
    isFreeService: domain in freeServices,
    service: freeServices[domain] || "Unknown",
  }
}

function analyzeSpecialCharacters(email: string): {
  suspicious: boolean
  details: string[]
} {
  const details: string[] = []

  if (email.includes("..")) {
    details.push("Consecutive dots detected")
  }

  if (email.startsWith(".") || email.endsWith(".")) {
    details.push("Email starts or ends with dot")
  }

  return {
    suspicious: details.length > 0,
    details,
  }
}

function assessDomainReputation(domain: string): {
  isLegitimate: boolean
  riskIncrease: number
} {
  // Known legitimate domains
  const legitimateDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "microsoft.com",
    "apple.com",
    "google.com",
    "amazon.com",
    "facebook.com",
    "linkedin.com",
  ]

  if (legitimateDomains.includes(domain)) {
    return { isLegitimate: true, riskIncrease: 0 }
  }

  // Check if domain has proper structure
  const parts = domain.split(".")
  if (parts.length < 2) {
    return { isLegitimate: false, riskIncrease: 30 }
  }

  return { isLegitimate: true, riskIncrease: 0 }
}

function calculateLegitimacyScore(domain: string, localPart: string, riskScore: number): number {
  let score = 100

  // Deduct for risk factors
  score -= riskScore * 0.7

  // Bonus for known legitimate domains
  const legitimateDomains = ["gmail.com", "yahoo.com", "outlook.com", "microsoft.com", "apple.com"]
  if (legitimateDomains.includes(domain)) {
    score += 20
  }

  // Bonus for professional-looking local part
  if (/^[a-z]+\.[a-z]+$/.test(localPart) || /^[a-z]+[0-9]{1,3}$/.test(localPart)) {
    score += 10
  }

  return Math.max(0, Math.min(100, score))
}

function calculateSecurityScore(email: string, riskScore: number): number {
  let score = 100

  // Deduct based on risk
  score -= riskScore * 0.8

  // Check for length (longer emails are generally safer)
  if (email.length > 20) {
    score += 5
  }

  // Check for complexity
  if (/[a-z]/.test(email) && /[0-9]/.test(email)) {
    score += 5
  }

  return Math.max(0, Math.min(100, score))
}

function calculateStringSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const editDistance = getEditDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

function getEditDistance(s1: string, s2: string): number {
  const costs: number[] = []

  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j
      } else if (j > 0) {
        let newValue = costs[j - 1]
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
        }
        costs[j - 1] = lastValue
        lastValue = newValue
      }
    }
    if (i > 0) costs[s2.length] = lastValue
  }

  return costs[s2.length]
}

function generateRecommendations(
  isPhishing: boolean,
  riskScore: number,
  domain: string,
  localAnalysis: { suspiciousPatterns: string[] },
  domainAnalysis: { suspiciousPatterns: string[] },
): string[] {
  const recommendations: string[] = []

  if (isPhishing) {
    recommendations.push("⚠️ HIGH RISK: Be extremely cautious with emails from this address")
    recommendations.push("Do not click links or download attachments from this sender")
    recommendations.push("Do not provide personal, financial, or password information")
    recommendations.push("Report this email address as phishing to your email provider")
  } else if (riskScore > 30) {
    recommendations.push("⚠️ MEDIUM RISK: Exercise caution with this email address")
    recommendations.push("Verify the sender's identity through an independent channel")
    recommendations.push("Be cautious before clicking links or downloading attachments")
  } else {
    recommendations.push("✓ LOW RISK: This email address appears legitimate")
    recommendations.push("However, always verify sender identity independently")
    recommendations.push("Be cautious of emails requesting sensitive information")
  }

  if (domainAnalysis.suspiciousPatterns.length > 0) {
    recommendations.push(`Domain concerns: ${domainAnalysis.suspiciousPatterns[0]}`)
  }

  if (localAnalysis.suspiciousPatterns.length > 0) {
    recommendations.push(`Username concerns: ${localAnalysis.suspiciousPatterns[0]}`)
  }

  return recommendations
}

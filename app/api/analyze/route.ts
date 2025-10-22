import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, qrText } = await request.json()

    // Allow analysis if either email is provided OR qrText/QR data exists
    // Accept empty email strings if QR data is provided
    const hasValidEmail = email && typeof email === "string" && email.trim() !== ""
    const hasQrData = qrText && typeof qrText === "string" && qrText !== ""
    
    if (!hasValidEmail && !hasQrData) {
      return NextResponse.json({ error: "Email address or QR data is required" }, { status: 400 })
    }

    // Analyze email address (pass qrText too) - handle empty email for QR-only analysis
    const emailToAnalyze = hasValidEmail ? email.trim() : ""
    // Handle special case where QR was uploaded but not decoded
    const qrDataForAnalysis = qrText === "QR_UPLOADED_NO_TEXT" ? "QR content could not be decoded" : qrText
    const analysis = analyzeEmailAddress(emailToAnalyze, qrDataForAnalysis)

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

function analyzeEmailAddress(email: string | undefined | null, qrText?: string): EmailAnalysis {
  const emailLower = email && typeof email === 'string' ? email.toLowerCase().trim() : ''
  const parts = emailLower ? emailLower.split("@") : ["", ""]
  const localPart = parts[0] || ""
  const domain = parts[1] || ""

  let riskScore = 0
  const indicators: EmailAnalysis["indicators"] = []
  const riskFactors: EmailAnalysis["riskFactors"] = []

  // Base score starts at 0 for valid emails, add risk factors
  let baseRisk = 0

  // 1. Basic email format validation
  if (!emailLower.includes('@') || domain === '' || localPart === '') {
    baseRisk += 30
    indicators.push({
      category: "Format Issue",
      items: ["Invalid email format - missing @ or domain"],
      severity: "high",
    })
  }

  // 2. Domain Analysis
  const domainAnalysis = analyzeDomain(domain)
  if (domainAnalysis.suspiciousPatterns.length > 0) {
    const domainRisk = domainAnalysis.suspiciousPatterns.length * 12
    riskScore += domainRisk
    riskFactors.push({
      name: "Domain Issues",
      weight: domainRisk,
      detected: true,
    })
    indicators.push({
      category: "Domain Reputation",
      items: domainAnalysis.suspiciousPatterns,
      severity: domainAnalysis.suspiciousPatterns.length > 2 ? "high" : "medium",
    })
  }

  // 3. Local Part Analysis (more detailed)
  const localAnalysis = analyzeLocalPart(localPart)
  if (localAnalysis.suspiciousPatterns.length > 0) {
    const localRisk = localAnalysis.suspiciousPatterns.length * 8
    riskScore += localRisk
    riskFactors.push({
      name: "Username Pattern",
      weight: localRisk,
      detected: true,
    })
    indicators.push({
      category: "Username Analysis",
      items: localAnalysis.suspiciousPatterns,
      severity: "medium",
    })
  }

  // 4. Enhanced Typosquatting Detection
  const typosquattingRisk = detectTyposquatting(domain)
  if (typosquattingRisk.detected) {
    const typoRisk = 25
    riskScore += typoRisk
    riskFactors.push({
      name: "Typosquatting Risk",
      weight: typoRisk,
      detected: true,
    })
    indicators.push({
      category: "Potential Impersonation",
      items: typosquattingRisk.details,
      severity: "high",
    })
  }

  // 5. Domain Reputation & Age
  const domainReputation = assessDomainReputation(domain)
  if (!domainReputation.isLegitimate) {
    riskScore += domainReputation.riskIncrease
    riskFactors.push({
      name: "Domain Reputation",
      weight: domainReputation.riskIncrease,
      detected: true,
    })
    indicators.push({
      category: "Domain Trust",
      items: [`Low domain reputation (${domainReputation.reason})`],
      severity: domainReputation.riskIncrease > 20 ? "high" : "medium",
    })
  } else {
    // Bonus for trusted domains
    riskScore = Math.max(0, riskScore - 10)
    indicators.push({
      category: "Domain Trust",
      items: ["Recognized legitimate domain"],
      severity: "low",
    })
  }

  // 6. Email Service Provider Analysis
  const freeEmailRisk = detectFreeEmailService(domain)
  if (freeEmailRisk.isFreeService) {
    riskScore += 3 // Lower risk for known free services
    riskFactors.push({
      name: "Free Email Service",
      weight: 3,
      detected: true,
    })
    indicators.push({
      category: "Service Type",
      items: [`Free email service: ${freeEmailRisk.service}`],
      severity: "low",
    })
  }

  // 7. Advanced Character Analysis
  const specialCharRisk = analyzeSpecialCharacters(emailLower)
  if (specialCharRisk.suspicious) {
    const charRisk = specialCharRisk.details.length * 6
    riskScore += charRisk
    riskFactors.push({
      name: "Suspicious Characters",
      weight: charRisk,
      detected: true,
    })
    indicators.push({
      category: "Character Analysis",
      items: specialCharRisk.details,
      severity: "medium",
    })
  }

  // 8. Length and Complexity Analysis
  if (emailLower.length > 50) {
    riskScore += 10
    indicators.push({
      category: "Format Issue",
      items: ["Unusually long email address"],
      severity: "medium",
    })
  } else if (emailLower.length < 5) {
    riskScore += 15
    indicators.push({
      category: "Format Issue",
      items: ["Suspiciously short email address"],
      severity: "medium",
    })
  }

  // 9. QR-derived heuristics (enhanced)
  if (qrText && typeof qrText === 'string') {
    const qrRisk = analyzeQRContent(qrText)
    riskScore += qrRisk.riskIncrease
    if (qrRisk.indicators.length > 0) {
      indicators.push({
        category: "QR Content Analysis",
        items: qrRisk.indicators,
        severity: qrRisk.riskIncrease > 20 ? "high" : "medium",
      })
    }
  }

  // Apply base risk and normalize
  riskScore += baseRisk
  riskScore = Math.min(100, Math.max(0, riskScore))
  
  const trustScore = Math.max(0, 100 - riskScore)
  const legitimacyScore = calculateLegitimacyScore(domain, localPart, riskScore)
  const securityScore = calculateSecurityScore(emailLower, riskScore)

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
  age: string
  reputation: string
  isPopular: boolean
  suspiciousPatterns: string[]
} {
  const patterns: string[] = []

  // Check if domain is empty or undefined
  if (!domain || domain.trim() === '') {
    patterns.push("No domain provided")
    return {
      age: "Unknown",
      reputation: "Unknown",
      isPopular: false,
      suspiciousPatterns: patterns,
    }
  }

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

  // Determine popularity
  const popularDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "aol.com"]
  const isPopular = popularDomains.includes(domain)

  return {
    suspiciousPatterns: patterns,
    reputation: patterns.length === 0 ? "Good" : "Suspicious",
    age: isPopular ? "Established" : "Unknown",
    isPopular: isPopular,
  }
}

function analyzeLocalPart(localPart: string): {
  suspiciousPatterns: string[]
} {
  const patterns: string[] = []

  // Check if local part is empty
  if (!localPart || localPart.trim() === '') {
    patterns.push("No username provided")
    return { suspiciousPatterns: patterns }
  }

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
  reason: string
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
    return { isLegitimate: true, riskIncrease: 0, reason: "Known legitimate service" }
  }

  // Check if domain has proper structure
  const parts = domain.split(".")
  if (parts.length < 2) {
    return { isLegitimate: false, riskIncrease: 30, reason: "Invalid domain structure" }
  }

  // Check for suspicious patterns
  if (domain.includes("secure") || domain.includes("verify") || domain.includes("account")) {
    return { isLegitimate: false, riskIncrease: 25, reason: "Contains suspicious keywords" }
  }

  if (domain.length < 5) {
    return { isLegitimate: false, riskIncrease: 20, reason: "Suspiciously short domain" }
  }

  if (/\d{4,}/.test(domain)) {
    return { isLegitimate: false, riskIncrease: 15, reason: "Contains many numbers" }
  }

  return { isLegitimate: true, riskIncrease: 5, reason: "Unknown domain" }
}

// Add the missing analyzeQRContent function
function analyzeQRContent(qrText: string): {
  riskIncrease: number
  indicators: string[]
} {
  const indicators: string[] = []
  let riskIncrease = 0

  const qt = qrText.toLowerCase()

  // Check for URLs
  if (/https?:\/\//.test(qt) || /www\./.test(qt)) {
    // Check for suspicious TLDs in the QR URL
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.pw', '.xyz', '.top', '.download']
    if (suspiciousTLDs.some(t => qt.includes(t))) {
      riskIncrease += 25
      indicators.push('QR contains suspicious URL/TLD')
    } else {
      // URLs pointing to known good domains slightly reduce risk
      const goodDomains = ['gmail.com','google.com','microsoft.com','apple.com']
      if (goodDomains.some(d => qt.includes(d))) {
        riskIncrease -= 10
        indicators.push('QR points to known domain')
      } else {
        riskIncrease += 10
        indicators.push('QR contains external URL')
      }
    }
  }

  // Check for IP addresses
  if (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(qt)) {
    riskIncrease += 20
    indicators.push('QR contains IP address')
  }

  // Check for email-like strings
  const emailLike = qt.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/)
  if (emailLike && emailLike[0]) {
    const subAnalysis = analyzeDomain(emailLike[0].split('@')[1])
    if (subAnalysis.suspiciousPatterns.length > 0) {
      riskIncrease += subAnalysis.suspiciousPatterns.length * 10
      indicators.push('QR contains suspicious email')
    }
  }

  // Check for suspicious keywords
  const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'update', 'confirm']
  if (suspiciousKeywords.some(keyword => qt.includes(keyword))) {
    riskIncrease += 15
    indicators.push('QR contains suspicious keywords')
  }

  return { riskIncrease: Math.max(0, riskIncrease), indicators }
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

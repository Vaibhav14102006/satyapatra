import React from "react"
import { motion } from "framer-motion"
import { useTheme } from "./theme-provider"

interface SatyaPatraLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  variant?: "eye" | "shield"
  className?: string
}

export function SatyaPatraLogo({ 
  size = "md", 
  showText = true, 
  variant = "eye",
  className = "" 
}: SatyaPatraLogoProps) {
  const { theme } = useTheme()
  const isGovTheme = theme === "government"
  
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-xl" },
    lg: { icon: 48, text: "text-3xl" }
  }

  const currentSize = sizes[size]

  // Colors based on theme
  const primaryColor = isGovTheme ? "#3553e6" : "#00bfff"
  const secondaryColor = isGovTheme ? "#296835" : "#8b5cf6"
  const backgroundColor = isGovTheme ? "rgba(53, 83, 230, 0.1)" : "rgba(0, 191, 255, 0.1)"
  const borderColor = isGovTheme ? "rgba(53, 83, 230, 0.3)" : "rgba(0, 191, 255, 0.3)"

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Logo Icon - Envelope with Eye/Shield */}
      <motion.div 
        className="relative p-2 rounded-lg backdrop-blur-sm border"
        style={{ 
          backgroundColor: backgroundColor,
          borderColor: borderColor
        }}
        whileHover={{ 
          boxShadow: isGovTheme 
            ? "0 0 15px rgba(53, 83, 230, 0.3), 0 0 25px rgba(53, 83, 230, 0.1)"
            : "0 0 20px rgba(0, 191, 255, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)",
          borderColor: isGovTheme ? "rgba(53, 83, 230, 0.6)" : "rgba(0, 191, 255, 0.6)"
        }}
        transition={{ duration: 0.3 }}
      >
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Envelope Base */}
          <path
            d="M4 8V24C4 25.1046 4.89543 26 6 26H26C27.1046 26 28 25.1046 28 24V8C28 6.89543 27.1046 6 26 6H6C4.89543 6 4 6.89543 4 8Z"
            stroke="url(#envelopeGradient)"
            strokeWidth="1.5"
            fill="rgba(0, 191, 255, 0.1)"
          />
          
          {/* Envelope Flap */}
          <path
            d="M4 8L16 16L28 8"
            stroke="url(#envelopeGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {variant === "eye" ? (
            /* Eye in the center */
            <>
              {/* Eye outline */}
              <ellipse
                cx="16"
                cy="16"
                rx="6"
                ry="4"
                stroke="url(#eyeGradient)"
                strokeWidth="1.5"
                fill="rgba(139, 92, 246, 0.2)"
              />
              {/* Pupil */}
              <circle
                cx="16"
                cy="16"
                r="2"
                fill="url(#pupilGradient)"
              />
              {/* Glint */}
              <circle
                cx="17"
                cy="15"
                r="0.5"
                fill="white"
              />
            </>
          ) : (
            /* Shield in the center */
            <>
              <path
                d="M16 10C16 10 12 10 12 12V18C12 20 16 22 16 22C16 22 20 20 20 18V12C20 10 16 10 16 10Z"
                stroke="url(#shieldGradient)"
                strokeWidth="1.5"
                fill="rgba(139, 92, 246, 0.2)"
              />
              {/* Checkmark */}
              <path
                d="M14 16L15.5 17.5L18 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Gradients */}
          <defs>
            <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="100%" stopColor={secondaryColor} />
            </linearGradient>
            <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
            <linearGradient id="pupilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isGovTheme ? "#1e3a8a" : "#4c1d95"} />
              <stop offset="100%" stopColor={isGovTheme ? "#1e40af" : "#1e40af"} />
            </linearGradient>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={secondaryColor} />
              <stop offset="100%" stopColor={primaryColor} />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-lg blur-sm" style={{ 
          background: isGovTheme 
            ? "linear-gradient(135deg, rgba(53, 83, 230, 0.1), rgba(41, 104, 53, 0.1))"
            : "linear-gradient(135deg, rgba(0, 191, 255, 0.1), rgba(139, 92, 246, 0.1))"
        }}></div>
      </motion.div>

      {/* Text */}
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className={`${currentSize.text} font-bold bg-clip-text text-transparent`}
            style={{
              background: isGovTheme 
                ? "linear-gradient(90deg, #3553e6, #296835)"
                : "linear-gradient(90deg, #00bfff, #ffffff, #8b5cf6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text"
            }}>
            SatyaPatra
          </span>
          <span className="text-xs font-medium" style={{ 
            color: isGovTheme ? "#666666" : "#00bfff99" 
          }}>
            सत्यपत्र
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
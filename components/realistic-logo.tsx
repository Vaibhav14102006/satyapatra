"use client"

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
    sm: { icon: 28, text: "text-lg" },
    md: { icon: 36, text: "text-xl" },
    lg: { icon: 52, text: "text-3xl" }
  }

  const currentSize = sizes[size]

  return (
    <motion.div 
      className={`flex items-center gap-3 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Realistic Logo Icon */}
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div 
          className="rounded-xl p-3 shadow-lg border-2"
          style={{
            width: currentSize.icon + 16,
            height: currentSize.icon + 16,
            background: isGovTheme 
              ? "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
              : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            borderColor: isGovTheme ? "#e2e8f0" : "#334155",
            boxShadow: isGovTheme 
              ? "0 4px 20px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7)"
              : "0 4px 20px rgba(0, 191, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Email envelope with modern design */}
          <svg
            width={currentSize.icon}
            height={currentSize.icon}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Envelope body with realistic shadow */}
            <path
              d="M4 9C4 7.89543 4.89543 7 6 7H26C27.1046 7 28 7.89543 28 9V23C28 24.1046 27.1046 25 26 25H6C4.89543 25 4 24.1046 4 23V9Z"
              fill={isGovTheme ? "#f1f5f9" : "#1e293b"}
              stroke={isGovTheme ? "#3b82f6" : "#00bfff"}
              strokeWidth="1.5"
            />
            
            {/* Envelope flap with gradient */}
            <path
              d="M4 9L16 17L28 9"
              stroke={isGovTheme ? "#1e40af" : "#0ea5e9"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Security element based on variant */}
            {variant === "eye" ? (
              <>
                {/* Eye for truth detection */}
                <ellipse
                  cx="16"
                  cy="16"
                  rx="5"
                  ry="3"
                  fill={isGovTheme ? "#dbeafe" : "#1e293b"}
                  stroke={isGovTheme ? "#3b82f6" : "#00bfff"}
                  strokeWidth="1.5"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="2"
                  fill={isGovTheme ? "#1e40af" : "#0ea5e9"}
                />
                <circle
                  cx="17"
                  cy="15"
                  r="0.8"
                  fill={isGovTheme ? "#ffffff" : "#ffffff"}
                />
              </>
            ) : (
              <>
                {/* Shield for protection */}
                <path
                  d="M16 11C16 11 12.5 11 12.5 12.5V17.5C12.5 19.5 16 21 16 21C16 21 19.5 19.5 19.5 17.5V12.5C19.5 11 16 11 16 11Z"
                  fill={isGovTheme ? "#dbeafe" : "#1e293b"}
                  stroke={isGovTheme ? "#10b981" : "#00d9ff"}
                  strokeWidth="1.5"
                />
                <path
                  d="M14 16L15.5 17.5L18 15"
                  stroke={isGovTheme ? "#059669" : "#ffffff"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </>
            )}
            
            {/* Decorative elements for modern look */}
            <circle
              cx="8"
              cy="12"
              r="1"
              fill={isGovTheme ? "#cbd5e1" : "#475569"}
              opacity="0.6"
            />
            <circle
              cx="24"
              cy="20"
              r="1.5"
              fill={isGovTheme ? "#e2e8f0" : "#64748b"}
              opacity="0.4"
            />
          </svg>
        </div>
      </motion.div>

      {/* Text with professional styling */}
      {showText && (
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span 
            className={`${currentSize.text} font-bold leading-tight`}
            style={{
              background: isGovTheme 
                ? "linear-gradient(90deg, #1e40af, #059669)"
                : "linear-gradient(90deg, #0ea5e9, #3b82f6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontWeight: 700,
              letterSpacing: "-0.02em"
            }}
          >
            SatyaPatra
          </span>
          <span 
            className="text-xs font-medium leading-tight"
            style={{ 
              color: isGovTheme ? "#64748b" : "#94a3b8",
              marginTop: "-2px"
            }}
          >
            सत्यपत्र
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
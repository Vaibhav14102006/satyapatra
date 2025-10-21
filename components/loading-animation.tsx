"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface LoadingAnimationProps {
  message?: string
  subMessage?: string
}

export function LoadingAnimation({ 
  message = "Analyzing", 
  subMessage = "Please wait while we scan your email..."
}: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Logo with pulse animation */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8"
      >
        <Image
          src="/images/brand-logo.svg"
          alt="SatyaPatra Logo"
          width={160}
          height={48}
          className="h-12 w-auto"
        />
      </motion.div>

      {/* Scanning radar */}
      <div className="relative w-32 h-32 mb-6">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00bfff]/20"></div>
        
        {/* Middle circle */}
        <div className="absolute inset-4 rounded-full border border-[#00bfff]/30"></div>
        
        {/* Inner circle */}
        <div className="absolute inset-8 rounded-full border border-[#8b5cf6]/40"></div>
        
        {/* Scanning line */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-gradient-to-b from-[#00bfff] to-transparent transform -translate-x-0.5 origin-bottom"></div>
          </div>
        </motion.div>
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#8b5cf6] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#00bfff]/40"
          animate={{ 
            scale: [1, 1.5], 
            opacity: [0.6, 0] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-[#8b5cf6]/40"
          animate={{ 
            scale: [1, 1.3], 
            opacity: [0.4, 0] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Text */}
      <motion.div 
        className="text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {message}
        </h3>
        <p className="text-sm text-muted-foreground">
          {subMessage}
        </p>
      </motion.div>

      {/* Progress dots */}
      <div className="flex gap-1 mt-6">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-[#00bfff] rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}
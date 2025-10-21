"use client"

import { Navbar } from "@/components/navbar"
import { EmailAnalyzer } from "@/components/email-analyzer"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Analyze() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00bfff] via-white to-[#8b5cf6] bg-clip-text text-transparent">
                {t("analyzeTitle")}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t("analyzeSubtitle")}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Image
                src="/images/data-analysis.svg"
                alt="Email Analysis Dashboard"
                width={400}
                height={250}
                className="w-full h-auto rounded-xl border border-[#00bfff]/20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analyzer Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <EmailAnalyzer />
      </motion.div>
      
      {/* Additional security info section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Advanced Security Features</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#00bfff] rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Real-time Threat Detection</h3>
                  <p className="text-muted-foreground text-sm">AI-powered analysis of email headers, content, and attachments</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#8b5cf6] rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Government-Grade Security</h3>
                  <p className="text-muted-foreground text-sm">Meets official security standards and compliance requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-foreground">Privacy Protection</h3>
                  <p className="text-muted-foreground text-sm">Your data is analyzed locally and never stored on our servers</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="aspect-square rounded-lg overflow-hidden border border-[#00bfff]/20">
                <Image
                  src="/images/server-room.svg"
                  alt="Secure Infrastructure"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-[#8b5cf6]/20">
                <Image
                  src="/images/security-monitoring.svg"
                  alt="Security Monitoring"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-[#10b981]/20">
                <Image
                  src="/images/analytics-dashboard.svg"
                  alt="Analytics Dashboard"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden border border-[#f59e0b]/20">
                <Image
                  src="/images/network-security.svg"
                  alt="Network Security"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

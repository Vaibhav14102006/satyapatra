"use client"

import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { ArrowRight, Shield, Zap, Lock, Eye, Mail } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"
import { TypewriterEffect, MultiWordTypewriter } from "@/components/typewriter-effect"
import Image from "next/image"

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated tagline */}
          <motion.div 
            className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-[#00bfff]/10 to-[#8b5cf6]/10 border border-[#00bfff]/30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] bg-clip-text text-transparent">
              {t("tagline")}
            </span>
          </motion.div>

          {/* Hero title with typewriter effect */}
          <motion.div
            className="text-5xl sm:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MultiWordTypewriter
              words={[
                { text: "SatyaPatra", className: "bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] bg-clip-text text-transparent" },
                { text: "सत्यपत्र", className: "bg-gradient-to-r from-[#8b5cf6] to-[#00bfff] bg-clip-text text-transparent" }
              ]}
              typeSpeed={150}
              deleteSpeed={100}
              delayBetweenWords={2000}
            />
          </motion.div>

          {/* Hero subtitle */}
          <motion.p 
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t("heroSubtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/analyze"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] text-white font-semibold hover:from-[#00bfff]/90 hover:to-[#8b5cf6]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00bfff]/25 flex items-center justify-center gap-2"
              >
                {t("startAnalyzing")} 
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/about"
                className="px-8 py-3 rounded-lg border border-[#00bfff]/50 text-primary font-semibold hover:bg-[#00bfff]/10 hover:border-[#00bfff] transition-all duration-300 backdrop-blur-sm"
              >
                {t("learnMore")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid md:grid-cols-3 gap-6 mt-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* Advanced Detection */}
            <motion.div 
              className="p-6 rounded-lg bg-card/50 border border-[#00bfff]/20 hover:border-[#00bfff]/50 transition-all duration-300 backdrop-blur-sm group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-[#00bfff]/10 to-[#8b5cf6]/10 flex items-center justify-center group-hover:from-[#00bfff]/20 group-hover:to-[#8b5cf6]/20 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/images/cyber-security-desk.svg"
                  alt="Advanced Detection"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{t("advancedDetection")}</h3>
              <p className="text-muted-foreground">{t("advancedDetectionDesc")}</p>
            </motion.div>

            {/* Instant Analysis */}
            <motion.div 
              className="p-6 rounded-lg bg-card/50 border border-[#8b5cf6]/20 hover:border-[#8b5cf6]/50 transition-all duration-300 backdrop-blur-sm group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-[#8b5cf6]/10 to-[#00bfff]/10 flex items-center justify-center group-hover:from-[#8b5cf6]/20 group-hover:to-[#00bfff]/20 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/images/server-room.svg"
                  alt="Instant Analysis"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{t("instantAnalysis")}</h3>
              <p className="text-muted-foreground">{t("instantAnalysisDesc")}</p>
            </motion.div>

            {/* Privacy First */}
            <motion.div 
              className="p-6 rounded-lg bg-card/50 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-[#00bfff]/10 flex items-center justify-center group-hover:from-emerald-500/20 group-hover:to-[#00bfff]/20 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/images/office-worker.svg"
                  alt="Privacy Protection"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain"
                />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{t("privacyFirst")}</h3>
              <p className="text-muted-foreground">{t("privacyFirstDesc")}</p>
            </motion.div>
          </motion.div>

          {/* Visual showcase with real images */}
          <motion.div
            className="mt-20 grid md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#00bfff]/20 group-hover:border-[#00bfff]/50 transition-all duration-300">
                <Image
                  src="/images/cyber-security-desk.svg"
                  alt="Cyber Security Monitoring"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-foreground">Advanced Threat Detection</h4>
                <p className="text-sm text-muted-foreground">Real-time monitoring and analysis</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#8b5cf6]/20 group-hover:border-[#8b5cf6]/50 transition-all duration-300">
                <Image
                  src="/images/email-verification.svg"
                  alt="Email Verification Process"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-foreground">Email Verification</h4>
                <p className="text-sm text-muted-foreground">Government-grade authentication</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-emerald-500/20 group-hover:border-emerald-500/50 transition-all duration-300">
                <Image
                  src="/images/security-monitoring.svg"
                  alt="Security Dashboard"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-foreground">Security Dashboard</h4>
                <p className="text-sm text-muted-foreground">Comprehensive threat analysis</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#f59e0b]/20 group-hover:border-[#f59e0b]/50 transition-all duration-300">
                <Image
                  src="/images/office-worker.svg"
                  alt="Office Security Worker"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-foreground">Professional Analysis</h4>
                <p className="text-sm text-muted-foreground">Expert security assessment</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional image section */}
          <motion.div
            className="mt-16 grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#1e40af]/20 group-hover:border-[#1e40af]/50 transition-all duration-300">
                <Image
                  src="/images/government-team.svg"
                  alt="Government Security Team"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-foreground">Government Collaboration</h4>
                <p className="text-sm text-muted-foreground">Working with official agencies for maximum security</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#8b5cf6]/20 group-hover:border-[#8b5cf6]/50 transition-all duration-300">
                <Image
                  src="/images/data-analysis.svg"
                  alt="Data Analysis Center"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-semibold text-foreground">Advanced Analytics</h4>
                <p className="text-sm text-muted-foreground">AI-powered threat detection and analysis</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Brand showcase with server infrastructure */}
          <motion.div
            className="mt-20 p-8 rounded-xl bg-gradient-to-r from-[#00bfff]/5 to-[#8b5cf6]/5 border border-[#00bfff]/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <MultiWordTypewriter
                  words={[
                    { text: "SatyaPatra", className: "text-3xl font-bold bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] bg-clip-text text-transparent" },
                    { text: "सत्यपत्र", className: "text-3xl font-bold bg-gradient-to-r from-[#8b5cf6] to-[#00bfff] bg-clip-text text-transparent" }
                  ]}
                  typeSpeed={120}
                  deleteSpeed={80}
                  delayBetweenWords={3000}
                />
                <p className="text-muted-foreground mt-2">{t("appTagline")}</p>
              </div>
              
              <div className="w-full max-w-2xl">
                <Image
                  src="/images/server-room.svg"
                  alt="Secure Server Infrastructure"
                  width={400}
                  height={250}
                  className="w-full h-auto rounded-lg border border-[#00bfff]/20"
                />
              </div>
              
              <p className="text-center text-muted-foreground max-w-md mx-auto">
                Powered by secure government-grade infrastructure for maximum email protection
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technology Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-gradient-to-b from-background/50 to-background/80">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] bg-clip-text text-transparent">
              Advanced Security Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge security infrastructure and real-time threat intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#00bfff]/20 group-hover:border-[#00bfff]/50 transition-all duration-300 bg-gradient-to-br from-[#00bfff]/5 to-[#8b5cf6]/5">
                <Image
                  src="/images/security-workspace.svg"
                  alt="Security Workspace"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Security Operations Center</h3>
                <p className="text-muted-foreground">24/7 monitoring with advanced threat detection capabilities</p>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#8b5cf6]/20 group-hover:border-[#8b5cf6]/50 transition-all duration-300 bg-gradient-to-br from-[#8b5cf6]/5 to-[#00bfff]/5">
                <Image
                  src="/images/analytics-dashboard.svg"
                  alt="Analytics Dashboard"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Real-time Analytics</h3>
                <p className="text-muted-foreground">Comprehensive dashboard with threat intelligence insights</p>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#10b981]/20 group-hover:border-[#10b981]/50 transition-all duration-300 bg-gradient-to-br from-[#10b981]/5 to-[#059669]/5">
                <Image
                  src="/images/mobile-security.svg"
                  alt="Mobile Security"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">Mobile Protection</h3>
                <p className="text-muted-foreground">Cross-platform security for all your devices</p>
              </div>
            </motion.div>
          </div>

          {/* Additional Technology Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-6 p-6 rounded-xl border border-[#00bfff]/20 group-hover:border-[#00bfff]/50 transition-all duration-300 bg-gradient-to-r from-[#00bfff]/5 to-transparent">
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#00bfff]/30">
                  <Image
                    src="/images/network-security.svg"
                    alt="Network Security"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Network Infrastructure</h3>
                  <p className="text-muted-foreground">Secure network architecture with enterprise-grade protection</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="flex items-center gap-6 p-6 rounded-xl border border-[#8b5cf6]/20 group-hover:border-[#8b5cf6]/50 transition-all duration-300 bg-gradient-to-r from-[#8b5cf6]/5 to-transparent">
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-[#8b5cf6]/30">
                  <Image
                    src="/images/corporate-building.svg"
                    alt="Corporate Infrastructure"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise Solutions</h3>
                  <p className="text-muted-foreground">Scalable security solutions for organizations of all sizes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </footer>
    </div>
  )
}

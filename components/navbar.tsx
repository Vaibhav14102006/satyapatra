"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/analyze", label: t("analyze") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50 government:bg-white/95 government:backdrop-blur-xl government:border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="group">
            <Image
              src="/images/brand-logo.svg"
              alt="SatyaPatra Logo"
              width={160}
              height={48}
              className="h-10 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link
                  href={item.href}
                  className={`relative transition-all duration-300 ${
                    isActive(item.href) 
                      ? "text-primary font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00bfff] to-[#8b5cf6]"
                      layoutId="activeNavItem"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/analyze"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] text-white font-semibold hover:from-[#00bfff]/90 hover:to-[#8b5cf6]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00bfff]/25"
              >
                {t("getStarted")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

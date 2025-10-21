"use client"

import React from "react"
import { motion } from "framer-motion"
import { Monitor, Palette, Languages, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useTranslation } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, language, setLanguage } = useTheme()
  const { t } = useTranslation()

  const themes = [
    { key: "neon", icon: Moon, label: t("neonTheme") },
    { key: "government", icon: Sun, label: t("governmentTheme") },
    { key: "system", icon: Monitor, label: t("systemTheme") },
  ]

  const languages = [
    { key: "en", label: t("english") },
    { key: "hi", label: t("hindi") },
  ]

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="bg-card/95 backdrop-blur-md border border-primary/20"
        >
          {themes.map(({ key, icon: Icon, label }) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setTheme(key as any)}
              className={`cursor-pointer transition-all duration-200 ${
                theme === key 
                  ? "bg-primary/20 text-primary" 
                  : "hover:bg-primary/10"
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{label}</span>
              {theme === key && (
                <motion.div
                  className="ml-auto w-2 h-2 bg-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Language Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-9 h-9 p-0 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Languages className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="sr-only">Toggle language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end"
          className="bg-card/95 backdrop-blur-md border border-primary/20"
        >
          {languages.map(({ key, label }) => (
            <DropdownMenuItem
              key={key}
              onClick={() => setLanguage(key as any)}
              className={`cursor-pointer transition-all duration-200 ${
                language === key 
                  ? "bg-primary/20 text-primary" 
                  : "hover:bg-primary/10"
              }`}
            >
              <span>{label}</span>
              {language === key && (
                <motion.div
                  className="ml-auto w-2 h-2 bg-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
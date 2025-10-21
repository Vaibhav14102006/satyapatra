import { useTheme } from "@/components/theme-provider"
import { translations } from "./translations"

export function useTranslation() {
  const { language } = useTheme()
  
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
  
  return { t, language }
}
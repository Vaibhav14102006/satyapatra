"use client"

import { Navbar } from "@/components/navbar"
import { CheckCircle, Brain, Shield, Zap, Lock, Eye, Mail, Phone, MapPin } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
  const { t, language } = useTranslation()

  const howItWorksSteps = [
    {
      icon: Brain,
      title: language === "hi" ? "सामग्री विश्लेषण" : "Content Analysis",
      description: language === "hi" 
        ? "हमारा AI फिशिंग कीवर्ड, संदिग्ध पैटर्न और दुर्भावनापूर्ण संकेतकों के लिए ईमेल सामग्री का विश्लेषण करता है।"
        : "Our AI analyzes email content for phishing keywords, suspicious patterns, and malicious indicators."
    },
    {
      icon: Shield,
      title: language === "hi" ? "URL सत्यापन" : "URL Verification", 
      description: language === "hi"
        ? "हम संदिग्ध डोमेन, छोटे लिंक और ज्ञात फिशिंग साइटों के लिए URL की जांच करते हैं।"
        : "We check URLs for suspicious domains, shortened links, and known phishing sites."
    },
    {
      icon: Zap,
      title: language === "hi" ? "जोखिम स्कोरिंग" : "Risk Scoring",
      description: language === "hi"
        ? "प्रत्येक ईमेल को कई कारकों और संकेतकों के आधार पर एक व्यापक जोखिम स्कोर प्राप्त होता है।"
        : "Each email receives a comprehensive risk score based on multiple factors and indicators."
    },
    {
      icon: Eye,
      title: language === "hi" ? "कार्यान्वयन योग्य अंतर्दृष्टि" : "Actionable Insights",
      description: language === "hi"
        ? "प्रत्येक ईमेल को कैसे संभालना है और अपनी सुरक्षा कैसे करनी है, इस पर विस्तृत सिफारिशें प्राप्त करें।"
        : "Get detailed recommendations on how to handle each email and protect yourself."
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Image
                src="/images/brand-logo.svg"
                alt="SatyaPatra Logo"
                width={200}
                height={60}
                className="h-16 w-auto mb-4"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00bfff] via-white to-[#8b5cf6] bg-clip-text text-transparent">
              {t("aboutTitle")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("aboutSubtitle")}
            </p>
          </motion.div>

          {/* Main content */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* About Description */}
            <div className="p-8 rounded-xl bg-card/50 border border-[#00bfff]/20 backdrop-blur-sm">
              <p className="text-lg text-foreground mb-6 leading-relaxed">
                {t("aboutDescription")}
              </p>
              
              {language === "hi" && (
                <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-[#00bfff]/5 to-[#8b5cf6]/5 border border-[#00bfff]/10">
                  <p className="text-sm text-muted-foreground italic">
                    "सत्यपत्र" - जहाँ प्रत्येक ईमेल में सत्य की पहचान होती है
                  </p>
                </div>
              )}
            </div>

            {/* Mission */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#8b5cf6] to-[#00bfff] bg-clip-text text-transparent">
                {language === "hi" ? "हमारा मिशन" : "Our Mission"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {language === "hi" 
                  ? "हम मानते हैं कि ईमेल सुरक्षा सभी के लिए सुलभ होनी चाहिए। मशीन लर्निंग और उन्नत पैटर्न पहचान का लाभ उठाकर, हम संदिग्ध ईमेल की पहचान करना और आपकी डिजिटल पहचान की सुरक्षा करना आसान बनाते हैं।"
                  : "We believe that email security should be accessible to everyone. By leveraging machine learning and advanced pattern recognition, we make it easy to identify suspicious emails and protect your digital identity."
                }
              </p>
            </motion.div>

            {/* How It Works */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] bg-clip-text text-transparent">
                {language === "hi" ? "यह कैसे काम करता है" : "How It Works"}
              </h2>
              
              {/* Visual workflow */}
              <motion.div 
                className="mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {/* App Architecture Diagram */}
                <div className="mb-8 p-6 rounded-xl bg-card/50 border border-[#00bfff]/20 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-4 text-center bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] bg-clip-text text-transparent">
                    {language === "hi" ? "SatyaPatra ऐप आर्किटेक्चर" : "SatyaPatra App Architecture"}
                  </h3>
                  <div className="flex justify-center">
                    <Image
                      src="/images/app-workflow-diagram.svg"
                      alt={language === "hi" ? "SatyaPatra ऐप कैसे काम करता है" : "How SatyaPatra App Works"}
                      width={800}
                      height={600}
                      className="w-full max-w-4xl h-auto rounded-lg border border-[#00bfff]/10"
                      priority
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    {language === "hi" 
                      ? "एक पूरी email security प्रक्रिया का चित्रण - यूजर इनपुट से लेकर AI विश्लेषण और परिणाम तक" 
                      : "Complete email security workflow - from user input through AI analysis to actionable results"
                    }
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Image
                      src="/images/cyber-security-desk.svg"
                      alt="Email Analysis Process"
                      width={400}
                      height={300}
                      className="w-full h-auto rounded-xl border border-[#00bfff]/20"
                    />
                  </div>
                  <div>
                    <Image
                      src="/images/office-worker.svg"
                      alt="Security Professional at Work"
                      width={400}
                      height={250}
                      className="w-full h-auto rounded-xl border border-[#8b5cf6]/20"
                    />
                  </div>
                </div>
              </motion.div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <motion.div 
                    key={index}
                    className="p-6 rounded-xl bg-card/50 border border-[#00bfff]/20 hover:border-[#00bfff]/40 transition-all duration-300 backdrop-blur-sm group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00bfff]/20 to-[#8b5cf6]/20 flex items-center justify-center group-hover:from-[#00bfff]/30 group-hover:to-[#8b5cf6]/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <step.icon className="w-6 h-6 text-[#00bfff]" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Infrastructure showcase */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#8b5cf6] to-[#00bfff] bg-clip-text text-transparent">
                {language === "hi" ? "उन्नत बुनियादी ढांचा" : "Advanced Infrastructure"}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Image
                    src="/images/server-room.svg"
                    alt="Secure Server Infrastructure"
                    width={400}
                    height={250}
                    className="w-full h-auto rounded-xl border border-[#00bfff]/20"
                  />
                </div>
                <div className="text-left space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">
                    {language === "hi" ? "सुरक्षित सर्वर वातावरण" : "Secure Server Environment"}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === "hi"
                      ? "हमारे उन्नत सर्वर कक्ष में अत्याधुनिक सुरक्षा उपकरण और निरंतर निगरानी प्रणाली है।"
                      : "Our advanced server rooms feature state-of-the-art security equipment and continuous monitoring systems."
                    }
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-muted-foreground">
                        {language === "hi" ? "24/7 निगरानी" : "24/7 Monitoring"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-muted-foreground">
                        {language === "hi" ? "एंड-टू-एंड एन्क्रिप्शन" : "End-to-End Encryption"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-muted-foreground">
                        {language === "hi" ? "सरकारी ग्रेड सुरक्षा" : "Government-Grade Security"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Privacy & Security */}
            <motion.div 
              className="p-8 rounded-xl bg-gradient-to-r from-emerald-500/5 to-[#00bfff]/5 border border-emerald-500/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-8 h-8 text-emerald-500" />
                <h2 className="text-2xl font-bold text-foreground">
                  {language === "hi" ? "गोपनीयता और सुरक्षा" : "Privacy & Security"}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {language === "hi"
                  ? "आपकी गोपनीयता हमारी सर्वोच्च प्राथमिकता है। सभी ईमेल विश्लेषण आपके डिवाइस पर स्थानीय रूप से किया जाता है। हम कभी भी आपकी ईमेल सामग्री को संग्रहीत, प्रसारित या तीसरे पक्ष के साथ साझा नहीं करते हैं। सत्यपत्र पूर्ण पारदर्शिता के साथ काम करता है और आपके डेटा का सम्मान करता है।"
                  : "Your privacy is our top priority. All email analysis is performed locally on your device. We never store, transmit, or share your email content with third parties. SatyaPatra operates with complete transparency and respects your data."
                }
              </p>
            </motion.div>

            {/* Developer Contact Section */}
            <motion.div 
              className="p-8 rounded-xl bg-gradient-to-r from-[#00bfff]/5 to-[#8b5cf6]/5 border border-[#00bfff]/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00bfff] to-[#8b5cf6] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">VR</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {language === "hi" ? "मुख्य डेवलपर" : "Lead Developer"}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Vaibhav Singh Rajawat</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#00bfff]" />
                      <span className="text-muted-foreground">vaibhavsinghrajawat483@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#8b5cf6]" />
                      <span className="text-muted-foreground">+91 75097 02917</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="text-muted-foreground">Gwalior, India</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Eye className="w-4 h-4 text-orange-500" />
                      <a 
                        href="https://vaibhav-rouge.vercel.app" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#00bfff] hover:text-[#8b5cf6] transition-colors duration-300"
                      >
                        vaibhav-rouge.vercel.app
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Image
                    src="/images/office-worker.svg"
                    alt="Lead Developer"
                    width={300}
                    height={200}
                    className="w-full max-w-xs h-auto rounded-lg border border-[#00bfff]/20"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 px-4 sm:px-6 lg:px-8 relative z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>{t("copyright")}</p>
        </div>
      </footer>
    </div>
  )
}

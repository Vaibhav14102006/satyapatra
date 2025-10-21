"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Contact() {
  const { t, language } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
  }

  const contactMethods = [
    {
      icon: Mail,
      title: language === "hi" ? "मुख्य ईमेल" : "Primary Email",
      value: "vaibhavsinghrajawat483@gmail.com",
      color: "text-[#00bfff]"
    },
    {
      icon: Phone,
      title: language === "hi" ? "मुख्य फोन" : "Primary Phone",
      value: "+91 75097 02917",
      color: "text-emerald-500"
    },
    {
      icon: Phone,
      title: language === "hi" ? "कार्यालय फोन" : "Office Phone",
      value: "+91 98765 43210",
      color: "text-orange-500"
    },
    {
      icon: MapPin,
      title: language === "hi" ? "कार्यालय स्थान" : "Office Location",
      value: language === "hi" ? "ग्वालियर, भारत" : "Gwalior, India",
      color: "text-purple-500"
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header with Hero Image */}
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00bfff] via-white to-[#8b5cf6] bg-clip-text text-transparent">
                {t("contactTitle")}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {t("contactSubtitle")}
              </p>
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00bfff] to-[#8b5cf6] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-muted-foreground">
                    {language === "hi" ? "तुरंत जवाब के लिए" : "For immediate response"}
                  </p>
                  <p className="font-semibold text-[#00bfff]">vaibhavsinghrajawat483@gmail.com</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Image
                src="/images/government-team.svg"
                alt="Contact Our Team"
                width={400}
                height={250}
                className="w-full h-auto rounded-xl border border-[#00bfff]/20 shadow-lg"
              />
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#8b5cf6] to-[#00bfff] bg-clip-text text-transparent">
                {language === "hi" ? "संपर्क जानकारी" : "Contact Information"}
              </h2>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {contactMethods.map((method, index) => (
                  <motion.div 
                    key={index}
                    className="p-4 rounded-xl bg-card/50 border border-[#00bfff]/20 hover:border-[#00bfff]/40 transition-all duration-300 backdrop-blur-sm group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00bfff]/20 to-[#8b5cf6]/20 flex items-center justify-center group-hover:from-[#00bfff]/30 group-hover:to-[#8b5cf6]/30 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <method.icon className={`w-6 h-6 ${method.color}`} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-foreground">{method.title}</h3>
                        <p className="text-muted-foreground break-all">{method.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="p-8 rounded-xl bg-card/50 border border-[#00bfff]/20 backdrop-blur-sm">
                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] bg-clip-text text-transparent">
                  {language === "hi" ? "संदेश भेजें" : "Send Message"}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <input
                      type="text"
                      placeholder={language === "hi" ? "आपका नाम" : "Your Name"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-[#00bfff]/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#00bfff] focus:ring-2 focus:ring-[#00bfff]/20 transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <input
                      type="email"
                      placeholder={language === "hi" ? "आपका ईमेल" : "Your Email"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-[#00bfff]/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#00bfff] focus:ring-2 focus:ring-[#00bfff]/20 transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <textarea
                      placeholder={language === "hi" ? "आपका संदेश" : "Your Message"}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-[#00bfff]/30 text-foreground placeholder-muted-foreground focus:outline-none focus:border-[#00bfff] focus:ring-2 focus:ring-[#00bfff]/20 transition-all duration-300 resize-none"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#00bfff] to-[#8b5cf6] text-white font-semibold hover:from-[#00bfff]/90 hover:to-[#8b5cf6]/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#00bfff]/25"
                    >
                      {language === "hi" ? "संदेश भेजें" : "Send Message"}
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Team Profiles Section */}
          <motion.div 
            className="mt-12 p-6 rounded-xl bg-gradient-to-r from-[#8b5cf6]/5 to-emerald-500/5 border border-[#8b5cf6]/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#8b5cf6] to-emerald-500 bg-clip-text text-transparent mb-2">
                {language === "hi" ? "हमारी टीम" : "Our Team"}
              </h2>
              <p className="text-muted-foreground">
                {language === "hi" ? "SatyaPatra डेवलपमेंट टीम के सदस्य" : "Meet the SatyaPatra development team"}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
              {[
                { name: "Vaibhav", fullName: "Vaibhav Singh Rajawat", photo: "/images/team/vaibhav.jpg" },
                { name: "Aman", fullName: "Aman Dhakar", photo: "/images/team/aman.png" },
                { name: "Akhilesh", fullName: "Akhilesh", photo: "/images/team/akhilesh.png" },
                { name: "Aditya", fullName: "Aditya", photo: "/images/team/aditya.png" },
                { name: "Amandeep", fullName: "Amandeep", photo: "/images/team/amandeep.png" }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-card/50 border border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 transition-all duration-300 text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Profile Photo */}
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8b5cf6]/20 to-emerald-500/20 flex items-center justify-center group-hover:from-[#8b5cf6]/30 group-hover:to-emerald-500/30 transition-all duration-300 border-2 border-[#8b5cf6]/20 overflow-hidden">
                      <Image
                        src={member.photo}
                        alt={member.fullName}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full"
                        priority={index < 3}
                        onError={() => {
                          console.log(`Failed to load image for ${member.name}`);
                        }}
                      />
                    </div>
                    {/* Online status indicator */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{member.fullName}</h4>
                  <div className="text-xs text-muted-foreground">
                    {language === "hi" ? "डेवलपर" : "Developer"}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {language === "hi" 
                  ? "मुख्य संपर्क के लिए Vaibhav से जुड़ें" 
                  : "Contact Vaibhav for primary support"
                }
              </p>
              <div className="text-xs text-muted-foreground bg-gradient-to-r from-[#8b5cf6]/5 to-emerald-500/5 p-3 rounded-lg border border-[#8b5cf6]/10">
                {language === "hi" 
                  ? "प्रोफाइल फोटो जल्द ही अपडेट की जाएंगी" 
                  : "Profile photos will be updated soon"
                }
              </div>
            </div>
          </motion.div>

          {/* Office Location Visual */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-[#8b5cf6] to-[#00bfff] bg-clip-text text-transparent">
              {language === "hi" ? "हमारा कार्यालय" : "Our Office"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Image
                  src="/images/contact-office.svg"
                  alt="SatyaPatra Office Gwalior"
                  width={400}
                  height={250}
                  className="w-full h-auto rounded-xl border border-[#00bfff]/20"
                />
              </div>
              <div className="text-left space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {language === "hi" ? "मुख्य कार्यालय" : "Main Office"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "hi"
                    ? "हमारा मुख्य कार्यालय ग्वालियर, मध्य प्रदेश में स्थित है। यहाँ हमारी विशेषज्ञ टीम ईमेल सुरक्षा सेवाएं प्रदान करती है।"
                    : "Our main office is located in Gwalior, Madhya Pradesh. Here our expert team provides email security services."
                  }
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00bfff]" />
                    <span className="text-sm text-muted-foreground">
                      {language === "hi" ? "ग्वालियर, मध्य प्रदेश, भारत" : "Gwalior, Madhya Pradesh, India"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">
                      {language === "hi" ? "24/7 सहायता उपलब्ध" : "24/7 Support Available"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="text-sm text-muted-foreground">
                      {language === "hi" ? "तुरंत प्रतिक्रिया गारंटी" : "Quick response guaranteed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional team images */}
          <motion.div 
            className="mt-12 grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="text-center">
              <Image
                src="/images/government-team.svg"
                alt="Government Security Team"
                width={400}
                height={250}
                className="w-full h-auto rounded-xl border border-[#8b5cf6]/20 mb-4"
              />
              <h4 className="font-semibold text-foreground">
                {language === "hi" ? "विशेषज्ञ टीम" : "Expert Team"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "hi" ? "अनुभवी साइबर सुरक्षा विशेषज्ञ" : "Experienced cyber security specialists"}
              </p>
            </div>
            
            <div className="text-center">
              <Image
                src="/images/data-analysis.svg"
                alt="Security Analysis Center"
                width={400}
                height={250}
                className="w-full h-auto rounded-xl border border-emerald-500/20 mb-4"
              />
              <h4 className="font-semibold text-foreground">
                {language === "hi" ? "विश्लेषण केंद्र" : "Analysis Center"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "hi" ? "उन्नत खतरा विश्लेषण प्रणाली" : "Advanced threat analysis systems"}
              </p>
            </div>
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

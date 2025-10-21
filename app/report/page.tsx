"use client"

import { Navbar } from "@/components/navbar"
import { AnalysisHistory } from "@/components/analysis-history"
import { ThreatIndicators } from "@/components/threat-indicators"
import { QuickTips } from "@/components/quick-tips"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Report() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Analysis Reports & Resources
          </h1>

          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history">Analysis History</TabsTrigger>
              <TabsTrigger value="threats">Threat Indicators</TabsTrigger>
              <TabsTrigger value="tips">Safety Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-4">
              <p className="text-muted-foreground">Your recent email analyses are stored locally on your device.</p>
              <AnalysisHistory />
            </TabsContent>

            <TabsContent value="threats" className="space-y-4">
              <p className="text-muted-foreground">Common phishing and spam indicators to watch for.</p>
              <ThreatIndicators />
            </TabsContent>

            <TabsContent value="tips" className="space-y-4">
              <p className="text-muted-foreground">Essential email security tips to protect yourself.</p>
              <QuickTips />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 TrueMail. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

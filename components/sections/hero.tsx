"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParallaxElement } from "@/components/ui/parallax-provider"
import CpuVisualization from "@/components/visualizations/cpu-visualization"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    const nextSection = heroRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" suppressHydrationWarning>
      {/* Background Elements */}
      <div className="absolute inset-0 circuit-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Multicore Processors</span>
              <br /> & Parallel Processing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Explore the revolutionary technology powering modern computing, from gaming and AI to cloud
              infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={scrollToContent} size="lg" className="bg-primary hover:bg-primary/90">
                Start Learning
              </Button>
              <Button onClick={scrollToContent} size="lg" variant="outline">
                View Resources
              </Button>
            </div>
          </motion.div>

          <ParallaxElement speed={0.2} className="lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-md">
              <CpuVisualization />
            </div>
          </ParallaxElement>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToContent}
        >
          <ChevronDown className="h-10 w-10 text-primary animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}


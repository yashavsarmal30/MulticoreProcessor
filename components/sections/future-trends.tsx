"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Lightbulb, Rocket } from "lucide-react"

export default function FutureTrends() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="future" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Future Trends</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Emerging trends in multicore processor technology and parallel computing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Chiplet Designs</h3>
              <p className="text-sm text-muted-foreground">
                Breaking down large monolithic dies into smaller, interconnected chiplets to improve yield and reduce
                manufacturing costs.
              </p>
              <div className="mt-4 flex items-center">
                <Rocket className="h-5 w-5 mr-2 text-primary" />
                <span className="text-sm font-medium">Increased Scalability</span>
              </div>
            </div>

            <div className="p-4 bg-secondary/30 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Specialized Cores</h3>
              <p className="text-sm text-muted-foreground">
                Integrating specialized processing units (GPUs, NPUs, DSPs) onto the same die for heterogeneous
                computing.
              </p>
              <div className="mt-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-accent" />
                <span className="text-sm font-medium">Improved Efficiency</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Near-Memory Computing</h3>
            <p className="text-sm text-muted-foreground">
              Placing processing elements closer to memory to reduce data movement and improve energy efficiency.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, Database, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CacheHierarchy() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const cacheData = [
    {
      id: "l1i",
      name: "L1 Instruction Cache",
      size: "32 KB",
      latency: "1 cycle",
      description: "Stores recently executed instructions",
      color: "bg-primary",
    },
    {
      id: "l1d",
      name: "L1 Data Cache",
      size: "32 KB",
      latency: "1 cycle",
      description: "Stores recently accessed data",
      color: "bg-primary/80",
    },
    {
      id: "l2",
      name: "L2 Cache",
      size: "256 KB",
      latency: "10 cycles",
      description: "Unified cache that stores both instructions and data",
      color: "bg-accent",
    },
    {
      id: "l3",
      name: "L3 Cache",
      size: "8 MB",
      latency: "40-75 cycles",
      description: "Shared among all cores, larger but slower",
      color: "bg-accent/80",
    },
    {
      id: "ram",
      name: "Main Memory (RAM)",
      size: "16+ GB",
      latency: "200-300 cycles",
      description: "Primary system memory, much larger but significantly slower",
      color: "bg-purple-500",
    },
  ]

  const startAnimation = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setActiveLevel(null)

    // Simulate data request flowing through cache hierarchy
    setTimeout(() => setActiveLevel("l1i"), 500)
    setTimeout(() => setActiveLevel("l1d"), 1000)
    setTimeout(() => setActiveLevel("l2"), 1500)
    setTimeout(() => setActiveLevel("l3"), 2000)
    setTimeout(() => setActiveLevel("ram"), 2500)
    setTimeout(() => setActiveLevel(null), 3500)
    setTimeout(() => setIsAnimating(false), 4000)
  }

  return (
    <section id="cache" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Cache Hierarchy</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Explore the multi-level cache system that bridges the speed gap between fast processors and slower main
            memory.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h3 className="text-xl font-semibold mb-4 md:mb-0">Memory Hierarchy Visualization</h3>
              <Button onClick={startAnimation} disabled={isAnimating} className="bg-primary hover:bg-primary/90">
                Simulate Data Request
              </Button>
            </div>

            <div className="relative py-8">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-border -translate-y-1/2"></div>

              <div className="flex justify-between relative">
                <TooltipProvider>
                  {cacheData.map((cache, index) => (
                    <div key={cache.id} className="relative z-10">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            className={`${activeLevel === cache.id ? "ring-4 ring-primary/50" : ""} ${
                              cache.color
                            } w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                              scale: activeLevel === cache.id ? 1.1 : 1,
                              opacity: 1,
                            }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{
                              boxShadow: activeLevel === cache.id ? "0 0 20px rgba(124, 58, 237, 0.5)" : "none",
                            }}
                          >
                            {cache.id.includes("l") ? (
                              <Cpu className="h-8 w-8 text-white" />
                            ) : (
                              <Database className="h-8 w-8 text-white" />
                            )}
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="p-2 max-w-xs">
                            <p className="font-bold">{cache.name}</p>
                            <p className="text-sm">Size: {cache.size}</p>
                            <p className="text-sm">Latency: {cache.latency}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      <div className="text-center mt-2 text-sm font-medium">{cache.id.toUpperCase()}</div>
                    </div>
                  ))}
                </TooltipProvider>

                {/* Data packet animation */}
                {isAnimating && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white z-20"
                    initial={{ left: "0%", boxShadow: "0 0 10px white" }}
                    animate={{ left: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                )}
              </div>

              <div className="flex justify-between mt-4">
                {cacheData.map((cache, index) => (
                  <div key={`size-${cache.id}`} className="text-center text-xs text-muted-foreground">
                    {cache.size}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium mb-2">
                {activeLevel ? cacheData.find((c) => c.id === activeLevel)?.name : "Cache Hierarchy"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {activeLevel
                  ? cacheData.find((c) => c.id === activeLevel)?.description
                  : "The processor checks each cache level in sequence before accessing main memory. This hierarchy balances speed and capacity."}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6 card-hover"
            >
              <h3 className="text-xl font-semibold mb-4">Cache Coherence</h3>
              <div className="space-y-4">
                <p className="text-sm">
                  In multi-core systems, each core typically has its own L1 and L2 caches, while sharing an L3 cache.
                  This creates a challenge: how to ensure that all cores see a consistent view of memory?
                </p>
                <div className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">MESI Protocol</p>
                    <p className="text-muted-foreground">
                      Modified, Exclusive, Shared, Invalid - tracks cache line states across cores
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
                  <div className="bg-accent/20 p-2 rounded-full">
                    <ArrowRight className="h-5 w-5 text-accent" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Snooping</p>
                    <p className="text-muted-foreground">
                      Cores monitor the memory bus to detect when other cores modify shared data
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card border border-border rounded-xl p-6 card-hover"
            >
              <h3 className="text-xl font-semibold mb-4">Performance Impact</h3>
              <div className="space-y-4">
                <p className="text-sm">
                  Cache performance dramatically affects overall system speed. Modern processors spend a significant
                  amount of time waiting for memory access, a phenomenon known as the "memory wall."
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-sm font-medium mb-1">Cache Hit</p>
                    <p className="text-xs text-muted-foreground">Data found in cache - fast access (1-10 cycles)</p>
                  </div>
                  <div className="p-3 bg-secondary/30 rounded-lg">
                    <p className="text-sm font-medium mb-1">Cache Miss</p>
                    <p className="text-xs text-muted-foreground">Data not in cache - slow access (100+ cycles)</p>
                  </div>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-sm font-medium mb-1">Hit Rate Impact</p>
                  <p className="text-xs text-muted-foreground">
                    Improving cache hit rate from 95% to 99% can double application performance
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}


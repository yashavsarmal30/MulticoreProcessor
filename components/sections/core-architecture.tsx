"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CoreArchitecture() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeCore, setActiveCore] = useState<number | null>(null)

  const cores = [
    {
      id: 1,
      name: "Core 1",
      type: "Performance",
      description: "High-performance core for demanding tasks",
      color: "bg-primary",
    },
    {
      id: 2,
      name: "Core 2",
      type: "Performance",
      description: "High-performance core for demanding tasks",
      color: "bg-primary",
    },
    {
      id: 3,
      name: "Core 3",
      type: "Efficiency",
      description: "Power-efficient core for background tasks",
      color: "bg-accent",
    },
    {
      id: 4,
      name: "Core 4",
      type: "Efficiency",
      description: "Power-efficient core for background tasks",
      color: "bg-accent",
    },
  ]

  const cacheTypes = [
    {
      name: "L1 Cache",
      description: "Smallest, fastest cache memory directly accessible by each core",
      color: "bg-purple-500",
    },
    {
      name: "L2 Cache",
      description: "Larger, slightly slower cache shared between core pairs",
      color: "bg-purple-400",
    },
    {
      name: "L3 Cache",
      description: "Largest, shared cache accessible by all cores",
      color: "bg-purple-300",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="architecture" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Core Architecture</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Modern processors contain multiple processing units or "cores," allowing computers to perform several tasks
            simultaneously.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:w-1/2"
          >
            <div className="relative bg-secondary/30 rounded-xl p-6 border border-border">
              <div className="grid grid-cols-2 gap-4">
                {cores.map((core) => (
                  <motion.div
                    key={core.id}
                    variants={itemVariants}
                    className={`${
                      activeCore === core.id ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/50"
                    } relative p-4 rounded-lg bg-card transition-all duration-300 cursor-pointer card-hover`}
                    onClick={() => setActiveCore(core.id === activeCore ? null : core.id)}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`${core.color} h-3 w-3 rounded-full mr-2 animate-pulse-slow`}></div>
                      <h3 className="font-medium">{core.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Type: {core.type}</p>
                    {activeCore === core.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-sm"
                      >
                        {core.description}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="mt-6 p-4 rounded-lg bg-card/50 border border-border">
                <h3 className="font-medium mb-2 flex items-center">
                  Memory Hierarchy
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 ml-2 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Cache memory provides faster access to data and instructions that the CPU is likely to need
                          next
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h3>
                <div className="space-y-2">
                  {cacheTypes.map((cache, index) => (
                    <div key={index} className="flex items-center p-2 rounded bg-background/50">
                      <div className={`${cache.color} h-3 w-3 rounded-full mr-2`}></div>
                      <div>
                        <p className="text-sm font-medium">{cache.name}</p>
                        <p className="text-xs text-muted-foreground">{cache.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2"
          >
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-xl font-semibold mb-4">Interactive Core Diagram</h3>
              <div className="aspect-square relative bg-background/50 rounded-lg overflow-hidden border border-border">
                <CoreDiagram />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Click on different parts of the processor to learn more about each component. The diagram shows how
                  cores communicate through the interconnect and share cache memory.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function CoreDiagram() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-md aspect-square">
        {/* CPU Die */}
        <div className="absolute inset-0 border-2 border-primary/50 rounded-lg bg-background/80"></div>

        {/* Cores */}
        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-primary/20 border border-primary rounded-md flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
          <div className="text-center">
            <Cpu className="h-6 w-6 mx-auto mb-1 text-primary" />
            <span className="text-xs font-medium">Core 1</span>
          </div>
        </div>

        <div className="absolute top-[15%] right-[15%] w-[30%] h-[30%] bg-primary/20 border border-primary rounded-md flex items-center justify-center hover:bg-primary/30 transition-colors cursor-pointer">
          <div className="text-center">
            <Cpu className="h-6 w-6 mx-auto mb-1 text-primary" />
            <span className="text-xs font-medium">Core 2</span>
          </div>
        </div>

        <div className="absolute bottom-[15%] left-[15%] w-[30%] h-[30%] bg-accent/20 border border-accent rounded-md flex items-center justify-center hover:bg-accent/30 transition-colors cursor-pointer">
          <div className="text-center">
            <Cpu className="h-6 w-6 mx-auto mb-1 text-accent" />
            <span className="text-xs font-medium">Core 3</span>
          </div>
        </div>

        <div className="absolute bottom-[15%] right-[15%] w-[30%] h-[30%] bg-accent/20 border border-accent rounded-md flex items-center justify-center hover:bg-accent/30 transition-colors cursor-pointer">
          <div className="text-center">
            <Cpu className="h-6 w-6 mx-auto mb-1 text-accent" />
            <span className="text-xs font-medium">Core 4</span>
          </div>
        </div>

        {/* Interconnect */}
        <div className="absolute top-1/2 left-1/2 w-[20%] h-[20%] -translate-x-1/2 -translate-y-1/2 bg-purple-500/30 border border-purple-500 rounded-full flex items-center justify-center animate-pulse-slow">
          <span className="text-xs font-medium">Cache</span>
        </div>

        {/* Connection lines */}
        <div className="absolute top-[30%] left-[30%] w-[20%] h-[20%] border-b border-r border-primary/50"></div>
        <div className="absolute top-[30%] right-[30%] w-[20%] h-[20%] border-b border-l border-primary/50"></div>
        <div className="absolute bottom-[30%] left-[30%] w-[20%] h-[20%] border-t border-r border-accent/50"></div>
        <div className="absolute bottom-[30%] right-[30%] w-[20%] h-[20%] border-t border-l border-accent/50"></div>
      </div>
    </div>
  )
}


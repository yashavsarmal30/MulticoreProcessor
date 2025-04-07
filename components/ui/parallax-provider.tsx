"use client"

import { createContext, useContext, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxContextType {
  scrollY: ReturnType<typeof useScroll>["scrollY"]
}

const ParallaxContext = createContext<ParallaxContextType | null>(null)

export function useParallax() {
  const context = useContext(ParallaxContext)
  if (!context) {
    throw new Error("useParallax must be used within a ParallaxProvider")
  }
  return context
}

export function ParallaxProvider({ children }: { children: ReactNode }) {
  const { scrollY } = useScroll()

  return <ParallaxContext.Provider value={{ scrollY }}>{children}</ParallaxContext.Provider>
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down"
  className?: string
}

export function ParallaxElement({ children, speed = 0.5, direction = "up", className }: ParallaxProps) {
  const { scrollY } = useParallax()
  const factor = direction === "up" ? -speed : speed
  const y = useTransform(scrollY, [0, 1000], [0, 500 * factor])

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}


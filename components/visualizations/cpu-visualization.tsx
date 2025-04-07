"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function CpuVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // CPU core parameters
    const coreCount = 8
    const cores: {
      x: number
      y: number
      size: number
      color: string
      activity: number
      activityTarget: number
    }[] = []

    // Initialize cores
    const initCores = () => {
      cores.length = 0
      const centerX = canvas.width / (2 * (window.devicePixelRatio || 1))
      const centerY = canvas.height / (2 * (window.devicePixelRatio || 1))
      const radius = Math.min(centerX, centerY) * 0.6

      for (let i = 0; i < coreCount; i++) {
        const angle = (i / coreCount) * Math.PI * 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        const size = Math.min(centerX, centerY) * 0.15

        // Generate colors from purple to cyan
        const hue = 270 + (i / coreCount) * 90
        const color = `hsl(${hue}, 80%, 60%)`

        cores.push({
          x,
          y,
          size,
          color,
          activity: 0,
          activityTarget: Math.random(),
        })
      }
    }

    // Draw CPU
    const drawCPU = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))

      // Draw center
      const centerX = canvas.width / (2 * (window.devicePixelRatio || 1))
      const centerY = canvas.height / (2 * (window.devicePixelRatio || 1))
      const centerSize = Math.min(centerX, centerY) * 0.3

      ctx.beginPath()
      ctx.arc(centerX, centerY, centerSize, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(124, 58, 237, 0.2)"
      ctx.fill()
      ctx.strokeStyle = "rgba(124, 58, 237, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw cores and connections
      cores.forEach((core, i) => {
        // Update core activity
        core.activity += (core.activityTarget - core.activity) * 0.05
        if (Math.abs(core.activity - core.activityTarget) < 0.01) {
          core.activityTarget = Math.random()
        }

        // Draw connection to center
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(core.x, core.y)
        ctx.strokeStyle = `rgba(124, 58, 237, ${0.3 + core.activity * 0.5})`
        ctx.lineWidth = 1 + core.activity * 2
        ctx.stroke()

        // Draw core
        ctx.beginPath()
        ctx.arc(core.x, core.y, core.size * (0.8 + core.activity * 0.4), 0, Math.PI * 2)
        ctx.fillStyle = core.color.replace("60%", `${50 + core.activity * 30}%`)
        ctx.fill()
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw core activity indicator
        ctx.beginPath()
        ctx.arc(core.x, core.y, core.size * 0.6, 0, Math.PI * 2 * core.activity)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)"
        ctx.lineWidth = 2
        ctx.stroke()
      })

      // Draw data packets
      cores.forEach((core, i) => {
        if (Math.random() < 0.02 * core.activity) {
          const packetSize = 3 + Math.random() * 3
          const speed = 0.5 + Math.random() * 1.5
          const direction = Math.random() > 0.5
          const startX = direction ? centerX : core.x
          const startY = direction ? centerY : core.y
          const targetX = direction ? core.x : centerX
          const targetY = direction ? core.y : centerY

          animatePacket(startX, startY, targetX, targetY, packetSize, speed, core.color)
        }
      })
    }

    // Animate data packet
    const animatePacket = (
      startX: number,
      startY: number,
      targetX: number,
      targetY: number,
      size: number,
      speed: number,
      color: string,
    ) => {
      let progress = 0

      const animate = () => {
        if (!ctx) return

        progress += speed / 100

        if (progress >= 1) return

        const x = startX + (targetX - startX) * progress
        const y = startY + (targetY - startY) * progress

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()

        requestAnimationFrame(animate)
      }

      animate()
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      drawCPU()
      animationFrameId = requestAnimationFrame(animate)
    }

    initCores()
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-full aspect-square max-w-md mx-auto animate-float"
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ touchAction: "none" }} />
    </motion.div>
  )
}


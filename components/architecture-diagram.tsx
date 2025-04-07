"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"

export function ArchitectureDiagram() {
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTooltip({
      visible: true,
      x: x + 10,
      y: y + 10,
      text: `Architecture component at (${Math.round(x)}, ${Math.round(y)})`,
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false })
  }

  return (
    <div
      className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src="/placeholder.svg?height=500&width=800"
        alt="Parallel Architecture"
        width={800}
        height={500}
        className="w-full h-auto"
      />
      {tooltip.visible && (
        <div
          className="absolute bg-black/80 text-white px-3 py-1 rounded pointer-events-none"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}


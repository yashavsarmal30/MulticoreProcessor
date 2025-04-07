"use client"

import { useState } from "react"

interface StatCardProps {
  stat: number
}

export function StatCard({ stat }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl cursor-pointer transition-transform duration-300 hover:-translate-y-1 text-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <>
          <h3 className="text-2xl font-bold mb-2">{stat}+ Cores</h3>
          <p className="text-indigo-200">Predicted for high-end CPUs by 2030</p>
        </>
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-2">Future Core Count</h3>
          <p className="text-indigo-200">Hover to see prediction</p>
        </>
      )}
    </div>
  )
}


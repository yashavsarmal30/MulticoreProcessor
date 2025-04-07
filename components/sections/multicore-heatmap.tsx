"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MultiCoreHeatmap() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("performance")

  const performanceData = [
    [90, 85, 75, 65, 55, 45, 35, 25],
    [85, 80, 70, 60, 50, 40, 30, 20],
    [75, 70, 65, 55, 45, 35, 25, 15],
    [65, 60, 55, 50, 40, 30, 20, 10],
    [55, 50, 45, 40, 35, 25, 15, 5],
    [45, 40, 35, 30, 25, 20, 10, 5],
    [35, 30, 25, 20, 15, 10, 5, 5],
    [25, 20, 15, 10, 5, 5, 5, 5],
  ]

  const efficiencyData = [
    [40, 45, 50, 55, 60, 65, 70, 75],
    [45, 50, 55, 60, 65, 70, 75, 80],
    [50, 55, 60, 65, 70, 75, 80, 85],
    [55, 60, 65, 70, 75, 80, 85, 90],
    [60, 65, 70, 75, 80, 85, 90, 95],
    [65, 70, 75, 80, 85, 90, 95, 95],
    [70, 75, 80, 85, 90, 95, 95, 95],
    [75, 80, 85, 90, 95, 95, 95, 95],
  ]

  const thermalData = [
    [95, 90, 85, 80, 75, 70, 65, 60],
    [90, 85, 80, 75, 70, 65, 60, 55],
    [85, 80, 75, 70, 65, 60, 55, 50],
    [80, 75, 70, 65, 60, 55, 50, 45],
    [75, 70, 65, 60, 55, 50, 45, 40],
    [70, 65, 60, 55, 50, 45, 40, 35],
    [65, 60, 55, 50, 45, 40, 35, 30],
    [60, 55, 50, 45, 40, 35, 30, 25],
  ]

  const getHeatmapData = () => {
    switch (activeTab) {
      case "performance":
        return performanceData
      case "efficiency":
        return efficiencyData
      case "thermal":
        return thermalData
      default:
        return performanceData
    }
  }

  const getColorForValue = (value: number) => {
    if (activeTab === "performance") {
      // Purple to cyan gradient for performance
      const hue = 270 - (value / 100) * 90
      return `hsl(${hue}, 80%, ${30 + value / 2}%)`
    } else if (activeTab === "efficiency") {
      // Green gradient for efficiency
      return `hsl(140, ${60 + value / 3}%, ${20 + value / 3}%)`
    } else {
      // Red to blue gradient for thermal (red is hot, blue is cool)
      const hue = (1 - value / 100) * 240
      return `hsl(${hue}, 80%, ${30 + (100 - value) / 3}%)`
    }
  }

  return (
    <section id="heatmap" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Multi-Core Advantage Heatmap</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Visualize the benefits of multiple cores across different metrics and workloads.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-6"
        >
          <Tabs defaultValue="performance" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Multi-Core Metrics</h3>
              <TabsList>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                <TabsTrigger value="thermal">Thermal</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="performance">
              <p className="text-sm text-muted-foreground mb-6">
                This heatmap shows relative performance gains as core count and workload parallelism increase. Darker
                colors indicate higher performance.
              </p>
            </TabsContent>

            <TabsContent value="efficiency">
              <p className="text-sm text-muted-foreground mb-6">
                This heatmap shows power efficiency (performance per watt) as core count and workload parallelism
                increase. Darker colors indicate better efficiency.
              </p>
            </TabsContent>

            <TabsContent value="thermal">
              <p className="text-sm text-muted-foreground mb-6">
                This heatmap shows thermal output as core count and workload parallelism increase. Darker colors
                indicate higher temperatures.
              </p>
            </TabsContent>

            <div className="overflow-auto">
              <div className="min-w-[600px]">
                <div className="flex mb-2">
                  <div className="w-[100px]"></div>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex-1 text-center text-sm font-medium">
                      {i + 1} {i === 0 ? "Core" : "Cores"}
                    </div>
                  ))}
                </div>

                {getHeatmapData().map((row, rowIndex) => (
                  <div key={rowIndex} className="flex mb-2">
                    <div className="w-[100px] text-sm font-medium flex items-center">
                      {rowIndex * 12.5 + 12.5}% Parallel
                    </div>
                    {row.map((value, colIndex) => (
                      <motion.div
                        key={colIndex}
                        className="flex-1 aspect-square flex items-center justify-center text-xs font-medium rounded-md m-0.5"
                        style={{ backgroundColor: getColorForValue(value) }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: (rowIndex * 8 + colIndex) * 0.01,
                        }}
                      >
                        {value}
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-medium mb-2">Key Insight</h4>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "performance"
                    ? "Performance scales almost linearly with core count for highly parallel workloads."
                    : activeTab === "efficiency"
                      ? "Power efficiency improves with more cores for parallel workloads despite higher total power draw."
                      : "Thermal output increases with core count but can be managed with advanced cooling solutions."}
                </p>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-medium mb-2">Optimal Use Case</h4>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "performance"
                    ? "Video rendering, scientific computing, and 3D modeling benefit most from high core counts."
                    : activeTab === "efficiency"
                      ? "Server workloads and battery-powered devices benefit from efficiency-optimized multi-core designs."
                      : "Gaming PCs and workstations require balanced thermal solutions for sustained performance."}
                </p>
              </div>

              <div className="p-4 bg-secondary/30 rounded-lg">
                <h4 className="font-medium mb-2">Limiting Factor</h4>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "performance"
                    ? "Software that isn't optimized for parallel execution won't benefit from additional cores."
                    : activeTab === "efficiency"
                      ? "Single-threaded workloads may be more efficient on fewer, higher-clocked cores."
                      : "High core count processors require more sophisticated cooling solutions to maintain performance."}
                </p>
              </div>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}


"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ProcessorId = "ryzen9" | "i9" | "threadripper" | "m2ultra" | "epyc"
type BenchmarkId = "cinebench" | "blender" | "geekbench"

interface Processor {
  id: ProcessorId
  name: string
  cores: number
  threads: number
  baseFreq: number
  boostFreq: number
  tdp: number
  year: number
}

interface BenchmarkScores {
  score: number
  singleCore: number
}

type BenchmarkData = {
  [key in BenchmarkId]: {
    [key in ProcessorId]: BenchmarkScores
  }
}

interface BarShapeProps {
  x: number
  y: number
  width: number
  height: number
  payload: {
    id: ProcessorId
    name: string
    isSelected: boolean
  }
}

export default function BenchmarkComparator() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [selectedProcessor, setSelectedProcessor] = useState<ProcessorId>("ryzen9")
  const [selectedBenchmark, setSelectedBenchmark] = useState<BenchmarkId>("cinebench")

  const processors: Processor[] = [
    {
      id: "ryzen9",
      name: "AMD Ryzen 9 7950X",
      cores: 16,
      threads: 32,
      baseFreq: 4.5,
      boostFreq: 5.7,
      tdp: 170,
      year: 2022,
    },
    {
      id: "i9",
      name: "Intel Core i9-13900K",
      cores: 24,
      threads: 32,
      baseFreq: 3.0,
      boostFreq: 5.8,
      tdp: 125,
      year: 2022,
    },
    {
      id: "threadripper",
      name: "AMD Threadripper Pro 5995WX",
      cores: 64,
      threads: 128,
      baseFreq: 2.7,
      boostFreq: 4.5,
      tdp: 280,
      year: 2022,
    },
    {
      id: "m2ultra",
      name: "Apple M2 Ultra",
      cores: 24,
      threads: 24,
      baseFreq: 3.2,
      boostFreq: 3.7,
      tdp: 60,
      year: 2023,
    },
    {
      id: "epyc",
      name: "AMD EPYC 9654",
      cores: 96,
      threads: 192,
      baseFreq: 2.4,
      boostFreq: 3.7,
      tdp: 360,
      year: 2022,
    },
  ]

  const benchmarkData: BenchmarkData = {
    cinebench: {
      ryzen9: { score: 38647, singleCore: 2012 },
      i9: { score: 40444, singleCore: 2190 },
      threadripper: { score: 113865, singleCore: 1686 },
      m2ultra: { score: 28400, singleCore: 1700 },
      epyc: { score: 131500, singleCore: 1550 },
    },
    blender: {
      ryzen9: { score: 1245, singleCore: 78 },
      i9: { score: 1320, singleCore: 82 },
      threadripper: { score: 3650, singleCore: 65 },
      m2ultra: { score: 1050, singleCore: 68 },
      epyc: { score: 4200, singleCore: 60 },
    },
    geekbench: {
      ryzen9: { score: 24500, singleCore: 2950 },
      i9: { score: 26800, singleCore: 3150 },
      threadripper: { score: 48700, singleCore: 2450 },
      m2ultra: { score: 21500, singleCore: 2700 },
      epyc: { score: 58200, singleCore: 2350 },
    },
  }

  const getSelectedProcessor = (): Processor => {
    return processors.find((p) => p.id === selectedProcessor) || processors[0]
  }

  const getSelectedBenchmarkData = (): BenchmarkScores => {
    return benchmarkData[selectedBenchmark][selectedProcessor]
  }

  const getComparisonData = () => {
    const currentScore = benchmarkData[selectedBenchmark][selectedProcessor].score
    let sum = 0
    let count = 0

    const processorIds = Object.keys(benchmarkData[selectedBenchmark]) as ProcessorId[]
    processorIds.forEach((processorId) => {
      if (processorId !== selectedProcessor) {
        sum += benchmarkData[selectedBenchmark][processorId].score
        count++
      }
    })

    const avgScore = sum / count
    const percentDiff = ((currentScore - avgScore) / avgScore) * 100

    return {
      percentDiff,
      isHigher: percentDiff > 0,
    }
  }

  const chartData = processors.map((processor) => ({
    id: processor.id,
    name: processor.name.split(" ").slice(-1)[0],
    multicore: benchmarkData[selectedBenchmark][processor.id].score,
    singlecore: benchmarkData[selectedBenchmark][processor.id].singleCore,
    isSelected: processor.id === selectedProcessor,
  }))

  return (
    <>
    <section id="benchmark" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Performance Benchmark Comparator</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Compare the performance of different multicore processors across various benchmarks and workloads.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Processor Selection</CardTitle>
                  <CardDescription>Choose a processor to view benchmark results</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedProcessor} onValueChange={(v: ProcessorId) => setSelectedProcessor(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a processor" />
                    </SelectTrigger>
                    <SelectContent>
                      {processors.map((processor) => (
                        <SelectItem key={processor.id} value={processor.id}>
                          {processor.name} ({processor.cores} cores)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Benchmark Type</CardTitle>
                  <CardDescription>Select benchmark suite</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedBenchmark} onValueChange={(v: BenchmarkId) => setSelectedBenchmark(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a benchmark" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinebench">Cinebench R23</SelectItem>
                      <SelectItem value="blender">Blender Benchmark</SelectItem>
                      <SelectItem value="geekbench">Geekbench 5</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{getSelectedProcessor().name}</CardTitle>
                <CardDescription>
                  {getSelectedProcessor().cores} cores / {getSelectedProcessor().threads} threads | Base:{" "}
                  {getSelectedProcessor().baseFreq} GHz | Boost: {getSelectedProcessor().boostFreq} GHz | TDP:{" "}
                  {getSelectedProcessor().tdp}W
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="multicore">
                  <TabsList className="mb-6">
                    <TabsTrigger value="multicore">Multi-Core</TabsTrigger>
                    <TabsTrigger value="singlecore">Single-Core</TabsTrigger>
                    <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  </TabsList>

                  <TabsContent value="multicore">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">Multi-Core Score</h3>
                        <p className="text-sm text-muted-foreground">Measures performance across all available cores</p>
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {/* {getSelectedBenchmarkData().score.toLocaleString()} */}
                      </div>
                    </div>

                    <div className="h-[320px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={chartData} 
                          margin={{ top: 20, right: 20, left: 20, bottom: 50 }}
                        >
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 12 }}
                            interval={0}
                          />
                          <YAxis 
                            hide={true}
                            domain={[0, Math.max(...chartData.map(d => d.multicore)) * 1.1]}
                          />
                          <Tooltip 
                            cursor={false}
                            contentStyle={{ 
                              background: '#fff', 
                              border: 'none', 
                              borderRadius: '6px', 
                              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value) => [value.toLocaleString(), 'Score']}
                          />
                          <Bar
                            dataKey="multicore"
                            animationDuration={800}
                            shape={({ x, y, width, height, payload }: any) => (
                              <rect 
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                fill={payload.isSelected ? "#2563eb" : "#e5e5e5"}
                                rx={4}
                                ry={4}
                              />
                            )}
                          >
                            {/* <LabelList 
                              dataKey="multicore" 
                              position="bottom" 
                              formatter={(value: number) => value.toLocaleString()}
                              fill="#666"
                              fontSize={12}
                            />
                             */}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="singlecore">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">Single-Core Score</h3>
                        <p className="text-sm text-muted-foreground">Measures performance of a single processor core</p>
                      </div>
                      <div className="text-3xl font-bold text-accent">
                        {getSelectedBenchmarkData().singleCore.toLocaleString()}
                      </div>
                    </div>

                    <div className="h-[320px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={chartData} 
                          margin={{ top: 20, right: 20, left: 20, bottom: 50 }}
                        >
                          <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 12 }}
                            interval={0}
                          />
                          <YAxis 
                            hide={true}
                            domain={[0, Math.max(...chartData.map(d => d.singlecore)) * 1.1]}
                          />
                          <Tooltip 
                            cursor={false}
                            contentStyle={{ 
                              background: '#fff', 
                              border: 'none', 
                              borderRadius: '6px', 
                              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                            formatter={(value) => [value.toLocaleString(), 'Score']}
                          />
                          <Bar
                            dataKey="singlecore"
                            animationDuration={800}
                            shape={({ x, y, width, height, payload }: any) => (
                              <rect 
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                fill={payload.isSelected ? "#16a34a" : "#e5e5e5"}
                                rx={4}
                                ry={4}
                              />
                            )}
                          >
                            {/* <LabelList  className="mt-2"
                              dataKey="singlecore" 
                              position="bottom" 
                              formatter={(value: number) => value.toLocaleString()}
                              fill="#666"
                              fontSize={12}
                            /><br /> */}
                          </Bar>

                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="comparison">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">Performance Comparison</h3>
                        <p className="text-sm text-muted-foreground">How this processor compares to the average</p>
                      </div>
                      <div
                        className={`text-3xl font-bold flex items-center ${
                          getComparisonData().isHigher ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {getComparisonData().isHigher ? (
                          <ArrowUpRight className="mr-1 h-6 w-6" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-6 w-6" />
                        )}
                        {Math.abs(getComparisonData().percentDiff).toFixed(1)}%
                      </div>
                    </div>

                    <div className="p-6 bg-secondary/30 rounded-lg">
                      <h4 className="font-medium mb-4">Performance Analysis</h4>
                      <p className="text-sm mb-4">
                        The {getSelectedProcessor().name}{" "}
                        {getComparisonData().isHigher ? "outperforms" : "underperforms"} the average of other processors
                        by {Math.abs(getComparisonData().percentDiff).toFixed(1)}% in{" "}
                        {selectedBenchmark === "cinebench"
                          ? "Cinebench R23"
                          : selectedBenchmark === "blender"
                            ? "Blender Benchmark"
                            : "Geekbench 5"}{" "}
                        multi-core tests.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-background/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Core Count Impact</p>
                          <p className="text-xs text-muted-foreground">
                            {getSelectedProcessor().cores} cores provide{" "}
                            {getSelectedProcessor().cores > 16
                              ? "excellent"
                              : getSelectedProcessor().cores > 8
                                ? "very good"
                                : "good"}{" "}
                            parallel processing capability
                          </p>
                        </div>
                        <div className="p-3 bg-background/50 rounded-lg">
                          <p className="text-sm font-medium mb-1">Power Efficiency</p>
                          <p className="text-xs text-muted-foreground">
                            {getSelectedProcessor().tdp}W TDP yields{" "}
                            {(getSelectedBenchmarkData().score / getSelectedProcessor().tdp).toFixed(1)} points per watt
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  )
}
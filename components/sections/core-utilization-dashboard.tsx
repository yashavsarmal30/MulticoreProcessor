"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, Activity, BarChart3 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CoreUtilizationDashboard() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeTab, setActiveTab] = useState("overview")
  const [isSimulating, setIsSimulating] = useState(false)
  const [coreData, setCoreData] = useState([
    { id: 1, utilization: 25, temperature: 45, frequency: 2.4 },
    { id: 2, utilization: 15, temperature: 42, frequency: 2.2 },
    { id: 3, utilization: 10, temperature: 40, frequency: 2.0 },
    { id: 4, utilization: 5, temperature: 38, frequency: 1.8 },
  ])

  // Simulate changing core utilization
  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      setCoreData((prev) =>
        prev.map((core) => ({
          ...core,
          utilization: Math.min(100, Math.max(5, core.utilization + (Math.random() * 20 - 10))),
          temperature: Math.min(90, Math.max(35, core.temperature + (Math.random() * 6 - 3))),
          frequency: Math.min(4.0, Math.max(1.0, core.frequency + (Math.random() * 0.4 - 0.2))),
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [isSimulating])

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating)
  }

  return (
    <section
      id="utilization"
      ref={ref}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-background/95"
    >
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Core Utilization Dashboard</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Monitor real-time performance metrics across multiple processor cores.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Core Details</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
              </TabsList>
              <Button variant={isSimulating ? "destructive" : "default"} size="sm" onClick={toggleSimulation}>
                {isSimulating ? "Stop Simulation" : "Start Simulation"}
              </Button>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {coreData.map((core) => (
                  <Card key={core.id} className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-primary" />
                        Core {core.id}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Utilization</span>
                            <span className="font-medium">{Math.round(core.utilization)}%</span>
                          </div>
                          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: "0%" }}
                              animate={{ width: `${core.utilization}%` }}
                              transition={{ duration: 0.5 }}
                            ></motion.div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Temperature</span>
                            <span className="font-medium">{Math.round(core.temperature)}°C</span>
                          </div>
                          <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-accent"
                              initial={{ width: "0%" }}
                              animate={{ width: `${(core.temperature / 100) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            ></motion.div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Frequency</span>
                            <span className="font-medium">{core.frequency.toFixed(1)} GHz</span>
                          </div>
                          <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-purple-500"
                              initial={{ width: "0%" }}
                              animate={{ width: `${(core.frequency / 4) * 100}%` }}
                              transition={{ duration: 0.5 }}
                            ></motion.div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>Aggregate performance metrics across all cores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-2">
                    {coreData.map((core) => (
                      <div key={core.id} className="relative h-full flex-1">
                        <motion.div
                          className="absolute bottom-0 w-full bg-primary rounded-t-md"
                          initial={{ height: 0 }}
                          animate={{ height: `${core.utilization}%` }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                        <div className="absolute bottom-0 w-full text-center pb-2 text-xs font-medium">
                          Core {core.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Core Details</CardTitle>
                  <CardDescription>Detailed information about each processor core</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {coreData.map((core) => (
                      <div key={core.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div
                              className={`h-3 w-3 rounded-full mr-2 ${
                                core.utilization > 70
                                  ? "bg-red-500"
                                  : core.utilization > 30
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                            ></div>
                            <h3 className="font-medium">Core {core.id}</h3>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {core.utilization > 70 ? "High Load" : core.utilization > 30 ? "Moderate Load" : "Low Load"}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <div className="flex items-center mb-1">
                              <Activity className="h-4 w-4 mr-1 text-primary" />
                              <span className="text-xs font-medium">Utilization</span>
                            </div>
                            <div className="text-2xl font-bold">{Math.round(core.utilization)}%</div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <BarChart3 className="h-4 w-4 mr-1 text-accent" />
                              <span className="text-xs font-medium">Temperature</span>
                            </div>
                            <div className="text-2xl font-bold">{Math.round(core.temperature)}°C</div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <Cpu className="h-4 w-4 mr-1 text-purple-500" />
                              <span className="text-xs font-medium">Frequency</span>
                            </div>
                            <div className="text-2xl font-bold">{core.frequency.toFixed(1)} GHz</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analysis</CardTitle>
                  <CardDescription>Analyze core performance and efficiency metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border border-border rounded-lg">
                      <h3 className="font-medium mb-4">Performance per Watt</h3>
                      <div className="h-[200px] flex items-end justify-between gap-2">
                        {coreData.map((core) => {
                          const efficiency = (core.frequency * 100) / (core.temperature - 30)
                          return (
                            <div key={core.id} className="relative h-full flex-1">
                              <motion.div
                                className="absolute bottom-0 w-full bg-accent rounded-t-md"
                                initial={{ height: 0 }}
                                animate={{ height: `${Math.min(100, efficiency)}%` }}
                                transition={{ duration: 0.5 }}
                              ></motion.div>
                              <div className="absolute bottom-0 w-full text-center pb-2 text-xs font-medium">
                                Core {core.id}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <h3 className="font-medium mb-4">Thermal Efficiency</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {coreData.map((core) => {
                          const thermalEfficiency = 100 - (core.temperature - 35)
                          return (
                            <div key={core.id} className="text-center">
                              <div className="inline-block relative w-24 h-24">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                  <circle
                                    className="text-muted stroke-current"
                                    strokeWidth="10"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                  ></circle>
                                  <motion.circle
                                    className="text-primary stroke-current"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
                                    animate={{
                                      strokeDashoffset: 251.2 - (thermalEfficiency / 100) * 251.2,
                                    }}
                                    transition={{ duration: 1 }}
                                  ></motion.circle>
                                </svg>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                  <div className="text-lg font-bold">{Math.round(thermalEfficiency)}%</div>
                                </div>
                              </div>
                              <p className="mt-2 text-sm">Core {core.id}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}


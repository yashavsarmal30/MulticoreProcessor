"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, RotateCcw, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export default function TaskParallelism() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isRunning, setIsRunning] = useState(false)
  const [coreCount, setCoreCount] = useState(4)
  const [taskProgress, setTaskProgress] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
  const [completedTasks, setCompletedTasks] = useState(0)

  const toggleSimulation = () => {
    if (isRunning) {
      setIsRunning(false)
    } else {
      setIsRunning(true)
      simulateTaskExecution()
    }
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setTaskProgress(Array(8).fill(0))
    setCompletedTasks(0)
  }

  const simulateTaskExecution = () => {
    // This would be a more complex simulation in a real app
    const interval = setInterval(() => {
      setTaskProgress((prev) => {
        const newProgress = [...prev]
        let newCompletedCount = completedTasks

        // Update progress for tasks that are assigned to active cores
        for (let i = 0; i < coreCount; i++) {
          // Find an incomplete task for this core
          const taskIndex = newProgress.findIndex((p) => p > 0 && p < 100)

          if (taskIndex >= 0) {
            // Increment existing task
            newProgress[taskIndex] = Math.min(100, newProgress[taskIndex] + Math.random() * 10)

            // Check if task completed
            if (newProgress[taskIndex] === 100) {
              newCompletedCount++
            }
          } else {
            // Start a new task if available
            const newTaskIndex = newProgress.findIndex((p) => p === 0)
            if (newTaskIndex >= 0) {
              newProgress[newTaskIndex] = Math.random() * 5 + 5 // Start with 5-10% progress
            }
          }
        }

        setCompletedTasks(newCompletedCount)

        // If all tasks are complete, stop the simulation
        if (newProgress.every((p) => p === 0 || p === 100)) {
          setIsRunning(false)
          clearInterval(interval)
        }

        return newProgress
      })
    }, 500)

    return () => clearInterval(interval)
  }

  const handleCoreCountChange = (value: number[]) => {
    setCoreCount(value[0])
  }

  return (
    <section id="task-parallelism" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">Task Parallelism Simulator</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Visualize how multiple cores process independent tasks simultaneously, dramatically improving overall
            performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Parallel Task Execution</h3>
              <p className="text-sm text-muted-foreground">
                Adjust the number of cores and observe the impact on task completion time
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant={isRunning ? "destructive" : "default"} onClick={toggleSimulation}>
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" /> Start
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetSimulation}>
                <RotateCcw className="h-4 w-4 mr-2" /> Reset
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Number of Cores: {coreCount}</label>
              <span className="text-sm text-muted-foreground">{completedTasks} of 8 tasks completed</span>
            </div>
            <Slider
              value={[coreCount]}
              onValueChange={handleCoreCountChange}
              min={1}
              max={8}
              step={1}
              className="mb-6"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Array.from({ length: coreCount }).map((_, i) => (
                <div key={i} className="bg-secondary/30 p-4 rounded-lg border border-border flex items-center">
                  <div className="bg-primary/20 p-2 rounded-full mr-3">
                    <Cpu className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Core {i + 1}</p>
                    <p className="text-xs text-muted-foreground">Active</p>
                  </div>
                </div>
              ))}
              {Array.from({ length: 8 - coreCount }).map((_, i) => (
                <div
                  key={i}
                  className="bg-secondary/10 p-4 rounded-lg border border-border flex items-center opacity-50"
                >
                  <div className="bg-muted p-2 rounded-full mr-3">
                    <Cpu className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Core {i + coreCount + 1}</p>
                    <p className="text-xs text-muted-foreground">Inactive</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Task Progress</h4>
            {taskProgress.map((progress, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Task {i + 1}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${
                      progress === 100 ? "bg-green-500" : progress > 0 ? "bg-primary" : "bg-transparent"
                    }`}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
            <h4 className="font-medium mb-2">Simulation Insights</h4>
            <p className="text-sm text-muted-foreground">
              This simulation demonstrates how increasing the number of processor cores allows more tasks to be
              processed simultaneously. In real-world applications, this translates to faster video rendering, more
              responsive gaming, and smoother multitasking.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


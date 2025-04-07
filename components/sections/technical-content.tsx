"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const multicoreData = [
  { year: "2005", adoption: 10 },
  { year: "2010", adoption: 30 },
  { year: "2015", adoption: 60 },
  { year: "2020", adoption: 85 },
  { year: "2024", adoption: 95 },
];
export default function TechnicalContent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="technical"
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
            <span className="text-gradient">Technical Deep Dive</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Explore the advanced concepts behind multicore processor design and
            parallel computing.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="architectures" className="mb-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="architectures">Architectures</TabsTrigger>
              <TabsTrigger value="threading">Threading</TabsTrigger>
              <TabsTrigger value="heterogeneous">
                Heterogeneous Computing
              </TabsTrigger>
            </TabsList>
            <TabsContent value="architectures" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Parallel Processing Architectures
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Different architectural approaches to parallel processing
                  offer varying advantages for specific workloads.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="simd">
                    <AccordionTrigger>
                      SIMD (Single Instruction, Multiple Data)
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          SIMD architectures apply the same operation to
                          multiple data points simultaneously. This approach is
                          particularly effective for tasks like image
                          processing, where the same filter might be applied to
                          many pixels at once.
                        </p>
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Key Features</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Vector processing units</li>
                            <li>
                              Specialized instruction sets (SSE, AVX, NEON)
                            </li>
                            <li>Ideal for data-parallel tasks</li>
                            <li>Common in GPUs and modern CPUs</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="mimd">
                    <AccordionTrigger>
                      MIMD (Multiple Instruction, Multiple Data)
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          MIMD architectures allow different cores to execute
                          different instructions on different data
                          simultaneously. This is the most flexible approach and
                          is used in modern multicore CPUs.
                        </p>
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Key Features</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>Independent execution units</li>
                            <li>Shared or distributed memory models</li>
                            <li>Supports task and data parallelism</li>
                            <li>
                              Used in server, desktop, and mobile processors
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="numa">
                    <AccordionTrigger>
                      NUMA (Non-Uniform Memory Access)
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          NUMA architectures organize memory and processors into
                          nodes, where each processor has faster access to its
                          local memory than to remote memory. This approach
                          scales well for many-core systems.
                        </p>
                        <div className="bg-secondary/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Key Features</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            <li>
                              Memory divided into local and remote regions
                            </li>
                            <li>
                              Varying access latencies based on memory location
                            </li>
                            <li>
                              Requires NUMA-aware software for optimal
                              performance
                            </li>
                            <li>
                              Common in high-end servers and supercomputers
                            </li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="threading" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Hyper-Threading vs Physical Cores
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Understanding the difference between physical cores and
                  logical threads in modern processors.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Physical Cores</h4>
                    <p className="text-sm mb-4">
                      Actual hardware execution units on the processor die, each
                      with its own set of registers and execution resources.
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Complete, independent processing units</li>
                      <li>Can execute instructions in parallel</li>
                      <li>Each has dedicated execution resources</li>
                      <li>Provides true parallel computation</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">
                      Logical Threads (Hyper-Threading)
                    </h4>
                    <p className="text-sm mb-4">
                      Intel's implementation of Simultaneous Multi-Threading
                      (SMT) allows a single physical core to appear as multiple
                      logical cores to the operating system.
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Shares execution resources of a physical core</li>
                      <li>Improves utilization during pipeline stalls</li>
                      <li>Typically provides 15-30% performance boost</li>
                      <li>Not equivalent to additional physical cores</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-2">
                    How Hyper-Threading Works
                  </h4>
                  <p className="text-sm">
                    Hyper-Threading takes advantage of idle execution units
                    within a core. When one thread is waiting for data from
                    memory or experiencing a pipeline stall, another thread can
                    use the otherwise idle execution resources. This improves
                    overall throughput but doesn't double performance like an
                    additional physical core would.
                  </p>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">
                    Performance Considerations
                  </h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>
                      <span className="font-medium">Cache Contention:</span>{" "}
                      Threads share L1 and L2 caches, which can cause contention
                    </li>
                    <li>
                      <span className="font-medium">Workload Dependency:</span>{" "}
                      Benefits vary greatly depending on the application
                    </li>
                    <li>
                      <span className="font-medium">Scheduling Awareness:</span>{" "}
                      Modern OS schedulers are aware of the topology difference
                    </li>
                    <li>
                      <span className="font-medium">
                        Security Implications:
                      </span>{" "}
                      Some side-channel attacks exploit shared resources
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="heterogeneous" className="mt-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Heterogeneous Computing
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Modern systems combine different types of processing units to
                  optimize for both performance and power efficiency.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">CPU</h4>
                    <p className="text-sm">
                      General-purpose processors optimized for sequential
                      processing, branch prediction, and low-latency operations.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Best for: OS tasks, single-threaded applications, complex
                      logic
                    </div>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">GPU</h4>
                    <p className="text-sm">
                      Massively parallel processors with thousands of simple
                      cores optimized for data-parallel workloads.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Best for: Graphics, scientific computing, AI training
                    </div>
                  </div>

                  <div className="bg-secondary/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">NPU/TPU</h4>
                    <p className="text-sm">
                      Neural Processing Units specialized for machine learning
                      operations like matrix multiplication and convolutions.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Best for: AI inference, machine learning, neural networks
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg mb-6">
                  <h4 className="font-medium mb-2">Big.LITTLE Architecture</h4>
                  <p className="text-sm mb-4">
                    Combines high-performance cores with energy-efficient cores
                    on the same chip to optimize for both performance and
                    battery life.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        Performance Cores
                      </h5>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>Higher clock speeds</li>
                        <li>Out-of-order execution</li>
                        <li>Deeper pipelines</li>
                        <li>Used for demanding tasks</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-1">
                        Efficiency Cores
                      </h5>
                      <ul className="list-disc list-inside text-xs space-y-1">
                        <li>Lower power consumption</li>
                        <li>Simpler architecture</li>
                        <li>In-order execution</li>
                        <li>Used for background tasks</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">
                    System-on-Chip (SoC) Integration
                  </h4>
                  <p className="text-sm mb-4">
                    Modern SoCs integrate multiple specialized processing units
                    to create a complete heterogeneous computing platform.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>
                      <span className="font-medium">Apple M-series:</span> CPU +
                      GPU + Neural Engine + Media Engine
                    </li>
                    <li>
                      <span className="font-medium">Qualcomm Snapdragon:</span>{" "}
                      CPU + GPU + DSP + NPU + ISP
                    </li>
                    <li>
                      <span className="font-medium">AMD APUs:</span> CPU + GPU
                      on a single die with shared memory
                    </li>
                    <li>
                      <span className="font-medium">
                        Intel with Xe Graphics:
                      </span>{" "}
                      CPU + integrated GPU with shared resources
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 max-w-4xl mx-auto bg-card border border-border rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Multicore Adoption Rate
            </h3>
            <div className="h-[300px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={multicoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="adoption"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">
              Historical data and trends in multicore processor adoption in
              various computing devices.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

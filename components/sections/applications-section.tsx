"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Brain, Gamepad2, Cloud, Database, Film, FlaskRoundIcon as Flask, Server, Smartphone } from "lucide-react"

export default function ApplicationsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const applications = [
    {
      title: "Artificial Intelligence",
      description:
        "Training neural networks and running inference on complex AI models requires massive parallel processing power.",
      icon: Brain,
      color: "bg-primary",
    },
    {
      title: "Gaming & Graphics",
      description:
        "Modern games leverage multiple cores for physics, AI, rendering, and audio processing simultaneously.",
      icon: Gamepad2,
      color: "bg-accent",
    },
    {
      title: "Cloud Computing",
      description:
        "Cloud servers use many-core processors to host multiple virtual machines and containerized applications.",
      icon: Cloud,
      color: "bg-purple-500",
    },
    {
      title: "Big Data Analytics",
      description: "Processing and analyzing massive datasets is dramatically accelerated with parallel processing.",
      icon: Database,
      color: "bg-cyan-500",
    },
    {
      title: "Video Rendering",
      description:
        "Video editing and rendering software distributes processing across available cores to reduce render times.",
      icon: Film,
      color: "bg-pink-500",
    },
    {
      title: "Scientific Computing",
      description: "Complex simulations in physics, chemistry, and biology benefit from parallel computation.",
      icon: Flask,
      color: "bg-green-500",
    },
    {
      title: "Web Servers",
      description: "High-traffic web servers handle multiple concurrent connections across different processor cores.",
      icon: Server,
      color: "bg-orange-500",
    },
    {
      title: "Mobile Devices",
      description: "Modern smartphones use multi-core processors for better battery life and performance.",
      icon: Smartphone,
      color: "bg-blue-500",
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
      transition: { duration: 0.5 },
    },
  }

  return (
    <section
      id="applications"
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
            <span className="text-gradient">Real-World Applications</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Multicore processors power a wide range of applications across industries, enabling new capabilities and
            improved performance.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {applications.map((app, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 card-hover"
              whileHover={{ y: -5 }}
            >
              <div className={`${app.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <app.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{app.title}</h3>
              <p className="text-sm text-muted-foreground">{app.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">Case Study: Video Rendering Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium mb-2">Single-Core Processor</h4>
              <div className="space-y-2">
                <div className="h-4 w-full bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: "25%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  4K Video Render: <span className="font-medium">100 minutes</span>
                </p>
              </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium mb-2">Quad-Core Processor</h4>
              <div className="space-y-2">
                <div className="h-4 w-full bg-accent/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: "75%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  4K Video Render: <span className="font-medium">28 minutes</span>
                </p>
              </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium mb-2">16-Core Processor</h4>
              <div className="space-y-2">
                <div className="h-4 w-full bg-purple-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: "95%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  4K Video Render: <span className="font-medium">7 minutes</span>
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Real-world performance gains vary based on software optimization and workload characteristics.
          </p>
        </motion.div>
      </div>
    </section>
  )
}


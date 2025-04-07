"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Cpu, Clock } from "lucide-react"

export default function ProcessorTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const timelineItems = [
    {
      year: 1971,
      title: "Intel 4004",
      description: "First commercially available microprocessor with a single core.",
      specs: "2,300 transistors, 740 kHz",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
    {
      year: 2001,
      title: "IBM POWER4",
      description: "One of the first mainstream dual-core processors.",
      specs: "174 million transistors, 1.3 GHz",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
    {
      year: 2005,
      title: "AMD Athlon 64 X2",
      description: "First x86 dual-core processor for consumer desktop PCs.",
      specs: "233 million transistors, 2.4 GHz",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
    {
      year: 2010,
      title: "Intel Core i7 (Nehalem)",
      description: "Introduced hyper-threading for 4 cores/8 threads.",
      specs: "731 million transistors, 3.33 GHz",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
    {
      year: 2017,
      title: "AMD Ryzen Threadripper",
      description: "HEDT platform with up to 16 cores/32 threads.",
      specs: "4.8 billion transistors, 4.2 GHz",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
    {
      year: 2022,
      title: "Modern Processors",
      description: "Hybrid architectures with performance and efficiency cores.",
      specs: "Up to 114 billion transistors, 5.8 GHz",
      icon: <Cpu className="h-5 w-5 text-primary" />,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="timeline"
      ref={ref}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-background/90"
    >
      <div className="absolute inset-0 circuit-pattern opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-gradient">Processor Evolution</span>
          </h2>
          <p className="section-subtitle text-muted-foreground max-w-2xl mx-auto mt-4">
            From single-core to many-core architectures, processors have transformed the world of computing.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-5xl mx-auto"
        >
          {/* Timeline vertical line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary/40 md:-translate-x-1/2 rounded-full" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-14 group ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[15px] md:left-1/2 top-2 w-[34px] h-[34px] bg-background border-4 border-primary rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-md">
                <Clock className="h-4 w-4 text-primary" />
              </div>

              {/* Content Card */}
              <div
                className={`pl-12 md:pl-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="bg-card border border-border rounded-xl p-6 transition-all duration-300 group-hover:shadow-lg hover:border-primary">
                  <div className="flex items-center mb-3">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-primary font-medium">{item.year}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-2 text-muted-foreground">{item.description}</p>
                  <p className="text-xs text-muted-foreground italic">{item.specs}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

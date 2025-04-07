"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const faqs = [
    {
      question: "What is the difference between a core and a thread?",
      answer:
        "A core is a physical processing unit on the CPU that can execute instructions independently. A thread is a virtual or logical execution unit that shares physical resources with other threads on the same core. Technologies like Intel's Hyper-Threading allow a single physical core to run two threads simultaneously, improving efficiency by utilizing otherwise idle execution resources.",
    },
    {
      question: "Do all applications benefit from multiple cores?",
      answer:
        "No, not all applications benefit equally from multiple cores. Applications need to be specifically designed or 'multi-threaded' to take advantage of parallel processing. Single-threaded applications will only run on one core, regardless of how many are available. CPU-intensive tasks like video editing, 3D rendering, scientific simulations, and modern games typically benefit the most from multiple cores.",
    },
    {
      question: "What is cache coherence and why is it important?",
      answer:
        "Cache coherence refers to the consistency of shared data stored in the local caches of multiple cores. When one core modifies data in its cache, other cores need to be informed so they don't use outdated values. Cache coherence protocols like MESI (Modified, Exclusive, Shared, Invalid) ensure that all cores have a consistent view of memory. Without proper cache coherence, multi-threaded programs would produce unpredictable and incorrect results.",
    },
    {
      question:
        "What is Amdahl's Law and how does it relate to multicore processors?",
      answer:
        "Amdahl's Law is a formula that predicts the theoretical maximum speedup when using multiple processors. It states that the speedup is limited by the portion of the program that cannot be parallelized. For example, if 20% of a program is inherently sequential, then even with an infinite number of cores, the maximum speedup possible is only 5x. This law explains why adding more cores doesn't always result in proportional performance improvements.",
    },
    {
      question: "How do big.LITTLE architectures improve efficiency?",
      answer:
        "big.LITTLE is a heterogeneous computing architecture that pairs powerful high-performance cores with energy-efficient cores on the same chip. The system can dynamically assign tasks to the appropriate core type: demanding tasks go to the high-performance cores, while background or less intensive tasks run on the efficient cores. This approach significantly improves battery life in mobile devices while maintaining performance when needed. Modern examples include Apple's M-series chips with performance and efficiency cores.",
    },
    {
      question:
        "What challenges do developers face when programming for multicore systems?",
      answer:
        "Developers face several challenges when programming for multicore systems: 1) Race conditions, where the outcome depends on the timing of operations between threads; 2) Deadlocks, where threads wait indefinitely for resources held by each other; 3) Load balancing, ensuring work is distributed evenly across cores; 4) Synchronization overhead, which can reduce performance gains; 5) Debugging complexity, as parallel bugs can be non-deterministic and hard to reproduce. These challenges require specialized knowledge of parallel programming patterns and tools.",
    },
    {
      question: "How does memory bandwidth affect multicore performance?",
      answer:
        "Memory bandwidth is often a bottleneck in multicore systems. As the number of cores increases, so does contention for memory access. If the memory subsystem cannot deliver data fast enough to keep all cores busy, adding more cores provides diminishing returns. This is known as the 'memory wall' problem. Modern processors address this with larger caches, high-bandwidth memory interfaces, and memory controllers integrated into the CPU die. For optimal performance, applications should be designed to maximize cache utilization and minimize random memory access patterns.",
    },
    {
      question: "What is the future of multicore processor design?",
      answer:
        "The future of multicore processor design is moving toward greater specialization and heterogeneity. Rather than simply adding more identical cores, future processors will likely include a mix of different core types optimized for specific workloads (CPU, GPU, AI accelerators, DSPs). Other trends include 3D stacking of chips to overcome interconnect limitations, near-memory processing to reduce data movement, and potentially the integration of new computing paradigms like quantum or neuromorphic elements for specific tasks. Power efficiency will continue to be a major focus as core counts increase.",
    },
  ];

  return (
    <section
      id="faq"
      ref={ref}
      className="section-padding relative overflow-hidden"
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
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Common questions about multicore processors and parallel processing
            technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border-border"
                >
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you couldn't find the answer to your question, feel free to reach
            out to our team of experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/yashavsarmal30/Multicore"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Contact Support
            </a>
            <a
              href="https://wa.me/919920075872"
              target="_blank"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary/50"
            >
              Raise Query
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value[0]);
  };

  return (
    <section
      id="comparison"
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
            <span className="text-gradient">Single-Core vs Multi-Core</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Compare the performance and capabilities of single-core and
            multi-core processors across different computing tasks.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border rounded-xl p-6 mb-12"
          >
            <h3 className="text-xl font-semibold mb-4">
              Interactive Comparison
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Drag the slider to compare single-core and multi-core processor
              performance across different tasks.
            </p>

            <div className="relative h-[400px] mb-6 overflow-hidden rounded-lg border border-border">
              <div
                className="absolute inset-0 bg-secondary/20 z-10"
                style={{
                  clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`,
                }}
              >
                <div className="absolute inset-0 p-6">
                  <h4 className="text-lg font-medium mb-4 text-left text-primary">
                    Single-Core Processor (2000s)
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Web Browsing</p>
                      <div className="h-4 bg-primary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Gaming</p>
                      <div className="h-4 bg-primary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Video Editing</p>
                      <div className="h-4 bg-primary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">3D Rendering</p>
                      <div className="h-4 bg-primary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">AI Processing</p>
                      <div className="h-4 bg-primary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 p-6">
                <h4 className="text-lg font-medium mb-4 text-right text-accent">
                  Multi-Core Processor (Modern)
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Web Browsing</p>
                    <div className="h-4 bg-accent/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Gaming</p>
                    <div className="h-4 bg-accent/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Video Editing</p>
                    <div className="h-4 bg-accent/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: "98%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">3D Rendering</p>
                    <div className="h-4 bg-accent/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: "99%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">AI Processing</p>
                    <div className="h-4 bg-accent/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize"
                style={{ left: `${sliderValue}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-background rotate-180" />
                  <ArrowRight className="h-4 w-4 text-background" />
                </div>
              </div>
            </div>

            <Slider
              value={[sliderValue]}
              onValueChange={handleSliderChange}
              max={100}
              step={1}
              className="my-6"
            />

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Single-Core Era</span>
              <span>Multi-Core Era</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="bg-card border border-border rounded-xl p-6 card-hover">
              <h3 className="text-xl font-semibold mb-4">Key Advantages</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-accent">1</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Parallel Processing:</span>{" "}
                    Multiple cores can handle different tasks simultaneously
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-accent">2</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Improved Multitasking:</span>{" "}
                    Better performance when running multiple applications
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-accent">3</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Power Efficiency:</span>{" "}
                    Better performance per watt compared to single
                    high-frequency core
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-accent">4</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Specialized Workloads:</span>{" "}
                    Cores can be optimized for specific types of computation
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 card-hover">
              <h3 className="text-xl font-semibold mb-4">
                Technical Challenges
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-primary">1</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Thread Synchronization:</span>{" "}
                    Coordinating tasks across multiple cores
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-primary">2</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Cache Coherence:</span>{" "}
                    Maintaining consistent memory state across core caches
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-primary">3</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Software Optimization:</span>{" "}
                    Not all applications are designed for parallel execution
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 mr-2">
                    <span className="text-xs text-primary">4</span>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Heat Dissipation:</span>{" "}
                    Managing thermal output from multiple active cores
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

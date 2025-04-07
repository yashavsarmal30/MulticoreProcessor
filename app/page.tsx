import { Cpu } from "lucide-react"
import Hero from "@/components/sections/hero"
import CoreArchitecture from "@/components/sections/core-architecture"
import ProcessorTimeline from "@/components/sections/processor-timeline"
import ComparisonSection from "@/components/sections/comparison-section"
import ParallelVisualization from "@/components/sections/parallel-visualization"
import ApplicationsSection from "@/components/sections/applications-section"
import FutureTrends from "@/components/sections/future-trends"
import FaqSection from "@/components/sections/faq-section"
import CoreUtilizationDashboard from "@/components/sections/core-utilization-dashboard"
import CacheHierarchy from "@/components/sections/cache-hierarchy"
import TaskParallelism from "@/components/sections/task-parallelism"
import BenchmarkComparator from "@/components/sections/benchmark-comparator"
import MultiCoreHeatmap from "@/components/sections/multicore-heatmap"
import TechnicalContent from "@/components/sections/technical-content"
import { ParallaxProvider } from "@/components/ui/parallax-provider"

export default function Home() {
  return (
    <ParallaxProvider>
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Core Architecture Section */}
        <CoreArchitecture />

        {/* Processor Timeline */}
        <ProcessorTimeline />

        {/* Comparison Section */}
        <ComparisonSection />

        {/* 3D Visualization of Parallel Processing */}
        <ParallelVisualization />

        {/* Core Utilization Dashboard */}
        <CoreUtilizationDashboard />

        {/* Cache Hierarchy Visualization */}
        <CacheHierarchy />

        {/* Task Parallelism Simulator */}
        <TaskParallelism />

        {/* Real-world Applications */}
        <ApplicationsSection />

        {/* Benchmark Comparator */}
        <BenchmarkComparator />

        {/* Multi-core Heatmap */}
        <MultiCoreHeatmap />

        {/* Technical Content */}
        <TechnicalContent />

        {/* Future Trends */}
        <FutureTrends />

        {/* FAQ Section */}
        <FaqSection />

        {/* Footer */}
        <footer className="bg-background border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-6 md:mb-0">
                <Cpu className="h-6 w-6 text-primary mr-2" />
                <span className="text-xl font-bold">Multicore Processors</span>
              </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
                <a target="_blank" href="https://github.com/yashavsarmal30" className="hover:text-primary transition-colors">
                  About
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Resources
                </a>
                {/* <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a> */}
                {/* <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a> */}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
              <p>© {new Date().getFullYear()} Yash Avsarmal. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </ParallaxProvider>
  )
}


"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { motion, useInView } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"
import type * as THREE from "three"

export default function ParallelVisualization() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="visualization" ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 circuit-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <span className="text-gradient">3D Visualization</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Explore how parallel processing works in a multicore environment with this interactive 3D visualization.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          <div className="h-[600px] w-full">
            <Suspense fallback={<VisualizationLoading />}>
              <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Environment preset="city" />
                <ParallelProcessingVisualization />
                <OrbitControls enablePan={false} />
              </Canvas>
            </Suspense>
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Task Distribution",
              content:
                "Tasks are divided and distributed across multiple cores, allowing simultaneous processing of different data chunks.",
              delay: 0.4,
            },
            {
              title: "Data Flow",
              content:
                "Watch how data flows between cores and memory, with shared cache facilitating efficient communication between processing units.",
              delay: 0.5,
            },
            {
              title: "Execution Pipeline",
              content:
                "Visualize how instructions move through the execution pipeline, from fetch and decode to execution and write-back stages.",
              delay: 0.6,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="bg-card border border-border rounded-xl p-6 card-hover"
            >
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisualizationLoading() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-background/50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent align-[-0.125em]"></div>
        <p className="mt-4 text-muted-foreground">Loading 3D Visualization...</p>
      </div>
    </div>
  )
}

function ParallelProcessingVisualization() {
  const corePositions: [number, number, number][] = [
    [-3, 2, 0],
    [3, 2, 0],
    [-3, -2, 0],
    [3, -2, 0],
  ]

  const coreColors = ["#7c3aed", "#16bdca", "#7c3aed", "#16bdca"]

  return (
    <group>
      {/* Central Interconnect */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.7} />
      </mesh>
      <Text position={[0, 0, 0.2]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        Interconnect
      </Text>

      {/* Cores */}
      {corePositions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <boxGeometry args={[1.5, 1.5, 0.5]} />
            <meshStandardMaterial color={coreColors[i]} />
          </mesh>
          <Text position={[0, 0, 0.3]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
            {`Core ${i + 1}`}
          </Text>

          {/* Connection to interconnect */}
          <mesh position={[pos[0] > 0 ? -0.75 : 0.75, 0, 0]}>
            <boxGeometry args={[Math.abs(pos[0]) - 0.75, 0.1, 0.1]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        </group>
      ))}

      {/* Data Packets */}
      <DataPackets />

      {/* Memory */}
      <group position={[0, -4, 0]}>
        <mesh>
          <boxGeometry args={[4, 1, 0.5]} />
          <meshStandardMaterial color="#0ea5e9" />
        </mesh>
        <Text position={[0, 0, 0.3]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          Main Memory
        </Text>
        <mesh position={[0, 2, 0]}>
          <boxGeometry args={[0.1, 3, 0.1]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
      </group>
    </group>
  )
}

function DataPackets() {
  return (
    <>
      <AnimatedDataPacket startPosition={[-3, 2, 0.3]} endPosition={[0, 0, 0.3]} color="#7c3aed" delay={0} />
      <AnimatedDataPacket startPosition={[3, 2, 0.3]} endPosition={[0, 0, 0.3]} color="#16bdca" delay={1.5} />
      <AnimatedDataPacket startPosition={[0, 0, 0.3]} endPosition={[0, -4, 0.3]} color="#3b82f6" delay={3} />
      <AnimatedDataPacket startPosition={[0, -4, 0.3]} endPosition={[-3, -2, 0.3]} color="#0ea5e9" delay={4.5} />
    </>
  )
}

function AnimatedDataPacket({
  startPosition,
  endPosition,
  color,
  delay,
}: {
  startPosition: [number, number, number]
  endPosition: [number, number, number]
  color: string
  delay: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [animationStartTime, setAnimationStartTime] = useState<number | null>(null)
  const duration = 2
  const pause = 0.5

  const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStartTime(Date.now())
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh || !animationStartTime) return

    const now = Date.now()
    const elapsed = (now - animationStartTime) / 1000

    if (elapsed > duration + pause) {
      setAnimationStartTime(Date.now())
      return
    }

    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutSine(progress)

    mesh.position.x = startPosition[0] + (endPosition[0] - startPosition[0]) * eased
    mesh.position.y = startPosition[1] + (endPosition[1] - startPosition[1]) * eased
    mesh.position.z = startPosition[2] + (endPosition[2] - startPosition[2]) * eased

    mesh.rotation.y += 0.05
    mesh.rotation.x += 0.03
  })

  return (
    <mesh ref={meshRef} position={startPosition}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
    </mesh>
  )
}

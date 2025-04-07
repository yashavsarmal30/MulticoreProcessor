"use client"

export function AnimatedDiagram() {
  return (
    <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto my-8">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-indigo-600 h-24 rounded-lg animate-pulse"
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: "1.5s",
          }}
        />
      ))}
    </div>
  )
}


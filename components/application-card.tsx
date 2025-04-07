import { Brain, FlaskRoundIcon as Flask, Gamepad2, Database } from "lucide-react"

interface ApplicationCardProps {
  title: string
  description: string
  icon: string
  delay: number
}

export function ApplicationCard({ title, description, icon, delay }: ApplicationCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "brain":
        return <Brain className="h-8 w-8 text-purple-500" />
      case "flask":
        return <Flask className="h-8 w-8 text-purple-500" />
      case "gamepad-2":
        return <Gamepad2 className="h-8 w-8 text-purple-500" />
      case "database":
        return <Database className="h-8 w-8 text-purple-500" />
      default:
        return null
    }
  }

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4">{getIcon()}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}


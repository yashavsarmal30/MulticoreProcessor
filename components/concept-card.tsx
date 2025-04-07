interface ConceptCardProps {
  title: string
  description: string
}

export function ConceptCard({ title, description }: ConceptCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}


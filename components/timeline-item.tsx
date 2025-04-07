interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLast: boolean
}

export function TimelineItem({ year, title, description, isLast }: TimelineItemProps) {
  return (
    <div className="relative pl-10 pb-8">
      {!isLast && <div className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-indigo-400"></div>}
      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white">
        <span className="text-sm font-semibold">{year.slice(2)}</span>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}


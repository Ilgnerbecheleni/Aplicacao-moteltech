import type { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatusCardProps {
  icon: ReactNode
  value: string | number
  label: string
  change?: {
    value: number
    positive: boolean
  }
  sublabel?: string
}

export default function StatusCard({ icon, value, label, change, sublabel }: StatusCardProps) {
  return (
    <div className="bg-[#1e1e1e] rounded-xl p-4 flex items-center gap-4">
      <div className="bg-[#2a2a2a] p-3 rounded-full">{icon}</div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">{value}</span>
          {change && (
            <span className={`text-xs flex items-center ${change.positive ? "text-green-500" : "text-red-500"}`}>
              {change.positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {change.value}%
            </span>
          )}
        </div>
        <div className="text-sm text-gray-400">
          {label}
          {sublabel && <div className="text-xs">{sublabel}</div>}
        </div>
      </div>
    </div>
  )
}

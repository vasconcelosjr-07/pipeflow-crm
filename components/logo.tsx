import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  collapsed?: boolean
  className?: string
}

export function Logo({ collapsed = false, className }: Props) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
        <Zap className="h-4 w-4" />
      </div>
      {!collapsed && (
        <span className="font-semibold text-foreground tracking-tight">
          PipeFlow
        </span>
      )}
    </div>
  )
}

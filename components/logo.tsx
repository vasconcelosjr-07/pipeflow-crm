import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  collapsed?: boolean
  className?: string
  tamanho?: "sm" | "md" | "lg"
}

export function Logo({ collapsed = false, className, tamanho = "md" }: Props) {
  const tamanhos = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0",
          tamanhos[tamanho]
        )}
      >
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

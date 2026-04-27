import { Logo } from "@/components/logo"
import type { ReactNode } from "react"

export default function LayoutAuth({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo tamanho="md" />
        </div>
        {children}
      </div>
    </div>
  )
}

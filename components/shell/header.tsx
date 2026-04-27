"use client"

import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

const titulos: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "Leads",
  "/pipeline": "Pipeline",
  "/settings": "Configurações",
}

type Props = {
  onAbrirMenu: () => void
}

export function Header({ onAbrirMenu }: Props) {
  const pathname = usePathname()

  const tituloAtual =
    Object.entries(titulos).find(([rota]) => pathname.startsWith(rota))?.[1] ??
    "PipeFlow"

  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur flex items-center px-4 gap-4 flex-shrink-0">
      {/* Botão hamburguer — visível só no mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onAbrirMenu}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <h1 className="text-base font-semibold text-foreground">{tituloAtual}</h1>

      {/* Espaço reservado para ações futuras (ex.: botão Novo Lead) */}
      <div className="ml-auto" />
    </header>
  )
}

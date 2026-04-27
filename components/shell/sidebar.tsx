"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Kanban, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/logo"
import { WorkspaceSwitcher } from "@/components/shell/workspace-switcher"
import { NavUsuario } from "@/components/shell/nav-usuario"

const itensNavegacao = [
  { href: "/dashboard", rotulo: "Dashboard", icone: LayoutDashboard },
  { href: "/leads", rotulo: "Leads", icone: Users },
  { href: "/pipeline", rotulo: "Pipeline", icone: Kanban },
  { href: "/settings", rotulo: "Configurações", icone: Settings },
]

type Props = {
  className?: string
}

export function Sidebar({ className }: Props) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col w-64 h-full border-r border-sidebar-border bg-sidebar",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center px-4 py-5">
        <Logo />
      </div>

      {/* Workspace switcher */}
      <div className="px-3 pb-4">
        <WorkspaceSwitcher />
      </div>

      {/* Separador + label de navegação */}
      <div className="px-4 pb-2">
        <p className="text-[0.625rem] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Navegação
        </p>
      </div>

      {/* Itens de navegação */}
      <nav className="flex-1 px-3 space-y-0.5">
        {itensNavegacao.map(({ href, rotulo, icone: Icone }) => {
          const ativo = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors",
                ativo
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              )}
            >
              <Icone className="h-4 w-4 flex-shrink-0" />
              {rotulo}
            </Link>
          )
        })}
      </nav>

      {/* Usuário no rodapé */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <NavUsuario />
      </div>
    </aside>
  )
}

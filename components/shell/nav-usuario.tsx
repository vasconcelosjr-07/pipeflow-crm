"use client"

import { LogOut, Settings, User } from "lucide-react"
import { usuarioMock } from "@/lib/mocks/workspaces"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function obterIniciais(nome: string): string {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase()
}

export function NavUsuario() {
  const iniciais = obterIniciais(usuarioMock.nome)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left outline-none hover:bg-sidebar-accent/60 focus-visible:ring-2 focus-visible:ring-ring data-[popup-open]:bg-sidebar-accent/60">
        <Avatar size="sm">
          {usuarioMock.avatarUrl && (
            <AvatarImage src={usuarioMock.avatarUrl} alt={usuarioMock.nome} />
          )}
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            {iniciais}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start flex-1 min-w-0">
          <span className="text-sm font-medium text-sidebar-foreground truncate w-full">
            {usuarioMock.nome}
          </span>
          <span className="text-xs text-sidebar-foreground/50 truncate w-full">
            {usuarioMock.email}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" side="top" align="start">
        <DropdownMenuItem className="gap-2">
          <User className="h-4 w-4" />
          <span>Meu perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" className="gap-2">
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  workspacesMock,
  workspaceAtualMock,
  type Workspace,
} from "@/lib/mocks/workspaces"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function WorkspaceSwitcher() {
  const [workspaceAtual, setWorkspaceAtual] =
    useState<Workspace>(workspaceAtualMock)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 px-2 hover:bg-sidebar-accent/60 data-[popup-open]:bg-sidebar-accent/60"
          />
        }
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0">
          {workspaceAtual.iniciais}
        </div>
        <span className="flex-1 truncate text-left text-sm font-medium text-sidebar-foreground">
          {workspaceAtual.nome}
        </span>
        <ChevronsUpDown className="h-4 w-4 text-sidebar-foreground/50 flex-shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" side="bottom" align="start">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {workspacesMock.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => setWorkspaceAtual(ws)}
            className="gap-2"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-semibold flex-shrink-0">
              {ws.iniciais}
            </div>
            <span className="flex-1 truncate">{ws.nome}</span>
            <Badge
              variant={ws.plano === "pro" ? "default" : "outline"}
              className={cn(
                "text-xs",
                ws.plano === "pro" && "bg-primary text-primary-foreground"
              )}
            >
              {ws.plano === "pro" ? "Pro" : "Free"}
            </Badge>
            {ws.id === workspaceAtual.id && (
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-muted-foreground">
          <Plus className="h-4 w-4" />
          <span>Novo workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

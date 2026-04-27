"use client"

import { useState } from "react"
import { Sidebar } from "@/components/shell/sidebar"
import { Header } from "@/components/shell/header"
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet"

export default function LayoutApp({
  children,
}: {
  children: React.ReactNode
}) {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar desktop — oculta em mobile */}
      <Sidebar className="hidden md:flex" />

      {/* Drawer mobile — visível apenas em telas pequenas */}
      <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
        <SheetContent side="left" className="p-0 w-64" showCloseButton={false}>
          <Sidebar className="flex" />
        </SheetContent>
      </Sheet>

      {/* Área de conteúdo principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onAbrirMenu={() => setMenuAberto(true)} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

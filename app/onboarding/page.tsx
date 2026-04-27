"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { Loader2, Building2 } from "lucide-react"

const esquemaWorkspace = z.object({
  nomeWorkspace: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
})

const ETAPAS = ["Conta criada", "Seu workspace", "Pronto!"] as const

export default function PaginaOnboarding() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)
  const [erroNome, setErroNome] = useState("")

  async function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErroNome("")

    const dados = Object.fromEntries(new FormData(evento.currentTarget))

    const resultado = esquemaWorkspace.safeParse(dados)
    if (!resultado.success) {
      setErroNome(resultado.error.issues[0].message)
      return
    }

    setCarregando(true)
    try {
      // Simulação — workspace real é criado no Milestone 13
      await new Promise((resolve) => setTimeout(resolve, 1200))
      router.push("/dashboard")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Cabeçalho */}
      <header className="border-b border-border bg-white px-6 py-4">
        <Logo tamanho="sm" />
      </header>

      {/* Indicador de progresso */}
      <div className="flex justify-center pt-10 px-4">
        <div className="flex items-center gap-2">
          {ETAPAS.map((etapa, indice) => {
            const concluida = indice < 1
            const atual = indice === 1
            return (
              <div key={etapa} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={[
                      "size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                      concluida
                        ? "bg-[#10B981] text-white"
                        : atual
                          ? "bg-[#2563EB] text-white"
                          : "bg-slate-200 text-slate-500",
                    ].join(" ")}
                  >
                    {concluida ? "✓" : indice + 1}
                  </div>
                  <span
                    className={[
                      "text-xs whitespace-nowrap",
                      atual ? "text-slate-900 font-medium" : "text-slate-500",
                    ].join(" ")}
                  >
                    {etapa}
                  </span>
                </div>
                {indice < ETAPAS.length - 1 && (
                  <div
                    className={[
                      "h-px w-12 mb-4",
                      concluida ? "bg-[#10B981]" : "bg-slate-200",
                    ].join(" ")}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 flex items-start justify-center px-4 pt-8 pb-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-xl border border-border shadow-sm p-8">
            {/* Ícone */}
            <div className="flex justify-center mb-6">
              <div className="size-14 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center">
                <Building2 className="size-7 text-[#2563EB]" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h1 className="text-xl font-semibold text-slate-900">
                Crie seu workspace
              </h1>
              <p className="text-sm text-slate-500 mt-1.5">
                O workspace é onde você e seu time gerenciam os leads e negócios.
                Pode ser o nome da sua empresa ou equipe.
              </p>
            </div>

            <form onSubmit={aoEnviar} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="nomeWorkspace">Nome do workspace</Label>
                <Input
                  id="nomeWorkspace"
                  name="nomeWorkspace"
                  type="text"
                  placeholder="Ex: Acme Vendas, Freelancer Maria..."
                  autoComplete="organization"
                  autoFocus
                  aria-invalid={!!erroNome}
                  disabled={carregando}
                />
                {erroNome && (
                  <p className="text-xs text-destructive">{erroNome}</p>
                )}
                <p className="text-xs text-slate-500">
                  Você poderá alterar isso depois em Configurações.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-9 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                disabled={carregando}
              >
                {carregando ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Criando workspace...
                  </>
                ) : (
                  "Criar workspace e continuar →"
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

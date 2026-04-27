"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, MailCheck } from "lucide-react"

const esquemaRecuperacao = z.object({
  email: z.string().email("Digite um e-mail válido"),
})

export default function PaginaRecuperarSenha() {
  const [carregando, setCarregando] = useState(false)
  const [erroEmail, setErroEmail] = useState("")
  const [enviado, setEnviado] = useState(false)

  async function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErroEmail("")

    const dados = Object.fromEntries(new FormData(evento.currentTarget))

    const resultado = esquemaRecuperacao.safeParse(dados)
    if (!resultado.success) {
      setErroEmail(resultado.error.issues[0].message)
      return
    }

    setCarregando(true)
    try {
      // Simulação — backend entra no Milestone 12
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setEnviado(true)
    } finally {
      setCarregando(false)
    }
  }

  if (enviado) {
    return (
      <div className="bg-white rounded-xl border border-border shadow-sm p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="size-12 rounded-full bg-[#10B981]/10 flex items-center justify-center">
            <MailCheck className="size-6 text-[#10B981]" />
          </div>
        </div>
        <h1 className="text-xl font-semibold text-foreground">Verifique seu e-mail</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Enviamos um link para você redefinir sua senha. Pode levar alguns minutos.
        </p>
        <Link
          href="/login"
          className="inline-block mt-6 text-sm text-[#2563EB] hover:underline font-medium"
        >
          Voltar para o login
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Recuperar senha</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Informe seu e-mail e enviaremos um link para criar uma nova senha
        </p>
      </div>

      <form onSubmit={aoEnviar} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="maria@empresa.com"
            autoComplete="email"
            aria-invalid={!!erroEmail}
            disabled={carregando}
          />
          {erroEmail && (
            <p className="text-xs text-destructive">{erroEmail}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-9 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          disabled={carregando}
        >
          {carregando ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enviando...
            </>
          ) : (
            "Enviar link de recuperação"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        <Link
          href="/login"
          className="text-[#2563EB] hover:underline font-medium"
        >
          Voltar para o login
        </Link>
      </p>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

const esquemaCadastro = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
})

type ErrosCampos = Partial<Record<keyof z.infer<typeof esquemaCadastro>, string>>

export default function PaginaCadastro() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)
  const [erros, setErros] = useState<ErrosCampos>({})
  const [erroGeral, setErroGeral] = useState("")

  async function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErros({})
    setErroGeral("")

    const dados = Object.fromEntries(new FormData(evento.currentTarget))

    const resultado = esquemaCadastro.safeParse(dados)
    if (!resultado.success) {
      const errosPorCampo: ErrosCampos = {}
      for (const issue of resultado.error.issues) {
        const campo = issue.path[0] as keyof ErrosCampos
        errosPorCampo[campo] = issue.message
      }
      setErros(errosPorCampo)
      return
    }

    setCarregando(true)
    try {
      // Simulação de cadastro — backend entra no Milestone 12
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/onboarding")
    } catch {
      setErroGeral("Algo deu errado. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Criar sua conta</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Grátis para sempre no plano Free
        </p>
      </div>

      <form onSubmit={aoEnviar} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome completo</Label>
          <Input
            id="nome"
            name="nome"
            type="text"
            placeholder="Maria Silva"
            autoComplete="name"
            aria-invalid={!!erros.nome}
            disabled={carregando}
          />
          {erros.nome && (
            <p className="text-xs text-destructive">{erros.nome}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="maria@empresa.com"
            autoComplete="email"
            aria-invalid={!!erros.email}
            disabled={carregando}
          />
          {erros.email && (
            <p className="text-xs text-destructive">{erros.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="senha">Senha</Label>
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            aria-invalid={!!erros.senha}
            disabled={carregando}
          />
          {erros.senha && (
            <p className="text-xs text-destructive">{erros.senha}</p>
          )}
        </div>

        {erroGeral && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2">
            <p className="text-sm text-destructive">{erroGeral}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-9 bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          disabled={carregando}
        >
          {carregando ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Criando conta...
            </>
          ) : (
            "Criar conta grátis"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-[#2563EB] hover:underline font-medium"
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

const esquemaLogin = z.object({
  email: z.string().email("Digite um e-mail válido"),
  senha: z.string().min(1, "Digite sua senha"),
})

type ErrosCampos = Partial<Record<keyof z.infer<typeof esquemaLogin>, string>>

export default function PaginaLogin() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)
  const [erros, setErros] = useState<ErrosCampos>({})
  const [erroGeral, setErroGeral] = useState("")

  async function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    setErros({})
    setErroGeral("")

    const dados = Object.fromEntries(new FormData(evento.currentTarget))

    const resultado = esquemaLogin.safeParse(dados)
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
      // Simulação de login — backend entra no Milestone 12
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch {
      setErroGeral("E-mail ou senha incorretos. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Bem-vindo de volta</h1>
        <p className="text-sm text-slate-500 mt-1">
          Entre com sua conta para continuar
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
            aria-invalid={!!erros.email}
            disabled={carregando}
          />
          {erros.email && (
            <p className="text-xs text-red-500">{erros.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="senha">Senha</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#2563EB] hover:underline"
            >
              Esqueci minha senha
            </Link>
          </div>
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Sua senha"
            autoComplete="current-password"
            aria-invalid={!!erros.senha}
            disabled={carregando}
          />
          {erros.senha && (
            <p className="text-xs text-red-500">{erros.senha}</p>
          )}
        </div>

        {erroGeral && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
            <p className="text-sm text-red-500">{erroGeral}</p>
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
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500 mt-6">
        Não tem uma conta?{" "}
        <Link
          href="/signup"
          className="text-[#2563EB] hover:underline font-medium"
        >
          Criar conta grátis
        </Link>
      </p>
    </div>
  )
}

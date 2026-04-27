"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

const esquemaCadastro = z
  .object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Digite um e-mail válido"),
    senha: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmarSenha: z.string(),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

type ErrosCampos = Partial<
  Record<"nome" | "email" | "senha" | "confirmarSenha", string>
>

function calcularForcaSenha(senha: string): {
  nivel: 0 | 1 | 2 | 3
  texto: string
  cor: string
} {
  if (senha.length === 0) return { nivel: 0, texto: "", cor: "" }
  if (senha.length < 8) return { nivel: 1, texto: "Fraca", cor: "bg-red-400" }

  const temMaiuscula = /[A-Z]/.test(senha)
  const temNumero = /[0-9]/.test(senha)
  const temEspecial = /[^A-Za-z0-9]/.test(senha)
  const extras = [temMaiuscula, temNumero, temEspecial].filter(Boolean).length

  if (extras >= 2) return { nivel: 3, texto: "Forte", cor: "bg-emerald-500" }
  if (extras === 1) return { nivel: 2, texto: "Média", cor: "bg-amber-400" }
  return { nivel: 1, texto: "Fraca", cor: "bg-red-400" }
}

export default function PaginaCadastro() {
  const router = useRouter()
  const [carregando, setCarregando] = useState(false)
  const [erros, setErros] = useState<ErrosCampos>({})
  const [erroGeral, setErroGeral] = useState("")
  const [senha, setSenha] = useState("")

  const forca = calcularForcaSenha(senha)

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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900">Criar sua conta</h1>
        <p className="text-sm text-slate-500 mt-1">Grátis para sempre no plano Free</p>
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
          {erros.nome && <p className="text-xs text-red-500">{erros.nome}</p>}
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
          {erros.email && <p className="text-xs text-red-500">{erros.email}</p>}
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {/* Barra de força da senha */}
          {senha.length > 0 && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={[
                      "h-1 flex-1 rounded-full transition-colors duration-300",
                      forca.nivel >= i ? forca.cor : "bg-slate-200",
                    ].join(" ")}
                  />
                ))}
              </div>
              <p
                className={[
                  "text-xs",
                  forca.nivel === 1 && "text-red-500",
                  forca.nivel === 2 && "text-amber-500",
                  forca.nivel === 3 && "text-emerald-600",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                Senha {forca.texto.toLowerCase()} —{" "}
                {forca.nivel === 1 && "use pelo menos 8 caracteres"}
                {forca.nivel === 2 && "adicione números ou símbolos para ficar mais segura"}
                {forca.nivel === 3 && "ótima combinação!"}
              </p>
            </div>
          )}

          {/* Dica estática quando campo vazio */}
          {senha.length === 0 && (
            <p className="text-xs text-slate-400">
              Mínimo de 8 caracteres. Use letras, números e símbolos para uma senha mais segura.
            </p>
          )}

          {erros.senha && <p className="text-xs text-red-500">{erros.senha}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmarSenha">Confirmar senha</Label>
          <Input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            placeholder="Repita a senha"
            autoComplete="new-password"
            aria-invalid={!!erros.confirmarSenha}
            disabled={carregando}
          />
          {erros.confirmarSenha && (
            <p className="text-xs text-red-500">{erros.confirmarSenha}</p>
          )}
        </div>

        {erroGeral && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2">
            <p className="text-sm text-red-600">{erroGeral}</p>
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

      <p className="text-center text-sm text-slate-500 mt-6">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-[#2563EB] hover:underline font-medium">
          Entrar
        </Link>
      </p>
    </div>
  )
}

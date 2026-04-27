export type Workspace = {
  id: string
  nome: string
  plano: "free" | "pro"
  iniciais: string
}

export type UsuarioMock = {
  nome: string
  email: string
  avatarUrl: string | null
}

export const workspacesMock: Workspace[] = [
  { id: "ws-1", nome: "Agência Criativa", plano: "pro", iniciais: "AC" },
  { id: "ws-2", nome: "Freelance Pessoal", plano: "free", iniciais: "FP" },
  { id: "ws-3", nome: "Studio Digital", plano: "pro", iniciais: "SD" },
]

export const workspaceAtualMock: Workspace = workspacesMock[0]

export const usuarioMock: UsuarioMock = {
  nome: "Ana Beatriz",
  email: "ana@agenciacriativa.com",
  avatarUrl: null,
}

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"

export default function PaginaShowcase() {
  return (
    <div className="min-h-screen bg-background p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-semibold text-foreground">
          Design System
        </h1>
        <p className="text-muted-foreground mt-1">
          Componentes base do PipeFlow CRM
        </p>
      </div>

      <Section titulo="Logo">
        <Logo />
      </Section>

      <Section titulo="Botões">
        <div className="flex flex-wrap gap-3">
          <Button>Primário</Button>
          <Button variant="secondary">Secundário</Button>
          <Button variant="outline">Contorno</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="destructive">Excluir</Button>
        </div>
      </Section>

      <Section titulo="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Padrão</Badge>
          <Badge variant="secondary">Secundário</Badge>
          <Badge variant="outline">Contorno</Badge>
          <Badge variant="destructive">Perigo</Badge>
          <Badge className="bg-sucesso text-white">Ganho</Badge>
          <Badge className="bg-alerta text-white">Negociação</Badge>
        </div>
      </Section>

      <Section titulo="Cards">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold font-mono">128</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold font-mono">R$ 48.500</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold font-mono">24%</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section titulo="Avatares">
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>FP</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              SD
            </AvatarFallback>
          </Avatar>
        </div>
      </Section>

      <Section titulo="Inputs">
        <div className="space-y-3 max-w-sm">
          <div className="space-y-1">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" placeholder="Ex.: João Silva" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="joao@empresa.com" />
          </div>
        </div>
      </Section>

      <Section titulo="Tipografia">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Título principal</h1>
          <h2 className="text-xl font-semibold">Subtítulo</h2>
          <p className="text-base">Corpo do texto — Inter regular</p>
          <p className="text-sm text-muted-foreground">Texto auxiliar</p>
          <p className="font-mono tabular-nums text-lg">R$ 1.234,56</p>
        </div>
      </Section>

      <Section titulo="Paleta de cores">
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Primária", bg: "bg-primaria" },
            { label: "Secundária", bg: "bg-secundaria" },
            { label: "Sucesso", bg: "bg-sucesso" },
            { label: "Perigo", bg: "bg-perigo" },
            { label: "Alerta", bg: "bg-alerta" },
          ].map(({ label, bg }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className={`h-12 w-12 rounded-lg ${bg}`} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({
  titulo,
  children,
}: {
  titulo: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{titulo}</h2>
        <div className="mt-1 h-px bg-border" />
      </div>
      {children}
    </section>
  )
}

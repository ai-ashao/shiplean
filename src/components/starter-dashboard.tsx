import { Check, FileCode2, FolderKanban, ShieldCheck, TerminalSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Session = {
  authenticated: true
  user: { email: string }
}

const checks = [
  'Describe the first user and one job to be done',
  'Invoke $shiplean-quick-start in your coding agent',
  'Review the routes and product states the agent changes',
  'Run pnpm verify before deployment',
]

const contracts = [
  { icon: ShieldCheck, label: 'Agent rules', value: 'AGENTS.md' },
  { icon: FolderKanban, label: 'Architecture', value: 'ARCHITECTURE.md' },
  { icon: FileCode2, label: 'Acceptance', value: 'pnpm verify' },
] as const

export function StarterDashboard({ session }: Readonly<{ session: Session }>) {
  return (
    <div data-starter-dashboard className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="gap-0 overflow-hidden py-0 shadow-none">
        <CardHeader className="border-b p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardDescription>First product task</CardDescription>
              <CardTitle className="mt-2 text-xl">Turn the starter into one focused MVP</CardTitle>
            </div>
            <Badge variant="secondary">
              <span className="size-1.5 rounded-full bg-emerald-500" /> Ready
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <ol className="space-y-0">
            {checks.map((check, index) => (
              <li className="flex gap-4 border-b py-4 last:border-0" key={check}>
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-medium">
                  {index < 3 ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span
                  className={index < 3 ? 'text-sm text-muted-foreground' : 'text-sm font-medium'}
                >
                  {check}
                </span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <div className="grid gap-4">
        <Card className="gap-4 bg-zinc-950 text-zinc-100 shadow-none">
          <CardHeader>
            <TerminalSquare className="size-5 text-zinc-500" />
            <CardDescription className="text-zinc-500">Start with context</CardDescription>
            <CardTitle className="font-mono text-sm">$shiplean-quick-start</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-xs leading-6 text-zinc-400">
              Turn this template into my SaaS MVP. My first user is …
            </p>
          </CardContent>
        </Card>
        <Card className="gap-4 shadow-none">
          <CardHeader>
            <CardDescription>Included contracts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {contracts.map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div className="flex items-center gap-3">
                  <Icon className="size-4 text-muted-foreground" />
                  <span>{label}</span>
                  <code className="ml-auto text-xs text-muted-foreground">{value}</code>
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground lg:col-span-2">
        Local session: {session.user.email}
      </p>
    </div>
  )
}

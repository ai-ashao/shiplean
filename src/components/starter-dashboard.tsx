import { useEffect, useState } from 'react'

type Session = {
  authenticated: boolean
  user: { email: string }
}

const checks = [
  'Describe the first user and one job to be done',
  'Invoke $shiplean-quick-start in your coding agent',
  'Review the routes and product states the agent changes',
  'Run pnpm verify before deployment',
]

export function StarterDashboard() {
  const [session, setSession] = useState<Session>()

  useEffect(() => {
    void fetch('/api/sandbox/session')
      .then(async (response) => {
        if (response.status === 401) {
          window.location.replace('/login')
          return undefined
        }
        if (!response.ok) throw new Error('Could not load the local starter session.')
        return (await response.json()) as Session
      })
      .then((data) => {
        if (data) setSession(data)
      })
  }, [])

  return (
    <div className="dashboard-grid starter-grid">
      <section className="balance-card starter-status">
        <div className="sandbox-badge">
          <span /> LOCAL STARTER
        </div>
        <p>MVP workspace</p>
        <strong>READY</strong>
        <small>{session?.user.email ?? 'Loading local session…'}</small>
      </section>
      <section className="sandbox-console starter-command-card">
        <div className="panel-label">
          <span>SKILL</span> START WITH CONTEXT
        </div>
        <code>$shiplean-quick-start</code>
        <p>
          Turn this template into my SaaS MVP. My first user is … and the first job they need to
          complete is …
        </p>
      </section>
      <section className="data-card starter-checklist">
        <div className="panel-label">
          <span>01</span> BUILD CHECKLIST
        </div>
        <ol>
          {checks.map((check) => (
            <li key={check}>{check}</li>
          ))}
        </ol>
      </section>
      <section className="data-card">
        <div className="panel-label">
          <span>02</span> INCLUDED CONTRACTS
        </div>
        <dl>
          <dt>Agent rules</dt>
          <dd>AGENTS.md</dd>
          <dt>Architecture</dt>
          <dd>ARCHITECTURE.md</dd>
          <dt>Quick start</dt>
          <dd>Bundled Skill</dd>
          <dt>Acceptance</dt>
          <dd>pnpm verify</dd>
        </dl>
      </section>
    </div>
  )
}

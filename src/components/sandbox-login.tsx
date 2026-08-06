import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export function SandboxLogin() {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function login() {
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/sandbox/session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'maker@shiplean.local' }),
      })
      const data = (await response.json()) as { error?: string }
      if (!response.ok) throw new Error(data.error || 'Local demo login failed.')
      await navigate({ to: '/dashboard' })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Local demo login failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login-card">
      <div className="sandbox-badge">
        <span /> LOCAL STARTER DEMO
      </div>
      <p className="eyebrow">NO EXTERNAL AUTH CALL</p>
      <h1>Open the SaaS shell.</h1>
      <p>
        Preview the protected dashboard and Agent workflow without configuring an auth provider.
        Production auth remains an adapter task for your product.
      </p>
      <label>
        Email
        <input value="maker@shiplean.local" readOnly />
      </label>
      <button type="button" className="button button-dark full" disabled={busy} onClick={login}>
        {busy ? 'Opening demo…' : 'Continue to starter dashboard'}
      </button>
      {error ? <output className="form-error">{error}</output> : null}
      <small>
        This creates only a local, eight-hour HttpOnly demo cookie. No personal data leaves this
        process and no payment flow is included in the MVP.
      </small>
    </div>
  )
}

import { useState } from 'react'

export function SandboxLogout() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function logout() {
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/sandbox/session', { method: 'DELETE' })
      if (!response.ok) throw new Error('Could not close the local demo session.')
      window.location.replace('/login')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not close the local demo session.')
      setBusy(false)
    }
  }

  return (
    <div className="dashboard-session-actions">
      <button type="button" className="button button-light" disabled={busy} onClick={logout}>
        {busy ? 'Closing demo…' : 'Exit local demo'}
      </button>
      {error ? <output className="form-error dashboard-session-error">{error}</output> : null}
    </div>
  )
}

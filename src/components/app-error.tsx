import type { ErrorComponentProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export function AppError({ error, reset }: ErrorComponentProps) {
  return (
    <section className="empty-state" role="alert">
      <p className="eyebrow">RUNTIME / RECOVERABLE</p>
      <h1>This module missed the rail.</h1>
      <p className="error-detail">{error.message || 'An unexpected route error occurred.'}</p>
      <div className="button-row">
        <button type="button" className="button button-dark" onClick={reset}>
          Try again
        </button>
        <Link className="button button-plain" to="/">
          Return home
        </Link>
      </div>
    </section>
  )
}

import { notFound, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest, setResponseHeader } from '@tanstack/react-start/server'
import { isSandboxEnabled } from '../config/runtime'
import { hasSandboxSession, sandboxUser } from './sandbox-session'

function disableCaching() {
  setResponseHeader('cache-control', 'no-store')
}

export const requireSandboxAvailable = createServerFn({ method: 'GET' }).handler(() => {
  disableCaching()
  if (!isSandboxEnabled()) throw notFound()
  return { available: true as const }
})

export const requireSandboxSession = createServerFn({ method: 'GET' }).handler(() => {
  disableCaching()
  if (!isSandboxEnabled()) throw notFound()
  if (!hasSandboxSession(getRequest())) throw redirect({ to: '/login' })
  return { authenticated: true as const, user: sandboxUser }
})

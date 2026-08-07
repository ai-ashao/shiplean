import { createFileRoute } from '@tanstack/react-router'
import {
  expiredSandboxSessionCookie,
  hasSandboxSession,
  sandboxSessionCookie,
  sandboxUser,
} from '@/lib/auth/sandbox-session'
import { isSandboxEnabled } from '@/lib/config/runtime'

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers)
  headers.set('cache-control', 'no-store')
  return Response.json(data, { ...init, headers })
}

export const Route = createFileRoute('/api/sandbox/session')({
  server: {
    handlers: {
      GET: ({ request }) =>
        !isSandboxEnabled()
          ? json({ error: 'Not found.' }, { status: 404 })
          : hasSandboxSession(request)
            ? json({ authenticated: true, user: sandboxUser })
            : json({ authenticated: false }, { status: 401 }),
      POST: async ({ request }) => {
        if (!isSandboxEnabled()) return json({ error: 'Not found.' }, { status: 404 })
        const body = (await request.json().catch(() => ({}))) as { email?: string }
        if (body.email?.trim().toLowerCase() !== sandboxUser.email) {
          return json({ error: 'Use the fixed local sandbox identity.' }, { status: 400 })
        }
        return json(
          { authenticated: true, user: sandboxUser },
          {
            headers: {
              'set-cookie': sandboxSessionCookie({
                secure: new URL(request.url).protocol === 'https:',
              }),
            },
          },
        )
      },
      DELETE: ({ request }) =>
        !isSandboxEnabled()
          ? json({ error: 'Not found.' }, { status: 404 })
          : json(
              { authenticated: false },
              {
                headers: {
                  'set-cookie': expiredSandboxSessionCookie({
                    secure: new URL(request.url).protocol === 'https:',
                  }),
                },
              },
            ),
    },
  },
})

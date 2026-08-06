import { createFileRoute } from '@tanstack/react-router'
import {
  expiredSandboxSessionCookie,
  hasSandboxSession,
  sandboxSessionCookie,
  sandboxUser,
} from '@/lib/auth/sandbox-session'
import { isSandboxEnabled } from '@/lib/config/runtime'

export const Route = createFileRoute('/api/sandbox/session')({
  server: {
    handlers: {
      GET: ({ request }) =>
        !isSandboxEnabled()
          ? Response.json({ error: 'Not found.' }, { status: 404 })
          : hasSandboxSession(request)
            ? Response.json({ authenticated: true, user: sandboxUser })
            : Response.json({ authenticated: false }, { status: 401 }),
      POST: async ({ request }) => {
        if (!isSandboxEnabled()) return Response.json({ error: 'Not found.' }, { status: 404 })
        const body = (await request.json().catch(() => ({}))) as { email?: string }
        if (body.email?.trim().toLowerCase() !== sandboxUser.email) {
          return Response.json({ error: 'Use the fixed local sandbox identity.' }, { status: 400 })
        }
        return Response.json(
          { authenticated: true, user: sandboxUser },
          { headers: { 'set-cookie': sandboxSessionCookie(), 'cache-control': 'no-store' } },
        )
      },
      DELETE: () =>
        !isSandboxEnabled()
          ? Response.json({ error: 'Not found.' }, { status: 404 })
          : Response.json(
              { authenticated: false },
              {
                headers: {
                  'set-cookie': expiredSandboxSessionCookie(),
                  'cache-control': 'no-store',
                },
              },
            ),
    },
  },
})

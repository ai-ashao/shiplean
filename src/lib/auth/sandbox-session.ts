export const SANDBOX_SESSION_COOKIE = 'shiplean_sandbox_session'
const SANDBOX_SESSION_VALUE = 'maker-v1'

export const sandboxUser = {
  id: 'usr_sandbox_maker',
  email: 'maker@shiplean.local',
  name: 'Sandbox Maker',
} as const

export function hasSandboxSession(request: Request) {
  const cookies = request.headers.get('cookie') || ''
  return cookies
    .split(';')
    .some((part) => part.trim() === `${SANDBOX_SESSION_COOKIE}=${SANDBOX_SESSION_VALUE}`)
}

export function sandboxSessionCookie(maxAge = 60 * 60 * 8) {
  return `${SANDBOX_SESSION_COOKIE}=${SANDBOX_SESSION_VALUE}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
}

export function expiredSandboxSessionCookie() {
  return `${SANDBOX_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

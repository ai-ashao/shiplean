import { spawn } from 'node:child_process'
import process from 'node:process'

const port = 41739
const baseUrl = `http://127.0.0.1:${port}`
const output = []
const server = spawn(
  'pnpm',
  ['exec', 'vite', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    cwd: process.cwd(),
    env: { ...process.env, VITE_SITE_URL: baseUrl },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
)

server.stdout.on('data', (chunk) => output.push(chunk.toString()))
server.stderr.on('data', (chunk) => output.push(chunk.toString()))

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function waitForServer() {
  const deadline = Date.now() + 15_000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/api/health`)
      if (response.ok) return
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 150))
  }
  throw new Error(`Vite did not start.\n${output.join('')}`)
}

async function request(path, init) {
  const response = await fetch(`${baseUrl}${path}`, init)
  return { response, text: await response.text() }
}

try {
  await waitForServer()

  const home = await request('/')
  assert(home.response.status === 200, 'Home route must return 200.')
  assert(home.text.includes(`rel="canonical" href="${baseUrl}/"`), 'Home canonical is missing.')
  assert(home.text.includes('application/ld+json'), 'Home JSON-LD is missing.')
  assert(
    home.response.headers.get('x-content-type-options') === 'nosniff',
    'Security headers are missing.',
  )
  assert(
    home.response.headers.get('content-security-policy')?.includes("frame-ancestors 'none'"),
    'CSP is missing.',
  )

  const zh = await request('/zh')
  assert(zh.text.includes('<html lang="zh-CN">'), 'Chinese route must set the document language.')
  assert(/hrefLang="zh-CN"/i.test(zh.text), 'Chinese hreflang is missing.')
  assert(/hrefLang="x-default"/i.test(zh.text), 'x-default hreflang is missing.')

  const robots = await request('/robots.txt')
  assert(
    robots.response.status === 200 && robots.text.includes('/sitemap.xml'),
    'robots.txt is invalid.',
  )
  const sitemap = await request('/sitemap.xml')
  assert(
    sitemap.response.status === 200 && sitemap.text.includes('/guides/build-with-the-skill'),
    'sitemap.xml is invalid.',
  )
  assert(
    !sitemap.text.includes('/tools/'),
    'Deferred SEO tools must not appear in the MVP sitemap.',
  )

  const unauthorized = await request('/api/sandbox/session')
  assert(unauthorized.response.status === 401, 'Session API must reject an anonymous request.')
  assert(
    unauthorized.response.headers.get('cache-control') === 'no-store',
    'Session responses must not be cached.',
  )

  const anonymousDashboard = await request('/dashboard', { redirect: 'manual' })
  assert(
    anonymousDashboard.response.status >= 300 && anonymousDashboard.response.status < 400,
    'Anonymous dashboard requests must redirect before rendering protected content.',
  )
  assert(
    anonymousDashboard.response.headers.get('location') === '/login',
    'Anonymous dashboard requests must redirect to the local login.',
  )

  const login = await request('/api/sandbox/session', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'maker@shiplean.local' }),
  })
  assert(login.response.status === 200, 'Sandbox login failed.')
  const cookie = login.response.headers.get('set-cookie')?.split(';')[0]
  assert(cookie?.startsWith('shiplean_sandbox_session='), 'Sandbox session cookie is missing.')

  const authenticated = await request('/api/sandbox/session', { headers: { cookie } })
  assert(authenticated.response.status === 200, 'Authenticated session readback failed.')
  assert(authenticated.text.includes('maker@shiplean.local'), 'Local identity is missing.')

  const dashboard = await request('/dashboard', { headers: { cookie } })
  assert(dashboard.response.status === 200, 'Starter dashboard must return 200.')
  assert(dashboard.text.includes('Agent-ready workspace'), 'Starter dashboard content is missing.')
  assert(dashboard.text.includes('maker@shiplean.local'), 'Dashboard session must render on SSR.')

  console.log('E2E smoke passed: public metadata, security, bilingual routes, and local session.')
} finally {
  server.kill('SIGTERM')
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ])
}

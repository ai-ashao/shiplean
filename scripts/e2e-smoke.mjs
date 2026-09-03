import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import process from 'node:process'

const port = await findAvailablePort()
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

function findAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer()
    probe.once('error', reject)
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address()
      if (!address || typeof address === 'string') {
        probe.close()
        reject(new Error('Could not allocate an E2E server port.'))
        return
      }
      probe.close((error) => (error ? reject(error) : resolve(address.port)))
    })
  })
}

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
  assert(/hrefLang="en"/i.test(home.text), 'English hreflang is missing.')
  assert(/hrefLang="zh-CN"/i.test(home.text), 'Chinese hreflang is missing.')
  assert(/hrefLang="x-default"/i.test(home.text), 'Home x-default hreflang is missing.')
  assert(
    /data-locale-switch[^>]+href="\/zh"/i.test(home.text),
    'Home locale switch must target the equivalent Chinese route.',
  )
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
  assert(/hrefLang="en"/i.test(zh.text), 'English reciprocal hreflang is missing.')
  assert(/hrefLang="zh-CN"/i.test(zh.text), 'Chinese hreflang is missing.')
  assert(/hrefLang="x-default"/i.test(zh.text), 'x-default hreflang is missing.')
  assert(
    /data-locale-switch[^>]+href="\/"/i.test(zh.text),
    'Chinese locale switch must target the equivalent English route.',
  )

  const pricing = await request('/pricing')
  assert(pricing.response.status === 200, 'Pricing route must return 200.')
  assert(
    !pricing.text.includes('data-locale-switch'),
    'A single-locale page must not offer a false locale switch.',
  )
  assert(
    !/rel="alternate"[^>]+hrefLang=/i.test(pricing.text),
    'A single-locale page must not publish false hreflang alternates.',
  )

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
    !sitemap.text.includes('/tool-reference'),
    'Noindex Tool Landing reference routes must not appear in sitemap.xml.',
  )

  const privacy = await request('/privacy-policy')
  assert(privacy.response.status === 200, 'Privacy Policy route must return 200.')
  assert(
    privacy.text.includes('data-legal-document="privacy"'),
    'Privacy Policy must use the shared legal document template.',
  )
  assert(
    /href="mailto:[^"@]+@[^"@]+"/.test(privacy.text),
    'Privacy Policy must expose the configured contact address.',
  )

  const terms = await request('/terms-of-service')
  assert(terms.response.status === 200, 'Terms of Service route must return 200.')
  assert(
    terms.text.includes('data-legal-document="terms"'),
    'Terms of Service must use the shared legal document template.',
  )
  const legalDocumentsAreStarter = terms.text.includes('data-legal-review-status="starter"')
  const privacyIsNoindex = privacy.text.includes('noindex,nofollow')
  const termsAreNoindex = terms.text.includes('noindex,nofollow')
  assert(
    privacyIsNoindex === legalDocumentsAreStarter && termsAreNoindex === legalDocumentsAreStarter,
    'Legal page robots metadata must match the legal review state.',
  )
  assert(
    sitemap.text.includes('/privacy-policy') !== legalDocumentsAreStarter &&
      sitemap.text.includes('/terms-of-service') !== legalDocumentsAreStarter,
    'Only launch-ready legal pages may appear in sitemap.xml.',
  )

  const textReference = await request('/tool-reference')
  assert(textReference.response.status === 200, 'Text Tool Landing reference must return 200.')
  assert(
    textReference.text.includes('noindex,nofollow'),
    'Text Tool Landing reference must remain noindex.',
  )

  const uploadReference = await request('/tool-reference-upload')
  assert(uploadReference.response.status === 200, 'Upload Tool Landing reference must return 200.')
  assert(
    uploadReference.text.includes('noindex,nofollow'),
    'Upload Tool Landing reference must remain noindex.',
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
  assert(dashboard.text.includes('data-starter-dashboard'), 'Starter dashboard content is missing.')
  assert(dashboard.text.includes('maker@shiplean.local'), 'Dashboard session must render on SSR.')
  assert(dashboard.text.includes('Exit local demo'), 'Dashboard logout control is missing.')

  const logout = await request('/api/sandbox/session', {
    method: 'DELETE',
    headers: { cookie },
  })
  assert(logout.response.status === 200, 'Sandbox logout failed.')
  assert(
    logout.response.headers.get('set-cookie')?.includes('Max-Age=0'),
    'Sandbox logout must expire the session cookie.',
  )

  const loggedOut = await request('/api/sandbox/session')
  assert(loggedOut.response.status === 401, 'Logged-out session must be anonymous.')

  console.log(
    'E2E smoke passed: locale-aware metadata, legal templates, tool references, security, and local session lifecycle.',
  )
} finally {
  server.kill('SIGTERM')
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ])
}

# Visual QA

Verified on 2026-08-15 against the local TanStack Start development server.

| Surface | Viewport | Result |
| --- | --- | --- |
| English home | 1440 × 1000 | Fixed sidebar, five-column metrics, workflow panels, no horizontal overflow |
| English home | 390 × 844 | Sidebar hidden, two-column metrics, stacked calls to action, no horizontal overflow |
| Local sandbox login | 390 × 844 | Login action completed and navigated to protected dashboard |
| Protected dashboard | 390 × 844 | Four metrics in two columns, task panel stacked, no horizontal overflow |

Browser console was free of application warnings and errors on the initial desktop load. A later mobile reload reported a hydration mismatch caused by the installed translation extension adding `data-immersive-translate-page-theme` to the server-rendered `<html>` element; the differing attribute is external to this repository.

Repository verification: `pnpm verify` passed all 10 tests, both client and server production builds, strict TypeScript, and the fresh-server smoke test.

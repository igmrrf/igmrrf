# Portfolio operation and review

## Experience

The website remains the primary navigation surface. The fish-inspired shell is
an optional launcher, opened by the header button, the homepage terminal, or
`Cmd/Ctrl K`. It supports destinations, `cd`, `help`, `ls`, `pwd`, `whoami`,
`clear`, `exit`, history recall, and prefix completion. It does not execute
system commands. History stays in memory for the current page session.

The homepage introduces Francis, surfaces existing projects and recent writing,
and links to the existing upstream contributions. Content is rendered on the
server. Appearance settings are opt-in; a fresh visit uses a solid background.

The homepage's layered terminal uses CSS 3D transforms with spring-based pointer
movement. It pauses outside the viewport and in hidden tabs, has an explicit
pause control, and respects reduced motion. The stack's WebGL explorer is loaded
only after selecting **3D Explorer**. It has a pre-settled simulation, capped
pixel ratio, keyboard node selection, pause/resume, and renderer error/context
loss fallbacks. Matrix Grid is the default and contains the same technologies.

## Local checks

Use Node **22.18+** (native TypeScript stripping is used by the core tests).

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`npm run build` builds the isolated Slidev deck projects before Next.js. Generated
deck assets are ignored by Git and ESLint. Each deck retains its own lockfile.
CI runs install, lint, core behavior tests, and the full production build.

## Deployment configuration

Copy the variable names from `.env.example` into the deployment environment:

- `NEXT_PUBLIC_SITE_URL`: the public HTTPS origin used by metadata and sitemap.
- Optional AI: `AI_PROVIDER`, `AI_API_KEY`, and an available `AI_MODEL_NAME`.
  Provider-specific keys (`GEMINI_API_KEY`, `GROQ_API_KEY`, `OPENAI_API_KEY`) are
  supported; only the selected provider's key is used. Without a key, visitors
  receive an offline response linking to the portfolio.
- Optional comments: the Giscus repository/category values from its setup.
  Without configuration, articles show a contact link instead of setup instructions.

Chat accepts only user/assistant turns, requires a final user message, limits
payloads to 32 KiB, caps message lengths/history and output tokens, and aborts
provider requests after 55 seconds or on client disconnect. Provider errors are
not exposed to visitors. Streaming errors are shown without discarding already
received text. Visitors can stop generation.

The in-process rate limiter is a **per-instance backstop**, not a distributed
quota. It defaults to a shared budget of 10 requests/minute. Set
`CHAT_TRUSTED_IP_HEADER` only to a header your hosting proxy overwrites with the
verified client address. Configure a shared edge/WAF rate limit for `/api/chat`
and a provider spending quota before exposing paid AI on multiple instances.
The app does not provision these hosting controls.

Serve over HTTPS and allow response streaming without proxy buffering. Retain
`content/` in the deployed server's filesystem for chat retrieval. The current
Next build traces that content. The deck routes intentionally allow same-origin
iframe embedding; keep the configured `SAMEORIGIN` frame policy.

## Review findings addressed

- Terminal-looking controls without functional shell navigation.
- Homepage copy obscuring identity, writing, and contributions.
- Invalid self-referencing font tokens and inconsistent dark variants.
- Low-contrast secondary labels, missing input labels, and mobile overflow.
- Client-only hidden initial content on portfolio listings.
- Whole-window canvas sizing and shared, mutated graph inputs.
- Missing reduced-motion, visibility, pause, and WebGL failure handling.
- Arbitrary chat roles, unbounded request bodies, provider key cross-selection,
  silent stream errors, and developer-facing production error messages.
- Root canonical inherited by articles, missing social image and recovery pages,
  filesystem writes on reads, and `.md` files listed but not readable.
- Generated slide bundles included in lint and an invalid global slide CSS selector.

## Verification scope

Local verification on 2026-09-10:

| Check | Result |
| --- | --- |
| ESLint and TypeScript | Passed |
| Core behavior tests | 5 passed |
| Full Slidev + Next production build | Passed; 55 generated pages |
| Sitemap route requests | All 48 returned HTTP 200 |
| Résumé, social image, robots, deck and deck deep link | Passed |
| Chromium desktop/mobile interactions | Passed; no observed page errors |
| axe WCAG A/AA scans | No violations on 8 dark desktop pages and 7 light mobile pages |
| Chat failure/stop and WebGL context-loss recovery | Passed using simulated failures |
| Production dependency audit | 0 vulnerabilities reported |

Core tests cover shell routing, chat validation/limits, limiter expiry, and SSE
Unicode/framing/error behavior. Local Chromium checks cover desktop/mobile
navigation, command completion/history, blog search, stack modes and remounting,
chat offline/fullscreen behavior, reduced motion, and no-JavaScript homepage
content. Automated accessibility checks supplement visual inspection.

Live AI provider responses, configured Giscus discussions, hosting quotas,
cross-browser device behavior, and field Core Web Vitals require validation in
the deployed environment. No deployment or live-provider call is performed by
the local checks.

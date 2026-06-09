# External Integrations

**Analysis Date:** 2026-06-09

## APIs & External Services

**Cinatra AI Platform:**
- Cinatra artifact runtime — this package registers itself as a `cinatra.ai/v1` artifact extension consumed by the Cinatra platform
  - SDK/Client: `@cinatra-ai/sdk-extensions` (optional peer, provided by monorepo)
  - Auth: Not applicable — resolved internally within the Cinatra monorepo workspace

**Email Outreach Agent:**
- Declared compatible agent in `README.md` ("Works with: Email Outreach agent")
- Integration is declarative only; no direct API calls from this package

## Data Storage

**Databases:**
- Not detected — this package contains no database access code

**File Storage:**
- Accepts uploaded files as input (MIME types: `text/markdown`, `text/plain`, `application/pdf`) — declared in `package.json` `cinatra.artifact.accepts` and mirrored in `src/index.ts`
- File handling is delegated to the Cinatra platform runtime, not implemented here

**Caching:**
- Not applicable

## Authentication & Identity

**Auth Provider:**
- Not applicable — this package has no auth logic; authentication is handled by the Cinatra platform that hosts the artifact

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Not applicable — no runtime logic in this package; the only executable surface is the LLM skill prompt in `skills/product-portfolio-matcher/SKILL.md`

## CI/CD & Deployment

**Hosting:**
- Cinatra monorepo (internal workspace) — this is a source-mirror repo, not published to an npm registry

**CI Pipeline:**
- GitHub Actions — `.github/workflows/ci.yml`: validates package shape, checks no first-party deps leaked into non-peer fields, runs `node` extension-kind-gate script
- GitHub Actions — `.github/workflows/release.yml`: release automation (details not expanded)
- Node.js 24 runner on `ubuntu-latest`

## Environment Configuration

**Required env vars:**
- None — this package requires no environment variables

**Secrets location:**
- No secrets files detected in this repo

## Webhooks & Callbacks

**Incoming:**
- Not applicable

**Outgoing:**
- Not applicable

## Skill / LLM Integration

**Matcher Skill:**
- `skills/product-portfolio-matcher/SKILL.md` — LLM prompt that classifies attached resources as Product Portfolio documents
- Referenced by ID `@cinatra-ai/product-portfolio-artifact:product-portfolio-matcher` in `package.json` and `src/index.ts`
- Output contract: JSON `{ "matches": boolean, "confidence": number, "rationale": string }`
- Confidence threshold for a positive match: `0.7` (declared in `package.json` `cinatra.artifact.matcherConfidenceThreshold`)

---

*Integration audit: 2026-06-09*

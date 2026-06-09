# Technology Stack

**Analysis Date:** 2026-06-09

## Languages

**Primary:**
- TypeScript — all source code in `src/` (compiled to ESNext, strict mode)

**Secondary:**
- YAML — GitHub Actions workflow definitions in `.github/workflows/`
- Markdown — skill prompt in `skills/product-portfolio-matcher/SKILL.md`

## Runtime

**Environment:**
- Node.js 24 (declared in `.github/workflows/ci.yml` via `actions/setup-node`)

**Package Manager:**
- npm (inferred from `package.json`)
- `.npmrc` present with `auto-install-peers=false`
- Lockfile: not detected (source-mirror repo, not standalone installable)

## Frameworks

**Core:**
- Cinatra AI artifact extension framework (`@cinatra-ai/sdk-extensions`) — provides the `SemanticArtifactManifest` type; declared as optional peer dependency only

**Testing:**
- Not detected — this is a source-mirror repo; testing is owned by the Cinatra monorepo

**Build/Dev:**
- TypeScript compiler (`tsc`) — configured via `tsconfig.json`, targets `dist/` output
- GitHub Actions — CI gate via `.github/workflows/ci.yml`; release via `.github/workflows/release.yml`
- Corepack — enabled in CI for package manager version management

## Key Dependencies

**Critical:**
- `@cinatra-ai/sdk-extensions` (optional peerDependency, `*`) — provides `SemanticArtifactManifest` type used in `src/index.ts`; supplied by the Cinatra monorepo workspace, never published to a registry

**Infrastructure:**
- None — zero production runtime dependencies; the artifact is a manifest declaration + skill prompt only

## Configuration

**Environment:**
- No `.env` file detected
- No environment variables required by this package itself

**Build:**
- `tsconfig.json` — TypeScript config; `target: ES2023`, `module: ESNext`, `moduleResolution: bundler`, `strict: true`, `jsx: react-jsx`, emits to `dist/`, sources from `src/`
- `package.json` — declares `cinatra.apiVersion: cinatra.ai/v1`, `cinatra.kind: artifact`, accepted MIME types, and matcher skill reference
- `.npmrc` — `auto-install-peers=false`

## Platform Requirements

**Development:**
- Node.js 24+
- Cinatra monorepo workspace context required to resolve `@cinatra-ai/sdk-extensions` peer dependency for type-checking

**Production:**
- Deployed as part of the Cinatra monorepo; not standalone-publishable to an npm registry
- The artifact registers itself via `package.json` `cinatra` metadata block; no separate deployment artifact

---

*Stack analysis: 2026-06-09*

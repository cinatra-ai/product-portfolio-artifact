# Coding Conventions

**Analysis Date:** 2026-06-09

## Naming Patterns

**Files:**
- `camelCase` for TypeScript source files: `src/index.ts`
- `UPPER_SNAKE_CASE` for documentation: `SKILL.md`, `README.md`
- Skill directories use `kebab-case`: `skills/product-portfolio-matcher/`

**Functions / Constants:**
- Exported manifest constants use `camelCase` with descriptive suffix: `productPortfolioArtifactManifest`
- No functions defined in this repo — the single export is a typed constant

**Variables:**
- `camelCase` throughout

**Types:**
- Imported type aliases from `@cinatra-ai/sdk-extensions` using `import type`: `SemanticArtifactManifest`

## Code Style

**Formatting:**
- No Prettier or ESLint config detected — formatting is enforced by the consuming monorepo
- `verbatimModuleSyntax: true` in `tsconfig.json` requires explicit `import type` for type-only imports (enforced by compiler)

**Linting:**
- No standalone `.eslintrc*` or `biome.json` detected
- TypeScript `strict: true` is set, but `noImplicitAny: false` relaxes the strictest any-usage check
- `isolatedModules: true` ensures each file is independently compilable

## Import Organization

**Order:**
1. Type-only imports from external packages (`import type { ... } from "..."`)
2. No runtime imports present in `src/index.ts`

**Path Aliases:**
- None detected; module resolution uses `bundler` strategy

**Module syntax:**
- ESM only (`"type": "module"` in `package.json`)
- `verbatimModuleSyntax` enforces `import type` for type imports

## Error Handling

**Patterns:**
- Not applicable — this repo exports a static manifest constant; no runtime logic or error paths exist

## Logging

**Framework:** Not applicable — no runtime logic

**Patterns:**
- CI validation scripts (`ci.yml`) use `console.error` for Node.js inline validation scripts and `echo` for shell output

## Comments

**When to Comment:**
- Module-level block comments explain the artifact's semantic scope and what it is NOT (distinguishing from sibling artifacts like ICP, marketing-strategy, competitive-analysis)
- Inline `//` comments used sparingly for clarifying architectural decisions (e.g., `tsconfig.json` explanation of standalone config rationale)

**JSDoc/TSDoc:**
- Not used — the codebase is minimal and relies on TypeScript types for documentation

## Function Design

**Size:** Not applicable — no functions; single `const` export

**Parameters:** Not applicable

**Return Values:** Not applicable

## Module Design

**Exports:**
- Single named export from `src/index.ts`: `productPortfolioArtifactManifest`
- `package.json` sets `"main": "./src/index.ts"` and `"types": "./src/index.ts"` — no compiled dist referenced as entry; the monorepo builds from source

**Barrel Files:**
- `src/index.ts` acts as the sole barrel — there is only one module file

## Cinatra Extension Conventions

**Manifest mirroring:**
- The TypeScript export in `src/index.ts` mirrors the `cinatra.artifact` field in `package.json` exactly. Any change to one must be reflected in the other.

**Dependency shape:**
- First-party `@cinatra-ai/*` packages MUST be declared as `peerDependencies` marked `optional: true` in `peerDependenciesMeta`. Placing them in `dependencies` or `devDependencies` is a CI-breaking regression (enforced by `ci.yml` inline Node script).

**Skills:**
- Skill prompts live in `skills/<skill-name>/SKILL.md` with YAML front-matter (`name`, `description`)
- Output contract defined in the SKILL.md itself (JSON-only response, no markdown wrapper)
- Confidence thresholds documented in SKILL.md with explicit numeric ranges

---

*Convention analysis: 2026-06-09*

# Codebase Structure

**Analysis Date:** 2026-06-09

## Directory Layout

```
product-portfolio-artifact/
├── src/
│   └── index.ts              # Single entry point — exports SemanticArtifactManifest constant
├── skills/
│   └── product-portfolio-matcher/
│       └── SKILL.md          # LLM classifier prompt for this artifact type
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI pipeline
│       └── release.yml       # Release pipeline
├── .planning/
│   └── codebase/             # GSD codebase map documents (this directory)
├── package.json              # NPM manifest + Cinatra artifact registry block
├── tsconfig.json             # Standalone TypeScript config (no monorepo extend)
├── README.md                 # Package documentation
├── LICENSE                   # Apache-2.0
└── .npmrc                    # NPM registry configuration (note: may contain auth tokens — not read)
```

## Directory Purposes

**`src/`:**
- Purpose: TypeScript source — the npm package's public API
- Contains: Single `index.ts` exporting the artifact manifest constant
- Key files: `src/index.ts`

**`skills/`:**
- Purpose: Cinatra skill definitions bound to this artifact
- Contains: One subdirectory per skill, each with a `SKILL.md` prompt file
- Key files: `skills/product-portfolio-matcher/SKILL.md`

**`skills/product-portfolio-matcher/`:**
- Purpose: Classifier skill that determines if a document is a product-portfolio artifact
- Contains: `SKILL.md` with YAML front-matter + LLM rules + output contract
- Key files: `skills/product-portfolio-matcher/SKILL.md`

**`.github/workflows/`:**
- Purpose: CI/CD automation
- Contains: `ci.yml` (continuous integration), `release.yml` (package publishing)
- Key files: `.github/workflows/ci.yml`, `.github/workflows/release.yml`

**`.planning/codebase/`:**
- Purpose: GSD codebase map documents for AI-assisted planning
- Generated: Yes (by `/gsd-map-codebase`)
- Committed: Yes

## Key File Locations

**Entry Points:**
- `src/index.ts`: TypeScript manifest export — the npm package's sole public export

**Configuration:**
- `package.json`: NPM + Cinatra registry metadata (artifact kind, MIME types, skill refs, threshold)
- `tsconfig.json`: TypeScript compiler config (ES2023 target, ESNext modules, bundler resolution)
- `.npmrc`: NPM registry auth config (existence noted; contents not read)

**Core Logic:**
- `skills/product-portfolio-matcher/SKILL.md`: All classification logic lives here — LLM prompt rules, confidence guidance, output JSON contract

**CI/CD:**
- `.github/workflows/ci.yml`: CI pipeline
- `.github/workflows/release.yml`: Release/publish pipeline

## Naming Conventions

**Files:**
- TypeScript source: `camelCase.ts` (e.g., `index.ts`)
- Skill definitions: `SKILL.md` (uppercase, fixed filename per Cinatra skill convention)
- Workflows: `kebab-case.yml`

**Directories:**
- Skill directories: `kebab-case` matching the skill name (e.g., `product-portfolio-matcher`)
- Top-level dirs: lowercase, single-word or kebab-case

**Exports:**
- Manifest constant: `camelCase` with `Manifest` suffix (e.g., `productPortfolioArtifactManifest`)

**Package:**
- npm scope: `@cinatra-ai/` prefix for all Cinatra extension packages
- Name pattern: `@cinatra-ai/<artifact-type>-artifact`

## Where to Add New Code

**New skill for this artifact:**
- Create directory: `skills/<skill-name>/`
- Add skill definition: `skills/<skill-name>/SKILL.md`
- Register in manifest: add skill ID to `skills.matchers` array in both `src/index.ts` and `package.json` `cinatra.artifact.skills.matchers`

**New accepted MIME type:**
- Add to `accepts.file.mimeTypes` in `src/index.ts` AND mirror in `package.json` `cinatra.artifact.accepts.file.mimeTypes`

**Adjusting confidence threshold:**
- Change `matcherConfidenceThreshold` in `src/index.ts` AND mirror in `package.json` `cinatra.artifact.matcherConfidenceThreshold`

**Additional TypeScript types or utilities:**
- Not applicable — this package is intentionally a single-file declarative manifest. Do not add additional source files unless the Cinatra SDK extension pattern evolves to require them.

## Special Directories

**`skills/`:**
- Purpose: Cinatra skill prompt definitions
- Generated: No (hand-authored)
- Committed: Yes

**`.planning/`:**
- Purpose: GSD planning and codebase map artifacts
- Generated: Yes (by GSD tooling)
- Committed: Yes

---

*Structure analysis: 2026-06-09*

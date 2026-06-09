<!-- refreshed: 2026-06-09 -->
# Architecture

**Analysis Date:** 2026-06-09

## System Overview

```text
┌───────────────────────────────────────────────────────────┐
│              Cinatra AI Platform (runtime)                 │
│  Consumes artifact manifest + skill via cinatra.ai/v1 API │
└──────────────────────────┬────────────────────────────────┘
                           │
                           ▼
┌───────────────────────────────────────────────────────────┐
│              Artifact Manifest (entry point)               │
│  `src/index.ts`  — SemanticArtifactManifest export        │
│  declares accepted MIME types, skill refs, threshold       │
└──────────────────────────┬────────────────────────────────┘
                           │ references by skill ID
                           ▼
┌───────────────────────────────────────────────────────────┐
│              Skill: product-portfolio-matcher              │
│  `skills/product-portfolio-matcher/SKILL.md`              │
│  LLM prompt / classifier definition (YAML front-matter    │
│  + natural-language rules + JSON output contract)          │
└───────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Artifact manifest | Declares accepted MIME types, bound skills, confidence threshold | `src/index.ts` |
| package.json `cinatra` block | Machine-readable copy of manifest consumed by Cinatra CLI/registry | `package.json` |
| product-portfolio-matcher skill | LLM classifier prompt: decides whether an uploaded document is a product-portfolio artifact | `skills/product-portfolio-matcher/SKILL.md` |

## Pattern Overview

**Overall:** Declarative Semantic Artifact Extension

**Key Characteristics:**
- No runtime business logic — the package exports a single typed manifest constant
- Classification logic lives entirely in a natural-language skill prompt (`SKILL.md`)
- The Cinatra platform evaluates the skill at runtime; this repo ships only the definition
- Manifest is mirrored in both `src/index.ts` (TypeScript) and `package.json` `cinatra` block (JSON) for dual consumption paths (SDK + CLI)

## Layers

**Manifest Layer:**
- Purpose: Typed TypeScript export consumed by host applications via `@cinatra-ai/sdk-extensions`
- Location: `src/index.ts`
- Contains: One exported `SemanticArtifactManifest` constant
- Depends on: `@cinatra-ai/sdk-extensions` (peer, optional)
- Used by: Cinatra SDK host apps, platform runtime

**Skill Definition Layer:**
- Purpose: LLM classifier prompt that determines if a document matches this artifact type
- Location: `skills/product-portfolio-matcher/SKILL.md`
- Contains: YAML front-matter (name, description) + natural-language classification rules + confidence guidance + output JSON contract
- Depends on: Nothing (plain Markdown evaluated by platform LLM runtime)
- Used by: Cinatra platform skill runner

**Registry Metadata Layer:**
- Purpose: Machine-readable manifest for Cinatra artifact registry / CLI tooling
- Location: `package.json` (`cinatra` key)
- Contains: `apiVersion`, `kind`, `artifact` block (MIME types, skills, threshold)
- Depends on: Nothing
- Used by: Cinatra CLI, artifact registry

## Data Flow

### Document Classification Path

1. User uploads a file (text/markdown, text/plain, or application/pdf) to the Cinatra platform
2. Platform reads `package.json` `cinatra.artifact.accepts.file.mimeTypes` to validate MIME type
3. Platform invokes the skill `@cinatra-ai/product-portfolio-artifact:product-portfolio-matcher` (`skills/product-portfolio-matcher/SKILL.md`)
4. LLM evaluates the document against the skill prompt rules and returns `{ matches, confidence, rationale }`
5. Platform compares `confidence` against `matcherConfidenceThreshold: 0.7` (`src/index.ts`)
6. Result propagates back to caller — document accepted as a product-portfolio artifact or rejected

### SDK Consumption Path

1. Host app imports `productPortfolioArtifactManifest` from `@cinatra-ai/product-portfolio-artifact`
2. Manifest provides typed artifact shape for programmatic registration with the Cinatra SDK
3. No additional runtime behaviour — purely declarative

## Key Abstractions

**SemanticArtifactManifest:**
- Purpose: TypeScript type from `@cinatra-ai/sdk-extensions` that enforces the shape of all artifact manifests
- Examples: `src/index.ts`
- Pattern: Single exported constant, typed at import boundary

**Skill (SKILL.md):**
- Purpose: Self-contained LLM prompt file with YAML front-matter; platform evaluates it to produce structured JSON
- Examples: `skills/product-portfolio-matcher/SKILL.md`
- Pattern: Markdown file with `name` + `description` front-matter, classification rules, output contract

## Entry Points

**TypeScript Manifest Export:**
- Location: `src/index.ts`
- Triggers: Import by SDK host or `tsc` build
- Responsibilities: Exports `productPortfolioArtifactManifest` constant

**Package Registry Entry:**
- Location: `package.json` (`cinatra` block)
- Triggers: Cinatra CLI artifact registration
- Responsibilities: Provides `apiVersion: cinatra.ai/v1`, `kind: artifact`, full artifact config

## Architectural Constraints

- **Threading:** Not applicable — no runtime code, purely declarative
- **Global state:** None — single exported constant, no module-level mutable state
- **Circular imports:** None — single source file with one external type import
- **Dual-manifest rule:** `src/index.ts` and `package.json` `cinatra.artifact` block MUST stay in sync; divergence causes inconsistent behaviour between SDK and CLI consumers
- **No connectorRef / templates / agentDependencies:** This artifact is bytes-only matcher; do not add connector or template fields to the manifest

## Anti-Patterns

### Adding runtime logic to src/index.ts

**What happens:** Developers add helper functions or processing logic alongside the manifest export
**Why it's wrong:** This package is a declarative extension; runtime logic belongs in the host SDK or platform, not the artifact definition
**Do this instead:** Keep `src/index.ts` to the single manifest constant export only

### Duplicating classification logic outside the skill

**What happens:** Classification rules are encoded in TypeScript rather than (or in addition to) `SKILL.md`
**Why it's wrong:** The platform's LLM runtime is the authoritative classifier; duplicating logic causes drift and maintenance burden
**Do this instead:** All classification rules belong exclusively in `skills/product-portfolio-matcher/SKILL.md`

## Error Handling

**Strategy:** Not applicable at this layer — no runtime code executes in this package

**Patterns:**
- TypeScript strict mode enforces type safety at build time (`tsconfig.json`: `"strict": true`)
- Peer dependency on `@cinatra-ai/sdk-extensions` is optional, preventing hard install failures

## Cross-Cutting Concerns

**Logging:** Not applicable — no runtime
**Validation:** TypeScript type checking via `SemanticArtifactManifest` interface at compile time
**Authentication:** Not applicable — handled by Cinatra platform, not this package

---

*Architecture analysis: 2026-06-09*

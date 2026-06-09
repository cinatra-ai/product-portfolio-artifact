# Testing Patterns

**Analysis Date:** 2026-06-09

## Test Framework

**Runner:**
- Not detected — no test framework configured in `package.json` (no `jest`, `vitest`, `mocha`, etc.)
- No `jest.config.*`, `vitest.config.*`, or equivalent config files present

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
# No test script defined in package.json
# CI runs: corepack pnpm test --if-present  (exits 0 when no test script)
```

## Test File Organization

**Location:**
- No test files exist in this repository

**Naming:**
- Not applicable

**Structure:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable — no tests exist

**Patterns:**
- Not applicable

## Mocking

**Framework:** Not applicable

**Patterns:** Not applicable

**What to Mock:** Not applicable

**What NOT to Mock:** Not applicable

## Fixtures and Factories

**Test Data:** Not applicable

**Location:** Not applicable

## Coverage

**Requirements:** None enforced — no coverage tooling configured

**View Coverage:**
```bash
# Not configured
```

## Test Types

**Unit Tests:**
- Not present. This repo is a source mirror of a Cinatra extension artifact; the consuming monorepo is responsible for running all tests.

**Integration Tests:**
- Not present in this repo. The CI pipeline explicitly skips standalone testing when host-internal `@cinatra-ai/*` optional peers are declared (see `.github/workflows/ci.yml` lines 119–123).

**E2E Tests:**
- Not used

## CI Validation (Substitute for Tests)

Although no automated tests exist, the CI pipeline (`/.github/workflows/ci.yml`) enforces correctness via:

1. **Dependency shape validation** — inline Node.js script verifies first-party `@cinatra-ai/*` packages are not in `dependencies`/`devDependencies` and that all first-party peers have `peerDependenciesMeta.optional: true`.
2. **TypeScript typecheck** — skipped for source mirrors (monorepo owns this), run for standalone repos via `tsc --noEmit`.
3. **Pack dry-run** — `npm pack --dry-run` validates package shape and publish payload without resolving peers.
4. **Kind-specific gate** — placeholder for `workflow`/`agent` extension kinds; `artifact` kind has no extra gate.

## Skill Matcher Validation

The `skills/product-portfolio-matcher/SKILL.md` defines a structured output contract that acts as an implicit specification:
- Output must be JSON only (no markdown wrapper)
- Schema: `{ "matches": boolean, "confidence": number, "rationale": string }`
- Confidence thresholds are explicitly specified (0.85–0.95, 0.70–0.84, 0.50–0.69, <0.50)
- No automated tests validate the LLM prompt output — validation is semantic and performed by the monorepo's classifier test suite

---

*Testing analysis: 2026-06-09*

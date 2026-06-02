import type { SemanticArtifactManifest } from "@cinatra-ai/sdk-extensions";

// `@cinatra-ai/product-portfolio-artifact` is the product-portfolio artifact
// extension. A semantic work product describing WHAT a company sells — product
// line(s), SKUs / packages / pricing tiers, feature inventories, capability
// matrices, target use cases per offering. Distinct from the ICP (who buys),
// marketing-strategy (how we reach buyers), and competitive-analysis (the
// alternatives landscape).
//
// Artifact shape: bytes-only matcher, no connectorRef / templates /
// agentDependencies. Mirrored in package.json `cinatra.artifact`.
export const productPortfolioArtifactManifest: SemanticArtifactManifest = {
  accepts: {
    file: {
      mimeTypes: ["text/markdown", "text/plain", "application/pdf"],
    },
  },
  skills: {
    matchers: [
      "@cinatra-ai/product-portfolio-artifact:product-portfolio-matcher",
    ],
  },
  matcherConfidenceThreshold: 0.7,
};

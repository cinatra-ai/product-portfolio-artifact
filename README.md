# Product Portfolio

A catalogue of a company's commercial offerings — product lines, SKUs, pricing tiers, feature inventory per tier, and the use cases each offering serves. The portfolio is the offering layer that grounds writers, sellers, and outbound agents in "what we sell, and what is in each plan".

Install via the Cinatra marketplace: open the Extensions panel, search for Product Portfolio, and click Install. No credentials or connector configuration are required — the artifact stores its content in the workspace document store and becomes available to all agents immediately after install.

To configure, upload a document (Markdown, plain text, or PDF) that describes your product lines, pricing tiers, and feature inventory. The artifact runs the product-portfolio-matcher classifier and stores the file as a typed workspace artifact when classifier confidence is at or above 0.7. No environment variables or secrets are needed.

For local development, clone the repo and run node extension-kind-gate.mjs to validate the extension. The source entry is src/index.ts; the matcher prompt is in skills/product-portfolio-matcher/SKILL.md. The cinatra.artifact block in package.json defines accepted MIME types and the matcher skill reference.

API contract: the artifact exposes no HTTP endpoints. Agents receive stored artifact content through the Cinatra host context. The matcher skill returns a JSON object with three fields: matches (boolean), confidence (float 0–1), and rationale (string). Example: { "matches": true, "confidence": 0.91, "rationale": "Document contains named pricing tiers and a feature matrix." }.

Troubleshooting: if an uploaded document is not classified (confidence below 0.7), confirm it lists named offerings, pricing tiers, or a feature matrix — a marketing-strategy or ICP document will not match. If install fails the marketplace gate, run node extension-kind-gate.mjs locally to surface validation errors.

## Works with

- Email Outreach agent

## Capabilities

- Capture product lines, pricing tiers, and feature inventory in one document
- Ground outbound email copy in the right offering and pricing tier
- Brief writers and inbound qualifiers with a shared offering catalogue
- Align sales conversations with the canonical plan and feature breakdown

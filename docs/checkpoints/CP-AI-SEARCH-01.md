# CP-AI-SEARCH-01 — AI/search visibility and qualified lead baseline

Date: 2026-11-01
MPE decision: EXTEND_EXISTING
Status: PLANNED ONLY (no implementation authorization)
Priority: P1 business validation
Target: https://www.tuba.kz/
Deep-change: NO for read-only evidence; stop for explicit approval if infrastructure, paid integration, privacy boundary or external API must change.

## Purpose
Check whether the current website appears in ordinary search and AI-assisted responses for relevant potential clients, and whether this leads to qualified inquiries. Reuse existing site, content and contact infrastructure; do not introduce another monitoring system or CMS.

## Preflight / duplication guard
1. Read AGENTS.md, docs/governance/SCOPE-CHANGE-CONTROL.md, available simplicity-first rules, active PRs, deployment and site-specific policies. Confirm source branch is current before proposing changes.
2. Check alternative/archived repositories read-only, do not develop or deploy them; do not reproduce existing SEO, canonical, JSON-LD or lead functionality.
3. Keep Google Ads tag AW-18220207101; preserve approved canonical www.tuba.kz, privacy policy, explicit contact consent, accurate WhatsApp send behavior, aligned ad landing URLs and existing Google Ads readiness script. Never change ads conversion tags or campaign settings.

## Phase A — audit and honest baseline
- Inspect real publicly served pages, canonical host, robots.txt, sitemap.xml, titles/descriptions, structured data, mobile experience, links, accessibility and factual statements.
- Check current official Google Search Console data-reporting documentation before asserting separate AI Mode / AI Overviews metrics. Obtain consented property access where available. Without access report DATA_UNAVAILABLE, never fabricate figures.
- Draft 20 useful local intent queries in Russian and Kazakh, matched to actual verified services; capture date, platform, language, query, observed answer/reference/URL and limitations. Distinguish mention, verified citation, search result and untested.
- Record existing organic clicks, impressions, CTR where provided. Count qualified contact requests only if attributable using existing privacy-compliant records; otherwise mark UNKNOWN.

## Phase B — improvement proposals and measurement
- Identify up to three small, factual corrections to existing pages (clear services, verifiable photos/projects, location, source/update dates, answers and internal links); do not publish or invent new claims.
- Record a day-0 baseline; design 14-day follow-up comparing identical query sample, traffic metrics and qualified leads, noting low sample size, variability and lack of causal proof.
- Compare doing nothing, manual spreadsheet, current tools/exports. No new AI search monitoring SaaS, agent, crawler, backend or tracking script until justified by measurable business value.

## Acceptance
Dated read-only audit; 20-question reproducible observation matrix or honest access blocker; Search Console availability/official source; <=3 prioritized corrective suggestions; lead measurement limitations; 14-day follow-up and PASS/PARTIAL/BLOCKED evidence.

## Execution policy
Arena can do source audits, static verification, public AI query checks where legitimately available, and documentation. Authenticated Search Console, ad account reports or lead data require existing appropriate access, not secrets in the repo. No merge, deploy, new costs, automated publication or advertising changes. Stop for owner review.

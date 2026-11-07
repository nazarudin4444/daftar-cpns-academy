# Build Daftar CPNS MVP

## Scope
Create the requested Indonesian independent exam-preparation site as a usable MVP, with a working local-only CAT demo and clear boundaries around unverified information and real operator details.

## Build
- Replace the placeholder homepage with the Daftar CPNS brand, responsive navigation, a distinct original study visual, category entry points, learning paths, official references, FAQs, and a prominent independence disclaimer.
- Add the requested public search pages and legal/about/contact pages using shared presentation patterns and unique, page-specific metadata. Keep public content factual, answer-first, linked to official sources, and explicit where announcements or operator details have not been verified.
- Implement an original demo exam with selectable practice tracks, questions by category, timer, answer/flag/unanswered navigation, local progress recovery, finish confirmation, scored results, category breakdowns, and answer explanations. Label demo content and scoring as nonofficial; do not invent pass thresholds or official exam rules.
- Install the upstream Antislop agent rules after inspecting the repository instructions and safely merging only the relevant, non-conflicting guidance.
- Add focused checks for scoring/session behavior, preserve the existing robots rules, and verify the homepage and exam flow in the running preview.

## Boundaries
- No accounts, payments, analytics, collection of sensitive identifiers, government branding, invented authors/contact details, or claims of legal compliance.
- Use relative page metadata until the requested public domain is verified as connected. Defer an absolute-URL XML sitemap until a public canonical host is available; do not invent a verification code or sitemap host.
- Leave real operator identity and contact fields clearly pending rather than fabricating them.

## Technical approach
- Keep the existing TanStack Start, React, TypeScript, and Tailwind stack.
- Use individual file-based pages with shared content/layout helpers; keep CAT questions and scoring rules in a browser-safe module and persist only demo progress in local storage.
- Use the existing semantic design tokens and UI controls; avoid new dependencies unless the project cannot meet a requested behavior without them.

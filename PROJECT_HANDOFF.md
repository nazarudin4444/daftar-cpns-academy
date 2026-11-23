# Project handoff: Daftar CPNS Academy

Last reviewed: 2026-11-17

This is a repository snapshot for a new ChatGPT/Codex session. Recheck Git and the relevant files before acting; code may have changed after this note.

## Purpose and product boundaries

An independent Indonesian learning site for CPNS, PPPK, and school-service exam preparation. The product provides study guides, practice questions, document/study tools, and a browser-based demo CAT experience.

- Do not present the product as an official BKN, SSCASN, or government service.
- Mark practice content as demo/learning material where needed; do not claim it is official or leaked.
- Do not invent selection announcements, passing thresholds, statistics, testimonials, operator details, legal registration, or guaranteed outcomes.
- Direct official registration to `https://sscasn.bkn.go.id/` and verify time-sensitive selection information against current primary government sources.
- Avoid collecting sensitive registration data. Exam state/history is designed to stay in the browser.

## Repository snapshot

- Path: `E:\lovable\daftar-cpns-academy`
- Branch: `main`
- The working tree was clean before this handoff file was added. This file is currently a new untracked file until committed.
- Recent commits:
  - `3d10b14` Add HOTS school service exam packages
  - `7e91139` Build interactive PPPK learning hub
  - `7f9a497` Refresh question bank layout and topic navigation
  - `0665d04` Use full-width responsive CAT workspace
  - `3272191` Expand CPNS simulator to 200 HOTS packages
- `roadmap.md` contains an old unchecked MVP checklist that does not reflect the recent commits and current files. Audit it against the repository before treating its checkboxes as current status.
- No build or test command was run while preparing this handoff.

## Stack and local commands

- React 19, TypeScript, TanStack Start/Router, Vite, Tailwind CSS v4, Lucide icons.
- Lockfiles include `bun.lock` and `package-lock.json`; the README describes npm, while the project uses a Bun lockfile. Follow the user's environment/package manager and avoid changing lockfiles casually.
- Development: `bun run dev` (or `npm run dev` if using npm with the existing npm lockfile).
- Scripts in `package.json`: `dev`, `build`, `build:dev`, `preview`, `sync:formasi`, `lint`, `format`, `test`, and `test:watch`.
- Project guidance says to avoid heavyweight builds/tests or unnecessary dependency installs to conserve Lovable credits. Run checks only when asked or needed for the task, and report exactly which checks ran.

## Route map

Routes are file-based under `src/routes/`; `src/routes/__root.tsx` is the app shell. Do not add Next.js/Remix-style `pages/` or layouts. `src/routeTree.gen.ts` is generated and must not be hand-edited.

- `/`: homepage and CAT preview (`index.tsx`).
- `/simulasi-cat-cpns`: main CAT practice experience; `/simulasi` redirects there.
- `/tryout-cpns-gratis`, `/latihan-soal-cpns`, `/soal-twk`, `/soal-tiu`, `/soal-tkp`: practice entry points and subject pages.
- `/pppk`: PPPK learning hub; `/sekolah-kedinasan`: school-service content.
- `/jadwal-cpns`, `/formasi-cpns`, `/syarat-cpns`, `/cara-daftar-cpns`, `/passing-grade-cpns`, `/kisi-kisi-skd`: selection information pages. Reverify any time-sensitive facts and sources.
- `/panduan`, `/artikel`, `/situs`, `/persiapan-dokumen`, `/alat-belajar`: guides, directory/content, and learning/document tools.
- `/tentang-kami`, `/kontak`, `/kebijakan-privasi`, `/syarat-ketentuan`, `/disclaimer`: operator and legal information.
- `/dashboard`: local learning/exam dashboard; keep private dashboard URLs out of the sitemap and preserve `noindex`.
- `/$slug`: catch-all/unknown URL handling; should remain noindex.

## Main code areas

- `src/routes/`: page routes and route metadata.
- `src/components/site.tsx`: shared site shell and large shared UI, including dashboard and CAT interaction flows. Inspect carefully before editing because several behaviors live in this file.
- Other feature components in `src/components/`: `home-portal.tsx`, `home-cat-preview.tsx`, `pppk-hub.tsx`, `study-guide.tsx`, `guide-practice.tsx`, `study-tools.tsx`, `document-preparation.tsx`, `formasi-explorer.tsx`, `schedule-tracker.tsx`, and `directory-tips.tsx`.
- `src/components/ui/`: reusable UI primitives.
- `src/lib/exam.ts`: exam types, tracks, demo rules, question bank composition, scoring/selection helpers.
- `src/lib/exam-*.ts`: CPNS/PPPK/kedinasan question banks, extension sets, tips, and packages.
- `src/lib/exam-storage.ts`: local browser session/result/history persistence and validation.
- `src/lib/exam-packages.ts` and `src/lib/exam-catalog.ts`: tryout packages and subject/chapter catalogs.
- `src/lib/content-pages.ts`: page copy, metadata, source links, and legal content.
- `src/lib/site-config.ts`: canonical origin and public operator/contact constants.
- `scripts/generate-sitemap.ts`: generates `public/sitemap.xml`; launch notes say regenerate after adding public routes and exclude private/unknown routes.
- `docs/verification/`: source notes for selected published content. `docs/directory-verification.md` and other `docs/*verification*` files also record editorial/document checks.
- `DESIGN.md`: design direction. `AGENTS.md`: binding repository/Lovable guidance.

## Exam behavior represented in code

- Tracks include CPNS, PPPK, school-service (`kedinasan`), and focused TWK/TIU/TKP practice.
- Question objects include an ID, subject, prompt, A–E options, answer, explanation, tip, and difficulty label.
- `rulesForTrack()` currently sets the CPNS demo to 110 questions and 100 minutes; focused TWK/TIU/TKP use 30 questions and 30 minutes; generic demo defaults are 15 questions and 12 minutes. Packages can override composition and duration.
- The CAT experience includes package selection, countdown, question navigation, answer/flag state, local save/restore, completion/results, and history. Confirm each behavior in the current UI and tests before changing it.
- Browser persistence keys are versioned in `src/lib/exam-storage.ts`; changing schema/key behavior can affect users' saved sessions.
- Keep scoring and question data browser-safe and independent of accounts/private backend services. Scoring rules are demo configuration, not a claim about current official passing thresholds.

## Test inventory (existing coverage, not run for this handoff)

Files under `src/test/` cover exam logic/packages, route behavior, content SEO, homepage preview, PPPK hub, guide/practice flows, document tools, selection tools, and study-guide behavior. Check the relevant focused test before changing its feature. Existing test files include `exam.test.ts`, `exam-packages.test.ts`, `app-routing.test.tsx`, `content-seo.test.tsx`, `homepage-preview.test.tsx`, `pppk-hub.test.tsx`, `guide-practice.test.tsx`, `document-tools.test.ts`, `selection-tools.test.ts`, and study-guide tests.

## Operator, domain, SEO, and launch status

- `src/lib/site-config.ts` currently sets canonical origin `https://daftar-cpns.com`, operator `Perawat Center`, and `support@perawatcenter.com`.
- `LAUNCH.md` records those production details as confirmed and describes remaining live launch checks. `AGENTS.md` says to keep canonical metadata relative until the production domain is confirmed; given the confirmation recorded in `LAUNCH.md`, preserve the current constants unless newer user context changes them.
- Launch checks listed in `LAUNCH.md` include checking HTTPS 200 responses for public sitemap URLs, canonical/apex and any `www` redirect, submitting sitemap after Search Console verification, inspecting representative pages/schema, and measuring real Core Web Vitals after deployment.
- Do not treat generated sitemap or local build results as proof of live deployment/indexing. Do not invent Search Console/Bing verification records.
- Recheck `LAUNCH.md`, `public/robots.txt`, `public/sitemap.xml`, `src/lib/site-config.ts`, page metadata, and live sources before publishing SEO/legal changes.

## Repository-specific instructions to preserve

Read `AGENTS.md` before changing code. It states:

- This project is connected to Lovable. Do not rewrite published Git history (force-push, rebase/amend/squash pushed commits); keep the connected branch usable.
- Do not add/edit `supabase/migrations/` or `drizzle/`; ask Lovable to change schema. Do not edit generated files.
- Keep Lovable AI calls on its gateway; never expose `LOVABLE_API_KEY` in browser code. Secrets are managed in Lovable and must not be committed.
- Keep public content/routes and exam demo logic browser-safe where specified by the architecture.
- For UI/copy/mobile/code-comment tasks, follow `antislop.md` and the corresponding instructions in `skills/` as directed by `AGENTS.md`.
- Preserve independent identity, privacy, sourcing, accessibility, and no-fabricated-claims requirements documented in `README.md` and `AGENTS.md`.

## Suggested workflow for the next session

1. Read `AGENTS.md`, `PROJECT_HANDOFF.md`, `roadmap.md`, `LAUNCH.md`, and `DESIGN.md` as relevant.
2. Run `git status --short` and inspect recent commits before editing.
3. Ask/confirm the immediate task only if it cannot be inferred; inspect the relevant route, component, library, content source, and focused test.
4. Treat this document and the old roadmap as orientation, not ground truth. Verify claims against current code and current official sources.
5. Make the smallest useful change, preserve the Lovable branch/history rules, and avoid unnecessary builds/tests/dependency installs.
6. Summarize changes, verification actually performed, and any live/deployment checks that remain.

## Starter prompt for a new ChatGPT/Codex account

> Baca `AGENTS.md`, `PROJECT_HANDOFF.md`, `roadmap.md`, `LAUNCH.md`, dan `DESIGN.md`. Periksa `git status` serta kode/test yang relevan dengan tugas saya. Anggap handoff sebagai ringkasan awal, bukan kebenaran final; validasi status terbaru di repository. Lanjutkan dari proyek yang sudah ada dan jangan mengulang implementasi yang telah tersedia.

# Jehu Lara portfolio

A bilingual personal evidence portfolio built with the official Sites vinext
starter. English is the default language and Spanish is available under `/es`.
The site is local-only at this stage.

## Run and build

Requirements: Node.js 22.13 or newer and the dependencies recorded in
`package-lock.json`.

```bash
npm ci
npm run dev
```

The development server prints the local URL. For a production-equivalent local
build and the rendered-HTML contract checks:

```bash
npm run build
npm test
```

`npm run lint` runs the source lint rules separately. The site uses the starter's
`sites()` Vite plugin and Cloudflare Worker-compatible ESM output. It does not
declare D1, R2, authentication, analytics, a CMS, or a contact backend.

## Content architecture

- `content/profile.ts` contains the public identity, positioning, headline,
  target roles, GitHub, and the authorized LinkedIn profile.
- `content/site-copy.ts` contains complete interface and home-page copy for
  English and Spanish.
- `content/projects.ts` is the project collection and the authority for case
  content, findings, boundaries, evidence, images, and links.
- `content/types.ts` defines the required project contract.
- `components/` renders the same content model across both languages.
- `components/EvidenceGallery.tsx` renders the five-part, keyboard-operable
  evidence presentation without autoplay or a third-party gallery package.
- `app/(en)` and `app/(es)` are thin route wrappers that set the correct document
  language and localized metadata.
- `app/globals.css` owns the visual tokens and responsive system.

## Add a project

Add one `Project` entry to `projects` in `content/projects.ts`. Required fields
are:

- `slug`, `status`, `featured`, `year`;
- localized `title`, `shortSummary`, `projectType`, `audience`, `role`,
  `problem`, `approach`, `validation`, `findings`, and `boundaries`;
- `architecture`, `disciplines`, `technologies`, and `repositoryUrl`;
- `evidenceDate`, `evidenceCommit`, `evidenceDocuments`, `images`,
  `evidencePresentation`, and `links`.

Every reader-facing string uses `{ en, es }`. Add both translations in the same
entry; do not publish a partial locale. Place descriptive image files in
`public/`, record intrinsic width and height, and provide localized short alt
text, a long description, and attribution. The dynamic routes expose a
published entry at `/work/<slug>` and `/es/work/<slug>` without a new page
component.

Set `featured: true` to make a project eligible for the home-page selected-work
slot. Keep only one published project featured at a time. Status values are
`published`, `draft`, or `archived`; only published entries render publicly.

## Claims and evidence

Project claims must be supported by the entry's pinned evidence commit. For
QualityOps, `docs/portfolio-claims.md` at commit
`20046215bfdfbc56b4615f48b314bdd827d086e7` is the final authority. Each numeric
finding must explain what it represents, why it matters, and what it does not
demonstrate. Important boundaries stay visible in the case page; the provenance
disclosure is for source detail, not for hiding warnings.

Before adding or updating a claim:

1. Read the authority document at the recorded commit.
2. Verify every figure against the pinned source.
3. Update the localized finding and its explicit boundary together.
4. Add the consulted document to `evidenceDocuments`.
5. Run `npm run lint` and `npm test`, then review both locale routes.

## Future domain or business identity

Do not add a placeholder domain. Before publication, choose a real domain and
then add canonical URLs, absolute sitemap entries, absolute `hreflang` URLs, and
absolute social-image URLs. A future business identity would require an approved
name, legal/privacy review, new identity content, metadata, and visual tokens.
The project collection and case components can remain unchanged; no dormant
business mode or hidden corporate pages are included now.

## Publication boundary

Deployment, public access, a custom domain, repository push, analytics, and
external service configuration remain blocked until separately authorized.
Before any launch, confirm a professional contact method, the final domain and
canonical strategy, and complete a privacy and content review.

Browser screenshots, visual reflow and zoom inspection, and the editable Canva
carousel are intentionally deferred to Codex Desktop. CLI checks cover rendered
route contracts, source-level interaction hooks, authentic-asset integrity,
contrast tokens, lint, and build; they do not claim browser or user testing.

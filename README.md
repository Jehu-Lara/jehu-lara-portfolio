# Jehu Lara portfolio

Bilingual personal portfolio for **jehulara.dev**, with English at `/` and
Spanish at `/es`. Jehu's current role is **Founder & CEO of Reperta**,
confirmed by him on 30 September 2026. The home page presents Reperta as an
independent studio in development in Monterrey, with public links in both
languages. The technical portfolio presents Manufacturing RAG Assistant, QualityOps,
PARO Live OEE, and DMAIC PCBA. Each case identifies the problem, Jehu's
contribution, supported findings, and evidence limits.

GitHub is the source handoff for Lovable. A repository push and a Lovable
publication are separate steps; this project does not assume that pushing a
commit publishes the custom domain automatically.

## Run and verify

Use Node.js 22.13 or newer and the dependencies in `package-lock.json`:

```sh
npm ci
npm run dev
npm run lint
npm test
```

`npm test` builds the site with vinext and runs the rendered-HTML checks.
`npm run build` is available separately. Browser verification checks the actual
desktop/mobile layout, image fit, localized presentations, keyboard controls,
dialog dismissal, and focus restoration. HTML tests alone do not establish
visual correctness.

The implementation uses React, vinext, the existing Sites Vite plugin and a
Cloudflare-compatible Worker. It declares no D1, R2, authentication, analytics,
CMS or contact backend. Email retains the existing Gmail compose destination.

## Content and presentation

- `content/profile.ts`: confirmed public identity, contact, current focus and
  localized Reperta links, description and stage.
- `content/site-copy.ts`: localized interface and home copy.
- `content/projects.ts`: published collection and localization helpers.
- `content/*-project.ts`: PARO, DMAIC and RAG case content.
- `content/types.ts`: shared project and presentation contracts.
- `components/HomeView.tsx`: current venture followed by four directly visible
  technical project cards; no home carousel.
- `components/EvidenceGallery.tsx`: manual navigation, full-resolution links and
  a keyboard-operable native dialog with previous/next controls.
- `app/globals.css`: visual tokens and responsive layout.
- `public/presentations/`: separate English and Spanish slide exports.

The lightbox fits its image between the controls and caption using the available
viewport height. It preserves image proportions. An authentic screenshot may
retain the application's original language inside a translated slide.
DMAIC retains its original English slides with localized titles, captions and
case text; PARO and RAG have separate translated slide exports.

## Add or update a case

Add a `Project` with `status: "published"` to the collection. Both languages are
required. Home and archive read the published collection. Dynamic routes expose
`/work/<slug>` and `/es/work/<slug>`. Home places Manufacturing RAG first.

Place assets in `public/`, record intrinsic dimensions and localized alt text,
and provide a description and attribution. Slide exports use 1920×1080;
thumbnail assets use their recorded intrinsic dimensions. PARO's public slug is
`paro-live-oee-platform` and its slide directory is `paro`.

Every quantitative statement must remain traceable to its recorded evidence
commit or report. Retain synthetic-data disclosures, evidence dates and
unsuccessful results. RAG's retrieval and historical generation metrics describe
different evaluation profiles and must not be combined into one accuracy claim.
Do not add employers, education, certificates, industrial use or business
outcomes without confirmed evidence.

## Design rationale and profile inputs

See [the literature and design decisions](docs/portfolio-literature.md) for
engineering-portfolio guidance, usability sources, and useful profile fields.
See [Reperta positioning and benchmarks](docs/reperta-positioning.md) for the
founder identity, selected studio comparisons, evidence limits and the social
card prompt. Reperta is a current initiative with its own public site, not a
fifth completed technical case. It does not inherit technical-project metrics
or imply demonstrated revenue, customers, or market validation.
Education, certifications, work history and a downloadable CV remain optional
until Jehu supplies accurate public details. No empty placeholder sections are
shown to visitors.

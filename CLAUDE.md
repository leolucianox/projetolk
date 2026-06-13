# CLAUDE.md

Guidance for working in this repository.

## Project

Portfolio site for **Larissa Wand** — a Brazilian tattoo artist (6+ years) now
living in **Galway, Ireland**, where she works at *Victor Tattoo and Body
Piercing*. She is also an **ocean & freediving photographer**. The site shows her
tattoo work, her photography, an about/bio page and a booking flow (appointments
by Instagram DM, plus walk-ins). Tagline: *"Where ink meets water."*

The codebase started as a generic template (the old fictional brand was "Mira
Vale"); it has been fully rebranded to Larissa Wand. If you find any leftover
"Mira Vale"/"Lisbon" references, they are stale and should be updated.

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`; config-less, see `app/globals.css`)
- **Framer Motion** for animation
- **lucide-react** for icons
- Fonts: **Manrope** (Google) for body, **Baby Doll** (local, `fonts/babydoll/`) for display titles
- **Lenis** for smooth scrolling + gentle section snapping (see `components/smooth-scroll.tsx`)
- `playwright` is a devDependency, used only for ad-hoc screenshot verification

## Commands

```bash
npm run dev     # dev server (next dev) — falls back to port 3001 if 3000 is taken
npm run build   # production build (run this to catch type/lint errors)
npm run start   # serve the production build
npm run lint    # next lint
```

This is a Windows environment; the Bash tool runs Git Bash. `node_modules` was
copied in, so dependencies are already installed.

## Architecture — read this first

**Almost all user-facing content lives in one file: `lib/data.ts`.** This is the
single source of truth. Components are presentational and pull their copy/images
from it via the i18n hook. To change text, images, tattoo pieces, travel cities,
process steps, etc. — edit `lib/data.ts`, **not** the components.

- `lib/data.ts`
  - `getContent(lang)` returns the entire localized content tree (hero, styles,
    work, lens, studio/about, travels, process, booking, footer, nav).
  - `brand` holds language-independent facts (name, instagram, contact).
  - Helper `p(lang, pt, en)` picks a string by language; `work()`, `photo()`,
    `city()` build localized records.
  - Image helper `F(category, file)` → `/fotos/<category>/<file>.png`. Named
    constants (`HORSE_A`, `SUN_B`, `DIVER_HALO`, …) map the real photos to where
    they are used.
- `lib/i18n.tsx` — `LanguageProvider`, `useLang()`, `useContent()`. **Default
  language is PT**; EN toggles via `LangToggle`. Preference persists in
  `localStorage` under `lw-lang`.
- `lib/cn.ts` — `clsx`-style className joiner.

### Pages (App Router)

- `app/page.tsx` — home: `Hero → TattooStyles → SelectedWork → Lens → About → Process → Booking → Footer`
- `app/sobre/page.tsx` — `/sobre`: `PageHero → About(full) → Travels → Booking → Footer`
- `app/trabalhos/page.tsx` — `/trabalhos`: `PageHero → WorkGallery → PhotoStrip → Booking → Footer`
- `app/layout.tsx` — fonts, `LanguageProvider`, site metadata

### Components

- `components/sections/*` — page sections (hero, tattoo-styles, selected-work,
  lens, about, travels, process, booking, footer, page-hero, photo-strip,
  work-gallery). All consume `useContent()`.
- `components/ui/*` — reusable primitives:
  - `placeholder.tsx` — renders an `<img>` with a toned fallback block. **All
    images go through this.** It uses a plain `<img>` (not `next/image`).
  - `auto-slider.tsx` — seamless infinite marquee. Renders the slide set in
    `COPIES` (4) identical groups and translates one group width per cycle, so
    the viewport never shows a blank gap (covers ultrawide/4K). Used by Hero and
    Booking.
  - `slide-card`, `marquee`, `lightbox`, `roll-text`, `lang-toggle`,
    `arrow-button`, `auto-slider`.
- `components/brand.tsx` — `Wordmark` (text logo), reads `brand.name`.
- `components/navbar.tsx` — `fixed` bar that hides on scroll-down and slides
  back in on scroll-up (uses `window` scroll events; works with Lenis).
- `components/smooth-scroll.tsx` — wraps the app in Lenis (`ReactLenis root`) for
  smooth scrolling + smooth anchor links, and a proximity `Snap` that gently
  centres every `.snap-section` / `.snap-section-center` element. Native CSS
  scroll-snap / `scroll-behavior` are intentionally off (they'd fight Lenis).
- `hooks/*`.

### Images

Real photos live in **`public/fotos/`** (served as `/fotos/...`):

- `public/fotos/tatuagens/` — tattoo work (horse, sun, fairy, "The Death" tarot)
- `public/fotos/pessoais/` — portraits / studio shots of Larissa
- `public/fotos/viagens/` — ocean & travel photography (freediving, marine life, Galway, Frankfurt, Hawaii, Mo'orea)

Source/reference material (originals + extracted captions) is in `refs/` — that
folder is reference only and is not served.

Each image reference in `lib/data.ts` also carries a `tone` (a dominant hex
colour) used as the placeholder background before the photo loads.

## Conventions

- Bilingual PT/EN: every user-facing string must be provided in both languages
  in `lib/data.ts` (use `p()` or the `lang === "pt" ? … : …` pattern).
- Display titles use the Baby Doll face via the `title-large` / `title-display`
  utility classes (see `app/globals.css`); tattoo-style row names deliberately
  stay on Manrope.
- Don't hardcode copy in components — add it to `lib/data.ts`.
- Contact details in `brand` (email, the Google-Maps "whatsapp" slot) are
  placeholders pending real info — confirm before treating them as real.

# AHA Office — Complete Website Analysis

> **Project**: AHA Office (مكتب عبد الرؤوف حسّان)
> **Type**: Single-page corporate landing site for a professional accounting & auditing firm
> **Language**: Arabic (RTL) | **Location**: Sana'a, Yemen
> **Affiliation**: Member of Talal Abu-Ghazaleh International (TAG-Audit)
> **Founded**: 1996

---

## 1. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | 19.2.5 |
| **Bundler** | Vite | 5.4.10 |
| **Language** | TypeScript | ~6.0.2 |
| **Styling** | Tailwind CSS | 3.4.1 |
| **Animation** | Framer Motion | 12.38.0 |
| **3D Graphics** | Three.js + React Three Fiber + Drei | 0.184 / 9.6 / 10.7 |
| **Smooth Scroll** | Lenis | 1.3.23 |
| **Icons** | Lucide React | 1.8.0 |
| **Forms** | React Hook Form + Zod | 7.72 / 4.3 |
| **Utilities** | clsx + tailwind-merge | 2.1 / 3.5 |
| **UI Primitives** | Headless UI | 2.2.10 |
| **Animation (alt)** | GSAP | 3.15 (installed, not actively used) |

### Build & Deploy

- **Base path**: `/AHA2/` (configured in `vite.config.ts`, likely GitHub Pages deployment)
- **Path alias**: `@/` → `./src/`
- **PostCSS**: Tailwind + Autoprefixer
- **Dev server**: `npm run dev` (Vite HMR)

---

## 2. Brand Identity & Design System

### Color Palette

| Token | Hex | Role |
|-------|-----|------|
| `background` | `#FAF9F6` | Page background — warm off-white |
| `surface` | `#FFFFFF` | Cards, panels, navbar on scroll |
| `primary` | `#3D2F2F` | Headings, body text — deep coffee brown |
| `accent` | `#B89B58` | CTA, highlights, links — metallic gold |
| `textPrimary` | `#1A1A1A` | High-contrast body text |
| `textMuted` | `#6B6B6B` | Secondary text, descriptions |
| Gradient end | `#8A733F` | Darker gold for text gradients |
| Gradient end | `#D4B572` | Lighter gold for button gradients |
| WhatsApp | `#25D366` | Floating chat button |

**CSS Variables** (`:root`): `--background`, `--foreground`, `--primary`, `--accent`

### Typography

| Role | Family | Weight |
|------|--------|--------|
| Body (`font-sans`) | Noto Sans Arabic | 300, 400, 600, 700 |
| Headings (`font-serif`) | Noto Serif Arabic | 700 |

Both loaded via Google Fonts with `preconnect`.

### Visual Language

- **"Light Luxury"** aesthetic — warm whites, gold accents, glass-morphism cards
- **Glass cards**: `bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-black/5`
- **Text gradient**: Gold-to-dark-gold at 135° on key headings
- **Noise texture overlay**: Full-page SVG fractal noise at 3% opacity
- **Custom scrollbar**: 6px width, gold thumb on warm track
- **Glow elements**: Large blurred accent circles as ambient background orbs

---

## 3. Architecture & File Map

```
aha-office/
├── index.html                    # RTL Arabic entry, Google Fonts
├── package.json
├── vite.config.ts                # base: /AHA2/, @/ alias
├── tailwind.config.js            # Custom colors, fonts, animations
├── postcss.config.js
├── tsconfig.app.json             # @/* path alias
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.tsx                  # StrictMode + App mount
    ├── App.tsx                   # Layout shell + Lenis smooth scroll
    ├── index.css                 # Tailwind layers, glass utilities, scrollbar
    ├── App.css                   # Legacy/unused Vite scaffold styles
    ├── lib/
    │   └── utils.ts              # cn() — clsx + twMerge helper
    ├── data/
    │   └── content.ts            # All site content (Arabic text, data arrays)
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx         # Fixed header + mobile drawer + WhatsApp FAB
    │   │   └── Footer.tsx         # 3-column footer
    │   ├── sections/
    │   │   ├── Hero.tsx           # Full-screen hero with 3D particles + parallax
    │   │   ├── HeroSection.tsx    # Alternate hero (Antigravity background, English)
    │   │   ├── StatsBar.tsx       # Animated counter strip
    │   │   ├── About.tsx          # Company intro + vision/excellence cards
    │   │   ├── TagAffiliation.tsx # TAG Global network timeline
    │   │   ├── Services.tsx       # 6 service cards + modal detail view
    │   │   ├── Sectors.tsx        # 9 industry sector icon grid
    │   │   ├── WhyUs.tsx          # 7 value proposition cards
    │   │   └── Contact.tsx        # Contact info + form
    │   ├── shared/
    │   │   └── AnimatedCounter.tsx # Scroll-triggered count-up
    │   └── three/
    │       └── ParticleField.tsx  # WebGL particle system (1500 particles)
    └── assets/
        ├── hero.png
        ├── react.svg
        └── vite.svg
```

---

## 4. Page Flow (Section Order)

The site is a single-page app with 8 sections rendered sequentially in `App.tsx`:

| # | Section | ID | Background | Purpose |
|---|---------|-----|-----------|---------|
| 1 | **Hero** | `#hero` | `bg-background` | Full-viewport, 3D particles, firm name, tagline, 2 CTAs |
| 2 | **StatsBar** | — | `bg-surface` | 4 animated counters (100+ offices, 1972, 200M+ users, 5M sq mi) |
| 3 | **About** | `#about` | `bg-background` | Founding story, year card (١٩٩٦), vision & excellence |
| 4 | **TAG Affiliation** | — | `bg-surface` | Timeline showing TAG Global network (1972 → 100+ offices) |
| 5 | **Services** | `#services` | `bg-surface` | 6 professional service cards with expandable modal |
| 6 | **Sectors** | `#sectors` | `bg-background` | 9 industry sectors with Lucide icons |
| 7 | **Why Us** | `#why-us` | `bg-surface` | 7 competitive advantage cards |
| 8 | **Contact** | `#contact` | `bg-surface` | Contact details + form (name, email, phone, message) |

**Navigation links**: الرئيسية, من نحن, خدماتنا, القطاعات, اتصل بنا

---

## 5. Component Details

### 5.1 Navbar (`layout/Navbar.tsx`)

- **Fixed positioning**, transparent → frosted glass on scroll (50px threshold)
- **Logo**: "AHA Office" text in serif, gradient primary → accent on hover
- **Desktop nav**: 5 links with gold underline hover effect, staggered entrance animation
- **Mobile nav**: Full-screen slide-in drawer (spring animation), staggered link reveals
- **WhatsApp FAB**: Fixed bottom-left, green with ping animation pulse

### 5.2 Hero (`sections/Hero.tsx`)

- **Full viewport** (`h-[100dvh]`) with perspective container
- **3D Background**: React Three Fiber `<Canvas>` with lazy-loaded `ParticleField`
  - 1500 gold particles (`#C4A35A`), additive blending, mouse-reactive rotation
- **Parallax**: `useScroll` + `useTransform` — background moves at 0.3x, content at 0.15x, both fade on scroll
- **Content**: Affiliation badge → firm name (with gradient) → tagline → 2 CTA buttons
- **CTAs**: 3D hover tilt (`rotateX/Y`), light-sweep overlay on primary button
- **Scroll indicator**: Animated pill at bottom

### 5.3 StatsBar (`sections/StatsBar.tsx`)

- 4-column grid with dividers
- Uses `AnimatedCounter` — counts up over 2 seconds when scrolled into view
- Stats: 100+ offices, 1972 founding, 200M+ beneficiaries, 5M sq mi coverage

### 5.4 About (`sections/About.tsx`)

- 2-column layout: visual card (left) + text content (right)
- **Year card**: Large "١٩٩٦" with gold gradient, floating animation, 3D hover tilt, decorative rotating border ring
- **Vision & Excellence**: Two glass-card sub-cards with 3D hover effects and inline SVG icons

### 5.5 TAG Affiliation (`sections/TagAffiliation.tsx`)

- Description of Talal Abu-Ghazaleh Global network
- Animated timeline bar (scales from right-to-left) with pulsing milestone dots
- Decorative abstract SVG world map in background at 5% opacity

### 5.6 Services (`sections/Services.tsx`)

- **6 services** in 3-column grid, each a clickable glass-card
- 3D entrance animation (`rotateX: 10° → 0°`), 3D hover tilt, gradient overlay
- Numbered icon badges with rotation effect on hover
- **Modal dialog**: `AnimatePresence`-powered detail view with spring animation, backdrop blur

#### Services Listed:
1. التدقيق الخارجي (External Audit)
2. التدقيق الداخلي (Internal Audit)
3. خدمات مالية أخرى (Other Financial Services)
4. خدمات الحوكمة (Governance Services)
5. الاستشارات المالية والاقتصادية (Financial & Economic Consulting)
6. خدمات الزكاة والضرائب (Zakat & Tax Services)

### 5.7 Sectors (`sections/Sectors.tsx`)

- **9 sectors** in 5-column grid, dynamic Lucide icons from data
- 3D hover tilt with elevation shadow, gradient overlay on hover

#### Sectors: Education/Health, Commercial, International Orgs, Industrial, Tech/Telecom, Transport/Shipping, Travel/Tourism, Intellectual Institutions, Insurance

### 5.8 Why Us (`sections/WhyUs.tsx`)

- **7 values** in responsive 4-column grid
- CheckCircle2 icon badges with 3D lift + rotation on hover
- Staggered scroll-triggered entrance

#### Values: Intellectual Methodology, Standards Application, Innovation, Continuous Learning, Leadership, Collaboration, Responsibility

### 5.9 Contact (`sections/Contact.tsx`)

- 2-column: info panel (left) + form (right)
- Info items: Location, Email, Phone (3 numbers), Working Hours — each with Lucide icons
- Form: 4 fields (name, email, phone, message) + gradient submit button
- **No backend** — `onSubmit` calls `e.preventDefault()`

### 5.10 Footer (`layout/Footer.tsx`)

- 3-column: brand name + affiliation, navigation links, social icons (email + WhatsApp)
- Gold gradient line at top, copyright at bottom

---

## 6. Animation System

### Framer Motion Patterns

| Pattern | Where Used | Config |
|---------|-----------|--------|
| **Staggered reveal** | Hero content, nav links | `staggerChildren: 0.1–0.15` |
| **Scroll-triggered** | All sections | `whileInView` + `viewport: { once: true }` |
| **3D hover tilt** | All cards, buttons | `rotateX: 3-5°`, `rotateY: ±5°`, `z: 20-30` |
| **Parallax scroll** | Hero background/content | `useScroll` + `useTransform` |
| **Spring animations** | Mobile menu, service modal | `type: "spring", damping: 25` |
| **Press feedback** | Buttons, cards | `whileTap: { scale: 0.95-0.98 }` |

### CSS/Tailwind Animations

| Name | Duration | Effect |
|------|----------|--------|
| `float` | 6s infinite | `translateY(0 → -20px → 0)` |
| `float-delayed` | 6s, 3s delay | Same with offset |
| `spin-slow` | 15s linear | Continuous rotation |
| `pulse-glow` | 3s | Opacity + blur pulsation |

### Easing

- Primary curve: `[0.16, 1, 0.3, 1]` — aggressive ease-out for premium feel
- Entry durations: 0.5–1.0s
- Hover transitions: 300–500ms via Tailwind `duration-300/500`

---

## 7. Performance Optimizations

| Technique | Implementation |
|-----------|---------------|
| **Lazy loading** | `ParticleField` via `React.lazy()` |
| **content-visibility** | `.content-vis-auto` on all sections below the fold |
| **contain-intrinsic-size** | `1px 1000px` to stabilize layout during lazy rendering |
| **Smooth scrolling** | Lenis (not CSS `scroll-behavior`) with custom easing |
| **GPU acceleration** | All animations use `transform`/`opacity` only |
| **Font strategy** | `preconnect` to Google Fonts, only 4 weights loaded |
| **Viewport margin** | `whileInView margin: "-50px" to "-100px"` for early trigger |
| **Once-only** | `viewport: { once: true }` prevents re-animation on scroll back |

---

## 8. Contact & Business Data

```
Firm:     مكتب عبد الرؤوف حسّان (AHA Office)
Address:  صنعاء، شارع الزبيري، عمارة اسحاق
P.O. Box: ٢١١٦ صنعاء، اليمن
Email:    aalazee@tagi.com
Phones:   00967771377779 | +967-1-240951 | +967-1-500754
WhatsApp: +60173740140
Hours:    Saturday–Thursday, 8:00 AM – 2:00 PM
```

---

## 9. Unused / Legacy Files

| File | Status |
|------|--------|
| `src/App.css` | Vite scaffold boilerplate — **not used** by any component |
| `src/assets/react.svg`, `vite.svg` | Default Vite assets — **not used** |
| `src/components/sections/HeroSection.tsx` | Alternate English hero with Antigravity — **not imported** in `App.tsx` |
| `gsap` (package) | Installed but **not imported** anywhere |
| `@headlessui/react` | Installed but **not imported** anywhere |
| `@hookform/resolvers`, `react-hook-form`, `zod` | Installed but the contact form uses plain HTML — **not imported** |

---

## 10. Identified Issues & Recommendations

> [!WARNING]
> ### Issues Found

1. **No form validation** — Contact form has no client-side validation despite having `react-hook-form` + `zod` installed
2. **No form submission** — `onSubmit` just calls `preventDefault()` with no backend/API
3. **WhatsApp number mismatch** — FAB links to Malaysian number (`+60`), contact shows Yemeni numbers (`+967`)
4. **Copyright year hardcoded** — Shows "© 2024" statically
5. **No `<meta description>`** in `index.html` — hurts SEO
6. **No favicon link tag** — `public/favicon.svg` exists but isn't referenced in HTML
7. **Unused dependencies** — GSAP, Headless UI, React Hook Form, Zod add ~150KB+ to bundle without being used
8. **`App.css` dead code** — 185 lines of unused Vite scaffold styles
9. **No `prefers-reduced-motion` handling** — 3D animations and parallax ignore accessibility preference
10. **Service modal lacks `role="dialog"`** and focus trapping for accessibility

> [!TIP]
> ### Quick Wins

- Wire up `react-hook-form` + `zod` for the contact form
- Add `<meta name="description">` and `<link rel="icon">` to `index.html`
- Remove unused packages (`gsap`, `@headlessui/react`) to reduce bundle
- Delete `App.css` and unused assets
- Add `@media (prefers-reduced-motion: reduce)` to disable parallax/3D effects
- Make copyright year dynamic: `new Date().getFullYear()`

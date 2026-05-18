# AHA Office Design System & Guidelines

> **Project**: AHA Office (مكتب عبد الرؤوف حسّان)
> **Aesthetic Theme**: "Light Luxury" (الفخامة الهادئة)
> **Goal**: Communicate trust, excellence, and modernization through a premium, responsive web presence.

---

## 1. Design Philosophy

The AHA Office website employs a **"Light Luxury"** aesthetic. This design language moves away from stark, traditional corporate layouts in favor of a warm, sophisticated, and engaging user experience. 

**Core Principles:**
- **Warmth & Trust:** Utilizing warm off-whites and rich coffee browns to establish a sense of history and reliability.
- **Elegance:** Gold accents, subtle gradients, and glassmorphism create a high-end, polished feel.
- **Dynamism:** Utilizing 3D motion, smooth scrolling, and micro-interactions to make the interface feel alive and responsive.
- **Accessibility:** Ensuring high contrast and legible typography for an Arabic-first audience.

---

## 2. Color Palette

The color system is semantic and token-based, configured via Tailwind CSS (`tailwind.config.js`).

### Base Colors
- **Background** (`#FAF9F6`): Warm off-white. Used as the foundational canvas for the site.
- **Surface** (`#FFFFFF`): Pure white. Used for cards, elevated panels, and the scrolled state of the navbar.
- **Primary** (`#3D2F2F`): Deep coffee brown. Used for main headings, critical UI elements, and strong brand presence.
- **Accent** (`#B89B58`): Metallic gold. Used for calls to action (CTAs), highlights, links, and 3D particle effects.

### Text Colors
- **Text Primary** (`#1A1A1A`): High-contrast near-black for optimal legibility in body text.
- **Text Muted** (`#6B6B6B`): Soft grey for secondary text, metadata, and descriptions.

### Gradients
- **Text Gradients**: Linear gold-to-dark-gold (`#B89B58` to `#8A733F`) at a 135° angle, applied to key headings and numerals (e.g., the "١٩٩٦" year card).
- **Button Gradients**: Subtle gold gradients with a lighter end (`#D4B572`) to create depth and affordance.

---

## 3. Typography

The typography is optimized for Right-to-Left (RTL) Arabic reading, utilizing Google Fonts.

- **Body (Sans-Serif)**: `Noto Sans Arabic` (Weights: 300, 400, 600, 700). Used for paragraphs, UI text, and data display. Clean and modern.
- **Headings (Serif)**: `Noto Serif Arabic` (Weight: 700). Used for the logo, section titles, and major focal points. Conveys authority and tradition.

---

## 4. UI Components & Styling Patterns

### Glassmorphism (Glass Cards)
Used extensively for content containment (Services, Why Us, About sub-cards).
- **Technique**: Semi-transparent white gradient (`bg-gradient-to-br from-white/80 to-white/40`), heavy backdrop blur (`backdrop-blur-xl`), and a subtle border (`border-black/5`).
- **Effect**: Allows background elements (like animated orbs or parallax textures) to bleed through softly.

### Iconography
- **Library**: `lucide-react`
- **Style**: Line-based, consistent stroke weights. Icons are often paired with gold accent backgrounds or subtle 3D hover effects.

### Ambient Elements
- **Noise Texture**: A full-page SVG fractal noise overlay at 3% opacity adds a tactile, premium, paper-like feel to the background.
- **Glow Orbs**: Large, heavily blurred, low-opacity geometric shapes (`pulse-glow` animation) acting as ambient lighting in the background.

---

## 5. Animation & Motion Strategy

The site uses `framer-motion`, `lenis` for smooth scrolling, and `three.js` for 3D elements.

### Scroll & Entrance
- **Smooth Scroll**: Lenis provides a buttery-smooth scrolling experience.
- **Staggered Reveals**: Children elements within a section load sequentially with a 0.1s to 0.15s delay.
- **Scroll-Triggered Entry**: Elements animate into view (`whileInView`) using an aggressive ease-out curve (`[0.16, 1, 0.3, 1]`) once they enter the viewport.

### 3D & Micro-interactions
- **3D Particle Field**: The Hero section features 1,500 additive-blending gold particles that react to mouse movement via React Three Fiber.
- **3D Hover Tilts**: Cards and buttons utilize subtle 3D rotations (`rotateX`, `rotateY`) and depth (`z-index` lifts) on hover to create a tactile feel.
- **Press States**: Interactive elements scale down slightly (`scale: 0.95`) on tap/click.

---

## 6. Layout & Composition

The layout is a continuous single-page flow structured to build narrative trust:

1. **Hero**: Full viewport (`100dvh`). Immersive 3D background, strong value proposition, and primary CTAs. Parallax scrolling creates depth.
2. **StatsBar**: Animated count-ups establishing scale (100+ offices, 1972 founding).
3. **About**: Asymmetric 2-column layout. Visual "year card" (١٩٩٦) on the right (in RTL), text/vision on the left.
4. **TAG Affiliation**: Horizontal timeline visualizing global reach.
5. **Services**: 3-column glass card grid. Clicks open a modal dialog with a spring animation.
6. **Sectors**: Dense 5-column grid focusing on iconography.
7. **Why Us**: 4-column value proposition grid with staggered reveals.
8. **Contact**: 2-column layout balancing static contact information with an interactive form.

---

## 7. Performance Guidelines

To maintain the "premium" feel, performance is treated as a design requirement:
- **Lazy Loading**: The heavy 3D canvas (`ParticleField`) is dynamically imported.
- **Rendering Optimizations**: Sections below the fold use `content-visibility: auto` to defer rendering.
- **Hardware Acceleration**: Animations strictly use `transform` and `opacity` properties to prevent layout trashing.

# 3D Upgrade — Integration Guide

## 1. Install new dependency

```bash
npm install @react-three/postprocessing
```

---

## 2. Hero.tsx — swap ParticleField for HeroScene

Remove the lazy import of `ParticleField` and its surrounding `<Canvas>`.
Replace with a single import and render:

```tsx
// REMOVE these:
// const ParticleField = lazy(() => import('@/components/three/ParticleField'))
// ... and the <Canvas> block wrapping it

// ADD:
import { HeroScene } from '@/components/three/HeroScene'

// Inside Hero's JSX, where the Canvas was:
<HeroScene />
```

`HeroScene` contains its own `<Canvas>`, so the surrounding canvas wrapper is gone.

---

## 3. About.tsx — replace the year card visual

Find the visual column (the left panel with the year card div).
Replace the year card's inner content with `AboutSculpture` + an overlay for the year text:

```tsx
import { lazy, Suspense } from 'react'
const AboutSculpture = lazy(() =>
  import('@/components/three/AboutSculpture').then(m => ({ default: m.AboutSculpture }))
)

// Replace the year card JSX with:
<div className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden">
  <Suspense fallback={<div className="w-full h-full bg-[#FAF9F6]" />}>
    <AboutSculpture />
  </Suspense>

  {/* Keep your existing year text overlay */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <span
      className="font-serif text-8xl font-bold select-none"
      style={{
        background: 'linear-gradient(135deg, #B89B58, #8A733F)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 0 24px rgba(184,155,88,0.6))',
      }}
    >
      ١٩٩٦
    </span>
  </div>
</div>
```

---

## 4. Services.tsx — add 3D icons to service cards

```tsx
import { useState } from 'react'
import { ServiceIcon3D } from '@/components/three/ServiceIcon3D'

// Inside Services component:
const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

// On each service card wrapper:
<div
  key={i}
  onMouseEnter={() => setHoveredIdx(i)}
  onMouseLeave={() => setHoveredIdx(null)}
  // ...your existing card classes
>
  {/* Replace the numbered badge with: */}
  <ServiceIcon3D index={i} isHovered={hoveredIdx === i} size={72} />

  {/* Keep the rest of the card content unchanged */}
  <h3>{service.title}</h3>
  <p>{service.description}</p>
</div>
```

---

## 5. Performance notes

| Concern | Mitigation |
|---------|-----------|
| 6 WebGL contexts (service cards) | Modern browsers allow 16+. Cards are below fold; contexts init lazily. |
| Mobile devices | Set `dpr={[1, 1]}` in mobile breakpoints, or hide ServiceIcon3D on small screens and show a CSS icon instead. |
| `prefers-reduced-motion` | Wrap `useFrame` rotations in a check: `if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return` |
| Bundle size | `@react-three/postprocessing` adds ~80KB gzipped. Consider code-splitting if needed. |

---

## 6. File placement

```
src/components/three/
├── HeroScene.tsx         ← new (replaces ParticleField.tsx usage)
├── AboutSculpture.tsx    ← new
├── ServiceIcon3D.tsx     ← new
└── ParticleField.tsx     ← can be deleted after Hero.tsx is updated
```

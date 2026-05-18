// src/components/three/ServiceIcon3D.tsx
// Mini 3D metallic icon for each service card.
// Each card gets a unique geometry that reacts to hover.
//
// INTEGRATION — in Services.tsx:
//   1. Add `const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)` state
//   2. On each service card div:
//        onMouseEnter={() => setHoveredIdx(i)}
//        onMouseLeave={() => setHoveredIdx(null)}
//   3. Replace the numbered icon badge with:
//        <ServiceIcon3D index={i} isHovered={hoveredIdx === i} />
//
// Service index → geometry mapping:
//   0  التدقيق الخارجي      (External Audit)         → Icosahedron   (precision, symmetry)
//   1  التدقيق الداخلي      (Internal Audit)         → Torus         (continuous inspection)
//   2  خدمات مالية أخرى    (Other Financial)        → Dodecahedron  (complexity, facets)
//   3  خدمات الحوكمة        (Governance)             → Octahedron    (balanced structure)
//   4  استشارات مالية       (Financial Consulting)   → Tetrahedron   (direction, growth)
//   5  خدمات الزكاة والضرائب (Zakat & Tax)           → Torus Knot    (interlocking rules)

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─── Per-service configuration ────────────────────────────────────────────────
const SERVICE_CONFIGS = [
  { type: 'icosahedron',  args: [0.85, 1],         color: '#C4A35A', emissive: '#8A733F', speed: 0.55 },
  { type: 'torus',        args: [0.6, 0.22, 16, 50], color: '#B89B58', emissive: '#7A6330', speed: 0.70 },
  { type: 'dodecahedron', args: [0.82, 0],          color: '#D4B572', emissive: '#9A7840', speed: 0.50 },
  { type: 'octahedron',   args: [0.88, 0],          color: '#B89B58', emissive: '#8A733F', speed: 0.65 },
  { type: 'tetrahedron',  args: [0.95, 0],          color: '#C4A35A', emissive: '#8A733F', speed: 0.80 },
  { type: 'torusKnot',    args: [0.5, 0.15, 100, 16, 2, 3], color: '#D4B572', emissive: '#9A7840', speed: 0.45 },
] as const

type ServiceConfig = typeof SERVICE_CONFIGS[number]

// ─── Geometry factory ─────────────────────────────────────────────────────────
function ServiceGeometry({ config }: { config: ServiceConfig }) {
  switch (config.type) {
    case 'icosahedron':
      return <icosahedronGeometry  args={config.args as [number, number]} />
    case 'torus':
      return <torusGeometry        args={config.args as [number, number, number, number]} />
    case 'dodecahedron':
      return <dodecahedronGeometry args={config.args as [number, number]} />
    case 'octahedron':
      return <octahedronGeometry   args={config.args as [number, number]} />
    case 'tetrahedron':
      return <tetrahedronGeometry  args={config.args as [number, number]} />
    case 'torusKnot':
      return <torusKnotGeometry    args={config.args as [number, number, number, number, number, number]} />
    default:
      return <octahedronGeometry   args={[0.85, 0]} />
  }
}

// ─── Animated mesh ────────────────────────────────────────────────────────────
function ServiceMesh({
  index,
  isHovered,
}: {
  index: number
  isHovered: boolean
}) {
  const ref   = useRef<THREE.Mesh>(null)
  const config = SERVICE_CONFIGS[index % SERVICE_CONFIGS.length]

  useFrame((state) => {
    if (!ref.current) return
    const speed = config.speed * (isHovered ? 2.6 : 1.0)
    const t     = state.clock.elapsedTime

    ref.current.rotation.y = t * speed * 0.6
    ref.current.rotation.x = t * speed * 0.28

    // Smooth scale pulse on hover
    const target = isHovered ? 1.22 : 1.0
    ref.current.scale.setScalar(
      THREE.MathUtils.lerp(ref.current.scale.x, target, 0.12)
    )
  })

  return (
    <mesh ref={ref}>
      <ServiceGeometry config={config} />
      <meshStandardMaterial
        color={config.color}
        metalness={1}
        roughness={0}
        envMapIntensity={isHovered ? 3.5 : 1.8}
        emissive={config.emissive}
        emissiveIntensity={isHovered ? 0.9 : 0.35}
      />
    </mesh>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function IconScene({
  index,
  isHovered,
}: {
  index: number
  isHovered: boolean
}) {
  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.25} />
      <pointLight
        position={[3, 3, 3]}
        intensity={isHovered ? 3.5 : 1.8}
        color="#D4B572"
      />
      <pointLight
        position={[-2, -2, -2]}
        intensity={0.4}
        color="#3D2F2F"
      />

      <ServiceMesh index={index} isHovered={isHovered} />

      <EffectComposer>
        <Bloom
          intensity={isHovered ? 3.0 : 1.2}
          luminanceThreshold={0.38}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.9}
        />
      </EffectComposer>
    </>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────
interface ServiceIcon3DProps {
  /** 0-based index matching the services array in content.ts */
  index: number
  /** Pass true while the parent card is hovered */
  isHovered: boolean
  /** Icon container size in px (default 72) */
  size?: number
}

export function ServiceIcon3D({
  index,
  isHovered,
  size = 72,
}: ServiceIcon3DProps) {
  return (
    <div
      style={{ width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 2.8], fov: 42 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          <IconScene index={index} isHovered={isHovered} />
        </Suspense>
      </Canvas>
    </div>
  )
}

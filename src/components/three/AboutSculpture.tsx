// src/components/three/AboutSculpture.tsx
// 3D architectural sculpture for the About section visual column.
//
// INTEGRATION — in About.tsx, replace the year card div with:
//
//   <div className="relative w-full aspect-square max-w-sm mx-auto">
//     <AboutSculpture />
//     {/* Year overlay — keep your existing year text on top */}
//     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//       <span className="font-serif text-7xl font-bold bg-gradient-to-br
//                        from-[#B89B58] to-[#8A733F] bg-clip-text text-transparent
//                        drop-shadow-2xl select-none">
//         ١٩٩٦
//       </span>
//     </div>
//   </div>

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshTransmissionMaterial,
  Environment,
  Sparkles,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─── Brand palette ────────────────────────────────────────────────────────────
const GOLD        = '#C4A35A'
const GOLD_LIGHT  = '#D4B572'
const GOLD_DARK   = '#8A733F'

// ─── Outer geodesic wireframe shell ───────────────────────────────────────────
function GeodesicShell() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.14
    ref.current.rotation.x = state.clock.elapsedTime * 0.05
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.85, 1]} />
      <meshStandardMaterial
        color={GOLD}
        metalness={0.9}
        roughness={0.1}
        wireframe
        emissive={GOLD_DARK}
        emissiveIntensity={0.55}
      />
    </mesh>
  )
}

// ─── Inner glass core ─────────────────────────────────────────────────────────
function GlassCore() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = -state.clock.elapsedTime * 0.09
    ref.current.rotation.z =  state.clock.elapsedTime * 0.03
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.25, 2]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.9}
        roughness={0.04}
        chromaticAberration={0.06}
        anisotropy={0.35}
        distortion={0.22}
        distortionScale={0.18}
        temporalDistortion={0.12}
        color={GOLD}
        transmission={0.95}
        transparent
        envMapIntensity={2}
      />
    </mesh>
  )
}

// ─── Orbiting satellite gem ───────────────────────────────────────────────────
function Satellite({ phase, radius }: { phase: number; radius: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * 0.42 + phase
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.y = Math.sin(t * 0.65) * radius * 0.45
    ref.current.position.z = Math.sin(t) * radius
    ref.current.rotation.y = t * 2.2
  })

  return (
    <group ref={ref}>
      <mesh scale={0.09}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={GOLD_LIGHT}
          metalness={1}
          roughness={0}
          emissive={GOLD}
          emissiveIntensity={0.7}
        />
      </mesh>
    </group>
  )
}

// ─── Thin orbit ring ─────────────────────────────────────────────────────────
function OrbitRing({ radius, tiltX }: { radius: number; tiltX: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.z = state.clock.elapsedTime * 0.06
  })

  return (
    <mesh ref={ref} rotation={[tiltX, 0, 0]}>
      <torusGeometry args={[radius, 0.004, 16, 120]} />
      <meshStandardMaterial
        color={GOLD}
        metalness={0.85}
        roughness={0.15}
        transparent
        opacity={0.45}
        emissive={GOLD_DARK}
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

// ─── Second counter-rotating shell ────────────────────────────────────────────
function OuterShell() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = -state.clock.elapsedTime * 0.07
    ref.current.rotation.z =  state.clock.elapsedTime * 0.04
  })

  return (
    <mesh ref={ref}>
      <dodecahedronGeometry args={[2.4, 0]} />
      <meshStandardMaterial
        color={GOLD_DARK}
        metalness={0.7}
        roughness={0.3}
        wireframe
        transparent
        opacity={0.22}
        emissive={GOLD_DARK}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

// ─── Main scene ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <Environment preset="city" />

      <ambientLight intensity={0.2} />
      <pointLight position={[5,  5,  5]}  intensity={2.2} color={GOLD_LIGHT} />
      <pointLight position={[-5, -3, -5]} intensity={0.7} color="#3D2F2F" />
      <pointLight position={[0,  0,  4]}  intensity={0.5} color="#FAF9F6" />

      <Float speed={1.1} floatIntensity={0.25} rotationIntensity={0.08}>
        <OuterShell />
        <GeodesicShell />
        <GlassCore />
      </Float>

      {/* Three equidistant orbiting gems */}
      <Satellite phase={0}      radius={2.6} />
      <Satellite phase={2.094}  radius={2.6} />
      <Satellite phase={4.189}  radius={2.6} />

      <OrbitRing radius={2.6} tiltX={0.32} />
      <OrbitRing radius={2.25} tiltX={-0.55} />

      <Sparkles count={70} scale={7} size={1.4} speed={0.25} color={GOLD_LIGHT} opacity={0.35} />

      <EffectComposer>
        <Bloom
          intensity={2.0}
          luminanceThreshold={0.48}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.9}
        />
      </EffectComposer>
    </>
  )
}

// ─── Exported canvas component ────────────────────────────────────────────────
export function AboutSculpture() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

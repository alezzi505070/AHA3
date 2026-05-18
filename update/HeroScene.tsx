// src/components/three/HeroScene.tsx
// Full immersive WebGL hero scene — replaces the Canvas + ParticleField in Hero.tsx
// Drop-in: just render <HeroScene /> where the Canvas was

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Float,
  Sparkles,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Environment,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// ─── Brand palette ────────────────────────────────────────────────────────────
const GOLD        = '#C4A35A'
const GOLD_LIGHT  = '#D4B572'
const GOLD_DARK   = '#8A733F'
const GOLD_EMIT   = '#5A4020'
const BROWN       = '#3D2F2F'

// ─── Large central gold planet ────────────────────────────────────────────────
function GoldPlanet() {
  const ref = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.045
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      mouse.x * 0.06,
      0.02
    )
  })

  return (
    <mesh ref={ref} position={[2.8, -0.6, -3]}>
      <sphereGeometry args={[2.9, 128, 128]} />
      <MeshDistortMaterial
        color={GOLD}
        metalness={0.95}
        roughness={0.05}
        distort={0.22}
        speed={1.4}
        envMapIntensity={2.2}
        emissive={GOLD_EMIT}
        emissiveIntensity={0.18}
      />
    </mesh>
  )
}

// ─── Thin glass shell wrapping the planet ─────────────────────────────────────
function GlassShell() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = -state.clock.elapsedTime * 0.07
    ref.current.rotation.x =  state.clock.elapsedTime * 0.02
  })

  return (
    <mesh ref={ref} position={[2.8, -0.6, -3]}>
      <sphereGeometry args={[3.6, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        roughness={0}
        chromaticAberration={0.06}
        anisotropy={0.1}
        distortion={0.08}
        distortionScale={0.1}
        temporalDistortion={0.15}
        color={GOLD_LIGHT}
        transmission={0.97}
        transparent
        opacity={0.07}
        envMapIntensity={1}
      />
    </mesh>
  )
}

// ─── Orbital particle rings ───────────────────────────────────────────────────
interface RingProps {
  radius: number
  count: number
  tiltX: number
  tiltZ: number
  speed: number
  color: string
  size: number
}

function OrbitalRing({ radius, count, tiltX, tiltZ, speed, color, size }: RingProps) {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle  = (i / count) * Math.PI * 2
      const jitter = (Math.random() - 0.5) * 0.35
      const r      = radius + jitter
      pos[i * 3]     = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.45
      pos[i * 3 + 2] = Math.sin(angle) * r
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [radius, count])

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += speed
  })

  return (
    <points
      ref={ref}
      rotation={[tiltX, 0, tiltZ]}
      position={[2.8, -0.6, -3]}
    >
      <primitive object={geometry} />
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ─── Floating crystalline octahedra ───────────────────────────────────────────
function Crystal({
  position,
  scale,
  speed,
}: {
  position: [number, number, number]
  scale: number
  speed: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.rotation.x = t * 0.7
    ref.current.rotation.y = t
    ref.current.rotation.z = t * 0.4
  })

  return (
    <Float speed={speed * 0.5} floatIntensity={0.9} rotationIntensity={0}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={GOLD}
          metalness={1}
          roughness={0}
          envMapIntensity={3}
          emissive={GOLD_DARK}
          emissiveIntensity={0.45}
        />
      </mesh>
    </Float>
  )
}

// ─── Camera follows mouse ─────────────────────────────────────────────────────
function CameraRig() {
  const { camera, mouse } = useThree()

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.7,  0.025)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.35 + 0.3, 0.025)
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Main scene ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <Environment preset="city" />

      <ambientLight intensity={0.12} />
      <pointLight position={[10, 10, 5]}  intensity={2.2} color={GOLD_LIGHT} />
      <pointLight position={[-8, -5, -10]} intensity={0.8} color={BROWN} />
      <pointLight position={[0, 8, 0]}    intensity={0.4} color="#FAF9F6" />

      {/* Core sculpture */}
      <GoldPlanet />
      <GlassShell />

      {/* Orbital particle rings — vary tilt, speed, density */}
      <OrbitalRing radius={4.3} count={320} tiltX={0.28}  tiltZ={0}     speed={0.0030} color={GOLD_LIGHT} size={0.024} />
      <OrbitalRing radius={5.1} count={220} tiltX={-0.58} tiltZ={0.20}  speed={0.0018} color={GOLD}       size={0.019} />
      <OrbitalRing radius={3.6} count={160} tiltX={0.88}  tiltZ={-0.28} speed={0.0042} color={GOLD}       size={0.015} />
      <OrbitalRing radius={6.2} count={110} tiltX={0.14}  tiltZ={0.42}  speed={0.0011} color={GOLD_DARK}  size={0.017} />

      {/* Floating crystals — scattered in depth */}
      <Crystal position={[-5.2,  2.5, -2.0]} scale={0.18} speed={0.75} />
      <Crystal position={[ 6.0, -1.8, -5.0]} scale={0.12} speed={1.05} />
      <Crystal position={[-3.0, -3.2, -3.5]} scale={0.09} speed={1.35} />
      <Crystal position={[ 1.0,  4.0, -6.0]} scale={0.14} speed={0.65} />
      <Crystal position={[-6.0,  0.2, -7.0]} scale={0.10} speed={1.15} />
      <Crystal position={[ 4.0,  3.0, -1.5]} scale={0.07} speed={1.60} />
      <Crystal position={[-1.5, -4.5, -5.5]} scale={0.11} speed={0.90} />

      {/* Ambient sparkle field */}
      <Sparkles
        count={400}
        scale={[18, 12, 12]}
        size={1.3}
        speed={0.2}
        color={GOLD_LIGHT}
        opacity={0.38}
        noise={0.1}
      />

      <CameraRig />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={2.2}
          luminanceThreshold={0.44}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.82}
        />
      </EffectComposer>
    </>
  )
}

// ─── Exported canvas component ────────────────────────────────────────────────
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 9], fov: 55 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.25,
      }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

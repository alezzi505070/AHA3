import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ParticleField = () => {
  const ref = useRef<THREE.Points>(null);
  const count = 1500;
  
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25; // z
    }
    return pos;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.05;
      ref.current.rotation.x = clock.elapsedTime * 0.02 + (pointer.y * 0.1);
      ref.current.position.x = pointer.x * 0.2;
      ref.current.position.y = pointer.y * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#C4A35A"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

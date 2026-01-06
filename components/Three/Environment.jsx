'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/lib/constants';

/**
 * Environment component - Grid floor, fog, and lighting
 * Performance optimized with memoized geometries and materials
 */
export function Environment({ gridSize = 100, gridDivisions = 50 }) {
  const gridRef = useRef();

  // Animate grid opacity for subtle pulse effect
  useFrame((state) => {
    if (gridRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 0.3;
      gridRef.current.material.opacity = pulse;
    }
  });

  // Memoized grid helper with custom material
  const gridHelper = useMemo(() => {
    const grid = new THREE.GridHelper(gridSize, gridDivisions, COLORS.primary, COLORS.primary);
    grid.material.transparent = true;
    grid.material.opacity = 0.3;
    grid.material.depthWrite = false;
    grid.position.y = -0.5;
    return grid;
  }, [gridSize, gridDivisions]);

  return (
    <>
      {/* Fog for depth and performance (hides distant objects) */}
      <fog attach="fog" args={[COLORS.background, 10, 80]} />
      
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.3} color="#ffffff" />
      
      {/* Directional light for subtle highlights */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.5}
        color="#ffffff"
      />
      
      {/* Point lights for neon glow effect */}
      <pointLight
        position={[0, 10, 0]}
        intensity={2}
        color={COLORS.primary}
        distance={50}
        decay={2}
      />
      
      <pointLight
        position={[-20, 5, -20]}
        intensity={1}
        color={COLORS.neonPurple}
        distance={40}
        decay={2}
      />
      
      {/* Grid floor */}
      <primitive ref={gridRef} object={gridHelper} />
      
      {/* Ground plane for receiving shadows (optional visual element) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]} receiveShadow={false}>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial
          color={COLORS.background}
          transparent
          opacity={0.8}
        />
      </mesh>
    </>
  );
}

'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '@/lib/constants';
import { useAnimationState } from '@/hooks/useAnimationState';

/**
 * InfrastructureGrid - Visualizes modular web infrastructure.
 * 
 * Metaphor: Layered platform architecture with data flow.
 * - Base layer: Stable foundation platforms (infrastructure)
 * - Middle layer: Service modules (microservices/APIs)
 * - Data particles: Flow between layers (data pipeline)
 * 
 * Communicates: stability, scalability, engineered systems.
 */

// Seeded random number generator for deterministic results
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Platform block component (infrastructure layer)
function PlatformGrid({ rows = 5, cols = 8, y = 0, opacity = 1, phase }) {
  const meshRef = useRef();
  const instanceCount = rows * cols;
  const emissiveIntensityRef = useRef(0.15);
  
  const geometry = useMemo(() => new THREE.BoxGeometry(1.8, 0.15, 1.8), []);
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1e1e3f'),
    emissive: new THREE.Color(COLORS.primary.base),
    emissiveIntensity: 0.15,
    metalness: 0.9,
    roughness: 0.3,
    transparent: true,
    opacity: opacity,
  }), [opacity]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const spacing = 2.2;

  useEffect(() => {
    if (!meshRef.current) return;
    
    const offsetX = (cols * spacing) / 2;
    const offsetZ = (rows * spacing) / 2;
    
    for (let i = 0; i < instanceCount; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      dummy.position.set(
        col * spacing - offsetX + spacing / 2,
        y,
        row * spacing - offsetZ + spacing / 2
      );
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [instanceCount, cols, rows, spacing, y, dummy]);

  // Subtle pulse animation - update via ref to avoid lint error
  useFrame((state) => {
    if (phase !== 'idle' || !meshRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 0.15;
    emissiveIntensityRef.current = pulse;
    
    // Access material from mesh ref instead of useMemo result
    const mat = meshRef.current.material;
    if (mat && mat.emissiveIntensity !== undefined) {
      mat.emissiveIntensity = pulse;
    }
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, instanceCount]}
      frustumCulled={true}
    />
  );
}

// Service modules (middle layer - the microservices)
function ServiceModules({ count = 24, phase }) {
  const meshRef = useRef();
  const animationProgress = useRef(0);
  const dummyRef = useRef(new THREE.Object3D());
  
  const geometry = useMemo(() => new THREE.BoxGeometry(0.8, 0.8, 0.8), []);
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(COLORS.primary.base),
    emissive: new THREE.Color(COLORS.primary.base),
    emissiveIntensity: 0.4,
    metalness: 0.7,
    roughness: 0.2,
    transparent: true,
    opacity: 0.9,
  }), []);

  const { positions, delays } = useMemo(() => {
    const pos = [];
    const del = [];
    
    // Arrange in a logical grid pattern (like microservices)
    const gridCols = 6;
    const spacing = 2.2;
    const offsetX = (gridCols * spacing) / 2;
    
    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / gridCols);
      const col = i % gridCols;
      
      pos.push({
        x: col * spacing - offsetX + spacing / 2,
        y: 1.5, // Floating above platform
        z: row * spacing - (Math.ceil(count / gridCols) * spacing) / 2 + spacing / 2,
      });
      
      del.push(i * 0.05); // Staggered animation
    }
    
    return { positions: pos, delays: del };
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = dummyRef.current;
    
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i].x, -5, positions[i].z);
      dummy.scale.set(0, 0, 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, positions]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const dummy = dummyRef.current;
    
    const time = state.clock.elapsedTime;
    
    // Progress animation based on phase
    let targetProgress = phase === 'idle' ? 1 : phase === 'formation' ? 0.5 : 0;
    animationProgress.current = THREE.MathUtils.lerp(
      animationProgress.current,
      targetProgress,
      delta * 1.5
    );

    for (let i = 0; i < count; i++) {
      const pos = positions[i];
      const delay = delays[i];
      const localProgress = Math.max(0, Math.min(1, (animationProgress.current - delay / 2) * 2));
      
      // Rise up animation
      const y = THREE.MathUtils.lerp(-5, pos.y, localProgress);
      
      // Subtle processing pulse (staggered)
      const pulse = phase === 'idle' 
        ? Math.sin(time * 2 + i * 0.3) * 0.03 
        : 0;
      
      dummy.position.set(pos.x, y + pulse, pos.z);
      dummy.scale.setScalar(localProgress);
      dummy.rotation.y = time * 0.1;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={true}
    />
  );
}

// Data flow particles (represents data moving through the system)
function DataFlow({ count = 60, phase }) {
  const meshRef = useRef();
  const dummyRef = useRef(new THREE.Object3D());
  
  const geometry = useMemo(() => new THREE.SphereGeometry(0.08, 8, 8), []);
  
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#00ff88'),
    emissive: new THREE.Color('#00ff88'),
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.9,
  }), []);

  // Generate particle data with seeded random for deterministic results
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        // Horizontal lanes for data flow - using seeded random
        lane: Math.floor(seededRandom(i * 1.1) * 4) - 1.5,
        speed: 0.5 + seededRandom(i * 2.2) * 0.5,
        offset: seededRandom(i * 3.3) * 20,
        y: 0.5 + seededRandom(i * 4.4) * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current || phase !== 'idle') return;
    const dummy = dummyRef.current;
    
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      
      // Flow from left to right (data pipeline direction)
      const x = ((time * p.speed + p.offset) % 20) - 10;
      const z = p.lane * 2.2;
      const y = p.y + Math.sin(time * 2 + i) * 0.1;
      
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.8 + Math.sin(time * 3 + i) * 0.2);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Initialize particles off-screen during loading
  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = dummyRef.current;
    
    for (let i = 0; i < count; i++) {
      dummy.position.set(-100, 0, 0);
      dummy.scale.setScalar(0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
      frustumCulled={true}
    />
  );
}

// Connection lines between modules (network topology)
function ConnectionGrid({ phase }) {
  const linesRef = useRef();
  const opacityRef = useRef(0);
  
  const points = useMemo(() => {
    const pts = [];
    const spacing = 2.2;
    const cols = 6;
    const rows = 4;
    const offsetX = (cols * spacing) / 2;
    const offsetZ = (rows * spacing) / 2;
    
    // Horizontal connections
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        const x1 = col * spacing - offsetX + spacing / 2 + 0.4;
        const x2 = (col + 1) * spacing - offsetX + spacing / 2 - 0.4;
        const z = row * spacing - offsetZ + spacing / 2;
        const y = 1.5;
        
        pts.push(new THREE.Vector3(x1, y, z));
        pts.push(new THREE.Vector3(x2, y, z));
      }
    }
    
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [points]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(COLORS.primary.base),
      transparent: true,
      opacity: 0,
    });
  }, []);

  useFrame(() => {
    if (linesRef.current) {
      const targetOpacity = phase === 'idle' ? 0.3 : 0;
      opacityRef.current = THREE.MathUtils.lerp(
        opacityRef.current,
        targetOpacity,
        0.05
      );
      // Access material via the mesh ref
      const mat = linesRef.current.material;
      if (mat) {
        mat.opacity = opacityRef.current;
      }
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
  );
}

/**
 * Main export - InfrastructureGrid
 * Combines all layers into a cohesive visualization.
 */
export function InfrastructureGrid({ complexity = 1 }) {
  const phase = useAnimationState((state) => state.phase);
  
  // Scale complexity for performance tiers
  const moduleCount = Math.floor(24 * complexity);
  const particleCount = Math.floor(60 * complexity);
  
  return (
    <group position={[0, -1, 0]}>
      {/* Base infrastructure platform */}
      <PlatformGrid rows={4} cols={6} y={0} opacity={0.8} phase={phase} />
      
      {/* Secondary platform layer (depth) */}
      <PlatformGrid rows={3} cols={5} y={-0.5} opacity={0.4} phase={phase} />
      
      {/* Service modules */}
      <ServiceModules count={moduleCount} phase={phase} />
      
      {/* Data flow particles */}
      <DataFlow count={particleCount} phase={phase} />
      
      {/* Network connections */}
      <ConnectionGrid phase={phase} />
    </group>
  );
}

// Keep DataCity export for backwards compatibility
export { InfrastructureGrid as DataCity };

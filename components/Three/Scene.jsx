'use client';

import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Environment } from './Environment';
import { InfrastructureGrid } from './DataCity';
import { CameraController } from './CameraController';
import { Effects } from './Effects';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { COLORS } from '@/lib/constants';

/**
 * Scene - Main 3D scene container wrapping the R3F Canvas.
 * Handles adaptive quality settings and component orchestration.
 */
export function Scene() {
  const { settings, tier } = useDevicePerformance();

  // Memoize complexity calculation
  const complexity = useMemo(() => {
    return tier === 'high' ? 1 : tier === 'medium' ? 0.7 : 0.4;
  }, [tier]);

  const gridDivisions = useMemo(() => {
    return tier === 'low' ? 25 : 50;
  }, [tier]);

  return (
    <Canvas
      camera={{
        fov: 60,
        near: 0.1,
        far: 200,
        position: [0, 0.5, 2],
      }}
      dpr={settings.dpr}
      gl={{
        antialias: tier === 'high',
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: COLORS.background.primary,
      }}
    >
      <Suspense fallback={null}>
        {/* Environment: Grid, fog, lighting */}
        <Environment
          gridSize={100}
          gridDivisions={gridDivisions}
        />
        
        {/* InfrastructureGrid: Modular platform visualization */}
        <InfrastructureGrid complexity={complexity} />
        
        {/* Camera: GSAP animation + parallax */}
        <CameraController
          enableParallax={settings.mouseParallax}
          parallaxIntensity={tier === 'high' ? 0.5 : 0.3}
        />
        
        {/* Post-processing effects */}
        <Effects />
        
        {/* Preload assets */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

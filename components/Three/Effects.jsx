'use client';

import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useDevicePerformance } from '@/hooks/useDevicePerformance';
import { useAnimationState } from '@/hooks/useAnimationState';

/**
 * Effects - Adaptive post-processing effects based on device performance.
 * Automatically adjusts quality for optimal frame rate.
 */
export function Effects() {
  const { settings } = useDevicePerformance();
  const phase = useAnimationState((state) => state.phase);
  
  // Disable post-processing entirely on low-end devices
  if (!settings.postProcessing) {
    return null;
  }
  
  // Adjust bloom intensity based on animation phase
  const bloomIntensity = phase === 'idle' ? 0.6 : 0.8;

  return (
    <EffectComposer multisampling={0}>
      {/* Bloom for neon glow effect */}
      {settings.bloomEnabled && (
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.8}
        />
      )}
      
      {/* Chromatic aberration for cinematic feel (desktop only) */}
      {settings.chromaticAberration && (
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.002, 0.002]}
          radialModulation={true}
          modulationOffset={0.5}
        />
      )}
      
      {/* Vignette for focus effect */}
      <Vignette
        offset={0.3}
        darkness={0.6}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}

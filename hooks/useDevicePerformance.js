'use client';

import { useMemo, useSyncExternalStore } from 'react';

/**
 * Performance tier configurations
 */
const PERFORMANCE_TIERS = {
  high: {
    dpr: 2.0,
    instanceCount: 2000,
    bloomEnabled: true,
    chromaticAberration: true,
    mouseParallax: true,
    targetFPS: 60,
  },
  medium: {
    dpr: 1.5,
    instanceCount: 800,
    bloomEnabled: true,
    chromaticAberration: false,
    mouseParallax: true,
    targetFPS: 45,
  },
  low: {
    dpr: 1.0,
    instanceCount: 300,
    bloomEnabled: false,
    chromaticAberration: false,
    mouseParallax: false,
    targetFPS: 30,
  },
};

/**
 * Detect performance tier based on device capabilities
 */
function detectPerformanceTier() {
  // Server-side fallback
  if (typeof window === 'undefined') {
    return 'medium';
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const screenWidth = window.innerWidth;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;

  // Check for WebGL capabilities
  let gpuTier = 'medium';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        // Check for high-end GPUs
        if (/NVIDIA|GeForce|RTX|GTX|Radeon RX/i.test(renderer)) {
          gpuTier = 'high';
        } else if (/Intel|Mali|Adreno/i.test(renderer)) {
          gpuTier = isMobile ? 'low' : 'medium';
        }
      }
    }
  } catch (e) {
    console.warn('WebGL detection failed:', e);
  }

  // Determine final tier
  if (isMobile || screenWidth < 768) {
    return 'low';
  } else if (screenWidth < 1200 || hardwareConcurrency < 4 || gpuTier === 'medium') {
    return 'medium';
  } else {
    return gpuTier;
  }
}

// Cache the detected tier
let cachedTier = null;

function getPerformanceTier() {
  if (cachedTier === null) {
    cachedTier = detectPerformanceTier();
  }
  return cachedTier;
}

// Subscribe function for useSyncExternalStore (no-op since tier doesn't change)
function subscribe(callback) {
  // Listen for resize to potentially update tier
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

// Server snapshot
function getServerSnapshot() {
  return 'medium';
}

/**
 * Detects device performance tier based on hardware and screen size.
 * Returns appropriate settings for 3D rendering quality.
 */
export function useDevicePerformance() {
  const tier = useSyncExternalStore(
    subscribe,
    getPerformanceTier,
    getServerSnapshot
  );

  const settings = useMemo(() => {
    return PERFORMANCE_TIERS[tier] || PERFORMANCE_TIERS.medium;
  }, [tier]);

  return { tier, settings };
}

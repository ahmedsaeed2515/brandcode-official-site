// Performance and theme constants for BrandCode 3D website

export const COLORS = {
  background: '#050510',
  primary: '#6366f1',
  primaryGlow: 'rgba(99, 102, 241, 0.4)',
  secondary: '#f97316',
  secondaryGlow: 'rgba(249, 115, 22, 0.4)',
  accent: '#ec4899',
  neonBlue: '#00d4ff',
  neonPurple: '#a855f7',
  white: '#ffffff',
  muted: '#71717a',
};

export const PERFORMANCE_TIERS = {
  high: {
    instanceCount: 2000,
    dpr: 2,
    bloomEnabled: true,
    chromaticAberration: true,
    mouseParallax: true,
    postProcessing: true,
  },
  medium: {
    instanceCount: 800,
    dpr: 1.5,
    bloomEnabled: true,
    chromaticAberration: false,
    mouseParallax: true,
    postProcessing: true,
  },
  low: {
    instanceCount: 300,
    dpr: 1,
    bloomEnabled: false,
    chromaticAberration: false,
    mouseParallax: false,
    postProcessing: false,
  },
};

export const ANIMATION = {
  introDuration: 3,
  formationDuration: 2,
  cameraStart: { x: 0, y: 0.5, z: 2 },
  cameraEnd: { x: 0, y: 8, z: 25 },
  cameraLookAt: { x: 0, y: 0, z: 0 },
};

export const SCENE = {
  fogColor: '#050510',
  fogNear: 10,
  fogFar: 80,
  gridSize: 100,
  gridDivisions: 50,
};

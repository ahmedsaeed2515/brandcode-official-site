/**
 * BrandCode Design Constants
 * Centralized configuration for colors, performance, and 3D settings
 */

// ============================================
// Color Palette - Glassmorphism + Neon Theme
// ============================================

export const COLORS = {
  // Primary Background
  background: {
    primary: '#050510',
    elevated: '#0a0a1a',
    gradient: {
      start: '#050510',
      mid: '#0d0d20',
      end: '#050510',
    },
  },

  // Neon Accent Colors
  primary: {
    base: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
    glow: 'rgba(99, 102, 241, 0.5)',
    soft: 'rgba(99, 102, 241, 0.15)',
  },

  secondary: {
    base: '#f97316',
    light: '#fb923c',
    dark: '#ea580c',
    glow: 'rgba(249, 115, 22, 0.5)',
  },

  accent: {
    pink: '#ec4899',
    cyan: '#06b6d4',
    emerald: '#10b981',
    purple: '#8b5cf6',
  },

  // Glass Effects
  glass: {
    background: 'rgba(255, 255, 255, 0.03)',
    backgroundHover: 'rgba(255, 255, 255, 0.06)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.15)',
    strong: 'rgba(255, 255, 255, 0.1)',
  },

  // Neutral
  neutral: {
    white: '#ffffff',
    muted: '#71717a',
    mutedForeground: '#a1a1aa',
    dark: '#18181b',
  },
};

// ============================================
// Performance Configuration
// ============================================

export const PERFORMANCE = {
  desktop: {
    dpr: 2.0,
    instanceCount: 2000,
    bloomEnabled: true,
    chromaticAberration: true,
    mouseParallax: true,
    targetFPS: 60,
  },
  tablet: {
    dpr: 1.5,
    instanceCount: 800,
    bloomEnabled: true,
    chromaticAberration: false,
    mouseParallax: true,
    targetFPS: 45,
  },
  mobile: {
    dpr: 1.0,
    instanceCount: 300,
    bloomEnabled: false,
    chromaticAberration: false,
    mouseParallax: false,
    targetFPS: 30,
  },
};

// Performance Tiers for device detection
export const PERFORMANCE_TIERS = {
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

// ============================================
// Animation Timings
// ============================================

export const ANIMATION = {
  // Camera Positions
  cameraStart: { x: 0, y: 0.5, z: 0.1 },
  cameraEnd: { x: 0, y: 2, z: 12 },
  introDuration: 3,

  // Intro Timeline (seconds)
  intro: {
    cameraStart: 0,
    cameraDolly: 0.5,
    cameraSettle: 2.5,
    particleChaos: 0,
    particleFormation: 2,
    uiFadeIn: 3,
    ctaSlideUp: 3.5,
    totalDuration: 5,
  },

  // Transition Durations
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8,
  },

  // Easing Functions
  easing: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    sharp: [0.4, 0, 0.6, 1],
    gentleOut: [0, 0, 0.2, 1],
  },
};

// ============================================
// 3D Scene Configuration
// ============================================

export const SCENE_CONFIG = {
  camera: {
    fov: 50,
    near: 0.1,
    far: 1000,
    position: {
      initial: [0, 0.5, 0.1], // Close-up start
      final: [0, 2, 12], // Final resting position
    },
  },

  lighting: {
    ambient: {
      color: '#404080',
      intensity: 0.4,
    },
    directional: {
      color: '#ffffff',
      intensity: 1,
      position: [10, 20, 15],
    },
    point: [
      { color: '#6366f1', intensity: 2, position: [-5, 3, 2] },
      { color: '#ec4899', intensity: 1.5, position: [5, 2, -3] },
      { color: '#06b6d4', intensity: 1, position: [0, 5, 5] },
    ],
  },

  fog: {
    color: '#050510',
    near: 5,
    far: 50,
  },

  grid: {
    size: 100,
    divisions: 50,
    color: 'rgba(99, 102, 241, 0.1)',
  },
};

// ============================================
// Glassmorphism Styles
// ============================================

export const GLASS_STYLES = {
  card: {
    background: `linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.02) 100%
    )`,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
  },
  
  cardHover: {
    background: `linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.03) 100%
    )`,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: `
      0 12px 40px rgba(0, 0, 0, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.15),
      0 0 30px rgba(99, 102, 241, 0.1)
    `,
  },

  navbar: {
    background: 'rgba(5, 5, 16, 0.8)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },

  button: {
    background: 'rgba(99, 102, 241, 0.15)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
  },
};

// ============================================
// Responsive Breakpoints
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// ============================================
// Service Icons Configuration (3D visual hints)
// ============================================

export const SERVICES = [
  {
    id: 'web-dev',
    title: 'Web Application Development',
    description: 'Production-grade Next.js and React applications with server-side rendering, API routes, and optimized performance.',
    icon: 'code',
    color: COLORS.primary.base,
    glowColor: COLORS.primary.glow,
    features: ['Next.js 14 / React 19', 'TypeScript', 'REST & GraphQL APIs'],
    shape3D: 'cube',
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications using React Native with native performance and seamless user experiences.',
    icon: 'smartphone',
    color: COLORS.accent.cyan,
    glowColor: 'rgba(6, 182, 212, 0.5)',
    features: ['React Native', 'iOS & Android', 'Expo'],
    shape3D: 'phone',
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description: 'Scalable deployment architectures on AWS, Vercel, and Google Cloud with CI/CD pipelines and monitoring.',
    icon: 'cloud',
    color: COLORS.accent.emerald,
    glowColor: 'rgba(16, 185, 129, 0.5)',
    features: ['AWS / GCP / Vercel', 'Docker & Kubernetes', 'Auto-scaling'],
    shape3D: 'sphere',
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Modern, accessible interfaces with a focus on usability, aesthetics, and conversion optimization.',
    icon: 'palette',
    color: COLORS.accent.pink,
    glowColor: COLORS.accent.pink,
    features: ['Figma', 'Design Systems', 'Accessibility'],
    shape3D: 'crystal',
  },
];

// ============================================
// Why Us Section Configuration
// ============================================

export const WHY_US = [
  {
    id: 'speed',
    title: 'Lightning Fast',
    description: 'Optimized performance with sub-second load times and 60+ FPS animations.',
    icon: 'zap',
    color: COLORS.secondary.base,
    shape3D: 'arrow', // Dynamic streamlined shape
  },
  {
    id: 'quality',
    title: 'Premium Quality',
    description: 'Production-grade code with comprehensive testing and documentation.',
    icon: 'gem',
    color: COLORS.accent.cyan,
    shape3D: 'crystal', // Polished crystal shape
  },
  {
    id: 'innovation',
    title: 'Innovative Solutions',
    description: 'Cutting-edge technologies and creative approaches to complex problems.',
    icon: 'cube',
    color: COLORS.accent.purple,
    shape3D: 'rubiks', // Complex cube shape
  },
];

const constants = {
  COLORS,
  PERFORMANCE,
  PERFORMANCE_TIERS,
  ANIMATION,
  SCENE_CONFIG,
  GLASS_STYLES,
  BREAKPOINTS,
  SERVICES,
  WHY_US,
};

export default constants;

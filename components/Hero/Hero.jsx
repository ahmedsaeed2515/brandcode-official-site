'use client';

import dynamic from 'next/dynamic';
import { HeroText } from '@/components/UI/HeroText';
import { CTAButton } from '@/components/UI/CTAButton';
import { LoadingScreen } from '@/components/UI/LoadingScreen';
import { motion } from 'framer-motion';

// Dynamically import SwarmBackground to prevent SSR issues
const SwarmBackground = dynamic(
  () => import('@/components/Three/SwarmBackground').then((mod) => mod.SwarmBackground),
  { 
    ssr: false,
    loading: () => null,
  }
);

/**
 * Hero - Enterprise hero section with interactive 3D background.
 * Features:
 * - GPU-based particle simulation background
 * - Glassmorphism text container
 * - Animated gradient overlays
 * - Responsive design
 */
export function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-background">
      {/* 3D Particle Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <SwarmBackground />
      </div>
      
      {/* Animated Gradient Background (visible behind 3D) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 50% 90%, rgba(6, 182, 212, 0.08) 0%, transparent 50%)
          `,
        }}
      />

      {/* Dark Overlay for better text contrast */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, rgba(5, 5, 16, 0.5) 0%, rgba(5, 5, 16, 0.8) 100%)',
        }}
      />

      {/* Floating Glass Orbs (decorative 3D elements) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
        {/* Large floating orb - top right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute top-[15%] right-[10%] hidden lg:block"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="w-32 h-32 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(99, 102, 241, 0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              boxShadow: '0 0 60px rgba(99, 102, 241, 0.2), inset 0 0 30px rgba(99, 102, 241, 0.1)',
            }}
          />
        </motion.div>

        {/* Medium floating orb - bottom left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-[20%] left-[8%] hidden lg:block"
        >
          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: 1,
            }}
            className="w-20 h-20 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(236, 72, 153, 0.2)',
              boxShadow: '0 0 40px rgba(236, 72, 153, 0.15)',
            }}
          />
        </motion.div>

        {/* Small floating orb - mid right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute top-[45%] right-[5%] hidden xl:block"
        >
          <motion.div
            animate={{ 
              y: [0, -12, 0],
              x: [0, 5, 0],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="w-14 h-14 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.05))',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.15)',
            }}
          />
        </motion.div>
      </div>
      
      {/* Main Content Container */}
      <div 
        className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32 w-full"
        style={{ zIndex: 10 }}
      >
        {/* Full Width Hero Text Container */}
        <div className="w-full">
          <HeroText />
        </div>
      </div>
      
      {/* Loading Screen */}
      <LoadingScreen />
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
          <div 
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-indigo-400"
            />
          </div>
        </motion.div>
      </motion.div>
      
      {/* Bottom Gradient Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          zIndex: 15,
          background: 'linear-gradient(to top, #050510 0%, transparent 100%)',
        }}
      />

      {/* Side Gradient Fades (for depth effect) */}
      <div 
        className="absolute top-0 bottom-0 left-0 w-32 pointer-events-none hidden lg:block"
        style={{
          zIndex: 15,
          background: 'linear-gradient(to right, rgba(5, 5, 16, 0.5) 0%, transparent 100%)',
        }}
      />
      <div 
        className="absolute top-0 bottom-0 right-0 w-32 pointer-events-none hidden lg:block"
        style={{
          zIndex: 15,
          background: 'linear-gradient(to left, rgba(5, 5, 16, 0.5) 0%, transparent 100%)',
        }}
      />
    </section>
  );
}

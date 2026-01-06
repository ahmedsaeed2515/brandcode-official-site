'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

/**
 * Generate particle positions deterministically
 */
function generateParticlePositions(count) {
  const positions = [];
  for (let i = 0; i < count; i++) {
    // Use deterministic pseudo-random based on index
    const seed1 = Math.sin(i * 12.9898) * 43758.5453;
    const seed2 = Math.sin(i * 78.233) * 43758.5453;
    const seed3 = Math.sin(i * 45.164) * 43758.5453;
    const seed4 = Math.sin(i * 94.673) * 43758.5453;
    
    positions.push({
      left: (seed1 - Math.floor(seed1)) * 100,
      top: (seed2 - Math.floor(seed2)) * 100,
      duration: 3 + (seed3 - Math.floor(seed3)) * 2,
      delay: (seed4 - Math.floor(seed4)) * 2,
      color: i % 2 === 0 ? '#6366f1' : '#ec4899',
    });
  }
  return positions;
}

/**
 * LoadingScreen - Premium animated loading screen with glassmorphism
 * Features:
 * - Animated logo with glow
 * - Progress bar with gradient
 * - Smooth exit animation
 */
export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Generate particle positions once (deterministic)
  const particlePositions = useMemo(() => generateParticlePositions(20), []);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Non-linear progress for more realistic feel
        const increment = 15 + (prev % 10);
        return Math.min(prev + increment, 100);
      });
    }, 150);

    // Hide loading screen after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #050510 0%, #0a0a1a 50%, #050510 100%)',
          }}
        >
          {/* Background animated gradient */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.2) 0%, transparent 60%)',
            }}
          />

          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: 150 + i * 80,
                  height: 150 + i * 80,
                  borderColor: `rgba(99, 102, 241, ${0.15 - i * 0.04})`,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 mb-12"
          >
            {/* Glow effect behind logo */}
            <div 
              className="absolute inset-0 blur-2xl -z-10"
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent)',
                transform: 'scale(2)',
              }}
            />

            {/* Logo */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-4xl font-bold"
            >
              <span className="text-white">Brand</span>
              <span 
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Code
              </span>
            </motion.div>
          </motion.div>

          {/* Progress Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 w-64"
          >
            {/* Progress Bar Background */}
            <div 
              className="h-1 rounded-full overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Progress Bar Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)',
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Loading Text */}
            <motion.p
              className="text-center mt-4 text-sm text-zinc-500"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Loading Experience...
            </motion.p>
          </motion.div>

          {/* Floating particles with deterministic positions */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particlePositions.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: particle.color,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

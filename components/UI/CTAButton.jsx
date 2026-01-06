'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * CTAButton - Premium glassmorphism CTA with neon glow effects.
 * Features:
 * - Glass background with gradient fill on hover
 * - Animated neon glow border
 * - Ripple effect on click
 * - Smooth icon animation
 */
export function CTAButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y });
    setTimeout(() => setRipple(null), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col sm:flex-row items-center gap-4 mt-8"
    >
      {/* Primary CTA */}
      <motion.a
        href="#contact"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group flex items-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-2xl overflow-hidden cursor-pointer"
        style={{
          background: isHovered 
            ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Animated glow background */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
          }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-30"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={isHovered ? {
            backgroundPosition: ['200% 0', '-200% 0'],
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Ripple effect */}
        {ripple && (
          <motion.span
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute rounded-full bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 100,
              height: 100,
              marginLeft: -50,
              marginTop: -50,
            }}
          />
        )}

        {/* Button content */}
        <span className="relative z-10">Start Your Project</span>
        <motion.svg
          className="relative z-10 w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>

        {/* Outer glow */}
        <motion.div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(236, 72, 153, 0.3))',
          }}
        />
      </motion.a>

      {/* Secondary CTA */}
      <motion.a
        href="#case-studies"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-2 px-6 py-4 text-base font-medium text-zinc-400 hover:text-white rounded-2xl transition-all duration-300"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span>View Our Work</span>
        <svg 
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.a>
    </motion.div>
  );
}

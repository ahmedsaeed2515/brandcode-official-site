'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * Abstract 3D Shape Components
 * CSS-based 3D shapes with animations
 */
const Abstract3DShape = ({ type, color, glowColor }) => {
  const shapes = {
    // Dynamic Arrow - Represents Speed
    arrow: (
      <div className="relative w-24 h-24 perspective-1000">
        <motion.div
          className="absolute inset-0 preserve-3d"
          animate={{ 
            rotateY: [0, 15, 0, -15, 0],
            rotateX: [0, 5, 0, -5, 0],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        >
          {/* Main arrow body */}
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: 'translateZ(20px)' }}
          >
            <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none">
              <defs>
                <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor={color} stopOpacity="0.3" />
                </linearGradient>
                <filter id="arrow-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Streamlined arrow shape */}
              <path 
                d="M15 40L55 40M55 40L35 25M55 40L35 55" 
                stroke="url(#arrow-grad)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                filter="url(#arrow-glow)"
              />
              {/* Speed lines */}
              <path d="M10 35L5 35" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              <path d="M10 40L3 40" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <path d="M10 45L5 45" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            </svg>
          </div>
          {/* Shadow layer */}
          <div 
            className="absolute inset-0 blur-lg opacity-40"
            style={{ 
              transform: 'translateZ(-10px)',
              background: `radial-gradient(circle, ${glowColor}, transparent)`,
            }}
          />
        </motion.div>
      </div>
    ),

    // Crystal - Represents Quality
    crystal: (
      <div className="relative w-24 h-24 perspective-1000">
        <motion.div
          className="absolute inset-0 preserve-3d"
          animate={{ 
            rotateY: 360,
            rotateX: [0, 10, 0, -10, 0],
          }}
          transition={{ 
            rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <svg className="w-24 h-24" viewBox="0 0 96 96" fill="none">
            <defs>
              <linearGradient id="crystal-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={color} stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="crystal-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0.1" />
              </linearGradient>
              <filter id="crystal-glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Crystal facets */}
            <polygon 
              points="48,8 72,32 72,64 48,88 24,64 24,32" 
              fill="url(#crystal-grad-1)" 
              stroke={color}
              strokeWidth="1"
              filter="url(#crystal-glow)"
            />
            <polygon 
              points="48,8 72,32 48,48 24,32" 
              fill="url(#crystal-grad-2)" 
            />
            <line x1="48" y1="8" x2="48" y2="88" stroke={color} strokeWidth="0.5" opacity="0.5" />
            <line x1="24" y1="32" x2="72" y2="64" stroke={color} strokeWidth="0.5" opacity="0.3" />
            <line x1="72" y1="32" x2="24" y2="64" stroke={color} strokeWidth="0.5" opacity="0.3" />
          </svg>
        </motion.div>
        {/* Glow effect */}
        <div 
          className="absolute inset-0 blur-xl opacity-30 animate-pulse"
          style={{ background: `radial-gradient(circle, ${glowColor}, transparent)` }}
        />
      </div>
    ),

    // Rubik's Cube - Represents Innovation
    rubiks: (
      <div className="relative w-24 h-24 perspective-1000">
        <motion.div
          className="absolute inset-0 preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ 
            rotateY: [0, 90, 180, 270, 360],
            rotateX: [0, 15, 0, -15, 0],
          }}
          transition={{ 
            rotateY: { duration: 15, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Cube face - front */}
          <div 
            className="absolute inset-0 grid grid-cols-3 gap-1 p-2"
            style={{ 
              transform: 'translateZ(48px)',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
            }}
          >
            {[...Array(9)].map((_, i) => (
              <div 
                key={`front-${i}`}
                className="rounded-sm"
                style={{ 
                  background: i % 2 === 0 ? color : `${color}80`,
                  boxShadow: `0 0 10px ${glowColor}`,
                }}
              />
            ))}
          </div>
          
          {/* Cube face - right */}
          <div 
            className="absolute inset-0 grid grid-cols-3 gap-1 p-2"
            style={{ 
              transform: 'rotateY(90deg) translateZ(48px)',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '8px',
            }}
          >
            {[...Array(9)].map((_, i) => (
              <div 
                key={`right-${i}`}
                className="rounded-sm"
                style={{ 
                  background: i % 3 === 0 ? '#ec4899' : '#ec489980',
                }}
              />
            ))}
          </div>

          {/* Cube face - top */}
          <div 
            className="absolute inset-0 grid grid-cols-3 gap-1 p-2"
            style={{ 
              transform: 'rotateX(90deg) translateZ(48px)',
              background: 'rgba(0,0,0,0.35)',
              borderRadius: '8px',
            }}
          >
            {[...Array(9)].map((_, i) => (
              <div 
                key={`top-${i}`}
                className="rounded-sm"
                style={{ 
                  background: i % 2 === 1 ? '#06b6d4' : '#06b6d480',
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Glow */}
        <div 
          className="absolute inset-0 blur-2xl opacity-20"
          style={{ background: `radial-gradient(circle, ${glowColor}, transparent)` }}
        />
      </div>
    ),
  };

  return shapes[type] || shapes.crystal;
};

/**
 * Why Us Card - Glass card with 3D shape
 */
const WhyUsCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative group"
    >
      {/* Glass Card Container */}
      <div 
        className="relative p-8 rounded-3xl overflow-hidden transition-all duration-500 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered 
            ? `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 40px ${item.glowColor}`
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated background glow */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at center, ${item.glowColor} 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
        />

        {/* 3D Shape Container - Floats above card */}
        <motion.div 
          className="relative z-10 flex justify-center mb-8"
          style={{ transform: 'translateZ(40px)' }}
          animate={isHovered ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Abstract3DShape 
            type={item.shape3D} 
            color={item.color} 
            glowColor={item.glowColor}
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <h3 
            className="text-2xl font-bold mb-4 transition-colors duration-300"
            style={{ color: isHovered ? item.color : '#fff' }}
          >
            {item.title}
          </h3>
          <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
            {item.description}
          </p>
        </div>

        {/* Bottom accent line */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-t-full"
          initial={{ width: 0 }}
          whileInView={{ width: isHovered ? '60%' : '30%' }}
          transition={{ duration: 0.5 }}
          style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
};

/**
 * WhyUsSection - Why choose us with 3D abstract shapes
 */
export function WhyUsSection() {
  const items = [
    {
      id: 'speed',
      title: 'Lightning Fast',
      description: 'Optimized performance with sub-second load times and 60+ FPS animations across all devices.',
      color: '#f97316',
      glowColor: 'rgba(249, 115, 22, 0.3)',
      shape3D: 'arrow',
    },
    {
      id: 'quality',
      title: 'Premium Quality',
      description: 'Production-grade code with comprehensive testing, documentation, and best practices.',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.3)',
      shape3D: 'crystal',
    },
    {
      id: 'innovation',
      title: 'Innovative Solutions',
      description: 'Cutting-edge technologies and creative approaches to solve complex problems.',
      color: '#8b5cf6',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      shape3D: 'rubiks',
    },
  ];

  return (
    <section id="why-us" className="relative py-32 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }}
        />
      </div>

      {/* Section divider */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.5), transparent)',
        }}
      />

      <div className="w-full max-w-7xl px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full"
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              color: '#a78bfa',
            }}
          >
            Why Choose Us
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Sets Us <span style={{
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Apart</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            We combine technical excellence with creative innovation to deliver exceptional results.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 perspective-1000 w-full place-items-center">
          {items.map((item, index) => (
            <WhyUsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

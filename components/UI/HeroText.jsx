'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * TypewriterEffect - Simulates typing text
 */
const TypewriterEffect = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(timeout2);
  }, []);

  // Typing logic
  useEffect(() => {
    // If word is finished typing
    if (subIndex === words[index].length + 1 && !reverse) {
      // Pause before deleting
      const timeout = setTimeout(() => setReverse(true), 1000);
      return () => clearTimeout(timeout);
    }

    // If word is finished deleting
    if (subIndex === 0 && reverse) {
      const resetTimeout = setTimeout(() => {
        setReverse(false);
        setIndex((prev) => (prev + 1) % words.length);
      }, 50);
      return () => clearTimeout(resetTimeout);
    }

    // Typing / Deleting speed
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt(Math.random() * 350)));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="inline-block relative">
      {words[index].substring(0, subIndex)}
      <span 
        className="absolute -right-1 top-0 bottom-0 w-1 bg-indigo-500 block"
        style={{ opacity: blink ? 1 : 0 }} 
      />
    </span>
  );
};

/**
 * HeroText - Premium Animated Hero Section
 */
export function HeroText() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isLoaded ? 'visible' : 'hidden'}
      className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh]"
    >
      {/* Dynamic Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4), rgba(236, 72, 153, 0.2), transparent)',
        }}
      />

      {/* Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-500/30 bg-indigo-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span className="text-sm font-semibold text-indigo-200 tracking-wide uppercase">
          Available for New Projects
        </span>
      </motion.div>

      {/* Main Headline with Neon & Typing */}
      <motion.h1
        variants={itemVariants}
        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-tight"
        style={{ textShadow: '0 0 40px rgba(0,0,0,0.5)' }}
      >
        <span className="block text-white mb-2">We Build</span>
        <span 
          className="block relative"
          style={{
            background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))',
          }}
        >
          <TypewriterEffect words={['The Future.', 'Digital Products.', 'Web Systems.', 'Next-Gen Apps.']} />
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
      >
        Transforming complex requirements into <span className="text-indigo-400 font-medium glow-text">stunning digital experiences</span>. 
        We combine elite engineering with premium design.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
      >
        <a
          href="#contact"
          className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-xl overflow-hidden transition-transform hover:scale-105"
        >
          <span className="relative z-10">Start Your Project</span>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="absolute inset-0 ring-2 ring-white/50 rounded-xl group-hover:ring-indigo-500/50 transition-all" />
        </a>
        
        <a
          href="#case-studies"
          className="px-8 py-4 text-white font-medium text-lg rounded-xl border border-white/10 hover:bg-white/5 transition-all hover:border-white/20 backdrop-blur-sm"
        >
          View Our Work
        </a>
      </motion.div>

      {/* Tech Stack Strip */}
      <motion.div
        variants={itemVariants}
        className="mt-16 pt-8 border-t border-white/5 w-full max-w-3xl"
      >
        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Powering The Next Generation With</p>
        <div className="flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Simple Text Icons for Tech Stack */}
          {['React', 'Next.js 15', 'TypeScript', 'Tailwind', 'Three.js', 'Framer Motion'].map((tech) => (
            <span key={tech} className="text-sm font-semibold text-zinc-400 hover:text-indigo-400 transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

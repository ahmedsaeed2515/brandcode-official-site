'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

/**
 * Animated Counter Component
 */
const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Parse the numeric value
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasDecimal = value.includes('.');
  
  // Animate on view
  if (isInView && count < numericValue) {
    const increment = numericValue / (duration * 60);
    const timer = setTimeout(() => {
      if (count + increment >= numericValue) {
        setCount(numericValue);
      } else {
        setCount(count + increment);
      }
    }, 1000 / 60);
    return () => clearTimeout(timer);
  }

  return (
    <span ref={ref}>
      {hasDecimal ? count.toFixed(1) : Math.floor(count)}
      {suffix}
    </span>
  );
};

/**
 * 3D Floating Element Component
 */
const FloatingElement = ({ children, delay = 0, amplitude = 10 }) => {
  return (
    <motion.div
      animate={{
        y: [0, -amplitude, 0],
        rotateZ: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * AboutSection - Company about section with glassmorphism and 3D elements
 */
export function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const stats = [
    { value: '50', suffix: '+', label: 'Projects Delivered' },
    { value: '99.9', suffix: '%', label: 'Uptime Guaranteed' },
    { value: '25', suffix: '+', label: 'Tech Stack Tools' },
    { value: '5', suffix: '+', label: 'Years Experience' },
  ];

  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Performance First',
      description: 'We obsess over milliseconds. Every line of code is optimized for speed and efficiency.',
      color: '#f97316',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Security Built-In',
      description: 'Enterprise-grade security is not an afterthought – it is foundational to everything we build.',
      color: '#10b981',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: 'Scalable Architecture',
      description: 'We design systems that grow with your business, from startup to enterprise scale.',
      color: '#6366f1',
    },
  ];

  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL',
    'AWS', 'Docker', 'GraphQL', 'Tailwind', 'Prisma',
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-32 w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981, transparent)' }}
        />
        <div 
          className="absolute bottom-1/3 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-8"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
      </div>

      {/* Section Divider */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.5), transparent)',
        }}
      />

      <div className="w-full max-w-7xl px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-2 mb-6 text-sm font-medium rounded-full"
            style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              color: '#34d399',
            }}
          >
            About Us
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineering <span style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Excellence</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-3xl mx-auto">
            We are a team of senior engineers and designers who believe that great software 
            is built on a foundation of clean architecture, rigorous testing, and obsessive 
            attention to user experience.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 w-full mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative p-6 rounded-2xl text-center group"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {/* Hover glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                }}
              />
              
              <div 
                className="text-4xl md:text-5xl font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #a5a6f6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 w-full">
          {/* Values Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative p-6 rounded-2xl group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div 
                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${value.color}15`,
                      color: value.color,
                    }}
                  >
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
                
                {/* Accent line */}
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: value.color }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Visual / Tech Stack */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Floating 3D shapes background */}
            <div className="absolute inset-0 pointer-events-none">
              <FloatingElement delay={0} amplitude={15}>
                <div 
                  className="absolute top-10 right-10 w-20 h-20 rounded-2xl rotate-12"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.05))',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </FloatingElement>
              <FloatingElement delay={1} amplitude={12}>
                <div 
                  className="absolute bottom-20 left-5 w-16 h-16 rounded-xl -rotate-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.05))',
                    border: '1px solid rgba(236, 72, 153, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </FloatingElement>
              <FloatingElement delay={2} amplitude={10}>
                <div 
                  className="absolute top-1/2 right-0 w-12 h-12 rounded-lg rotate-45"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    backdropFilter: 'blur(10px)',
                  }}
                />
              </FloatingElement>
            </div>

            {/* Tech Stack Card */}
            <div 
              className="relative p-8 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
              }}
            >
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <span 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(99, 102, 241, 0.2)' }}
                >
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </span>
                Our Tech Stack
              </h3>

              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 text-sm font-medium rounded-xl cursor-default transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#a1a1aa',
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 pt-6 border-t border-zinc-800/50">
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors group"
                >
                  <span>Discuss your tech requirements</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

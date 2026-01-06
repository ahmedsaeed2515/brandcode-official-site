'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

/**
 * 3D Device Mockup Component
 * Renders a floating device (phone/laptop) with project screenshot
 */
const Device3DMockup = ({ type, color, isHovered }) => {
  const deviceVariants = {
    phone: (
      <motion.div
        className="relative w-32 h-56 mx-auto preserve-3d"
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? -10 : 5,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Phone Frame */}
        <div 
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e, #0f0f1a)',
            border: '3px solid #2a2a3e',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 30px ${color}30,
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            transform: 'translateZ(0)',
          }}
        >
          {/* Screen */}
          <div 
            className="absolute inset-2 rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}05)`,
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* App UI Mockup */}
            <div className="p-3 h-full">
              {/* Status bar */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-white/30" />
                  ))}
                </div>
                <div className="w-6 h-1 rounded bg-white/20" />
              </div>
              {/* Content blocks */}
              <div className="space-y-2">
                <div className="h-20 rounded-lg" style={{ background: `${color}40` }} />
                <div className="flex gap-2">
                  <div className="flex-1 h-8 rounded" style={{ background: `${color}30` }} />
                  <div className="flex-1 h-8 rounded" style={{ background: `${color}20` }} />
                </div>
                <div className="h-4 w-3/4 rounded bg-white/10" />
                <div className="h-4 w-1/2 rounded bg-white/5" />
                <div className="h-16 rounded-lg mt-4" style={{ background: `${color}25` }} />
              </div>
            </div>
          </div>
          {/* Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-black rounded-full" />
        </div>

        {/* Phone Shadow */}
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-xl"
          style={{ background: color, opacity: 0.3 }}
        />
      </motion.div>
    ),

    laptop: (
      <motion.div
        className="relative w-56 h-36 mx-auto preserve-3d"
        animate={{
          rotateY: isHovered ? -15 : 0,
          rotateX: isHovered ? 8 : 3,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Screen */}
        <div 
          className="absolute inset-0 rounded-lg overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e, #0f0f1a)',
            border: '2px solid #2a2a3e',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 30px ${color}30,
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            transform: 'translateZ(10px)',
          }}
        >
          <div 
            className="absolute inset-1.5 rounded overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${color}20, ${color}05)`,
            }}
          >
            {/* Browser UI */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-black/30">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
              <div className="flex-1 h-2 ml-2 rounded bg-white/10" />
            </div>
            {/* Content */}
            <div className="p-2 space-y-1.5">
              <div className="h-8 rounded" style={{ background: `${color}40` }} />
              <div className="flex gap-1.5">
                <div className="flex-1 h-12 rounded" style={{ background: `${color}25` }} />
                <div className="flex-1 h-12 rounded" style={{ background: `${color}20` }} />
                <div className="flex-1 h-12 rounded" style={{ background: `${color}15` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Base */}
        <div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-64 h-3 rounded-b-lg"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e, #0f0f1a)',
            transform: 'translateZ(-5px) rotateX(-80deg)',
          }}
        />

        {/* Shadow */}
        <div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-4 rounded-full blur-xl"
          style={{ background: color, opacity: 0.25 }}
        />
      </motion.div>
    ),

    dashboard: (
      <motion.div
        className="relative w-48 h-32 mx-auto preserve-3d"
        animate={{
          rotateY: isHovered ? 10 : -5,
          rotateX: isHovered ? -5 : 5,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dashboard Frame */}
        <div 
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e, #0f0f1a)',
            border: '2px solid #2a2a3e',
            boxShadow: `
              0 25px 50px rgba(0, 0, 0, 0.5),
              0 0 30px ${color}30
            `,
            transform: 'translateZ(5px)',
          }}
        >
          <div className="p-3 h-full grid grid-cols-3 gap-2">
            {/* Stats cards */}
            <div className="col-span-2 grid grid-rows-2 gap-2">
              <div className="rounded-lg p-2" style={{ background: `${color}30` }}>
                <div className="h-2 w-1/2 rounded bg-white/20 mb-1" />
                <div className="h-6 rounded bg-white/10" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg" style={{ background: `${color}20` }} />
                <div className="flex-1 rounded-lg" style={{ background: `${color}25` }} />
              </div>
            </div>
            {/* Sidebar */}
            <div className="rounded-lg p-1 space-y-1" style={{ background: `${color}15` }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 rounded bg-white/10" />
              ))}
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute -top-4 -right-4 w-8 h-8 rounded-lg"
          style={{ 
            background: `linear-gradient(135deg, ${color}, ${color}80)`,
            transform: 'translateZ(30px)',
            boxShadow: `0 10px 20px ${color}40`,
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Shadow */}
        <div 
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-4 rounded-full blur-xl"
          style={{ background: color, opacity: 0.25 }}
        />
      </motion.div>
    ),
  };

  return deviceVariants[type] || deviceVariants.phone;
};

/**
 * Portfolio Card Component
 */
const PortfolioCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 80 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 80 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['6deg', '-6deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-6deg', '6deg']);

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
    <motion.article
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
      className="relative group cursor-pointer"
    >
      {/* Glass Card */}
      <div 
        className="relative rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered 
            ? `0 30px 60px rgba(0, 0, 0, 0.5), 0 0 50px ${project.color}20`
            : '0 10px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Gradient Header */}
        <div 
          className="h-56 relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}05 100%)`,
          }}
        >
          {/* 3D Device Mockup */}
          <div className="absolute inset-0 flex items-center justify-center pt-6">
            <Device3DMockup 
              type={project.deviceType} 
              color={project.color}
              isHovered={isHovered}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: project.color,
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 relative text-center flex flex-col items-center">
          {/* Client badge */}
          <span 
            className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full"
            style={{
              background: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.client}
          </span>

          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          <p className="text-zinc-400 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {project.metrics.map((metric) => (
              <div 
                key={metric.label}
                className="text-center p-2 rounded-lg"
                style={{ background: 'rgba(255, 255, 255, 0.03)' }}
              >
                <div className="text-lg font-bold" style={{ color: project.color }}>
                  {metric.value}
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium text-zinc-400 bg-zinc-800/50 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Project Arrow */}
          <motion.div 
            className="absolute bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
              boxShadow: `0 0 20px ${project.color}50`,
            }}
            whileHover={{ scale: 1.1 }}
          >
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

/**
 * CaseStudiesSection - 3D Portfolio Showcase
 */
export function CaseStudiesSection() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      client: 'Retail Enterprise',
      description: 'Migrated legacy monolith to Next.js microservices, improving load times by 340%.',
      deviceType: 'laptop',
      color: '#6366f1',
      metrics: [
        { label: 'Load Time', value: '0.8s' },
        { label: 'Conversion', value: '+23%' },
        { label: 'Uptime', value: '99.99%' },
      ],
      tags: ['Next.js', 'AWS', 'PostgreSQL'],
    },
    {
      title: 'Finance Mobile App',
      client: 'FinTech Startup',
      description: 'Cross-platform mobile app with real-time transactions and biometric auth.',
      deviceType: 'phone',
      color: '#10b981',
      metrics: [
        { label: 'Users', value: '50K+' },
        { label: 'Rating', value: '4.9★' },
        { label: 'Downloads', value: '100K' },
      ],
      tags: ['React Native', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Analytics Dashboard',
      client: 'SaaS Platform',
      description: 'Real-time dashboard handling 50K concurrent WebSocket connections.',
      deviceType: 'dashboard',
      color: '#06b6d4',
      metrics: [
        { label: 'Concurrent', value: '50K' },
        { label: 'Latency', value: '<100ms' },
        { label: 'Data/sec', value: '1M+' },
      ],
      tags: ['React', 'WebSockets', 'Redis'],
    },
  ];

  return (
    <section id="case-studies" className="relative py-32 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #6366f1, #06b6d4, transparent)' }}
        />
      </div>

      {/* Section divider */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)',
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
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              color: '#22d3ee',
            }}
          >
            Proven Results
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Projects</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Production deployments with measurable business impact. 
            Full technical breakdowns available upon request.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 perspective-1000 w-full place-items-center">
          {projects.map((project, index) => (
            <PortfolioCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 group"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span className="text-zinc-300 group-hover:text-white transition-colors">
              Request detailed case study
            </span>
            <svg 
              className="w-4 h-4 text-indigo-400 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

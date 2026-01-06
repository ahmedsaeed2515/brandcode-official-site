'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Service Icons - 3D-style SVG icons for each service
 */
const ServiceIcon = ({ type, color, glowColor }) => {
  const icons = {
    code: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* 3D Code Block Effect */}
        <rect x="6" y="10" width="28" height="20" rx="3" fill={`url(#grad-${type})`} fillOpacity="0.2" />
        <rect x="4" y="8" width="28" height="20" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
        <path d="M12 16L8 20L12 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24 16L28 20L24 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 24L20 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    smartphone: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* 3D Phone Effect */}
        <rect x="14" y="6" width="16" height="30" rx="3" fill={`url(#grad-${type})`} fillOpacity="0.2" transform="translate(2, 2)" />
        <rect x="12" y="4" width="16" height="30" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
        <line x1="17" y1="30" x2="23" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="9" r="1.5" fill={color} />
      </svg>
    ),
    cloud: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* 3D Cloud Effect */}
        <path 
          d="M32 22C32 18.134 28.866 15 25 15C24.623 15 24.252 15.025 23.889 15.074C22.773 11.622 19.537 9 15.75 9C11.196 9 7.5 12.696 7.5 17.25C7.5 17.49 7.51 17.728 7.529 17.963C5.462 18.739 4 20.736 4 23.063C4 26.031 6.406 28.438 9.375 28.438H30.625C33.594 28.438 36 26.031 36 23.063C36 20.736 34.538 18.739 32.471 17.963"
          transform="translate(1, 2)"
          fill={`url(#grad-${type})`}
          fillOpacity="0.2"
        />
        <path 
          d="M30 20C30 16.134 26.866 13 23 13C22.623 13 22.252 13.025 21.889 13.074C20.773 9.622 17.537 7 13.75 7C9.196 7 5.5 10.696 5.5 15.25C5.5 15.49 5.51 15.728 5.529 15.963C3.462 16.739 2 18.736 2 21.063C2 24.031 4.406 26.438 7.375 26.438H28.625C31.594 26.438 34 24.031 34 21.063C34 18.736 32.538 16.739 30.471 15.963"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
    palette: (
      <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* 3D Palette Effect */}
        <circle cx="22" cy="22" r="14" fill={`url(#grad-${type})`} fillOpacity="0.15" />
        <circle cx="20" cy="20" r="14" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="14" cy="16" r="2.5" fill="#ec4899" />
        <circle cx="20" cy="12" r="2.5" fill="#06b6d4" />
        <circle cx="26" cy="16" r="2.5" fill="#10b981" />
        <circle cx="14" cy="24" r="2.5" fill="#f97316" />
      </svg>
    ),
  };

  return (
    <div 
      className="relative p-4 rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${color}15, ${color}05)`,
        boxShadow: `0 0 30px ${glowColor}`,
      }}
    >
      {icons[type] || icons.code}
      {/* Floating glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-50 blur-xl -z-10"
        style={{ background: glowColor }}
      />
    </div>
  );
};

/**
 * Glass Service Card - Interactive 3D card with tilt effect
 */
const GlassServiceCard = ({ service, index }) => {
  const cardRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
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
        className="relative p-8 rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${service.glowColor} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Gradient border on hover */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${service.color}30, transparent, ${service.color}20)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Icon with 3D float effect */}
          <motion.div
            className="mb-6"
            style={{ transform: 'translateZ(30px)' }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <ServiceIcon 
              type={service.icon} 
              color={service.color} 
              glowColor={service.glowColor} 
            />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
            {service.description}
          </p>

          {/* Feature Tags */}
          <div className="flex flex-wrap gap-2 justify-center">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300"
                style={{
                  background: `${service.color}10`,
                  color: service.color,
                  border: `1px solid ${service.color}30`,
                }}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Learn More Arrow */}
          <div className="mt-6 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
            style={{ color: service.color }}
          >
            <span>Learn More</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ServicesSection - Glass grid layout with 3D interactive cards
 */
export function ServicesSection() {
  const services = [
    {
      id: 'web-dev',
      title: 'Web Application Development',
      description: 'Production-grade Next.js and React applications with server-side rendering, API routes, and optimized performance.',
      icon: 'code',
      color: '#6366f1',
      glowColor: 'rgba(99, 102, 241, 0.3)',
      features: ['Next.js 15', 'React 19', 'TypeScript'],
    },
    {
      id: 'mobile-dev',
      title: 'Mobile Development',
      description: 'Cross-platform mobile applications using React Native with native performance and seamless user experiences.',
      icon: 'smartphone',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.3)',
      features: ['React Native', 'iOS & Android', 'Expo'],
    },
    {
      id: 'cloud',
      title: 'Cloud Infrastructure',
      description: 'Scalable deployment architectures on AWS, Vercel, and Google Cloud with CI/CD pipelines and monitoring.',
      icon: 'cloud',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      features: ['AWS / GCP', 'Docker', 'Kubernetes'],
    },
    {
      id: 'uiux',
      title: 'UI/UX Design',
      description: 'Modern, accessible interfaces with a focus on usability, aesthetics, and conversion optimization.',
      icon: 'palette',
      color: '#ec4899',
      glowColor: 'rgba(236, 72, 153, 0.3)',
      features: ['Figma', 'Design Systems', 'A11y'],
    },
  ];

  return (
    <section id="services" className="relative py-32 w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent)' }}
        />
      </div>

      {/* Section divider glow line */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
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
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              color: '#818cf8',
            }}
          >
            What We Deliver
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technical <span style={{
              background: 'linear-gradient(135deg, #6366f1, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Capabilities</span>
          </h2>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            End-to-end development services focused on performance, scalability, and maintainability.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-12 perspective-1000 w-full place-items-center">
          {services.map((service, index) => (
            <GlassServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

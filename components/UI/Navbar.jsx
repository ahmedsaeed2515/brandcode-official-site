'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/**
 * FloatingNavbar - Glassmorphism floating navigation bar.
 * Features:
 * - Floating glass panel design
 * - Smooth show/hide on scroll
 * - Responsive mobile menu with glass effect
 * - Neon glow CTA button
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar background after scrolling
      setIsScrolled(currentScrollY > 50);
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#case-studies', label: 'Portfolio' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Desktop Floating Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
      >
        {/* Floating Glass Container */}
        <nav 
          className={`
            relative flex items-center justify-between px-6 py-4 
            rounded-full transition-all duration-500 ease-out
            ${isScrolled 
              ? 'bg-[#050510]/80 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
              : 'bg-transparent border border-transparent'
            }
          `}
          style={{
            maxWidth: '1280px',
            width: '100%',
          }}
        >
          {/* Gradient Border Glow Effect */}
          {isScrolled && (
            <div 
              className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, rgba(99, 102, 241, 0), rgba(99, 102, 241, 0.3), rgba(236, 72, 153, 0.3), rgba(99, 102, 241, 0))',
              }}
            />
          )}

          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-10 flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="text-xl font-bold text-white group-hover:opacity-90 transition-opacity">
              Brand<span className="text-indigo-400">Code</span>
            </span>
          </Link>

          {/* Desktop Navigation Links - ABSOLUTELY CENTERED */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-2 py-1 text-base font-medium text-zinc-300 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                {/* Glow dot instead of underline */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              </Link>
            ))}
          </div>

          {/* CTA Button with Neon Glow */}
          <Link
            href="#contact"
            className="hidden md:flex relative items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-xl overflow-hidden group transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.1))',
              border: '1px solid rgba(99, 102, 241, 0.4)',
            }}
          >
            {/* Hover gradient fill */}
            <span 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              }}
            />
            <span className="relative z-10">Get Started</span>
            <svg 
              className="relative z-10 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            
            {/* Glow effect on hover */}
            <span 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)',
              }}
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                animate={isMobileMenuOpen ? { d: 'M6 18L18 6M6 6l12 12' } : { d: 'M4 6h16M4 12h16M4 18h16' }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-20 left-4 right-4 z-50 md:hidden rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(10, 10, 26, 0.95)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              }}
            >
              <div className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 text-lg font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-medium text-white rounded-xl transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    Get Started
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

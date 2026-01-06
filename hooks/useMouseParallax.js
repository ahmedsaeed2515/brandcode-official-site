'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Tracks mouse position for subtle parallax effect.
 * Returns normalized values (-1 to 1) for smooth camera movement.
 * Only active on desktop devices.
 */
export function useMouseParallax(enabled = true, smoothing = 0.1) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    if (!enabled) return;
    
    // Normalize to -1 to 1 range
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    setTargetMouse({ x, y });
  }, [enabled]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled, handleMouseMove]);

  // Smooth interpolation using requestAnimationFrame
  useEffect(() => {
    if (!enabled) return;

    let animationId;
    const animate = () => {
      setMouse(prev => ({
        x: prev.x + (targetMouse.x - prev.x) * smoothing,
        y: prev.y + (targetMouse.y - prev.y) * smoothing,
      }));
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [enabled, targetMouse, smoothing]);

  return mouse;
}

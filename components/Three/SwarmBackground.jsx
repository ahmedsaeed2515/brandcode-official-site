'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useAnimationState } from '@/hooks/useAnimationState';

/**
 * SwarmBackground - Interactive GPU-based particle swarm effect.
 * Uses threejs-toys for stunning visual impact.
 */
export function SwarmBackground() {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const setPhase = useAnimationState((state) => state.setPhase);
  const setUIVisible = useAnimationState((state) => state.setUIVisible);

  // Generate random colors for the swarm
  const getRandomColors = useCallback(() => {
    const hue1 = Math.random() * 360;
    const hue2 = (hue1 + 120 + Math.random() * 60) % 360; // Complementary-ish
    
    const color1 = hslToHex(hue1, 80, 60);
    const color2 = hslToHex(hue2, 70, 50);
    
    return [color1, color2];
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let cleanup = () => {};

    // Dynamically import threejs-toys module
    const initSwarm = async () => {
      try {
        setPhase('loading');
        
        const { swarmBackground } = await import(
          'https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js'
        );

        // BrandCode color palette
        const brandColors = [
          [0x6366f1, 0x8b5cf6], // Primary indigo to violet
          [0x6366f1, 0xec4899], // Indigo to pink
          [0x8b5cf6, 0x06b6d4], // Violet to cyan
          [0x6366f1, 0xf97316], // Indigo to orange
        ];

        const randomPalette = brandColors[Math.floor(Math.random() * brandColors.length)];

        const bg = swarmBackground({
          el: containerRef.current,
          eventsEl: document.body,
          gpgpuSize: 256,
          color: randomPalette,
          geometry: 'default',
        });

        // Position camera for better view
        bg.three.camera.position.set(0, 0, 200);
        
        bgRef.current = bg;

        // Signal loading complete
        setTimeout(() => {
          setPhase('ready');
          setUIVisible(true);
        }, 500);

        // Setup color change on click
        const handleClick = () => {
          const newPalette = brandColors[Math.floor(Math.random() * brandColors.length)];
          bg.setColors(newPalette);
        };

        document.body.addEventListener('click', handleClick);

        cleanup = () => {
          document.body.removeEventListener('click', handleClick);
          if (bg && bg.dispose) {
            bg.dispose();
          }
        };
      } catch (error) {
        console.error('Failed to load swarm background:', error);
        setPhase('ready');
        setUIVisible(true);
      }
    };

    initSwarm();

    return () => cleanup();
  }, [setPhase, setUIVisible]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        touchAction: 'pan-up',
      }}
    />
  );
}

/**
 * Utility: Convert HSL to Hex color
 */
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return parseInt(`${f(0)}${f(8)}${f(4)}`, 16);
}

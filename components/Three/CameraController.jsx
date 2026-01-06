'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { useAnimationState } from '@/hooks/useAnimationState';
import { useMouseParallax } from '@/hooks/useMouseParallax';
import { ANIMATION } from '@/lib/constants';

/**
 * CameraController - Handles cinematic intro animation and idle parallax.
 * Uses GSAP for the intro timeline and useFrame for smooth parallax.
 */
export function CameraController({ enableParallax = true, parallaxIntensity = 0.5 }) {
  const { camera } = useThree();
  const timelineRef = useRef(null);
  const cameraPositionRef = useRef({ x: 0, y: 0, z: 0 });
  
  const phase = useAnimationState((state) => state.phase);
  const setPhase = useAnimationState((state) => state.setPhase);
  const setIntroComplete = useAnimationState((state) => state.setIntroComplete);
  const setUIVisible = useAnimationState((state) => state.setUIVisible);
  
  const mouse = useMouseParallax(enableParallax && phase === 'idle', 0.05);
  
  // Base camera position after intro
  const basePosition = useRef(new THREE.Vector3(
    ANIMATION.cameraEnd.x,
    ANIMATION.cameraEnd.y,
    ANIMATION.cameraEnd.z
  ));

  // Initialize camera position
  useEffect(() => {
    const startX = ANIMATION.cameraStart.x;
    const startY = ANIMATION.cameraStart.y;
    const startZ = ANIMATION.cameraStart.z;
    
    cameraPositionRef.current = { x: startX, y: startY, z: startZ };
  }, []);

  // GSAP intro timeline
  useEffect(() => {
    // Small delay to ensure everything is mounted
    const timer = setTimeout(() => {
      setPhase('intro');
      
      const tl = gsap.timeline({
        onComplete: () => {
          setPhase('idle');
          setIntroComplete(true);
        },
      });

      // Phase 1: Hold close-up briefly
      tl.to(cameraPositionRef.current, {
        duration: 0.5,
        ease: 'power2.inOut',
      });

      // Phase 2: Fast dolly zoom out
      tl.to(cameraPositionRef.current, {
        x: ANIMATION.cameraEnd.x,
        y: ANIMATION.cameraEnd.y * 0.5,
        z: ANIMATION.cameraEnd.z * 0.6,
        duration: ANIMATION.introDuration * 0.6,
        ease: 'power2.out',
        onStart: () => {
          setPhase('formation');
          setUIVisible(true);
        },
      });

      // Phase 3: Settle into final position with upward tilt
      tl.to(cameraPositionRef.current, {
        x: ANIMATION.cameraEnd.x,
        y: ANIMATION.cameraEnd.y,
        z: ANIMATION.cameraEnd.z,
        duration: ANIMATION.introDuration * 0.4,
        ease: 'power2.out',
      });

      timelineRef.current = tl;
    }, 500);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [setPhase, setIntroComplete, setUIVisible]);

  // Update camera position every frame
  useFrame(() => {
    const pos = cameraPositionRef.current;
    
    if (phase === 'idle' && enableParallax) {
      // Apply mouse parallax offset
      const targetX = basePosition.current.x + mouse.x * parallaxIntensity * 2;
      const targetY = basePosition.current.y + mouse.y * parallaxIntensity;
      
      pos.x = THREE.MathUtils.lerp(pos.x, targetX, 0.02);
      pos.y = THREE.MathUtils.lerp(pos.y, targetY, 0.02);
    }
    
    // Apply position to camera
    camera.position.set(pos.x, pos.y, pos.z);
    
    // Keep looking at center
    camera.lookAt(0, phase === 'idle' ? 2 : 0, 0);
  });

  return null;
}

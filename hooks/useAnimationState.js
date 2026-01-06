'use client';

import { create } from 'zustand';

/**
 * Global animation state store using Zustand.
 * Manages the current phase of the intro animation.
 */
export const useAnimationState = create((set) => ({
  phase: 'loading', // loading | intro | formation | idle
  introComplete: false,
  uiVisible: false,
  
  setPhase: (phase) => set({ phase }),
  setIntroComplete: (complete) => set({ introComplete: complete }),
  setUIVisible: (visible) => set({ uiVisible: visible }),
  
  // Convenience method to progress through phases
  nextPhase: () => set((state) => {
    const phases = ['loading', 'intro', 'formation', 'idle'];
    const currentIndex = phases.indexOf(state.phase);
    const nextIndex = Math.min(currentIndex + 1, phases.length - 1);
    return { 
      phase: phases[nextIndex],
      introComplete: nextIndex >= 3,
      uiVisible: nextIndex >= 2,
    };
  }),
}));

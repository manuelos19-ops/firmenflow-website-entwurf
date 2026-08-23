'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useSplitText(
  options: {
    type?: 'words' | 'chars';
    duration?: number;
    stagger?: number;
    delay?: number;
    y?: number;
    ease?: string;
    start?: string;
  } = {}
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !ref.current) return;

    const {
      type = 'words',
      duration = 0.8,
      stagger = 0.05,
      delay = 0,
      y = 40,
      ease = 'power3.out',
      start = 'top 85%',
    } = options;

    const el = ref.current;
    const text = el.textContent || '';
    
    if (type === 'words') {
      const words = text.split(' ');
      el.innerHTML = words
        .map((word) => `<span class="inline-block overflow-hidden"><span class="split-word inline-block">${word}</span></span>`)
        .join(' ');

      const splitWords = el.querySelectorAll('.split-word');
      gsap.fromTo(
        splitWords,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    } else {
      const chars = text.split('');
      el.innerHTML = chars
        .map((char) =>
          char === ' '
            ? ' '
            : `<span class="inline-block overflow-hidden"><span class="split-char inline-block">${char}</span></span>`
        )
        .join('');

      const splitChars = el.querySelectorAll('.split-char');
      gsap.fromTo(
        splitChars,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger: stagger * 0.5,
          delay,
          ease,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === el) trigger.kill();
      });
      // Text wiederherstellen
      el.textContent = text;
    };
  }, [options]);

  return ref;
}

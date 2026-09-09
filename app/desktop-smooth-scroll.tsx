'use client';

import { useEffect } from 'react';

const desktopPointerQuery =
  '(min-width: 1001px) and (hover: hover) and (pointer: fine)';

export function DesktopSmoothScroll() {
  useEffect(() => {
    const desktopPointer = window.matchMedia(desktopPointerQuery);
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let instance: { destroy: () => void } | null = null;
    let generation = 0;
    let disposed = false;

    const sync = async () => {
      const currentGeneration = ++generation;
      const shouldRun = desktopPointer.matches && !reducedMotion.matches;

      if (!shouldRun) {
        instance?.destroy();
        instance = null;
        document.documentElement.removeAttribute('data-smooth-scroll');
        return;
      }
      if (instance) return;

      const { default: Lenis } = await import('lenis');
      if (
        disposed ||
        currentGeneration !== generation ||
        !desktopPointer.matches ||
        reducedMotion.matches
      )
        return;

      instance = new Lenis({
        autoRaf: true,
        anchors: true,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
        respectReducedMotion: true,
        stopInertiaOnNavigate: true,
        prevent: (node) =>
          Boolean(
            node.closest(
              '[data-slot="dialog-content"], .tour-features, .destination-options',
            ),
          ),
      });
      document.documentElement.dataset.smoothScroll = 'lenis';
    };

    void sync();
    desktopPointer.addEventListener('change', sync);
    reducedMotion.addEventListener('change', sync);

    return () => {
      disposed = true;
      generation += 1;
      desktopPointer.removeEventListener('change', sync);
      reducedMotion.removeEventListener('change', sync);
      instance?.destroy();
      document.documentElement.removeAttribute('data-smooth-scroll');
    };
  }, []);

  return null;
}

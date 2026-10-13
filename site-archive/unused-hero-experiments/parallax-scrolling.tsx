'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** The supplied four-plane scroll choreography, scoped to this hero only. */
export function ParallaxComponent({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let dispose: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('@studio-freight/lenis')]).then(([animation, scroll, smooth]) => {
      if (cancelled || !root.current) return;
      const gsap = animation.gsap, ScrollTrigger = scroll.ScrollTrigger, Lenis = smooth.default;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const host = root.current;
        if (!host) return;
        const layers = host.querySelector<HTMLElement>('[data-parallax-layers]');
        if (!layers) return;
        const context = gsap.context(() => {
          const timeline = gsap.timeline({ scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true } });
          [{ layer: 1, yPercent: 70 }, { layer: 2, yPercent: 55 }, { layer: 3, yPercent: 40 }, { layer: 4, yPercent: 10 }].forEach(({ layer, yPercent }) => {
            timeline.to(layers.querySelectorAll(`[data-parallax-layer="${layer}"]`), { yPercent, ease: 'none' }, 0);
          });
        }, host);
        const lenis = new Lenis({ smoothWheel: true, syncTouch: false });
        const update = () => ScrollTrigger.update();
        const tick = (time: number) => { if (!document.hidden) lenis.raf(time * 1000); };
        lenis.on('scroll', update);
        gsap.ticker.add(tick);
        const visibility = () => { if (document.hidden) lenis.stop(); else lenis.start(); };
        document.addEventListener('visibilitychange', visibility);
        return () => {
          document.removeEventListener('visibilitychange', visibility);
          gsap.ticker.remove(tick);
          lenis.off('scroll', update);
          lenis.destroy();
          context.revert();
        };
      });
      dispose = () => media.revert();
    }).catch(error => { console.warn('Parallax unavailable; using the static hero.', error); });
    return () => { cancelled = true; dispose?.(); };
  }, []);
  return <div className="learning-parallax" ref={root}>{children}</div>;
}

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { geoOrthographic, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import atlas from 'world-atlas/countries-110m.json';

// Adapted from the user's ContactWithGlobe component. Reuse the real enquiry form.
export function ContactGlobe() {
  const root = useRef<HTMLDivElement>(null), svg = useRef<SVGSVGElement>(null);
  const rotation = useRef([-83, -18]), drag = useRef<{ x: number; y: number } | null>(null);
  const [paused, setPaused] = useState(false), reduced = useReducedMotion();
  const redraw = useRef(() => {});
  useEffect(() => {
    if (!svg.current || !root.current) return;
    const element = svg.current;
    const projection = geoOrthographic().scale(178).translate([200, 200]).precision(.6);
    const path = geoPath(projection);
    const countries = feature(atlas, atlas.objects.countries).features;
    const shapes = [geoGraticule10(), ...countries, { type: 'Sphere' }];
    const nodes = shapes.map((_, index) => {
      const node = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      node.setAttribute('fill', 'none'); node.setAttribute('stroke', 'currentColor');
      node.setAttribute('stroke-width', index === shapes.length - 1 ? '1' : '.65');
      node.setAttribute('opacity', index === 0 ? '.16' : '.65');
      element.appendChild(node); return node;
    });
    const draw = () => { projection.rotate(rotation.current); nodes.forEach((node, index) => node.setAttribute('d', path(shapes[index]) || '')); };
    redraw.current = draw;
    let raf = 0, inView = false, last = 0;
    const stop = () => { cancelAnimationFrame(raf); raf = 0; last = 0; };
    const tick = (time: number) => {
      if (last && time - last >= 33) {
        if (!drag.current) rotation.current[0] += Math.min(time - last, 100) * .009;
        draw(); last = time;
      } else if (!last) last = time;
      raf = requestAnimationFrame(tick);
    };
    const sync = () => { stop(); if (inView && !document.hidden && !paused && !reduced) raf = requestAnimationFrame(tick); };
    draw();
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); });
    observer.observe(root.current); document.addEventListener('visibilitychange', sync);
    return () => { stop(); observer.disconnect(); document.removeEventListener('visibilitychange', sync); nodes.forEach(node => node.remove()); redraw.current = () => {}; };
  }, [paused, reduced]);
  return <div className="contact-globe" ref={root}>
    <div className="contact-globe-drawing" tabIndex={0} role="group" aria-label="Interactive world globe. Use arrow keys or drag to rotate." onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault(); rotation.current[0] += event.key === 'ArrowLeft' ? -8 : event.key === 'ArrowRight' ? 8 : 0;
      rotation.current[1] = Math.max(-80, Math.min(80, rotation.current[1] + (event.key === 'ArrowUp' ? 8 : event.key === 'ArrowDown' ? -8 : 0))); redraw.current();
    }} onPointerDown={event => { if (event.pointerType === 'mouse' && event.button !== 0) return; drag.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={event => {
      if (!drag.current) return;
      rotation.current[0] += (event.clientX - drag.current.x) * .45;
      rotation.current[1] = Math.max(-80, Math.min(80, rotation.current[1] - (event.clientY - drag.current.y) * .45));
      drag.current = { x: event.clientX, y: event.clientY }; redraw.current();
    }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
      <svg ref={svg} viewBox="0 0 400 400" aria-hidden="true"/>
    </div>
    <div className="contact-globe-controls"><span>Visakhapatnam, India · Drag to explore</span>{!reduced && <button type="button" aria-label={paused ? 'Resume globe rotation' : 'Pause globe rotation'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>}</div>
  </div>;
}

export default function ContactWithGlobe({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <section id="contact-form" className="contact-section contact-with-globe section-pad"><div className="wrap">
    <motion.div className="globe-contact-heading" initial={false} animate={{ y: 0 }}><a href="/">Home</a><h1>Let’s talk<em>.</em></h1><p>Tell us what your people need. Let’s find the right learning experience together.</p></motion.div>
    <motion.div initial={reduced ? false : { y: 16 }} animate={{ y: 0 }} transition={{ duration: .6, ease: [.16, 1, .3, 1] }} className="contact-grid">{children}</motion.div>
  </div></section>;
}

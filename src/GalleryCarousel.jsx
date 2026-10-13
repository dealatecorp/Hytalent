import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react';
import { SmartImage } from './ui.jsx';

// Native Motion adaptation of 21st's photographic deck/lens carousel patterns.
export default function GalleryCarousel({ images, label, onOpen }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const thumbnails = useRef(null);
  const swipeUntil = useRef(0);
  function select(index) {
    const next = (index + images.length) % images.length;
    setActive(next);
    const item = thumbnails.current?.children[next];
    if (item) thumbnails.current.scrollTo({ left: item.offsetLeft - thumbnails.current.clientWidth / 2 + item.clientWidth / 2, behavior: reduced ? 'instant' : 'smooth' });
  }
  return <div className="session-carousel" role="region" aria-roledescription="carousel" aria-label="HYtalent session photographs" tabIndex={0} onKeyDown={event => {
    const keys = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: images.length - 1 };
    if (event.key in keys) { event.preventDefault(); select(keys[event.key]); }
  }}>
    <div className="session-carousel-top"><span className="hero-eyebrow">The session edit</span><span>Drag to explore · Select to enlarge</span></div>
    <motion.div className="session-deck" onPanEnd={(_, info) => { if (Math.abs(info.offset.x) > 45) { swipeUntil.current = performance.now() + 300; select(active + (info.offset.x < 0 ? 1 : -1)); } }}>
      {[-2, -1, 0, 1, 2].map(offset => {
        const index = (active + offset + images.length) % images.length;
        return <motion.button key={images[index]} type="button" className={'session-print ' + (offset === 0 ? 'is-current' : '')} initial={false}
          animate={{ x: `${offset * 66}%`, scale: offset === 0 ? 1 : Math.abs(offset) === 1 ? .78 : .6, rotate: offset * 5, opacity: Math.abs(offset) === 2 ? .28 : 1, zIndex: 5 - Math.abs(offset) }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 190, damping: 27 }}
          tabIndex={offset === 0 ? 0 : -1} aria-label={offset === 0 ? 'Enlarge ' + label(index) : 'Select ' + label(index)}
          onClick={() => { if (performance.now() >= swipeUntil.current) offset === 0 ? onOpen(index) : select(index); }}>
          <SmartImage src={images[index]} alt={label(index)} sizes="(max-width:700px) 80vw, 650px" eager={offset === 0}/>
          <span>{String(index + 1).padStart(2, '0')}<span>{offset === 0 ? <Expand size={17}/> : 'View'}</span></span>
        </motion.button>;
      })}
    </motion.div>
    <div className="session-controls"><button aria-label="Previous session photo" onClick={() => select(active - 1)}><ArrowLeft size={21}/></button><p aria-live="polite" aria-atomic="true"><strong>{label(active)}</strong><span>{String(active + 1).padStart(2, '0')} / {images.length}</span></p><button aria-label="Next session photo" onClick={() => select(active + 1)}><ArrowRight size={21}/></button></div>
    <div className="session-thumbnails" ref={thumbnails} aria-label="Choose a session photograph">{images.map((src, index) => <button key={src} aria-label={'Show ' + label(index)} aria-current={index === active ? 'true' : undefined} onClick={() => select(index)}><SmartImage src={src} alt="" sizes="80px"/><span>{index + 1}</span></button>)}</div>
  </div>;
}

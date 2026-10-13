import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'motion/react';
import { X, ImageOff } from 'lucide-react';
import manifest from './media-manifest.json';
import logoManifest from './logo-manifest.json';

export function SmartImage({ src, alt, eager = false, sizes = '(max-width: 700px) 100vw, 50vw', ...props }) {
  const asset = logoManifest[src] || manifest[src];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => { setLoaded(false); setFailed(false); }, [src]);
  if (!asset || failed) return <span className="image-unavailable" role="img" aria-label={alt || 'Photograph unavailable'}><ImageOff size={24} /><span>Image unavailable</span></span>;
  return <img {...props} src={asset.src} srcSet={asset.srcSet} sizes={sizes} alt={alt} width={asset.width} height={asset.height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" className={`${props.className || ''} ${loaded ? 'image-loaded' : 'image-loading'}`} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />;
}

export function Modal({ title, children, onClose, className = '', onKeyDown }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    const dialog = ref.current;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    (dialog.querySelector('input') || dialog.querySelector('button, a'))?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return createPortal(<dialog ref={ref} data-lenis-prevent aria-label={title} className={`native-modal ${className}`} onCancel={event => { event.preventDefault(); closeRef.current(); }} onKeyDown={onKeyDown} onClick={event => { if (event.target === ref.current) closeRef.current(); }}><div className="modal-content"><button className="modal-close" aria-label={`Close ${title}`} onClick={onClose}><X size={23} /></button>{children}</div></dialog>, document.body);
}

export function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .6, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}

export function usePageVisible() {
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => { const update = () => setVisible(!document.hidden); document.addEventListener('visibilitychange', update); return () => document.removeEventListener('visibilitychange', update); }, []);
  return visible;
}

export const slug = text => String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

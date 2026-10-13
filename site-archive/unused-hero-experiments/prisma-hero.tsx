import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef, useState, type CSSProperties } from 'react';
import { ParallaxComponent } from './parallax-scrolling';

const messages = ['Bring out the leader in you.', 'Move from where you are to where you want to be.', 'Better work begins with better learning.'];

export function WordsPullUp({ text, className = '', style }: { text: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true }), reduced = useReducedMotion();
  return <span ref={ref} className={'prisma-words ' + className} style={style}>{text.split(' ').map((word, i) => <motion.span key={word + i} initial={reduced ? false : { y: 20, opacity: 0 }} animate={visible ? { y: 0, opacity: 1 } : {}} transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : i * .08, ease: [.16, 1, .3, 1] }}>{word}{' '}</motion.span>)}</span>;
}

export function PrismaHero() {
  const [message, setMessage] = useState(0);
  return <section className="prisma-hero learning-hero" aria-label="HYtalent learning and development">
    <ParallaxComponent><div className="prisma-stage" data-parallax-layers>
      <div className="learning-sky" data-parallax-layer="1" aria-hidden="true"/>
      <div className="learning-horizon" data-parallax-layer="2" aria-hidden="true"/>
      <h1 className="learning-wordmark" data-parallax-layer="3"><WordsPullUp text="HYtalent"/></h1>
      <div className="learning-workshop" data-parallax-layer="4"><img src="/media/hytalent-learning-workshop-v1.webp" width="1536" height="1024" fetchPriority="high" alt="Conceptual illustration of a facilitator guiding professionals through an interactive learning workshop"/></div>
      <div className="prisma-content">
        <div className="prisma-title"><p>Learning that moves<br/>people forward.</p></div>
        <div className="prisma-copy">
          <p className="prisma-opening">It’s time to prepare for new beginnings.</p>
          <p className="prisma-message" aria-live="polite">{messages[message]}</p>
          <div className="prisma-message-controls" aria-label="Hero messages">{['Leadership', 'Your next step', 'Better learning'].map((label, i) => <button key={label} aria-pressed={message === i} onClick={() => setMessage(i)}>{label}</button>)}</div>
          <div className="prisma-actions"><a className="prisma-cta" href="/training-programs/">Explore programs<span><ArrowRight size={20}/></span></a><a className="prisma-story" href="/about/">Our story<ArrowUpRight size={18}/></a></div>
          <div className="prisma-audiences"><a href="/training-programs/?audience=organizations">For organizations<ArrowUpRight size={13}/></a><a href="/training-programs/?audience=early-career">For students & new joiners<ArrowUpRight size={13}/></a></div>
        </div>
      </div>
    </div></ParallaxComponent>
  </section>;
}

import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import MurmurationWordmark from './components/ui/murmuration-wordmark.tsx';

const statements = ['Bring out the leader in you.', 'Move from where you are to where you want to be.', 'Better work begins with better learning.'];

export default function HomeHero() {
  const [message, setMessage] = useState(0);
  return <section className="murmuration-hero" aria-label="HYtalent learning and development">
    <MurmurationWordmark word="HYtalent" birds={4200} flyFor={3} holdFor={5} reeds={false}
      palette={{ skyTop: '#dce6d5', skyLow: '#f4f5ed', sun: '#fff9e8', ink: '#123036' }}
      fontFamily='"Manrope", sans-serif' height="clamp(740px, 100svh, 940px)">
      <div className="flock-copy wrap">
        <div className="flock-heading"><h1>Learning that moves<br/><em>people forward.</em></h1><p>It’s time to prepare for new beginnings.</p></div>
        <div className="flock-actions">
          <p className="flock-statement" aria-live="polite">{statements[message]}</p>
          <div className="flock-message-controls" aria-label="Hero messages">{['Leadership', 'Your next step', 'Better learning'].map((label, i) => <button key={label} type="button" onClick={() => setMessage(i)} aria-label={'Show hero message ' + (i + 1) + ': ' + label} aria-pressed={message === i}>{label}</button>)}</div>
          <div className="flock-buttons"><a className="button button-dark" href="/training-programs/">Explore programs<ArrowUpRight size={18}/></a><a className="arrow-link" href="/about/">Our story<ArrowRight size={17}/></a></div>
          <div className="flock-audiences"><a href="/training-programs/?audience=organizations">For organizations<ArrowUpRight size={14}/></a><a href="/training-programs/?audience=early-career">For students & new joiners<ArrowUpRight size={14}/></a></div>
        </div>
      </div>
    </MurmurationWordmark>
  </section>;
}

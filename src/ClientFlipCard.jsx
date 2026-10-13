import { useState } from 'react';
import { Expand, RotateCcw } from 'lucide-react';
import { SmartImage } from './ui.jsx';

// React adaptation of the user-supplied Inspira UI front/back interaction.
export default function ClientFlipCard({ src, name, onOpen }) {
  const [pinned, setPinned] = useState(false), [hovered, setHovered] = useState(false);
  const flipped = pinned || hovered;
  return <article className={'client-flip ' + (flipped ? 'is-flipped' : '')} onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}>
    <button className="client-flip-toggle" aria-pressed={flipped} aria-label={(flipped ? 'Show logo for ' : 'Show details for ') + name} onClick={() => { setPinned(!flipped); setHovered(false); }}>
      <span className="client-flip-inner"><span className="client-flip-front" aria-hidden={flipped}><SmartImage src={src} alt="" sizes="220px"/><strong>{name}</strong><small>Hover or select to flip <RotateCcw size={13}/></small></span><span className="client-flip-back" aria-hidden={!flipped}><span>HYtalent / Client collection</span><strong>{name}</strong><p>This organization’s logo is featured in HYtalent’s original client collection.</p><small>Flip back <RotateCcw size={15}/></small></span></span>
    </button>
    <button className="client-logo-open" onClick={onOpen} aria-label={'Enlarge ' + name + ' logo'}>Enlarge logo<Expand size={14}/></button>
  </article>;
}

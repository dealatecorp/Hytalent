import { useState } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { ArrowDown, ArrowUpRight, Compass, MessagesSquare, HeartHandshake, Layers } from 'lucide-react';
import { categories, normalizePath, pageByPath, programs } from './content.js';
import { media, clientImages } from './site-data.js';
import { benefitFor } from './program-meta.js';
import { SmartImage } from './ui.jsx';

const themes = {
  leadership: { word: 'Lead', icon: Compass, note: 'Develop the people who move your organization forward.' },
  communication: { word: 'Connect', icon: MessagesSquare, note: 'Make every conversation, meeting and collaboration count.' },
  culture: { word: 'Care', icon: HeartHandshake, note: 'Build a workplace where people can do their best work.' },
  organization: { word: 'Build', icon: Layers, note: 'Give people and processes a stronger foundation.' },
};
function Breadcrumb({ program }) { return <nav className="destination-crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span>{program ? <a href="/training-programs/">Programs</a> : <span>HYtalent</span>}</nav>; }
function Jump({ href, children }) { return <a className="destination-jump" href={href}>{children}<ArrowDown size={18}/></a>; }
function ThemesHero({ title, summary }) {
  const [selected, setSelected] = useState(categories[0].id);
  return <section className="destination-hero theme-destination"><div className="wrap"><Breadcrumb/><div className="destination-heading"><h1>{title}<em>.</em></h1><p>{summary}</p></div><div className="theme-panels">{categories.map((category, index) => {
    const info = themes[category.id], Icon = info.icon, items = programs.filter(p => p.category === category.id), active = selected === category.id;
    return <motion.div layout className={'theme-panel theme-' + category.id + (active ? ' expanded' : '')} key={category.id} transition={{ duration: .35 }}><button className="theme-panel-pick" onClick={() => setSelected(category.id)} aria-expanded={active} aria-controls={'theme-content-' + category.id}><Icon size={25}/><strong>{info.word}</strong><small>{category.label}</small></button><div id={'theme-content-' + category.id} hidden={!active} className="theme-panel-content"><p>{info.note}</p><a href={'/training-programs/?theme=' + category.id + '#program-collection'}>Explore {items.length} programs<ArrowUpRight size={20}/></a></div></motion.div>;
  })}</div><Jump href="#program-collection">Browse the complete collection</Jump></div></section>;
}
function ProgramHero({ page, image }) {
  const theme = themes[page.category] || themes.organization, Icon = theme.icon;
  return <section className={'destination-hero program-destination theme-' + page.category}><div className="wrap"><Breadcrumb program/><div className="program-opening"><div className="program-opening-copy"><h1>{page.title}<em>.</em></h1><p>{benefitFor(page)}</p><div className="destination-actions"><Jump href="#program-outline">Read the program outline</Jump><a href={'/contact-us/?program=' + encodeURIComponent(page.title)}>Enquire<ArrowUpRight size={18}/></a></div></div><div className="program-opening-art"><span className="program-theme-word" aria-hidden="true">{theme.word}</span><SmartImage src={image} alt="" eager sizes="(max-width:700px) 90vw, 50vw"/><span className="program-photo-caption">HYtalent / {page.categoryName}</span></div></div></div></section>;
}
function GalleryHero({ title, summary }) {
  const images = pageByPath['/gallery/'].images;
  return <section className="destination-hero gallery-destination"><div className="wrap"><Breadcrumb/><div className="gallery-opening"><div className="destination-heading"><h1>{title}<em>.</em></h1><p>{summary}</p><Jump href="#gallery-collection">Explore all {images.length} photographs</Jump></div><div className="hero-photo-mosaic">{[0, 4, 8].map((index, i) => <motion.a key={index} href="#gallery-collection" whileHover={{ y: -8, rotate: 0 }} className={'mosaic-print mosaic-' + i}><SmartImage src={images[index]} alt={'HYtalent learning session ' + (index + 1)} eager sizes="(max-width:700px) 45vw, 28vw"/><span>Learning / Together / HYtalent</span></motion.a>)}</div></div></div></section>;
}
function ContactHero({ title, summary }) {
  const x = useMotionValue(50), y = useMotionValue(50), light = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, rgba(184,213,145,.2), transparent 55%)`;
  return <section className="destination-hero contact-destination"><div className="wrap"><Breadcrumb/><motion.div className="contact-opening" style={{ backgroundImage: light }} onPointerMove={event => { const box = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - box.left) / box.width * 100); y.set((event.clientY - box.top) / box.height * 100); }}><div className="destination-heading"><h1>{title}<em>.</em></h1><p>{summary}</p><Jump href="#contact-form">Tell us what you have in mind</Jump></div><div className="contact-direct"><span>Reach HYtalent directly</span><a href="mailto:admin@hytalent.in">admin@hytalent.in<ArrowUpRight size={20}/></a><a href="tel:+917075449556">+91 7075 449 556<ArrowUpRight size={20}/></a><p>Visakhapatnam<br/>Andhra Pradesh, India</p></div></motion.div></div></section>;
}
export default function RouteHero({ title, summary, image }) {
  const path = normalizePath(window.location.pathname), page = pageByPath[path];
  if (page?.isProgram) return <ProgramHero page={page} image={image}/>;
  if (path === '/training-programs/') return <ThemesHero title={title} summary={summary}/>;
  if (path === '/gallery/') return <GalleryHero title={title} summary={summary}/>;
  if (path === '/contact-us/') return <ContactHero title={title} summary={summary}/>;
  if (path === '/about/') return <section className="destination-hero about-destination"><div className="wrap"><Breadcrumb/><div className="about-opening"><div className="destination-heading"><h1>Learning,<br/><em>made personal.</em></h1><p>{summary}</p><Jump href="#our-approach">Get to know HYtalent</Jump></div><div className="about-opening-photo"><SmartImage src={pageByPath['/gallery/'].images[4]} alt="A HYtalent learning session" eager sizes="(max-width:700px) 90vw, 50vw"/><span>Understanding people.<br/>Unlocking potential.</span></div></div></div></section>;
  if (path === '/gallery-cloned-1261/') return <section className="destination-hero clients-destination"><div className="wrap"><Breadcrumb/><div className="clients-opening"><div className="destination-heading"><h1>The company<br/><em>we keep.</em></h1><p>{summary}</p><Jump href="#client-collection">View the published client collection</Jump></div><div className="client-constellation"><span className="constellation-label">HYtalent<br/><small>Learning & development</small></span>{clientImages.slice(0, 6).map((src, index) => <motion.div className={'constellation-logo logo-position-' + index} key={src} whileHover={{ scale: 1.08, rotate: 0 }}><SmartImage src={src} alt="" sizes="140px"/></motion.div>)}</div></div></div></section>;
  if (path === '/blog/') return <section className="destination-hero blog-destination"><div className="wrap"><Breadcrumb/><h1>Ideas worth<br/><em>sharing.</em></h1><div className="blog-opening-bottom"><p>There are no published blog entries yet. Until then, follow your curiosity into a learning theme.</p><div>{categories.map(c => <a key={c.id} href={'/training-programs/?theme=' + c.id}>{c.label}<ArrowUpRight size={17}/></a>)}</div></div></div></section>;
  return <section className="destination-hero reading-destination"><div className="wrap"><Breadcrumb/><h1>{title}<em>.</em></h1>{summary && <p>{summary}</p>}<Jump href={path.includes('category') ? '#program-collection' : '#document-start'}>Continue reading</Jump></div></section>;
}

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowUpRight, Compass, HeartHandshake, MessagesSquare, Network } from 'lucide-react';
import { categories, programs } from './content.js';

// Matching cubic segments let the outline genuinely morph between theme states.
const themes = [
  { word: 'Lead', meaning: 'An upward arrow for direction and progress.', color: '#4c713f', ink: '#ffffff', Icon: Compass, shape: 'M250 35 C267 35 392 156 419 184 C440 210 411 219 366 219 C366 265 366 363 366 398 C366 423 346 432 320 432 C279 432 221 432 180 432 C154 432 134 423 134 398 C134 350 134 265 134 219 C89 219 60 210 81 184 C108 156 233 35 250 35 Z' },
  { word: 'Connect', meaning: 'A speech bubble for conversation and collaboration.', color: '#d9ae59', ink: '#123036', Icon: MessagesSquare, shape: 'M250 67 C340 67 433 76 433 161 C433 208 433 279 433 308 C433 371 374 379 312 379 C276 379 212 379 192 379 C168 401 119 431 94 438 C112 402 118 376 119 362 C69 347 67 325 67 275 C67 242 67 192 67 161 C67 76 160 67 250 67 Z' },
  { word: 'Belong', meaning: 'A heart for care, inclusion and wellbeing.', color: '#b2cd83', ink: '#123036', Icon: HeartHandshake, shape: 'M250 126 C293 62 364 59 405 94 C454 133 451 198 419 249 C396 290 361 328 324 363 C298 389 268 418 250 435 C232 418 202 389 176 363 C139 328 104 290 81 249 C49 198 46 133 95 94 C115.5 76.5 143.5 68.5 169.5 83.125 C195.5 97.75 228.5 94 250 126 Z' },
  { word: 'Build', meaning: 'Connected nodes for people, teams and HR systems.', color: '#22494c', ink: '#ffffff', Icon: Network, shape: 'M250 108 C304 108 343 130 367 171 C385 201 392 225 392 250 C392 294 375 331 343 357 C316 380 283 392 250 392 C217 392 184 380 157 357 C125 331 108 294 108 250 C108 204 125 166 157 141 C170.5 130 185.5 121.75 201.25 116.25 C217 110.75 233.5 108 250 108 Z' },
];

export default function LearningBlob({ selected }) {
  const reduced = useReducedMotion();
  const pointerX = useMotionValue(0), pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 110, damping: 17 });
  const y = useSpring(pointerY, { stiffness: 110, damping: 17 });
  const theme = themes[selected], category = categories[selected], Icon = theme.Icon;
  const matches = programs.filter(program => program.category === category.id);
  function move(event) {
    if (reduced || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 36);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 28);
  }
  return <div className="learning-visual">
    <div className="blob-stage" onPointerMove={move} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <motion.div className="blob-body" style={reduced ? undefined : { x, y }}>
        <svg viewBox="0 0 500 500" aria-hidden="true">
          <motion.g initial={false} animate={{ opacity: selected === 3 ? 1 : 0 }} transition={{ duration: reduced ? 0 : .35 }}>
            <path d="M250 140 V52 M140 250 H52 M360 250 H448 M250 360 V448" stroke={theme.color} strokeWidth="5" fill="none" />
            {[ [250,48], [48,250], [452,250], [250,452] ].map(([cx,cy]) => <circle key={cx+':'+cy} cx={cx} cy={cy} r="25" fill={theme.color} />)}
          </motion.g>
          <motion.path initial={false} animate={{ d: theme.shape, fill: theme.color }} transition={{ duration: reduced ? 0 : .8, ease: [.22, 1, .36, 1] }} />
        </svg>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={category.id} className="blob-label" style={{ color: theme.ink }} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduced ? 0 : .2 }}>
            <Icon size={42} strokeWidth={1.4} aria-hidden="true" /><strong>{theme.word}</strong><span>{matches.length} programs to explore</span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
    <div className="pathway-preview" aria-live="polite" aria-atomic="true">
      <span className="shape-meaning">{theme.meaning}</span>
      <span>Start with {category.label.toLowerCase()}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={category.id} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: reduced ? 0 : .18 }}>
          {matches.slice(0, 2).map(program => <a key={program.path} href={program.path}>{program.title}<ArrowUpRight size={18} aria-hidden="true" /></a>)}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
}

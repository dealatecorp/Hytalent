# HYtalent UI improvement audit and motion roadmap

Implementation is now tracked in [UI-IMPLEMENTATION-STATUS.md](UI-IMPLEMENTATION-STATUS.md).

Reviewed 13 October 2026 against the local React/Vite recreation (`src/App.jsx`, `src/styles.css`, `src/content.js`) and its 38-page [source inventory](site-archive/SITE-MAP.md). This is a proposal, not a claim that the listed components have been installed. The current website already has a sticky header, mega menu, mobile menu, search, flip cards, animated hero copy, carousels, filters, gallery lightboxes and responsive layouts.

## The direction

Keep the editorial HYtalent identity: warm paper, deep teal typography, lime accents, strong photography and useful motion. Make the work feel more human and less like a collection of effects. Let people quickly answer three questions: **What does HYtalent offer? Which program fits us? How do we enquire?** Use Motion (the current name of Framer Motion) to choreograph those answers, not to make every element move.

The full-width blue/teal image tints were removed in this pass. Home now uses an untinted photograph beside a separate light reading surface; inner-page hero photos and service-card photos also show their natural color. Small neutral-black caption plates remain where text needs contrast.

## Priority 0 — fix before adding more animation

| Area | Current observation | Recommended change | Why |
| --- | --- | --- | --- |
| Enquiry | The contact form opens a prepared `mailto:` message; the site cannot confirm that it was sent. | If a backend is approved, add a real form endpoint, inline validation, sending/success/error states, spam protection and an accessible confirmation. Until then, keep the current wording explicit. | The primary conversion path must be trustworthy. |
| Source copy | Several archived program pages appear to have takeaways copied from other programs (for example, Time Management lists team-building takeaways). | Conduct a content-owner review against the [page captures](site-archive/pages) before changing facts. Keep a correction log and retain original text separately. | Motion cannot compensate for inaccurate training details. |
| Media independence | Photos and logos are hotlinked to `hytalent.in`. | Obtain permission and host optimized local copies with descriptive `alt`, dimensions and responsive sources. | Prevent broken visuals and improve speed. |
| Accessibility of overlays | Search is marked as a dialog and gallery as a lightbox, but neither currently traps/restores focus; gallery has no arrow-key navigation. | Add dialog focus management, Escape, previous/next arrow keys, return focus and background scroll lock. | Keyboard and screen-reader visitors need a complete route through the UI. |

## Priority 1 — highest-value visual and UX upgrades

### Shared navigation, search and footer — all 38 routes

- Add a compact **program finder** in the mega menu: audience, challenge and program type, not only four category lists. Keep “All 28 programs” one click away.
- Make the active section unambiguous on detail pages; current nav only highlights exact top-level paths. A subtle animated underline can move between active links.
- Add grouped search results with 5–8 visible suggestions, keyboard up/down selection, Escape, a clear button, and a “View all results” link. Search should include the non-program pages, not only programs.
- On mobile, use staggered but fast menu entry, then stop movement while the menu is open. Add a prominent contact action at the bottom of the drawer; preserve easy back navigation.
- Add a useful footer route cluster for **About / Programs / Gallery / Clients / Contact / Privacy**. Keep legacy archive and ticker links lower priority but available for route completeness.

### Home `/`

- Keep the clean split hero photography. Consider one short, authored reveal of the headline and primary CTA on first load. Replace the automatic 6.5-second message rotation with a user-controlled switch or pause-on-focus/visibility behavior. Keep the headline readable as plain text for reduced motion.
- Give the first screen a clearer “For organizations / For individuals” choice if the offering genuinely serves both groups; link to filtered program views, not a new unverified page.
- The eight flip cards are memorable but require a flip before revealing their purpose. Show program name and one-line value on the front; use the back for a concise outcome. On touch/keyboard, preserve the separate route link and obvious state.
- Replace the same-size eight-card wall with a more varied rhythm: four key capabilities in a magazine-style grid, then the full catalog link. Preserve all eight source links in a secondary index so no service disappears.
- Change the featured program carousel to a **single selected-card + adjacent preview** composition on desktop and a snap carousel on mobile. Keep previous/next controls, touch swipe, keyboard navigation and a visible position counter.
- Treat the client logo rail as supporting trust, not a permanent attention magnet: slow the marquee, pause on hover/focus, and show a static grid with reduced motion.
- The testimonials are long and auto-advance every 8 seconds. Provide pause/play and progress, stop on focus as well as hover, and avoid truncating a quote in a small scroll box.
- Turn the three preserved signup CTAs into a short decision panel (“Leadership skills”, “HRD audit”, “Customer service”) with a plain-language description and clear destination.
- The home gallery should act as a teaser; use one dominant image plus a small set of supporting photos rather than multiple equal thumbnails.

### Program directory `/training-programs/` and `/category/training-programs/`

- Keep the filters and search, but surface **results count and active filters** near the heading. Add a reset control and optional URL query state so filtered results can be shared.
- Add audience, duration or format filters only after those facts exist in the source data. Do not invent metadata to fill an attractive UI.
- Use a focused card style: program title, one clear benefit, category, and a single call to action. The current summaries can be long and visually repetitive.
- Add a sticky “Browse themes” index on wide screens and a compact select/chip row on mobile. Avoid a large filter bar consuming the whole first viewport.
- Add semantic `aria-pressed` or equivalent selected state for filter buttons and a live results announcement for screen readers.

### All 28 program detail routes

- Keep every original heading, paragraph and takeaway. Improve the reading layout with a narrower 65–75 character text measure, stronger section rhythm, optional on-page contents for longer programs, and a clear enquiry summary.
- The hero should state **who the program is for and the outcome** only where verified. Otherwise show the original introductory paragraph without editorial invention.
- Make the “Enquire now” action contextual: prefill the exact program name and keep the enquiry affordance visible as readers move through long content.
- Replace repetitive related-program carousels with 2–3 genuinely related links based on topic, not only the broad current category.
- Add a source/last-reviewed note for content with apparent inconsistencies. Do not silently “fix” legal, POSH or ICC wording without owner approval.

### About `/about/`

- Use a clear editorial timeline or chapter sequence for HYtalent’s mission, founder background and method, sourced from the original copy. Do not portray the workshop photo as a founder portrait.
- Add a short “how an engagement works” sequence only if confirmed by the business; otherwise present its learning principles, not invented steps.
- Use a restrained scroll-linked image crop or section transition; avoid a long pinned timeline that makes the page difficult to skim.

### Gallery `/gallery/` and clients `/gallery-cloned-1261/`

- Keep original images and logos. Add meaningful captions where known, and avoid deriving official client names solely from image filenames.
- Use a masonry or varied gallery grid only if stable image dimensions are available. Keep the lightbox accessible and retain a conventional grid fallback.
- Add image-loading skeletons or aspect-ratio placeholders; loading should not move the page around.
- For clients, present logos at comfortable size and with real accessible names; do not run perpetual grayscale/scale effects across every logo.

### Contact `/contact-us/`

- Shorten the country picker by making it searchable and retaining India as the default. Provide `autocomplete` for name, email and phone and clear required-field hints.
- Remove the duplicate hero contact action if it only scrolls a very short distance; make the hero CTA say “Go to enquiry form” when useful.
- Show direct email/phone beside the form, and make the privacy expectation explicit. If a real backend is added, confirm delivery in-page rather than assuming a mail app opened.

### Blog `/blog/`, policy `/privacy-policy/`, and legacy `/ticker/test/`

- Keep the blog as an honest empty state while the source has no posts. Link to 2–3 relevant programs rather than inventing articles.
- Keep the privacy page plain and highly readable; no decorative motion on legal copy.
- Preserve the ticker/legacy route for completeness but reduce its prominence in the global footer. Do not fabricate fresh content for an old route.

## Priority 2 — motion and component shortlist

The local project is **React 19 + Vite + plain CSS**. The following are references to evaluate, not a plan to install everything. 21st.dev examples often assume Tailwind/Next.js and need adaptation. Inspira UI is **Vue/Nuxt-first**, so its patterns can inspire a React implementation but its source cannot be pasted into this project as-is.

| Experience | Best fit here | Reference | Guardrail |
| --- | --- | --- | --- |
| Hero headline entrance | Motion `motion` with one staggered word/line reveal | [Motion React docs](https://motion.dev/docs/react), [React Bits text catalog](https://reactbits.dev/c/text-animations) | One-time; no text hidden if JS fails; no distracting blur loop. |
| Hero-to-content transition | Subtle media scale/clip on initial scroll, adapted from 21st.dev examples | [21st hero collection](https://21st.dev/community/components/s/hero-section), [Motion scroll guide](https://motion.dev/docs/react-scroll-animations) | Do not hijack scroll or pin the viewport for multiple screens. |
| Program cards | Motion hover/tap elevation and active-card layout transition | [21st animated collection](https://21st.dev/community/components/s/animated), [Motion React docs](https://motion.dev/docs/react) | No hover-only information; test touch and keyboard. |
| Featured carousel | Adapt a light React Bits carousel or retain native scroll-snap with Motion transitions | [React Bits component catalog](https://reactbits.dev/get-started/index) | Prefer native scroll before importing a heavyweight 3D effect. |
| Gallery | Optional accessible curved/circular gallery for a featured subset; standard grid for the full collection | [React Bits circular carousel](https://reactbits.dev/components/circular-carousel), [React Bits component catalog](https://reactbits.dev/get-started/index) | Check keyboard, caption, load, reduced-motion and image licensing. |
| Scroll reveals | Motion `whileInView` for two or three meaningful section reveals | [Motion scroll animations](https://motion.dev/docs/react-scroll-animations) | Avoid identical fade-up on every section. |
| Micro-interactions | Small CTA arrow travel, underline, card focus state | [React Bits animation catalog](https://reactbits.dev/c/animations), [21st components](https://21st.dev/community/components) | Favor clarity over magnetic cursors and glow effects. |
| Inspira visual references | Card stack, gallery and text-motion ideas re-authored for React | [Inspira catalog](https://inspira-ui.com/docs/en/components) | Vue/Nuxt components are not drop-in React dependencies; do not install them here. |
| Optional 3D centerpiece | One lightweight, lazy-loaded interactive “growth/pathways” sculpture or spatial map of training themes | [React Three Fiber introduction](https://r3f.docs.pmnd.rs/), [Canvas API](https://r3f.docs.pmnd.rs/api/canvas) | Only if it clarifies the story; provide a static fallback, defer loading and stop rendering off-screen. |

### Proposed motion choreography

1. **Load (0–900 ms):** unfiltered hero photo arrives; text and CTA reveal in a short sequence. No loading screen.
2. **First scroll:** the services heading enters once, then selected service cards appear in two short clusters. Other body copy remains stable.
3. **Exploration:** hover/focus/tap moves only the active card or carousel selection. Navigation underline tracks the active route; menu opens quickly.
4. **Depth:** About may use a modest image/parallax shift; program detail pages favor a static reading surface with a sticky enquiry action.
5. **Conversion:** contact form fields respond to focus and validation, with a clear success state only when delivery is actually confirmed.

Use Motion’s `MotionConfig reducedMotion="user"` and `useReducedMotion` for React motion; keep CSS `prefers-reduced-motion` fallbacks. Pause autoplay on hover, focus and hidden tabs. Animate `transform`/`opacity` first; use scroll-linked or WebGL effects sparingly. Any Three.js scene must have a DOM fallback and should not be a dependency of reading program content. [Motion reduced-motion documentation](https://motion.dev/docs/react-use-reduced-motion), [React Three Fiber Canvas fallback](https://r3f.docs.pmnd.rs/api/canvas).

## Suggested implementation sequence

1. **Content and conversion:** validate questionable copy, decide whether to build a real enquiry endpoint, secure local media assets.
2. **Accessibility foundation:** search/lightbox focus behavior, carousel pause controls, reduced-motion states, keyboard and mobile testing.
3. **Core visual refinement:** home composition, service hierarchy, program directory cards, detail-page reading rhythm.
4. **Motion layer:** add Motion only for the chosen hero, active navigation, card and section transitions; measure real device performance.
5. **Experimental layer (optional):** one 3D or advanced component proof of concept, compare against a non-WebGL design before adopting.

## Acceptance checks for a future implementation pass

- All 38 archived routes still load directly and remain reachable; all 28 program pages retain source content.
- No teal/blue photographic tint has returned. Text over media has measured contrast or a separate neutral text plate.
- Desktop, tablet and 320–390 px mobile layouts have no clipped text or controls.
- Every menu, filter, carousel, flip card, lightbox and form works with keyboard and touch; focus is visible and returns predictably.
- Motion is reduced or disabled when requested, and auto-advancing regions can be paused.
- Images have stable dimensions, responsive sizes and descriptive alternative text; hotlinks are removed when licensed assets are available.
- The contact success state reflects actual delivery status, not an attempted `mailto:` navigation.

## Sources consulted for component compatibility

- [Inspira UI component catalog](https://inspira-ui.com/docs/en/components) — official Vue/Nuxt-first catalog.
- [21st.dev component catalog](https://21st.dev/community/components) and [hero patterns](https://docs.21st.dev/blog/react-hero-section-examples) — React examples; inspect dependencies, license and accessibility per component.
- [React Bits](https://reactbits.dev/) and [component catalog](https://reactbits.dev/get-started/index) — React source components; distinguish free and Pro items before selection.
- [Motion for React](https://motion.dev/docs/react) and [scroll animation guide](https://motion.dev/docs/react-scroll-animations) — current API for what was formerly called Framer Motion.
- [React Three Fiber](https://r3f.docs.pmnd.rs/) — React renderer for Three.js; current docs pair v9 with React 19.

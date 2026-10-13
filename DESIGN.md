# Design direction

<!-- impeccable:design-schema 1 -->

## Concept

HYtalent is presented as a thoughtful learning partner: editorial clarity, confident professional photography, and small moments of interaction that make a large content library inviting to explore.

## Visual system

- Deep blue-teal grounds the brand; warm off-white gives long-form program content room to breathe.
- Fresh lime signals action and progress, with restrained gold details.
- Manrope/DM Sans carry functional content; Playfair Display adds an editorial accent to selected phrases.
- The composition blends the cinematic hero and polish of Dealate, VCCI's institutional confidence, and Pearl Panda's friendly movement.

## Interaction system

- The home hero uses the restored birds/murmuration HYtalent wordmark over a pale sage sky, with an editorial learning headline, three labelled message selectors, program/story links and audience links. HomeHero.jsx and the murmuration component are protected from the non-home extension; the retired Prisma/parallax experiments are not imported by the runtime.
- Non-home openings extend the established teal, sage, lime and warm-paper world with destination-specific compositions: an arched colour session photograph for About, four expanding learning-theme panels for Programs, a real-photo mosaic for Gallery, a published-logo constellation for Clients, a typographic theme index for Blog and an animated enquiry form and interactive wireframe globe for Contact. Program outlines use category-specific photo proportions, reading order and surface colours. Privacy and archive openings remain static. The surface contract lives in `.impeccable/surfaces/non-home-heroes.md`; researched public-pattern adaptations are recorded in `site-archive/21ST-HERO-RESEARCH.md`.
- Gallery adds a manually controlled photographic deck with neighbouring previews, a position announcement, all 29 thumbnails and the complete grid below. Previous/next wrap through the collection; Arrow Left/Right and Home/End work when the carousel region is focused, swipe changes the selection, and the selected photograph opens the existing lightbox. There is no autoplay; reduced motion removes the deck transition. Original-resolution local media and source aspect ratios remain available.
- All 11 Clients logos use front/back cards adapted to React from the supplied Inspira example. Mouse hover reveals the reverse; click, tap or keyboard activation pins or reverses the state. The reverse only identifies the logo's presence in the original collection, without inventing relationship claims. A separate enlarge control opens the logo viewer, and reduced motion removes the flip transition.
- Service cards pair a clean photograph with a solid reading panel in a balanced two-by-two layout. Pointer or keyboard activation flips to the full description; a separate route link stays available. Mobile stacks photo above text.
- Program cards, testimonials, and client logos are carousel-style interactive sections.
- Navigation offers a theme/audience/service finder, animated mobile navigation, and keyboard search across all 38 archived pages.
- Local photography remains untinted. The source media manifest preserves original image bytes and provides lossless responsive sizes and intrinsic dimensions.
- A React/Motion theme visual morphs between meaningful silhouettes: upward arrow for leadership, speech bubble for communication, heart for culture/wellbeing, connected nodes for organization/HR. Spring pointer movement and matching program previews make selections tangible without WebGL; reduced motion renders the selected state immediately.
- Motion respects `prefers-reduced-motion`; visible focus states and semantic controls remain usable without hover.
- The shared footer uses the supplied halftone wordmark component in HYtalent teal/lime. Canvas dots react to pointer movement and click ripples, while actual links stay accessible HTML. The renderer sleeps when idle, offscreen or the document is hidden. The full halftone word is exactly Hytalent, contained with padding and visible descenders rather than cropped.
- The header floats transparently over the page without a full-width white surface. Restored VCCI-style navigation uses a dark capsule with a darker moving active/hover pill. Home, About, Programs, Gallery, Clients and Blog are visible destinations; Programs opens the finder, and search and the separate Let's talk contact action remain available. Mobile uses the existing navigation dialog; archives remain in the footer. The entire header, including logo, hides while scrolling down past120px and returns on upward scroll; it remains accessible while keyboard-focused or a menu is open.
- On the home page, scrolling beyond 24 px switches the full logo/tagline to the SVG symbol alone; returning to the top restores the full identity. Other routes keep the full logo. The transition is disabled for reduced motion.
- The full blue/green logo is used over the light learning scene and other pages. The cream-lettered video variant remains as an unused reversible asset.
- The HYtalent logo is a clean path-only vector reconstruction of the supplied blue/green identity, with outlined Arial lettering, rather than a low-resolution bitmap trace. It is displayed larger with a versioned asset URL. This is a reconstruction, not a claim that an official brand SVG was supplied. All 11 client logo assets are vector traces of the source artwork. Original raster sources remain archived as evidence, not used for displayed logos.

## Content rules

All 38 archived source routes are available. Source page copy remains in `site-archive/pages/`; substantive program content is rendered from it. New connective copy is limited to navigation, calls to action, and layout context, without adding unverified organizational claims.

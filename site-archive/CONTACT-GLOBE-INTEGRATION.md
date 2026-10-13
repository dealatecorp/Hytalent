# Contact, header and footer update

13 October 2026.

- Header and logo slide away together after downward scrolling past 120px; upward movement restores them. An 8px direction threshold avoids jitter. The header is visible near the top, while navigation/search dialogs are open, and during keyboard focus. Reduced motion removes its transition.
- Footer wordmark is exactly **Hytalent**. `crop={0}` now uses a contained layout that accounts for glyph side bearings, descenders, footer links and padding, rather than simply positioning the baseline on the bottom edge. The existing halftone pointer interaction is retained.
- Contact replaces the separate large hero with the user-supplied contact-and-wireframe-globe composition. It is adapted to the existing HYtalent React/CSS system, preserving real contacts, all enquiry fields, program prefill, country picker, validation, draft persistence, API feedback and prepared-email fallback. No fabricated response-time claim or demo SaaS contact was retained.
- `src/components/ui/contact-with-globe.tsx` contains the adapted layout and interactive globe. The country map is bundled from `world-atlas`, projected with `d3-geo` and decoded with `topojson-client`; no external map fetch is required. SVG paths are reused rather than destroyed/recreated each frame, rotation is frame-rate independent and capped at approximately30fps, and the renderer stops offscreen, in hidden tabs, when paused or under reduced motion. Pointer drag and keyboard arrows rotate it.
- Contact is a lazy-loaded route, so the geography renderer and atlas are not added to Home's initial bundle. Home birds remain unchanged.

## Framework integration

This project uses React19, Vite, JSX and plain CSS, with existing TSX component support through Vite. The supplied Tailwind/shadcn classes were translated into scoped styles in `src/enhancements.css`; native buttons and a decorative dot separator avoid unnecessary Radix dependencies. The existing `src/components/ui` directory is retained as the reusable-component location. A wholesale Tailwind/shadcn or TypeScript-tooling migration is not necessary for this adaptation and was not performed.

## Verification

Production build generates38 archived routes. Desktop browser check shows the full uncropped Hytalent wordmark and hidden header at the footer; upward PageUp restores the header. Mobile390px check: no horizontal overflow,179 globe paths, program prefill retained, required-field messages rendered and focus moved to name, globe pause control updates correctly. No live enquiry email was sent. The existing SMTP tests use a mock transport.

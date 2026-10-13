# UI audit implementation status

Latest follow-up: shared header and logo hide on downward scroll and return on upward scroll, with menu/focus and reduced-motion safeguards. Footer displays the entire case-sensitive Hytalent wordmark on desktop and390px mobile. Contact now uses the supplied form/globe composition adapted to the existing stack; all original enquiry behavior is retained, atlas data is local and Contact is lazy-loaded. Browser checks covered desktop/mobile layout, scroll direction, complete footer, program prefill, required-field validation/focus and globe pause. Production build still emits38 routes. See site-archive/CONTACT-GLOBE-INTEGRATION.md for implementation details.
Implemented 13 October 2026 from [UI-IMPROVEMENT-AUDIT.md](UI-IMPROVEMENT-AUDIT.md).

## Shipped
| Audit area | Implementation |
| --- | --- |
| Blue image overlays | Removed. Clean photographs and separate reading surfaces; neutral caption plates where necessary. |
| Program finder | Theme, verified audience grouping, and training/service selectors in the mega menu; live option count and directory link. |
| Navigation | Transparent floating header with no white band, outlined SVG logo and restored VCCI-style dark capsule with a moving active/hover pill. Home, About, Programs, Gallery, Clients and Blog destinations; program finder, mobile navigation, search and separate Let's talk contact action retained. |
| Search | All 38 pages, up to eight suggestions, result groups, Arrow Up/Down, Enter, clear, full results and Ctrl/Cmd K. |
| Focus behavior | Native modal dialogs contain focus, make background inert, close with Escape, restore focus and lock page scrolling. |
| Home hero | Restored birds/murmuration HYtalent wordmark and pale sage sky with the learning headline, three message selectors, program/story links and audience links. HomeHero.jsx and murmuration-wordmark.tsx are unchanged by the non-home extension. Retired Prisma/parallax experiments are not imported by the runtime. |
| Home logo scroll state | Full SVG wordmark/tagline at the top, symbol-only SVG beyond 24 px scroll, restored when returning to top. Other routes retain the full logo. Reduced motion disables the crossfade/width transition. |
| Services | Balanced two-by-two photo/solid-reading-panel cards replace oversized overlay plates; mobile stacks photo above copy. Original front benefit, full reverse description, reversible flip and route actions retained. All eight service links remain in the secondary index. |
| Featured programs | Selected card with adjacent preview, native swipe/snap, keyboard arrows, previous/next, disabled boundaries and position counter. |
| Client rail | Slower motion, manual pause, pause on hover/focus/hidden tab, static reduced-motion grid and readable logo names. |
| Testimonials | Full quotations, pause/play, progress, previous/next; pauses on hover/focus/hidden tab/offscreen and disables autoplay for reduced motion. |
| Signup choices | Three decision rows with benefits, destinations and all original signup wording. |
| Gallery teaser | One dominant photo and two supporting photographs. |
| Directory | Sticky desktop theme index, mobile theme selector, audience/type controls, active result summary, reset, live announcement and shareable URL query state. |
| Program cards | One benefit, clear category/title and a single route action with hover/tap feedback. |
| Program detail | Full source outline, narrower reading measure, on-page contents, contextual sticky enquiry, topic-based related links and source-review notes. |
| About | Arched colour photograph from the original Gallery, editorial opening and approach anchor; source mission and founder chapters, original full copy, sourced founder chronology and learning principles retained. |
| Non-home heroes | All 37 non-home archived routes use destination or topic-specific openings. Programs has four expanding colour panels with real counts and links; program details vary photo proportion, reading order and colour by theme. Gallery uses a real-photo mosaic, Clients a logo constellation, Blog a typographic theme index and Contact a direct-contact spotlight. Privacy and archives stay static. Public-pattern research and adaptation boundaries are recorded in site-archive/21ST-HERO-RESEARCH.md. |
| Gallery | Manually controlled photographic deck with neighbour previews, previous/next wrapping, focused-region Arrow Left/Right and Home/End keys, swipe, a live position label and all 29 thumbnails. Complete varied grid and keyboard lightbox remain; reduced motion removes deck transitions. No autoplay. |
| Clients | All 11 SVG logos in front/back React cards adapted from the supplied Inspira example: mouse hover, click/tap/keyboard toggle, reduced-motion fallback and a separate enlarge action. Reverse copy only confirms presence in the original published collection. |
| Contact | Searchable country/code picker, program prefill and suggestions, autocomplete, inline required/error states, session draft, sending/accepted/error states, privacy link and direct contacts. |
| Enquiry API | SMTP endpoint in Vite dev/preview and production Node server, fixed recipient, Reply-To, validation, honeypot, request size limit, origin check, rate limit and provider acceptance check. |
| Blog | Honest empty state with three relevant program links. |
| Privacy | Static reading layout with no decorative animation. |
| Archives | Category/ticker routes retained; secondary footer disclosure. |
| Local media | 57 source images cached locally with untouched original files, lossless responsive WebP copies and intrinsic dimensions; zero failed downloads. All 29 gallery photos and five other images were upgraded from captured thumbnails. |
| SVG logos | Clean vector reconstruction of HYtalent's supplied identity, outlined wordmark/tagline, SVG favicon and 11 traced client logos. Displayed logos contain paths only, with no embedded raster images. Photographs remain in their appropriate raster formats. |
| Motion system | MotionConfig respects user preferences; authored reveals only in selected home sections; transitions for active cards/navigation, clean static reading elsewhere. |
| Reactive theme visual | React/Motion blob with four visibly distinct contours, colours and icons, spring pointer response, actual program counts and two matching program links per selection. Reduced motion changes state immediately. Three.js removed at the user's request. |
| Performance | Markdown split into a deferred chunk; unused Three.js dependency and its 547 KB deferred bundle removed. Repetitive archived form boilerplate removed from runtime data while original Markdown is retained. |
| Taste Skill refinement | Installed Leonxlnx/taste-skill locally for Codex. Applied its hierarchy and motivated-motion guidance: vertically stacked section introductions, a focused interactive theme visual and useful program previews. Existing identity, original photographs and full source copy take precedence over generic skill defaults. |
| Meaningful silhouettes | Leadership upward arrow, communication speech bubble, culture/wellbeing heart and organization/HR connected nodes. All outlines share cubic segments for smooth morphing. |
| Shared halftone footer | User-supplied React canvas footer integrated at src/components/ui/halftone-wordmark-footer.tsx and rendered by the shared application layout on every route. HYtalent wordmark, actual contacts, all former destinations, archives and back-to-top preserved. Pointer spring displacement and click ripple sleep when idle/offscreen/hidden; reduced motion remains static. |

## Configuration and content-owner dependencies
- **SMTP:** Supply the email provider settings in .env before online enquiries can be delivered. Missing settings produce an honest unavailable message and preserve the draft; no fake success.
- **Outline corrections:** The Time Management, Stress Management and Campus to Corporate takeaway lists conflict with their topic. [The content-review log](site-archive/CONTENT-REVIEW.md) records these and five repeated blocks. Approved replacement copy is still needed; the implementation preserves source data.
- **Unverified metadata:** Duration, format and invented engagement stages were not added, matching the audit's requirement to use verified source facts.
- Component references were adapted to the existing React/plain-CSS system. No Vue-only Inspira source or paid component source was installed.

## Verification
- Production build generates all 38 direct-load routes.
- Five enquiry endpoint tests pass with a mocked mail transport; no external email is sent.
- Browser checks: desktop home, mega-menu finder, complete-page search, focus return, all four React blob selections and matching program previews, directory audience/search/query state, contact validation and unavailable sending, country search, gallery arrow/Escape navigation and focus return.
- Mobile checks at 390 px and 320 px: navigation, hero, filters and enquiry form.
- Source image manifest: 57 successful local assets; zero unavailable downloads.
- Image quality correction: the archive captured 272 × 182 gallery thumbnails. The pipeline now verifies their larger original files, and the featured gallery uses each original aspect ratio without enlarging a tight crop.
- Shared footer checked on desktop, at 390 px, and on the privacy route. Halftone wordmark and pointer response render correctly, links remain usable and no console errors were observed.
- Taste Skill package installed locally under .agents/skills, with design-taste-frontend guidance read and applied in this turn. Newly installed skills become automatically discoverable after restarting Codex.
- Earlier follow-up verification: transparent header computed background rgba(0,0,0,0), clean versioned SVG logo, dark pill navigation/program finder, labelled hero message controls and service flip checked at desktop and 390 px. No horizontal overflow or browser console errors were observed in that pass.
- Current non-home extension: production build generates 38 direct-load routes; all five enquiry tests pass outside the network sandbox with mocked mail transport. Protected HomeHero.jsx and murmuration-wordmark.tsx hashes are unchanged. The existing 57-image local provenance record, all 29 Gallery photographs and all 11 SVG client logos are preserved; no new image generation or GSAP/Lenis dependency was introduced.
- Current browser coverage: desktop Gallery and 390 px Gallery, About and Programs; carousel next, End and thumbnail selection; modal Escape and trigger-focus restoration. Full visual inspection of every route and every new hero has not yet been completed. Earlier verification entries above describe their original checks and do not establish coverage of all current route openings.
- Latest DOM checks: nine desktop route variants covering the leadership, communication, culture and organization program families, Blog, Contact, Privacy, category archive and ticker archive had no horizontal overflow, and hero anchors resolved. At 390 px, long program titles from all four families, Contact and Blog had no horizontal overflow or offscreen hero calls to action.
- Latest Clients checks at 390 px: all 11 cards rendered without horizontal overflow; keyboard Enter flipped HP with aria-pressed=true; the enlarged SVG logo modal closed with Escape and restored focus to the Enlarge HP button. Gallery thumbnail 17 followed by Arrow Right selected photograph 18. Swipe/drag is implemented in code but has not been verified by an actual gesture in this pass.
- Latest scoped reviewer pass covered the four listed typography fixes and Clients code only; it was not full-surface visual approval. All five mocked SMTP tests pass, and the final production build still generates 38 routes.


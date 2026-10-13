# Hero and carousel reference research

Researched 13 October 2026. The public 21st.dev index returned 4,735 URLs; 547 matched hero/background-related terms. The matching inventory is preserved in `21ST-HERO-BACKGROUND-INDEX.json`. This is broad public-index coverage, not a claim to have reviewed every component's source, private component or unlisted page.

## Selected patterns and implementation

| Reference | HYtalent adaptation |
| --- | --- |
| [Hero Color Panel](https://21st.dev/@cult-ui/components/hero-color-panel) | Programs: four expanding theme panels with actual category counts and directory links. Native React/Motion, no shader runtime. |
| [Hero Gallery Scroll Animation](https://21st.dev/@youcefbnm/components/hero-gallery-scroll-animation) | Gallery: real-photo mosaic with hover response; no multi-viewport pinned scroll trap. |
| [Hero Minimalism](https://21st.dev/@lyanchouss/components/hero-minimalism) | Blog and reading routes: typography-led openings, honest empty state and real learning-theme links. |
| [Orbital Hero Section](https://21st.dev/@yura/components/orbital-hero-section) | Clients: SVG logo constellation; native composition, no WebGL. All 11 logos remain in the full collection. |
| [Spotlight](https://21st.dev/@kevingirelli/components/spotlight) | Contact: pointer-following light through Motion values; actual direct contacts and form link. |
| [Background Beams](https://21st.dev/@manuarora700/components/background-beams) | Evaluated; lightweight communication-frame treatment selected instead of continuous beam animation behind reading text. |
| [Hero 195](https://21st.dev/@shadcnblockscom/components/hero-195-1.md) | Evaluated public tab composition only. Gated source and unknown license were not copied. |
| [Zoom Blur Image Carousel](https://21st.dev/@kedhareswer/components/lens-zoom-carousel) | Gallery: directional photographic navigation with keyboard, swipe and reduced motion. Deliberate blur omitted to preserve the user's image-quality requirement. |
| [Stacked Card Image Carousel](https://21st.dev/@kedhareswer/components/card-deck-carousel) | Gallery: spring-driven photographic deck, neighbour previews and thumbnail index for all 29 images. |
| [Aperture Reveal Image Carousel](https://21st.dev/@kedhareswer/components/aperture-carousel) | Evaluated; deck chosen to make adjacent photographs visible rather than mask the source images. |

These are authored React/CSS/Motion adaptations of researched public visual patterns, not verbatim installs of every listed component. No paid/private source was installed. No new dependencies were required.

## Route coverage

- Home: protected birds hero, unchanged.
- About: arched **colour** session photograph from the original Gallery; full original mission and founder content retained below.
- Programs: interactive theme chooser; all 28 program outlines retain their original route and copy. Leadership, communication, culture and organization have four distinct photo/type treatments.
- Gallery: mosaic opening; animated deck; 29 thumbnails, complete grid and existing keyboard lightbox.
- Clients: logo constellation and all 11 SVG logos in React flip cards. [Inspira Flip Card](https://inspira-ui.com/docs/en/components/cards/flip-card) was adapted from the user's Vue example to React; front/back, pointer hover, click/keyboard toggle, reduced-motion fallback and a separate enlarge action.
- Contact: direct-contact spotlight panel and unchanged enquiry form.
- Blog: typographic learning index; no invented blog posts.
- Privacy, category archive and ticker archive: quiet static reading openings with retained source content.

## Performance and provenance

No Three.js, GSAP or Lenis added. Home's two protected source-file hashes remained identical. Gallery uses the existing original-resolution local media manifest; displayed logos remain SVG. Source images and their provenance are recorded in `MEDIA-STATUS.json` and the existing media manifest. Retired home-hero experiments are recoverable in `unused-hero-experiments/`, not imported by the runtime.

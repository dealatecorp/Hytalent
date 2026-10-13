# Parallax component integration

The working component is `src/components/ui/parallax-scrolling.tsx`. This project's source root is `src`, so `src/components/ui` is its equivalent of `/components/ui`; reusable components already live here. Styles are in `src/enhancements.css`, imported after `src/styles.css` by `src/main.jsx`.

The application uses React/Vite, JSX/TSX and plain CSS, not a configured shadcn/Tailwind system. The supplied effect does not require Tailwind utilities, so it was adapted to the existing styling without replacing project configuration.

Installed dependencies: `gsap` and the explicitly supplied `@studio-freight/lenis`. The latter is the legacy package name and npm reports it has been renamed to `lenis`; this integration keeps the supplied dependency. Imports are deferred until the home hero mounts.

## Optional full shadcn/Tailwind/TypeScript setup

These instructions are provided rather than applied as an unrelated framework migration. Preserve the enquiry middleware in the existing Vite configuration.

1. Install type-checking dependencies: `npm install -D typescript @types/react @types/react-dom @types/node`. Create a TypeScript configuration with `npx tsc --init`; configure JSX as `react-jsx`, bundler module resolution, DOM libraries, and `allowJs` for the existing JSX modules. Vite currently transpiles TSX; a complete project type-checking migration is separate work.
2. Install `tailwindcss` and `@tailwindcss/vite`, append the Tailwind plugin to the existing Vite plugin list, and create a CSS entry containing `@import "tailwindcss";`. Check Tailwind's resets against the existing styles before switching them on. [Official Tailwind Vite setup](https://tailwindcss.com/docs/installation/using-vite).
3. Configure the `@/*` alias to `./src/*` in TypeScript and the Vite resolver, then run `npx shadcn@latest init` for this existing project. Set UI components to `src/components/ui`; do not scaffold a replacement project. [Official shadcn existing-Vite setup](https://ui.shadcn.com/docs/installation/vite).

## Runtime behavior

The backdrop, horizon, HYtalent wordmark and workshop foreground use the supplied 70/55/40/10 percent parallax rates. Native touch scrolling remains enabled. Reduced motion is static. Modal dialogs carry `data-lenis-prevent` for native internal scrolling.

Cleanup removes only this component's ticker, Lenis listeners, visibility handler, timeline and ScrollTrigger. It does not kill unrelated page animations or change global ticker lag settings. [GSAP scoped cleanup](https://gsap.com/docs/v3/GSAP/gsap.context/).

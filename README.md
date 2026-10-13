# HYtalent recreation

Logo assets displayed by the site are SVG-only. `node scripts/prepare-logos.mjs` regenerates client vector traces and the clean HYtalent reconstruction. Brand lettering is converted to paths from Windows Arial fonts at generation time; shipped SVGs have no runtime font dependency. The reconstruction follows the supplied identity reference but is not an official source SVG.
A React/Vite site covering all 38 archived public routes, with 28 program/service detail pages. Source captures remain in [site-archive](site-archive/SITE-MAP.md).

## Local development
Run npm install, then npm run dev. Vite serves the frontend and the local enquiry endpoint. No email is sent until SMTP is configured.

## Production
Run npm run build, then npm start to serve the built site and enquiry API with Node. The default address is http://127.0.0.1:4174. Hosting only the dist folder supports browsing but needs a separately hosted /api/enquiry endpoint for online sending.

Copy [.env.example](.env.example) to .env and fill in SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD and SMTP_FROM. Keep credentials on the server. The recipient is fixed to admin@hytalent.in; visitor email is used as Reply-To. TLS, server validation, a honeypot, a bounded request body and rate limiting are included. Without configuration, the form preserves the visitor's draft and offers a prepared-email fallback.

The current rate limiter is process-local and fits a single Node instance. Use a shared rate-limit store when running multiple instances.

## Content and media
- site-archive/pages retains the original source captures.
- npm run build regenerates compact runtime content without loading repeated plugin form boilerplate into the browser bundle.
- npm run media verifies larger WordPress originals, preserves their exact bytes, and prepares lossless responsive WebP copies. All 57 images are local, with no failed downloads. All 29 gallery photos and five other images were upgraded from smaller captured versions.
- [Content review](site-archive/CONTENT-REVIEW.md) records source inconsistencies and repeated takeaway blocks. Original wording remains until the business provides approved corrections.
- [Implementation record](UI-IMPLEMENTATION-STATUS.md) maps the audit to shipped functionality and outstanding configuration.

## Validation
Run npm test for enquiry validation, missing configuration, provider rejection, origin checks and rate limiting. Tests use a mocked email transport; no external emails are sent.


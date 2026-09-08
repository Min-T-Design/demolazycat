# Lazy Cat — Figma homepage implementation

React + TypeScript, vinext/Vite, Tailwind and accessible Base UI/shadcn primitives.

## Run

```sh
npm install
npm run dev
```

Validation: `npx tsc --noEmit` and `npm run build`.

## Design references

- [Homepage, node 709:5568](https://www.figma.com/design/lzlMHGhPfH10QbOzeSzAdt/Lazycathagiangloop.com?node-id=709-5568)
- [Tour cards, node 514:482](https://www.figma.com/design/lzlMHGhPfH10QbOzeSzAdt/Lazycathagiangloop.com?node-id=514-482)
- [Feature cards, node 568:3328](https://www.figma.com/design/lzlMHGhPfH10QbOzeSzAdt/Lazycathagiangloop.com?node-id=568-3328)

Figma-exported assets and self-hosted fonts live in `public/assets`; their mapping is in `lib/figma-assets.json`. The UI UX Pro Max skill is available in the parent project's `.agents/skills/ui-ux-pro-max` folder. The supplied Figma layout takes precedence over generic style recommendations.

`app/page.tsx` contains navigation, hero and introduction. `app/site-sections.tsx` contains tours, benefits, destinations, reviews, food, moments, news, FAQ and footer. Responsive layout and motion are in `app/globals.css` and `app/sections.css`.

## Motion

- Introduction: five-card loop with one centered full-size card, two scaled side cards, previous/next buttons and keyboard arrows.
- Moments: continuous right-to-left upper row and left-to-right lower row. Hover slows to 18% speed without resetting position. A pause control, keyboard focus, open lightbox, offscreen state and reduced-motion preferences stop motion. Click/tap opens the existing gallery dialog.
- Regression checks: `node --experimental-strip-types --test tests/carousel.test.mjs`.

- Tour hover expands the photo strip over 300 ms, linear. After the 1 ms prototype delay, it pans for 1500 ms, linear. Photo hover is 200 ms ease-out with the reference lift and scale.
- Feature expansion reproduces the spring with mass 1, stiffness 115.2, damping 12 and duration 1.23718 s. The second card starts expanded, matching the homepage frame.
- Keyboard focus and touch activation are supported. Reduced-motion preferences suppress animation.

## Integration boundaries

This is a frontend implementation, not a booking/payment backend. Booking and newsletter forms open the visitor's email application; no booking or subscription is recorded automatically. The contact details and placeholder copy follow the design, including its original spelling. Confirm these before a public launch.

Video sections use the supplied poster images because playable media was not provided. News dialogs contain the supplied excerpt, not invented full articles. Social buttons remain disabled until verified destination links are supplied. Several navigation items point to the corresponding homepage section because secondary-page designs were not supplied.

Build and type checking do not establish a pixel-perfect visual match. A final browser comparison at the Figma viewport, and confirmation of live content and integrations, remain necessary before claiming 100% fidelity.

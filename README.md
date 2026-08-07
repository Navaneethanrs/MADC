# App Development Club — Hero

React + Vite + React Three Fiber build of the club hero section: a floating rounded-glass
phone that tilts toward the mouse, orbiting platform cards (Android / iOS / Flutter / React
Native / Kotlin / Swift), a glowing energy line linking the active card to the phone, and
the phone's screen live-swaps to show that platform's terminal command.

## Setup

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Hero.jsx              -- top-level section: layout, copy, entrance animation
    Scene.jsx              -- <Canvas> wrapper (camera, lights, phone, particles)
    Phone.jsx               -- the 3D phone: body, rim glow, screen texture, sheen sweep
    Particles.jsx           -- background particle field
    Lights.jsx               -- lighting rig
    OrbitCardsOverlay.jsx  -- HTML cards positioned in sync with the phone's rotation,
                              plus the SVG "energy line" connecting the active card to the phone
  data/
    platforms.js            -- the 6 platform cards (label, run command, color)
  hooks/
    useMouseTilt.js          -- tracks normalized mouse position for the tilt effect
  utils/
    geometry.js               -- rounded-box geometry builder + canvas drawing helpers
  index.css                    -- Tailwind + shared keyframes/utility classes
  App.jsx
  main.jsx
```

## Why the orbit cards live outside the `<Canvas>`

The platform cards are real DOM elements (not 3D objects), positioned every frame from
an angle shared with the phone via a ref (`angleRef`), so they stay perfectly in sync with
the phone's rotation without going through React state on every frame (which would be too
slow). The same trick is used for the connecting line: `Phone.jsx` projects the phone's
3D position into 2D screen pixels each frame and writes it into a ref that the overlay reads.

## Where to go next

- **Add more sections below the hero** (Features, Projects, Events, Join) in `App.jsx`.
- **Scroll-driven transitions**: install `gsap/ScrollTrigger` and drive `angleRef`,
  camera position, or `phoneGroup` position from scroll progress instead of just time —
  this is what will make the phone "rotate and zoom" as described in the original brief.
- **Swap in a real phone model**: if you find a good glTF smartphone model (e.g. via
  Poly Haven or a licensed asset), load it with `useGLTF` from `@react-three/drei` inside
  `Phone.jsx` instead of the procedural rounded-box geometry, and keep the screen texture,
  rim glow, and sheen logic as-is — they'll still work as children of the model.
- **Real content**: replace the two stat chip numbers, subhead copy, and "Join the Club"
  link with real data.

## Notes

- Respects `prefers-reduced-motion` (disables tilt, sheen, shimmer, and slows the
  auto-rotation to a crawl).
- Particle count and card layout scale down under 760px width.
- Colors, fonts, and spacing are defined as design tokens in `tailwind.config.js` —
  change the palette there rather than hunting through components.

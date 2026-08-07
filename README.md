# App Development Club — MADC

React + Vite + React Three Fiber web application for the Mobile App Development Club (MADC): featuring interactive 3D elements, dynamic platform cards, achievements, club features, and team showcases.

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
    Hero.jsx              -- top-level hero section with entrance animation
    Scene.jsx              -- <Canvas> wrapper (camera, lights, phone, particles)
    Phone.jsx               -- 3D phone model and interactive sheen
    Particles.jsx           -- background particle field
    Lights.jsx               -- lighting rig
    OrbitCardsOverlay.jsx  -- interactive platform cards
  data/
    platforms.js            -- platform cards configuration
  index.css                    -- Tailwind + shared styling
  App.jsx
  main.jsx
```

## Vercel Deployment

This project includes a pre-configured `vercel.json` for client-side routing support on Vercel.


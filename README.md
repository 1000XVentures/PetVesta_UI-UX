# PetVesta UI/UX

Final UI/UX prototype of the PetVesta mobile app — a single-page, static HTML/CSS/JS experience (phone-frame layout) with full booking flow, login, orders, chat, and profile.

**Main app:** `index.html` (same content as `PetVesta_App_v2.html`). The React version is in `PetVesta_App.jsx` for reference.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` (or the port shown in the terminal).

## Build

```bash
npm run build
```

Output is a single `dist/index.html` file (self-contained, no separate JS bundle). Ready for static hosting (e.g. Vercel).

## Vercel deployment

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework:** Static (Vite will build from `index.html`)

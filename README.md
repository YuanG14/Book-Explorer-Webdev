# Book Search App

A simple React + Vite app that searches books using the Open Library Search API.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Status

Phase 5 — book results now render as a responsive card grid. Added `BookList` and `BookCard` components (cover with placeholder fallback, title, author, first publish year, all with defensive fallbacks for missing data), a results heading showing the search term and count, and hover/keyboard-accessible clickable cards prepared for Phase 6's details modal.

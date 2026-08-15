# Book Search App

A simple React + Vite app that searches books using the Open Library Search API.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Status

Phase 3 — connected to the Open Library API. Submitting a search fetches results via `fetch()` inside a `useEffect`, with basic loading/error state and a temporary plain-list results preview. The polished BookCard/BookList UI is added in Phase 5, and refined loading/error/empty states in Phase 4.

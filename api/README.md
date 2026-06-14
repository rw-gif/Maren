# Serverless API (reserved for real try-on & dynamic features)

This folder is the home for serverless functions once MAREN moves to a
serverless host (Vercel/Netlify). It's empty for now — the storefront is
fully client-side and still deploys as static files.

## Why a server is needed (later)

The current virtual try-on is a front-end **demo**. A real, photorealistic
try-on must run server-side because:

- the try-on / image-model **API key cannot live in client code** — it would
  be exposed to anyone viewing source;
- requests should be **rate-limited, authenticated and logged** server-side;
- customer photos are **personal/biometric data** (UK GDPR) and must be
  handled with a lawful basis, retention limits and ideally ephemeral
  processing — not shipped around the browser.

## Planned endpoints (when try-on is built)

- `POST /api/tryon` — accepts a garment id + customer photo (or chosen body
  model), calls the VTO engine via a secret key, returns a composite URL.
- `POST /api/newsletter` — stores a real subscriber (replaces the demo toast).

On Vercel, a function is just `api/tryon.js` exporting a handler. `vercel.json`
at the repo root already configures static hosting; add functions here when
ready.

# Muse portraits

Drop the locked hero portraits here. The storefront (`index.html`, `#muses`
section) references these exact filenames and shows a styled monogram
placeholder until the files exist.

| File | Public name | Codename | Register |
|---|---|---|---|
| `vivi.jpg` | Vivi | GOLDEN | Warm, candid, everyday core |
| `cami.jpg` | Cami | IVORY | Cool, composed, elevated edit |

## How to produce these

See [`../../docs/brand-muse-bible.md`](../../docs/brand-muse-bible.md) — the
single source of truth. Short version:

1. Generate a seed set from the muse's identity block (bible §7a).
2. Lock one hero face per muse; build a 3–5 angle reference pack.
3. Generate all production shots **from the locked reference**, not from text.

Canva (used for the first look-tests) will not hold a consistent face between
generations — use the local `/ai-image-creator` skill with the `-r` reference
flag for the canonical faces.

## Image guidance for these slots

- Vertical portrait, roughly 4:5, head-and-shoulders to mid-body.
- Faces sit high in the frame (cards crop to `object-position: 50% 20%`).
- On MAREN, dress the muses in MAREN product (linen, breton, gingham, washed
  cotton) and coastal light — keep the *faces* from the bible, not Parke's
  denim styling.

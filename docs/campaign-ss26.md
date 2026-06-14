# MAREN — SS26 Campaign Shot List & Generation Brief

**Status:** v1, ready to run. Pairs with [`brand-muse-bible.md`](./brand-muse-bible.md).

This brief turns the two locked muses into a full product campaign. The faces
are already locked (`assets/muses/vivi.jpg`, `assets/muses/cami.jpg`); every
shot below is generated **from those references** so the same two women appear
across the whole campaign.

> **How to run this.** The reference-locked pipeline needs the
> `/ai-image-creator` skill (FLUX.2 / SeedDream / Gemini, with the `-r`
> reference flag). It is **not** mounted in the web session this brief was
> written in, so the commands here are for you to run in your own Claude Code /
> Cowork setup where the skill exists. Canva **cannot** hold a consistent face
> and is only useful here for mood/layout, never for the hero faces. Flag
> syntax (`-r`, `--ar`, `-o`, `--model`, `-n`) is indicative — confirm against
> your installed skill's `--help` before a big batch.

---

## 0. Prerequisite — build a reference pack per muse (do this once)

Per bible §6, don't generate production shots straight from a single frame.
First expand each locked hero into a small multi-angle pack, then point all
production shots at the pack.

```
# Vivi — GOLDEN reference pack
generate-image -r assets/muses/vivi.jpg -p "same woman, clean head-and-shoulders, front, neutral cream studio backdrop, soft even light, relaxed neutral expression" --model flux2 -o campaign/ss26/refs/vivi_front.png
generate-image -r assets/muses/vivi.jpg -p "same woman, three-quarter left, neutral cream backdrop, soft light, neutral expression" --model flux2 -o campaign/ss26/refs/vivi_q-left.png
generate-image -r assets/muses/vivi.jpg -p "same woman, three-quarter right, neutral cream backdrop, soft light, neutral expression" --model flux2 -o campaign/ss26/refs/vivi_q-right.png

# Cami — IVORY reference pack
generate-image -r assets/muses/cami.jpg -p "same woman, clean head-and-shoulders, front, neutral cream studio backdrop, soft even light, calm composed expression" --model flux2 -o campaign/ss26/refs/cami_front.png
generate-image -r assets/muses/cami.jpg -p "same woman, three-quarter left, neutral cream backdrop, soft light, composed expression" --model flux2 -o campaign/ss26/refs/cami_q-left.png
generate-image -r assets/muses/cami.jpg -p "same woman, three-quarter right, neutral cream backdrop, soft light, composed expression" --model flux2 -o campaign/ss26/refs/cami_q-right.png
```

For each production shot below, pass the muse's locked hero as `-r` (and the
pack frames too, if your skill accepts multiple `-r` references — more
references = tighter identity hold).

---

## 1. The visual world (from the moodboard)

Nantucket / Hamptons coastal-preppy, with a Riviera-linen and
English-countryside edge:

- Blue-and-white, cream, oat, navy, washed denim. Breton stripes. Hydrangeas.
- Locations: pale-sand beaches and dunes, teak-deck yachts, wooden harbour
  boats, country estates with a Land Rover Defender, white-panelled coastal
  houses, cobbled European streets with a basket bicycle.
- Light: soft 35mm film, golden hour, airy and sun-warmed — never cold studio.
- Mood: effortless, candid, "old money on holiday," lived-in not glossy.

> **Guardrail (bible §9b/c).** Parke is *directional inspiration only*. Do not
> reproduce Parke's logos, monogram, trade dress, or specific campaign crops.
> The world above is generic coastal-preppy — keep it yours.

## 2. Global style token

Append this to every production prompt for a consistent look. Defined once;
referenced as `<STYLE>` in the commands below.

```
<STYLE> = "Shot on 35mm film with fine natural grain, soft diffused daylight,
coastal-preppy editorial mood, palette of cream, oat, sky blue, navy and crisp
white, relaxed candid posture, minimal natural makeup, effortless styling,
photorealistic, sharp focus on the subject, no text, no logos, no graphics."
```

## 3. Hero products (7)

| Code | Product | Notes |
|---|---|---|
| `CAP` | The Harbour Cap | Navy washed-cotton cap, tonal embroidered "M". *New SKU.* |
| `SHIRT` | The Coastal Linen Shirt | Oversized white / blue-stripe linen shirt. |
| `SHIFT` | The Linen Shift | Cream sleeveless A-line linen dress. |
| `SCALLOP` | The Scallop Linen Mini | Ink/navy strapless scalloped-edge mini. |
| `RIVIERA` | The Riviera Linen Mini | White sleeveless boat-neck linen mini. *New SKU.* |
| `SHORTS` | The Sailing Shorts | White / blue tailored cotton shorts. *New SKU.* |
| `JUMPER` | The Cable Cardigan | Sky-blue & cream cotton cable knit. |

## 4. Muse assignment

- **Vivi (GOLDEN, warm/candid)** carries the everyday core — beach, boat,
  bicycle, dusk. In-motion, mid-laugh.
- **Cami (IVORY, cool/composed)** carries the elevated edit — yacht,
  countryside Defender, Riviera garden, editorial stillness.
- A few products are shot on both to cover both registers.

---

## 5. The shot list (14 hero + 2 campaign)

Machine-readable version: [`../campaign/ss26/shotlist.csv`](../campaign/ss26/shotlist.csv).

### CAP

```
# S01 · Vivi · beach dunes
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, wearing a navy washed-cotton baseball cap and a navy-and-white breton striped top, standing in pale marram-grass dunes by the sea, caught mid-laugh, wind in her hair, three-quarter body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/vivi_cap_beach.png

# S02 · Cami · yacht deck
generate-image -r assets/muses/cami.jpg -p "IVORY muse, wearing a navy cap and a crisp white linen shirt, on the teak deck of a sailing yacht, open sea behind, composed and direct, golden hour, mid-body, 50mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/cami_cap_yacht.png
```

### SHIRT

```
# S03 · Cami · countryside + Land Rover
generate-image -r assets/muses/cami.jpg -p "IVORY muse, wearing an oversized white linen shirt over washed denim, leaning on a classic green Land Rover Defender on a gravel drive of an English country estate, hydrangeas, overcast-soft light, full body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/cami_shirt_countryside.png

# S04 · Vivi · harbour jetty, golden hour
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, a blue-striped linen shirt worn open over a swimsuit, sitting on a wooden harbour jetty, ropes and a small boat, warm golden-hour backlight, candid, 35mm. <STYLE>" --model flux2 --ar 3:2 -o campaign/ss26/out/vivi_shirt_jetty.png
```

### SHIFT (Linen Shift dress)

```
# S05 · Cami · Riviera garden
generate-image -r assets/muses/cami.jpg -p "IVORY muse, wearing a cream sleeveless A-line linen shift dress, walking a manicured Riviera garden lined with tall cypress trees, small black sunglasses, raffia clutch, hills behind, composed, full body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/cami_shift_riviera.png

# S06 · Vivi · town cobbles with bicycle
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, wearing a cream linen shift dress, pushing a vintage bicycle with a wicker basket down a sunlit cobbled European street, seen from a three-quarter back angle, windswept hair, warm summer light, full body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/vivi_shift_town.png
```

### SCALLOP (Scallop Linen Mini)

```
# S07 · Cami · yacht sunset
generate-image -r assets/muses/cami.jpg -p "IVORY muse, wearing an ink-navy strapless scalloped-edge linen mini dress, on a yacht at sunset, soft pink-gold sky, elegant and still, full body, 50mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/cami_scallop_yacht.png

# S08 · Vivi · beach evening
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, wearing an ink-navy scalloped linen mini dress, barefoot on the beach at dusk near a small bonfire, warm firelight and blue hour, candid, full body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/vivi_scallop_beach.png
```

### RIVIERA (Riviera Linen Mini)

```
# S09 · Vivi · cobbled street, cycling away
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, wearing a white sleeveless boat-neck linen mini dress, riding a vintage bicycle with a woven leather basket along a sunlit cobbled street, seen from behind, hair caught in the wind, warm film light, full body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/vivi_riviera_cycle.png

# S10 · Cami · country lawn + Defender
generate-image -r assets/muses/cami.jpg -p "IVORY muse, wearing a white sleeveless linen mini dress, standing on a green country lawn beside a classic Land Rover Defender, small black sunglasses, hydrangeas and a manor house behind, soft light, full body, 35mm. <STYLE>" --model flux2 --ar 3:2 -o campaign/ss26/out/cami_riviera_lawn.png
```

### SHORTS (Sailing Shorts)

```
# S11 · Vivi · boat deck, barefoot
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, wearing a breton striped top and white tailored sailing shorts, barefoot on the deck of a wooden boat, holding a rope, open water, candid mid-laugh, full body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/vivi_shorts_boat.png

# S12 · Cami · harbour steps
generate-image -r assets/muses/cami.jpg -p "IVORY muse, wearing a white linen shirt tucked into white tailored shorts, sitting composed on weathered stone harbour steps, moored boats behind, soft midday light, full body, 50mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/cami_shorts_harbour.png
```

### JUMPER (Cable Cardigan)

```
# S13 · Cami · coastal house window seat
generate-image -r assets/muses/cami.jpg -p "IVORY muse, a sky-blue cotton cable cardigan over her shoulders, sitting on a white-panelled window seat of a coastal house, big window with sea view, holding a cup of tea, soft morning light, mid-body, 50mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/cami_jumper_house.png

# S14 · Vivi · beach dusk, cozy
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, wrapped in a cream cotton cable jumper with a striped blanket, sitting on the sand at dusk, warm blue-hour light, relaxed and candid, mid-body, 35mm. <STYLE>" --model flux2 --ar 4:5 -o campaign/ss26/out/vivi_jumper_dusk.png
```

### Campaign / hero

```
# S15 · BOTH · harbour wall (advanced — see note)
# Generate each muse separately against the same plate and composite, OR use a
# multi-subject reference workflow if your skill supports two -r identities.
generate-image -r assets/muses/vivi.jpg -r assets/muses/cami.jpg -p "two blonde friends on a stone harbour wall — one warm and golden in a breton top, one cool and composed in a white linen shirt — laughing together, moored sailboats behind, golden hour, full body, 35mm. <STYLE>" --model flux2 --ar 3:2 -o campaign/ss26/out/hero_duo_harbour.png

# S16 · Vivi · wide web banner
generate-image -r assets/muses/vivi.jpg -p "GOLDEN muse, wearing a cream linen shift dress, walking away along a wide empty beach at golden hour, lots of negative space sky and sand, cinematic, full body small in frame, 35mm. <STYLE>" --model flux2 --ar 16:9 -o campaign/ss26/out/banner_beach_wide.png
```

> **S15 caveat.** Holding *two* locked identities in one frame is the hardest
> case and where models drift most. Safest is to shoot each muse solo on a
> matching background and composite, or generate several and hand-pick the one
> where both faces hold.

---

## 6. Output, naming & where shots land on the site

- Generated files go in `campaign/ss26/out/` (created on first run; a
  `.gitkeep` holds the folder).
- Naming: `{muse}_{product}_{location}.png`.
- Recommended exports per hero: **4:5** (product cards / IG feed), **3:2** (web
  rows), plus crop a **9:16** for stories where useful.
- Storefront hand-off: each product card in `index.html` (`#edit`) can take a
  campaign shot as its swatch image, and the muse cards can rotate to a campaign
  frame. Say the word and I'll wire the product grid to use these once they
  exist (and add the new `CAP` / `SHORTS` / `RIVIERA` SKUs to the catalogue).

## 7. Workflow checklist

1. [ ] Build both reference packs (§0).
2. [ ] Generate a small test batch (`-n 4`) for 2–3 shots; confirm the faces hold.
3. [ ] Lock model + seed settings that work, then batch the full list.
4. [ ] Cull to one hero per shot; keep faces consistent across the set.
5. [ ] Drop finals into `campaign/ss26/out/`; commit.
6. [ ] Wire selected frames into the storefront (product cards + muse rotation).

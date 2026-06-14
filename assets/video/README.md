# Video slots

Drop real footage here and it plays automatically (poster images show until then,
so the site never looks broken).

| File | Where it plays | Notes |
|---|---|---|
| `hero.mp4` | Homepage hero background | Muted, looping, autoplay. Poster: `assets/muses/cami.jpg`. Keep it short (8–15s), ~1080p, web-optimised (H.264/AAC, faststart). |
| `lookbook.mp4` | Lookbook "SS26 Film" panel | Same treatment. Poster: `assets/muses/vivi.jpg`. |

Autoplay respects `prefers-reduced-motion` — on devices set to reduce motion the
video stays paused and the poster shows, with a play/pause control on the hero.

Tip for size/quality:
```
ffmpeg -i source.mov -vf "scale=-2:1080" -c:v libx264 -crf 23 -preset slow \
  -movflags +faststart -an hero.mp4
```
(`-an` drops audio since the videos are muted.)

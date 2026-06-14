# SS26 campaign — generation workspace

Full brief and ready-to-run prompts: [`../../docs/campaign-ss26.md`](../../docs/campaign-ss26.md).
Production sheet: [`shotlist.csv`](./shotlist.csv).

## Folders
- `refs/` — multi-angle reference packs built from the locked muse heroes
  (`assets/muses/vivi.jpg`, `assets/muses/cami.jpg`). Build these first.
- `out/` — generated campaign shots land here.

## Run it where the skill lives
The reference-locked pipeline uses the `/ai-image-creator` skill, which is **not
available in the Claude Code web/remote session** (sandboxed, no image-model
network access). Pull this repo into Claude Code on your own machine, where the
skill is installed and image-model credentials are set, then run the commands
in the brief. See the brief's "How to run this" box.

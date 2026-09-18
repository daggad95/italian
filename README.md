# Survival Italian

A phone-first web app for learning the Italian you actually need on the ground:
ordering coffee and food, asking where the bathroom is, paying, getting directions.

- **Review** — spaced-repetition flashcards (SM-2 style). Progress is saved on your device.
- **Phrases** — ~140 phrases by category, each with a play button and a short cultural note.
- **Talk** — reference conversations (bar, restaurant, bill, directions, deli, pharmacy…) with per-line audio and "play all".
- **Audio** — every phrase and conversation line has a recorded clip from a neural Italian voice (Diego or Isabella),
  generated at deploy time by `tools/gen_audio.py` (edge-tts, no API key). The phone's built-in voice is the fallback.
  Settings has a one-tap "Download all audio for offline" button.

## Running it

It's plain HTML/CSS/JS with no build step. Open `index.html`, or serve the folder:

```
python3 -m http.server 8000
```

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which publishes the site to GitHub Pages.
If the first run fails with a Pages error, enable Pages once in the repo settings
(Settings → Pages → Source: **GitHub Actions**) and re-run the workflow.

On your phone, open the site in Safari/Chrome and use **Add to Home Screen** to install it as an app.

## Audio

`tools/dump-text.mjs` lists every Italian string in `data.js`; `tools/gen_audio.py` synthesises an MP3 per string
into `audio/<voice>/<hash>.mp3` plus `audio/manifest.json`. The workflow runs both on each deploy and caches the
results, so only new strings are synthesised. To run locally:

```
pip install edge-tts
node tools/dump-text.mjs > texts.json && python tools/gen_audio.py texts.json
```

## Editing content

All phrases and conversations live in `data.js`. Add a phrase by appending an object with a unique `id`,
`cat` (one of the category ids at the top of the file), `it`, `en` and an optional `note`.

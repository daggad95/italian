# Survival Italian

A phone-first web app for learning the Italian you actually need on the ground:
ordering coffee and food, asking where the bathroom is, paying, getting directions.

- **Review** — spaced-repetition flashcards (SM-2 style). Progress is saved on your device.
- **Phrases** — ~140 phrases by category, each with a play button and a short cultural note.
- **Talk** — reference conversations (bar, restaurant, bill, directions, deli, pharmacy…) with per-line audio and "play all".
- **Audio** — uses the phone's built-in Italian text-to-speech voice, so it works offline with no API keys.

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

## Editing content

All phrases and conversations live in `data.js`. Add a phrase by appending an object with a unique `id`,
`cat` (one of the category ids at the top of the file), `it`, `en` and an optional `note`.

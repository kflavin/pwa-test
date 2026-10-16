# pwa-test

A minimal, dependency-free Progressive Web App for testing installation on a phone.

- `index.html` / `style.css` / `app.js` — the page: shows display mode, service-worker and network status, an install button, and a persisted counter.
- `manifest.webmanifest` — app name, colors, icons, `display: standalone`.
- `sw.js` — service worker; caches all assets so the app works offline. Bump `CACHE` when files change.
- `icons/` — generated PNGs (192, 512, maskable 512, 180 apple-touch).

All paths are relative, so it works from a subpath (e.g. GitHub Pages at `/<repo>/`).

## Run locally

```sh
python3 -m http.server 8000
```

Service workers need a secure context: `localhost` works on desktop, but a phone on your LAN hitting `http://<ip>:8000` will **not** be installable. Use HTTPS hosting (GitHub Pages) or a tunnel to test on a phone.

## Install on a phone

- **Android (Chrome):** open the HTTPS URL; tap the "Install app" button, or menu ⋮ → Install app.
- **iOS (Safari):** open the HTTPS URL; Share → Add to Home Screen.

Once installed, the status card shows "installed (standalone)". Turn on airplane mode and reopen — it still loads.

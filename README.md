
# SpaceBitz – desktop‑ready fork

This repo reorganises **SpaceBitz v0.0.43** so it runs cleanly on desktop browsers while staying touch‑friendly on iPhone.

## Notable additions
* **desktop.js** – hides the virtual joystick on non‑touch devices, adds a Resolution dropdown to Settings, and re‑scales the canvas when the window resizes.
* **index.html** – unchanged core code, but now loads `desktop.js`.

## Local dev
```bash
# Static file server
npx serve .
# Then open http://localhost:3000
```

> Tested on Chrome 125 (Windows 10) and Safari 18 (macOS Sonoma).

# XLR HUB

A small interactive listening device for **Track 1**. The prototype is intentionally file-based so the final stems can be added without changing the interface.

## Add your stems

Place these five files in `assets/`:

- `vocal.mp3`
- `drums.mp3`
- `bass.mp3`
- `guitar.mp3`
- `effects.mp3`

The files should be aligned to the same starting point and duration. Press **Play** to hear the stems together. Each channel has volume, mute, and a visual control. The effect buttons are currently interaction prototypes and are ready for the next audio-processing pass.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

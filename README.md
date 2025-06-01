# 🎥 Screen Recorder

**Screen Recorder** is a minimalist, high-performance screen recording application built with [Electron](https://www.electronjs.org/). It captures your desktop in Full HD and internal system audio in crystal clear stereo — all inside a transparent, always-on-top UI with tray controls and global hotkeys.

---

## ✨ Features

- ✅ Record screen in **1080p up to 120fps**
- 🔊 Capture **internal audio** (system sound) at 48kHz stereo
- 🪟 Transparent, always-on-top overlay
- 🖱 Tray icon with Start/Stop actions
- 💾 Auto-save recordings to `/videos` in `.webm` format
- 🎹 Global hotkeys for control
- 🕒 Optional timer animation

---

## 🎛 Hotkeys

| Shortcut            | Action             |
|---------------------|--------------------|
| Ctrl + Shift + S    | Start recording    |
| Ctrl + Shift + E    | Stop recording     |

---

## 📂 Output

All recordings are saved automatically to:

```
./videos/recording-[timestamp].webm
```

The folder is created automatically if it doesn't exist.

---

## 🚀 Getting Started

### 1. Download Release

Go to the [Releases](https://github.com/aket0r/screen_recorder/releases) page and download the `.exe`.

### 2. Run App

The app will launch minimized to tray. Use hotkeys to control recording.

---

## 🛠 Built With

- [Electron v36](https://www.electronjs.org/)
- HTML + CSS + JavaScript
- `MediaRecorder` and `getDisplayMedia` APIs
- Custom IPC + tray integration

---

## 📜 License

MIT © [aket0r](https://github.com/aket0r)

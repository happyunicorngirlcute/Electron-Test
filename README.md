# Things I wanna say

The frontend was HEAVILY ai assisted. I did the whole backend hand by hand, meaning, the functions for example, anything inside the electron folder, I created a figma template and told my AI to generate it. So yeah, this project was a pratcie to electron, I dont care about doing typescript, was very funy doing it

# Bob

Electron desktop app with a kanban task board and real-time system monitoring.

## Stack

- **Electron** — desktop shell
- **React** — UI
- **Vite** — bundler
- **TypeScript** — type safety

## Features

- Kanban board with backlog, in-progress, and done columns
- Create and delete tasks with title, description, and priority
- Real-time system stats (CPU, RAM, storage) in the sidebar
- Frameless window with custom title bar controls
- Minimizes to system tray on close
- Light/dark theme via system preference

## Dev

```bash
npm run dev
```

Starts Vite dev server on port 5123 and launches the Electron window.

## Build

```bash
npm run transpile:electron && npm run build
```

Outputs to `dist-react/` (Vite) and `dist-electron/` (TypeScript).

## Package

```bash
npm run dist:win    # Windows (portable + msi)
npm run dist:mac    # macOS (dmg)
npm run dist:linux  # Linux (AppImage)
```

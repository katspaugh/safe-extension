# Safe Extension

This repository contains a minimal cross-browser browser extension built with React, TypeScript and TamagUI. The popup UI is rendered using React and compiled with Vite.

## Getting Started

1. Install dependencies:
   ```sh
   yarn install
   ```
2. Run the development build with hot reload:
   ```sh
   yarn dev
   ```
   Then load the `extension/` folder in Chrome (via `chrome://extensions`) or Firefox (via `about:debugging`).
3. For a production build run:
   ```sh
   yarn build
   ```
   The compiled files will appear in `extension/dist/` which is referenced in `manifest.json`.

## Linting

Run ESLint with:
```sh
yarn lint
```

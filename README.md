# Safe Extension

This repository contains a minimal cross–browser browser extension. The main
UI is a popup sized **393×852** pixels. A simple promise-based polyfill is
bundled so the code can use the `browser` namespace in both Chrome and Firefox.

## Getting Started

1. Open the `extension/` folder in Chrome (via `chrome://extensions`) or
   Firefox (via `about:debugging`) and load the unpacked extension.
2. Click the extension icon to open the popup.

The popup logs the URL of the active tab to the console as a basic example.

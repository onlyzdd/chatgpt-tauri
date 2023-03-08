# chatgpt-tauri

This repository builds a simple ChatGPT desktop application with Vue and Tauri. 

## Features

- Based on official OpenAI API
- Internationalization and theme switching
- Cross-platform support powered by Tauri

## Screenshots

![macOS](https://imgur.com/LXDAeZe.png)

## Installation

### For users

Go to the [Releases](https://github.com/onlyzdd/chatgpt-tauri/releases) page and download pre-compiled packages for your platform.

### For developers

The recommended IDE setup is [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer). To run:

```bash
$ pnpm i # install dependencies
$ pnpm dev # start the web application only for development
$ pnpm tauri dev # for development
$ pnpm tauri build # for production
```

import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Tauri expects a fixed dev server port and a relative base so the
// production build can be loaded from the local filesystem inside the
// webview. See: https://v2.tauri.app/start/frontend/vite/
export default defineConfig((): UserConfig => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Vite normally hijacks the browser's "Open With" — prevent that here
  // because Tauri's own window chrome handles it.
  clearScreen: false,

  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // don't watch the Rust side, Tauri's CLI handles that rebuild
      ignored: ["**/src-tauri/**"],
    },
  },

  envPrefix: ["VITE_", "TAURI_ENV_*"],

  build: {
    target:
      process.env.TAURI_ENV_PLATFORM === "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_ENV_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_ENV_DEBUG,
  },
}));

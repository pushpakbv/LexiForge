import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import juno from "@junobuild/vite-plugin";
import path from 'path';

export default defineConfig({
  plugins: [react(), juno()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    host: true
  }
});
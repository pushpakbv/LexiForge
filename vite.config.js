import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react";
import juno from "@junobuild/vite-plugin";

export default defineConfig({
  plugins: [react(), juno()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: []
    }
  },
  server: {
    port: 5173,
    host: true
  },
  resolve: {
    alias: {}
  }
});
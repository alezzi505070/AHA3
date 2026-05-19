import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    sitemap({
      hostname: 'https://ahaveri.com'
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    /* Hero lazy chunk includes Three + R3F; size is expected until further code-splitting */
    chunkSizeWarningLimit: 1300,
  },
  /* Pin core + animation deps so the optimizer graph is stable. 504 “Outdated Optimize Dep”
     still means: stop dev server → clear cache (`npm run dev:clean`) → one browser tab, hard refresh. */
  optimizeDeps: {
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'gsap',
      'gsap/ScrollTrigger',
    ],
  },
})

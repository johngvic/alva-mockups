import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const page = (p) => fileURLToPath(new URL(p, import.meta.url));

// Site com várias páginas: cada protótipo é uma entrada do build.
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: page('./index.html'),
        web: page('./web/index.html'),
        mobile: page('./mobile/index.html'),
      },
    },
  },
});

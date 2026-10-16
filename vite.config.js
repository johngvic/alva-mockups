import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import includePlugin from './vite-include.js';

const page = (p) => fileURLToPath(new URL(p, import.meta.url));

// Site com várias páginas: cada protótipo é uma entrada do build.
export default defineConfig({
  plugins: [includePlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: page('./index.html'),
        web: page('./web/index.html'),
        mobile: page('./mobile/index.html'),
        site: page('./site/index.html'),
        subscriptions: page('./subscriptions/index.html'),
        registrationsWeb: page('./registrations/web/index.html'),
        registrationsMobile: page('./registrations/mobile/index.html'),
      },
    },
  },
});

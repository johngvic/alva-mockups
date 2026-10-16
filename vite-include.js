import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const INCLUDE = /^\/\/#include[ \t]+(\S+)[ \t]*(?=\r?$)/gm;
const norm = (p) => p.split('?')[0].replace(/\\/g, '/');

/* Inlina cada linha "//#include ./arquivo.js" pelo conteúdo do arquivo, na ordem do manifesto.
   Os arquivos incluídos compartilham o escopo do módulo que os inclui (mesmo comportamento de um arquivo único). */
export default function includePlugin() {
  const owners = new Map(); /* arquivo incluído -> módulos que o incluem */
  let server;
  return {
    name: 'alva-include',
    enforce: 'pre',
    configureServer(s) { server = s; },
    transform(code, id) {
      const file = norm(id);
      if (!file.endsWith('.js') || file.includes('/node_modules/') || !code.includes('//#include ')) return null;
      const dir = dirname(file);
      const out = code.replace(INCLUDE, (_, rel) => {
        const inc = resolve(dir, rel).replace(/\\/g, '/');
        if (!owners.has(inc)) owners.set(inc, new Set());
        owners.get(inc).add(file);
        this.addWatchFile(inc);
        return readFileSync(inc, 'utf8').replace(/\r?\n$/, '');
      });
      return { code: out, map: null };
    },
    handleHotUpdate({ file }) {
      const mods = owners.get(norm(file));
      if (!mods || !server) return;
      mods.forEach((m) => server.moduleGraph.getModulesByFile(m)?.forEach((mod) => server.moduleGraph.invalidateModule(mod)));
      server.ws.send({ type: 'full-reload' });
      return [];
    },
  };
}

/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { existsSync, readdirSync, statSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Helper to scan a directory for *.ts files
function scanTsFiles(dir, prefix) {
  const entries = {};
  try {
    const items = readdirSync(dir);
    for (const item of items) {
      const itemPath = resolve(dir, item);
      if (statSync(itemPath).isFile() && item.endsWith('.ts')) {
        const entryName = `${prefix}/${item.replace('.ts', '')}`;
        entries[entryName] = itemPath;
      }
    }
  } catch {
    // Directory doesn't exist
  }
  return entries;
}

// Helper to find barrel files: `<name>.ts` files that sit next to a `<name>/`
// directory and re-export its public API.
function scanBarrels(dir, prefix) {
  const entries = {};
  try {
    for (const item of readdirSync(dir)) {
      if (!item.endsWith('.ts') || item.endsWith('.d.ts')) {
        continue;
      }
      const name = item.replace(/\.ts$/, '');
      const subdir = resolve(dir, name);
      if (existsSync(subdir) && statSync(subdir).isDirectory()) {
        entries[prefix ? `${prefix}/${name}` : name] = resolve(dir, item);
      }
    }
  } catch {
    // Directory doesn't exist
  }
  return entries;
}

// Automatically discover entry points
function getEntries() {
  const entries = {};

  // Find the top-level barrels (element.ts, mixins.ts, controllers.ts, ...)
  Object.assign(entries, scanBarrels(__dirname, ''));

  // Find all components/*.ts barrels
  Object.assign(
    entries,
    scanBarrels(resolve(__dirname, 'components'), 'components')
  );

  // Find all element/*.ts files
  Object.assign(entries, scanTsFiles(resolve(__dirname, 'element'), 'element'));

  // Find all mixins/*.ts files
  Object.assign(entries, scanTsFiles(resolve(__dirname, 'mixins'), 'mixins'));

  // Find all controllers/*.ts files
  Object.assign(
    entries,
    scanTsFiles(resolve(__dirname, 'controllers'), 'controllers')
  );

  // Find all directives/*.ts files
  Object.assign(
    entries,
    scanTsFiles(resolve(__dirname, 'directives'), 'directives')
  );

  // Find all utils/*.ts files
  Object.assign(entries, scanTsFiles(resolve(__dirname, 'utils'), 'utils'));

  return entries;
}

export default defineConfig({
  plugins: [
    dts({
      include: ['**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.stories.ts'],
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: getEntries(),
      formats: ['es'],
    },
    rollupOptions: {
      external: (id) => {
        return (
          id === 'lit' ||
          id.startsWith('lit/') ||
          id.startsWith('@lit/') ||
          id.startsWith('@lit-labs/') ||
          id.startsWith('@floating-ui/') ||
          id === 'colorjs.io' ||
          id.startsWith('colorjs.io/') ||
          id.startsWith('@adobe/spectrum-wc-core/')
        );
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: '.',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
      },
    },
    target: 'es2018',
    sourcemap: true,
    emptyOutDir: true,
    outDir: 'dist',
  },
  esbuild: {
    target: 'es2018',
  },
});

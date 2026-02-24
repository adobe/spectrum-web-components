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
import { readdirSync, statSync } from 'fs';
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

// Helper to scan a directory for subdirectories with index.ts
function scanSubdirIndexes(dir, prefix) {
  const entries = {};
  try {
    const items = readdirSync(dir);
    for (const item of items) {
      const itemPath = resolve(dir, item);
      if (statSync(itemPath).isDirectory()) {
        const indexPath = resolve(itemPath, 'index.ts');
        try {
          statSync(indexPath);
          entries[`${prefix}/${item}/index`] = indexPath;
        } catch {
          // index.ts doesn't exist, skip
        }
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

  // Find all components/*/index.ts
  Object.assign(
    entries,
    scanSubdirIndexes(resolve(__dirname, 'components'), 'components')
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
      insertTypesEntry: true,
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
          id.startsWith('@spectrum-web-components/core/')
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

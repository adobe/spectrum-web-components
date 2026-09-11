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

import path from 'node:path';
import { getTsProgram, typeParserPlugin } from '@wc-toolkit/type-parser';

// type-parser logs an ungated `console.warn` for every deep or recursive lib
// type it declines to expand (DOM element types, `CSSStyleSheet`, etc.). Those
// bails are expected and only add noise, so drop just that message; other
// `[type-parser]` warnings (e.g. a bad tsconfig) still get through.
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    args.some(
      (arg) =>
        typeof arg === 'string' &&
        arg.includes('[type-parser] - Skipped parsing type')
    )
  ) {
    return;
  }
  originalWarn(...args);
};

/**
 * CEM plugin that extracts `@status` and `@since` JSDoc tags from class
 * declarations and attaches them to the corresponding CEM declaration.
 *
 * Usage in component source:
 * ```ts
 * /**
 *  * @element swc-my-component
 *  * @status preview
 *  * @since 1.0.0
 *  *\/
 * export class MyComponent extends … { … }
 * ```
 *
 * Produces CEM entries with `"status": "preview"` and `"since": "1.0.0"`.
 */
function statusPlugin() {
  return {
    name: 'cem-plugin-component-status',
    analyzePhase({ ts, node, moduleDoc }) {
      if (!ts.isClassDeclaration(node)) return;

      const jsDocs = node.jsDoc;
      if (!jsDocs?.length) return;

      const jsDoc = jsDocs[jsDocs.length - 1];
      if (!jsDoc.tags) return;

      const className = node.name?.getText();
      if (!className) return;

      const declaration = moduleDoc?.declarations?.find(
        (d) => d.name === className
      );
      if (!declaration) return;

      for (const tag of jsDoc.tags) {
        const tagName = tag.tagName.getText();

        if (tagName === 'status' || tagName === 'since') {
          const value =
            typeof tag.comment === 'string'
              ? tag.comment.trim()
              : tag.comment
                  ?.map((c) => c.text)
                  .join('')
                  .trim();

          if (value) {
            declaration[tagName] = value;
          }
        }
      }
    },
  };
}

export default {
  globs: [
    'components/**/*.ts',
    'patterns/**/*.ts',
    '../core/components/**/*.ts',
    '../core/controllers/**/*.ts',
    '../core/element/**/*.ts',
    '../core/mixins/**/*.ts',
    '../core/utils/**/*.ts',
  ],
  // Give type-parser the TypeScript type checker so it can expand referenced
  // type aliases (e.g. `(typeof ARRAY)[number]` unions) into literal values.
  overrideModuleCreation({ ts, globs }) {
    const program = getTsProgram(ts, globs, 'tsconfig.json');
    // `globs` here are resolved file paths, some relative with a `../` prefix
    // (core-package files referenced from this swc-package config). Comparing
    // raw strings with `includes()` never matches those against the program's
    // absolute `fileName`s, silently dropping every core-package module (and
    // with it, most components' base-class attributes) — resolve both sides.
    const resolvedGlobs = new Set(globs.map((glob) => path.resolve(glob)));
    return program
      .getSourceFiles()
      .filter((sf) => resolvedGlobs.has(path.resolve(sf.fileName)));
  },
  exclude: [
    '**/*.stories.ts',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/stories/**',
    '**/test/**',
    '../core/**/stories/**',
    '../core/**/test/**',
  ],
  outdir: 'dist',
  litelement: true,
  dev: false,
  plugins: [statusPlugin(), typeParserPlugin()],
};

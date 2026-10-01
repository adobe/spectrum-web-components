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

/**
 * Generates the public workflow icon art for the `@adobe/spectrum-wc-icons` package from
 * the A4U source SVGs. This generator is workflow-specific (it parses the workflow
 * filename form and emits two outputs per icon); the family-agnostic pieces it uses (SVG
 * cleanup, kebab casing, license and banner) live in `@adobe/spectrum-wc-core`'s
 * `tools/icons/`, shared with the UI generator in swc. Two outputs per icon:
 *
 *   - `<Name>.ts`            -> `Icon_<Name>()`, a framework-agnostic SVG-string function
 *   - `swc-icon-<kebab>.ts`  -> `Icon<Name>`, a custom element extending `IconBase`
 *
 * plus three generated aggregates:
 *
 *   - `index.ts`    -> re-exports every `Icon_<Name>` function (tree-shakeable substrate)
 *   - `elements.ts` -> side-effect imports that register every `<swc-icon-*>` tag
 *   - `manifest.ts` -> `WORKFLOW_ICONS`, the logical name and tag of every icon
 *
 * Input:  icon-source/S2_Icon_<Name>_20_N.svg
 * Output: src/<Name>.ts, src/swc-icon-<kebab>.ts, src/index.ts, src/elements.ts,
 *         src/manifest.ts
 *
 * Run with `yarn generate:workflow-icons` (from this package or the repo root). That
 * command also re-copies the shared stylesheet (`yarn generate:icon-styles`). Regenerate
 * whenever the source SVGs change. See ../icon-source/README.md.
 */
import { globSync } from 'glob';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Build-time helpers shared with the UI generator. Imported by path: core publishes only
// dist/, so these are not package exports.
import {
  generatedBanner,
  LICENSE,
  toKebab,
} from '../../core/tools/icons/format.mjs';
import { cleanSvg } from '../../core/tools/icons/svg.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const sourceDir = path.join(packageRoot, 'icon-source');
// Generated art lives flat under src/ so each icon publishes as a top-level subpath
// (e.g. `@adobe/spectrum-wc-icons/Star.js`).
const outDir = path.join(packageRoot, 'src');

// A4U workflow source filename: one drawing per icon, scaled to the 20px token box, no
// optical step. See icon-source/README.md.
const SOURCE_NAME = /^S2_Icon_(?<name>.+?)_20_N\.svg$/;

// The `@since` version for generated elements, read from this package.json so it
// tracks the package version (bumped by changesets) rather than a hand-maintained
// constant. All gen2 packages are version-locked, so this matches the core version
// exported from core/element/version.ts too.
const SINCE = JSON.parse(
  readFileSync(path.join(packageRoot, 'package.json'), 'utf8')
).version;

const GENERATED_BANNER = generatedBanner(
  'yarn generate:workflow-icons',
  'icon-source/'
);

// Collect: logical PascalCase name -> cleaned svg string.
const icons = new Map();
const files = globSync('*.svg', { cwd: sourceDir }).sort();

// Refuse to run without source SVGs. The raw SVGs are git-ignored, so on a clean
// checkout this would otherwise delete the committed art and write empty barrels,
// breaking every consumer.
if (files.length === 0) {
  throw new Error(
    `No source SVGs found in ${sourceDir}. Download the S2 Icon Global Set (Open ` +
      `Source) into that folder before running the generator.`
  );
}

for (const file of files) {
  const match = SOURCE_NAME.exec(file);
  if (!match) {
    console.warn(`Skipping unrecognized source file: ${file}`);
    continue;
  }
  const { name } = match.groups;
  icons.set(
    name,
    cleanSvg(readFileSync(path.join(sourceDir, file), 'utf8'), file)
  );
}

const names = [...icons.keys()].sort();

// Guard against two logical names collapsing to the same kebab tag, which would make the
// second `defineElement` call throw at runtime. Deterministic, so a collision is a source
// problem to resolve, not a silent overwrite.
const tags = new Map();
for (const name of names) {
  const tag = `swc-icon-${toKebab(name)}`;
  if (tags.has(tag)) {
    throw new Error(
      `Tag collision: "${tags.get(tag)}" and "${name}" both map to <${tag}>.`
    );
  }
  tags.set(tag, name);
}

// Ensure the output directory exists, then remove previously generated modules so
// deletions in source propagate. Only the flat generated `.ts` files at src/ root are
// cleared; src/stylesheets/ (the copied icon-base.css) is a subfolder and is untouched.
mkdirSync(outDir, { recursive: true });
for (const stale of globSync('*.ts', { cwd: outDir, ignore: '*.d.ts' })) {
  rmSync(path.join(outDir, stale));
}

// Emit the two modules per logical icon.
for (const name of names) {
  const kebab = toKebab(name);
  const tag = `swc-icon-${kebab}`;
  const svg = icons.get(name);

  // 1. The substrate: a framework-agnostic SVG-string function. No Lit, no element.
  const fnModule = `${LICENSE}
${GENERATED_BANNER}

/**
 * The ${name} workflow icon as a framework-agnostic SVG string. Usable via \`innerHTML\`,
 * React \`dangerouslySetInnerHTML\`, Vue \`v-html\`, or Lit \`unsafeSVG\`. Color follows
 * \`var(--swc-icon-color, currentColor)\`.
 */
export function Icon_${name}(): string {
  return \`${svg}\`;
}
`;
  writeFileSync(path.join(outDir, `${name}.ts`), fnModule);

  // 2. The element: extends IconBase, bakes the substrate in via unsafeSVG, registers the
  //    tag. Side-effectful, so importing the subpath registers `<${tag}>`.
  const elModule = `${LICENSE}
${GENERATED_BANNER}
import { CSSResultArray, html, TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { IconBase } from '@adobe/spectrum-wc-core/components/icon';
import { defineElement } from '@adobe/spectrum-wc-core/element/index.js';

import { Icon_${name} } from './${name}.js';

import styles from './stylesheets/icon-base.css';

/**
 * The ${name} workflow icon as a custom element.
 *
 * @element ${tag}
 * @since ${SINCE}
 *
 * @cssprop --swc-icon-color - Color of the icon.
 * @cssprop --swc-icon-inline-size - Inline size of the icon box.
 * @cssprop --swc-icon-block-size - Block size of the icon box.
 */
export class Icon${name} extends IconBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    return html\`
      \${unsafeSVG(Icon_${name}())}
    \`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '${tag}': Icon${name};
  }
}

defineElement('${tag}', Icon${name});
`;
  writeFileSync(path.join(outDir, `${tag}.ts`), elModule);
}

// Emit the function barrel (the package's `.` entry): the tree-shakeable substrate.
const fnExports = names
  .map((name) => `export { Icon_${name} } from './${name}.js';`)
  .join('\n');
const index = `${LICENSE}
${GENERATED_BANNER}
${fnExports}
`;
writeFileSync(path.join(outDir, 'index.ts'), index);

// Emit the register-all barrel (the `elements.js` entry): a convenience that registers
// every workflow tag. Not the tree-shaking path; import individual subpaths for that.
const elImports = names
  .map((name) => `import './swc-icon-${toKebab(name)}.js';`)
  .join('\n');
const elements = `${LICENSE}
${GENERATED_BANNER}
${elImports}
`;
writeFileSync(path.join(outDir, 'elements.ts'), elements);

// Emit a small manifest (logical name + registered tag per icon) so galleries, icon
// pickers, and tests can enumerate the set without parsing filenames or the CEM.
const manifestEntries = names
  .map((name) => `  { name: '${name}', tag: 'swc-icon-${toKebab(name)}' },`)
  .join('\n');
const manifest = `${LICENSE}
${GENERATED_BANNER}

/** Every workflow icon: its logical name and its registered custom element tag. */
export const WORKFLOW_ICONS = [
${manifestEntries}
] as const;

export type WorkflowIcon = (typeof WORKFLOW_ICONS)[number];
export type WorkflowIconName = WorkflowIcon['name'];
export type WorkflowIconTag = WorkflowIcon['tag'];
`;
writeFileSync(path.join(outDir, 'manifest.ts'), manifest);

console.log(
  `Generated ${names.length} workflow icon(s) (function + element) from ${files.length} source SVG(s).`
);

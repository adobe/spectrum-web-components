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
 * Generates the public workflow-icon art (per-icon SVG-string function + per-icon
 * custom element) from the A4U source SVGs. This generator is workflow-specific (it
 * parses the workflow filename form and emits two modules per icon); the
 * family-agnostic pieces it uses (SVG cleanup, kebab casing, license and banner) are
 * shared with the UI generator via `icon-source/utils/`.
 *
 * Staged inside `swc` for now (`components/workflow-icons/`), mirroring where UI icons
 * live (`components/ui-icons/`). Packaging this output into the dedicated
 * `@adobe/spectrum-wc-icons` package is a separate, later phase (SWC-2441); this
 * generator's output location will move at that point, not before.
 *
 * Input:  icon-source/workflow/S2_Icon_<Name>_20_N.svg
 * Output: components/workflow-icons/<Name>.ts             (SVG-string function, e.g. StarIcon())
 *         components/workflow-icons/swc-icon-<name>.ts    (custom element extending IconBase)
 *
 * Run with `yarn generate:workflow-icons`. Regenerate whenever the source SVGs change.
 */
import { globSync } from 'glob';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  generatedBanner,
  LICENSE,
  toKebab,
} from '../icon-source/utils/format.mjs';
import { cleanSvg } from '../icon-source/utils/svg.mjs';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(scriptDir, '..');
const sourceDir = path.join(packageRoot, 'icon-source', 'workflow');
const outDir = path.join(packageRoot, 'components', 'workflow-icons');

// A4U source filename: S2_Icon_<LogicalName>_20_N.svg (one fixed-size drawing per
// icon, no optical step).
const SOURCE_NAME = /^S2_Icon_(?<name>.+?)_20_N\.svg$/;

const GENERATED_BANNER = generatedBanner(
  'yarn generate:workflow-icons',
  'icon-source/workflow/'
);

// Collect: logical name -> cleaned svg string. One drawing per icon (no per-step map,
// unlike UI icons), per the RFC's workflow sizing model: one asset scaled
// to a token box, not discrete optically-tuned steps.
const icons = new Map();
const files = globSync('*.svg', { cwd: sourceDir }).sort();

// Refuse to run without source SVGs. The source folder is git-ignored, so on a clean
// checkout this would otherwise delete the committed workflow icon art and write
// nothing, breaking every consumer.
if (files.length === 0) {
  throw new Error(
    `No source SVGs found in ${sourceDir}. Download the workflow icon set into that ` +
      `folder before running the generator.`
  );
}

for (const file of files) {
  const match = SOURCE_NAME.exec(file);
  if (!match) {
    console.warn(`Skipping unrecognized source file: ${file}`);
    continue;
  }
  const { name } = match.groups;
  // The captured name feeds directly into an output file path below; reject
  // anything that isn't a plain identifier rather than trusting an
  // unconstrained regex capture against locally-placed files.
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    console.warn(`Skipping source file with an unsafe logical name: ${file}`);
    continue;
  }
  let svg;
  try {
    svg = cleanSvg(readFileSync(path.join(sourceDir, file), 'utf8'), file);
  } catch (error) {
    throw new Error(`Failed to clean source SVG ${file}: ${error.message}`, {
      cause: error,
    });
  }
  icons.set(name, svg);
}

const names = [...icons.keys()].sort();

// Ensure the output directory exists, then remove previously generated modules so
// deletions in source propagate.
mkdirSync(outDir, { recursive: true });
// workflow-icons/ holds only generated modules, so clearing them all is safe.
for (const stale of globSync('*.ts', { cwd: outDir })) {
  rmSync(path.join(outDir, stale));
}

// Emit two modules per icon: the SVG-string function substrate, and the custom
// element that bakes it in via `unsafeSVG` (RFC icon-rfc.md, section 6.4, item 2).
for (const name of names) {
  const svg = icons.get(name);
  const kebabName = toKebab(name);
  const tagName = `swc-icon-${kebabName}`;
  const elementClassName = `Icon${name}`;
  const functionName = `${name}Icon`;

  // Emitted as a backtick-delimited string (still a plain `string` type, not a Lit
  // TemplateResult, per the RFC) rather than a single-quoted one: template literals
  // permit raw embedded newlines, so cleaned SVG content needs no newline-collapsing,
  // only escaping the three sequences that could otherwise break out of it.
  const escapedSvg = svg
    .trim()
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  const functionModule = `${LICENSE}
${GENERATED_BANNER}
export function ${functionName}(): string {
  return \`${escapedSvg}\`;
}
`;
  writeFileSync(path.join(outDir, `${name}.ts`), functionModule);

  const elementModule = `${LICENSE}
${GENERATED_BANNER}
import { CSSResultArray, html, TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

import { IconBase } from '@adobe/spectrum-wc-core/components/icon';
import { defineElement } from '@adobe/spectrum-wc-core/element/index.js';

import { ${functionName} } from './${name}.js';

import iconBaseStyles from '../../stylesheets/_lit-styles/icon-base.css';

declare global {
  interface HTMLElementTagNameMap {
    '${tagName}': ${elementClassName};
  }
}

export class ${elementClassName} extends IconBase {
  public static override get styles(): CSSResultArray {
    return [iconBaseStyles];
  }

  protected override render(): TemplateResult {
    return html\`
      <span class="swc-Icon">\${unsafeSVG(${functionName}())}</span>
    \`;
  }
}

defineElement('${tagName}', ${elementClassName});
`;
  writeFileSync(path.join(outDir, `swc-icon-${kebabName}.ts`), elementModule);
}

console.log(
  `Generated ${names.length} workflow icon(s) (function + element each) from ${files.length} source SVG(s): ${names.join(', ')}`
);

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

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const TOKENS_PATH = path.join(PACKAGE_ROOT, 'tokens.json');
const SNIPPETS_DIR = path.join(PACKAGE_ROOT, 'snippets');
const SNIPPETS_PATH = path.join(SNIPPETS_DIR, 'typography.code-snippets');
const TYPOGRAPHY_PREFIX = 'type';

const TYPOGRAPHY_KEYS = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'letterSpacing',
];

function isTypographyToken(value) {
  return (
    Boolean(value) &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    TYPOGRAPHY_KEYS.every((key) => typeof value[key] === 'string')
  );
}

function toKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function toTokenFunction(value) {
  const match = /^var\(--swc-([^)]+)\)$/.exec(value.trim());
  return match ? `token("${match[1]}")` : value;
}

function buildSnippetBody(token) {
  return TYPOGRAPHY_KEYS.map(
    (key) => `${toKebabCase(key)}: ${toTokenFunction(token[key])};`
  );
}

function normalizeTokenPayload(source) {
  if (source && typeof source === 'object' && source.tokens) {
    return source.tokens;
  }

  return source;
}

async function main() {
  const raw = JSON.parse(await readFile(TOKENS_PATH, 'utf8'));
  const tokens = normalizeTokenPayload(raw);

  const snippets = Object.fromEntries(
    Object.entries(tokens)
      .filter(([, value]) => isTypographyToken(value))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, value]) => [
        `Typography ${name}`,
        {
          prefix: `${TYPOGRAPHY_PREFIX}-${name}`,
          description: `Expand ${name} typography token into CSS declarations`,
          body: buildSnippetBody(value),
        },
      ])
  );

  await mkdir(SNIPPETS_DIR, { recursive: true });
  await writeFile(SNIPPETS_PATH, `${JSON.stringify(snippets, null, 2)}\n`);

  console.log(
    `Generated ${Object.keys(snippets).length} typography snippets at ${path.relative(PACKAGE_ROOT, SNIPPETS_PATH)}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

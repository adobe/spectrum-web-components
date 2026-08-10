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
import type { StoryContext } from '@storybook/web-components';

import customElements from '../../dist/custom-elements.json';

const PATTERN_TITLE_PREFIX = 'Patterns/Conversational AI/';

// Attribute names declared as `boolean` on every custom element that has them.
const BOOLEAN_ATTRIBUTE_NAMES = computeBooleanAttributeNames(customElements);

/**
 * Format source snippets for Storybook code panel.
 * For conversational AI pattern stories, this removes CSF wrapper noise and
 * keeps only the `html\`...\`` content when possible.
 */
export async function transformDocsSource(
  source: string,
  storyContext?: StoryContext
): Promise<string> {
  const normalizedSource = shouldNormalizePatternSource(storyContext)
    ? extractHtmlTemplate(source)
    : source;

  const formatted = await formatHtml(normalizedSource);
  return collapseBooleanAttributes(formatted);
}

function computeBooleanAttributeNames(
  manifest: typeof customElements
): Set<string> {
  const booleanNames = new Set<string>();
  const nonBooleanNames = new Set<string>();

  for (const mod of manifest.modules ?? []) {
    for (const decl of mod.declarations ?? []) {
      for (const attr of 'attributes' in decl ? (decl.attributes ?? []) : []) {
        const type = attr.type?.text?.trim();
        if (type === 'boolean') {
          booleanNames.add(attr.name);
        } else {
          nonBooleanNames.add(attr.name);
        }
      }
    }
  }

  for (const name of nonBooleanNames) {
    booleanNames.delete(name);
  }

  return booleanNames;
}

function collapseBooleanAttributes(source: string): string {
  let result = source;
  for (const name of BOOLEAN_ATTRIBUTE_NAMES) {
    const pattern = new RegExp(`(^|\\s)${name}=""`, 'gm');
    result = result.replace(pattern, `$1${name}`);
  }
  return result;
}

function shouldNormalizePatternSource(storyContext?: StoryContext): boolean {
  return storyContext?.title?.startsWith(PATTERN_TITLE_PREFIX) ?? false;
}

function extractHtmlTemplate(source: string): string {
  const primaryMatch = source.match(
    /\brender\s*:\s*\([^)]*\)\s*=>\s*html`([\s\S]*?)`\s*[},]/m
  );
  if (primaryMatch?.[1]) {
    return primaryMatch[1].trim();
  }

  const fallbackMatch = source.match(/\bhtml`([\s\S]*?)`/m);
  if (fallbackMatch?.[1]) {
    return fallbackMatch[1].trim();
  }

  return source;
}

async function formatHtml(source: string): Promise<string> {
  try {
    const prettier = await import('prettier/standalone');
    const prettierPluginHtml = await import('prettier/plugins/html');
    const prettierPluginBabel = await import('prettier/plugins/babel');
    const prettierPluginEstree = await import('prettier/plugins/estree');

    return prettier.format(source, {
      parser: 'html',
      plugins: [
        prettierPluginHtml.default,
        prettierPluginBabel.default,
        prettierPluginEstree.default,
      ],
      tabWidth: 2,
      useTabs: false,
      singleQuote: true,
      printWidth: 80,
    });
  } catch {
    return source;
  }
}

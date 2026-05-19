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

import prettier from 'prettier';

/**
 * @param {string} exportName - CSF export name (e.g. "SemanticVariants")
 * @returns {string}
 */
export function exportNameToStorySlug(exportName) {
  return exportName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * @param {string} componentSlug - kebab-case folder name (e.g. "badge")
 * @param {string} exportName
 * @returns {string}
 */
export function buildStoryId(componentSlug, exportName) {
  return `components-${componentSlug}--${exportNameToStorySlug(exportName)}`;
}

/**
 * @param {import('playwright').Page} page
 * @param {string} storyId
 * @param {string} tagName
 * @param {string} baseUrl
 * @returns {Promise<string>}
 */
export async function captureStoryHtml(page, storyId, tagName, baseUrl) {
  const url = `${baseUrl.replace(/\/$/, '')}/iframe.html?id=${storyId}&viewMode=story`;

  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('networkidle');

  await page.waitForFunction(
    (tag) => customElements.get(tag) !== undefined,
    tagName,
    { timeout: 30_000 }
  );

  await page.waitForFunction(() => {
    const root = document.querySelector('#storybook-root');
    return root && root.children.length > 0;
  });

  const rawHtml = await page.evaluate(() => {
    const root = document.querySelector('#storybook-root');
    if (!root) {
      return '';
    }

    /** @type {HTMLElement} */
    let container =
      root.querySelector('#root-inner') ?? /** @type {HTMLElement} */ (root);

    const isFlexDecorator = (element) => {
      if (!(element instanceof HTMLElement) || element.tagName !== 'DIV') {
        return false;
      }

      const display = element.style.display || getComputedStyle(element).display;
      return display === 'flex';
    };

    // Strip Storybook shells: single-child flex wrappers from withFlexLayout.
    while (
      container.children.length === 1 &&
      isFlexDecorator(container.children[0])
    ) {
      container = /** @type {HTMLElement} */ (container.children[0]);
    }

    if (container.children.length === 0) {
      return container.outerHTML;
    }

    return Array.from(container.children)
      .map((child) => child.outerHTML)
      .join('\n');
  });

  const cleaned = cleanCapturedHtml(rawHtml);

  try {
    return await prettier.format(cleaned, {
      parser: 'html',
      printWidth: 100,
    });
  } catch {
    return cleaned;
  }
}

/**
 * @param {string} html
 * @returns {string}
 */
function cleanCapturedHtml(html) {
  return html
    .replace(/<!--\?lit\$[\d]+\$-->/g, '')
    .replace(/<!---->/g, '')
    .replace(/\s+$/gm, '')
    .replace(/\n{3,}/g, '\n\n');
}

/**
 * @param {string} html
 * @param {string} [label]
 * @returns {string}
 */
export function htmlExampleBlock(html, label) {
  const heading = label ? `#### Example: ${label}\n\n` : '';
  return `${heading}\`\`\`html\n${html.trim()}\n\`\`\`\n`;
}

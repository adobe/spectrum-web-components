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

import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../../utils/a11y-helpers.js';

/**
 * ARIA snapshot tests for source list.
 * WCAG axe scans run via test-storybook on stories tagged `a11y`.
 */

test.describe('SourceList - ARIA Snapshots', () => {
  test('exposes a named list of links without the thumbnail or number box', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-source-list--accessibility',
      'swc-source-list'
    );
    await expect(root).toMatchAriaSnapshot(`
      - list "Sources":
        - listitem:
          - text: Adobe.com
          - link "How do we do in-line sources?":
            - /url: https://www.adobe.com
          - blockquote:
            - paragraph: In-line sources place citations directly next to statements, creating a clear connection between output and source.
        - listitem:
          - text: Spectrum
          - link "Designing for generative AI experiences":
            - /url: https://spectrum.adobe.com
          - blockquote:
            - paragraph: Show people where generated content comes from so they can judge its reliability for themselves.
        - listitem:
          - text: Spectrum Web Components
          - link "Accessible web components for Spectrum":
            - /url: https://opensource.adobe.com/spectrum-web-components
          - blockquote:
            - paragraph: Web components that implement the Spectrum design language, built for accessibility and consistency.
    `);
  });

  test('concise items expose only the link', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-source-list--verbosity',
      'swc-source-list[verbosity="concise"]'
    );
    await expect(root.locator('swc-source-list[verbosity="concise"]'))
      .toMatchAriaSnapshot(`
      - list "Sources":
        - listitem:
          - link "How do we do in-line sources?":
            - /url: https://www.adobe.com
        - listitem:
          - link "Designing for generative AI experiences":
            - /url: https://spectrum.adobe.com
        - listitem:
          - link "Accessible web components for Spectrum":
            - /url: https://opensource.adobe.com/spectrum-web-components
    `);
  });
});

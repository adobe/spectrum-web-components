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
 * Accessibility tests for UserMessage pattern
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('UserMessage - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default user message', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--overview',
      'swc-user-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: /Can you help me/
    `);
  });

  test('should expose accessible card attachment content', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--content',
      'swc-user-message'
    );
    const cardMessage = root.locator('swc-user-message').nth(1);
    await expect(cardMessage).toMatchAriaSnapshot(`
      - group "Hilton commercial assets":
        - text: "2026"
    `);
  });

  test('should expose accessible media attachment content', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--content',
      'swc-user-message'
    );
    const mediaMessage = root.locator('swc-user-message').nth(2);
    await expect(mediaMessage).toMatchAriaSnapshot(`
      - img "Campaign preview"
    `);
  });

  test('should group document cards and prompts in their user turns', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--card',
      'swc-user-message'
    );
    const turns = root.locator('swc-conversation-turn');
    await expect(turns).toHaveCount(2);
    for (const [index, count] of [1, 6].entries()) {
      const turn = turns.nth(index);
      await expect(turn).toHaveAttribute('aria-label', 'User message');
      await expect(turn.locator('swc-user-message[type="card"]')).toHaveCount(
        1
      );
      await expect(turn.locator('swc-upload-attachment')).toHaveCount(count);
      await expect(turn.locator('swc-user-message')).toHaveCount(2);
    }
    const cards = root.locator('swc-upload-attachment');
    await expect(cards.nth(0)).toMatchAriaSnapshot(`
      - group "Brand guidelines.pdf":
        - text: 1.2 MB
    `);
    await expect(cards.nth(1)).toMatchAriaSnapshot(`
      - group "Campaign brief.pdf":
        - text: 840 KB
    `);
    await expect(cards.nth(2)).toMatchAriaSnapshot(`
      - group "Research notes.txt":
        - text: 24 KB
    `);
  });

  test('should keep grouped documents keyboard-scrollable without upload actions', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--card',
      'swc-user-message'
    );
    const viewport = root.getByRole('group', {
      name: 'Uploaded documents',
      exact: true,
    });
    await expect(viewport).toBeVisible();
    await expect(viewport).toMatchAriaSnapshot(`
      - group "Uploaded documents":
        - group "Campaign brief.pdf":
          - text: 840 KB
        - group "Research notes.txt":
          - text: 24 KB
        - group "Audience research.pdf":
          - text: 2.4 MB
        - group "Brand voice.txt":
          - text: 18 KB
        - group "Launch timeline.pdf":
          - text: 640 KB
        - group "Budget summary.pdf":
          - text: 96 KB
    `);
    await expect(root.getByRole('button')).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(viewport).toBeFocused();
    await page.keyboard.press('End');
    await expect
      .poll(() => viewport.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    await page.keyboard.press('Home');
    await expect
      .poll(() => viewport.evaluate((element) => element.scrollTop))
      .toBe(0);
  });

  test('should expose gallery image descriptions and message copy in one turn', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--media',
      'swc-user-message'
    );
    const gallery = root.locator('swc-user-message[type="media"]');
    await expect(gallery).toMatchAriaSnapshot(`
      - img "Photobook reference 1"
      - img "Photobook reference 2"
      - img "Photobook reference 3"
      - img "Photobook reference 4"
      - img "Photobook reference 5"
      - img "Photobook reference 6"
      - img "Photobook reference 7"
    `);
    await expect(root.locator('swc-conversation-turn')).toHaveAttribute(
      'aria-label',
      'User message'
    );
  });

  test('should name overflowing galleries and support native keyboard scrolling', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--gallery-overflow',
      'swc-user-message'
    );
    const viewport = root.getByRole('group', { name: 'Uploaded images' });
    await expect(viewport).toHaveAttribute('tabindex', '0');
    await expect(viewport).toMatchAriaSnapshot(
      `- group "Uploaded images":\n${Array.from(
        { length: 24 },
        (_, index) => `  - img "Photobook reference ${index + 1}"`
      ).join('\n')}`
    );

    await page.keyboard.press('Tab');
    await expect(viewport).toBeFocused();
    await expect(root.locator('.swc-UserMessage-galleryContainer')).toHaveCSS(
      'outline-style',
      'solid'
    );

    await viewport.press('End');
    await expect
      .poll(() =>
        viewport.evaluate(
          (element) =>
            Math.abs(
              element.scrollTop - (element.scrollHeight - element.clientHeight)
            ) < 1
        )
      )
      .toBe(true);

    await viewport.press('Home');
    await expect
      .poll(() => viewport.evaluate((element) => element.scrollTop))
      .toBe(0);
    await page.keyboard.press('Tab');
    await expect(viewport).not.toBeFocused();
  });

  test('should keep overflowing images unmasked in forced colors', async ({
    page,
  }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--gallery-overflow',
      'swc-user-message'
    );
    const viewport = root.getByRole('group', { name: 'Uploaded images' });
    await expect(viewport).toHaveCSS('mask-image', 'none');
    await expect(viewport).toHaveCSS('animation-name', 'none');
    await expect(viewport).toHaveAttribute('tabindex', '0');
    expect(
      await viewport.evaluate(
        (element) => element.scrollHeight > element.clientHeight
      )
    ).toBe(true);
  });
});

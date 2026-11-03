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

test.describe('UserMessage - ARIA Snapshots', () => {
  test('exposes message copy without an attachment tab stop', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--playground',
      'swc-user-message'
    );
    await expect(root.locator('swc-user-message')).toMatchAriaSnapshot(`
      - text: Can you summarize these campaign references?
    `);
    await expect(root.locator('swc-user-message [tabindex="0"]')).toHaveCount(
      0
    );
  });

  for (const type of ['media', 'card'] as const) {
    test(`names ${type} collections and supports native keyboard scrolling`, async ({
      page,
    }) => {
      const root = await gotoStory(
        page,
        'patterns-ai-toolkit-user-message--overflow',
        'swc-user-message'
      );
      const message = root.locator('swc-user-message');
      if (type === 'card') {
        await message.evaluate((host) => {
          const cardMessage = document.createElement('swc-user-message');
          cardMessage.setAttribute('type', 'card');
          cardMessage.innerHTML = Array.from(
            { length: 6 },
            (_, index) => `
            <swc-upload-attachment slot="thumbnail" type="card">
              <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
              <span slot="title">Campaign reference ${index + 1}.pdf</span>
              <span slot="subtitle">1.2 MB</span>
            </swc-upload-attachment>
          `
          ).join('');
          host.replaceWith(cardMessage);
        });
      }
      const name = 'Uploaded attachments';
      const viewport = root.getByRole('group', { name, exact: true });
      await expect(viewport).toMatchAriaSnapshot(
        `- group "${name}":\n${Array.from(
          { length: type === 'card' ? 6 : 24 },
          (_, index) =>
            type === 'card'
              ? `  - group "Campaign reference ${index + 1}.pdf":\n    - text: 1.2 MB`
              : `  - img "Photobook reference ${index + 1}"`
        ).join('\n')}`
      );
      await expect(root.getByRole('button')).toHaveCount(0);
      await page.keyboard.press('Tab');
      await expect(viewport).toBeFocused();
      await expect(message).toHaveCSS('outline-style', 'solid');
      await viewport.press('End');
      await expect
        .poll(() => viewport.evaluate((element) => element.scrollTop))
        .toBeGreaterThan(0);
      await viewport.press('Home');
      await expect
        .poll(() => viewport.evaluate((element) => element.scrollTop))
        .toBe(0);

      await message.evaluate((host) => {
        [...host.children]
          .slice(1)
          .forEach((attachment) => attachment.remove());
      });
      await expect(viewport).toHaveAttribute('tabindex', '0');
      await expect(viewport).toHaveCSS('mask-image', 'none');
    });
  }

  test('keeps attachments and focus visible in forced colors', async ({
    page,
  }) => {
    await page.emulateMedia({ forcedColors: 'active' });
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-user-message--overflow',
      'swc-user-message'
    );
    const viewport = root.getByRole('group', { name: 'Uploaded attachments' });
    await expect(viewport).toHaveCSS('mask-image', 'none');
    await expect(viewport).toHaveCSS('animation-name', 'none');
    await page.keyboard.press('Tab');
    await expect(viewport).toBeFocused();
    await expect(root.locator('swc-user-message')).toHaveCSS(
      'outline-style',
      'solid'
    );
  });
});

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
import { gotoStory } from '@swc-test-helpers/playwright';

test.describe('UploadAttachment - ARIA Snapshots', () => {
  test('should match ARIA snapshot for dismissible card content', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-upload-attachment--overview',
      'swc-upload-attachment'
    );

    const attachment = root.locator('swc-upload-attachment').first();

    await expect(attachment).toMatchAriaSnapshot(`
      - group "Hilton commercial assets":
        - button "Remove Hilton commercial assets"
        - img "Campaign preview"
        - text: "2026"
    `);
  });

  test('exposes badge text in the keyboard-focused remove button', async ({
    page,
    browserName,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-upload-attachment--media-with-badge',
      'swc-upload-attachment'
    );
    const removeButton = root.getByRole('button', {
      name: 'Remove attachment, PDF',
      exact: true,
    });
    await expect(removeButton).toBeVisible();
    // Safari's default focus order includes native buttons with Option+Tab.
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(removeButton).toBeFocused();

    await root.locator('[slot="badge"]').evaluate((badge) => {
      badge.textContent = 'DOCX';
    });
    await expect(
      root.getByRole('button', { name: 'Remove attachment, DOCX', exact: true })
    ).toBeFocused();

    await root.locator('swc-upload-attachment').evaluate((attachment) => {
      attachment.setAttribute('dismiss-label', 'Discard campaign');
    });
    await expect(
      root.getByRole('button', { name: 'Discard campaign', exact: true })
    ).toBeFocused();
  });
});

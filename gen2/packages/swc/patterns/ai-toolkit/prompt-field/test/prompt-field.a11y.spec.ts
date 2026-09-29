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
 * Accessibility tests for PromptField pattern
 *
 * ARIA snapshot tests validate the accessibility tree structure.
 * aXe WCAG compliance and color contrast validation are run via
 * test-storybook (see .storybook/test-runner.ts). Both are included
 * in the `test:a11y` command.
 */

test.describe('PromptField - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default (expanded) prompt field', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-prompt-field--overview',
      'swc-prompt-field'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: Prompt
      - textbox "Prompt"
      - button "Add attachment"
      - button "Send" [disabled]
    `);
  });

  test('should have correct accessibility tree for collapsed prompt field', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-prompt-field--layout',
      'swc-prompt-field'
    );
    const collapsedField = root.locator('swc-prompt-field').nth(1);
    await expect(collapsedField).toMatchAriaSnapshot(`
      - text: Prompt
      - textbox "Prompt"
      - button "Send" [disabled]
    `);
  });
});

test.describe('PromptField - Keyboard Navigation', () => {
  test('Tab enters the attachment strip on its first tile', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-prompt-field--attachment',
      'swc-prompt-field'
    );
    const attachments = root
      .locator('swc-prompt-field')
      .first()
      .locator('swc-upload-attachment');

    await expect(attachments.first()).toHaveAttribute('tabindex', '0');
    await expect(attachments.nth(1)).toHaveAttribute('tabindex', '-1');

    await root.evaluate((element) => {
      const precedingButton = document.createElement('button');
      precedingButton.type = 'button';
      precedingButton.textContent = 'Before attachments';
      element.prepend(precedingButton);
    });

    const precedingButton = root.getByRole('button', {
      name: 'Before attachments',
    });
    await page.keyboard.press('Tab');
    await expect(precedingButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(attachments.first()).toBeFocused();
  });
});

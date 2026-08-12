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

import { gotoStory } from '../../../utils/a11y-helpers.js';

/**
 * Accessibility tests for the Drop Zone component (2nd generation).
 *
 * ARIA snapshot tests validate accessibility tree structure for each significant
 * state. aXe WCAG compliance and color contrast checks are run separately via
 * test-storybook (see .storybook/test-runner.ts). Both are included in `test:a11y`.
 */

test.describe('Drop Zone - ARIA snapshots', () => {
  test('default drop zone has correct group role and accessible name', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-drop-zone--overview',
      'swc-dropzone'
    );
    await expect(root).toMatchAriaSnapshot(`
      - group "Upload files":
        - heading "Drag and drop your file" [level=2]
        - button "Browse files"
    `);
  });

  test('dragged drop zone announces "File ready to drop" via status region', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-drop-zone--states',
      'swc-dropzone'
    );
    const draggedDropzone = root
      .locator('swc-dropzone[dragged]:not([filled])')
      .first();
    await expect(draggedDropzone).toMatchAriaSnapshot(`
      - group "Dragged drop zone":
        - status: File ready to drop
        - heading "Drop file to upload" [level=2]
        - button "Browse files"
    `);
  });

  test('filled drop zone announces "File accepted" via status region', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-drop-zone--states',
      'swc-dropzone'
    );
    const filledDropzone = root
      .locator('swc-dropzone[filled]:not([dragged])')
      .first();
    await expect(filledDropzone).toMatchAriaSnapshot(`
      - group "Filled drop zone":
        - status: File accepted
    `);
  });

  test('filled-and-dragged drop zone announces "Drop to replace existing file"', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-drop-zone--states',
      'swc-dropzone'
    );
    const filledAndDraggedDropzone = root
      .locator('swc-dropzone[filled][dragged]')
      .first();
    await expect(filledAndDraggedDropzone).toMatchAriaSnapshot(`
      - group "Filled and dragged drop zone":
        - status: Drop to replace existing file
    `);
  });

  test('host element is not keyboard focusable', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-drop-zone--overview',
      'swc-dropzone'
    );
    const dropzone = root.locator('swc-dropzone');
    await expect(dropzone).not.toBeFocused();
    // Tab once; focus should not land on the host.
    await page.keyboard.press('Tab');
    await expect(dropzone).not.toBeFocused();
  });

  test('browse button is the first keyboard-focusable element', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'components-drop-zone--overview',
      'swc-dropzone'
    );
    const browseButton = root.locator('swc-button');
    await page.keyboard.press('Tab');
    await expect(browseButton).toBeFocused();
  });
});

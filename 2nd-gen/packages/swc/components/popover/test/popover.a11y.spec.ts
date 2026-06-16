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
 * Accessibility tests for Popover component (2nd Generation)
 *
 * Phase 2 scaffold: verifies the element mounts in the overview story. aXe WCAG
 * compliance and color-contrast validation run via test-storybook (see
 * .storybook/test-runner.ts). Full ARIA-tree snapshots land once the lifecycle
 * and modal semantics are implemented in later phases.
 *
 * Skipped until Phase 4/5: with no lifecycle yet, the overview story renders an
 * unopened top-layer surface, so there is no meaningful accessibility tree to
 * assert against. Re-enable (remove `.skip`) once `showPopover()`/`showModal()`,
 * ARIA wiring, and modal semantics are implemented.
 */

test.describe.skip('Popover - ARIA Snapshots', () => {
  test('overview story mounts the element', async ({ page }) => {
    const root = await gotoStory(
      page,
      'components-popover--overview',
      'swc-popover'
    );
    await expect(root.locator('swc-popover')).toBeAttached();
  });
});

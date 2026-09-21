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

import {
  gotoStory,
  waitForCustomElement,
} from '../../../../utils/a11y-helpers.js';

/**
 * ARIA snapshot tests for response status.
 * WCAG axe scans run via test-storybook on stories tagged `a11y`.
 */

test.describe('ResponseStatus - ARIA Snapshots', () => {
  test('should expose complete disclosure with slotted label', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--accessibility',
      'swc-response-status'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Thought for 12 seconds"
    `);
  });

  test('should expose active status label without step timeline', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--status-only',
      'swc-response-status'
    );
    const status = root.locator('[role="status"]').first();
    await expect(status).toHaveText('Searching repositories for Europe trips');
    const activeStatus = root.locator('swc-response-status').first();
    await expect(activeStatus.locator('[aria-expanded]')).toHaveCount(0);
    await expect(activeStatus.locator('[aria-controls]')).toHaveCount(0);
  });

  test('should expose active disclosure with expanded step timeline', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--steps',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    // The header disclosure is the top-level row button; per-step disclosures
    // are nested step toggles. Both take their name from content.
    const toggle = root.locator(
      'button.swc-ResponseStatus-row[aria-expanded="true"]'
    );
    await expect(toggle).toHaveCount(1, { timeout: 10000 });
    await expect(toggle).toContainText(
      'Searching repositories for Europe trips'
    );
    // Scoped to the timeline panel: each step's description scroll region is
    // also `role="group"`, so an unscoped selector would match more than one.
    await expect(
      root.locator('.swc-ResponseStatus-panel[role="group"]')
    ).toHaveAttribute('aria-label', 'Execution steps');
  });

  test('should expose per-step disclosures collapsed by default', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--steps',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    // Steps story order: complete, active, complete, stopped. Steps start
    // collapsed by default; the header row button is excluded by class.
    const stepToggles = root.locator(
      'button[aria-expanded]:not(.swc-ResponseStatus-row)'
    );
    await expect(stepToggles).toHaveCount(4, { timeout: 10000 });
    await expect(
      root.locator('button[aria-expanded="true"]:not(.swc-ResponseStatus-row)')
    ).toHaveCount(0);
  });

  test('should expose collapsed disclosure with slotted label', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-ai-toolkit-response-status--overview',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    const toggle = root.locator(
      'button.swc-ResponseStatus-row[aria-expanded="false"]'
    );
    await expect(toggle).toHaveCount(1);
    await expect(toggle).toContainText(
      'Searching repositories for Europe trips'
    );
  });
});

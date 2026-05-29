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
 * ARIA snapshot tests for legacy and agentic response status.
 * WCAG axe scans run via test-storybook on stories tagged `a11y`.
 */

test.describe('ResponseStatus - ARIA Snapshots', () => {
  test('should announce legacy loading state', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-response-status--accessibility',
      'swc-response-status'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Response generated"
    `);
  });

  test('should expose initiating phase as a live status region', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-response-status-agentic-states-spike--initiating',
      'swc-response-status'
    );
    const status = root.locator('[role="status"]');
    await expect(status).toHaveCount(1);
    await expect(status).toHaveAttribute('aria-label', 'Processing request');
  });

  test('should expose processing disclosure with expanded step timeline', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-response-status--agentic-accessibility',
      'swc-response-status'
    );
    const toggle = root.locator('button[aria-expanded="true"]');
    await expect(toggle).toHaveCount(1);
    await expect(toggle).toHaveAttribute(
      'aria-label',
      'Searching repositories for Europe trips'
    );
    await expect(root.locator('[role="group"]')).toHaveAttribute(
      'aria-label',
      'Execution steps'
    );
  });

  test('should summarize complete phase with duration', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-response-status-agentic-states-spike--completed-collapsed',
      'swc-response-status'
    );
    const toggle = root.locator('button[aria-expanded="false"]');
    await expect(toggle).toHaveCount(1);
    await expect(toggle).toHaveAttribute('aria-label', 'Thought for 9 seconds');
  });
});

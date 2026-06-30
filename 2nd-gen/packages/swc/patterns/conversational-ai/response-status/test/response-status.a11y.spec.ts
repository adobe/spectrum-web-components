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
      'patterns-conversational-ai-response-status--accessibility',
      'swc-response-status'
    );
    await expect(root).toMatchAriaSnapshot(`
      - button "Thought for 12 seconds"
    `);
  });

  test('should expose pending status label without step timeline', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-response-status-agentic-states--initiating',
      'swc-response-status'
    );
    await expect(root.locator('[role="status"]')).toHaveCount(0);
    await expect(root.locator('.swc-ResponseStatus-label')).toHaveText(
      'Processing request'
    );
  });

  test('should expose processing disclosure with expanded step timeline', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-response-status-agentic-states--processing-expanded',
      'swc-response-status'
    );
    await waitForCustomElement(page, 'swc-response-status-step');
    const toggle = root.locator('button[aria-expanded="true"]');
    await expect(toggle).toHaveCount(1, { timeout: 10000 });
    await expect(toggle).toHaveAttribute(
      'aria-label',
      'Searching repositories for Europe trips'
    );
    await expect(root.locator('[role="group"]')).toHaveAttribute(
      'aria-label',
      'Execution steps'
    );
  });

  test('should summarize complete status with slotted label', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-response-status-agentic-states--completed-collapsed',
      'swc-response-status'
    );
    const toggle = root.locator('button[aria-expanded="false"]');
    await expect(toggle).toHaveCount(1);
    await expect(toggle).toHaveAttribute('aria-label', 'Thought for 9 seconds');
  });
});

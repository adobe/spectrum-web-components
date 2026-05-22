/**
 * Copyright 2026 Adobe. All rights reserved.
 */

import { expect, test } from '@playwright/test';

import { gotoStory } from '../../../../utils/a11y-helpers.js';

test.describe('UserMessage - ARIA Snapshots', () => {
  test('should have correct accessibility tree for default user message', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-user-message--overview',
      'swc-user-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - text: /Can you help me/
    `);
  });

  test('should expose mixed artifacts and text content', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-user-message--content',
      'swc-user-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - img "Campaign still"
      - img "Storyboard frame"
      - img "Moodboard"
      - img "Excel"
      - text: Launch brief budget Excel
      - img "PDF"
      - text: FY26Q1 Competitor analysis PDF
      - text: /Can you help me/
    `);
  });
});

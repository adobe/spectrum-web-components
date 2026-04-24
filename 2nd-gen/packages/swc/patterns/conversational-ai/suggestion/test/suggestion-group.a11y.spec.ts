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

test.describe('SuggestionGroup - ARIA Snapshots', () => {
  test('should have correct accessibility tree', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-suggestion-group--overview',
      'swc-suggestion-group'
    );
    await expect(root).toMatchAriaSnapshot(`
      - group "What would you like to do next?":
        - button "Create a slide deck from this"
        - button "Summarize in 3 bullet points"
        - button "Translate to Spanish"
    `);
  });
});

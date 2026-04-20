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

test.describe('SystemMessage - ARIA Snapshots', () => {
  test('should have correct accessibility tree', async ({ page }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-system-message--overview',
      'swc-system-message'
    );
    await expect(root).toMatchAriaSnapshot(`
      - group "Assistant message":
        - button "Collapse reasoning Response generated" [expanded]:
          - img "Collapse reasoning"
          - text: Response generated
        - region "Reasoning": The user said make a presentation deck but didn't specify duration of deck. Assumption is a brief presentation. I should check previous Hilton executive presentation decks and extract the structure.
        - paragraph: According to the assets, there is a clear journey from beginning to end. Let's start with overarching themes and build from there.
        - paragraph: "Big idea/ core narrative: The warmth of welcome"
        - paragraph: Hospitality begins the moment our customers set foot off their plane. We are more than accommodation, and we service a diverse base. We hope to be the anchor and bounce board for all who stay with us.
        - paragraph: Belonging happens at Hilton
        - paragraph: We strive to be familiar but exceed expectations. These assets highlight how belonging is personified.
        - paragraph: We are more than accommodation
        - list:
          - listitem: Airport pick up service
          - listitem: Local recommendations
          - listitem: Everyday excursions
          - listitem: Customizable experience
        - radiogroup "Response feedback":
          - radio "Positive response":
            - img "Positive response"
          - radio "Negative response":
            - img "Negative response"
        - button "Expand Sources Sources":
          - img "Expand Sources"
          - text: Sources
        - paragraph: What would you like to do next?
        - group "Follow-up suggestions":
          - button "Create a year-over-year growth chart for the next decade"
          - button "Generate a congratulatory poster"
          - button "Summarize development pipeline"
    `);
  });
});

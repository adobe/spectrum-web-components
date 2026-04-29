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

test.describe('ConversationThread - ARIA Snapshots', () => {
  test('should expose conversation turns in reading order', async ({
    page,
  }) => {
    const root = await gotoStory(
      page,
      'patterns-conversational-ai-conversation-thread--accessibility',
      'swc-conversation-thread'
    );

    await expect(root).toMatchAriaSnapshot(`
      - group "User message": Can you help me create a 45-minute presentation, with animations, for an executive update?
      - group "System message":
        - button "Response generated"
        - 'heading "Big idea/core narrative: The warmth of welcome" [level=3]'
        - paragraph: Hospitality begins the moment our customers set foot off their plane.
        - group "Response feedback":
          - button "Positive response"
          - button "Negative response"
        - button "Sources"
      - group "User message": Great. Can you shorten that into three slides?
    `);
  });
});

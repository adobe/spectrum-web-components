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
import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

// Register every workflow element so the coverage test can resolve each tag. This is
// the only test page that pulls the whole barrel, keeping the 413 element modules off
// the lighter per-icon test pages.
import '../src/elements.js';

import { WORKFLOW_ICONS } from '../src/manifest.js';

// Dev-only test story, isolated so the full-set registration stays on one page.
export default {
  title: 'Workflow icons/Tests/Manifest',
  parameters: {
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: the manifest matches the registered elements
// ──────────────────────────────────────────────────────────────

export const ManifestCoverageTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('every manifest tag is a registered custom element', () => {
      expect(WORKFLOW_ICONS.length, 'ships the full set').toBeGreaterThan(400);
      const missing = WORKFLOW_ICONS.filter(
        ({ tag }) => customElements.get(tag) === undefined
      );
      expect(missing, 'no manifest tag is unregistered').toStrictEqual([]);
    });

    await step('tags are unique', () => {
      const tags = WORKFLOW_ICONS.map((i) => i.tag);
      expect(new Set(tags).size, 'all tags are distinct').toBe(tags.length);
    });
  },
};

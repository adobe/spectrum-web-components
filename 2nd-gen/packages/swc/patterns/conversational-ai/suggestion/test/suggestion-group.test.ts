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

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';
import '../../suggestion-item/index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { meta, Overview } from '../stories/suggestion-group.stories.js';
import { SuggestionGroup } from '../SuggestionGroup.js';

export default {
  ...meta,
  title: 'Conversational AI/Suggestion group/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<SuggestionGroup>(
      canvasElement,
      'swc-suggestion-group'
    );

    await step('renders with heading in overview examples', async () => {
      expect(el.heading).toBe('What would you like to do next?');

      const heading = el.shadowRoot?.querySelector(
        '.swc-SuggestionGroup-title'
      );
      const group = el.shadowRoot?.querySelector('.swc-SuggestionGroup-items');
      expect(heading?.getAttribute('id')).toBe('swc-suggestion-group-heading');
      expect(group?.getAttribute('aria-labelledby')).toBe(
        'swc-suggestion-group-heading'
      );
      expect(group?.hasAttribute('aria-label')).toBe(false);
    });

    await step(
      'renders three slotted suggestion items by default',
      async () => {
        const slot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot');
        const assigned = slot?.assignedElements({ flatten: true }) ?? [];
        expect(assigned.length).toBe(3);
      }
    );

    await step(
      'uses default fallback aria-label when heading is empty',
      async () => {
        el.heading = '';
        await el.updateComplete;

        const heading = el.shadowRoot?.querySelector(
          '.swc-SuggestionGroup-title'
        );
        const group = el.shadowRoot?.querySelector(
          '.swc-SuggestionGroup-items'
        );
        expect(heading).toBeNull();
        expect(group?.getAttribute('aria-label')).toBe('Follow-up suggestions');
        expect(group?.hasAttribute('aria-labelledby')).toBe(false);
      }
    );

    await step(
      'renders no heading and keeps fallback label for blank heading',
      async () => {
        el.heading = '';
        await el.updateComplete;

        const heading = el.shadowRoot?.querySelector(
          '.swc-SuggestionGroup-title'
        );
        const group = el.shadowRoot?.querySelector(
          '.swc-SuggestionGroup-items'
        );
        expect(heading).toBeNull();
        expect(group?.getAttribute('aria-label')).toBe('Follow-up suggestions');
        expect(group?.hasAttribute('aria-labelledby')).toBe(false);
      }
    );

    await step('heading renders with fixed semantic level', async () => {
      el.heading = 'Title';
      await el.updateComplete;
      expect(
        el.shadowRoot?.querySelector('h3.swc-SuggestionGroup-title')
      ).toBeTruthy();
    });

    await step('accessible-label overrides fallback aria-label', async () => {
      el.heading = '';
      el.accessibleLabel = 'Custom suggestions label';
      await el.updateComplete;

      const group = el.shadowRoot?.querySelector('.swc-SuggestionGroup-items');
      expect(group?.getAttribute('aria-label')).toBe(
        'Custom suggestions label'
      );
    });
  },
};

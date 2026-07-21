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

import '../swc-suggestion-group.js';
import '../../suggestion-item/swc-suggestion-item.js';

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
      el.innerHTML = `
        <h3 slot="heading">What would you like to do next?</h3>
        <swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>
        <swc-suggestion-item>Summarize in 3 bullet points</swc-suggestion-item>
        <swc-suggestion-item>Translate to Spanish</swc-suggestion-item>
      `;
      await el.updateComplete;

      const heading = el.shadowRoot?.querySelector(
        '.swc-SuggestionGroup-title'
      );
      const items = el.shadowRoot?.querySelector('.swc-SuggestionGroup-items');
      const headingSlot = heading?.querySelector<HTMLSlotElement>(
        'slot[name="heading"]'
      );
      const headingElements =
        headingSlot?.assignedElements({ flatten: true }) ?? [];
      const firstHeading = headingElements[0] as HTMLElement | undefined;
      expect(firstHeading?.textContent?.trim()).toBe(
        'What would you like to do next?'
      );
      expect((firstHeading?.id.length ?? 0) > 0).toBe(true);
      expect(el.getAttribute('role')).toBe('group');
      expect(el.getAttribute('aria-labelledby')).toBe(firstHeading?.id);
      expect(el.hasAttribute('aria-label')).toBe(false);
      expect(items?.hasAttribute('role')).toBe(false);
    });

    await step(
      'renders three slotted suggestion items by default',
      async () => {
        const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
          '.swc-SuggestionGroup-items slot:not([name])'
        );
        const assigned = slot?.assignedElements({ flatten: true }) ?? [];
        expect(assigned.length).toBe(3);
      }
    );

    await step(
      'does not mutate heading id when the slotted heading already has an id',
      async () => {
        el.innerHTML = `
          <h3 id="consumer-heading-id" slot="heading">Suggestions</h3>
          <swc-suggestion-item>Option A</swc-suggestion-item>
        `;
        await el.updateComplete;

        const headingSlot = el.shadowRoot?.querySelector<HTMLSlotElement>(
          'slot[name="heading"]'
        );
        const headingElements =
          headingSlot?.assignedElements({ flatten: true }) ?? [];
        const firstHeading = headingElements[0] as HTMLElement | undefined;

        expect(firstHeading?.id).toBe('consumer-heading-id');
        expect(el.getAttribute('aria-labelledby')).toBe('consumer-heading-id');
        expect(el.getAttribute('role')).toBe('group');
      }
    );

    await step(
      'accessible-label overrides the accessible name while heading stays visible',
      async () => {
        el.innerHTML = `
          <h3 slot="heading">What would you like to do next?</h3>
          <swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>
        `;
        el.accessibleLabel = 'Custom suggestions label';
        await el.updateComplete;

        const heading = el.shadowRoot?.querySelector(
          '.swc-SuggestionGroup-title'
        );
        expect(heading?.hasAttribute('hidden')).toBe(false);
        expect(el.getAttribute('aria-label')).toBe('Custom suggestions label');
        expect(el.hasAttribute('aria-labelledby')).toBe(false);
      }
    );

    await step('heading slot allows consumer-defined semantics', async () => {
      el.innerHTML = `
        <p slot="heading">Title</p>
        <swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>
      `;
      await el.updateComplete;

      const headingSlot = el.shadowRoot?.querySelector<HTMLSlotElement>(
        'slot[name="heading"]'
      );
      const headingElements =
        headingSlot?.assignedElements({ flatten: true }) ?? [];
      expect((headingElements[0] as HTMLElement | undefined)?.tagName).toBe(
        'P'
      );
    });

    await step(
      'accessible-label takes precedence over heading slot labeling',
      async () => {
        el.innerHTML = `
          <h3 slot="heading">What would you like to do next?</h3>
          <swc-suggestion-item>Create a slide deck from this</swc-suggestion-item>
        `;
        el.accessibleLabel = 'Overridden suggestions label';
        await el.updateComplete;

        expect(el.getAttribute('aria-label')).toBe(
          'Overridden suggestions label'
        );
        expect(el.hasAttribute('aria-labelledby')).toBe(false);
      }
    );
  },
};

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

import { getComponent } from '../../../../utils/test-utils.js';
import meta, { Overview } from '../stories/suggestion-item.stories.js';
import { SuggestionItem } from '../SuggestionItem.js';

export default {
  ...meta,
  title: 'Conversational AI/Suggestion/Suggestion item/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<SuggestionItem>(
      canvasElement,
      'swc-suggestion-item'
    );

    await step('button label comes from the default slot', async () => {
      const slot = el.shadowRoot?.querySelector<HTMLSlotElement>('slot');
      const assignedText = slot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent ?? '')
        .join('')
        .trim();

      expect(assignedText).toBe('Create a slide deck from this');

      const label = el.shadowRoot?.querySelector<HTMLElement>(
        '.swc-SuggestionItem-label'
      );
      expect(label).toBeTruthy();
    });

    await step('leading icon is decorative', async () => {
      const icon = el.shadowRoot?.querySelector('swc-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  },
};

export const EventTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<SuggestionItem>(
      canvasElement,
      'swc-suggestion-item'
    );

    await step(
      'click emits swc-suggestion with the trimmed label',
      async () => {
        let detail: { label: string } | undefined;
        el.addEventListener(
          'swc-suggestion',
          (event) => {
            detail = (event as CustomEvent<{ label: string }>).detail;
          },
          { once: true }
        );

        const button = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-SuggestionItem'
        );
        button?.click();

        expect(detail?.label).toBe('Create a slide deck from this');
      }
    );
  },
};

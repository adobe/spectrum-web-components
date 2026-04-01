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

import { Accordion } from '@adobe/spectrum-wc/accordion';

import '@adobe/spectrum-wc/accordion';

import { getComponent } from '../../../utils/test-utils.js';
import { meta, Playground } from '../stories/accordion.stories.js';

export default {
  ...meta,
  title: 'Accordion/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

/**
 * `Accordion.focus()` should delegate to the first enabled header via
 * `CompositeFocusNavigationController` + `delegatesFocus` on each item.
 */
export const FocusFirstEnabled: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const root = await getComponent<Accordion>(canvasElement, 'swc-accordion');
    const firstItem = root.querySelector('swc-accordion-item') as HTMLElement;

    await step('focus is delegated into the first item header button', async () => {
      root.focus();
      await new Promise((r) => requestAnimationFrame(r));
      const active = document.activeElement as Node | null;
      expect(
        firstItem.shadowRoot?.contains(active) || active === firstItem
      ).toBe(true);
    });
  },
};

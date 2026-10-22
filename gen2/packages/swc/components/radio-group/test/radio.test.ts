/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * this license is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html } from 'lit';
import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Radio, RadioGroup } from '@adobe/spectrum-wc/radio-group';

import '@adobe/spectrum-wc/components/radio-group/swc-radio-group.js';
import '@adobe/spectrum-wc/components/radio-group/swc-radio.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta from '../stories/radio-group.stories.js';

export default {
  ...meta,
  title: 'Radio group/Tests - radio',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const ActivationTest: Story = {
  render: () => html`
    <swc-radio-group selected="red">
      <span slot="label">Favorite color</span>
      <swc-radio value="red">
        <span slot="label">Red</span>
      </swc-radio>
      <swc-radio value="green">
        <span slot="label">Green</span>
        <span slot="description">A calm color</span>
      </swc-radio>
      <swc-radio value="blue" disabled>
        <span slot="label">Blue</span>
      </swc-radio>
    </swc-radio-group>
  `,
  play: async ({ canvasElement }) => {
    const group = await getComponent<RadioGroup>(
      canvasElement,
      'swc-radio-group'
    );
    const items = Array.from(group.querySelectorAll<Radio>('swc-radio'));
    const itemChanges: Event[] = [];
    items[1].addEventListener('change', (event) => itemChanges.push(event));

    await userEvent.click(items[1]);
    await group.updateComplete;
    expect(group.selected).toBe('green');
    expect(items.map((item) => item.checked)).toEqual([false, true, false]);
    expect(itemChanges).toHaveLength(1);
    expect(itemChanges[0].bubbles).toBe(true);
    expect(itemChanges[0].composed).toBe(true);

    items[0].focus();
    const spaceChanges: Event[] = [];
    items[0].addEventListener('change', (event) => spaceChanges.push(event));
    items[0].dispatchEvent(
      new KeyboardEvent('keydown', {
        key: ' ',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
    items[0].dispatchEvent(
      new KeyboardEvent('keyup', {
        key: ' ',
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
    await group.updateComplete;
    expect(group.selected).toBe('red');
    expect(spaceChanges).toHaveLength(1);

    const disabledChanges: Event[] = [];
    items[2].addEventListener('change', (event) => disabledChanges.push(event));
    await userEvent.click(items[2]);
    await group.updateComplete;
    expect(group.selected).toBe('red');
    expect(disabledChanges).toHaveLength(0);
  },
};

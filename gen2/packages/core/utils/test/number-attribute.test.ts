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

import { numberAttribute } from '../index.js';

export default {
  title: 'Utils/Number attribute/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

export const NumberAttributeTest: Story = {
  play: async ({ step }) => {
    const { fromAttribute } = numberAttribute(100);

    await step('parses numeric text to a number', () => {
      expect(fromAttribute?.('200')).toBe(200);
      expect(fromAttribute?.('-1.5')).toBe(-1.5);
    });

    await step('keeps non-numeric text as written', () => {
      expect(fromAttribute?.('banana')).toBe('banana');
      expect(fromAttribute?.('')).toBe('');
      expect(fromAttribute?.('  ')).toBe('  ');
      expect(fromAttribute?.('Infinity')).toBe('Infinity');
    });

    await step('returns the given value for a removed attribute', () => {
      expect(fromAttribute?.(null)).toBe(100);
      expect(numberAttribute(null).fromAttribute?.(null)).toBeNull();
    });
  },
};

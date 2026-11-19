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

import { resolveEnum } from '../index.js';

export default {
  title: 'Utils/Resolve enum/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

export const ResolveEnumTest: Story = {
  play: async ({ step }) => {
    const directions = ['horizontal', 'vertical'] as const;

    await step('returns an allowed value unchanged', () => {
      expect(resolveEnum('vertical', directions, 'horizontal')).toBe(
        'vertical'
      );
    });

    await step('returns the fallback for a value that is not allowed', () => {
      expect(resolveEnum('diagonal', directions, 'horizontal')).toBe(
        'horizontal'
      );
      expect(resolveEnum(null, directions, 'horizontal')).toBe('horizontal');
    });

    await step('compares numeric enums strictly', () => {
      expect(resolveEnum(200, [100, 200], 100)).toBe(200);
      expect(resolveEnum(NaN, [100, 200], 100)).toBe(100);
      expect(resolveEnum('200', [100, 200], 100)).toBe(100);
    });

    await step('accepts a fallback outside the allowed values', () => {
      expect(resolveEnum('xxl', ['s', 'm'], undefined)).toBeUndefined();
    });
  },
};

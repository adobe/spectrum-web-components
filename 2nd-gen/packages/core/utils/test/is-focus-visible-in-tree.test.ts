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

import { isFocusVisibleInTree } from '../index.js';

export default {
  title: 'Utils/Is focus visible in tree/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <input id="probe" aria-label="probe" />
  `,
} as Meta;

export const IsFocusVisibleInTreeTest: Story = {
  play: async ({ canvasElement, step }) => {
    const input = canvasElement.querySelector<HTMLInputElement>('#probe');
    if (!input) {
      throw new Error('probe input not found');
    }

    await step('returns false when nothing is focused', () => {
      input.blur();
      expect(isFocusVisibleInTree(document)).toBe(false);
    });

    await step(
      'reflects the :focus-visible state of the active element',
      () => {
        input.focus();
        // Keyboard-style focus produces :focus-visible; the helper mirrors
        // whatever the platform reports for the active element.
        expect(isFocusVisibleInTree(document)).toBe(
          input.matches(':focus-visible')
        );
      }
    );

    await step('scopes the query to the provided root', () => {
      input.blur();
      const detached = document.createElement('div').attachShadow({
        mode: 'open',
      });
      expect(isFocusVisibleInTree(detached)).toBe(false);
    });
  },
};

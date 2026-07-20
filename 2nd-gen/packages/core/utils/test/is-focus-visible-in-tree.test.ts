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
import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { getActiveElement, isFocusVisibleInTree } from '../index.js';

export default {
  title: 'Utils/Is focus visible in tree/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <button id="probe">Probe</button>
  `,
} as Meta;

export const IsFocusVisibleInTreeTest: Story = {
  play: async ({ canvasElement, step }) => {
    const button = canvasElement.querySelector('#probe') as HTMLButtonElement;

    await step('returns false when nothing is focused', () => {
      (getActiveElement() as HTMLElement | null)?.blur();
      expect(isFocusVisibleInTree(document)).toBe(false);
    });

    await step(
      'returns false when the active element is not :focus-visible (pointer/programmatic focus)',
      async () => {
        // A pointer interaction sets the UA focus modality to "pointer"; a button
        // focused under that modality does not match :focus-visible (no focus ring).
        await userEvent.click(canvasElement);
        button.focus();

        expect(getActiveElement(document)).toBe(button);
        expect(button.matches(':focus-visible')).toBe(false);
        expect(isFocusVisibleInTree(document)).toBe(false);
      }
    );

    await step(
      'returns true when the active element is :focus-visible (keyboard focus)',
      async () => {
        (getActiveElement() as HTMLElement | null)?.blur();
        // A real Tab keydown puts the UA in keyboard modality, so the focused
        // button matches :focus-visible across evergreen browsers.
        await userEvent.tab();

        expect(getActiveElement(document)).toBe(button);
        expect(button.matches(':focus-visible')).toBe(true);
        expect(isFocusVisibleInTree(document)).toBe(true);
      }
    );

    await step('scopes the query to the provided root', () => {
      // The button (in the light DOM) is still keyboard-focused from the
      // previous step, so the document sees a :focus-visible element.
      expect(isFocusVisibleInTree(document)).toBe(true);

      // A separate, attached shadow root holds no focused element, so scoping
      // the query to it returns false even though the document does not.
      const host = document.createElement('div');
      document.body.append(host);
      const shadow = host.attachShadow({ mode: 'open' });
      try {
        expect(isFocusVisibleInTree(shadow)).toBe(false);
      } finally {
        host.remove();
      }
    });

    (getActiveElement() as HTMLElement | null)?.blur();
  },
};

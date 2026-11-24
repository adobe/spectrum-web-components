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
    const getFocusState = () => {
      const activeElement = getActiveElement(document);
      return {
        activeElement: activeElement
          ? { tagName: activeElement.localName, id: activeElement.id }
          : null,
        documentHasFocus: document.hasFocus(),
        visibilityState: document.visibilityState,
        buttonConnected: button.isConnected,
        buttonFocused: button.matches(':focus'),
        buttonFocusVisible: button.matches(':focus-visible'),
      };
    };

    await step('returns false when nothing is focused', () => {
      (getActiveElement() as HTMLElement | null)?.blur();
      expect(isFocusVisibleInTree(document)).toBe(false);
    });

    await step(
      'returns true when the active element is :focus-visible (keyboard focus)',
      async () => {
        const beforeTab = getFocusState();
        await userEvent.tab();

        const afterTab = getFocusState();
        const focusEstablished =
          getActiveElement(document) === button &&
          button.matches(':focus-visible');
        const buttonStyle = focusEstablished ? null : getComputedStyle(button);
        const diagnostics = focusEstablished
          ? undefined
          : `Focus state around simulated Tab: ${JSON.stringify({
              beforeTab,
              afterTab,
              buttonDisplay: buttonStyle?.display,
              buttonVisibility: buttonStyle?.visibility,
              buttonRectCount: button.getClientRects().length,
            })}`;

        expect(getActiveElement(document), diagnostics).toBe(button);
        expect(button.matches(':focus-visible'), diagnostics).toBe(true);
        expect(isFocusVisibleInTree(document), diagnostics).toBe(true);
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

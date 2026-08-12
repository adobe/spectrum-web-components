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

import { resolveTrigger } from '../index.js';

export default {
  title: 'Utils/Resolve trigger/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div>
      <button id="rt-native-trigger">Native trigger</button>
      <a id="rt-other" href="#x">Other</a>
      <div id="rt-host"></div>
    </div>
  `,
} as Meta;

export const ResolveTriggerTest: Story = {
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector('#rt-host') as HTMLElement;
    const other = canvasElement.querySelector('#rt-other') as HTMLElement;

    await step('resolves by for= id within the host tree root', () => {
      const { trigger, interactiveElement } = resolveTrigger(host, {
        for: 'rt-native-trigger',
      });
      expect(trigger?.id).toBe('rt-native-trigger');
      // No inner button on a native trigger → ARIA wires on the trigger itself.
      expect(interactiveElement).toBe(trigger);
    });

    await step('triggerElement overrides for', () => {
      const { trigger } = resolveTrigger(host, {
        for: 'rt-native-trigger',
        triggerElement: other,
      });
      expect(trigger, 'direct reference wins over for=').toBe(other);
    });

    await step('an unresolved for= yields a null trigger', () => {
      const resolved = resolveTrigger(host, { for: 'does-not-exist' });
      expect(resolved.trigger).toBeNull();
      expect(resolved.interactiveElement).toBeNull();
    });

    await step(
      'discovers the inner <button> of an open-shadow trigger for ARIA',
      () => {
        // Simulate an SWC trigger: a host with an open shadow root whose inner
        // <button> is the AT-facing focusable element.
        const shadowTrigger = document.createElement('div');
        shadowTrigger.id = 'rt-shadow-trigger';
        const shadow = shadowTrigger.attachShadow({ mode: 'open' });
        const innerButton = document.createElement('button');
        shadow.append(innerButton);
        canvasElement.append(shadowTrigger);
        try {
          const { trigger, interactiveElement } = resolveTrigger(host, {
            for: 'rt-shadow-trigger',
          });
          expect(trigger, 'trigger is the shadow host').toBe(shadowTrigger);
          expect(
            interactiveElement,
            'interactiveElement is the inner button'
          ).toBe(innerButton);
        } finally {
          shadowTrigger.remove();
        }
      }
    );
  },
};

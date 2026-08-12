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

import {
  hasActiveTransition,
  maxTransitionDurationMs,
  runAfterTransition,
} from '../index.js';

export default {
  title: 'Utils/Transition/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

export const TransitionTest: Story = {
  play: async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector('div') as HTMLElement;

    await step('no transition → inactive, 0ms', () => {
      el.style.transition = 'none';
      expect(hasActiveTransition(el)).toBe(false);
      expect(maxTransitionDurationMs(el)).toBe(0);
    });

    await step('a non-zero duration → active', () => {
      el.style.transition = 'opacity 200ms ease';
      expect(hasActiveTransition(el)).toBe(true);
      expect(maxTransitionDurationMs(el)).toBe(200);
    });

    await step('multi-property list → longest, with s/ms parsing', () => {
      el.style.transition = 'opacity 0.2s, transform 300ms';
      expect(maxTransitionDurationMs(el)).toBe(300);
    });

    await step('runs synchronously when no transition will run', () => {
      el.style.transition = 'none';
      let ran = false;
      const cancel = runAfterTransition(el, () => {
        ran = true;
      });
      expect(ran, 'callback ran immediately').toBe(true);
      expect(typeof cancel).toBe('function');
      cancel(); // returned canceller is a safe no-op
    });

    await step('settles on transitionend (once)', () => {
      el.style.transition = 'opacity 50ms';
      let runs = 0;
      runAfterTransition(el, () => {
        runs += 1;
      });
      el.dispatchEvent(
        new TransitionEvent('transitionend', { propertyName: 'opacity' })
      );
      // A second matching event must not re-run the (already-settled) callback.
      el.dispatchEvent(
        new TransitionEvent('transitionend', { propertyName: 'opacity' })
      );
      expect(runs, 'callback runs exactly once').toBe(1);
    });

    await step('ignores transitionend bubbling from a descendant', () => {
      el.style.transition = 'opacity 50ms';
      const child = document.createElement('span');
      el.append(child);
      let ran = false;
      const cancel = runAfterTransition(el, () => {
        ran = true;
      });
      child.dispatchEvent(
        new TransitionEvent('transitionend', {
          propertyName: 'opacity',
          bubbles: true,
        })
      );
      expect(ran, 'a descendant transition does not settle the callback').toBe(
        false
      );
      cancel();
      child.remove();
    });
  },
};

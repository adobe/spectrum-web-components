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

import type { ReactiveElement } from 'lit';
import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { PageScrollLockController } from '../index.js';

export default {
  title: 'Controllers/Page scroll lock controller/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

// A minimal host: the controller only calls `addController` in its constructor
// and otherwise drives the document through its own methods.
function makeHost(): ReactiveElement {
  return { addController: () => undefined } as unknown as ReactiveElement;
}

export const PageScrollLockTest: Story = {
  play: async ({ step }) => {
    const html = document.documentElement;
    const original = html.style.overflow;
    // Use a non-default value so a correct restore is observable.
    html.style.overflow = 'scroll';

    try {
      const a = new PageScrollLockController(makeHost());
      const b = new PageScrollLockController(makeHost());

      await step('the first lock captures and hides overflow', () => {
        a.lock();
        expect(html.style.overflow, 'page scroll is locked').toBe('hidden');
      });

      await step(
        'a second lock keeps the page locked (reference count 2)',
        () => {
          b.lock();
          expect(html.style.overflow).toBe('hidden');
        }
      );

      await step(
        'releasing one of two locks does not restore prematurely (the race fix)',
        () => {
          a.unlock();
          expect(
            html.style.overflow,
            'still locked while another holder remains'
          ).toBe('hidden');
        }
      );

      await step(
        'releasing the last lock restores the original overflow',
        () => {
          b.unlock();
          expect(html.style.overflow, 'original value restored exactly').toBe(
            'scroll'
          );
        }
      );

      await step('lock() and unlock() are idempotent per host', () => {
        a.lock();
        a.lock(); // second lock from the same host must not bump the count
        a.unlock();
        expect(
          html.style.overflow,
          'a single unlock releases the single count this host held'
        ).toBe('scroll');
        a.unlock(); // extra unlock is a no-op
        expect(html.style.overflow).toBe('scroll');
      });

      await step('hostDisconnected releases a held lock', () => {
        b.lock();
        expect(html.style.overflow).toBe('hidden');
        b.hostDisconnected();
        expect(html.style.overflow, 'disconnect unlocked the page').toBe(
          'scroll'
        );
      });
    } finally {
      html.style.overflow = original;
    }
  },
};

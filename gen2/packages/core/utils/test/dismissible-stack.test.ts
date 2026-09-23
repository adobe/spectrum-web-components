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
  isTopDismissible,
  registerDismissible,
  unregisterDismissible,
} from '../index.js';

export default {
  title: 'Utils/Dismissible stack/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

export const DismissibleStackTest: Story = {
  play: async ({ step }) => {
    const a = {};
    const b = {};
    const c = {};

    await step('the most-recently registered key is topmost (LIFO)', () => {
      registerDismissible(a);
      registerDismissible(b);
      expect(isTopDismissible(b), 'b is on top').toBe(true);
      expect(isTopDismissible(a), 'a is not on top').toBe(false);
    });

    await step('unregistering the top exposes the next entry', () => {
      unregisterDismissible(b);
      expect(isTopDismissible(a), 'a is exposed as top').toBe(true);
    });

    await step(
      're-registering moves a key to the top without duplicating',
      () => {
        registerDismissible(c);
        registerDismissible(a); // re-register the already-present `a`
        expect(isTopDismissible(a), 'a moved to top').toBe(true);
        // Removing `a` once must expose `c` (no duplicate `a` left behind).
        unregisterDismissible(a);
        expect(isTopDismissible(c), 'c exposed after a single unregister').toBe(
          true
        );
      }
    );

    await step('unregistering a key that is not present is a no-op', () => {
      unregisterDismissible({}); // never registered
      expect(isTopDismissible(c), 'top is unchanged').toBe(true);
    });

    await step('an empty stack has no top', () => {
      unregisterDismissible(c);
      expect(isTopDismissible(c), 'nothing is top once emptied').toBe(false);
      expect(isTopDismissible(a)).toBe(false);
    });
  },
};

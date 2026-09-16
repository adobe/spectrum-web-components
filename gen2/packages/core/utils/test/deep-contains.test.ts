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

import { deepContains } from '../index.js';

export default {
  title: 'Utils/Deep contains/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

export const DeepContainsTest: Story = {
  play: async ({ step }) => {
    await step('an element contains itself', () => {
      const el = document.createElement('div');
      expect(deepContains(el, el)).toBe(true);
    });

    await step('a light-DOM descendant is contained', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.append(child);
      expect(deepContains(parent, child)).toBe(true);
    });

    await step('a descendant across a shadow boundary is contained', () => {
      // host > shadowHost(#shadow > inner). `Node.contains` would stop at the
      // shadow boundary; deepContains hops `ShadowRoot.host` and finds it.
      const host = document.createElement('div');
      const shadowHost = document.createElement('div');
      const shadow = shadowHost.attachShadow({ mode: 'open' });
      const inner = document.createElement('button');
      shadow.append(inner);
      host.append(shadowHost);
      expect(deepContains(host, inner)).toBe(true);
      expect(host.contains(inner), 'Node.contains stops at the boundary').toBe(
        false
      );
    });

    await step('a non-descendant is not contained', () => {
      const a = document.createElement('div');
      const b = document.createElement('div');
      expect(deepContains(a, b)).toBe(false);
    });

    await step('a null node is not contained', () => {
      expect(deepContains(document.createElement('div'), null)).toBe(false);
    });
  },
};

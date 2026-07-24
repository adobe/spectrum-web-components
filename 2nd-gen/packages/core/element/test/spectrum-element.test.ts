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

import { warningId } from '../spectrum-element.js';

export default {
  title: 'Utils/Dev validation/Dedup tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

// `warningId` builds the dedup key `window.__swc.warn` uses to suppress repeat
// warnings. Testing it directly guards the dedup-key fix (adding `message` to
// the key) without depending on the `NODE_ENV`-gated `window.__swc` setup,
// which the test harness (`NODE_ENV === 'test'`) never runs.
export const WarningIdTest: Story = {
  play: async ({ step }) => {
    await step('distinct messages produce distinct dedup keys', () => {
      const first = warningId('swc-badge', 'api', 'default', 'first problem');
      const second = warningId('swc-badge', 'api', 'default', 'second problem');
      // Same localName/type/level, different message: the keys must differ so
      // the second warning is not suppressed. This is the behavior the
      // dedup-key fix restored.
      expect(first).not.toBe(second);
    });

    await step('an identical warning produces the same dedup key', () => {
      const first = warningId('swc-badge', 'api', 'default', 'same problem');
      const second = warningId('swc-badge', 'api', 'default', 'same problem');
      // A verbatim repeat collapses to one key, so it is deduplicated.
      expect(first).toBe(second);
    });

    await step('the key is localName:type:level:message, in that order', () => {
      expect(String(warningId('swc-badge', 'api', 'high', 'bad variant'))).toBe(
        'swc-badge:api:high:bad variant'
      );
    });
  },
};

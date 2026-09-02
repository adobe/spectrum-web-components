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

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../stories/demo-hosts.js';

import type { DemoHelpTextHost } from '../stories/demo-hosts.js';
import helpTextMeta, {
  CombinedDescription,
  ErrorTextGating,
} from '../stories/help-text-mixin.stories.js';

export default {
  ...helpTextMeta,
  title: 'Mixins/Help text mixin/Tests',
  parameters: {
    ...helpTextMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Combined description sources
// ──────────────────────────────────────────────────────────────

export const CombinedDescriptionTest: Story = {
  ...CombinedDescription,
  play: async ({ canvasElement, step }) => {
    const hosts = Array.from(
      canvasElement.querySelectorAll<DemoHelpTextHost>('demo-help-text-host')
    );
    const [slottedOnly, combined] = hosts;

    await step('slotted description alone resolves to one element', () => {
      expect(slottedOnly.roleElement?.ariaDescribedByElements).toHaveLength(1);
    });

    await step(
      'shadow description is listed before the resolved external element',
      () => {
        const resolved = combined.roleElement?.ariaDescribedByElements ?? [];
        expect(resolved).toHaveLength(2);
        expect(resolved[0]?.closest('demo-help-text-host')).toBe(combined);
        expect(resolved[1]?.id).toBe('help-text-mixin-external-description');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Error text gated by invalid
// ──────────────────────────────────────────────────────────────

export const ErrorTextGatingTest: Story = {
  ...ErrorTextGating,
  play: async ({ canvasElement, step }) => {
    const hosts = Array.from(
      canvasElement.querySelectorAll<DemoHelpTextHost>('demo-help-text-host')
    );
    const [valid, invalid] = hosts;

    await step('valid host has no error-message association', () => {
      expect(valid.roleElement?.ariaErrorMessageElements).toBeNull();
      expect(valid.shadowRoot?.querySelector('.swc-FieldErrorText')).toBeNull();
    });

    await step('invalid host associates the error-text element', () => {
      const resolved = invalid.roleElement?.ariaErrorMessageElements;
      expect(resolved).toHaveLength(1);
      expect(
        invalid.shadowRoot?.querySelector('.swc-FieldErrorText')
      ).toBeTruthy();
      // Description remains associated regardless of invalid.
      expect(invalid.roleElement?.ariaDescribedByElements).toHaveLength(1);
    });

    await step(
      'clearing invalid removes the error-message association',
      async () => {
        invalid.invalid = false;
        await invalid.updateComplete;
        expect(invalid.roleElement?.ariaErrorMessageElements).toBeNull();
      }
    );
  },
};

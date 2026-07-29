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

import { buildGroupedWarningArgs, warningId } from '../spectrum-element.js';

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

// Builds a grouped-warning batch (the shape `window.__swc.warn` accumulates
// within a microtask).
const makeBatch = (
  count: number,
  numElements: number
): Parameters<typeof buildGroupedWarningArgs>[0] => ({
  message:
    '<swc-badge> expects "variant" to be one of: neutral. Received "banana".',
  url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-badge--docs',
  localName: 'swc-badge',
  type: 'api',
  level: 'default',
  listedIssues: '',
  elements: Array.from({ length: numElements }, () =>
    document.createElement('div')
  ),
  count,
});

const elementArgs = (args: unknown[]): HTMLElement[] =>
  args.filter((arg): arg is HTMLElement => arg instanceof HTMLElement);

const countFromArgs = (args: unknown[]): number =>
  (args[args.length - 1] as { data: { count: number } }).data.count;

// `buildGroupedWarningArgs` produces the exact arguments `window.__swc.warn`
// passes to `console.warn` for a grouped warning. Testing it directly captures
// the grouped output (count line + element refs)
export const GroupedWarningTest: Story = {
  play: async ({ step }) => {
    await step('single element: "affected element", exactly one ref', () => {
      const args = buildGroupedWarningArgs(makeBatch(1, 1), false);
      expect(String(args[0])).toContain('Affected element:');
      expect(elementArgs(args).length).toBe(1);
      expect(countFromArgs(args)).toBe(1);
    });

    await step(
      'multiple, default: count line names the total, one representative ref',
      () => {
        const args = buildGroupedWarningArgs(makeBatch(12, 10), false);
        expect(String(args[0])).toContain('12 <swc-badge> elements affected:');
        // The default path surfaces exactly one live element ref, whatever the
        // count, so a table of N broken rows can't pin N DOM nodes.
        expect(elementArgs(args).length).toBe(1);
        expect(countFromArgs(args)).toBe(12);
      }
    );

    await step(
      'multiple, verbose: same count line, every collected ref',
      () => {
        const args = buildGroupedWarningArgs(makeBatch(12, 10), true);
        expect(String(args[0])).toContain('12 <swc-badge> elements affected:');
        // Verbose surfaces all collected refs; collection caps them at 10.
        expect(elementArgs(args).length).toBe(10);
        expect(countFromArgs(args)).toBe(12);
      }
    );
  },
};

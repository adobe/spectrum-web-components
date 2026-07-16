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
  validateAllowedChildren,
  validateEnum,
  validateRequiredSlot,
  warnIf,
} from '../index.js';

const URL =
  'https://opensource.adobe.com/spectrum-web-components/components/test/';

// Enables DEBUG mode and captures window.__swc.warn calls for the duration of `fn`.
async function withWarningSpy(
  fn: (warnCalls: unknown[][]) => void | Promise<void>
): Promise<void> {
  const originalDebug = window.__swc?.DEBUG;
  const originalWarn = window.__swc?.warn;
  const warnCalls: unknown[][] = [];
  window.__swc = {
    ...window.__swc,
    DEBUG: true,
    warn: (...args: unknown[]) => {
      warnCalls.push(args);
    },
  } as Window['__swc'];
  try {
    await fn(warnCalls);
  } finally {
    window.__swc = {
      ...window.__swc,
      DEBUG: originalDebug,
      warn: originalWarn,
    } as Window['__swc'];
  }
}

export default {
  title: 'Utils/Dev validation/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div></div>
  `,
} as Meta;

export const DevValidationTest: Story = {
  play: async ({ step }) => {
    await step('validateEnum warns for an invalid value', () =>
      withWarningSpy((warnCalls) => {
        const el = document.createElement('div');
        validateEnum(el, {
          prop: 'variant',
          value: 'bogus',
          valid: ['positive', 'negative'],
          url: URL,
        });
        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('variant');
      })
    );

    await step('validateEnum does not warn for a valid value', () =>
      withWarningSpy((warnCalls) => {
        const el = document.createElement('div');
        validateEnum(el, {
          prop: 'variant',
          value: 'positive',
          valid: ['positive', 'negative'],
          url: URL,
        });
        expect(warnCalls.length).toBe(0);
      })
    );

    await step('warnIf warns only when the condition is true', () =>
      withWarningSpy((warnCalls) => {
        const el = document.createElement('div');
        warnIf(el, false, 'should not fire', URL);
        expect(warnCalls.length).toBe(0);
        warnIf(el, true, 'required property missing', URL);
        expect(warnCalls.length).toBe(1);
        expect(String(warnCalls[0]?.[1] || '')).toContain('required property');
      })
    );

    await step('validateRequiredSlot warns when the slot is empty', () =>
      withWarningSpy((warnCalls) => {
        const host = document.createElement('div');
        const shadow = host.attachShadow({ mode: 'open' });
        const slot = document.createElement('slot');
        shadow.append(slot);
        validateRequiredSlot(host, slot, 'label', URL);
        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('label');
      })
    );

    await step(
      'validateRequiredSlot does not warn when content is assigned',
      () =>
        withWarningSpy((warnCalls) => {
          const host = document.createElement('div');
          const shadow = host.attachShadow({ mode: 'open' });
          const slot = document.createElement('slot');
          slot.name = 'label';
          shadow.append(slot);
          const content = document.createElement('span');
          content.slot = 'label';
          host.append(content);
          validateRequiredSlot(host, slot, 'label', URL);
          expect(warnCalls.length).toBe(0);
        })
    );

    await step(
      'validateAllowedChildren warns for a disallowed child element',
      () =>
        withWarningSpy((warnCalls) => {
          const host = document.createElement('div');
          const shadow = host.attachShadow({ mode: 'open' });
          const slot = document.createElement('slot');
          slot.name = 'heading';
          shadow.append(slot);
          const p = document.createElement('p');
          p.slot = 'heading';
          host.append(p);
          validateAllowedChildren(
            host,
            slot,
            ['h2', 'h3', 'h4', 'h5', 'h6'],
            'heading',
            URL
          );
          expect(warnCalls.length).toBeGreaterThan(0);
          expect(String(warnCalls[0]?.[1] || '')).toContain('<p>');
        })
    );

    await step(
      'validateAllowedChildren does not warn for an allowed child',
      () =>
        withWarningSpy((warnCalls) => {
          const host = document.createElement('div');
          const shadow = host.attachShadow({ mode: 'open' });
          const slot = document.createElement('slot');
          slot.name = 'heading';
          shadow.append(slot);
          const h2 = document.createElement('h2');
          h2.slot = 'heading';
          host.append(h2);
          validateAllowedChildren(
            host,
            slot,
            ['h2', 'h3', 'h4', 'h5', 'h6'],
            'heading',
            URL
          );
          expect(warnCalls.length).toBe(0);
        })
    );
  },
};

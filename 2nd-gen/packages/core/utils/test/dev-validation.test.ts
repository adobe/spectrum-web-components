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

declare global {
  interface Window {
    __swc?: {
      DEBUG?: boolean;
      warn?: (...args: unknown[]) => void;
    };
  }
}

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
  fn: (warnCalls: unknown[][]) => void | Promise<void>,
  { debug = true }: { debug?: boolean } = {}
): Promise<void> {
  const originalDebug = window.__swc?.DEBUG;
  const originalWarn = window.__swc?.warn;
  const warnCalls: unknown[][] = [];
  window.__swc = {
    ...window.__swc,
    DEBUG: debug,
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

    // Guards the DEBUG gate that `emitWarning` centralizes: with DEBUG off,
    // no helper may warn even for clearly invalid input. Without this, an
    // inverted/dropped gate would still pass every test above (they force
    // DEBUG on).
    await step('no helper warns when DEBUG is off', () =>
      withWarningSpy(
        (warnCalls) => {
          const el = document.createElement('div');
          validateEnum(el, {
            prop: 'variant',
            value: 'bogus',
            valid: ['positive'],
            url: URL,
          });
          warnIf(el, true, 'should be gated by DEBUG', URL);

          const host = document.createElement('div');
          const shadow = host.attachShadow({ mode: 'open' });
          const slot = document.createElement('slot');
          shadow.append(slot);
          validateRequiredSlot(host, slot, 'label', URL);

          const headingHost = document.createElement('div');
          const headingShadow = headingHost.attachShadow({ mode: 'open' });
          const headingSlot = document.createElement('slot');
          headingSlot.name = 'heading';
          headingShadow.append(headingSlot);
          const p = document.createElement('p');
          p.slot = 'heading';
          headingHost.append(p);
          validateAllowedChildren(
            headingHost,
            headingSlot,
            ['h2'],
            'heading',
            URL
          );

          expect(warnCalls.length).toBe(0);
        },
        { debug: false }
      )
    );

    // The helpers rely on `window.__swc?.DEBUG` optional chaining, so a
    // production/no-debug environment where `__swc` was never created must not
    // throw a ReferenceError.
    await step('helpers do not throw when window.__swc is undefined', () => {
      const original = window.__swc;
      // @ts-expect-error - simulate an environment where __swc was never created
      window.__swc = undefined;
      try {
        const el = document.createElement('div');
        const host = document.createElement('div');
        const shadow = host.attachShadow({ mode: 'open' });
        const slot = document.createElement('slot');
        slot.name = 'heading';
        shadow.append(slot);
        const p = document.createElement('p');
        p.slot = 'heading';
        host.append(p);
        expect(() => {
          validateEnum(el, {
            prop: 'variant',
            value: 'bogus',
            valid: ['positive'],
            url: URL,
          });
          warnIf(el, true, 'no throw', URL);
          validateRequiredSlot(host, null, 'label', URL);
          validateAllowedChildren(host, slot, ['h2'], 'heading', URL);
        }).not.toThrow();
      } finally {
        window.__swc = original;
      }
    });

    await step('validateAllowedChildren warns once per disallowed child', () =>
      withWarningSpy((warnCalls) => {
        const host = document.createElement('div');
        const shadow = host.attachShadow({ mode: 'open' });
        const slot = document.createElement('slot');
        slot.name = 'heading';
        shadow.append(slot);
        const p = document.createElement('p');
        p.slot = 'heading';
        host.append(p);
        const span = document.createElement('span');
        span.slot = 'heading';
        host.append(span);
        validateAllowedChildren(
          host,
          slot,
          ['h2', 'h3', 'h4', 'h5', 'h6'],
          'heading',
          URL
        );
        expect(warnCalls.length).toBe(2);
      })
    );

    await step('validateRequiredSlot warns when the slot is null', () =>
      withWarningSpy((warnCalls) => {
        const host = document.createElement('div');
        validateRequiredSlot(host, null, 'label', URL);
        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('label');
      })
    );

    await step('validateEnum forwards issues and merges caller options', () =>
      withWarningSpy((warnCalls) => {
        const el = document.createElement('div');
        validateEnum(el, {
          prop: 'variant',
          value: 'bogus',
          valid: ['positive', 'negative'],
          url: URL,
          options: { type: 'accessibility', level: 'high' },
        });
        expect(warnCalls.length).toBe(1);
        const options = warnCalls[0]?.[3] as {
          issues?: string[];
          type?: string;
          level?: string;
        };
        expect(options?.issues).toContain('variant="bogus"');
        expect(options?.type).toBe('accessibility');
        expect(options?.level).toBe('high');
      })
    );
  },
};

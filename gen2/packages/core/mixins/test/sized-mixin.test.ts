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

import { html, LitElement } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { withWarningSpy } from '@swc-test-helpers/dom';

import { SizedMixin } from '../index.js';

class TestSizedHost extends SizedMixin(LitElement, {
  validSizes: ['s', 'm', 'l'],
}) {}

class TestSizedNoDefaultHost extends SizedMixin(LitElement, {
  validSizes: ['s', 'm', 'l'],
  noDefaultSize: true,
}) {}

class TestSizedSubclassHost extends TestSizedHost {
  static override readonly VALID_SIZES = ['xs', 's', 'm', 'l'] as const;
}

customElements.define('test-sized-host', TestSizedHost);
customElements.define('test-sized-no-default-host', TestSizedNoDefaultHost);
customElements.define('test-sized-subclass-host', TestSizedSubclassHost);

async function mount<
  T extends HTMLElement & { updateComplete: Promise<boolean> },
>(container: HTMLElement, markup: string): Promise<T> {
  container.innerHTML = markup;
  const el = container.firstElementChild as T;
  await el.updateComplete;
  return el;
}

const warningText = (warnCalls: unknown[][]): string =>
  warnCalls.map((call) => String(call[1])).join('\n');

export default {
  title: 'Mixins/Sized mixin/Tests',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <div id="container"></div>
  `,
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultSizeTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector<HTMLElement>('#container')!;

    await step('reflects the default size when no size is set', () =>
      withWarningSpy(async (warnCalls) => {
        const el = await mount<TestSizedHost>(
          container,
          '<test-sized-host></test-sized-host>'
        );
        expect(el.getAttribute('size')).toBe('m');
        expect(el.size).toBe('m');
        expect(el.resolvedSize).toBe('m');
        expect(warnCalls.length, 'no warning when size is unset').toBe(0);
      })
    );

    await step('leaves the attribute off a NO_DEFAULT_SIZE host', () =>
      withWarningSpy(async (warnCalls) => {
        const el = await mount<TestSizedNoDefaultHost>(
          container,
          '<test-sized-no-default-host></test-sized-no-default-host>'
        );
        expect(el.hasAttribute('size')).toBe(false);
        expect(el.resolvedSize).toBe('m');
        expect(warnCalls.length, 'no warning when size is unset').toBe(0);
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const ValidSizeTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector<HTMLElement>('#container')!;

    await step(
      'reflects a valid size set as a property without a warning',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedHost>(
            container,
            '<test-sized-host></test-sized-host>'
          );
          el.size = 'l';
          await el.updateComplete;
          expect(el.getAttribute('size')).toBe('l');
          expect(el.resolvedSize).toBe('l');
          expect(warnCalls.length, 'no warning for a valid size').toBe(0);
        })
    );

    await step('uses the leaf class VALID_SIZES', () =>
      withWarningSpy(async (warnCalls) => {
        const el = await mount<TestSizedSubclassHost>(
          container,
          '<test-sized-subclass-host size="xs"></test-sized-subclass-host>'
        );
        expect(el.resolvedSize).toBe('xs');
        expect(warnCalls.length, 'xs is valid on the subclass').toBe(0);
      })
    );
  },
};

export const InvalidSizeTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector<HTMLElement>('#container')!;

    await step(
      'keeps an invalid size from the initial markup, warns, and resolves the default',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedHost>(
            container,
            '<test-sized-host size="banana"></test-sized-host>'
          );
          expect(el.getAttribute('size'), 'attribute is not rewritten').toBe(
            'banana'
          );
          expect(el.size, 'property keeps the value').toBe('banana');
          expect(el.resolvedSize, 'renders the default').toBe('m');
          expect(warningText(warnCalls)).toMatch(/"size".*"banana"/);
        })
    );

    await step(
      'keeps an invalid size set as a property, reflects it, and warns',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedHost>(
            container,
            '<test-sized-host></test-sized-host>'
          );
          el.size = 'xl';
          await el.updateComplete;
          expect(el.getAttribute('size')).toBe('xl');
          expect(el.size).toBe('xl');
          expect(el.resolvedSize).toBe('m');
          expect(warningText(warnCalls)).toMatch(/"size".*"xl"/);
        })
    );

    await step(
      'treats a different letter case as invalid and keeps it as written',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedHost>(
            container,
            '<test-sized-host size="L"></test-sized-host>'
          );
          expect(el.getAttribute('size'), 'attribute is not lowercased').toBe(
            'L'
          );
          expect(el.resolvedSize, 'renders the default').toBe('m');
          expect(warningText(warnCalls)).toMatch(/"size".*"L"/);
        })
    );

    await step(
      'warns on an invalid size on a NO_DEFAULT_SIZE host and keeps it',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedNoDefaultHost>(
            container,
            '<test-sized-no-default-host size="banana"></test-sized-no-default-host>'
          );
          expect(el.getAttribute('size')).toBe('banana');
          expect(el.resolvedSize).toBe('m');
          expect(warningText(warnCalls)).toMatch(/"size".*"banana"/);
        })
    );
  },
};

export const EmptySizeTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector<HTMLElement>('#container')!;

    await step(
      'treats an empty size attribute as invalid, keeps it, and warns',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedHost>(
            container,
            '<test-sized-host size=""></test-sized-host>'
          );
          expect(el.getAttribute('size'), 'attribute is not rewritten').toBe(
            ''
          );
          expect(el.resolvedSize, 'renders the default').toBe('m');
          expect(warningText(warnCalls)).toMatch(/"size".*Received ""/);
        })
    );
  },
};

export const EmptySizePropertyTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector<HTMLElement>('#container')!;

    await step(
      'keeps the attribute and property in step when size is set to an empty string',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedHost>(
            container,
            '<test-sized-host size="l"></test-sized-host>'
          );
          el.size = '' as TestSizedHost['size'];
          await el.updateComplete;

          expect(el.getAttribute('size'), 'attribute is updated').toBe('');
          expect(el.size, 'property keeps the empty string').toBe('');
          expect(el.resolvedSize, 'renders the default').toBe('m');
          expect(warningText(warnCalls)).toMatch(/"size".*Received ""/);
        })
    );
  },
};

export const AttributeRemovalTest: Story = {
  play: async ({ canvasElement, step }) => {
    const container = canvasElement.querySelector<HTMLElement>('#container')!;

    await step('reflects the default again when the attribute is removed', () =>
      withWarningSpy(async (warnCalls) => {
        const el = await mount<TestSizedHost>(
          container,
          '<test-sized-host size="banana"></test-sized-host>'
        );
        warnCalls.length = 0;
        el.removeAttribute('size');
        await el.updateComplete;
        expect(el.getAttribute('size')).toBe('m');
        expect(el.size).toBe('m');
        expect(warnCalls.length, 'no warning when size is unset').toBe(0);
      })
    );

    await step(
      'keeps the attribute when a NO_DEFAULT_SIZE host is set to null from JavaScript',
      () =>
        withWarningSpy(async (warnCalls) => {
          // Unchanged from before this change: only removing the attribute
          // clears it. Setting the property to `null` unsets the size but
          // leaves the last attribute value in place.
          const el = await mount<TestSizedNoDefaultHost>(
            container,
            '<test-sized-no-default-host size="l"></test-sized-no-default-host>'
          );
          el.size = null as unknown as TestSizedNoDefaultHost['size'];
          await el.updateComplete;
          expect(el.getAttribute('size')).toBe('l');
          expect(el.resolvedSize).toBe('m');
          expect(warnCalls.length, 'no warning when size is unset').toBe(0);
        })
    );

    await step(
      'leaves the attribute off a NO_DEFAULT_SIZE host when removed',
      () =>
        withWarningSpy(async (warnCalls) => {
          const el = await mount<TestSizedNoDefaultHost>(
            container,
            '<test-sized-no-default-host size="l"></test-sized-no-default-host>'
          );
          el.removeAttribute('size');
          await el.updateComplete;
          expect(el.hasAttribute('size')).toBe(false);
          expect(el.resolvedSize).toBe('m');
          expect(warnCalls.length, 'no warning when size is unset').toBe(0);
        })
    );
  },
};

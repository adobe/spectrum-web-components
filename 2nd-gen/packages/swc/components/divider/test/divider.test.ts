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

import { Divider } from '@adobe/spectrum-wc/divider';

import '@adobe/spectrum-wc/components/divider/swc-divider.js';

import {
  DIVIDER_STATIC_COLORS,
  DIVIDER_VALID_SIZES,
} from '../../../../core/components/divider/Divider.types.js';
import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  Overview,
  Sizes,
  StaticColors,
  Vertical,
} from '../stories/divider.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Divider/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const divider = await getComponent<Divider>(canvasElement, 'swc-divider');

    await step('renders a separator with expected attributes', async () => {
      expect(divider.getAttribute('role'), 'divider has role="separator"').toBe(
        'separator'
      );
      expect(divider.size, 'default size is m').toBe('m');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('renders dividers in all valid sizes', async () => {
      for (const size of DIVIDER_VALID_SIZES) {
        const divider = canvasElement.querySelector(
          `swc-divider[size="${size}"]`
        ) as Divider | null;
        expect(divider, `divider with size="${size}" is rendered`).toBeTruthy();
        await divider?.updateComplete;
        expect(divider?.size, `divider size property is "${size}"`).toBe(size);
      }
    });
  },
};

export const VerticalTest: Story = {
  ...Vertical,
  play: async ({ canvasElement, step }) => {
    const dividers = await getComponents<Divider>(canvasElement, 'swc-divider');

    await step('reflects vertical orientation attributes', async () => {
      for (const divider of dividers) {
        expect(
          divider.hasAttribute('vertical'),
          'divider has vertical attribute'
        ).toBe(true);
        expect(
          divider.getAttribute('aria-orientation'),
          'aria-orientation is set to vertical'
        ).toBe('vertical');
      }
    });
  },
};

export const VerticalMutationTest: Story = {
  render: () => html`
    <swc-divider size="m"></swc-divider>
  `,
  play: async ({ canvasElement, step }) => {
    const divider = await getComponent<Divider>(canvasElement, 'swc-divider');

    await step('initially has no aria-orientation', async () => {
      expect(divider.vertical, 'vertical is false by default').toBe(false);
      expect(
        divider.hasAttribute('aria-orientation'),
        'aria-orientation is absent when not vertical'
      ).toBe(false);
    });

    await step(
      'sets aria-orientation="vertical" when vertical is enabled',
      async () => {
        divider.vertical = true;
        await divider.updateComplete;
        expect(
          divider.getAttribute('aria-orientation'),
          'aria-orientation is set to vertical after enabling'
        ).toBe('vertical');
      }
    );

    await step(
      'removes aria-orientation when vertical is disabled',
      async () => {
        divider.vertical = false;
        await divider.updateComplete;
        expect(
          divider.hasAttribute('aria-orientation'),
          'aria-orientation is absent after disabling vertical'
        ).toBe(false);
      }
    );
  },
};

export const StaticColorsTest: Story = {
  ...StaticColors,
  play: async ({ canvasElement, step }) => {
    const dividers = await getComponents<Divider>(
      canvasElement,
      'swc-divider[static-color]'
    );

    await step('reflects expected static-color attribute values', async () => {
      for (const divider of dividers) {
        const staticColor = divider.getAttribute('static-color');
        expect(staticColor, 'static-color attribute is present').toBeTruthy();
        expect(
          ['white', 'black'],
          `static-color "${staticColor}" is a valid value`
        ).toContain(staticColor);
      }
    });
  },
};

export const StaticColorToggleTest: Story = {
  render: () => html`
    <swc-divider static-color="black"></swc-divider>
  `,
  play: async ({ canvasElement, step }) => {
    const divider = await getComponent<Divider>(canvasElement, 'swc-divider');

    await step('renders with static-color attribute', async () => {
      expect(
        divider.getAttribute('static-color'),
        'initial static-color attribute'
      ).toBe('black');
    });

    await step('clears static-color when attribute is removed', async () => {
      divider.removeAttribute('static-color');
      divider.requestUpdate();
      await divider.updateComplete;
      expect(
        divider.getAttribute('static-color'),
        'static-color attribute is null after removal'
      ).toBeNull();
      expect(
        divider.hasAttribute('static-color'),
        'static-color attribute is absent after removal'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const NotFocusableTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const divider = await getComponent<Divider>(canvasElement, 'swc-divider');

    await step('is not in the tab order', async () => {
      expect(divider.tabIndex, 'tabIndex is -1').toBe(-1);
    });

    await step(
      'does not receive focus when focused programmatically',
      async () => {
        divider.focus();
        expect(
          document.activeElement,
          'activeElement is not the divider'
        ).not.toBe(divider);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidStaticColorWarningTest: Story = {
  render: () => html`
    <swc-divider></swc-divider>
  `,
  play: async ({ canvasElement, step }) => {
    const divider = await getComponent<Divider>(canvasElement, 'swc-divider');

    await step('warns when an invalid static-color is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        divider.staticColor =
          'not-a-color' as unknown as Divider['staticColor'];
        await divider.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid static-color'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references static-color attribute'
        ).toContain('static-color');
      })
    );
  },
};

export const ValidStaticColorNoWarningTest: Story = {
  render: () => html`
    <swc-divider></swc-divider>
  `,
  play: async ({ canvasElement, step }) => {
    const divider = await getComponent<Divider>(canvasElement, 'swc-divider');

    await step(
      'does not warn for any valid static-color value in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          for (const color of DIVIDER_STATIC_COLORS) {
            divider.staticColor = color;
            await divider.updateComplete;
          }

          expect(
            warnCalls.length,
            'no warnings are emitted for valid static-color values'
          ).toBe(0);
        })
    );
  },
};

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

import { IllustratedMessage } from '@adobe/spectrum-wc/illustrated-message';

import '@adobe/spectrum-wc/illustrated-message';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, {
  Orientation,
  Overview,
  Sizes,
} from '../stories/illustrated-message.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Illustrated Message/Tests',
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
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('renders with default heading-level 2', async () => {
      expect(illustratedMessage.headingLevel, 'default heading level').toBe(2);
    });

    await step('renders heading text from attribute', async () => {
      expect(illustratedMessage.heading, 'heading attribute value').toBe(
        'Illustrated message title'
      );
    });

    await step('renders an h2 element in shadow DOM by default', async () => {
      expect(
        illustratedMessage.shadowRoot?.querySelector('h2'),
        'h2 in shadow DOM'
      ).not.toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const AllHeadingLevelsTest: Story = {
  render: () => html`
    <swc-illustrated-message
      heading="Heading level test"
    ></swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    for (const level of [3, 4, 5, 6] as const) {
      await step(
        `renders h${level} when heading-level is set to ${level}`,
        async () => {
          illustratedMessage.setAttribute('heading-level', String(level));
          await illustratedMessage.updateComplete;
          expect(
            illustratedMessage.shadowRoot?.querySelector(`h${level}`),
            `h${level} in shadow DOM`
          ).not.toBeNull();
          expect(
            illustratedMessage.shadowRoot?.querySelector(`h${level - 1}`),
            `h${level - 1} absent after heading-level change`
          ).toBeNull();
        }
      );
    }
  },
};

export const HeadingLevelClampTest: Story = {
  render: () => html`
    <swc-illustrated-message
      heading="Clamped heading"
    ></swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('clamps heading-level="1" to h2, never renders h1', async () => {
      illustratedMessage.setAttribute('heading-level', '1');
      await illustratedMessage.updateComplete;
      expect(
        illustratedMessage.shadowRoot?.querySelector('h1'),
        'h1 must not exist in shadow DOM'
      ).toBeNull();
      expect(
        illustratedMessage.shadowRoot?.querySelector('h2'),
        'h2 rendered after clamping'
      ).not.toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const DescriptionSlotTest: Story = {
  render: () => html`
    <swc-illustrated-message heading="Test">
      <span slot="description">Description text here.</span>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('renders description slot content', async () => {
      const slotted = illustratedMessage.querySelector('[slot="description"]');
      expect(slotted, 'description slot element').not.toBeNull();
      expect(slotted?.textContent?.trim(), 'description text').toBe(
        'Description text here.'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Size
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    const messages = canvasElement.querySelectorAll('swc-illustrated-message');

    await step('reflects size="s" attribute', async () => {
      const el = messages[0] as IllustratedMessage;
      await el.updateComplete;
      expect(el.size, 'size property').toBe('s');
      expect(el.getAttribute('size'), 'size attribute').toBe('s');
    });

    await step('reflects size="m" attribute (default)', async () => {
      const el = messages[1] as IllustratedMessage;
      await el.updateComplete;
      expect(el.size, 'size property').toBe('m');
      expect(el.getAttribute('size'), 'size attribute').toBe('m');
    });

    await step('reflects size="l" attribute', async () => {
      const el = messages[2] as IllustratedMessage;
      await el.updateComplete;
      expect(el.size, 'size property').toBe('l');
      expect(el.getAttribute('size'), 'size attribute').toBe('l');
    });
  },
};

export const DefaultSizeTest: Story = {
  render: () => html`
    <swc-illustrated-message heading="Default size"></swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('defaults to size="m"', async () => {
      expect(el.size, 'default size property').toBe('m');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Orientation
// ──────────────────────────────────────────────────────────────

export const OrientationTest: Story = {
  ...Orientation,
  play: async ({ canvasElement, step }) => {
    const messages = canvasElement.querySelectorAll('swc-illustrated-message');

    await step('defaults to orientation="vertical"', async () => {
      const el = messages[0] as IllustratedMessage;
      await el.updateComplete;
      expect(el.orientation, 'orientation property').toBe('vertical');
    });

    await step('reflects orientation="horizontal" attribute', async () => {
      const el = messages[1] as IllustratedMessage;
      await el.updateComplete;
      expect(el.orientation, 'orientation property').toBe('horizontal');
      expect(el.getAttribute('orientation'), 'orientation attribute').toBe(
        'horizontal'
      );
    });
  },
};

export const DefaultOrientationTest: Story = {
  render: () => html`
    <swc-illustrated-message
      heading="Default orientation"
    ></swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('defaults to orientation="vertical"', async () => {
      expect(el.orientation, 'default orientation property').toBe('vertical');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidHeadingLevelWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message heading="Test"></swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('warns when heading-level is set to an out-of-range value', () =>
      withWarningSpy(async (warnCalls) => {
        illustratedMessage.setAttribute('heading-level', '1');
        await illustratedMessage.updateComplete;

        expect(
          warnCalls.length,
          'warning count for invalid heading-level'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message mentions heading-level'
        ).toContain('heading-level');
      })
    );
  },
};

export const ValidHeadingLevelNoWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message heading="Test"></swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('does not warn when a valid heading-level is set', () =>
      withWarningSpy(async (warnCalls) => {
        illustratedMessage.setAttribute('heading-level', '3');
        await illustratedMessage.updateComplete;

        expect(warnCalls.length, 'no warnings for valid heading-level').toBe(0);
      })
    );
  },
};

export const InvalidHeadingSlotWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h3 slot="heading">Heading as h3</h3>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('warns when heading slot contains a non-span element', () =>
      withWarningSpy(async (warnCalls) => {
        illustratedMessage.requestUpdate();
        await illustratedMessage.updateComplete;

        expect(
          warnCalls.length,
          'warning count for non-span heading slot'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message mentions heading slot'
        ).toContain('heading');
      })
    );
  },
};

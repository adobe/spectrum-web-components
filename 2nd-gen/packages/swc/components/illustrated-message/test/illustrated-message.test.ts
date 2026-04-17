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
import meta from '../stories/illustrated-message.stories.js';
import { Overview } from '../stories/illustrated-message.stories.js';

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

    await step('consumer owns the heading element in light DOM', async () => {
      const headingInLight =
        illustratedMessage.querySelector('[slot="heading"]');
      expect(headingInLight, 'heading element in light DOM').not.toBeNull();

      const headingInShadow = illustratedMessage.shadowRoot?.querySelector(
        'h1, h2, h3, h4, h5, h6'
      );
      expect(headingInShadow, 'no heading element in shadow DOM').toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Heading slot — valid usage
// ──────────────────────────────────────────────────────────────

export const HeadingSlotValidElementsTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h2 slot="heading">Heading test</h2>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    for (const tag of ['h2', 'h3', 'h4', 'h5', 'h6'] as const) {
      await step(`does not warn when heading slot contains <${tag}>`, () =>
        withWarningSpy(async (warnCalls) => {
          const heading = document.createElement(tag);
          heading.setAttribute('slot', 'heading');
          heading.textContent = `Heading as ${tag}`;

          illustratedMessage.querySelector('[slot="heading"]')?.remove();
          illustratedMessage.appendChild(heading);
          illustratedMessage.requestUpdate();
          await illustratedMessage.updateComplete;

          expect(warnCalls.length, `no warning for valid <${tag}>`).toBe(0);
        })
      );
    }
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Heading slot — invalid usage
// ──────────────────────────────────────────────────────────────

export const HeadingSlotInvalidElementWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <div slot="heading">Not a heading</div>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('warns when heading slot contains a non-heading element', () =>
      withWarningSpy(async (warnCalls) => {
        const headingSlot =
          illustratedMessage.shadowRoot?.querySelector<HTMLSlotElement>(
            'slot[name="heading"]'
          );
        if (!headingSlot) {
          return;
        }

        const slotChanged = new Promise<void>((resolve) =>
          headingSlot.addEventListener('slotchange', () => resolve(), {
            once: true,
          })
        );

        const div = document.createElement('div');
        div.setAttribute('slot', 'heading');
        div.textContent = 'Not a heading';
        illustratedMessage.querySelector('[slot="heading"]')?.remove();
        illustratedMessage.appendChild(div);

        await slotChanged;

        expect(
          warnCalls.length,
          'warning fired for invalid heading slot element'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] ?? ''),
          'warning message mentions heading slot'
        ).toContain('heading');
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const DescriptionSlotTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h2 slot="heading">Heading</h2>
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
// TEST: Size attribute / property
// ──────────────────────────────────────────────────────────────

export const ValidSizeNoWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h2 slot="heading">Test</h2>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    for (const size of IllustratedMessage.VALID_SIZES) {
      await step(
        `does not warn and reflects property when size="${size}"`,
        () =>
          withWarningSpy(async (warnCalls) => {
            illustratedMessage.setAttribute('size', size);
            await illustratedMessage.updateComplete;

            expect(warnCalls.length, `no warnings for size="${size}"`).toBe(0);
            expect(
              illustratedMessage.size,
              `size property reflects "${size}"`
            ).toBe(size);
            expect(
              illustratedMessage.getAttribute('size'),
              `size attribute reflects "${size}"`
            ).toBe(size);
          })
      );
    }
  },
};

export const InvalidSizeWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h2 slot="heading">Test</h2>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('warns when size is set to an invalid value', () =>
      withWarningSpy(async (warnCalls) => {
        illustratedMessage.setAttribute('size', 'xl');
        await illustratedMessage.updateComplete;

        expect(
          warnCalls.length,
          'warning count for invalid size'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] ?? ''),
          'warning message mentions size'
        ).toContain('size');
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Orientation attribute / property
// ──────────────────────────────────────────────────────────────

export const ValidOrientationNoWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h2 slot="heading">Test</h2>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    for (const orientation of IllustratedMessage.VALID_ORIENTATIONS) {
      await step(
        `does not warn and reflects property when orientation="${orientation}"`,
        () =>
          withWarningSpy(async (warnCalls) => {
            illustratedMessage.setAttribute('orientation', orientation);
            await illustratedMessage.updateComplete;

            expect(
              warnCalls.length,
              `no warnings for orientation="${orientation}"`
            ).toBe(0);
            expect(
              illustratedMessage.orientation,
              `orientation property reflects "${orientation}"`
            ).toBe(orientation);
            expect(
              illustratedMessage.getAttribute('orientation'),
              `orientation attribute reflects "${orientation}"`
            ).toBe(orientation);
          })
      );
    }
  },
};

export const InvalidOrientationWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h2 slot="heading">Test</h2>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('warns when orientation is set to an invalid value', () =>
      withWarningSpy(async (warnCalls) => {
        illustratedMessage.setAttribute('orientation', 'diagonal');
        await illustratedMessage.updateComplete;

        expect(
          warnCalls.length,
          'warning count for invalid orientation'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] ?? ''),
          'warning message mentions orientation'
        ).toContain('orientation');
      })
    );
  },
};

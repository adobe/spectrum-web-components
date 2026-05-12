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

import '@adobe/spectrum-wc/components/illustrated-message/swc-illustrated-message.js';

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  IllustrationAccessibility,
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

    await step('confirms heading element lives in light DOM', async () => {
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

export const DefaultValuesTest: Story = {
  render: () => html`
    <swc-illustrated-message></swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('reflects default size "m" as attribute', async () => {
      expect(illustratedMessage.size, 'default size property').toBe('m');
      expect(
        illustratedMessage.getAttribute('size'),
        'default size attribute'
      ).toBe('m');
    });

    await step(
      'reflects default orientation "vertical" as attribute',
      async () => {
        expect(
          illustratedMessage.orientation,
          'default orientation property'
        ).toBe('vertical');
        expect(
          illustratedMessage.getAttribute('orientation'),
          'default orientation attribute'
        ).toBe('vertical');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step(
      'size reflects to attribute after direct property mutation',
      async () => {
        illustratedMessage.size = 's';
        await illustratedMessage.updateComplete;
        expect(
          illustratedMessage.getAttribute('size'),
          'size attribute reflects "s"'
        ).toBe('s');

        illustratedMessage.size = 'l';
        await illustratedMessage.updateComplete;
        expect(
          illustratedMessage.getAttribute('size'),
          'size attribute reflects "l"'
        ).toBe('l');

        illustratedMessage.size = 'm';
        await illustratedMessage.updateComplete;
        expect(
          illustratedMessage.getAttribute('size'),
          'size attribute restores to "m"'
        ).toBe('m');
      }
    );

    await step(
      'orientation reflects to attribute after direct property mutation',
      async () => {
        illustratedMessage.orientation = 'horizontal';
        await illustratedMessage.updateComplete;
        expect(
          illustratedMessage.getAttribute('orientation'),
          'orientation attribute reflects "horizontal"'
        ).toBe('horizontal');

        illustratedMessage.orientation = 'vertical';
        await illustratedMessage.updateComplete;
        expect(
          illustratedMessage.getAttribute('orientation'),
          'orientation attribute reflects "vertical"'
        ).toBe('vertical');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const DefaultSlotIllustrationTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 160 160"
      >
        <path d="M0 0" />
      </svg>
      <h2 slot="heading">Test heading</h2>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('renders illustration content in the default slot', async () => {
      const svg = illustratedMessage.querySelector('svg');
      expect(svg, 'svg element present in default slot').not.toBeNull();
    });

    await step(
      'verifies decorative illustration is hidden from assistive tech',
      async () => {
        const svg = illustratedMessage.querySelector('svg');
        expect(
          svg?.getAttribute('aria-hidden'),
          'aria-hidden on decorative svg'
        ).toBe('true');
      }
    );
  },
};

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
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    const elements = await getComponents<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('renders one component per valid size', async () => {
      expect(elements.length, 'number of size variants rendered').toBe(
        IllustratedMessage.VALID_SIZES.length
      );
    });

    await step(
      'each component reflects its size as a property and attribute',
      async () => {
        for (const size of IllustratedMessage.VALID_SIZES) {
          const el = elements.find(
            (item) => item.getAttribute('size') === size
          );
          expect(el, `component with size="${size}"`).not.toBeUndefined();
          expect(el?.size, `size property is "${size}"`).toBe(size);
        }
      }
    );
  },
};

export const OrientationTest: Story = {
  ...Orientation,
  play: async ({ canvasElement, step }) => {
    const elements = await getComponents<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('renders one component per valid orientation', async () => {
      expect(elements.length, 'number of orientation variants rendered').toBe(
        IllustratedMessage.VALID_ORIENTATIONS.length
      );
    });

    await step(
      'each component reflects its orientation as a property and attribute',
      async () => {
        for (const orientation of IllustratedMessage.VALID_ORIENTATIONS) {
          const el = elements.find(
            (item) => item.getAttribute('orientation') === orientation
          );
          expect(
            el,
            `component with orientation="${orientation}"`
          ).not.toBeUndefined();
          expect(
            el?.orientation,
            `orientation property is "${orientation}"`
          ).toBe(orientation);
        }
      }
    );
  },
};

export const IllustrationAccessibilityTest: Story = {
  ...IllustrationAccessibility,
  play: async ({ canvasElement, step }) => {
    const elements = await getComponents<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step(
      'first component has a decorative illustration (aria-hidden)',
      async () => {
        const [first] = elements;
        const decorativeSvg = first?.querySelector('svg[aria-hidden="true"]');
        expect(
          decorativeSvg,
          'decorative svg with aria-hidden="true" in first component'
        ).not.toBeNull();
      }
    );

    await step(
      'second component has an informative illustration (role="img" + aria-label)',
      async () => {
        const [, second] = elements;
        const informativeSvg = second?.querySelector('svg[role="img"]');
        expect(
          informativeSvg,
          'informative svg with role="img" in second component'
        ).not.toBeNull();
        expect(
          informativeSvg?.getAttribute('aria-label'),
          'informative svg has aria-label'
        ).not.toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
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

export const HeadingSlotEmptyNoWarningTest: Story = {
  render: () => html`
    <swc-illustrated-message>
      <h2 slot="heading">Initial heading</h2>
    </swc-illustrated-message>
  `,
  play: async ({ canvasElement, step }) => {
    const illustratedMessage = await getComponent<IllustratedMessage>(
      canvasElement,
      'swc-illustrated-message'
    );

    await step('does not warn when heading slot is empty', () =>
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

        illustratedMessage.querySelector('[slot="heading"]')?.remove();

        await slotChanged;

        expect(warnCalls.length, 'no warning for empty heading slot').toBe(0);
      })
    );
  },
};

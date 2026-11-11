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

import { ProgressCircle } from '@adobe/spectrum-wc/progress-circle';
import { PROGRESS_CIRCLE_VALID_SIZES } from '@adobe/spectrum-wc-core/components/progress-circle';

import '@adobe/spectrum-wc/components/progress-circle/swc-progress-circle.js';

import {
  fixture,
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/progress-circle.stories.js';
import {
  Indeterminate,
  Overview,
  Sizes,
  StaticColors,
} from '../stories/progress-circle.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Progress circle/Tests',
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
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step(
      'renders indeterminate progress with an accessible label',
      async () => {
        expect(progressCircle.getAttribute('role')).toBe('progressbar');
        expect(progressCircle.getAttribute('aria-label')).toBe(
          progressCircle.label
        );
        expect(progressCircle.getAttribute('aria-valuenow')).toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    const circles = await getComponents<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('renders expected size attributes', async () => {
      circles.forEach((circle) => {
        const size = circle.getAttribute('size');
        expect(size, `progress circle has a size attribute`).toBeTruthy();
      });
    });
  },
};

export const StaticColorsTest: Story = {
  ...StaticColors,
  play: async ({ canvasElement, step }) => {
    const circles = await getComponents<ProgressCircle>(
      canvasElement,
      'swc-progress-circle[static-color]'
    );

    await step('reflects expected static-color attribute values', async () => {
      circles.forEach((circle) => {
        const staticColor = circle.getAttribute('static-color');
        expect(
          staticColor,
          'progress circle has a static-color attribute'
        ).toBeTruthy();
        expect(
          ['white', 'black'],
          `static-color "${staticColor}" is a valid value`
        ).toContain(staticColor);
      });
    });
  },
};

export const LabelClearingTest: Story = {
  render: () => html`
    <swc-progress-circle
      progress="50"
      label="Uploading file"
    ></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('initially has aria-label set from label', async () => {
      expect(
        progressCircle.getAttribute('aria-label'),
        'aria-label is set from the label property'
      ).toBe('Uploading file');
    });

    await step(
      'falls back to default label when label is cleared',
      async () => {
        progressCircle.label = '';
        await progressCircle.updateComplete;

        expect(progressCircle.getAttribute('aria-label')).toBe('Loading');
      }
    );
  },
};

export const AriaLabelAccessibleNameTest: Story = {
  render: () => html`
    <swc-progress-circle
      progress="30"
      aria-label="Downloading update"
    ></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );
    await step(
      'does not warn when aria-label provides the accessible name',
      () =>
        withWarningSpy(async (warnCalls) => {
          progressCircle.progress = 40;
          await progressCircle.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted when aria-label provides the accessible name'
          ).toBe(0);
        })
    );
  },
};

export const AriaLabelledbyAccessibleNameTest: Story = {
  render: () => html`
    <span id="pc-label-ext">Syncing data</span>
    <swc-progress-circle
      progress="60"
      aria-labelledby="pc-label-ext"
    ></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );
    await step(
      'does not warn when aria-labelledby provides the accessible name',
      () =>
        withWarningSpy(async (warnCalls) => {
          progressCircle.progress = 70;
          await progressCircle.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted when aria-labelledby provides the accessible name'
          ).toBe(0);
        })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Light DOM (no default slot)
// ──────────────────────────────────────────────────────────────

export const LightDomChildrenDoNotSetLabelTest: Story = {
  render: () => html`
    <swc-progress-circle>Loading data</swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step(
      'does not use light DOM text as the label or accessible name',
      async () => {
        expect(progressCircle.label).toBe('');
        expect(progressCircle.getAttribute('aria-label')).toBe('Loading'); //check the default label is applied not the light dom text
      }
    );

    await step(
      'warns in dev mode: deprecation for light DOM children and accessibility when there is no name',
      () =>
        withWarningSpy(async (warnCalls) => {
          progressCircle.progress = 10;
          await progressCircle.updateComplete;

          expect(warnCalls.length).toBe(1);
          expect(String(warnCalls[0]?.[1] ?? '')).toContain(
            'no longer has a default slot'
          );
          expect(String(warnCalls[0]?.[1] ?? '')).toContain('accessible');
        })
    );
  },
};

export const LightDomWithLabelDeprecationOnlyTest: Story = {
  render: () => html`
    <swc-progress-circle label="Uploading" progress="5">
      Ignored slot content
    </swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step(
      'still deprecates light DOM when label provides the accessible name',
      () =>
        withWarningSpy(async (warnCalls) => {
          progressCircle.progress = 6;
          await progressCircle.updateComplete;

          expect(
            warnCalls.length,
            'exactly one warning is emitted for light DOM when label provides the accessible name'
          ).toBe(1);
          expect(
            String(warnCalls[0]?.[1] ?? ''),
            'the warning message references the removed default slot'
          ).toContain('no longer has a default slot');
        })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const ProgressValuesTest: Story = {
  render: () => html`
    ${[0, 25, 50, 75, 100].map(
      (progress) => html`
        <swc-progress-circle
          progress=${progress}
          label="Progress ${progress}%"
          size="m"
        ></swc-progress-circle>
      `
    )}
  `,
  play: async ({ canvasElement, step }) => {
    const circles = await getComponents<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    const expectedValues = [0, 25, 50, 75, 100];

    await step('renders with the correct initial progress values', async () => {
      circles.forEach((circle, i) => {
        expect(circle.progress).toBe(expectedValues[i]);
        expect(circle.getAttribute('progress')).toBe(String(expectedValues[i]));
      });
    });

    await step('reflects progress values as progress changes', async () => {
      const circle = circles[0];
      expect(circle.progress).toBe(0);
      expect(circle.getAttribute('progress')).toBe('0');
      circle.progress = 50;
      await circle.updateComplete;
      expect(circle.progress).toBe(50);
      expect(circle.getAttribute('progress')).toBe('50');
      circle.progress = 100;
      await circle.updateComplete;
      expect(circle.progress).toBe(100);
      expect(circle.getAttribute('progress')).toBe('100');
    });
  },
};

export const ProgressClampTest: Story = {
  render: () => html`
    <swc-progress-circle
      progress="150"
      label="Clamped high"
    ></swc-progress-circle>
    <swc-progress-circle
      progress="-20"
      label="Clamped low"
    ></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const circles = await getComponents<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('renders progress above 100 as 100', async () => {
      expect(circles[0].progress, 'progress property keeps the value set').toBe(
        150
      );
      expect(
        circles[0].getAttribute('progress'),
        'progress attribute keeps the value set'
      ).toBe('150');
      expect(
        circles[0].getAttribute('aria-valuenow'),
        'aria-valuenow uses the clamped value of 100'
      ).toBe('100');
    });

    await step('renders progress below 0 as 0', async () => {
      expect(circles[1].progress, 'progress property keeps the value set').toBe(
        -20
      );
      expect(
        circles[1].getAttribute('aria-valuenow'),
        'aria-valuenow uses the clamped value of 0'
      ).toBe('0');
    });

    await step('warns when progress is set outside 0–100', () =>
      withWarningSpy(async (warnCalls) => {
        circles[0].progress = 250;
        await circles[0].updateComplete;
        expect(
          String(warnCalls[0]?.[1] ?? ''),
          'warning names the property and received value'
        ).toMatch(/"progress".*"250"/);
      })
    );

    await step('does not warn for progress within 0–100', () =>
      withWarningSpy(async (warnCalls) => {
        circles[0].progress = 40;
        await circles[0].updateComplete;
        expect(warnCalls.length, 'no warning for a valid progress').toBe(0);
      })
    );
  },
};

export const InvalidProgressInMarkupTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step(
      'keeps non-numeric progress from the initial markup and renders 0%',
      () =>
        withWarningSpy(async (warnCalls) => {
          const circle = await fixture<ProgressCircle>(html`
            <swc-progress-circle
              progress="banana"
              label="Loading"
            ></swc-progress-circle>
          `);

          expect(
            circle.getAttribute('progress'),
            'attribute is not rewritten'
          ).toBe('banana');
          expect(circle.progress, 'property keeps the text').toBe('banana');
          expect(
            circle.getAttribute('aria-valuenow'),
            'renders the clamped value'
          ).toBe('0');
          expect(
            warnCalls.map((call) => String(call[1])).join('\n'),
            'warning names the received value'
          ).toContain('Received "banana"');
          circle.parentElement?.remove();
        })
    );
  },
};

export const IndeterminateTest: Story = {
  ...Indeterminate,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('removes aria-valuenow in indeterminate state', async () => {
      expect(progressCircle.progress).toBe(null);
      expect(progressCircle.hasAttribute('aria-valuenow')).toBe(false);
    });
  },
};

export const ReturnToIndeterminateTest: Story = {
  render: () => html`
    <swc-progress-circle progress="50" label="Processing"></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('renders determinate progress with aria-valuenow', async () => {
      expect(
        progressCircle.hasAttribute('aria-valuenow'),
        'aria-valuenow is present in determinate state'
      ).toBe(true);
      expect(
        progressCircle.getAttribute('aria-valuenow'),
        'aria-valuenow reflects the initial progress of 50'
      ).toBe('50');
    });

    await step(
      'clears aria-valuenow when switched to indeterminate',
      async () => {
        progressCircle.progress = null;
        await progressCircle.updateComplete;

        expect(
          progressCircle.hasAttribute('aria-valuenow'),
          'aria-valuenow is removed after switching to indeterminate'
        ).toBe(false);
      }
    );
  },
};

export const RingGeometryTest: Story = {
  render: () => html`
    ${PROGRESS_CIRCLE_VALID_SIZES.map(
      (size) => html`
        <swc-progress-circle
          size=${size}
          progress="50"
          label="Size ${size}"
        ></swc-progress-circle>
      `
    )}
    <swc-progress-circle
      progress="50"
      label="Custom thickness"
      style="--swc-progress-circle-thickness: 8px"
    ></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const circles = await getComponents<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );
    const customCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle[style]'
    );
    const getRings = (circle: ProgressCircle) =>
      Array.from(
        circle.renderRoot.querySelectorAll<SVGCircleElement>(
          '.swc-ProgressCircle-track, .swc-ProgressCircle-fill'
        )
      );
    const getBoxSize = (circle: ProgressCircle) =>
      circle.renderRoot.querySelector('svg')?.getBoundingClientRect().width ??
      0;
    const getRadius = (ring: SVGCircleElement) => ring.getBBox().width / 2;
    const getStrokeWidth = (ring: SVGCircleElement) =>
      parseFloat(getComputedStyle(ring).strokeWidth);

    await step(
      'insets each ring by half its stroke width so it fills the box without clipping',
      async () => {
        circles.forEach((circle) => {
          const rings = getRings(circle);
          expect(rings.length, `${circle.label} ring count`).toBe(2);
          rings.forEach((ring) => {
            expect(
              getRadius(ring) + getStrokeWidth(ring) / 2,
              `${circle.label} ${ring.getAttribute('class')} outer edge`
            ).toBeCloseTo(getBoxSize(circle) / 2, 2);
          });
        });
      }
    );

    await step('derives the ring radius from a custom thickness', async () => {
      getRings(customCircle).forEach((ring) => {
        expect(
          getStrokeWidth(ring),
          `${customCircle.label} ${ring.getAttribute('class')} stroke width`
        ).toBe(8);
        expect(
          getRadius(ring),
          `${customCircle.label} ${ring.getAttribute('class')} radius`
        ).toBeCloseTo(getBoxSize(customCircle) / 2 - 4, 2);
      });
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const NotFocusableTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('is not in the tab order', async () => {
      expect(progressCircle.tabIndex, 'tabIndex is -1').toBe(-1);
    });

    await step(
      'does not receive focus when focused programmatically',
      async () => {
        progressCircle.focus();
        expect(
          document.activeElement,
          'activeElement is not the progress circle'
        ).not.toBe(progressCircle);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const AccessibilityWarningTest: Story = {
  render: () => html`
    <swc-progress-circle></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step(
      'applies default "Loading" label when no accessible name is provided',
      async () => {
        expect(progressCircle.getAttribute('aria-label')).toBe('Loading');
      }
    );

    await step('warns when accessible name is removed', () =>
      withWarningSpy(async (warnCalls) => {
        progressCircle.label = 'Temporary';
        await progressCircle.updateComplete;
        progressCircle.label = '';
        await progressCircle.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted when there is no accessible name'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'the warning message references the accessible name requirement'
        ).toContain('accessible');
      })
    );
  },
};

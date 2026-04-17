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

import '@adobe/spectrum-wc/progress-circle';

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/progress-circle.stories.js';
import {
  Indeterminate,
  Overview,
  ProgressValues,
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
      'renders determinate progress with an accessible label',
      async () => {
        expect(progressCircle.getAttribute('role')).toBe('progressbar');
        expect(progressCircle.getAttribute('aria-label')).toBe(
          progressCircle.label
        );
        expect(progressCircle.hasAttribute('progress')).toBe(false);
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
        expect(size).toBeTruthy();
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
        expect(staticColor).toBeTruthy();
        expect(['white', 'black']).toContain(staticColor);
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
      expect(progressCircle.getAttribute('aria-label')).toBe('Uploading file');
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

          expect(warnCalls.length).toBe(0);
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

          expect(warnCalls.length).toBe(0);
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

          expect(warnCalls.length).toBe(1);
          expect(String(warnCalls[0]?.[1] ?? '')).toContain(
            'no longer has a default slot'
          );
        })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const ProgressValuesTest: Story = {
  ...ProgressValues,
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

    await step('clamps progress above 100 to 100', async () => {
      expect(circles[0].progress).toBe(100);
      expect(circles[0].getAttribute('aria-valuenow')).toBe('100');
    });

    await step('clamps progress below 0 to 0', async () => {
      expect(circles[1].progress).toBe(0);
      expect(circles[1].getAttribute('aria-valuenow')).toBe('0');
    });
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
      expect(progressCircle.hasAttribute('aria-valuenow')).toBe(true);
      expect(progressCircle.getAttribute('aria-valuenow')).toBe('50');
    });

    await step(
      'clears aria-valuenow when switched to indeterminate',
      async () => {
        progressCircle.progress = null;
        await progressCircle.updateComplete;

        expect(progressCircle.hasAttribute('aria-valuenow')).toBe(false);
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

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('accessible');
      })
    );
  },
};

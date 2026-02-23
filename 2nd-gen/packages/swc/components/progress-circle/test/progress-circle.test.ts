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
        expect(progressCircle.getAttribute('aria-valuenow')).toBe(
          String(progressCircle.progress)
        );
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

export const RoleOverrideTest: Story = {
  render: () => html`
    <swc-progress-circle role="status" label="Loading"></swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('preserves user-supplied role', async () => {
      expect(progressCircle.getAttribute('role')).toBe('status');
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

    await step('removes aria-label when label is cleared', async () => {
      progressCircle.label = '';
      await progressCircle.updateComplete;

      expect(progressCircle.getAttribute('aria-label')).toBeNull();
    });
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
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const SlotLabelTest: Story = {
  render: () => html`
    <swc-progress-circle>Loading data</swc-progress-circle>
  `,
  play: async ({ canvasElement, step }) => {
    const progressCircle = await getComponent<ProgressCircle>(
      canvasElement,
      'swc-progress-circle'
    );

    await step('uses slot content as the label', async () => {
      expect(progressCircle.label).toBe('Loading data');
      expect(progressCircle.getAttribute('aria-label')).toBe('Loading data');
    });
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

    await step('reflects progress values to aria-valuenow', async () => {
      circles.forEach((circle) => {
        const progress = String(circle.progress);
        expect(circle.getAttribute('aria-valuenow')).toBe(progress);
      });
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
      expect(progressCircle.indeterminate).toBe(true);
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
        progressCircle.indeterminate = true;
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
    await step('warns when there is no accessible name', () =>
      withWarningSpy(async (warnCalls) => {
        progressCircle.progress = 10;
        await progressCircle.updateComplete;

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('accessible');
      })
    );
  },
};

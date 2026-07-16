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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { ProgressBar } from '@adobe/spectrum-wc/progress-bar';

import '@adobe/spectrum-wc/components/progress-bar/swc-progress-bar.js';

import {
  fixture,
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/progress-bar.stories.js';
import { Indeterminate, Overview } from '../stories/progress-bar.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Progress Bar/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

/**
 * The WAI-ARIA `progressbar` role lives on the shadow `.swc-LinearProgress`
 * wrapper, not on the host. Every `aria-value*` and naming attribute is
 * read from this element.
 */
const getRoleEl = (host: ProgressBar): HTMLElement => {
  const roleEl = host.shadowRoot?.querySelector<HTMLElement>(
    '[role="progressbar"]'
  );
  if (!roleEl) {
    throw new Error('progressbar role element not found in shadow root');
  }
  return roleEl;
};

const getFillEl = (host: ProgressBar): HTMLElement => {
  const fill = host.shadowRoot?.querySelector<HTMLElement>(
    '.swc-LinearProgress-fill'
  );
  if (!fill) {
    throw new Error('fill element not found in shadow root');
  }
  return fill;
};

// ──────────────────────────────────────────────────────────────
// TEST: Role placement and default ARIA
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const progressBar = await getComponent<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );
    const roleEl = getRoleEl(progressBar);

    await step('host carries no ARIA role; role lives in shadow', () => {
      expect(progressBar.hasAttribute('role')).toBe(false);
      expect(roleEl.getAttribute('role')).toBe('progressbar');
    });

    await step('default range and value bind to the role element', () => {
      expect(roleEl.getAttribute('aria-valuemin')).toBe('0');
      expect(roleEl.getAttribute('aria-valuemax')).toBe('100');
      expect(roleEl.getAttribute('aria-valuenow')).toBe('75');
      expect(roleEl.getAttribute('aria-valuetext')).toBeTruthy();
    });

    await step('label slot is referenced via aria-labelledby', () => {
      const labelledBy = roleEl.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      const labelEl = progressBar.shadowRoot?.getElementById(
        labelledBy as string
      );
      expect(labelEl, 'aria-labelledby points to a real element').toBeTruthy();
      // No aria-label when a visible label slot provides the name.
      expect(roleEl.hasAttribute('aria-label')).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Indeterminate suppresses all value attrs + visible text
// ──────────────────────────────────────────────────────────────

export const IndeterminateTest: Story = {
  ...Indeterminate,
  play: async ({ canvasElement, step }) => {
    const progressBar = await getComponent<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );
    const roleEl = getRoleEl(progressBar);

    await step('all four aria-value* attributes are absent', () => {
      expect(roleEl.hasAttribute('aria-valuemin')).toBe(false);
      expect(roleEl.hasAttribute('aria-valuemax')).toBe(false);
      expect(roleEl.hasAttribute('aria-valuenow')).toBe(false);
      expect(roleEl.hasAttribute('aria-valuetext')).toBe(false);
    });

    await step('visible value text element is not rendered', () => {
      const valueEl = progressBar.shadowRoot?.querySelector(
        '.swc-LinearProgress-value'
      );
      expect(
        valueEl,
        'value text element is absent in indeterminate'
      ).toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Determinate → indeterminate toggle clears value attrs
// ──────────────────────────────────────────────────────────────

export const ToggleIndeterminateTest: Story = {
  render: () => html`
    <swc-progress-bar value="50">
      <span slot="label">Processing</span>
    </swc-progress-bar>
  `,
  play: async ({ canvasElement, step }) => {
    const progressBar = await getComponent<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );
    const roleEl = getRoleEl(progressBar);

    await step('determinate state has all four value attributes', () => {
      expect(roleEl.getAttribute('aria-valuenow')).toBe('50');
      expect(roleEl.hasAttribute('aria-valuemin')).toBe(true);
      expect(roleEl.hasAttribute('aria-valuemax')).toBe(true);
      expect(roleEl.hasAttribute('aria-valuetext')).toBe(true);
    });

    await step(
      'switching to indeterminate removes all four value attributes',
      async () => {
        progressBar.indeterminate = true;
        await progressBar.updateComplete;

        expect(roleEl.hasAttribute('aria-valuenow')).toBe(false);
        expect(roleEl.hasAttribute('aria-valuemin')).toBe(false);
        expect(roleEl.hasAttribute('aria-valuemax')).toBe(false);
        expect(roleEl.hasAttribute('aria-valuetext')).toBe(false);
      }
    );

    await step(
      'returning to determinate restores all four value attributes',
      async () => {
        progressBar.indeterminate = false;
        await progressBar.updateComplete;

        expect(roleEl.getAttribute('aria-valuenow')).toBe('50');
        expect(roleEl.hasAttribute('aria-valuemin')).toBe(true);
        expect(roleEl.hasAttribute('aria-valuemax')).toBe(true);
        expect(roleEl.hasAttribute('aria-valuetext')).toBe(true);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Custom minValue/maxValue clamps value and feeds ARIA + fill
// ──────────────────────────────────────────────────────────────

export const CustomRangeClampTest: Story = {
  render: () => html`
    <swc-progress-bar min-value="0" max-value="10" value="3">
      <span slot="label">Steps completed</span>
    </swc-progress-bar>
  `,
  play: async ({ canvasElement, step }) => {
    const progressBar = await getComponent<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );
    const roleEl = getRoleEl(progressBar);

    await step('sanitized range feeds aria-value*', () => {
      expect(roleEl.getAttribute('aria-valuemin')).toBe('0');
      expect(roleEl.getAttribute('aria-valuemax')).toBe('10');
      expect(roleEl.getAttribute('aria-valuenow')).toBe('3');
      // 3 of 0..10 → 30% fill.
      expect(getFillEl(progressBar).style.inlineSize).toBe('30%');
    });

    await step('clamps value above max', async () => {
      progressBar.value = 30;
      await progressBar.updateComplete;
      expect(roleEl.getAttribute('aria-valuenow')).toBe('10');
      expect(getFillEl(progressBar).style.inlineSize).toBe('100%');
    });

    await step('clamps value below min', async () => {
      progressBar.value = -5;
      await progressBar.updateComplete;
      expect(roleEl.getAttribute('aria-valuenow')).toBe('0');
      expect(getFillEl(progressBar).style.inlineSize).toBe('0%');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: accessible-label fallback vs label slot
// ──────────────────────────────────────────────────────────────

export const AccessibleLabelTest: Story = {
  render: () => html`
    <swc-progress-bar
      value="60"
      accessible-label="Screen-reader label"
    ></swc-progress-bar>
  `,
  play: async ({ canvasElement, step }) => {
    const progressBar = await getComponent<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );
    const roleEl = getRoleEl(progressBar);

    await step(
      'accessible-label renders aria-label, not aria-labelledby',
      () => {
        expect(roleEl.getAttribute('aria-label')).toBe('Screen-reader label');
        expect(roleEl.hasAttribute('aria-labelledby')).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: description slot → aria-describedby present/absent
// ──────────────────────────────────────────────────────────────

export const DescriptionPresentTest: Story = {
  render: () => html`
    <swc-progress-bar value="40">
      <span slot="label">Files uploaded</span>
      <span slot="description">Upload will complete shortly</span>
    </swc-progress-bar>
  `,
  play: async ({ canvasElement, step }) => {
    const progressBar = await getComponent<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );
    const roleEl = getRoleEl(progressBar);

    await step('description slot is referenced via aria-describedby', () => {
      const describedBy = roleEl.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(
        progressBar.shadowRoot?.getElementById(describedBy as string)
      ).toBeTruthy();
    });

    await step(
      'no aria-describedby when description slot is empty',
      async () => {
        // Remove the description slot content to verify the attribute is absent.
        progressBar.querySelector('[slot="description"]')?.remove();
        // Presence detection runs through a MutationObserver, which then
        // schedules a deferred re-render, so a single `updateComplete` is not
        // enough; poll until the attribute is dropped. Timing of the observer
        // callback varies across engines (notably WebKit).
        await waitFor(() =>
          expect(roleEl.hasAttribute('aria-describedby')).toBe(false)
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: value-label overrides formatted text; suppressed in indeterminate
// ──────────────────────────────────────────────────────────────

export const ValueLabelOverrideTest: Story = {
  render: () => html`
    <swc-progress-bar value="2" max-value="5" value-label="2 of 5 files">
      <span slot="label">Files uploaded</span>
    </swc-progress-bar>
  `,
  play: async ({ canvasElement, step }) => {
    const progressBar = await getComponent<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );
    const roleEl = getRoleEl(progressBar);
    const valueEl = progressBar.shadowRoot?.querySelector(
      '.swc-LinearProgress-value'
    );

    await step('value-label drives rendered value and aria-valuetext', () => {
      expect(roleEl.getAttribute('aria-valuetext')).toBe('2 of 5 files');
      expect(valueEl?.textContent?.trim()).toBe('2 of 5 files');
    });

    await step(
      'clearing value-label falls back to percent format',
      async () => {
        progressBar.valueLabel = undefined;
        await progressBar.updateComplete;
        expect(roleEl.getAttribute('aria-valuetext')).not.toBe('2 of 5 files');
        expect(roleEl.getAttribute('aria-valuetext')).toContain('%');
      }
    );

    await step('value-label is suppressed when indeterminate', async () => {
      progressBar.valueLabel = '2 of 5 files';
      progressBar.indeterminate = true;
      await progressBar.updateComplete;
      // All aria-value* are absent in indeterminate state.
      expect(roleEl.hasAttribute('aria-valuetext')).toBe(false);
      expect(
        progressBar.shadowRoot?.querySelector('.swc-LinearProgress-value')
      ).toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Missing accessible-name DEBUG warning
// ──────────────────────────────────────────────────────────────

export const MissingAccessibleNameTest: Story = {
  // The no-accessible-name warning is one-shot per instance (guarded by an
  // internal flag in the mixin) and fires on the first render when DEBUG is
  // enabled. Mount a fresh element *inside* the warning spy so the spy
  // captures that first render, rather than mutating an element that may have
  // already warned before the spy was installed.
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('warns when no label slot and no accessible-label', () =>
      withWarningSpy(async (warnCalls) => {
        const progressBar = await fixture<ProgressBar>(html`
          <swc-progress-bar value="50"></swc-progress-bar>
        `);
        await progressBar.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes('accessible name'))).toBe(true);
        progressBar.parentElement?.remove();
      })
    );

    await step('does not warn when accessible-label is set', () =>
      withWarningSpy(async (warnCalls) => {
        const progressBar = await fixture<ProgressBar>(html`
          <swc-progress-bar
            value="50"
            accessible-label="Uploading"
          ></swc-progress-bar>
        `);
        await progressBar.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes('accessible name'))).toBe(false);
        progressBar.parentElement?.remove();
      })
    );

    await step('does not warn when label slot has content', () =>
      withWarningSpy(async (warnCalls) => {
        const progressBar = await fixture<ProgressBar>(html`
          <swc-progress-bar value="50">
            <span slot="label">Uploading file</span>
          </swc-progress-bar>
        `);
        await progressBar.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes('accessible name'))).toBe(false);
        progressBar.parentElement?.remove();
      })
    );

    await step('warning references swc-progress-bar, not progress-circle', () =>
      withWarningSpy(async (warnCalls) => {
        const progressBar = await fixture<ProgressBar>(html`
          <swc-progress-bar value="50"></swc-progress-bar>
        `);
        await progressBar.updateComplete;
        const elements = warnCalls.map((c) => c?.[0]);
        // The first argument is the element itself; its localName must be
        // swc-progress-bar, not swc-progress-circle (1st-gen copy-paste bug).
        const warnedElement = elements[0] as HTMLElement | undefined;
        expect(warnedElement?.localName).toBe('swc-progress-bar');
        progressBar.parentElement?.remove();
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Static-color reflection (restores coverage for the
// `!test` StaticColors story, which axe cannot evaluate against
// the decorator gradient).
// ──────────────────────────────────────────────────────────────

export const StaticColorsTest: Story = {
  render: () => html`
    <swc-progress-bar static-color="white" value="50">
      <span slot="label">Static white</span>
    </swc-progress-bar>
    <swc-progress-bar static-color="black" value="50">
      <span slot="label">Static black</span>
    </swc-progress-bar>
  `,
  parameters: { staticColorsDemo: true },
  play: async ({ canvasElement, step }) => {
    const bars = await getComponents<ProgressBar>(
      canvasElement,
      'swc-progress-bar'
    );

    await step('each bar reflects its static-color attribute', () => {
      const colors = bars.map((bar) => bar.getAttribute('static-color'));
      expect(colors).toEqual(['white', 'black']);
    });
  },
};

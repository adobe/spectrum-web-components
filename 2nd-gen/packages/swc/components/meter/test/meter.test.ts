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

import { Meter } from '@adobe/spectrum-wc/meter';

import '@adobe/spectrum-wc/components/meter/swc-meter.js';

import {
  fixture,
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/meter.stories.js';
import { Overview, Sizes, Variants } from '../stories/meter.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Meter/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

/**
 * The WAI-ARIA `meter` role lives on the shadow `.swc-LinearProgress`
 * wrapper, not on the host. Every `aria-value*` and naming attribute is
 * read from this element.
 */
const getRoleEl = (host: Meter): HTMLElement => {
  const roleEl = host.shadowRoot?.querySelector<HTMLElement>('[role="meter"]');
  if (!roleEl) {
    throw new Error('meter role element not found in shadow root');
  }
  return roleEl;
};

const getFillEl = (host: Meter): HTMLElement => {
  const fill = host.shadowRoot?.querySelector<HTMLElement>(
    '.swc-LinearProgress-fill'
  );
  if (!fill) {
    throw new Error('fill element not found in shadow root');
  }
  return fill;
};

// ──────────────────────────────────────────────────────────────
// TEST: Role placement and default ARIA (B9)
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);

    await step('host carries no ARIA role; role lives in shadow', () => {
      expect(meter.hasAttribute('role')).toBe(false);
      expect(roleEl.getAttribute('role')).toBe('meter');
    });

    await step('default range and value bind to the role element', () => {
      expect(roleEl.getAttribute('aria-valuemin')).toBe('0');
      expect(roleEl.getAttribute('aria-valuemax')).toBe('100');
      expect(roleEl.getAttribute('aria-valuenow')).toBe('40');
      expect(roleEl.getAttribute('aria-valuetext')).toBeTruthy();
    });

    await step('label slot is referenced via aria-labelledby', () => {
      const labelledBy = roleEl.getAttribute('aria-labelledby');
      expect(labelledBy).toBeTruthy();
      const labelEl = meter.shadowRoot?.getElementById(labelledBy as string);
      expect(labelEl, 'aria-labelledby points to a real element').toBeTruthy();
      // No aria-label when a visible label slot provides the name.
      expect(roleEl.hasAttribute('aria-label')).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variant validation (DEBUG warning)
// ──────────────────────────────────────────────────────────────

export const VariantValidationTest: Story = {
  render: () => html`
    <swc-meter value="50" variant="positive">
      <span slot="label">Valid variant</span>
    </swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');

    await step('valid variant does not warn', () =>
      withWarningSpy(async (warnCalls) => {
        meter.variant = 'negative';
        await meter.updateComplete;
        expect(warnCalls.length).toBe(0);
      })
    );

    await step('invalid variant warns and falls back to informative', () =>
      withWarningSpy(async (warnCalls) => {
        meter.variant = 'invalid' as Meter['variant'];
        await meter.updateComplete;
        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] ?? '')).toContain('variant');
        // Unknown variant is sanitized to the default and reflected.
        await meter.updateComplete;
        expect(meter.variant).toBe('informative');
        expect(meter.getAttribute('variant')).toBe('informative');
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: value → aria-valuenow across range edges
// ──────────────────────────────────────────────────────────────

export const ValueToAriaTest: Story = {
  render: () => html`
    <swc-meter value="0"><span slot="label">Tracking</span></swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);

    await step('reflects min, midpoint, and max values', async () => {
      expect(roleEl.getAttribute('aria-valuenow')).toBe('0');

      meter.value = 50;
      await meter.updateComplete;
      expect(roleEl.getAttribute('aria-valuenow')).toBe('50');

      meter.value = 100;
      await meter.updateComplete;
      expect(roleEl.getAttribute('aria-valuenow')).toBe('100');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Custom range clamps value and feeds ARIA + fill
// ──────────────────────────────────────────────────────────────

export const CustomRangeClampTest: Story = {
  render: () => html`
    <swc-meter min-value="0" max-value="10" value="3">
      <span slot="label">Inputs filled</span>
    </swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);

    await step('sanitized range feeds aria-value*', () => {
      expect(roleEl.getAttribute('aria-valuemin')).toBe('0');
      expect(roleEl.getAttribute('aria-valuemax')).toBe('10');
      expect(roleEl.getAttribute('aria-valuenow')).toBe('3');
      // 3 of 0..10 → 30 % fill.
      expect(getFillEl(meter).style.inlineSize).toBe('30%');
    });

    await step('clamps value above max', async () => {
      meter.value = 30;
      await meter.updateComplete;
      expect(roleEl.getAttribute('aria-valuenow')).toBe('10');
      expect(getFillEl(meter).style.inlineSize).toBe('100%');
    });

    await step('clamps value below min', async () => {
      meter.value = -5;
      await meter.updateComplete;
      expect(roleEl.getAttribute('aria-valuenow')).toBe('0');
      expect(getFillEl(meter).style.inlineSize).toBe('0%');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: value-label overrides auto-formatted text
// ──────────────────────────────────────────────────────────────

export const ValueLabelOverrideTest: Story = {
  render: () => html`
    <swc-meter value="2.4" max-value="5" value-label="2.4 GB / 5 GB">
      <span slot="label">Storage used</span>
    </swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);
    const valueEl = meter.shadowRoot?.querySelector(
      '.swc-LinearProgress-value'
    );

    await step('value-label drives rendered value and aria-valuetext', () => {
      expect(roleEl.getAttribute('aria-valuetext')).toBe('2.4 GB / 5 GB');
      expect(valueEl?.textContent?.trim()).toBe('2.4 GB / 5 GB');
    });

    await step(
      'clearing value-label falls back to percent format',
      async () => {
        meter.valueLabel = undefined;
        await meter.updateComplete;
        expect(roleEl.getAttribute('aria-valuetext')).not.toBe('2.4 GB / 5 GB');
        expect(roleEl.getAttribute('aria-valuetext')).toContain('%');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: formatOptions drives auto-formatted text
// ──────────────────────────────────────────────────────────────

export const FormatOptionsTest: Story = {
  render: () => html`
    <swc-meter value="42" max-value="100">
      <span slot="label">Amount due</span>
    </swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);

    await step('default format is percent', () => {
      expect(roleEl.getAttribute('aria-valuetext')).toContain('%');
    });

    await step(
      'currency formatOptions formats the raw clamped value',
      async () => {
        // formatOptions is a JS-only property (attribute: false).
        meter.formatOptions = { style: 'currency', currency: 'USD' };
        await meter.updateComplete;
        const valueText = roleEl.getAttribute('aria-valuetext') ?? '';
        expect(valueText).toContain('$');
        expect(valueText).toContain('42');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: accessible-label fallback vs label slot
// ──────────────────────────────────────────────────────────────

export const AccessibleLabelTest: Story = {
  render: () => html`
    <swc-meter value="60" accessible-label="Screen-reader label"></swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);

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
    <swc-meter value="40">
      <span slot="label">Storage used</span>
      <span slot="description">2 GB of 5 GB used</span>
    </swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);

    await step('description slot is referenced via aria-describedby', () => {
      const describedBy = roleEl.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(
        meter.shadowRoot?.getElementById(describedBy as string)
      ).toBeTruthy();
    });
  },
};

export const DescriptionAbsentTest: Story = {
  render: () => html`
    <swc-meter value="40"><span slot="label">Storage used</span></swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);

    await step('no aria-describedby when description slot is empty', () => {
      expect(roleEl.hasAttribute('aria-describedby')).toBe(false);
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
        const meter = await fixture<Meter>(html`
          <swc-meter value="50"></swc-meter>
        `);
        await meter.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes('accessible name'))).toBe(true);
        // Remove the `fixture()` container, not just the meter, so the
        // wrapper div is not left orphaned in <body> across test runs.
        meter.parentElement?.remove();
      })
    );

    await step('does not warn when accessible-label is set', () =>
      withWarningSpy(async (warnCalls) => {
        const meter = await fixture<Meter>(html`
          <swc-meter value="50" accessible-label="Now named"></swc-meter>
        `);
        await meter.updateComplete;
        const messages = warnCalls.map((c) => String(c?.[1] ?? ''));
        expect(messages.some((m) => m.includes('accessible name'))).toBe(false);
        meter.parentElement?.remove();
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Locale-aware percent formatting
// ──────────────────────────────────────────────────────────────

export const LocaleFormattingTest: Story = {
  render: () => html`
    <swc-meter value="45"><span slot="label">Loading</span></swc-meter>
  `,
  play: async ({ canvasElement, step }) => {
    const meter = await getComponent<Meter>(canvasElement, 'swc-meter');
    const roleEl = getRoleEl(meter);
    const originalLang = document.documentElement.lang;

    // The locale comes from `<html lang>` via a MutationObserver, which fires
    // asynchronously. Yield a frame so the observer can request an update
    // before awaiting the next render cycle.
    const applyLang = async (lang: string): Promise<void> => {
      document.documentElement.lang = lang;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      await meter.updateComplete;
    };

    try {
      await step('en-US renders a Latin percent sign', async () => {
        await applyLang('en-US');
        meter.value = 46;
        await meter.updateComplete;
        expect(roleEl.getAttribute('aria-valuetext')).toContain('%');
      });

      await step('ar-SA renders the Arabic percent sign', async () => {
        await applyLang('ar-SA');
        expect(roleEl.getAttribute('aria-valuetext')).toContain('٪');
      });
    } finally {
      document.documentElement.lang = originalLang;
    }
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Reflected attributes from shared stories
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    const meters = await getComponents<Meter>(canvasElement, 'swc-meter');

    await step('each meter reflects a valid size attribute', () => {
      meters.forEach((meter) => {
        const size = meter.getAttribute('size');
        expect(['s', 'm', 'l', 'xl']).toContain(size);
      });
    });
  },
};

export const VariantsTest: Story = {
  ...Variants,
  play: async ({ canvasElement, step }) => {
    const meters = await getComponents<Meter>(canvasElement, 'swc-meter');

    await step('each meter reflects a valid variant attribute', () => {
      meters.forEach((meter) => {
        const variant = meter.getAttribute('variant');
        expect(['informative', 'positive', 'notice', 'negative']).toContain(
          variant
        );
      });
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Static-color reflection (restores coverage for the
// `!test` StaticColors story, which axe cannot evaluate against
// the decorator gradient).
// ──────────────────────────────────────────────────────────────

export const StaticColorsTest: Story = {
  render: () => html`
    <swc-meter static-color="white" value="50">
      <span slot="label">Static white</span>
    </swc-meter>
    <swc-meter static-color="black" value="50">
      <span slot="label">Static black</span>
    </swc-meter>
  `,
  parameters: { staticColorsDemo: true },
  play: async ({ canvasElement, step }) => {
    const meters = await getComponents<Meter>(canvasElement, 'swc-meter');

    await step('each meter reflects its static-color attribute', () => {
      const colors = meters.map((meter) => meter.getAttribute('static-color'));
      expect(colors).toEqual(['white', 'black']);
    });
  },
};

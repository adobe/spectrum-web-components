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

import { Badge } from '@adobe/spectrum-wc/badge';

import '@adobe/spectrum-wc/badge';

import {
  BADGE_VALID_SIZES,
  BADGE_VARIANTS,
  BADGE_VARIANTS_COLOR,
  BADGE_VARIANTS_SEMANTIC,
  FIXED_VALUES,
} from '../../../../core/components/badge/Badge.types.js';
import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  Anatomy,
  Fixed,
  NonSemanticVariants,
  Outline,
  Overview,
  SemanticVariants,
  Subtle,
} from '../stories/badge.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Badge/Tests',
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
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('renders expected default values and slot content', async () => {
      expect(badge.variant, 'default variant is neutral').toBe('neutral');
      expect(badge.size, 'default size is s').toBe('s');
      expect(
        badge.textContent?.trim(),
        'default slot has text content'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('variant reflects to attribute after mutation', async () => {
      badge.variant = 'positive';
      await badge.updateComplete;
      expect(
        badge.getAttribute('variant'),
        'variant attribute is positive after mutation'
      ).toBe('positive');

      badge.variant = 'notice';
      await badge.updateComplete;
      expect(
        badge.getAttribute('variant'),
        'variant attribute is notice after second mutation'
      ).toBe('notice');
    });

    await step('subtle reflects to attribute after mutation', async () => {
      badge.subtle = true;
      await badge.updateComplete;
      expect(
        badge.hasAttribute('subtle'),
        'subtle attribute is present after setting subtle=true'
      ).toBe(true);
    });

    await step('outline reflects to attribute after mutation', async () => {
      badge.outline = true;
      await badge.updateComplete;
      expect(
        badge.hasAttribute('outline'),
        'outline attribute is present after setting outline=true'
      ).toBe(true);
    });
  },
};

export const FixedClearingTest: Story = {
  render: () => html`
    <swc-badge fixed="block-start" variant="informative">Pinned</swc-badge>
  `,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('initially has fixed attribute', async () => {
      expect(badge.fixed, 'fixed property is block-start initially').toBe(
        'block-start'
      );
      expect(
        badge.hasAttribute('fixed'),
        'fixed attribute is present initially'
      ).toBe(true);
    });

    await step('removes fixed attribute when set to undefined', async () => {
      badge.fixed = undefined;
      await badge.updateComplete;

      expect(badge.fixed, 'fixed property is falsy after clearing').toBeFalsy();
      expect(
        badge.hasAttribute('fixed'),
        'fixed attribute is absent after clearing'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const badges = await getComponents<Badge>(canvasElement, 'swc-badge');

    await step('includes icon slot content', async () => {
      const badgeWithIcon = badges.find((item) =>
        item.querySelector('[slot="icon"]')
      );
      expect(
        badgeWithIcon,
        'at least one badge has icon slot content'
      ).toBeTruthy();
      const slottedIcon = badgeWithIcon?.querySelector('[slot="icon"]');
      expect(slottedIcon, 'icon slot element is present').toBeTruthy();
      expect(
        slottedIcon?.children.length,
        'icon slot has child elements'
      ).toBeGreaterThan(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SemanticVariantsTest: Story = {
  ...SemanticVariants,
  play: async ({ canvasElement, step }) => {
    await step('renders all semantic variant values', async () => {
      for (const variant of BADGE_VARIANTS_SEMANTIC) {
        const badge = canvasElement.querySelector(
          `swc-badge[variant="${variant}"]`
        ) as Badge | null;
        expect(
          badge,
          `badge with variant="${variant}" is rendered`
        ).toBeTruthy();
        await badge?.updateComplete;
        expect(badge?.variant, `badge variant property is "${variant}"`).toBe(
          variant
        );
      }
    });
  },
};

export const OutlineTest: Story = {
  ...Outline,
  play: async ({ canvasElement, step }) => {
    await step(
      'reflects outline attribute on all semantic variants',
      async () => {
        for (const variant of BADGE_VARIANTS_SEMANTIC) {
          const badge = canvasElement.querySelector(
            `swc-badge[variant="${variant}"]`
          ) as Badge | null;
          expect(
            badge,
            `badge with variant="${variant}" is rendered`
          ).toBeTruthy();
          await badge?.updateComplete;
          expect(
            badge?.hasAttribute('outline'),
            `badge with variant="${variant}" has outline attribute`
          ).toBe(true);
        }
      }
    );
  },
};

export const SizesTest: Story = {
  render: () => html`
    ${BADGE_VALID_SIZES.map(
      (size) => html`
        <swc-badge size=${size} variant="informative">${size}</swc-badge>
      `
    )}
  `,
  play: async ({ canvasElement, step }) => {
    await step('renders all valid sizes', async () => {
      for (const size of BADGE_VALID_SIZES) {
        const badge = canvasElement.querySelector(
          `swc-badge[size="${size}"]`
        ) as Badge | null;
        expect(badge, `badge with size="${size}" is rendered`).toBeTruthy();
        await badge?.updateComplete;
        expect(badge?.size, `badge size property is "${size}"`).toBe(size);
      }
    });
  },
};

export const SubtleTest: Story = {
  ...Subtle,
  play: async ({ canvasElement, step }) => {
    await step('reflects subtle attribute on all variants', async () => {
      for (const variant of BADGE_VARIANTS) {
        const badge = canvasElement.querySelector(
          `swc-badge[variant="${variant}"]`
        ) as Badge | null;
        expect(
          badge,
          `badge with variant="${variant}" is rendered`
        ).toBeTruthy();
        await badge?.updateComplete;
        expect(
          badge?.hasAttribute('subtle'),
          `badge with variant="${variant}" has subtle attribute`
        ).toBe(true);
      }
    });
  },
};

export const FixedTest: Story = {
  ...Fixed,
  play: async ({ canvasElement, step }) => {
    await step('reflects fixed attribute for each valid value', async () => {
      for (const value of FIXED_VALUES) {
        const badge = canvasElement.querySelector(
          `swc-badge[fixed="${value}"]`
        ) as Badge | null;
        expect(badge, `badge with fixed="${value}" is rendered`).toBeTruthy();
        await badge?.updateComplete;
        expect(badge?.fixed, `badge fixed property is "${value}"`).toBe(value);
      }
    });
  },
};

export const NonSemanticVariantsTest: Story = {
  ...NonSemanticVariants,
  play: async ({ canvasElement, step }) => {
    await step('renders all color variant values', async () => {
      for (const variant of BADGE_VARIANTS_COLOR) {
        const badge = canvasElement.querySelector(
          `swc-badge[variant="${variant}"]`
        ) as Badge | null;
        expect(
          badge,
          `badge with variant="${variant}" is rendered`
        ).toBeTruthy();
        await badge?.updateComplete;
        expect(badge?.variant, `badge variant property is "${variant}"`).toBe(
          variant
        );
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const NotFocusableTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('is not in the tab order', async () => {
      expect(badge.tabIndex, 'tabIndex is -1').toBe(-1);
    });

    await step(
      'does not receive focus when focused programmatically',
      async () => {
        badge.focus();
        expect(
          document.activeElement,
          'activeElement is not the badge'
        ).not.toBe(badge);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
  render: () => html`
    <swc-badge>Label</swc-badge>
  `,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('warns when an invalid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        badge.variant = 'not-a-variant' as unknown as Badge['variant'];
        await badge.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid variant'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references variant'
        ).toContain('variant');
      })
    );
  },
};

export const ValidVariantNoWarningTest: Story = {
  render: () => html`
    <swc-badge variant="positive">Approved</swc-badge>
  `,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('does not warn when a valid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        badge.variant = 'negative';
        await badge.updateComplete;

        expect(
          warnCalls.length,
          'no warnings are emitted for valid variant'
        ).toBe(0);
      })
    );
  },
};

export const OutlineNonSemanticWarningTest: Story = {
  render: () => html`
    <swc-badge variant="seafoam" outline>Seafoam</swc-badge>
  `,
  play: async ({ canvasElement, step }) => {
    const badge = await getComponent<Badge>(canvasElement, 'swc-badge');

    await step('warns when outline is used with a non-semantic variant', () =>
      withWarningSpy(async (warnCalls) => {
        badge.requestUpdate();
        await badge.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for outline with non-semantic variant'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references outline'
        ).toContain('outline');
      })
    );
  },
};

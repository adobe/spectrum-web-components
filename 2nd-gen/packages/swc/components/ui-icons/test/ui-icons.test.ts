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

import { UiIcon } from '@adobe/spectrum-wc/ui-icons';

import '@adobe/spectrum-wc/components/ui-icons/swc-ui-icon.js';

import { getComponent } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/ui-icons.internal.stories.js';
import type { UiIconArt } from '../ui-icons.types.js';
import { resolveUiIconArt } from '../ui-icons.types.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'UI icons/Tests',
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
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('renders the requested icon at the default size', async () => {
      expect(icon.icon, 'icon property is "chevron"').toBe('chevron');
      expect(icon.size, 'default size is "m"').toBe('m');
      expect(
        icon.shadowRoot?.querySelector('svg'),
        'renders an svg'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const IconAttributeTest: Story = {
  render: () => html`
    <swc-ui-icon icon="checkmark" accessible-label="Done"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('renders the svg for the selected icon-set', async () => {
      expect(icon.icon, 'icon property is "checkmark"').toBe('checkmark');
      expect(
        icon.shadowRoot?.querySelector('svg'),
        'renders an svg'
      ).toBeTruthy();
    });
  },
};

export const SizeSelectsStepTest: Story = {
  render: () => html`
    <swc-ui-icon
      icon="chevron"
      size="xs"
      accessible-label="Chevron"
    ></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');
    const viewBox = () =>
      icon.shadowRoot?.querySelector('svg')?.getAttribute('viewBox') ?? '';

    let extraSmall = '';

    await step('reflects size and renders the xs optical step', async () => {
      expect(icon.getAttribute('size'), 'size attribute is "xs"').toBe('xs');
      extraSmall = viewBox();
      expect(extraSmall, 'xs renders an svg with a viewBox').toBeTruthy();
    });

    await step('a larger size selects a different optical step', async () => {
      icon.size = 'xl';
      await icon.updateComplete;
      const extraLarge = viewBox();
      expect(icon.getAttribute('size'), 'size attribute is "xl"').toBe('xl');
      expect(extraLarge, 'xl renders an svg with a viewBox').toBeTruthy();
      expect(extraLarge, 'xl optical step differs from the xs step').not.toBe(
        extraSmall
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility (host owns semantics, inherited from IconBase)
// ──────────────────────────────────────────────────────────────

export const LabeledHostAccessibilityTest: Story = {
  render: () => html`
    <swc-ui-icon icon="chevron" accessible-label="Expand"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('exposes the host as a labeled image', async () => {
      expect(icon.getAttribute('role'), 'host has role="img"').toBe('img');
      expect(
        icon.getAttribute('aria-label'),
        'host aria-label matches accessibleLabel'
      ).toBe('Expand');
      expect(
        icon.hasAttribute('aria-hidden'),
        'labeled host is not aria-hidden'
      ).toBe(false);
    });
  },
};

export const DecorativeHostAccessibilityTest: Story = {
  render: () => html`
    <swc-ui-icon icon="chevron"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('hides the host from AT when no label', async () => {
      expect(
        icon.getAttribute('aria-hidden'),
        'host has aria-hidden="true"'
      ).toBe('true');
      expect(icon.hasAttribute('role'), 'host has no role').toBe(false);
      expect(icon.hasAttribute('aria-label'), 'host has no aria-label').toBe(
        false
      );
    });
  },
};

export const LabelTogglingTest: Story = {
  render: () => html`
    <swc-ui-icon icon="chevron" accessible-label="x"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('initial label sets aria-label on the host', async () => {
      expect(icon.getAttribute('aria-label'), 'host aria-label is "x"').toBe(
        'x'
      );
      expect(
        icon.hasAttribute('aria-hidden'),
        'host is not aria-hidden when labeled'
      ).toBe(false);
    });

    await step('clearing the label hides the host', async () => {
      icon.accessibleLabel = '';
      await icon.updateComplete;
      expect(
        icon.getAttribute('aria-hidden'),
        'host has aria-hidden="true" after clearing'
      ).toBe('true');
      expect(
        icon.hasAttribute('aria-label'),
        'host has no aria-label after clearing'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: RTL mirroring
// ──────────────────────────────────────────────────────────────

export const DirectionalIconMirrorsInRtlTest: Story = {
  render: () => html`
    <swc-ui-icon
      icon="chevron"
      dir="rtl"
      accessible-label="Expand"
    ></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('mirrors a curated directional icon under RTL', async () => {
      expect(
        getComputedStyle(icon).scale,
        'chevron is horizontally mirrored in RTL'
      ).toBe('-1 1');
    });
  },
};

// chevron and arrow are two independent :host() selector clauses in
// ui-icon-direction.css, not one dynamically-generated rule, so each is
// tested explicitly; a typo in one clause wouldn't be caught by testing
// only the other.
export const SecondDirectionalIconMirrorsInRtlTest: Story = {
  render: () => html`
    <swc-ui-icon icon="arrow" dir="rtl" accessible-label="Go"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step(
      'mirrors the other curated directional icon under RTL',
      async () => {
        expect(
          getComputedStyle(icon).scale,
          'arrow is horizontally mirrored in RTL'
        ).toBe('-1 1');
      }
    );
  },
};

// Mirrors tabs.test.ts's SelectionIndicatorDirectionChangeTest pattern: real
// consumers (AccordionItem, MessageSources, ResponseStatus) never set `dir`
// directly on their <swc-ui-icon>; they rely on it inheriting from an
// ancestor. Verified separately from the direct-attribute tests above since
// :host(:dir(rtl)[icon="..."])'s selector-matching quirk (see
// ui-icon-direction.css) makes it worth confirming inherited directionality
// resolves the same way, not assuming it from spec compliance alone.
export const DirectionalIconMirrorsWithInheritedRtlTest: Story = {
  render: () => html`
    <div id="direction-wrapper" dir="ltr">
      <swc-ui-icon icon="chevron" accessible-label="Expand"></swc-ui-icon>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');
    const wrapper = canvasElement.querySelector(
      '#direction-wrapper'
    ) as HTMLElement;

    await step('does not mirror while the ancestor is LTR', async () => {
      expect(
        getComputedStyle(icon).scale,
        'chevron is unmirrored while the ancestor is LTR'
      ).toBe('none');
    });

    await step(
      'mirrors once an ancestor dir attribute flips to RTL at runtime',
      async () => {
        wrapper.setAttribute('dir', 'rtl');
        await icon.updateComplete;
        expect(
          getComputedStyle(icon).scale,
          'chevron mirrors once the ancestor is RTL, with no dir attribute of its own'
        ).toBe('-1 1');
      }
    );

    wrapper.setAttribute('dir', 'ltr');
  },
};

export const DirectionalIconUnmirroredInLtrTest: Story = {
  render: () => html`
    <swc-ui-icon
      icon="chevron"
      dir="ltr"
      accessible-label="Expand"
    ></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step('does not mirror under LTR', async () => {
      expect(getComputedStyle(icon).scale, 'chevron is unmirrored in LTR').toBe(
        'none'
      );
    });
  },
};

export const NonDirectionalIconUnaffectedInRtlTest: Story = {
  render: () => html`
    <swc-ui-icon
      icon="checkmark"
      dir="rtl"
      accessible-label="Done"
    ></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step(
      'leaves a non-directional icon unmirrored under RTL',
      async () => {
        expect(
          getComputedStyle(icon).scale,
          'checkmark is not in the curated directional list, so it never flips'
        ).toBe('none');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Edge cases
// ──────────────────────────────────────────────────────────────

export const UnknownIconTest: Story = {
  render: () => html`
    <swc-ui-icon icon="not-an-icon"></swc-ui-icon>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getComponent<UiIcon>(canvasElement, 'swc-ui-icon');

    await step(
      'renders no svg for an unknown icon without throwing',
      async () => {
        expect(
          icon.shadowRoot?.querySelector('svg'),
          'no svg is rendered for an unknown icon'
        ).toBeNull();
      }
    );
  },
};

// The shipped icons cover every optical step, so a partial bundle (only steps
// 50 and 300) is used to exercise the nearest-step fallback directly.
export const NearestStepFallbackTest: Story = {
  render: () => html`
    <swc-ui-icon icon="chevron"></swc-ui-icon>
  `,
  play: async ({ step }) => {
    // A bundle that ships only the smallest (50) and largest (300) steps.
    const small = html`
      <svg id="small"></svg>
    `;
    const large = html`
      <svg id="large"></svg>
    `;
    const partial: UiIconArt = { 50: small, 300: large };

    await step('uses the exact step when the bundle ships it', async () => {
      expect(resolveUiIconArt(partial, 'xs'), 'xs (50) is present').toBe(small);
      expect(resolveUiIconArt(partial, 'xl'), 'xl (300) is present').toBe(
        large
      );
    });

    await step(
      'falls back to the nearest available step when the exact one is missing',
      async () => {
        // m -> 100 is absent; nearest of {50, 300} by numeral distance is 50.
        expect(
          resolveUiIconArt(partial, 'm'),
          'm (100) falls back to the 50 step'
        ).toBe(small);
        // l -> 200 is absent; nearest of {50, 300} is 300.
        expect(
          resolveUiIconArt(partial, 'l'),
          'l (200) falls back to the 300 step'
        ).toBe(large);
        // s -> 75 is absent; nearest of {50, 300} is 50.
        expect(
          resolveUiIconArt(partial, 's'),
          's (75) falls back to the 50 step'
        ).toBe(small);
      }
    );

    await step('returns undefined for an empty or missing bundle', async () => {
      expect(
        resolveUiIconArt({}, 'm'),
        'an empty bundle resolves to undefined'
      ).toBeUndefined();
      expect(
        resolveUiIconArt(undefined, 'm'),
        'a missing bundle resolves to undefined'
      ).toBeUndefined();
    });
  },
};

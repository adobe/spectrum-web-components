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

import type { IconBase } from '@adobe/spectrum-wc-core/components/icon';

// Register every workflow element so the manifest coverage test can resolve each tag.
import '../src/elements.js';

import { WORKFLOW_ICONS } from '../src/manifest.js';
import { Icon_Star } from '../src/Star.js';
import meta from '../stories/workflow-icons.stories.js';

/** Query a rendered element and wait for its update to settle. */
const getIcon = async (root: HTMLElement, tag: string): Promise<IconBase> => {
  const el = root.querySelector(tag) as IconBase & {
    updateComplete: Promise<boolean>;
  };
  await el.updateComplete;
  return el;
};

// Dev-only test stories that reuse the gallery story metadata.
export default {
  ...meta,
  title: 'Workflow icons/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Element renders the baked-in SVG
// ──────────────────────────────────────────────────────────────

export const RendersSvgTest: Story = {
  render: () => html`
    <swc-icon-star accessible-label="Favorite"></swc-icon-star>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getIcon(canvasElement, 'swc-icon-star');

    await step('renders an svg at the default medium size', async () => {
      expect(icon.size, 'default size is "m"').toBe('m');
      expect(
        icon.shadowRoot?.querySelector('svg'),
        'renders an svg in the shadow root'
      ).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: size sets the box
// ──────────────────────────────────────────────────────────────

export const SizeSetsBoxTest: Story = {
  render: () => html`
    <swc-icon-star size="xs" accessible-label="Favorite"></swc-icon-star>
    <swc-icon-star size="xl" accessible-label="Favorite"></swc-icon-star>
  `,
  play: async ({ canvasElement, step }) => {
    const [xs, xl] = canvasElement.querySelectorAll('swc-icon-star');
    await (xs as IconBase & { updateComplete: Promise<boolean> })
      .updateComplete;
    await (xl as IconBase & { updateComplete: Promise<boolean> })
      .updateComplete;

    await step('a larger size renders a larger box', async () => {
      const xsWidth = xs.getBoundingClientRect().width;
      const xlWidth = xl.getBoundingClientRect().width;
      expect(xsWidth, 'xs renders a non-zero box').toBeGreaterThan(0);
      expect(xlWidth, 'xl box is larger than the xs box').toBeGreaterThan(
        xsWidth
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: the SVG-string function substrate
// ──────────────────────────────────────────────────────────────

export const StringFunctionTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    const svg = Icon_Star();

    await step('returns framework-agnostic svg markup', async () => {
      expect(typeof svg, 'returns a string').toBe('string');
      expect(svg.startsWith('<svg'), 'starts with an <svg> tag').toBe(true);
      expect(svg.includes('viewBox'), 'keeps the viewBox').toBe(true);
      expect(
        svg.includes('var(--swc-icon-color, currentColor)'),
        'fills with the swc icon color token'
      ).toBe(true);
      expect(/\s(width|height)=/.test(svg), 'drops width/height').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility (host owns semantics, inherited from IconBase)
// ──────────────────────────────────────────────────────────────

export const LabeledHostAccessibilityTest: Story = {
  render: () => html`
    <swc-icon-alert-triangle
      accessible-label="Warning"
    ></swc-icon-alert-triangle>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getIcon(canvasElement, 'swc-icon-alert-triangle');

    await step('exposes the host as a labeled image', async () => {
      expect(icon.getAttribute('role'), 'host has role="img"').toBe('img');
      expect(
        icon.getAttribute('aria-label'),
        'host aria-label matches accessibleLabel'
      ).toBe('Warning');
      expect(
        icon.hasAttribute('aria-hidden'),
        'labeled host is not aria-hidden'
      ).toBe(false);
    });
  },
};

export const DecorativeHostAccessibilityTest: Story = {
  render: () => html`
    <swc-icon-alert-triangle></swc-icon-alert-triangle>
  `,
  play: async ({ canvasElement, step }) => {
    const icon = await getIcon(canvasElement, 'swc-icon-alert-triangle');

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

// ──────────────────────────────────────────────────────────────
// TEST: the manifest matches the registered elements
// ──────────────────────────────────────────────────────────────

export const ManifestCoverageTest: Story = {
  render: () => html`
    <span></span>
  `,
  play: async ({ step }) => {
    await step('every manifest tag is a registered custom element', () => {
      expect(WORKFLOW_ICONS.length, 'ships the full set').toBeGreaterThan(400);
      const missing = WORKFLOW_ICONS.filter(
        ({ tag }) => customElements.get(tag) === undefined
      );
      expect(missing, 'no manifest tag is unregistered').toStrictEqual([]);
    });

    await step('tags are unique', () => {
      const tags = WORKFLOW_ICONS.map((i) => i.tag);
      expect(new Set(tags).size, 'all tags are distinct').toBe(tags.length);
    });
  },
};

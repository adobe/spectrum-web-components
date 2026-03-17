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

import { Link } from '@adobe/spectrum-wc/link';

import '@adobe/spectrum-wc/link';

import { getComponent, getComponents } from '../../../utils/test-utils.js';
import meta from '../stories/link.stories.js';
import {
  Default,
  Disabled,
  Download,
  Overview,
  Quiet,
  Secondary,
  SecondaryQuiet,
  StaticColors,
} from '../stories/link.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Link/Tests',
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
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('renders anchor with href and slot content', async () => {
      expect(link.href).toBeTruthy();
      expect(link.textContent?.trim()).toBeTruthy();
      const anchor = link.shadowRoot?.querySelector('#anchor');
      expect(anchor?.tagName).toBe('A');
      expect(anchor?.getAttribute('href')).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const DefaultTest: Story = {
  ...Default,
  play: async ({ canvasElement, step }) => {
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('renders with default (primary) styling', async () => {
      expect(link.getAttribute('href')).toBeTruthy();
      expect(link.hasAttribute('quiet')).toBe(false);
      expect(link.variant).toBeFalsy();
    });
  },
};

export const QuietTest: Story = {
  ...Quiet,
  play: async ({ canvasElement, step }) => {
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('reflects quiet attribute', async () => {
      expect(link.quiet).toBe(true);
      expect(link.hasAttribute('quiet')).toBe(true);
    });
  },
};

export const SecondaryTest: Story = {
  ...Secondary,
  play: async ({ canvasElement, step }) => {
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('reflects variant attribute', async () => {
      expect(link.variant).toBe('secondary');
      expect(link.getAttribute('variant')).toBe('secondary');
    });
  },
};

export const SecondaryQuietTest: Story = {
  ...SecondaryQuiet,
  play: async ({ canvasElement, step }) => {
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('reflects variant and quiet attributes', async () => {
      expect(link.variant).toBe('secondary');
      expect(link.quiet).toBe(true);
    });
  },
};

export const StaticColorsTest: Story = {
  ...StaticColors,
  play: async ({ canvasElement, step }) => {
    const links = await getComponents<Link>(
      canvasElement,
      'swc-link[static-color]'
    );

    await step('reflects static-color attribute values', async () => {
      const staticColors = links.map((l) => l.getAttribute('static-color'));
      expect(staticColors).toContain('white');
      expect(staticColors).toContain('black');
    });
  },
};

export const DisabledTest: Story = {
  ...Disabled,
  play: async ({ canvasElement, step }) => {
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('reflects disabled state and aria-disabled', async () => {
      expect(link.disabled).toBe(true);
      expect(link.hasAttribute('aria-disabled')).toBe(true);
      const anchor = link.shadowRoot?.querySelector('#anchor');
      expect(anchor?.getAttribute('aria-disabled')).toBe('true');
    });
  },
};

export const DownloadTest: Story = {
  ...Download,
  play: async ({ canvasElement, step }) => {
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('reflects download attribute on anchor', async () => {
      expect(link.download).toBe('example.txt');
      const anchor = link.shadowRoot?.querySelector('#anchor');
      expect(anchor?.getAttribute('download')).toBe('example.txt');
    });
  },
};

export const PropertyMutationTest: Story = {
  render: () => html`
    <p>
      This is a <swc-link href="#">link</swc-link> in a sentence.
    </p>
  `,
  play: async ({ canvasElement, step }) => {
    const link = await getComponent<Link>(canvasElement, 'swc-link');

    await step('variant reflects to attribute after mutation', async () => {
      link.variant = 'secondary';
      await link.updateComplete;
      expect(link.getAttribute('variant')).toBe('secondary');
    });

    await step('quiet reflects to attribute after mutation', async () => {
      link.quiet = true;
      await link.updateComplete;
      expect(link.hasAttribute('quiet')).toBe(true);
    });

    await step('disabled reflects to attribute after mutation', async () => {
      link.disabled = true;
      await link.updateComplete;
      expect(link.hasAttribute('aria-disabled')).toBe(true);
    });
  },
};

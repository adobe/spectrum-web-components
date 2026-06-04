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

import meta, {
  ColorVariants,
  InProse,
  LinkList,
  QuietStandalone,
  Secondary,
  Standalone,
} from '../stories/link.stories.js';
import { LINK_LIST_ITEMS } from '../stories/link.template.js';
import { template } from '../stories/link.template.js';

export default {
  ...meta,
  title: 'Link/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

function getAnchor(
  canvasElement: HTMLElement,
  selector = 'a[href]'
): HTMLAnchorElement {
  const anchor = canvasElement.querySelector(selector);
  expect(anchor, `expected anchor matching "${selector}"`).toBeTruthy();
  return anchor as HTMLAnchorElement;
}

function getAnchors(canvasElement: HTMLElement): HTMLAnchorElement[] {
  return Array.from(canvasElement.querySelectorAll('a[href]'));
}

// ──────────────────────────────────────────────────────────────
// TEST: Explicit modifiers
// ──────────────────────────────────────────────────────────────

export const StandaloneTest: Story = {
  ...Standalone,
  play: async ({ canvasElement, step }) => {
    const anchor = getAnchor(canvasElement);

    await step(
      'renders standalone explicit link with expected classes',
      async () => {
        expect(anchor.classList.contains('swc-Link'), 'has base class').toBe(
          true
        );
        expect(
          anchor.classList.contains('swc-Link--standalone'),
          'has standalone modifier'
        ).toBe(true);
        expect(anchor.getAttribute('href'), 'has href').toBe('#');
        expect(anchor.textContent?.trim(), 'accessible name from text').toBe(
          'Account settings'
        );
      }
    );
  },
};

export const SecondaryTest: Story = {
  ...Secondary,
  play: async ({ canvasElement, step }) => {
    const anchor = getAnchor(canvasElement);

    await step('renders secondary modifier classes', async () => {
      expect(anchor.classList.contains('swc-Link'), 'has base class').toBe(
        true
      );
      expect(
        anchor.classList.contains('swc-Link--secondary'),
        'has secondary modifier'
      ).toBe(true);
    });
  },
};

export const QuietStandaloneTest: Story = {
  ...QuietStandalone,
  play: async ({ canvasElement, step }) => {
    const anchor = getAnchor(canvasElement);

    await step('renders quiet and standalone modifier classes', async () => {
      expect(
        anchor.classList.contains('swc-Link--quiet'),
        'has quiet modifier'
      ).toBe(true);
      expect(
        anchor.classList.contains('swc-Link--standalone'),
        'has standalone modifier'
      ).toBe(true);
    });
  },
};

export const QuietImpliesStandaloneTest: Story = {
  render: () =>
    template({
      context: 'explicit',
      quiet: true,
      standalone: false,
      sampleText: 'Footer link',
    }),
  play: async ({ canvasElement, step }) => {
    const anchor = getAnchor(canvasElement);

    await step('applies standalone when quiet is enabled', async () => {
      expect(
        anchor.classList.contains('swc-Link--standalone'),
        'quiet implies standalone'
      ).toBe(true);
      expect(
        anchor.classList.contains('swc-Link--quiet'),
        'has quiet modifier'
      ).toBe(true);
    });
  },
};

export const ColorVariantsTest: Story = {
  ...ColorVariants,
  play: async ({ canvasElement, step }) => {
    const anchors = getAnchors(canvasElement);

    await step('renders default and secondary color variants', async () => {
      expect(anchors.length, 'renders two anchors').toBe(2);
      expect(
        anchors[0]?.classList.contains('swc-Link--secondary'),
        'default variant is not secondary'
      ).toBe(false);
      expect(
        anchors[1]?.classList.contains('swc-Link--secondary'),
        'secondary variant has modifier'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Typography contexts
// ──────────────────────────────────────────────────────────────

export const InProseTest: Story = {
  ...InProse,
  play: async ({ canvasElement, step }) => {
    const prose = canvasElement.querySelector('.swc-Typography--prose');
    const anchor = getAnchor(prose as HTMLElement);

    await step('prose link omits BEM classes', async () => {
      expect(prose, 'renders prose wrapper').toBeTruthy();
      expect(anchor.className.trim(), 'anchor has no modifier classes').toBe(
        ''
      );
      expect(anchor.textContent?.trim(), 'link text is present').toBe(
        'inline link'
      );
    });
  },
};

export const LinkListTest: Story = {
  ...LinkList,
  play: async ({ canvasElement, step }) => {
    const list = canvasElement.querySelector('.swc-Typography--links');
    const anchors = getAnchors(canvasElement);

    await step(
      'link list renders unclassed anchors in typography wrapper',
      async () => {
        expect(list, 'renders links wrapper').toBeTruthy();
        expect(anchors.length, 'renders three list links').toBe(
          LINK_LIST_ITEMS.length
        );
        for (const anchor of anchors) {
          expect(anchor.className.trim(), 'list anchors omit BEM classes').toBe(
            ''
          );
          expect(
            anchor.getAttribute('href'),
            'each anchor has href'
          ).toBeTruthy();
        }
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility / keyboard
// ──────────────────────────────────────────────────────────────

export const KeyboardFocusTest: Story = {
  ...Standalone,
  play: async ({ canvasElement, step }) => {
    const anchor = getAnchor(canvasElement);

    await step('link accepts programmatic focus', async () => {
      anchor.focus();
      expect(document.activeElement, 'anchor receives focus').toBe(anchor);
      expect(anchor.tabIndex, 'native link is in tab order').toBe(0);
    });
  },
};

export const OmitEmptyClassTest: Story = {
  render: () => html`
    ${template({ context: 'prose', variant: 'default' })}
  `,
  play: async ({ canvasElement, step }) => {
    const anchor = getAnchor(canvasElement);

    await step('omits class attribute when no classes apply', async () => {
      expect(anchor.hasAttribute('class'), 'class attribute is omitted').toBe(
        false
      );
    });
  },
};

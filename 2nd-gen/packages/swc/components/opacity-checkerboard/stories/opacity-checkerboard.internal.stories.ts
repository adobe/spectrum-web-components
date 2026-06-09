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
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import opacityCheckerboardStyles from '../../../stylesheets/shared/opacity-checkerboard.css';

// ────────────────
//    METADATA
// ────────────────

interface OpacityCheckerboardProps {
  size: 'medium' | 'small';
  overlay: string;
}

const SIZES = ['medium', 'small'] as const;

export default {
  title: 'Opacity Checkerboard',
  parameters: {
    docs: {
      subtitle: `Decorative checkerboard background utility used to indicate transparency.`,
      canvas: { sourceState: 'hidden' },
    },
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    overlay: { control: 'color' },
  },
  render: (args) => swatch(args),
  // Internal-only: the `.internal` filename excludes this from production
  // Storybook. `utility` marks it as a classless CSS utility, not an element.
  tags: ['utility'],
} satisfies Meta<OpacityCheckerboardProps>;

// ────────────────────
//    HELPERS
// ────────────────────

/**
 * The fragment is a lit `css` result, not a global stylesheet, so its rules
 * only apply where it is adopted into a root. For visual validation in the
 * light DOM, inject its `cssText` via an inline `<style>` once per render.
 */
const styles = html`
  <style>
    ${opacityCheckerboardStyles.cssText}
  </style>
`;

const box = (modifier = '', overlay = 'transparent', label = '') => html`
  <figure
    style="margin: 0; display: inline-flex; flex-direction: column; gap: 4px; align-items: center;"
  >
    <div
      class="swc-opacity-checkerboard ${modifier}"
      style="inline-size: 120px; block-size: 120px; border-radius: 4px; border: 1px solid var(--swc-gray-300, #ccc);"
    >
      <div
        style="inline-size: 100%; block-size: 100%; background: ${overlay}; border-radius: inherit;"
        aria-hidden="true"
      ></div>
    </div>
    ${label
      ? html`
          <figcaption style="font: 12px/1.4 sans-serif;">${label}</figcaption>
        `
      : ''}
  </figure>
`;

const swatch = (args: OpacityCheckerboardProps) => html`
  ${styles}
  ${box(
    args.size === 'small' ? 'swc-opacity-checkerboard--size-small' : '',
    args.overlay ?? 'transparent'
  )}
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: { size: 'medium', overlay: 'transparent' },
  parameters: { docs: { canvas: { sourceState: 'shown' } } },
  tags: ['dev'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: () => html`
    ${styles} ${box('', 'transparent', 'medium (default)')}
    ${box(
      'swc-opacity-checkerboard--size-small',
      'transparent',
      '--size-small'
    )}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['options'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const TransparentContent: Story = {
  render: () => html`
    ${styles} ${box('', 'rgba(255, 0, 0, 0.4)', '40% red')}
    ${box('', 'rgba(0, 128, 255, 0.25)', '25% blue')}
    ${box('', 'rgba(0, 0, 0, 0.6)', '60% black')}
    ${box('', 'rgb(0, 200, 120)', 'opaque (no checker shows)')}
  `,
  parameters: { flexLayout: 'row-wrap' },
  tags: ['behaviors'],
};

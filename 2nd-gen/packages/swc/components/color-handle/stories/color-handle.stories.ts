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
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/components/color-handle/swc-color-handle.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-color-handle');

/**
 * An `<swc-color-handle>` is a non-interactive primitive: a draggable dot
 * rendered on top of a color area, slider, or wheel that marks the currently
 * picked color and pops a built-in [Color Loupe](../?path=/docs/color-loupe--docs)
 * on touch. Accessibility — label, value, and keyboard — is owned by the parent
 * color picker, not the handle.
 */
const meta: Meta = {
  title: 'Color Handle',
  component: 'swc-color-handle',
  args,
  argTypes,
  parameters: {
    actions: { handles: events },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13065-162',
    },
    docs: {
      subtitle: `Draggable dot marking the picked color on a color area, slider, or wheel`,
    },
    // The handle is `position: absolute` and centers itself on its coordinate
    // via negative margins, so each instance needs its own relative anchor.
    styles: {
      position: 'relative',
      'min-block-size': '48px',
    },
  },
  render: (args) => template(args),
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const COLOR_FORMATS = [
  { label: 'Named', color: 'tomato' },
  { label: 'Hex', color: '#1473e6' },
  { label: 'RGBA', color: 'rgba(44, 62, 224, 0.81)' },
  { label: 'HSL', color: 'hsl(111, 82%, 56%)' },
] as const satisfies readonly { label: string; color: string }[];

/**
 * The handle centers itself on its coordinate with negative margins, so
 * comparison stories give each instance its own `position: relative` anchor
 * plus an optional caption.
 */
const anchoredHandle = (
  label: string,
  templateArgs: Record<string, unknown>
) => html`
  <div
    style="display: flex; flex-direction: column; align-items: center; gap: 16px;"
  >
    <div style="position: relative; inline-size: 24px; block-size: 24px;">
      ${template(templateArgs)}
    </div>
    <span style="font-size: 12px;">${label}</span>
  </div>
`;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: {
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    ${anchoredHandle('Fill', { ...args, color: 'rgb(20, 115, 230)' })}
    ${anchoredHandle('Transparent fill', {
      ...args,
      color: 'rgba(20, 115, 230, 0.4)',
    })}
    ${anchoredHandle('Loupe open', {
      ...args,
      color: 'rgb(20, 115, 230)',
      open: true,
    })}
  `,
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Colors: Story = {
  render: (args) => html`
    ${COLOR_FORMATS.map(({ label, color }) =>
      anchoredHandle(label, { ...args, color })
    )}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Fill: Story = {
  render: (args) => html`
    ${anchoredHandle('Fill shown', {
      ...args,
      color: 'rgb(20, 115, 230)',
      fill: true,
    })}
    ${anchoredHandle('Outline only', {
      ...args,
      color: 'rgb(20, 115, 230)',
      fill: false,
    })}
  `,
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: (args) => html`
    ${anchoredHandle('Default', { ...args, color: 'rgb(20, 115, 230)' })}
    ${anchoredHandle('Focused', {
      ...args,
      color: 'rgb(20, 115, 230)',
      focused: true,
    })}
    ${anchoredHandle('Disabled', {
      ...args,
      color: 'rgb(20, 115, 230)',
      disabled: true,
    })}
  `,
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const AdaptiveContrast: Story = {
  render: (args) => html`
    ${anchoredHandle('White', { ...args, color: 'rgb(255, 255, 255)' })}
    ${anchoredHandle('Yellow', { ...args, color: 'rgb(255, 235, 0)' })}
    ${anchoredHandle('Mid gray', { ...args, color: 'rgb(120, 120, 120)' })}
    ${anchoredHandle('Black', { ...args, color: 'rgb(0, 0, 0)' })}
  `,
  tags: ['behaviors'],
  parameters: { flexLayout: 'row-wrap' },
};
AdaptiveContrast.storyName = 'Adaptive contrast';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  args: {
    color: 'rgba(0, 128, 255, 0.7)',
  },
  tags: ['a11y'],
};

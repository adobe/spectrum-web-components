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

import {
  BUTTON_GROUP_ALIGNMENTS,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_SIZES,
} from '@adobe/spectrum-wc-core/components/button-group';

import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes } = getStorybookHelpers('swc-button-group');

argTypes.size = {
  ...argTypes.size,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'm' },
  },
};

argTypes.disabled = {
  ...argTypes.disabled,
  table: {
    category: 'attributes',
    defaultValue: { summary: 'false' },
  },
};

/**
 * A button group clusters related actions together, providing consistent spacing,
 * sizing, and orientation. It propagates `size` and `disabled` state to its slotted
 * [Button](../?path=/docs/components-button--docs) children and exposes `role="group"` for
 * accessibility.
 *
 * Use button group when you have two or more related button actions that belong
 * together visually and semantically (for example dialog or form footers, toolbars,
 * or contextual action sets). For composite keyboard navigation where the strip is
 * a single tab stop and arrow keys move between children, see
 * [Action group](../?path=/docs/components-action-group--docs).
 */
const meta: Meta = {
  title: 'Button group',
  component: 'swc-button-group',
  args,
  argTypes,
  render: (renderArgs) => html`
    <swc-button-group
      orientation=${renderArgs.orientation ?? 'horizontal'}
      size=${renderArgs.size ?? 'm'}
      align=${renderArgs.align ?? 'start'}
      ?disabled=${renderArgs.disabled}
    >
      <swc-button>Save</swc-button>
      <swc-button>Cancel</swc-button>
      <swc-button>Reset</swc-button>
    </swc-button-group>
  `,
  parameters: {
    docs: {
      subtitle:
        'Clusters related button actions with consistent spacing and sizing',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-d8gbozzx?file=package.json',
    },
    flexLayout: 'row-wrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<(typeof BUTTON_GROUP_SIZES)[number], string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    size: 'm',
    orientation: 'horizontal',
    disabled: false,
    align: 'start',
  },
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: {
    size: 'm',
    orientation: 'horizontal',
    disabled: false,
    align: 'start',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Primary action</swc-button>
      <swc-button>Secondary action</swc-button>
      <swc-button>Tertiary action</swc-button>
    </swc-button-group>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: () => html`
    ${BUTTON_GROUP_SIZES.map(
      (size) => html`
        <swc-button-group size=${size}>
          <swc-button>${sizeLabels[size]} Save</swc-button>
          <swc-button>${sizeLabels[size]} Cancel</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['options'],
};

export const Orientations: Story = {
  render: () => html`
    ${BUTTON_GROUP_ORIENTATIONS.map(
      (orientation) => html`
        <swc-button-group orientation=${orientation}>
          <swc-button>${orientation} 1</swc-button>
          <swc-button>${orientation} 2</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['options'],
};

export const Alignment: Story = {
  render: () => html`
    ${BUTTON_GROUP_ALIGNMENTS.map(
      (align) => html`
        <swc-button-group align=${align} style="inline-size: 400px;">
          <swc-button>${align}</swc-button>
          <swc-button>Action</swc-button>
        </swc-button-group>
      `
    )}
  `,
  tags: ['options'],
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Disabled: Story = {
  render: () => html`
    <swc-button-group disabled>
      <swc-button>Save</swc-button>
      <swc-button>Cancel</swc-button>
      <swc-button>Reset</swc-button>
    </swc-button-group>
  `,
  tags: ['states'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <swc-button-group aria-label="Document actions">
      <swc-button>Save</swc-button>
      <swc-button>Discard</swc-button>
      <swc-button>Export</swc-button>
    </swc-button-group>
  `,
  tags: ['a11y'],
};

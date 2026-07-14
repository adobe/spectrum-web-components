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
import { styleMap } from 'lit/directives/style-map.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Divider } from '@adobe/spectrum-wc/divider';

import '@adobe/spectrum-wc/components/divider/swc-divider.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } = getStorybookHelpers('swc-divider');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: Divider.VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: {
      summary: 'm',
    },
  },
};

argTypes['static-color'] = {
  ...argTypes['static-color'],
  control: { type: 'select' },
  options: [undefined, ...Divider.STATIC_COLORS],
};

argTypes.vertical = {
  ...argTypes.vertical,
  table: {
    ...argTypes.vertical?.table,
    defaultValue: { summary: 'false' },
  },
};

/**
 * A divider is a visual separator that brings clarity to a layout by grouping and dividing
 * content in close proximity. Dividers help establish rhythm and hierarchy, making it easier
 * for users to scan and understand content structure.
 */
const meta: Meta = {
  title: 'Divider',
  component: 'swc-divider',
  args,
  argTypes,
  render: (args) => html`
    ${template({ ...args })}
  `,
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Visual separator for grouping and dividing content`,
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-dbcd31ow?file=src%2Fmy-element.ts',
    },
    flexLayout: 'row-nowrap',
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    size: 'm',
    vertical: false,
  },
  render: (args) =>
    args.vertical
      ? html`
          <div style="block-size: 200px;">${template({ ...args })}</div>
        `
      : html`
          <div style="inline-size: 200px;">${template({ ...args })}</div>
        `,
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: (args) => html`
    <h3>Account settings</h3>
    <p>Update your personal details, password, and preferences.</p>
    ${template({ ...args, size: 'm' })}
    <h3>Team members</h3>
    <p>Manage your team roles and access permissions.</p>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: (args) => html`
    <h4>Account settings</h4>
    <p>Update your personal details, password, and preferences.</p>
    ${template({ ...args, size: 'm' })}
    <h4>Team members</h4>
    <p>Manage your team roles and access permissions.</p>
  `,
  tags: ['anatomy'],
  parameters: {
    flexLayout: 'column-stretch',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    <div>
      <h3>Team members</h3>
      <p>Manage your team roles and access permissions.</p>
      ${template({ ...args, size: 's' })}
      <h3>Account settings</h3>
      <p>Update your personal details, password, and preferences.</p>
    </div>
    <div>
      <h3>Account settings</h3>
      <p>Update your personal details, password, and preferences.</p>
      ${template({ ...args, size: 'm' })}
      <h3>Team members</h3>
      <p>Manage your team roles and access permissions.</p>
    </div>
    <div>
      <h3>Projects</h3>
      <p>Track progress across your projects.</p>
      ${template({ ...args, size: 'l' })}
      <h3>Dashboard</h3>
      <p>Monitor activity and analytics.</p>
    </div>
  `,
  tags: ['options'],
};

export const Vertical: Story = {
  render: (args) => html`
    <div
      style="display: flex; align-items: center; gap: 8px; block-size: 16px;"
    >
      <span>Cut</span>
      ${template({ ...args, size: 's' })}
      <span>Copy</span>
      ${template({ ...args, size: 's' })}
      <span>Paste</span>
    </div>
    <div
      style="display: flex; align-items: center; gap: 8px; block-size: 24px;"
    >
      <span>Overview</span>
      ${template({ ...args, size: 'm' })}
      <span>Files</span>
      ${template({ ...args, size: 'm' })}
      <span>Settings</span>
    </div>
    <div
      style="display: flex; align-items: center; gap: 8px; block-size: 32px;"
    >
      <span>Projects</span>
      ${template({ ...args, size: 'l' })}
      <span>Teams</span>
      ${template({ ...args, size: 'l' })}
      <span>Reports</span>
    </div>
  `,
  parameters: {
    flexLayout: 'column-center',
  },
  tags: ['options'],
  args: {
    vertical: true,
  },
};

/** Same prose for each horizontal thickness so snapshots emphasize divider weight only. */
const STATIC_COLORS_HORIZONTAL_COPY = {
  headingBefore: 'Dashboard settings',
  bodyBefore: 'Configure your dashboard preferences and layout options.',
  headingAfter: 'Display options',
  bodyAfter: 'Adjust your layout and theme settings.',
} as const;

const STATIC_COLORS_HORIZONTAL_SIZES = Divider.VALID_SIZES;

/** Vertical rows: explicit `block-size` matches {@link Vertical}. */
const STATIC_COLORS_VERTICAL_SAMPLES = [
  { size: 's' as const, blockSize: 16 },
  { size: 'm' as const, blockSize: 24 },
  { size: 'l' as const, blockSize: 32 },
];

export const StaticColors: Story = {
  render: (args) => html`
    ${['white', 'black'].map(
      (color) => html`
        <div
          style=${styleMap({
            '--swc-detail-font-color': color === 'white' ? 'white' : 'black',
          })}
        >
          ${STATIC_COLORS_HORIZONTAL_SIZES.map(
            (size) => html`
              <div
                class="swc-Typography--emphasized swc-Detail swc-Detail--sizeS swc-Detail--margins"
              >
                Horizontal · size ${size}
              </div>
              <h4>${STATIC_COLORS_HORIZONTAL_COPY.headingBefore}</h4>
              <p>${STATIC_COLORS_HORIZONTAL_COPY.bodyBefore}</p>
              ${template({ ...args, 'static-color': color, size })}
              <h4>${STATIC_COLORS_HORIZONTAL_COPY.headingAfter}</h4>
              <p>${STATIC_COLORS_HORIZONTAL_COPY.bodyAfter}</p>
            `
          )}
          ${STATIC_COLORS_VERTICAL_SAMPLES.map(
            (row) => html`
              <div
                class="swc-Typography--emphasized swc-Detail swc-Detail--sizeS swc-Detail--margins"
              >
                Vertical · size ${row.size}
              </div>
              <div
                style="display: flex; align-items: center; gap: 8px; block-size: ${row.blockSize}px;"
              >
                ${(['Cut', 'Copy', 'Paste'] as const).map(
                  (label, index) => html`
                    ${index === 0
                      ? ''
                      : template({
                          ...args,
                          'static-color': color,
                          size: row.size,
                          vertical: true,
                        })}
                    <span>${label}</span>
                  `
                )}
              </div>
            `
          )}
        </div>
      `
    )}
  `,
  parameters: {
    staticColorsDemo: true,
    styles: {
      'align-items': 'flex-start',
    },
  },
  tags: ['options'],
};
StaticColors.storyName = 'Static colors';

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const LayoutOrientation: Story = {
  render: (args) => html`
    <nav
      style="display: flex; align-items: center; gap: 8px; block-size: 24px;"
    >
      <span>Overview</span>
      ${template({ ...args, size: 's', vertical: true })}
      <span>Files</span>
      ${template({ ...args, size: 's', vertical: true })}
      <span>Settings</span>
    </nav>
    <div style="margin-block-start: 16px;">
      <h4 style="margin: 0 0 8px 0;">Project details</h4>
      <p style="margin: 0 0 8px 0;">
        Review the project timeline and deliverables.
      </p>
      ${template({ ...args, size: 'l' })}
      <h4 style="margin: 8px 0 8px 0;">Team members</h4>
      <p style="margin: 0;">Manage your team roles and access permissions.</p>
    </div>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['behaviors'],
};
LayoutOrientation.storyName = 'Layout orientation';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    <h4>Project overview</h4>
    <p>
      Review the project timeline, milestones, and deliverables for the current
      sprint.
    </p>
    ${template({ ...args, size: 'l' })}
    <h4>Team members</h4>
    <p>Manage your team roles and access permissions.</p>
  `,
  parameters: {
    flexLayout: 'column-stretch',
  },
  tags: ['a11y'],
};

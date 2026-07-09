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

import { ProgressCircle } from '@adobe/spectrum-wc/progress-circle';
import {
  PROGRESS_CIRCLE_STATIC_COLORS,
  PROGRESS_CIRCLE_VALID_SIZES,
  type ProgressCircleSize,
} from '@adobe/spectrum-wc-core/components/progress-circle';

import '@adobe/spectrum-wc/components/progress-circle/swc-progress-circle.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-progress-circle');

argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ProgressCircle.VALID_SIZES,
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
  options: [undefined, ...ProgressCircle.STATIC_COLORS],
};

/**
 * They can represent determinate or indeterminate progress.
 */
const meta: Meta = {
  title: 'Progress circle',
  component: 'swc-progress-circle',
  parameters: {
    docs: {
      subtitle: `Progress circles show the progression of a system operation such as downloading, uploading, processing, etc. in a visual way.`,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13061-181&p=f&t=l8WhfseyuepkVXrl-0',
    },
    stackblitz: {
      url: 'https://stackblitz.com/edit/vitejs-vite-xmvjuhyk?file=src%2Fmy-element.ts',
    },
    flexLayout: 'row-wrap',
  },
  args,
  argTypes,
  render: (args) => template(args),
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const sizeLabels = {
  s: 'Processing small item',
  m: 'Processing medium item',
  l: 'Processing large item',
} as const satisfies Record<ProgressCircleSize, string>;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    size: 'm',
    label: 'Processing request',
  },
};

// ──────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    label: 'Processing request',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-progress-circle
      progress="0"
      label="Starting upload"
    ></swc-progress-circle>
    <swc-progress-circle
      progress="50"
      label="Uploading document"
    ></swc-progress-circle>
    <swc-progress-circle
      progress="100"
      label="Upload complete"
    ></swc-progress-circle>
  `,
  tags: ['anatomy'],
  args: {
    size: 'l',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Sizes: Story = {
  render: (args) => html`
    ${PROGRESS_CIRCLE_VALID_SIZES.map(
      (size) => html`
        ${template({
          ...args,
          size,
          label: sizeLabels[size],
        })}
      `
    )}
  `,
  tags: ['options'],
};

export const StaticColors: Story = {
  render: (args) => html`
    ${PROGRESS_CIRCLE_STATIC_COLORS.map(
      (color) => html`
        <div>
          ${PROGRESS_CIRCLE_VALID_SIZES.map((size) =>
            template({
              ...args,
              size,
              'static-color': color,
            })
          )}
        </div>
      `
    )}
  `,
  args: {
    label: 'Processing media',
  },
  tags: ['options'],
  parameters: {
    staticColorsDemo: true,
    styles: {
      'align-items': 'flex-start',
    },
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const ProgressValues: Story = {
  render: (args) => html`
    ${template({ ...args, progress: 0, label: 'Starting download' })}
    ${template({ ...args, progress: 25, label: 'Downloading (25%)' })}
    ${template({ ...args, progress: 50, label: 'Downloading (50%)' })}
    ${template({ ...args, progress: 75, label: 'Downloading (75%)' })}
    ${template({ ...args, progress: 100, label: 'Download complete' })}
  `,
  tags: ['states'],
  args: {
    size: 'm',
  },
};
ProgressValues.storyName = 'Progress values';

export const Indeterminate: Story = {
  tags: ['states'],
  args: {
    label: 'Processing request',
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
  args: {
    size: 'l',
    label: 'Syncing files',
  },
};

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
import { ifDefined } from 'lit/directives/if-defined.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import { Chevron100Icon } from '@adobe/spectrum-wc/icon/elements';
import * as iconElements from '@adobe/spectrum-wc/icon/elements';

import '@adobe/spectrum-wc/icon';

import {
  ICON_VALID_SIZES,
  type IconSize,
} from '../../../../core/components/icon/Icon.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-icon');

// Override size argType to provide proper select control
argTypes.size = {
  ...argTypes.size,
  control: { type: 'select' },
  options: ICON_VALID_SIZES,
  table: {
    category: 'attributes',
    defaultValue: {
      summary: 'm',
    },
  },
};

/**
 * **Internal-only component.**
 *
 * The `<swc-icon>` element renders icons from shared inline SVG templates.
 * Use shared templates from `@adobe/swc/icon/elements` for consistent rendering and avoid duplicating SVG markup in each component.
 */
const meta: Meta = {
  title: 'Icon',
  component: 'swc-icon',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: `Internal icon renderer for shared SVG templates.`,
    },
  },
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const iconSvg = Chevron100Icon();

const sizeLabels = {
  xs: 'Extra-small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'Extra-large',
} as const satisfies Record<IconSize, string>;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  render: (args) => html`
    <swc-icon label=${ifDefined(args.label)} size=${ifDefined(args.size)}>
      ${iconSvg}
    </swc-icon>
  `,
  args: {
    label: 'Search',
    size: 'm',
  },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  tags: ['overview'],
  render: (args) => html`
    <swc-icon label=${ifDefined(args.label)} size=${ifDefined(args.size)}>
      ${iconSvg}
    </swc-icon>
  `,
  args: {
    label: 'Search',
    size: 'm',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * An icon consists of:
 *
 * 1. **Rendered graphic** - A shared slotted SVG template
 *
 * ### Content
 *
 * - Default slot: Provide SVG markup to render.
 */
export const Anatomy: Story = {
  render: (args) => html`
    <swc-icon label="Chevron icon" size=${ifDefined(args.size)}>
      ${iconSvg}
    </swc-icon>
  `,
  tags: ['anatomy'],
  parameters: {
    flexLayout: true,
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * Icons come in five sizes to fit different layout contexts:
 *
 * - **Extra-small (`xs`)**: Dense UIs and compact metadata rows
 * - **Small (`s`)**: Supporting iconography in constrained spaces
 * - **Medium (`m`)**: Default size for general component usage
 * - **Large (`l`)**: Prominent icon usage in larger controls
 * - **Extra-large (`xl`)**: High-emphasis icon presentation
 *
 * All sizes are shown below for comparison.
 */
export const Sizes: Story = {
  render: (_args) => html`
    ${ICON_VALID_SIZES.map(
      (size) => html`
        <swc-icon label=${sizeLabels[size]} size=${size}>${iconSvg}</swc-icon>
      `
    )}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: true,
    'section-order': 1,
  },
};

/**
 * ### Shared templates
 *
 * Import reusable templates from `@adobe/spectrum-wc/icon/elements` and slot them into `<swc-icon>`.
 * This keeps icon usage centralized and avoids per-component SVG duplication.
 */
export const Sources: Story = {
  render: (args) => html`
    <swc-icon label="Chevron icon" size=${ifDefined(args.size)}>
      ${iconSvg}
    </swc-icon>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: true,
    'section-order': 2,
  },
};

/**
 * Use the shared icon catalog to keep icon usage consistent across components.
 *
 * Example import:
 *
 * ```ts
 * import { Chevron100Icon } from '@adobe/spectrum-wc/icon/elements';
 * ```
 */
export const SharedTemplates: Story = {
  render: () => html`
    <swc-icon label="Chevron">${Chevron100Icon()}</swc-icon>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: true,
    'section-order': 3,
  },
};

/**
 * Available shared icons in the current internal catalog.
 * Use this story as a quick reference for what can be imported from `@adobe/spectrum-wc/icon/elements`.
 */
export const AvailableIcons: Story = {
  render: () => {
    const catalog = Object.entries(iconElements)
      .filter(
        ([name, iconFactory]) =>
          name.endsWith('Icon') && typeof iconFactory === 'function'
      )
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, iconFactory]) => ({
        name,
        icon: (iconFactory as () => unknown)(),
      }));
    return html`
      ${catalog.map(
        (entry) => html`
          <div
            style="
                            display: inline-flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 8px;
                            min-inline-size: 120px;
                            padding: 8px;
                        "
          >
            <swc-icon label=${entry.name}>${entry.icon}</swc-icon>
            <code>${entry.name}</code>
          </div>
        `
      )}
    `;
  },
  tags: ['options'],
  parameters: {
    flexLayout: true,
    'section-order': 4,
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-icon>` element implements several accessibility features:
 *
 * #### SVG labeling
 *
 * - Slotted SVGs receive `role="img"` and use `aria-label` when `label` is provided
 * - When no label is provided, slotted SVGs are marked `aria-hidden="true"`
 *
 * ### Best practices
 *
 * - Always provide a descriptive `label` for informative icons
 * - Use empty labels only for purely decorative icons
 * - Keep labels short and specific (e.g., "Search" instead of "Icon")
 */
export const Accessibility: Story = {
  render: (args) => html`
    <swc-icon label=${ifDefined(args.label)} size=${ifDefined(args.size)}>
      ${iconSvg}
    </swc-icon>
  `,
  tags: ['a11y'],
  parameters: {
    flexLayout: true,
  },
};

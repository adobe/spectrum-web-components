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

import { AlertIcon, Chevron100Icon } from '@adobe/swc/icon/elements';

import '@adobe/swc/icon';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-icon');

/**
 * **Internal-only component.**
 *
 * The `<swc-icon>` element renders icons from either shared inline SVG templates or an external image source.
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
      subtitle: `Internal icon renderer for shared templates or external image URLs.`,
    },
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    HELPERS
// ────────────────────

const iconSvg = Chevron100Icon({ label: 'Chevron' });
const alertSvg = AlertIcon({ label: 'Alert' });
const iconSrc =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'><path d='M6.146 3.146a.5.5 0 0 1 .708 0L12.207 8.5a.7.7 0 0 1 0 1l-5.353 5.354a.5.5 0 1 1-.708-.708L11.293 9 6.146 3.854a.5.5 0 0 1 0-.708z'/></svg>";

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  render: (args) => html`
    <swc-icon label=${ifDefined(args.label)} src=${ifDefined(args.src)}>
      ${args.src ? '' : iconSvg}
    </swc-icon>
  `,
  args: {
    label: 'Search',
  },
};

// ────────────────────
//    OVERVIEW STORY
// ────────────────────

export const Overview: Story = {
  tags: ['overview'],
  render: (args) => html`
    <swc-icon label=${ifDefined(args.label)} src=${ifDefined(args.src)}>
      ${args.src ? '' : iconSvg}
    </swc-icon>
  `,
  args: {
    label: 'Search',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * An icon consists of:
 *
 * 1. **Rendered graphic** - Either a shared slotted SVG template or an image element
 *
 * ### Content
 *
 * - Default slot: Provide SVG markup to render.
 * - `src`: Provide an image URL when slot content is not used.
 */
export const Anatomy: Story = {
  render: (args) => html`
    <swc-icon label="Chevron icon">${iconSvg}</swc-icon>
    <swc-icon label="Alert icon">${alertSvg}</swc-icon>
    ${template({ ...args, src: iconSrc, label: 'Image source' })}
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
 * ### Shared templates
 *
 * Import reusable templates from `@adobe/swc/icon/elements` and slot them into `<swc-icon>`.
 * This keeps icon usage centralized and avoids per-component SVG duplication.
 *
 * ### Source fallback
 *
 * Use `src` for external assets when inline template rendering is not needed.
 */
export const Sources: Story = {
  render: (args) => html`
    <swc-icon label="Chevron icon">${iconSvg}</swc-icon>
    <swc-icon label="Alert icon">${alertSvg}</swc-icon>
    ${template({ ...args, src: iconSrc, label: 'Image source' })}
  `,
  tags: ['options'],
  parameters: {
    flexLayout: true,
  },
};

/**
 * Use the shared icon catalog to keep icon usage consistent across components.
 *
 * Example import:
 *
 * ```ts
 * import { Chevron100Icon } from '@adobe/swc/icon/elements';
 * ```
 */
export const SharedTemplates: Story = {
  render: () => html`
    <swc-icon label="Chevron">${Chevron100Icon({ label: 'Chevron' })}</swc-icon>
    <swc-icon label="Alert">${AlertIcon({ label: 'Alert' })}</swc-icon>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: true,
    'section-order': 1,
  },
};

/**
 * Available shared icons in the current internal catalog.
 * Use this story as a quick reference for what can be imported from `@adobe/swc/icon/elements`.
 */
export const AvailableIcons: Story = {
  render: () => {
    const catalog = [
      {
        name: 'Chevron100Icon',
        icon: Chevron100Icon({ label: 'Chevron' }),
      },
      { name: 'AlertIcon', icon: AlertIcon({ label: 'Alert' }) },
    ];
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
    'section-order': 2,
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
 * #### Image labeling
 *
 * - Images use the `label` value as the `alt` text
 *
 * ### Best practices
 *
 * - Always provide a descriptive `label` for informative icons
 * - Use empty labels only for purely decorative icons
 * - Keep labels short and specific (e.g., "Search" instead of "Icon")
 */
export const Accessibility: Story = {
  render: (args) => html`
    <swc-icon label="Search">${iconSvg}</swc-icon>
    ${template({ ...args, src: iconSrc, label: 'Search' })}
  `,
  tags: ['a11y'],
  parameters: {
    flexLayout: true,
  },
};

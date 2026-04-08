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
import { iconCloud } from '@adobe/spectrum-css-workflow-icons-s2/icons/assets/components/iconCloud.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import '@adobe/spectrum-wc/illustrated-message';

import { ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS } from '../../../../core/components/illustrated-message/IllustratedMessage.types.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers(
  'swc-illustrated-message'
);

argTypes['heading-level'] = {
  ...argTypes['heading-level'],
  control: { type: 'select' },
  options: ILLUSTRATED_MESSAGE_VALID_HEADING_LEVELS,
  table: {
    category: 'attributes',
    defaultValue: { summary: '2' },
  },
};

/**
 * An illustrated message displays an illustration and a message, typically
 * used in empty states or error pages.
 */
export const meta: Meta = {
  title: 'Illustrated Message',
  component: 'swc-illustrated-message',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    docs: {
      subtitle: 'Display an illustration with a heading and description.',
    },
  },
  tags: ['migrated'],
};

export default {
  ...meta,
  title: 'Illustrated Message',
  excludeStories: ['meta'],
} as Meta;

const placeholderIllustration = html`
  <span slot="">${iconCloud({ width: 84, height: 84 })}</span>
`;

export const Playground: Story = {
  render: (args) =>
    template(
      args,
      html`
        ${placeholderIllustration}
        <span slot="heading">Illustrated message title</span>
        <span slot="description">
          Illustrated message description. Give more information about what a
          user can do, expect, or how to make items appear.
        </span>
      `
    ),
  tags: ['autodocs', 'dev'],
};

export const Overview: Story = {
  render: () => html`
    <swc-illustrated-message>
      ${placeholderIllustration}
      <span slot="heading">Illustrated message title</span>
      <span slot="description">
        Illustrated message description. Give more information about what a user
        can do, expect, or how to make items appear.
      </span>
    </swc-illustrated-message>
  `,
  tags: ['overview'],
};

export const HeadingLevels: Story = {
  render: () => html`
    <swc-illustrated-message heading-level="2">
      ${placeholderIllustration}
      <span slot="heading">Illustrated message title</span>
      <span slot="description">
        Illustrated message description. Give more information about what a user
        can do, expect, or how to make items appear.
      </span>
    </swc-illustrated-message>
    <swc-illustrated-message heading-level="3">
      ${placeholderIllustration}
      <span slot="heading">Illustrated message title</span>
      <span slot="description">
        Illustrated message description. Give more information about what a user
        can do, expect, or how to make items appear.
      </span>
    </swc-illustrated-message>
    <swc-illustrated-message heading-level="4">
      ${placeholderIllustration}
      <span slot="heading">Illustrated message title</span>
      <span slot="description">
        Illustrated message description. Give more information about what a user
        can do, expect, or how to make items appear.
      </span>
    </swc-illustrated-message>
  `,
  tags: ['options'],
};

/**
 * SVGs slotted into the illustration slot should declare their accessibility
 * intent explicitly:
 *
 * - **Decorative** (most common): add `aria-hidden="true"` so screen readers
 *   skip the graphic entirely.
 * - **Informative**: add `role="img"` and `aria-label` (or an inline `<title>`)
 *   so screen readers announce the illustration's meaning.
 */
export const IllustrationAccessibility: Story = {
  render: () => html`
    <swc-illustrated-message>
      <span slot="">${iconCloud({ width: 64, height: 64 })}</span>
      <span slot="heading">Illustrated message title</span>
      <span slot="description">
        The icon above uses
        <code>aria-hidden="true"</code>
        — screen readers skip the illustration entirely and move on to the
        heading and description.
      </span>
    </swc-illustrated-message>

    <swc-illustrated-message>
      <span slot="heading">Illustrated message title</span>
      <span slot="">
        ${iconCloud({
          width: 120,
          height: 120,
          ariaHidden: false,
          title: 'A cloud illustration',
        })}
      </span>
      <span slot="description">
        The icon above uses
        <code>role="img"</code>
        and
        <code>aria-label</code>
        — screen readers announce its meaning before reading the heading and
        description.
      </span>
    </swc-illustrated-message>
  `,
  tags: ['a11y'],
};

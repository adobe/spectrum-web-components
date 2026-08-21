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

import '../../swc-response-status.js';

import {
  row,
  theme,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Conversational AI/Response status/Response status VRT',
  component: 'swc-response-status',
  tags: ['dev'],
};

export default meta;

// Helpers

const step = html`
  <swc-response-status-step status="active">
    <span slot="label">Searching repositories for Europe trips</span>
    <span slot="description">
      Checked 3 internal repositories for previously compiled trip package data
      and pricing templates.
    </span>
  </swc-response-status-step>
`;

// swc-ui-icon owns RTL mirroring for the chevron itself (ui-icon-direction.css), and
// the closed/open transform composes with that mirror without needing a
// component-level RTL override (see the comment above
// .swc-ResponseStatus-chevron--down). This permutation set exists to make that
// composition a visible, diffable snapshot rather than relying on manual
// verification: collapsed shows the mirrored resting chevron, expanded shows the
// down-pointing chevron unaffected by the mirror.
const permutationContent = () => html`
  ${row(
    [
      html`
        <swc-response-status status="active" accessible-label="Execution steps">
          <span slot="label">Searching repositories for Europe trips</span>
          ${step}
        </swc-response-status>
      `,
      html`
        <swc-response-status
          status="active"
          open
          accessible-label="Execution steps"
        >
          <span slot="label">Searching repositories for Europe trips</span>
          ${step}
        </swc-response-status>
      `,
    ],
    'Collapsed / expanded'
  )}
`;

// VRT stories

// Rendered once in light/ltr and once in dark/rtl, folded into a single story so it
// costs one snapshot while still covering the chevron mirror + rotation composition
// in both directions.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
};

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
import type { Meta, StoryObj } from '@storybook/web-components';

import './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * `LabellingMixin` adds visible-label rendering and accessible-name wiring to
 * a host: the `accessible-label` / `accessible-labelledby` properties, `label`
 * slot presence tracking, the "no accessible name" dev warning, and
 * `renderLabel()`.
 *
 * Three accessible-name sources are supported, in precedence order (highest
 * first): `accessible-labelledby`, `accessible-label`, and a slotted visible
 * label. Only the highest-precedence source that is set is wired.
 * `HelpTextMixin` (`@adobe/spectrum-wc-core/mixins`) is the companion mixin
 * for description/error-text association.
 */
const meta: Meta = {
  title: 'Mixins/Labelling mixin',
  component: 'demo-labelling-host',
  parameters: {
    docs: {
      subtitle:
        'Visible-label rendering and precedence-ordered accessible-name wiring.',
    },
    layout: 'centered',
  },
  tags: ['migrated', 'controller'],
};

export default meta;

type Story = StoryObj;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  render: () => html`
    <demo-labelling-host>
      <span slot="label">Example label</span>
    </demo-labelling-host>
  `,
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => html`
    <demo-labelling-host>
      <span slot="label">Example label</span>
    </demo-labelling-host>
  `,
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const NameSourcePrecedence: Story = {
  render: () => html`
    <demo-labelling-host>
      <span slot="label">Slotted label only</span>
    </demo-labelling-host>
    <demo-labelling-host
      accessible-label="accessible-label only"
    ></demo-labelling-host>
    <div id="labelling-mixin-row-header">Name</div>
    <div id="labelling-mixin-col-header">Billing address</div>
    <demo-labelling-host
      accessible-labelledby="labelling-mixin-row-header labelling-mixin-col-header"
    >
      <span slot="label">Ignored: accessible-labelledby wins</span>
    </demo-labelling-host>
  `,
  tags: ['behaviors'],
};
NameSourcePrecedence.storyName = 'Name source precedence';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-labelling-host>
      <span slot="label">Accessibly labelled field</span>
    </demo-labelling-host>
  `,
  tags: ['a11y'],
};

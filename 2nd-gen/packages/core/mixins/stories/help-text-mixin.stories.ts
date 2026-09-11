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
 * `HelpTextMixin` adds description/error-text rendering and accessible
 * description wiring to a host: the `accessible-describedby` property,
 * `description` / `error-text` slot presence tracking, and `renderHelpText()`.
 *
 * A slotted `description` and an external `accessible-describedby` reference
 * combine rather than override each other; the in-shadow description comes
 * first. The error message is always same-root and shows only while the host
 * reads as `invalid`. `LabellingMixin` (`@adobe/spectrum-wc-core/mixins`) is
 * the companion mixin for accessible-name association.
 */
const meta: Meta = {
  title: 'Mixins/Help text mixin',
  component: 'demo-help-text-host',
  parameters: {
    docs: {
      subtitle:
        'Description/error-text rendering and combined accessible-description wiring.',
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
    <demo-help-text-host>
      <span slot="description">Example description</span>
    </demo-help-text-host>
  `,
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => html`
    <demo-help-text-host>
      <span slot="description">Example description</span>
    </demo-help-text-host>
  `,
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const CombinedDescription: Story = {
  render: () => html`
    <demo-help-text-host>
      <span slot="description">Slotted description only</span>
    </demo-help-text-host>
    <p id="help-text-mixin-external-description">External description text</p>
    <demo-help-text-host
      accessible-describedby="help-text-mixin-external-description"
    >
      <span slot="description">Combined with a slotted description</span>
    </demo-help-text-host>
  `,
  tags: ['behaviors'],
};
CombinedDescription.storyName = 'Combined description sources';

export const ErrorTextGating: Story = {
  render: () => html`
    <demo-help-text-host>
      <span slot="description">Not shown while valid</span>
      <span slot="error-text">Only visible while invalid</span>
    </demo-help-text-host>
    <demo-help-text-host invalid>
      <span slot="description">Still associated while invalid</span>
      <span slot="error-text">Only visible while invalid</span>
    </demo-help-text-host>
  `,
  tags: ['behaviors'],
};
ErrorTextGating.storyName = 'Error text gated by invalid';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-help-text-host invalid>
      <span slot="description">Helper text</span>
      <span slot="error-text">Error message shown to assistive technology</span>
    </demo-help-text-host>
  `,
  tags: ['a11y'],
};

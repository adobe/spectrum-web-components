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
 * `FieldDescriptionMixin` adds description/error-text rendering and accessible
 * description wiring to a host: the `accessible-describedby` property,
 * `description` / `error-text` slot presence tracking, and `renderFieldDescription()`.
 *
 * A slotted `description` and an external `accessible-describedby` reference
 * combine rather than override each other; the in-shadow description comes
 * first. The error message is always same-root and shows only while the host
 * reads as `invalid`. `LabellingMixin` (`@adobe/spectrum-wc-core/mixins`) is
 * the companion mixin for accessible-name association.
 */
const meta: Meta = {
  title: 'Mixins/Field description mixin',
  component: 'demo-field-description-host',
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
    <demo-field-description-host>
      <span slot="description">Example description</span>
    </demo-field-description-host>
  `,
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  render: () => html`
    <demo-field-description-host>
      <span slot="description">Example description</span>
    </demo-field-description-host>
  `,
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const CombinedDescription: Story = {
  render: () => html`
    <demo-field-description-host>
      <span slot="description">Slotted description only</span>
    </demo-field-description-host>
    <p id="field-description-mixin-external-description">
      External description text
    </p>
    <demo-field-description-host
      accessible-describedby="field-description-mixin-external-description"
    >
      <span slot="description">Combined with a slotted description</span>
    </demo-field-description-host>
  `,
  tags: ['behaviors'],
};
CombinedDescription.storyName = 'Combined description sources';

export const ErrorTextGating: Story = {
  render: () => html`
    <demo-field-description-host>
      <span slot="description">Shown while valid</span>
      <span slot="error-text">Replaces the description while invalid</span>
    </demo-field-description-host>
    <demo-field-description-host invalid>
      <span slot="description">Hidden while invalid</span>
      <span slot="error-text">Replaces the description while invalid</span>
    </demo-field-description-host>
  `,
  tags: ['behaviors'],
};
ErrorTextGating.storyName = 'Error text replaces the description while invalid';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-field-description-host invalid>
      <span slot="description">Helper text</span>
      <span slot="error-text">Enter a valid value</span>
    </demo-field-description-host>
  `,
  tags: ['a11y'],
};

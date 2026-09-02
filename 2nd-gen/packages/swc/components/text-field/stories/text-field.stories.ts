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

import '@adobe/spectrum-wc/components/text-field/swc-text-field.js';

// ────────────────
//    METADATA
// ────────────────

const { events, args, argTypes, template } =
  getStorybookHelpers('swc-text-field');

/**
 * A single-line text field for entering and editing text.
 */
const meta: Meta = {
  title: 'Text field',
  component: 'swc-text-field',
  args,
  argTypes,
  render: (args) => template(args),
  parameters: {
    actions: {
      handles: events,
    },
    docs: {
      subtitle: `Single-line text field for entering and editing text`,
    },
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
    'accessible-label': 'Example text field',
  },
  render: (args) => html`
    ${template({ ...args })}
  `,
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    'accessible-label': 'Example text field',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  render: () => html`
    <swc-text-field>
      <span slot="label">Email address</span>
      <span slot="description">Used for order updates only.</span>
    </swc-text-field>
    <swc-text-field invalid>
      <span slot="label">Email address</span>
      <span slot="error-text">Enter a valid email address.</span>
    </swc-text-field>
  `,
  tags: ['anatomy'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Labelling: Story = {
  render: () => html`
    <swc-text-field>
      <span slot="label">Slotted visible label</span>
    </swc-text-field>
    <swc-text-field
      accessible-label="Accessible-label only (no visible label)"
    ></swc-text-field>
    <div id="labelling-row-header">Name</div>
    <div id="labelling-col-header">Billing address</div>
    <swc-text-field
      accessible-labelledby="labelling-row-header labelling-col-header"
    ></swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: () => html`
    <swc-text-field>
      <span slot="label">Default</span>
    </swc-text-field>
    <swc-text-field required>
      <span slot="label">Required</span>
    </swc-text-field>
    <swc-text-field readonly value="Read-only value">
      <span slot="label">Read-only</span>
    </swc-text-field>
    <swc-text-field disabled>
      <span slot="label">Disabled</span>
    </swc-text-field>
    <swc-text-field invalid>
      <span slot="label">Email address</span>
      <span slot="description">We'll never share your email.</span>
      <span slot="error-text">Enter a valid email address.</span>
    </swc-text-field>
  `,
  tags: ['states'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <swc-text-field>
      <span slot="label">Comments</span>
      <span slot="description">Optional; visible to your team only.</span>
    </swc-text-field>
    <p id="accessibility-external-description">
      Describe the issue in as much detail as possible.
    </p>
    <swc-text-field
      accessible-label="Issue details"
      accessible-describedby="accessibility-external-description"
    ></swc-text-field>
  `,
  tags: ['a11y'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

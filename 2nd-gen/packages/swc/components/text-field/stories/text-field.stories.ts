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
import '@adobe/spectrum-wc/components/avatar/swc-avatar.js';
import '@adobe/spectrum-wc-icons/swc-icon-mention.js';

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
    'label-slot': 'Email address',
    placeholder: 'you@example.com',
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
  render: () => html`
    <swc-text-field style="--swc-text-field-width: 220px;">
      <span slot="label">Email address</span>
    </swc-text-field>
  `,
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
    flexLayout: 'column-stretch',
    styles: {
      '--swc-text-field-width': '220px',
    },
  },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Labelling: Story = {
  render: () => {
    // Muted captions so the label-less accessible-label / -labelledby fields
    // aren't unexplained empty boxes.
    const caption =
      'margin-block-end: 8px; font-size: 0.75rem; color: #6e6e6e;';
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 24px; max-inline-size: 44ch;"
      >
        <div>
          <div style=${caption}>
            Slotted
            <code>label</code>
          </div>
          <swc-text-field>
            <span slot="label">Email address</span>
          </swc-text-field>
        </div>

        <div>
          <div style=${caption}>
            <code>accessible-label</code>
            : named for assistive tech, no visible label
          </div>
          <swc-text-field accessible-label="Email address"></swc-text-field>
        </div>

        <div>
          <div style=${caption}>
            <code>accessible-labelledby</code>
            : named by other elements
          </div>
          <div style="margin-block-end: 8px;">
            <span id="labelling-row-header">Name</span>
            <span id="labelling-col-header">Billing address</span>
          </div>
          <swc-text-field
            id="labelling-labelledby-field"
            accessible-labelledby="labelling-row-header labelling-col-header"
          ></swc-text-field>
        </div>
      </div>
    `;
  },
  tags: ['options'],
  parameters: {
    a11y: {
      // axe-core false positive: it can't read the `ariaLabelledByElements`
      // reflection LabellingMixin uses for `accessible-labelledby`, so it flags
      // a missing label that resolves fine in browsers/AT. See the forms-strategy
      // RFC axe-core policy (CONTRIBUTOR-DOCS, "3.4 axe-core policy").
      exclude: {
        label: ['#labelling-labelledby-field'],
      },
    },
  },
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-inline-size: 360px;">
      <swc-text-field size="s" placeholder="Small placeholder">
        <span slot="label">Small</span>
        <span slot="description">Used for compact layouts.</span>
      </swc-text-field>
      <swc-text-field size="m" placeholder="Medium placeholder">
        <span slot="label">Medium</span>
        <span slot="description">Default field sizing.</span>
      </swc-text-field>
      <swc-text-field size="l" placeholder="Large placeholder">
        <span slot="label">Large</span>
        <span slot="description">For denser form surfaces.</span>
      </swc-text-field>
      <swc-text-field size="xl" placeholder="Extra-large placeholder">
        <span slot="label">Extra-large</span>
        <span slot="description">For prominent entry points.</span>
      </swc-text-field>
    </div>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      '--swc-text-field-width': '220px',
    },
  },
};

export const LabelPositions: Story = {
  render: () => html`
    <swc-text-field label-position="top">
      <span slot="label">Label on top</span>
    </swc-text-field>
    <swc-text-field label-position="side">
      <span slot="label">Label on side</span>
    </swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      '--swc-text-field-width': '220px',
    },
  },
};
LabelPositions.storyName = 'Label positions';

export const NecessityIndicator: Story = {
  render: () => html`
    <swc-text-field required necessity-indicator="icon">
      <span slot="label">Email address</span>
    </swc-text-field>
    <swc-text-field required necessity-indicator="label">
      <span slot="label">Email address</span>
    </swc-text-field>
    <swc-text-field necessity-indicator="label">
      <span slot="label">Email address</span>
    </swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      '--swc-text-field-width': '220px',
    },
  },
};
NecessityIndicator.storyName = 'Necessity indicator';

export const Prefix: Story = {
  render: () => html`
    <swc-text-field placeholder="example.com">
      <span slot="label">URL</span>
      <span slot="prefix">https://</span>
    </swc-text-field>
    <swc-text-field placeholder="username">
      <span slot="label">Mention</span>
      <swc-icon-mention slot="prefix"></swc-icon-mention>
    </swc-text-field>
    <swc-text-field placeholder="contact@example.com">
      <span slot="label">User Email</span>
      <swc-avatar
        slot="prefix"
        size="75"
        src="https://picsum.photos/id/823/40/40"
        alt=""
      ></swc-avatar>
    </swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      '--swc-text-field-width': '220px',
    },
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const States: Story = {
  render: () => html`
    <swc-text-field accessible-label="Default"></swc-text-field>
    <swc-text-field required>
      <span slot="label">Full name</span>
    </swc-text-field>
    <swc-text-field
      accessible-label="Read-only"
      readonly
      value="Read-only value"
    ></swc-text-field>
    <swc-text-field disabled value="Disabled value">
      <span slot="label">Disabled</span>
    </swc-text-field>
    <swc-text-field
      accessible-label="Disabled placeholder"
      disabled
      placeholder="Placeholder"
    ></swc-text-field>
    <swc-text-field accessible-label="Email address" invalid>
      <span slot="description">We'll never share your email.</span>
      <span slot="error-text">Enter a valid email address.</span>
    </swc-text-field>
    <swc-text-field disabled invalid value="not-an-email">
      <span slot="label">Email address</span>
      <span slot="description">We'll never share your email.</span>
      <span slot="error-text">Enter a valid email address.</span>
    </swc-text-field>
  `,
  tags: ['states'],
  parameters: {
    flexLayout: 'column-stretch',
    styles: {
      '--swc-text-field-width': '220px',
    },
  },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const LabelOverflow: Story = {
  // A narrow fixed-width column: the field has no default width (it fills its
  // container), so a constrained container is what makes the long labels wrap.
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 24px; inline-size: 260px;"
    >
      <swc-text-field placeholder="you@example.com">
        <span slot="label">
          This top label wraps onto multiple lines instead of clipping
        </span>
      </swc-text-field>
      <swc-text-field label-position="side" placeholder="you@example.com">
        <span slot="label">Short side label</span>
      </swc-text-field>
      <swc-text-field label-position="side" placeholder="you@example.com">
        <span slot="label">
          This side label wraps and the input shrinks toward a square
        </span>
      </swc-text-field>
      <swc-text-field
        label-position="side"
        placeholder="you@example.com"
        style="--swc-field-label-max-inline-size: 120px;"
      >
        <span slot="label">Tightly capped label wraps early</span>
      </swc-text-field>
    </div>
  `,
  tags: ['behaviors'],
};
LabelOverflow.storyName = 'Label overflow';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => {
    // Muted captions so each external describedby element reads as part of its
    // own example.
    const caption =
      'margin-block-end: 8px; font-size: 0.75rem; color: #6e6e6e;';
    return html`
      <div
        style="display: flex; flex-direction: column; gap: 24px; max-inline-size: 44ch;"
      >
        <div>
          <div style=${caption}>
            Slotted
            <code>description</code>
          </div>
          <swc-text-field accessible-label="Comments">
            <span slot="description">Optional; visible to your team only.</span>
          </swc-text-field>
        </div>

        <div>
          <div style=${caption}>
            <code>accessible-describedby</code>
            : described by another element
          </div>
          <p
            id="accessibility-external-description"
            style="margin-block: 0 8px;"
          >
            Describe the issue in as much detail as possible.
          </p>
          <swc-text-field
            accessible-label="Issue details"
            accessible-describedby="accessibility-external-description"
          ></swc-text-field>
        </div>
      </div>
    `;
  },
  tags: ['a11y'],
};

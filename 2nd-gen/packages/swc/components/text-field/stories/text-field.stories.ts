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
    </swc-text-field>
    <swc-text-field
      accessible-label="Accessible-label only (no visible label)"
    ></swc-text-field>
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
      id="labelling-labelledby-field"
      accessible-labelledby="labelling-row-header labelling-col-header"
    ></swc-text-field>
  `,
  tags: ['options'],
  parameters: {
    flexLayout: 'row-wrap',
    a11y: {
      // reason: axe-core cannot read the ARIA element-reflection API
      // (`ariaLabelledByElements`), which is how `LabellingMixin` resolves
      // `accessible-labelledby` onto the shadow `<input>`. It only inspects
      // attributes, so it reports a false "Form element does not have a
      // label" ("label" rule) violation on this host even though the name
      // resolves correctly in real browsers and assistive technology. See
      // the forms-strategy RFC's axe-core policy (CONTRIBUTOR-DOCS,
      // "3.4 axe-core policy") for the documented false-positive list.
      // Remove once axe-core adds ARIAMixin element-reference support
      // (review quarterly).
      exclude: {
        label: ['#labelling-labelledby-field'],
      },
    },
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
  `,
  tags: ['states'],
  parameters: {
    flexLayout: 'row-wrap',
  },
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const ConflictingLabelSources: Story = {
  render: () => html`
    <swc-text-field accessible-label="Different text (check console)">
      <span slot="label">Visible label</span>
    </swc-text-field>
    <div id="text-field-conflict-header">External label (check console)</div>
    <swc-text-field
      id="conflict-labelledby-field"
      accessible-label="Different text (check console)"
      accessible-labelledby="text-field-conflict-header"
    ></swc-text-field>
    <div id="text-field-conflict-header-2">External label (check console)</div>
    <swc-text-field
      id="conflict-labelledby-slot-field"
      accessible-label="Different text (check console)"
      accessible-labelledby="text-field-conflict-header-2"
    >
      <span slot="label">Visible label (check console)</span>
    </swc-text-field>
  `,
  tags: ['behaviors'],
  parameters: {
    flexLayout: 'row-wrap',
    a11y: {
      // reason: same axe-core / ariaLabelledByElements limitation as
      // `Labelling` above — these two hosts resolve their accessible name via
      // `accessible-labelledby`, which axe-core cannot read.
      exclude: {
        label: [
          '#conflict-labelledby-field',
          '#conflict-labelledby-slot-field',
        ],
      },
    },
  },
};
ConflictingLabelSources.storyName = 'Conflicting label sources';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <div id="accessibility-row-header">Name</div>
    <div id="accessibility-col-header">Billing address</div>
    <swc-text-field
      id="accessibility-labelledby-field"
      accessible-labelledby="accessibility-row-header accessibility-col-header"
    ></swc-text-field>
  `,
  tags: ['a11y'],
  parameters: {
    flexLayout: 'row-wrap',
    a11y: {
      // reason: same axe-core / ariaLabelledByElements limitation as
      // `Labelling` above — this host resolves its accessible name via
      // `accessible-labelledby`, which axe-core cannot read.
      exclude: {
        label: ['#accessibility-labelledby-field'],
      },
    },
  },
};

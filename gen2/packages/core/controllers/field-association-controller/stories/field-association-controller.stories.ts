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

const args = {
  value: 'Example',
  label: 'Username',
  name: 'username',
  disabled: false,
  required: false,
};

const argTypes: Meta['argTypes'] = {
  value: {
    control: 'text',
    description: 'The field value submitted with the form.',
    table: { category: 'Host', defaultValue: { summary: '' } },
  },
  label: {
    control: 'text',
    description:
      'Accessible name applied to the inner control as `aria-label`.',
    table: { category: 'Host', defaultValue: { summary: '' } },
  },
  name: {
    control: 'text',
    description: 'Form control name the value is submitted under.',
    table: { category: 'Host', defaultValue: { summary: '' } },
  },
  disabled: {
    control: 'boolean',
    description:
      "The host's own disabled attribute. Effective disabled is this OR the cascaded fieldset/form state.",
    table: { category: 'Host', defaultValue: { summary: 'false' } },
  },
  required: {
    control: 'boolean',
    description: "Drives the inner control's validity for the pass-throughs.",
    table: { category: 'Host', defaultValue: { summary: 'false' } },
  },
};

/**
 * `FieldAssociationController` wraps the `ElementInternals` surface shared by
 * form-associated fields: setting or excluding the submitted value, restoring a
 * default on reset, the `<fieldset disabled>` cascade, and the validity reads.
 *
 * The demos below (`demo-field-text`, `demo-field-radio`, `demo-field-combobox`)
 * are unstyled harnesses that exercise the controller in isolation, not `swc-*`
 * components.
 */
const meta: Meta = {
  title: 'Controllers/Field association controller',
  component: 'demo-field-text',
  args,
  argTypes,
  render: (args) => html`
    <form novalidate>
      <demo-field-text
        name=${args.name}
        value=${args.value}
        label=${args.label}
        ?disabled=${args.disabled}
        ?required=${args.required}
      ></demo-field-text>
    </form>
  `,
  parameters: {
    docs: {
      subtitle:
        'Shared ElementInternals plumbing for form-associated field components.',
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
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const Interactive: Story = {
  render: () => html`
    <demo-field-bench></demo-field-bench>
  `,
  tags: ['behaviors'],
};
Interactive.storyName = 'Interactive demo';

export const FormValue: Story = {
  render: () => html`
    <form novalidate>
      <demo-field-text
        name="username"
        value="Example"
        label="Username"
      ></demo-field-text>
      <demo-form-readout></demo-form-readout>
    </form>
  `,
  tags: ['behaviors'],
};
FormValue.storyName = 'Form value';

export const Exclusion: Story = {
  render: () => html`
    <form novalidate>
      <demo-field-combobox
        name="color"
        label="Favorite color"
      ></demo-field-combobox>
      <demo-form-readout></demo-form-readout>
    </form>
  `,
  tags: ['behaviors'],
};
Exclusion.storyName = 'Excluding a field';

export const DefaultValueReset: Story = {
  render: () => html`
    <form novalidate>
      <demo-field-text
        name="nickname"
        value="Example"
        label="Nickname"
      ></demo-field-text>
      <demo-form-readout></demo-form-readout>
    </form>
  `,
  tags: ['behaviors'],
};
DefaultValueReset.storyName = 'Default value and reset';

export const DisabledCascade: Story = {
  render: () => html`
    <form novalidate>
      <fieldset disabled>
        <legend>Profile</legend>
        <demo-field-text
          name="first"
          value="Example"
          label="First name"
        ></demo-field-text>
        <demo-field-radio
          name="subscribe"
          value="yes"
          checked
          label="Subscribe"
        ></demo-field-radio>
      </fieldset>
      <demo-form-readout></demo-form-readout>
    </form>
  `,
  tags: ['behaviors'],
};
DisabledCascade.storyName = 'Disabled cascade';

export const Validity: Story = {
  render: () => html`
    <form novalidate>
      <demo-field-text
        name="email"
        required
        label="Email (required)"
      ></demo-field-text>
      <demo-form-readout></demo-form-readout>
    </form>
  `,
  tags: ['behaviors'],
};
Validity.storyName = 'Validity pass-throughs';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = { ...FormValue, tags: ['a11y'] };

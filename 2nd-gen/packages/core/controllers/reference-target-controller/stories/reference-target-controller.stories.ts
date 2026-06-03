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

const meta: Meta = {
  title: 'Controllers/Reference target (POC)',
  tags: ['dev'],
  parameters: {
    docs: {
      description: {
        component: `
Proof-of-concept for a controller-based shim that approximates the
[Reference Target for Cross-Root ARIA](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md)
proposal. See the design note in \`research/reference-target-poc/DESIGN-NOTE.md\`.
                `,
      },
    },
  },
};
export default meta;

type Story = StoryObj;

// ──────────────────────────────────────────────────────────────────────────────
// Scenario A: <label for> forwarded to shadow-internal input
// ──────────────────────────────────────────────────────────────────────────────

export const LabelForForwarding: Story = {
  name: 'Label for forwarding',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 300px;"
    >
      <p style="margin: 0; font-size: 14px; color: #555;">
        The &lt;label for&gt; element in light DOM forwards its text as
        <code>aria-label</code>
        on the shadow-internal input.
      </p>
      <label for="labeled-input" style="font-weight: 600;">Full name</label>
      <demo-labeled-input id="labeled-input"></demo-labeled-input>
    </div>
  `,
};

// ──────────────────────────────────────────────────────────────────────────────
// Scenario B: aria-labelledby referencing the host
// ──────────────────────────────────────────────────────────────────────────────

export const AriaLabelledbyForwarding: Story = {
  name: 'aria-labelledby forwarding',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 300px;"
    >
      <p style="margin: 0; font-size: 14px; color: #555;">
        An external element uses
        <code>aria-labelledby</code>
        pointing at the host's ID. The controller materializes the label text on
        the shadow-internal input as
        <code>aria-label</code>
        .
      </p>
      <span id="external-label" style="font-weight: 600;">Email address</span>
      <demo-labeled-input
        id="email-input"
        aria-labelledby="external-label"
      ></demo-labeled-input>
    </div>
  `,
};

// ──────────────────────────────────────────────────────────────────────────────
// Scenario C: aria-describedby referencing the host
// ──────────────────────────────────────────────────────────────────────────────

export const AriaDescribedbyForwarding: Story = {
  name: 'aria-describedby forwarding',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 300px;"
    >
      <p style="margin: 0; font-size: 14px; color: #555;">
        A help-text element uses
        <code>aria-describedby</code>
        pointing at the host. The controller materializes the description on the
        shadow-internal input.
      </p>
      <label for="password-input" style="font-weight: 600;">Password</label>
      <demo-described-input id="password-input"></demo-described-input>
      <span
        id="password-help"
        aria-describedby="password-input"
        style="font-size: 12px; color: #666;"
      >
        Must be at least 8 characters
      </span>
    </div>
  `,
};

// ──────────────────────────────────────────────────────────────────────────────
// Scenario D: label click focuses the shadow-internal input
// ──────────────────────────────────────────────────────────────────────────────

export const LabelClickFocus: Story = {
  name: 'Label click focuses input',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 300px;"
    >
      <p style="margin: 0; font-size: 14px; color: #555;">
        Clicking the label focuses the shadow-internal input, mimicking native
        <code>&lt;label for&gt;</code>
        behavior across the shadow boundary.
      </p>
      <label for="focus-input" style="font-weight: 600; cursor: pointer;">
        Click me to focus the input
      </label>
      <demo-labeled-input id="focus-input"></demo-labeled-input>
    </div>
  `,
};

// ──────────────────────────────────────────────────────────────────────────────
// Scenario E: custom label element + custom input element (sp-field-label pattern)
// ──────────────────────────────────────────────────────────────────────────────

export const CustomLabelToCustomInput: Story = {
  name: 'Custom label to custom input (sp-field-label pattern)',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;"
    >
      <p style="margin: 0; font-size: 14px; color: #555;">
        This mirrors the real SWC pattern where
        <strong>both the label and the input are custom elements</strong>
        with their own shadow roots. The
        <code>&lt;demo-field-label&gt;</code>
        renders a
        <code>&lt;label&gt;</code>
        inside its shadow DOM, and the
        <code>&lt;demo-labeled-input&gt;</code>
        renders an
        <code>&lt;input&gt;</code>
        inside its shadow DOM.
      </p>
      <p style="margin: 0; font-size: 14px; color: #c00;">
        <strong>Gap:</strong>
        The native
        <code>&lt;label&gt;</code>
        inside the custom label element cannot set
        <code>for</code>
        to reach outside its shadow root. The controller's
        <code>syncLabelFor()</code>
        only queries
        <code>label[for]</code>
        , so it misses custom label elements. Click-to-focus works via
        JavaScript, but the accessible name is
        <strong>not forwarded</strong>
        to the shadow-internal input.
      </p>
      <demo-field-label for="custom-label-input">Name</demo-field-label>
      <demo-labeled-input id="custom-label-input"></demo-labeled-input>
    </div>
  `,
};

// ──────────────────────────────────────────────────────────────────────────────
// Scenario F: native label (baseline comparison)
// ──────────────────────────────────────────────────────────────────────────────

export const NativeLabelBaseline: Story = {
  name: 'Native label baseline (works)',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;"
    >
      <p style="margin: 0; font-size: 14px; color: #555;">
        Baseline comparison: a native
        <code>&lt;label&gt;</code>
        in light DOM targeting the same custom input element. The controller's
        <code>syncLabelFor()</code>
        finds the native label and materializes
        <code>aria-label</code>
        on the shadow-internal input. Click-to-focus also works.
      </p>
      <label for="native-label-input" style="font-weight: 600;">Name</label>
      <demo-labeled-input id="native-label-input"></demo-labeled-input>
    </div>
  `,
};

// ──────────────────────────────────────────────────────────────────────────────
// Scenario G: side-by-side comparison
// ──────────────────────────────────────────────────────────────────────────────

export const SideBySideComparison: Story = {
  name: 'Side-by-side: native label vs custom label',
  render: () => html`
    <div style="display: flex; gap: 48px; align-items: start;">
      <div
        style="display: flex; flex-direction: column; gap: 8px; max-width: 250px;"
      >
        <h3 style="margin: 0; font-size: 14px; color: #080;">
          Native label (works)
        </h3>
        <label for="side-native" style="font-weight: 600;">Email</label>
        <demo-labeled-input id="side-native"></demo-labeled-input>
        <p style="margin: 0; font-size: 12px; color: #555;">
          Inspect the shadow
          <code>&lt;input&gt;</code>
          : has
          <code>aria-label="Email"</code>
        </p>
      </div>
      <div
        style="display: flex; flex-direction: column; gap: 8px; max-width: 250px;"
      >
        <h3 style="margin: 0; font-size: 14px; color: #c00;">
          Custom label (gap)
        </h3>
        <demo-field-label for="side-custom">Email</demo-field-label>
        <demo-labeled-input id="side-custom"></demo-labeled-input>
        <p style="margin: 0; font-size: 12px; color: #555;">
          Inspect the shadow
          <code>&lt;input&gt;</code>
          : no
          <code>aria-label</code>
        </p>
      </div>
    </div>
  `,
};

// ──────────────────────────────────────────────────────────────────────────────
// Scenario H: dynamic label update
// ──────────────────────────────────────────────────────────────────────────────

export const DynamicLabelUpdate: Story = {
  name: 'Dynamic label update',
  render: () => html`
    <div
      style="display: flex; flex-direction: column; gap: 8px; max-width: 400px;"
    >
      <p style="margin: 0; font-size: 14px; color: #555;">
        Changing the label text re-syncs the accessible name on the
        shadow-internal input. Click the button to toggle the label.
      </p>
      <label for="dynamic-input" id="dynamic-label" style="font-weight: 600;">
        Original label
      </label>
      <demo-labeled-input id="dynamic-input"></demo-labeled-input>
      <button
        id="toggle-label-btn"
        onclick="
                    var label = this.closest('div').querySelector('#dynamic-label');
                    if (label) {
                        label.textContent = label.textContent === 'Original label'
                            ? 'Updated label'
                            : 'Original label';
                    }
                "
      >
        Toggle label text
      </button>
    </div>
  `,
};

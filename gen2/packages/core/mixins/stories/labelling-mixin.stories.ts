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
 * Three accessible-name sources are supported: `accessible-labelledby`,
 * `accessible-label`, and a slotted visible label. Each is wired
 * independently, and the browser picks which one is announced (in that
 * order). `FieldDescriptionMixin` (`@adobe/spectrum-wc-core/mixins`) is the companion
 * mixin for description/error-text association.
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
    <div style="display: grid; gap: 20px;">
      <section>
        <p style="margin: 0 0 8px;"><strong>Visible label</strong></p>
        <demo-labelling-host>
          <span slot="label">Example label</span>
        </demo-labelling-host>
      </section>

      <section>
        <p style="margin: 0 0 8px;">
          <strong>Accessible label</strong>
          <br />
          Uses
          <code>accessible-label</code>
          when no visible label is needed.
        </p>
        <demo-labelling-host
          accessible-label="Accessible label example"
        ></demo-labelling-host>
      </section>

      <section>
        <p style="margin: 0 0 8px;">
          <strong>External labels</strong>
          <br />
          Uses
          <code>accessible-labelledby</code>
          to combine text from other elements.
        </p>
        <div id="labelling-mixin-row-header">Row header label</div>
        <div id="labelling-mixin-col-header">Column header label</div>
        <demo-labelling-host
          id="labelling-mixin-labelledby-host"
          accessible-labelledby="labelling-mixin-row-header labelling-mixin-col-header"
        ></demo-labelling-host>
      </section>
    </div>
  `,
  tags: ['behaviors'],
  parameters: {
    a11y: {
      // reason: axe-core cannot read the ARIA element-reflection API
      // (`ariaLabelledByElements`), which is how `LabellingMixin` resolves
      // `accessible-labelledby`. It only inspects attributes, so it reports a
      // false "Form element does not have a label" ("label" rule) violation
      // on this host even though the name resolves correctly in real
      // browsers and assistive technology. Remove once axe-core adds
      // ARIAMixin element-reference support (review quarterly).
      exclude: {
        label: ['#labelling-mixin-labelledby-host'],
      },
    },
  },
};
NameSourcePrecedence.storyName = 'Name source precedence';

export const ConflictingLabelSources: Story = {
  render: () => html`
    <div style="display: grid; gap: 20px;">
      <section>
        <div
          id="labelling-mixin-conflict-header"
          style="margin-block-end: 8px;"
        >
          External label (check console)
        </div>
        <demo-labelling-host
          id="labelling-mixin-conflict-labelledby-host"
          accessible-label="Different text (check console)"
          accessible-labelledby="labelling-mixin-conflict-header"
        ></demo-labelling-host>
      </section>

      <section>
        <div
          id="labelling-mixin-conflict-header-2"
          style="margin-block-end: 8px;"
        >
          External label (check console)
        </div>
        <demo-labelling-host
          id="labelling-mixin-conflict-labelledby-slot-host"
          accessible-label="Different text (check console)"
          accessible-labelledby="labelling-mixin-conflict-header-2"
        >
          <span slot="label">Visible label</span>
        </demo-labelling-host>
      </section>
    </div>
  `,
  tags: ['behaviors'],
  parameters: {
    a11y: {
      // reason: same axe-core / ariaLabelledByElements limitation as
      // `NameSourcePrecedence` above. These hosts resolve their accessible
      // name via `accessible-labelledby`, which axe-core cannot read.
      exclude: {
        label: [
          '#labelling-mixin-conflict-labelledby-host',
          '#labelling-mixin-conflict-labelledby-slot-host',
        ],
      },
    },
  },
};
ConflictingLabelSources.storyName = 'Conflicting label sources';

export const OtherDevWarnings: Story = {
  render: () => html`
    <div style="display: grid; gap: 20px;">
      <section>
        <p style="margin: 0 0 8px;">
          <strong>No accessible name</strong>
          <br />
          No label slot,
          <code>accessible-label</code>
          , or
          <code>accessible-labelledby</code>
          is set. Open the console.
        </p>
        <demo-labelling-host
          id="labelling-mixin-warn-missing-name"
        ></demo-labelling-host>
      </section>

      <section>
        <p style="margin: 0 0 8px;">
          <strong>Placeholder-only name</strong>
          <br />
          A
          <code>placeholder</code>
          is not a reliable accessible name; the mixin warns when it is the only
          source.
        </p>
        <demo-labelling-host
          id="labelling-mixin-warn-placeholder-only"
          placeholder="Search"
        ></demo-labelling-host>
      </section>

      <section>
        <p style="margin: 0 0 8px;">
          <strong>
            Host
            <code>aria-label</code>
            is ignored
          </strong>
          <br />
          <code>aria-label</code>
          /
          <code>aria-labelledby</code>
          on the host do not name the field (the accessible name is applied to
          the role element, not the host). Use
          <code>accessible-label</code>
          or
          <code>accessible-labelledby</code>
          instead.
        </p>
        <demo-labelling-host
          id="labelling-mixin-warn-host-aria"
          aria-label="Ignored host aria-label"
        ></demo-labelling-host>
      </section>

      <section>
        <p style="margin: 0 0 8px;">
          <strong>
            Unresolved
            <code>accessible-labelledby</code>
          </strong>
          <br />
          The referenced
          <code>id</code>
          does not exist in the field's root, so the accessible name never
          resolves.
        </p>
        <demo-labelling-host
          id="labelling-mixin-warn-unresolved-labelledby"
          accessible-labelledby="labelling-mixin-missing-id"
        ></demo-labelling-host>
      </section>
    </div>
  `,
  tags: ['behaviors'],
  parameters: {
    a11y: {
      // reason: each example intentionally triggers a `LabellingMixin`
      // dev-mode warning, so axe-core's "Form element does not have a label"
      // rule fires by design. The stories exist to surface those warnings;
      // scope the axe exclusion to just these hosts.
      exclude: {
        label: [
          '#labelling-mixin-warn-missing-name',
          '#labelling-mixin-warn-placeholder-only',
          '#labelling-mixin-warn-host-aria',
          '#labelling-mixin-warn-unresolved-labelledby',
        ],
      },
    },
  },
};
OtherDevWarnings.storyName = 'Other dev-mode warnings';

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

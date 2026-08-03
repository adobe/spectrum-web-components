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

import { html, type TemplateResult } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';

import './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * `AttributeObserverController` is a Lit `ReactiveController` that watches a set
 * of host attributes and requests a host re-render whenever one of them changes.
 * It exists for state that lives in plain HTML attributes rather than reactive
 * properties (most notably `aria-label` / `aria-labelledby`), because mutating
 * those does not trigger Lit's update cycle, so any `updated()` logic that reads
 * them would otherwise go stale.
 *
 * Like [Slot presence controller](../?path=/docs/core-controllers-slot-presence-controller--docs),
 * it uses a `MutationObserver` and calls `host.requestUpdate()`; the host's own
 * `updated()` then re-runs. Pass `{ debugOnly: true }` to attach the observer
 * only while dev-mode validation is active, so it costs nothing in production.
 */
const meta: Meta = {
  title: 'Controllers/Attribute observer controller',
  component: 'demo-attribute-observer-host',
  render: () => html`
    <demo-attribute-observer-host
      aria-label="Upload files"
    ></demo-attribute-observer-host>
  `,
  parameters: {
    docs: {
      subtitle:
        'Requests a host re-render when watched host attributes change.',
    },
    layout: 'centered',
  },
  tags: ['migrated', 'controller'],
};

export default meta;

type Story = StoryObj;

// ────────────────────
//    HELPERS
// ────────────────────

const CYCLE = ['Upload files', 'Drop files here', 'Add attachments'];

/**
 * Changes `aria-label` on both demo boxes at once, from outside the elements,
 * so the only difference between them is whether they run the controller.
 */
const changeBothLabels = (event: Event): void => {
  const root = (event.currentTarget as HTMLElement).closest('[data-demo]');
  const boxes = root?.querySelectorAll<HTMLElement>(
    'demo-attribute-observer-host, demo-attribute-observer-stale-host'
  );
  if (!boxes?.length) {
    return;
  }
  const current = boxes[0].getAttribute('aria-label') ?? '';
  const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
  boxes.forEach((box) => box.setAttribute('aria-label', next));
};

const comparison = (): TemplateResult => html`
  <div
    data-demo
    style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;"
  >
    <div style="display: flex; gap: 24px; align-items: flex-start;">
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <span>With observer</span>
        <demo-attribute-observer-host
          aria-label="Upload files"
        ></demo-attribute-observer-host>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <span>Without observer</span>
        <demo-attribute-observer-stale-host
          aria-label="Upload files"
        ></demo-attribute-observer-stale-host>
      </div>
    </div>
    <button type="button" class="swc-Button" @click=${changeBothLabels}>
      Change aria-label on both
    </button>
  </div>
`;

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
  render: () => comparison(),
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const RevalidateOnChange: Story = {
  render: () => comparison(),
  tags: ['behaviors'],
};
RevalidateOnChange.storyName = 'Revalidate on attribute change';

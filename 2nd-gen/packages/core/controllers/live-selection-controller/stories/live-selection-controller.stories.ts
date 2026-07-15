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

import type { LiveSelectionMode } from '@spectrum-web-components/core/controllers/index.js';

import './demo-hosts.js';

// ────────────────
//    METADATA
// ────────────────

const args = {
  mode: 'single' as LiveSelectionMode,
};

const argTypes = {
  mode: {
    control: 'select',
    options: ['single', 'multiple'],
    description:
      '`single` allows at most one open item; `multiple` imposes no constraint.',
    table: {
      category: 'Options',
      defaultValue: { summary: 'single' },
    },
  },
};

/**
 * `LiveSelectionController` enforces a selection constraint on a group of
 * items that each own their own selected state. It is intentionally minimal:
 * items manage their own `open` property and dispatch a change event; the
 * controller observes those events and deselects siblings when `mode` is
 * `'single'`.
 *
 * Use it for patterns like accordions and disclosure groups where items are
 * self-contained and the host does not cache selection centrally.
 */
const meta: Meta = {
  title: 'Controllers/Live selection controller',
  component: 'demo-live-selection-group',
  args,
  argTypes,
  render: (args) => html`
    <demo-live-selection-group mode=${args.mode}>
      <demo-live-selection-item label="Panel one">
        Content for panel one. Each item owns its own open state.
      </demo-live-selection-item>
      <demo-live-selection-item label="Panel two">
        Content for panel two.
      </demo-live-selection-item>
      <demo-live-selection-item label="Panel three">
        Content for panel three.
      </demo-live-selection-item>
    </demo-live-selection-group>
  `,
  parameters: {
    docs: {
      subtitle: 'Selection constraint for self-owning disclosure groups',
    },
  },
  tags: ['controller'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  args: { mode: 'single' },
  tags: ['dev'],
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  args: { mode: 'single' },
  tags: ['overview'],
};

// ──────────────────────────────
//    BEHAVIORS STORIES
// ──────────────────────────────

export const SingleMode: Story = {
  render: () => html`
    <demo-live-selection-group mode="single">
      <demo-live-selection-item label="Section A">
        Only one section can be open at a time.
      </demo-live-selection-item>
      <demo-live-selection-item label="Section B" open>
        Opening this section closes any other open section.
      </demo-live-selection-item>
      <demo-live-selection-item label="Section C">
        Try opening any section; the others close automatically.
      </demo-live-selection-item>
    </demo-live-selection-group>
  `,
  tags: ['behaviors'],
};
SingleMode.storyName = 'Single mode';

export const MultipleMode: Story = {
  render: () => html`
    <demo-live-selection-group mode="multiple">
      <demo-live-selection-item label="Section A" open>
        Multiple sections can be open at the same time.
      </demo-live-selection-item>
      <demo-live-selection-item label="Section B" open>
        Opening a section does not close the others.
      </demo-live-selection-item>
      <demo-live-selection-item label="Section C">
        Toggle any section independently.
      </demo-live-selection-item>
    </demo-live-selection-group>
  `,
  tags: ['behaviors'],
};
MultipleMode.storyName = 'Multiple mode';

export const CanceledEvent: Story = {
  render: () => {
    const group = document.createElement('demo-live-selection-group');
    group.mode = 'single';

    const items = ['Allow open', 'Cancel open (locked)', 'Allow open'].map(
      (label, i) => {
        const item = document.createElement('demo-live-selection-item');
        item.label = label;
        if (i === 0) {
          item.open = true;
        }
        group.appendChild(item);
        return item;
      }
    );

    // Cancel toggle events on the second item so it can never open.
    items[1].addEventListener('demo-toggle', (event) => {
      event.preventDefault();
    });

    return group;
  },
  tags: ['behaviors'],
};
CanceledEvent.storyName = 'Canceled event';

function switchToSingle(): void {
  const group = document.getElementById('refresh-group') as HTMLElement & {
    mode: string;
    refresh: () => void;
  };
  group.mode = 'single';
  group.refresh();
}

function switchToMultiple(): void {
  const group = document.getElementById('refresh-group') as HTMLElement & {
    mode: string;
  };
  group.mode = 'multiple';
}

export const ProgrammaticRefresh: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <demo-live-selection-group id="refresh-group" mode="multiple">
        <demo-live-selection-item label="Section A" open>
          Open in multiple mode.
        </demo-live-selection-item>
        <demo-live-selection-item label="Section B" open>
          Also open in multiple mode.
        </demo-live-selection-item>
        <demo-live-selection-item label="Section C">
          Closed.
        </demo-live-selection-item>
      </demo-live-selection-group>
      <div style="display: flex; gap: 8px;">
        <button @click=${switchToSingle}>
          Switch to single mode + refresh
        </button>
        <button @click=${switchToMultiple}>Switch to multiple mode</button>
      </div>
    </div>
  `,
  tags: ['behaviors'],
};
ProgrammaticRefresh.storyName = 'Programmatic refresh';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: () => html`
    <demo-live-selection-group
      mode="single"
      aria-label="Frequently asked questions"
    >
      <demo-live-selection-item label="What is LiveSelectionController?">
        A Lit reactive controller that enforces a selection constraint on groups
        of self-owning items.
      </demo-live-selection-item>
      <demo-live-selection-item label="When should I use it?">
        Use it when items manage their own open/selected state and the host only
        needs to enforce how many can be active at once.
      </demo-live-selection-item>
      <demo-live-selection-item label="Does it own item interaction?">
        No. Items dispatch their own toggle events. The controller only observes
        and enforces the group constraint.
      </demo-live-selection-item>
    </demo-live-selection-group>
  `,
  tags: ['a11y'],
};

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
  acceptFiles: true,
};

const argTypes = {
  acceptFiles: {
    control: 'boolean',
    description:
      'When true, the host rejects drag payloads that do not include files.',
    table: { category: 'Options', defaultValue: { summary: 'true' } },
  },
};

/**
 * `DragAndDropController` wires native drag events to a Lit host while leaving
 * the dragged state and drop handling with that host. It is used by components
 * such as `Dropzone` and `PromptField`.
 */
const meta: Meta = {
  title: 'Controllers/Drag and drop controller',
  component: 'demo-drag-and-drop-host',
  args,
  argTypes,
  render: (args) => html`
    <demo-drag-and-drop-host
      ?accept-files=${args.acceptFiles}
    ></demo-drag-and-drop-host>
  `,
  parameters: {
    docs: {
      subtitle: 'Native drag-and-drop event wiring for Lit hosts.',
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

export const AcceptedFileDrops: Story = {
  tags: ['behaviors'],
};
AcceptedFileDrops.storyName = 'Accepted file drops';

export const RejectedPayloads: Story = {
  render: () => html`
    <demo-drag-and-drop-host accept-files></demo-drag-and-drop-host>
  `,
  tags: ['behaviors'],
};
RejectedPayloads.storyName = 'Rejected payloads';

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
};

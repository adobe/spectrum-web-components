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

import '../index.js';
import '@adobe/spectrum-wc/icon';

import { ThreeDotsIcon } from '../../utils/icons/index.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-user-message');

argTypes.modality = {
  ...argTypes.modality,
  control: { type: 'select' },
  options: ['full-screen', 'split-right-rail', 'panel'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'full-screen' },
  },
};

argTypes.content = {
  ...argTypes.content,
  control: { type: 'select' },
  options: ['copy', 'card', 'image'],
  table: {
    category: 'attributes',
    defaultValue: { summary: 'copy' },
  },
};

/**
 * A user-authored message bubble rendered in the conversational AI thread.
 * It adapts its max-width to the host modality and its padding to the content type.
 */
const meta: Meta = {
  title: 'Conversational AI/User message',
  component: 'swc-user-message',
  args,
  argTypes,
  render: (args) => template(args),
  decorators: [
    (story) => html`
      <div style="display:flex;flex-direction:column;align-items:flex-end;">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    docs: {
      subtitle: 'User-submitted message rendered in the thread.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export default meta;

// ────────────────────
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  args: {
    modality: 'full-screen',
    content: 'copy',
    'default-slot':
      'Can you help me create a 45-minute presentation, with animations, for an executive update?',
  },
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  args: {
    modality: 'full-screen',
    content: 'copy',
    'default-slot':
      'Can you help me create a 45-minute presentation, with animations, for an executive update?',
  },
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A user message consists of:
 *
 * 1. **Bubble** — Rounded container with a neutral gray background (`gray-50`)
 * 2. **Default slot** — The message content: plain text (`copy`), a card attachment (`card`), or an image asset (`image`)
 */
export const Anatomy: Story = {
  render: () => html`
    <swc-user-message content="copy">
      Can you help me create a 45-minute presentation?
    </swc-user-message>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The `modality` attribute constrains the bubble's maximum width to match the host UI context:
 *
 * - **`full-screen`** — max 536px (default)
 * - **`split-right-rail`** — max 440px
 * - **`panel`** — max 360px
 */
export const Modality: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <swc-user-message modality="full-screen" content="copy">
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Full screen
        </span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <swc-user-message modality="split-right-rail" content="copy">
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Split / Right rail
        </span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <swc-user-message modality="panel" content="copy">
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Panel
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

/**
 * The `content` attribute adjusts the bubble's padding to match the type of content:
 *
 * - **`copy`** — standard text padding (default)
 * - **`card`** — reduced padding (`75` token scale) to frame horizontal card content
 * - **`image`** — standard padding for image/asset card content
 */
export const Content: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <swc-user-message content="copy">
          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Copy
        </span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <swc-user-message content="card">
          <div
            style="display:flex;gap:16px;align-items:center;padding:16px;background:var(--swc-gray-75);border-radius:8px;"
          >
            <div
              style="width:32px;height:32px;border-radius:3px;background:var(--swc-gray-200);flex-shrink:0;"
            ></div>
            <div style="flex:1;min-width:0;">
              <div
                style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-100);font-weight:700;color:var(--swc-gray-900);"
              >
                Hilton commercial assets
              </div>
              <div
                style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
              >
                2026
              </div>
            </div>
            <button
              style="display:inline-flex;align-items:center;justify-content:center;padding:0;background:transparent;border:none;cursor:pointer;color:var(--swc-gray-700);flex-shrink:0;"
              aria-label="More options"
            >
              <swc-icon label="More options" style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;">
                ${ThreeDotsIcon()}
              </swc-icon>
            </button>
          </div>
        </swc-user-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Card
        </span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
        <swc-user-message content="image">
          <div style="display:flex;flex-direction:column;gap:8px;width:200px;">
            <div
              style="width:200px;height:150px;border-radius:10px;overflow:hidden;"
            >
              <div
                style="width:100%;height:100%;background:linear-gradient(135deg,#a78bfa,#f472b6);"
              ></div>
            </div>
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
              <div>
                <div
                  style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-100);font-weight:700;color:var(--swc-gray-900);"
                >
                  Hilton commercial assets
                </div>
                <div
                  style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-700);"
                >
                  2026
                </div>
              </div>
              <button
                style="display:inline-flex;align-items:center;justify-content:center;padding:0;background:transparent;border:none;cursor:pointer;color:var(--swc-gray-700);flex-shrink:0;"
                aria-label="More options"
              >
                <swc-icon label="More options" style="--swc-icon-inline-size:20px;--swc-icon-block-size:20px;">
                  ${ThreeDotsIcon()}
                </swc-icon>
              </button>
            </div>
          </div>
        </swc-user-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Image
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 2 },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-user-message>` element implements the following accessibility features:
 *
 * #### Semantic structure
 *
 * - The bubble is rendered as a `<div>` acting as a visual container
 * - The default slot accepts any content; consumers are responsible for providing meaningful text alternatives when slotting non-text content (cards, images)
 *
 * ### Best practices
 *
 * - Ensure message text is descriptive and self-contained
 * - When using `content="card"` or `content="image"`, make sure slotted content includes appropriate text labels and `alt` text for images
 */
export const Accessibility: Story = {
  render: () => html`
    <swc-user-message content="copy">
      Can you help me create a 45-minute presentation, with animations, for an
      executive update?
    </swc-user-message>
  `,
  tags: ['a11y'],
};

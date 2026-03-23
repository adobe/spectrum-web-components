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

import '../index.js';

// ────────────────
//    METADATA
// ────────────────

/**
 * Container for AI-generated response content in a conversational thread.
 * Accepts rich slotted content — text, headings, lists, and custom elements.
 */
const meta: Meta = {
  title: 'Conversational AI/System message',
  component: 'swc-system-message',
  parameters: {
    docs: {
      subtitle: 'AI-generated response content container.',
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
  render: () => html`
    <swc-system-message>
      <p>
        Sure! Here's a 45-minute executive presentation outline with animations:
      </p>
    </swc-system-message>
  `,
  tags: ['autodocs', 'dev'],
};

// ──────────────────────────────
//    OVERVIEW STORY
// ──────────────────────────────

export const Overview: Story = {
  render: () => html`
    <swc-system-message>
      <p>
        Sure! Here's a 45-minute executive presentation outline with animations:
      </p>
      <ul>
        <li>Introduction — 5 min</li>
        <li>Key metrics — 10 min</li>
        <li>Roadmap — 15 min</li>
        <li>Q&amp;A — 15 min</li>
      </ul>
    </swc-system-message>
  `,
  tags: ['overview'],
};

// ──────────────────────────
//    ANATOMY STORY
// ──────────────────────────

/**
 * A system message is a transparent container that applies typography styles
 * to its slotted content. It accepts:
 *
 * - **Plain text / paragraphs** — `<p>` elements
 * - **Headings** — `<h1>`, `<h2>`, `<h3>`
 * - **Lists** — `<ul>`, `<ol>` with `<li>` items
 * - **Links** — `<a>` elements
 */
export const Anatomy: Story = {
  render: () => html`
    <swc-system-message>
      <p>This is a paragraph response.</p>
    </swc-system-message>
  `,
  tags: ['anatomy'],
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

/**
 * The default slot accepts any structured content. Common patterns include
 * plain copy, lists, and mixed heading + body.
 */
export const ContentTypes: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:32px;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-system-message>
          <p>
            Sure! Here's a 45-minute executive presentation outline with
            animations.
          </p>
        </swc-system-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Copy
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-system-message>
          <ul>
            <li>Introduction — 5 min</li>
            <li>Key metrics — 10 min</li>
            <li>Roadmap — 15 min</li>
            <li>Q&amp;A — 15 min</li>
          </ul>
        </swc-system-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          List
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <swc-system-message>
          <p
            style="font-size:var(--swc-font-size-300);font-weight:800;line-height:var(--swc-line-height-font-size-300);color:var(--swc-gray-900);margin:0;"
          >
            Presentation outline
          </p>
          <p>A structured 45-minute deck for your executive update.</p>
          <ul>
            <li>Introduction — 5 min</li>
            <li>Key metrics — 10 min</li>
          </ul>
        </swc-system-message>
        <span
          style="font-family:var(--swc-sans-serif-font);font-size:var(--swc-font-size-75);color:var(--swc-gray-600);"
        >
          Heading + body + list
        </span>
      </div>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORY
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-system-message>` element implements the following accessibility features:
 *
 * #### Semantic structure
 *
 * - The container is a transparent `<div>` that preserves the semantic structure of slotted content
 * - Consumers are responsible for providing correct heading hierarchy and list markup
 * - Links slotted via `<a>` should include descriptive text or `aria-label`
 */
export const Accessibility: Story = {
  render: () => html`
    <swc-system-message>
      <p>
        Sure! Here's a 45-minute executive presentation outline with animations.
      </p>
      <ul>
        <li>Introduction — 5 min</li>
        <li>Key metrics — 10 min</li>
        <li>Roadmap — 15 min</li>
        <li>Q&amp;A — 15 min</li>
      </ul>
    </swc-system-message>
  `,
  tags: ['a11y'],
};

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

import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../conversation-turn/index.js';
import '../../upload-artifact/index.js';
import '../index.js';

const withUserTurn = (story: () => unknown) => html`
  <swc-conversation-turn type="user">${story()}</swc-conversation-turn>
`;

const meta: Meta = {
  title: 'Conversational AI/User message',
  component: 'swc-user-message',
  parameters: {
    docs: {
      subtitle:
        'User-submitted message rendered in the thread with optional media artifacts, file artifacts, and text.',
    },
    layout: 'padded',
  },
  excludeStories: ['meta'],
};

export { meta };
export default meta;

export const Playground: Story = {
  render: () => html`
    <swc-user-message>
      Can you help me create a 45-minute presentation, with animations, for an
      executive update?
    </swc-user-message>
  `,
  decorators: [withUserTurn],
  tags: ['autodocs', 'dev'],
};

export const Overview: Story = {
  render: () => html`
    <swc-user-message>
      Can you help me create a 45-minute presentation, with animations, for an
      executive update?
    </swc-user-message>
  `,
  decorators: [withUserTurn],
  tags: ['overview'],
};

export const Content: Story = {
  render: () => html`
    <div
      style="display:flex;flex-direction:column;gap:32px;max-inline-size:800px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message>
          <swc-upload-artifact slot="artifacts-media" type="media">
            <div
              slot="thumbnail"
              style="background:linear-gradient(135deg,#a78bfa,#f43f5e);"
              role="img"
              aria-label="Campaign still"
            ></div>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifacts-media" type="media">
            <div
              slot="thumbnail"
              style="background:linear-gradient(135deg,#7c3aed,#ef4444);"
              role="img"
              aria-label="Storyboard frame"
            ></div>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifacts-media" type="media">
            <div
              slot="thumbnail"
              style="background:linear-gradient(135deg,#818cf8,#ec4899);"
              role="img"
              aria-label="Moodboard"
            ></div>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifacts-media" type="media">
            <div
              slot="thumbnail"
              style="background:linear-gradient(135deg,#c084fc,#f43f5e);"
              role="img"
              aria-label="Title slide"
            ></div>
          </swc-upload-artifact>

          <swc-upload-artifact slot="artifacts-file" type="card">
            <div slot="thumbnail" role="img" aria-label="Excel"></div>
            <span slot="title">Launch brief budget</span>
            <span slot="subtitle">Excel</span>
          </swc-upload-artifact>
          <swc-upload-artifact slot="artifacts-file" type="card">
            <div slot="thumbnail" role="img" aria-label="PDF"></div>
            <span slot="title">FY26Q1 Competitor analysis</span>
            <span slot="subtitle">PDF</span>
          </swc-upload-artifact>

          Can you help me create a 45-minute presentation, with animations, for
          an executive update?
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  parameters: { 'section-order': 1 },
  tags: ['options'],
};

export const OverflowIndicator: Story = {
  render: () => html`
    <swc-user-message>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#a78bfa,#f43f5e);"
          role="img"
          aria-label="Campaign still"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#7c3aed,#ef4444);"
          role="img"
          aria-label="Storyboard frame"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#818cf8,#ec4899);"
          role="img"
          aria-label="Moodboard"
        ></div>
      </swc-upload-artifact>
      <button
        slot="artifacts-media"
        class="swc-UserMessage-overflow-indicator"
        type="button"
      >
        View all (8)
      </button>

      <swc-upload-artifact slot="artifacts-file" type="card">
        <div slot="thumbnail" role="img" aria-label="Excel"></div>
        <span slot="title">Launch brief budget</span>
        <span slot="subtitle">Excel</span>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-file" type="card">
        <div slot="thumbnail" role="img" aria-label="PDF"></div>
        <span slot="title">FY26Q1 Competitor analysis</span>
        <span slot="subtitle">PDF</span>
      </swc-upload-artifact>

      Can you help me create a 45-minute presentation, with animations, for an
      executive update?
    </swc-user-message>
  `,
  decorators: [withUserTurn],
  tags: ['states'],
};

@customElement('swc-user-message-overflow-demo')
class UserMessageOverflowDemo extends LitElement {
  @state()
  private open = false;

  protected override createRenderRoot(): this {
    return this;
  }

  private _openOverlay(): void {
    this.open = true;
  }

  private _closeOverlay(): void {
    this.open = false;
  }

  public override render() {
    return html`
      <div style="position:relative;inline-size:800px;min-block-size:520px;">
        <swc-conversation-turn type="user">
          <swc-user-message
            @swc-user-message-view-all-click=${this._openOverlay}
          >
            <swc-upload-artifact slot="artifacts-media" type="media">
              <div
                slot="thumbnail"
                style="background:linear-gradient(135deg,#a78bfa,#f43f5e);"
                role="img"
                aria-label="Campaign still"
              ></div>
            </swc-upload-artifact>
            <swc-upload-artifact slot="artifacts-media" type="media">
              <div
                slot="thumbnail"
                style="background:linear-gradient(135deg,#7c3aed,#ef4444);"
                role="img"
                aria-label="Storyboard frame"
              ></div>
            </swc-upload-artifact>
            <swc-upload-artifact slot="artifacts-media" type="media">
              <div
                slot="thumbnail"
                style="background:linear-gradient(135deg,#818cf8,#ec4899);"
                role="img"
                aria-label="Moodboard"
              ></div>
            </swc-upload-artifact>
            <button
              slot="artifacts-media"
              class="swc-UserMessage-overflow-indicator"
              type="button"
            >
              View all (8)
            </button>
            <swc-upload-artifact slot="artifacts-file" type="card">
              <div slot="thumbnail" role="img" aria-label="Excel"></div>
              <span slot="title">Launch brief budget</span>
              <span slot="subtitle">Excel</span>
            </swc-upload-artifact>
            <swc-upload-artifact slot="artifacts-file" type="card">
              <div slot="thumbnail" role="img" aria-label="PDF"></div>
              <span slot="title">FY26Q1 Competitor analysis</span>
              <span slot="subtitle">PDF</span>
            </swc-upload-artifact>
            Can you help me create a 45-minute presentation, with animations,
            for an executive update?
          </swc-user-message>
        </swc-conversation-turn>

        ${this.open
          ? html`
              <div
                style="position:absolute;inset:0;background:rgb(0 0 0 / 52%);display:flex;align-items:center;justify-content:center;"
              >
                <div
                  style="display:grid;grid-template-columns:repeat(4,128px);gap:8px;padding:20px;background:token('gray-25');border-radius:token('corner-radius-200');"
                >
                  ${Array.from({ length: 8 }).map(
                    (_, i) => html`
                      <div
                        style="inline-size:128px;block-size:128px;border-radius:token('corner-radius-200');background:linear-gradient(135deg,#a78bfa,#f43f5e);"
                        role="img"
                        aria-label=${`Full artifact ${i + 1}`}
                      ></div>
                    `
                  )}
                </div>
                <button
                  type="button"
                  @click=${this._closeOverlay}
                  style="position:absolute;inset-block-start:16px;inset-inline-end:16px;"
                >
                  Close
                </button>
              </div>
            `
          : null}
      </div>
    `;
  }
}

void UserMessageOverflowDemo;

export const ViewAllOverlay: Story = {
  render: () => html`
    <swc-user-message-overflow-demo></swc-user-message-overflow-demo>
  `,
  tags: ['states'],
};

export const MediaGrid: Story = {
  render: () => html`
    <swc-user-message>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#a78bfa,#f43f5e);"
          role="img"
          aria-label="Campaign still 1"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#7c3aed,#ef4444);"
          role="img"
          aria-label="Campaign still 2"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#818cf8,#ec4899);"
          role="img"
          aria-label="Campaign still 3"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#c084fc,#f43f5e);"
          role="img"
          aria-label="Campaign still 4"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#6366f1,#f97316);"
          role="img"
          aria-label="Campaign still 5"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#8b5cf6,#ef4444);"
          role="img"
          aria-label="Campaign still 6"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#a855f7,#ec4899);"
          role="img"
          aria-label="Campaign still 7"
        ></div>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-media" type="media">
        <div
          slot="thumbnail"
          style="background:linear-gradient(135deg,#9333ea,#f43f5e);"
          role="img"
          aria-label="Campaign still 8"
        ></div>
      </swc-upload-artifact>

      <swc-upload-artifact slot="artifacts-file" type="card">
        <div slot="thumbnail" role="img" aria-label="Excel"></div>
        <span slot="title">Launch brief budget</span>
        <span slot="subtitle">Excel</span>
      </swc-upload-artifact>
      <swc-upload-artifact slot="artifacts-file" type="card">
        <div slot="thumbnail" role="img" aria-label="PDF"></div>
        <span slot="title">FY26Q1 Competitor analysis</span>
        <span slot="subtitle">PDF</span>
      </swc-upload-artifact>

      Can you help me create a 45-minute presentation, with animations, for an
      executive update?
    </swc-user-message>
  `,
  decorators: [withUserTurn],
  tags: ['states'],
};

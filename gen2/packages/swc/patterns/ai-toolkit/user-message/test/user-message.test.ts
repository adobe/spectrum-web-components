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
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '@adobe/spectrum-wc/components/thumbnail/swc-thumbnail.js';
import '../../upload-attachment/swc-upload-attachment.js';
import '../swc-user-message.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { meta } from '../stories/user-message.stories.js';
import type { UserMessage } from '../UserMessage.js';

export default {
  ...meta,
  title: 'AI Toolkit/User message/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const ContentTest: Story = {
  render: () => html`
    <div style="inline-size:320px;max-inline-size:100%;">
      <swc-user-message>Summarize these references.</swc-user-message>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const message = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );
    expect(message.type).toBeUndefined();
    expect(message.hasAttribute('type')).toBe(false);
    expect(
      message.shadowRoot!.querySelector('slot')!.assignedNodes()[0].textContent
    ).toContain('Summarize these references.');

    for (const type of ['media', 'card'] as const) {
      await step(
        `renders a named, keyboard-accessible ${type} collection`,
        async () => {
          message.type = type;
          message.innerHTML =
            type === 'media'
              ? '<img slot="thumbnail" src="images/card-preview.jpg" alt="Campaign reference" />'
              : `<swc-upload-attachment slot="thumbnail" type="card">
              <swc-thumbnail slot="thumbnail" decorative></swc-thumbnail>
              <span slot="title">Campaign brief.pdf</span>
              <span slot="subtitle">840 KB</span>
            </swc-upload-attachment>`;
          message.append('Copy belongs in a separate message.');
          await message.updateComplete;

          const slot = message.shadowRoot!.querySelector<HTMLSlotElement>(
            'slot[name="thumbnail"]'
          )!;
          const group = message.shadowRoot!.querySelector('[role="group"]')!;
          expect(message.getAttribute('type')).toBe(type);
          expect(slot.assignedElements()).toHaveLength(1);
          expect(
            message.shadowRoot!.querySelector('slot:not([name])')
          ).toBeNull();
          expect(group).not.toBeNull();
          expect(group.getAttribute('aria-label')).toBe(
            type === 'card' ? 'Uploaded documents' : 'Uploaded images'
          );
          expect(group.getAttribute('tabindex')).toBe('0');
          expect(message.scrollWidth).toBeLessThanOrEqual(message.clientWidth);
          if (type === 'card') {
            expect(
              message.querySelector('swc-thumbnail[decorative]')
            ).not.toBeNull();
            expect(
              message.querySelector('img, swc-asset, [dismissible]')
            ).toBeNull();
          }
          if (type === 'media') {
            message.removeAttribute('type');
          } else {
            message.type = undefined;
          }
          await message.updateComplete;
          expect(message.hasAttribute('type')).toBe(false);
          expect(
            message.shadowRoot!.querySelector('slot:not([name])')
          ).not.toBeNull();
          expect(
            message.shadowRoot!.querySelector('[role="group"]')
          ).toBeNull();
        }
      );
    }
  },
};

export const OverflowTest: Story = {
  render: () => html`
    <div style="inline-size:220px;max-inline-size:100%;">
      <swc-user-message type="media">
        ${Array.from(
          { length: 24 },
          (_, index) => html`
            <img
              slot="thumbnail"
              src="images/card-preview.jpg"
              alt="Reference ${index + 1}"
            />
          `
        )}
      </swc-user-message>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const message = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );
    const viewport =
      message.shadowRoot!.querySelector<HTMLElement>('[role="group"]')!;

    await step(
      'hugs columns, caps the bubble, and scrolls without horizontal overflow',
      async () => {
        expect(viewport).not.toBeNull();
        expect(message.getBoundingClientRect().height).toBeLessThanOrEqual(240);
        expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
        expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth);
        expect(getComputedStyle(viewport).overflowY).toBe('auto');
        for (const width of ['480px', '220px', '120px']) {
          message.parentElement!.style.inlineSize = width;
          const bounds = message.getBoundingClientRect();
          const thumbnails = [...message.children].map((item) =>
            item.getBoundingClientRect()
          );
          const style = getComputedStyle(message);
          const occupied =
            Math.max(...thumbnails.map((item) => item.right)) -
            Math.min(...thumbnails.map((item) => item.left));
          const paddingAndBorders =
            parseFloat(style.paddingInlineStart) +
            parseFloat(style.paddingInlineEnd) +
            parseFloat(style.borderInlineStartWidth) +
            parseFloat(style.borderInlineEndWidth);
          expect(
            Math.abs(bounds.width - occupied - paddingAndBorders)
          ).toBeLessThanOrEqual(
            viewport.offsetWidth - viewport.clientWidth + 1
          );
        }
        viewport.focus();
        expect(message.shadowRoot!.activeElement).toBe(viewport);
        viewport.scrollTop = viewport.scrollHeight;
        await waitFor(() => expect(viewport.scrollTop).toBeGreaterThan(0));
      }
    );

    await step(
      'returns to natural height when attachments no longer overflow',
      async () => {
        [...message.children]
          .slice(1)
          .forEach((attachment) => attachment.remove());
        await waitFor(() => {
          expect(viewport.scrollHeight).toBeLessThanOrEqual(
            viewport.clientHeight
          );
          expect(message.getBoundingClientRect().height).toBeLessThan(240);
          expect(getComputedStyle(viewport).maskImage).toBe('none');
        });
        expect(viewport.getAttribute('tabindex')).toBe('0');
      }
    );
  },
};

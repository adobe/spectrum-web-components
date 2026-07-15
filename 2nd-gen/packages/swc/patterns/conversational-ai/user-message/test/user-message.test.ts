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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../conversation-turn/swc-conversation-turn.js';
import '../swc-user-message.js';

import { getComponent, getComponents } from '../../../../utils/test-utils.js';
import { meta, Overview } from '../stories/user-message.stories.js';
import { UserMessage } from '../UserMessage.js';

export default {
  ...meta,
  title: 'Conversational AI/User message/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step('uses copy type by default', async () => {
      expect(el.type).toBe('copy');
      expect(el.getAttribute('type')).toBe('copy');
    });
  },
};

export const TypeAndSlotTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step(
      'type reflects to the host and drives card structure',
      async () => {
        el.type = 'card';
        el.innerHTML = `
        <div
          slot="thumbnail"
          role="img"
          aria-label="File preview"
        ></div>
        <span slot="title">Brand guidelines</span>
        <span slot="subtitle">PDF</span>
      `;
        await el.updateComplete;

        const title = el.shadowRoot?.querySelector('.swc-UserMessage-title');
        const subtitle = el.shadowRoot?.querySelector(
          '.swc-UserMessage-subtitle'
        );
        expect(el.getAttribute('type')).toBe('card');
        expect(title).toBeTruthy();
        expect(subtitle).toBeTruthy();
      }
    );

    await step(
      'media type renders the media attachment container',
      async () => {
        el.type = 'media';
        el.innerHTML = `
        <div slot="thumbnail" role="img" aria-label="Preview"></div>
        <span slot="title">Preview image</span>
        <span slot="subtitle">PNG</span>
      `;
        await el.updateComplete;

        const attachment = el.shadowRoot?.querySelector(
          '.swc-UserMessage-attachment--media'
        );
        expect(el.getAttribute('type')).toBe('media');
        expect(attachment).toBeTruthy();
      }
    );

    await step('copy type uses the default slot text path', async () => {
      el.type = 'copy';
      el.innerHTML = `Can you summarize this document?`;
      await el.updateComplete;

      const textSlot =
        el.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
      const assignedText = textSlot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent ?? '')
        .join('')
        .trim();

      expect(el.getAttribute('type')).toBe('copy');
      expect(assignedText).toBe('Can you summarize this document?');
    });
  },
};

export const DefaultSlotHiddenForAttachmentTypesTest: Story = {
  name: 'Default slot not used for card and media',
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    const attachmentMarkup = (label: string) => `
        <p data-test-default-slotted>${label}</p>
        <div slot="thumbnail" role="img" aria-label="Preview"></div>
        <span slot="title">T</span>
        <span slot="subtitle">S</span>
      `;

    for (const type of ['card', 'media'] as const) {
      await step(
        `type="${type}": no unnamed slot; default-slot children are not shown`,
        async () => {
          el.type = type;
          el.innerHTML = attachmentMarkup(
            'Default copy that must not appear in the bubble for attachment types.'
          );
          await el.updateComplete;

          expect(el.shadowRoot?.querySelector('slot:not([name])')).toBeNull();

          const leaked = el.querySelector<HTMLElement>(
            '[data-test-default-slotted]'
          );
          expect(leaked).toBeTruthy();
          const { width, height } = leaked!.getBoundingClientRect();
          expect(width * height).toBe(0);
        }
      );
    }

    await step(
      'type="copy" keeps an unnamed (default) slot in the shadow root',
      async () => {
        el.type = 'copy';
        el.innerHTML = 'Visible copy text';
        await el.updateComplete;

        const defaultSlot =
          el.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
        expect(defaultSlot).toBeTruthy();
      }
    );
  },
};

function attachmentsMarkup(mediaCount: number, cardCount: number): string {
  const media = Array.from(
    { length: mediaCount },
    (_, index) => `
      <swc-user-message-attachment type="media">
        <div slot="thumbnail" role="img" aria-label="Photo ${index + 1}"></div>
      </swc-user-message-attachment>
    `
  ).join('');

  const cards = Array.from(
    { length: cardCount },
    (_, index) => `
      <swc-user-message-attachment type="card">
        <div slot="thumbnail" role="img" aria-label="File icon"></div>
        <span slot="title">File ${index + 1}</span>
        <span slot="subtitle">1 MB</span>
      </swc-user-message-attachment>
    `
  ).join('');

  return media + cards;
}

export const AttachmentsGroupingTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step(
      'media count at or below the visible limit renders no disclosure',
      async () => {
        el.type = 'attachments';
        el.open = false;
        el.innerHTML = attachmentsMarkup(4, 1);
        await el.updateComplete;

        const toggle = el.shadowRoot?.querySelector(
          '.swc-UserMessage-attachments-toggle'
        );
        expect(toggle).toBeNull();

        const mediaChildren = Array.from(el.children).filter(
          (child) => child.getAttribute('type') !== 'card'
        );
        const cardChildren = Array.from(el.children).filter(
          (child) => child.getAttribute('type') === 'card'
        );
        expect(
          mediaChildren.every((child) => !child.hasAttribute('hidden'))
        ).toBe(true);
        expect(
          cardChildren.every((child) => !child.hasAttribute('hidden'))
        ).toBe(true);
        expect(
          mediaChildren.every(
            (child) => child.getAttribute('slot') === 'attachment-media'
          )
        ).toBe(true);
        expect(
          cardChildren.every(
            (child) => child.getAttribute('slot') === 'attachment-card'
          )
        ).toBe(true);
      }
    );

    await step(
      'media count above the visible limit hides overflow tiles and shows the disclosure',
      async () => {
        el.type = 'attachments';
        el.open = false;
        el.innerHTML = attachmentsMarkup(6, 0);
        await el.updateComplete;
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await el.updateComplete;

        const toggle = el.shadowRoot?.querySelector(
          '.swc-UserMessage-attachments-toggle'
        );
        expect(toggle).toBeTruthy();
        expect(toggle?.getAttribute('aria-expanded')).toBe('false');
        expect(toggle?.textContent?.trim()).toContain('Show all');

        const mediaChildren = Array.from(el.children);
        expect(mediaChildren.slice(0, 4).some((child) => child.hidden)).toBe(
          false
        );
        expect(mediaChildren.slice(4).every((child) => child.hidden)).toBe(
          true
        );
      }
    );

    await step(
      'clicking the disclosure reveals overflow tiles and fires the toggle event',
      async () => {
        let detail: { open: boolean } | undefined;
        el.addEventListener(
          'swc-user-message-toggle',
          (event) => {
            detail = (event as CustomEvent<{ open: boolean }>).detail;
          },
          { once: true }
        );

        const toggle = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UserMessage-attachments-toggle'
        );
        toggle?.click();
        await el.updateComplete;

        expect(el.open).toBe(true);
        expect(detail?.open).toBe(true);
        expect(toggle?.getAttribute('aria-expanded')).toBe('true');
        expect(toggle?.textContent?.trim()).toContain('Show less');
        expect(Array.from(el.children).every((child) => !child.hidden)).toBe(
          true
        );
      }
    );
  },
};

const longSpacedCopy =
  'This is a deliberately long line of user copy that should wrap within a narrow column without horizontal overflow. '.repeat(
    3
  );

const longUnbrokenFileName = `${'VeryLongAttachmentNamePortion'.repeat(12)}.pdf`;

/**
 * Exercises long copy in a tight column and a long unbroken card title
 * (ellipsis) so the bubble does not grow past its layout width.
 */
export const LongTextWrapTest: Story = {
  name: 'Long text wrap and containment',
  render: () => html`
    <div style="max-inline-size: 220px;">
      <swc-conversation-turn type="user">
        <swc-user-message>${longSpacedCopy}</swc-user-message>
      </swc-conversation-turn>
    </div>
    <div
      style="max-inline-size: 640px; margin-block-start: 32px; padding-inline: 1px;"
    >
      <swc-conversation-turn type="user">
        <swc-user-message type="card">
          <div
            slot="thumbnail"
            style="inline-size:32px;block-size:32px;border-radius:3px;background:var(--swc-gray-200);"
            role="img"
            aria-label="File"
          ></div>
          <span slot="title">${longUnbrokenFileName}</span>
          <span slot="subtitle">PDF</span>
        </swc-user-message>
      </swc-conversation-turn>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const [copyBubble, cardBubble] = await getComponents<UserMessage>(
      canvasElement,
      'swc-user-message'
    );

    await step(
      'long copy message does not overflow horizontally in a narrow column',
      async () => {
        expect(copyBubble.scrollWidth).toBeLessThanOrEqual(
          copyBubble.clientWidth + 1
        );
        expect(copyBubble.getBoundingClientRect().height).toBeGreaterThan(40);
      }
    );

    await step(
      'long unbroken card title is confined with ellipsis (no host overflow)',
      async () => {
        expect(cardBubble.scrollWidth).toBeLessThanOrEqual(
          cardBubble.clientWidth + 1
        );
      }
    );
  },
};

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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../swc-upload-attachment.js';

import { getComponent } from '../../../../utils/test-utils.js';
import meta, { Overview } from '../stories/upload-attachment.stories.js';
import { UploadAttachment } from '../UploadAttachment.js';

export default {
  ...meta,
  title: 'AI/Upload attachment/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UploadAttachment>(
      canvasElement,
      'swc-upload-attachment'
    );

    await step(
      'overview story renders a dismissible card attachment',
      async () => {
        expect(el.type).toBe('card');
        expect(el.dismissible).toBe(true);
        expect(el.dismissLabel).toBe('');
        expect(el.getAttribute('role')).toBe('group');
        expect(el.getAttribute('aria-label')).toBe('Hilton commercial assets');

        const dismissButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UploadAttachment-dismiss'
        );
        const dismissIcon = dismissButton?.querySelector(
          '.swc-UploadAttachment-dismiss-icon'
        );
        expect(dismissButton?.getAttribute('accessible-label')).toBe(
          'Remove Hilton commercial assets'
        );
        // swc-action-button delegates focus to its internal button, so the host
        // itself is tabindex -1 while remaining keyboard-reachable.
        expect(dismissButton?.shadowRoot?.delegatesFocus).toBe(true);
        expect(dismissIcon?.getAttribute('aria-hidden')).toBe('true');
      }
    );
  },
};

export const DismissEventTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UploadAttachment>(
      canvasElement,
      'swc-upload-attachment'
    );

    await step(
      'dismiss button emits swc-upload-attachment-dismiss with the host attachment',
      async () => {
        el.dismissLabel = 'Delete file';
        await el.updateComplete;

        let detail: { attachment: UploadAttachment } | undefined;
        el.addEventListener(
          'swc-upload-attachment-dismiss',
          (event) => {
            detail = (event as CustomEvent<{ attachment: UploadAttachment }>)
              .detail;
          },
          { once: true }
        );

        const dismissButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UploadAttachment-dismiss'
        );
        expect(dismissButton?.getAttribute('accessible-label')).toBe(
          'Delete file'
        );
        dismissButton?.click();

        expect(detail?.attachment).toBe(el);
      }
    );

    await step(
      'dismiss button supports keyboard activation (Enter and Space)',
      async () => {
        const dismissButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UploadAttachment-dismiss'
        );

        let enterCount = 0;
        el.addEventListener(
          'swc-upload-attachment-dismiss',
          () => {
            enterCount += 1;
          },
          { once: true }
        );

        dismissButton?.focus();
        await userEvent.keyboard('{Enter}');
        expect(enterCount).toBe(1);

        let spaceCount = 0;
        el.addEventListener(
          'swc-upload-attachment-dismiss',
          () => {
            spaceCount += 1;
          },
          { once: true }
        );
        dismissButton?.focus();
        await userEvent.keyboard(' ');
        expect(spaceCount).toBe(1);
      }
    );
  },
};

export const DismissSizeOverrideTest: Story = {
  render: () => html`
    <swc-upload-attachment
      dismissible
      style="--swc-upload-attachment-dismiss-visual-size: 40px;"
    >
      Hilton commercial assets
    </swc-upload-attachment>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UploadAttachment>(
      canvasElement,
      'swc-upload-attachment'
    );

    await step(
      'dismiss-visual-size scales the button as a square',
      async () => {
        const dismissButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UploadAttachment-dismiss'
        );
        const dismissButtonStyle =
          dismissButton && getComputedStyle(dismissButton);

        // The dismiss button is a round icon button, so the single visual-size
        // custom property drives both dimensions.
        expect(dismissButtonStyle?.inlineSize).toBe('40px');
        expect(dismissButtonStyle?.blockSize).toBe('40px');
      }
    );
  },
};

export const MediaPreviewOnlyTest: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-upload-attachment type="media">
        <div
          slot="thumbnail"
          style="inline-size:100%;block-size:196px;background:linear-gradient(135deg,#a78bfa,#f472b6);"
          role="img"
          aria-label="Campaign preview"
        ></div>
      </swc-upload-attachment>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UploadAttachment>(
      canvasElement,
      'swc-upload-attachment'
    );

    await step('media attachment has type="media"', async () => {
      expect(el.type).toBe('media');
    });
  },
};

export const MediaBadgeTest: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;">
      <swc-upload-attachment type="media" dismissible>
        <img
          slot="thumbnail"
          src="https://picsum.photos/id/823/68/68"
          alt="Tagged preview"
          style="inline-size:100%;block-size:100%;object-fit:cover;"
        />
        <span slot="badge">PDF</span>
      </swc-upload-attachment>
      <swc-upload-attachment type="media" dismissible>
        <img
          slot="thumbnail"
          src="https://picsum.photos/id/64/68/68"
          alt="Plain preview"
          style="inline-size:100%;block-size:100%;object-fit:cover;"
        />
      </swc-upload-attachment>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const attachments = canvasElement.querySelectorAll('swc-upload-attachment');

    await step(
      'badge slot renders a bottom-left overlay when content is provided',
      async () => {
        const withBadge = attachments[0] as UploadAttachment;
        await withBadge.updateComplete;

        const badge = withBadge.shadowRoot?.querySelector(
          '.swc-UploadAttachment-badge'
        );
        expect(badge).toBeTruthy();
        expect(
          withBadge.querySelector('[slot="badge"]')?.textContent?.trim()
        ).toBe('PDF');
      }
    );

    await step('badge overlay is omitted when the slot is empty', async () => {
      const withoutBadge = attachments[1] as UploadAttachment;
      await withoutBadge.updateComplete;

      const badge = withoutBadge.shadowRoot?.querySelector(
        '.swc-UploadAttachment-badge'
      );
      expect(badge).toBeNull();
    });
  },
};

export const TitleTruncationTest: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;max-inline-size:360px;">
      <swc-upload-attachment type="card" dismissible>
        <span slot="title">project-report.pdf</span>
      </swc-upload-attachment>
      <swc-upload-attachment type="card">
        <span slot="title">project-report</span>
      </swc-upload-attachment>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const attachments = canvasElement.querySelectorAll<UploadAttachment>(
      'swc-upload-attachment'
    );

    await step(
      'keeps the extension and three preceding characters visible',
      async () => {
        await attachments[0]?.updateComplete;
        const start = attachments[0]?.shadowRoot?.querySelector(
          '.swc-UploadAttachment-title-start'
        );
        const end = attachments[0]?.shadowRoot?.querySelector(
          '.swc-UploadAttachment-title-end'
        );

        expect(start?.textContent?.trim()).toBe('project-rep');
        expect(end?.textContent?.trim()).toBe('ort.pdf');
      }
    );

    await step(
      'keeps a six-character tail for extensionless names',
      async () => {
        await attachments[1]?.updateComplete;
        const start = attachments[1]?.shadowRoot?.querySelector(
          '.swc-UploadAttachment-title-start'
        );
        const end = attachments[1]?.shadowRoot?.querySelector(
          '.swc-UploadAttachment-title-end'
        );

        expect(start?.textContent?.trim()).toBe('project-');
        expect(end?.textContent?.trim()).toBe('report');
      }
    );

    await step(
      'updates the title and accessible labels when slotted text changes',
      async () => {
        const attachment = attachments[0];
        const title = attachment?.querySelector<HTMLElement>('[slot="title"]');
        if (!attachment || !title) {
          throw new Error('Expected a titled upload attachment');
        }

        title.textContent = 'Renamed.pdf';

        await waitFor(() => {
          const start = attachment.shadowRoot?.querySelector(
            '.swc-UploadAttachment-title-start'
          );
          const end = attachment.shadowRoot?.querySelector(
            '.swc-UploadAttachment-title-end'
          );

          expect(
            `${start?.textContent?.trim()}${end?.textContent?.trim()}`
          ).toBe('Renamed.pdf');
          expect(attachment.getAttribute('aria-label')).toBe('Renamed.pdf');
          expect(
            attachment.shadowRoot
              ?.querySelector('.swc-UploadAttachment-dismiss')
              ?.getAttribute('accessible-label')
          ).toBe('Remove Renamed.pdf');
        });
      }
    );
  },
};

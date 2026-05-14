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
import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import meta, { Overview } from '../stories/upload-artifact.stories.js';
import { UploadArtifact } from '../UploadArtifact.js';

export default {
  ...meta,
  title: 'Conversational AI/Upload artifact/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UploadArtifact>(
      canvasElement,
      'swc-upload-artifact'
    );

    await step(
      'overview story renders a dismissible card artifact',
      async () => {
        expect(el.type).toBe('card');
        expect(el.dismissible).toBe(true);
        expect(el.dismissLabel).toBe('Remove attachment');

        const dismissButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UploadArtifact-dismiss'
        );
        const icon = dismissButton?.querySelector('swc-icon');
        expect(dismissButton?.getAttribute('aria-label')).toBe(
          'Remove attachment'
        );
        expect(icon?.getAttribute('aria-hidden')).toBe('true');
      }
    );
  },
};

export const DismissEventTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UploadArtifact>(
      canvasElement,
      'swc-upload-artifact'
    );

    await step(
      'dismiss button emits swc-upload-artifact-dismiss with the host artifact',
      async () => {
        el.dismissLabel = 'Delete file';
        await el.updateComplete;

        let detail: { artifact: UploadArtifact } | undefined;
        el.addEventListener(
          'swc-upload-artifact-dismiss',
          (event) => {
            detail = (event as CustomEvent<{ artifact: UploadArtifact }>)
              .detail;
          },
          { once: true }
        );

        const dismissButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UploadArtifact-dismiss'
        );
        expect(dismissButton?.getAttribute('aria-label')).toBe('Delete file');
        dismissButton?.click();

        expect(detail?.artifact).toBe(el);
      }
    );

    await step(
      'dismiss button supports keyboard activation (Enter and Space)',
      async () => {
        const dismissButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-UploadArtifact-dismiss'
        );

        let enterCount = 0;
        el.addEventListener(
          'swc-upload-artifact-dismiss',
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
          'swc-upload-artifact-dismiss',
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

export const MediaPreviewOnlyTest: Story = {
  render: () => html`
    <div style="inline-size:240px;">
      <swc-upload-artifact type="media">
        <div
          slot="thumbnail"
          style="inline-size:100%;block-size:196px;background:linear-gradient(135deg,#a78bfa,#f472b6);"
          role="img"
          aria-label="Campaign preview"
        ></div>
      </swc-upload-artifact>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<UploadArtifact>(
      canvasElement,
      'swc-upload-artifact'
    );

    await step('media artifact has type="media"', async () => {
      expect(el.type).toBe('media');
    });
  },
};

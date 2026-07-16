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

/**
 * Storybook play tests for `SlotTextController`.
 *
 * The `ObserveSlotText` mixin this controller replaces exposed `slotHasContent`
 * as a reactive `@property` assigned during `update()`, so initial content was
 * inherently part of the first update cycle. The controller instead sets its
 * initial state in `hostConnected` (before the first render) without a
 * `requestUpdate`. These tests verify that:
 *
 * - Initial content **is** reflected on the first paint (the concern raised in
 *   review — no missed initial render).
 * - After the first render, `@slotchange` and the `characterData` observer keep
 *   `hasContent` current as content is added, removed, or edited in place.
 */

import { html } from 'lit';
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import './demo-hosts.js';

import type { DemoSlotTextHost } from './demo-hosts.js';
import textMeta from './slot-text-controller.stories.js';

// ─────────────────────────
//     HELPERS
// ─────────────────────────

function flush(): Promise<void> {
  return Promise.resolve();
}

// ─────────────────────────
//     META
// ─────────────────────────

export default {
  ...textMeta,
  title: 'Controllers/Slot text controller/Tests',
  parameters: {
    ...textMeta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────────────────
//     Initial content is reflected on the first render
// ──────────────────────────────────────────────────────────────────────────

export const InitialContentTest: Story = {
  render: () => html`
    <demo-slot-text-host>Verified</demo-slot-text-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoSlotTextHost>(
      'demo-slot-text-host'
    );
    if (!host) {
      throw new Error('demo-slot-text-host not found');
    }
    await host.updateComplete;

    await step(
      'content present at connect is reflected on first paint',
      async () => {
        expect(host.hasContent, 'hasContent is true for initial content').toBe(
          true
        );
        const status = host.shadowRoot
          ?.querySelector('.status')
          ?.textContent?.trim();
        expect(status).toBe('Has content: yes');
        expect(
          host.shadowRoot?.querySelector('.label--empty'),
          'the empty/icon-only class is not applied when content is present'
        ).toBeNull();
      }
    );
  },
};
InitialContentTest.storyName = 'Initial content on first render';

// ──────────────────────────────────────────────────────────────────────────
//     Empty initial content
// ──────────────────────────────────────────────────────────────────────────

export const InitialEmptyTest: Story = {
  render: () => html`
    <demo-slot-text-host></demo-slot-text-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoSlotTextHost>(
      'demo-slot-text-host'
    );
    if (!host) {
      throw new Error('demo-slot-text-host not found');
    }
    await host.updateComplete;

    await step('no content renders the icon-only presentation', async () => {
      expect(host.hasContent, 'hasContent is false when empty').toBe(false);
      expect(
        host.shadowRoot?.querySelector('.label--empty'),
        'the empty/icon-only class is applied when there is no content'
      ).toBeTruthy();
    });
  },
};
InitialEmptyTest.storyName = 'Empty initial content';

// ──────────────────────────────────────────────────────────────────────────
//     Content added and removed after first render
// ──────────────────────────────────────────────────────────────────────────

export const DynamicContentTest: Story = {
  render: () => html`
    <demo-slot-text-host></demo-slot-text-host>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector<DemoSlotTextHost>(
      'demo-slot-text-host'
    );
    if (!host) {
      throw new Error('demo-slot-text-host not found');
    }
    await host.updateComplete;

    await step('starts empty', async () => {
      expect(host.hasContent).toBe(false);
    });

    await step('appending text updates content via slotchange', async () => {
      host.append('Verified');
      // slotchange dispatches asynchronously after the assignment.
      await flush();
      await host.updateComplete;

      expect(host.hasContent, 'hasContent is true after text is added').toBe(
        true
      );
      expect(host.shadowRoot?.querySelector('.label--empty')).toBeNull();
    });

    await step('removing the text returns to empty', async () => {
      host.textContent = '';
      await flush();
      await host.updateComplete;

      expect(host.hasContent, 'hasContent is false after text is removed').toBe(
        false
      );
      expect(host.shadowRoot?.querySelector('.label--empty')).toBeTruthy();
    });
  },
};
DynamicContentTest.storyName = 'Dynamic content';

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

import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../conversation-artifact/index.js';
import '../index.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { PromptField } from '../PromptField.js';
import { meta, Overview } from '../stories/prompt-field.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Conversational AI/Prompt field/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );

    await step(
      'renders with default sending state',
      async () => {
        expect(el.sending).toBe(false);
        expect(el.label).toBe('Prompt');
        expect(el.placeholder).toBe('Ask anything');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );

    await step('sending reflects to attribute after mutation', async () => {
      el.sending = true;
      await el.updateComplete;
      expect(el.hasAttribute('sending')).toBe(true);

      el.sending = false;
      await el.updateComplete;
      expect(el.hasAttribute('sending')).toBe(false);
    });

    await step(
      'leading-actions slot accepts consumer-provided controls',
      async () => {
        el.innerHTML = '<button slot="leading-actions">Options</button>';
        await el.updateComplete;

        const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
          'slot[name="leading-actions"]'
        );
        const assigned = slot?.assignedElements({ flatten: true }) ?? [];
        expect(assigned.length).toBe(1);
      }
    );

    await step(
      'artifact slot supports multiple assigned artifacts',
      async () => {
        el.innerHTML = `
          <swc-conversation-artifact slot="artifact" variant="card"></swc-conversation-artifact>
          <swc-conversation-artifact slot="artifact" variant="media"></swc-conversation-artifact>
        `;
        await el.updateComplete;

        const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
          'slot[name="artifact"]'
        );
        const assigned = slot?.assignedElements({ flatten: true }) ?? [];
        expect(assigned.length).toBe(2);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Events
// ──────────────────────────────────────────────────────────────

export const EventsTest: Story = {
  ...Overview,
  args: {
    ...Overview.args,
    value: 'Summarize the API changes in this branch.',
    sending: false,
  },
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );

    await step('fires swc-submit when send button clicked', async () => {
      let fired = false;
      el.addEventListener(
        'swc-submit',
        () => {
          fired = true;
        },
        { once: true }
      );

      const sendBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-send'
      );
      sendBtn?.click();
      expect(fired).toBe(true);
    });

    await step(
      'fires swc-upload-click when upload button clicked',
      async () => {
        let fired = false;
        el.addEventListener(
          'swc-upload-click',
          () => {
            fired = true;
          },
          { once: true }
        );

        const uploadBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-upload'
        );
        uploadBtn?.click();
        expect(fired).toBe(true);
      }
    );

    await step(
      'bubbles swc-artifact-dismiss from a dismissible artifact',
      async () => {
        el.innerHTML = `
          <swc-conversation-artifact slot="artifact" variant="media" dismissible>
            <div slot="thumbnail" style="inline-size:100%;block-size:100%;"></div>
          </swc-conversation-artifact>
        `;
        await el.updateComplete;

        let fired = false;
        el.addEventListener(
          'swc-artifact-dismiss',
          () => {
            fired = true;
          },
          { once: true }
        );

        const dismissBtn = el.querySelector('swc-conversation-artifact')
          ?.shadowRoot
          ?.querySelector<HTMLButtonElement>(
            '.swc-ConversationArtifact-dismiss'
          );
        dismissBtn?.click();
        expect(fired).toBe(true);
      }
    );
  },
};

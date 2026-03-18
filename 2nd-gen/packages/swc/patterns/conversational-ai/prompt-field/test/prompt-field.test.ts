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
      'renders with default state, uploadedArtifact and populated',
      async () => {
        expect(el.state).toBe('default');
        expect(el.uploadedArtifact).toBe('none');
        expect(el.populated).toBe(false);
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

    await step('state reflects to attribute after mutation', async () => {
      el.state = 'send';
      await el.updateComplete;
      expect(el.getAttribute('state')).toBe('send');

      el.state = 'stop';
      await el.updateComplete;
      expect(el.getAttribute('state')).toBe('stop');

      el.state = 'default';
      await el.updateComplete;
      expect(el.getAttribute('state')).toBe('default');
    });

    await step(
      'uploaded-artifact reflects to attribute after mutation',
      async () => {
        el.uploadedArtifact = 'card';
        await el.updateComplete;
        expect(el.getAttribute('uploaded-artifact')).toBe('card');

        el.uploadedArtifact = 'image';
        await el.updateComplete;
        expect(el.getAttribute('uploaded-artifact')).toBe('image');

        el.uploadedArtifact = 'none';
        await el.updateComplete;
        expect(el.getAttribute('uploaded-artifact')).toBe('none');
      }
    );

    await step('populated reflects to attribute after mutation', async () => {
      el.populated = true;
      await el.updateComplete;
      expect(el.hasAttribute('populated')).toBe(true);

      el.populated = false;
      await el.updateComplete;
      expect(el.hasAttribute('populated')).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Events
// ──────────────────────────────────────────────────────────────

export const EventsTest: Story = {
  ...Overview,
  args: {
    ...Overview.args,
    state: 'send',
    populated: true,
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
  },
};

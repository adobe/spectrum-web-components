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

import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../upload-artifact/index.js';
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

    await step('renders with default mode state', async () => {
      expect(el.mode).toBe('default');
      expect(el.label).toBe('Prompt');
      expect(el.placeholder).toBe(
        'Ready to get started? Ask a question, share an idea, or add a task.'
      );
      expect(el.accept).toBe('');
      expect(el.multiple).toBe(true);
      expect(el.artifactValues).toEqual([]);
      expect(el.sendLabel).toBe('Send');
      expect(el.stopLabel).toBe('Stop generating');
      expect(el.uploadLabel).toBe('Add attachment');
      expect(el.accessibleLabel).toBe('');
      const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
        '.swc-PromptField-textarea'
      );
      const uploadButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-upload'
      );
      const sendButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-send'
      );

      expect(textarea?.getAttribute('aria-placeholder')).toBe(el.placeholder);
      expect(textarea?.hasAttribute('aria-describedby')).toBe(false);
      expect(uploadButton?.getAttribute('aria-label')).toBe('Add attachment');
      expect(sendButton?.getAttribute('aria-label')).toBe('Send');

      const legalCopy = el.shadowRoot?.querySelector(
        '.swc-PromptField-legal-disclaimer'
      );
      expect(legalCopy).toBeNull();
    });
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

    await step('mode reflects to attribute after mutation', async () => {
      el.mode = 'loading';
      await el.updateComplete;
      expect(el.getAttribute('mode')).toBe('loading');

      el.mode = 'default';
      await el.updateComplete;
      expect(el.getAttribute('mode')).toBe('default');
    });

    await step(
      'accept and multiple mutate as configurable picker options',
      async () => {
        el.accept = 'image/*,.pdf';
        el.multiple = false;
        await el.updateComplete;

        expect(el.accept).toBe('image/*,.pdf');
        expect(el.multiple).toBe(false);
      }
    );

    await step(
      'artifact slot supports multiple assigned artifacts',
      async () => {
        el.innerHTML = `
          <swc-upload-artifact slot="artifact" type="card"></swc-upload-artifact>
          <swc-upload-artifact slot="artifact" type="media"></swc-upload-artifact>
        `;
        await el.updateComplete;

        const slot = el.shadowRoot?.querySelector<HTMLSlotElement>(
          'slot[name="artifact"]'
        );
        const assigned = slot?.assignedElements({ flatten: true }) ?? [];
        expect(assigned.length).toBe(2);
      }
    );

    await step('legal slot renders custom legal content', async () => {
      el.innerHTML = `
        <div slot="legal">Custom legal from slot.</div>
      `;
      await el.updateComplete;
      await Promise.resolve();
      await el.updateComplete;

      const footer = el.shadowRoot?.querySelector('.swc-PromptField-footer');
      const legalSlot =
        el.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="legal"]');
      const assignedText = legalSlot
        ?.assignedNodes({ flatten: true })
        .map((node) => node.textContent ?? '')
        .join('')
        .trim();
      const legalCopy = el.shadowRoot?.querySelector(
        '.swc-PromptField-legal-disclaimer'
      );

      expect(footer).toBeTruthy();
      expect(assignedText).toContain('Custom legal from slot.');
      expect(legalCopy).toBeNull();
    });

    await step('accessible-label overrides textarea aria-label', async () => {
      el.accessibleLabel = 'Custom prompt input';
      await el.updateComplete;

      const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
        '.swc-PromptField-textarea'
      );
      expect(textarea?.getAttribute('aria-label')).toBe('Custom prompt input');
    });

    await step(
      'custom action labels override default aria labels',
      async () => {
        el.uploadLabel = 'Attach file';
        el.sendLabel = 'Submit prompt';
        el.stopLabel = 'Cancel generation';
        el.mode = 'loading';
        await el.updateComplete;

        const uploadButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-upload'
        );
        const stopButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-stop'
        );

        expect(uploadButton?.getAttribute('aria-label')).toBe('Attach file');
        expect(stopButton?.getAttribute('aria-label')).toBe(
          'Cancel generation'
        );
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
    mode: 'default',
  },
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );

    await step(
      'fires swc-prompt-field-submit when send button clicked',
      async () => {
        let detail:
          | { value: string; artifactValues: PromptField['artifactValues'] }
          | undefined;
        el.addEventListener(
          'swc-prompt-field-submit',
          (event) => {
            detail = (
              event as CustomEvent<{
                value: string;
                artifactValues: PromptField['artifactValues'];
              }>
            ).detail;
          },
          { once: true }
        );

        const sendBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-send'
        );
        sendBtn?.click();
        expect(detail?.value).toBe('Summarize the API changes in this branch.');
        expect(detail?.artifactValues).toEqual([]);
      }
    );

    await step(
      'fires swc-prompt-field-submit when Enter is pressed in textarea',
      async () => {
        let detail:
          | { value: string; artifactValues: PromptField['artifactValues'] }
          | undefined;
        el.addEventListener(
          'swc-prompt-field-submit',
          (event) => {
            detail = (
              event as CustomEvent<{
                value: string;
                artifactValues: PromptField['artifactValues'];
              }>
            ).detail;
          },
          { once: true }
        );

        const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
          '.swc-PromptField-textarea'
        );
        textarea?.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
        );
        expect(detail?.value).toBe('Summarize the API changes in this branch.');
      }
    );

    await step(
      'does not fire swc-prompt-field-submit when Shift+Enter is pressed in textarea',
      async () => {
        let fired = false;
        el.addEventListener(
          'swc-prompt-field-submit',
          () => {
            fired = true;
          },
          { once: true }
        );

        const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
          '.swc-PromptField-textarea'
        );
        textarea?.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Enter',
            shiftKey: true,
            bubbles: true,
          })
        );
        expect(fired).toBe(false);
      }
    );

    await step(
      'does not fire swc-prompt-field-submit when Enter is pressed during IME composition',
      async () => {
        let fired = false;
        el.addEventListener(
          'swc-prompt-field-submit',
          () => {
            fired = true;
          },
          { once: true }
        );

        const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
          '.swc-PromptField-textarea'
        );
        textarea?.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'Enter',
            bubbles: true,
            isComposing: true,
          })
        );
        expect(fired).toBe(false);
      }
    );

    await step(
      'fires swc-prompt-field-upload-click and opens picker when upload button clicked',
      async () => {
        let fired = false;
        let pickerOpened = false;
        el.addEventListener(
          'swc-prompt-field-upload-click',
          () => {
            fired = true;
          },
          { once: true }
        );

        const fileInput = el.shadowRoot?.querySelector<HTMLInputElement>(
          '.swc-PromptField-file-input'
        );
        if (fileInput) {
          fileInput.click = () => {
            pickerOpened = true;
          };
        }

        const uploadBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-upload'
        );
        uploadBtn?.click();
        expect(fired).toBe(true);
        expect(pickerOpened).toBe(true);
      }
    );

    await step(
      'upload button supports keyboard activation (Enter and Space)',
      async () => {
        let fireCount = 0;
        let pickerOpenCount = 0;

        el.addEventListener('swc-prompt-field-upload-click', () => {
          fireCount += 1;
        });

        const fileInput = el.shadowRoot?.querySelector<HTMLInputElement>(
          '.swc-PromptField-file-input'
        );
        if (fileInput) {
          fileInput.click = () => {
            pickerOpenCount += 1;
          };
        }

        const uploadBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-upload'
        );
        uploadBtn?.focus();
        await userEvent.keyboard('{Enter}');
        uploadBtn?.focus();
        await userEvent.keyboard(' ');

        expect(fireCount).toBe(2);
        expect(pickerOpenCount).toBe(2);
      }
    );

    await step(
      'swc-prompt-field-upload-click can prevent picker opening',
      async () => {
        let pickerOpened = false;
        const preventOpen = (event: Event): void => {
          event.preventDefault();
        };
        el.addEventListener('swc-prompt-field-upload-click', preventOpen, {
          once: true,
        });

        const fileInput = el.shadowRoot?.querySelector<HTMLInputElement>(
          '.swc-PromptField-file-input'
        );
        if (fileInput) {
          fileInput.click = () => {
            pickerOpened = true;
          };
        }

        const uploadBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-upload'
        );
        uploadBtn?.click();

        expect(pickerOpened).toBe(false);
      }
    );

    await step(
      'fires swc-prompt-field-files-selected with file and artifact values',
      async () => {
        const file = new File(['demo'], 'brief.pdf', {
          type: 'application/pdf',
        });

        let detail:
          | {
              files: File[];
              artifactValues: PromptField['artifactValues'];
              allArtifactValues: PromptField['artifactValues'];
            }
          | undefined;

        el.addEventListener(
          'swc-prompt-field-files-selected',
          (event) => {
            detail = (
              event as CustomEvent<{
                files: File[];
                artifactValues: PromptField['artifactValues'];
                allArtifactValues: PromptField['artifactValues'];
              }>
            ).detail;
          },
          { once: true }
        );

        const fileInput = el.shadowRoot?.querySelector<HTMLInputElement>(
          '.swc-PromptField-file-input'
        );

        if (fileInput) {
          Object.defineProperty(fileInput, 'files', {
            value: [file],
            configurable: true,
          });
          fileInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        await el.updateComplete;
        expect(detail?.files.length).toBe(1);
        expect(detail?.artifactValues[0].name).toBe('brief.pdf');
        expect(detail?.allArtifactValues.length).toBe(1);
        expect(el.artifactValues.length).toBe(1);
      }
    );

    await step(
      'bubbles swc-upload-artifact-dismiss from a dismissible artifact',
      async () => {
        el.innerHTML = `
          <swc-upload-artifact slot="artifact" type="media" dismissible>
            <div slot="thumbnail" style="inline-size:100%;block-size:100%;"></div>
          </swc-upload-artifact>
        `;
        await el.updateComplete;

        let fired = false;
        el.addEventListener(
          'swc-upload-artifact-dismiss',
          () => {
            fired = true;
          },
          { once: true }
        );

        const dismissBtn = el
          .querySelector('swc-upload-artifact')
          ?.shadowRoot?.querySelector<HTMLButtonElement>(
            '.swc-UploadArtifact-dismiss'
          );
        dismissBtn?.click();
        expect(fired).toBe(true);
      }
    );

    await step(
      'stop button supports keyboard activation (Enter and Space)',
      async () => {
        el.mode = 'loading';
        await el.updateComplete;

        let stopCount = 0;
        el.addEventListener('swc-prompt-field-stop', () => {
          stopCount += 1;
        });

        const stopBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-stop'
        );
        stopBtn?.focus();
        await userEvent.keyboard('{Enter}');
        stopBtn?.focus();
        await userEvent.keyboard(' ');

        expect(stopCount).toBe(2);
      }
    );
  },
};

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

import { html, nothing, render } from 'lit';
import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import '../../upload-artifact/swc-upload-artifact.js';
import '../swc-prompt-field.js';

import { getComponent } from '../../../../utils/test-utils.js';
import { PromptField } from '../PromptField.js';
import { meta, Overview } from '../stories/prompt-field.stories.js';

export default {
  ...meta,
  title: 'Conversational AI/Prompt field/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

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
      expect(el.sendLabel).toBe('Send');
      expect(el.stopLabel).toBe('Stop generating');
      expect(el.uploadLabel).toBe('Add attachment');
      expect(el.accessibleLabel).toBe('');
      expect(el.minRows).toBe(1);
      expect(el.maxRows).toBe(4);
    });

    await step('applies min-rows and max-rows to textarea sizing', async () => {
      el.minRows = 3;
      el.maxRows = 6;
      await el.updateComplete;

      const textarea =
        el.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
      expect(textarea?.rows).toBe(3);
      expect(
        textarea?.style.getPropertyValue('--swc-prompt-field-textarea-min-rows')
      ).toBe('3');
      expect(
        textarea?.style.getPropertyValue('--swc-prompt-field-textarea-max-rows')
      ).toBe('6');
    });

    await step('legal slot renders custom legal content', async () => {
      el.innerHTML = `<div slot="legal">Custom legal from slot.</div>`;
      await el.updateComplete;
      await Promise.resolve();
      await el.updateComplete;

      const footer = el.shadowRoot?.querySelector('.swc-PromptField-footer');
      expect(footer).toBeTruthy();
    });
  },
};

export const InteractionTest: Story = {
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

    await step('submit event emits value', async () => {
      let detail: { value: string } | undefined;
      el.addEventListener('swc-prompt-field-submit', (event) => {
        detail = (event as CustomEvent<{ value: string }>).detail;
      });

      const sendBtn = el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-send'
      );
      sendBtn?.click();
      expect(detail?.value).toBe('Summarize the API changes in this branch.');
    });

    await step('upload button emits trigger event', async () => {
      let fired = false;
      el.addEventListener(
        'swc-prompt-field-upload-click',
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
    });

    await step('stop button supports keyboard activation', async () => {
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
    });
  },
};

export const LegalMissingWarningTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    const warnings: string[] = [];
    const originalWarn = console.warn;
    console.warn = (message?: unknown) => {
      warnings.push(String(message));
    };

    try {
      render(
        html`
          <swc-prompt-field
            label="Prompt"
            value="No legal disclaimer"
          ></swc-prompt-field>
        `,
        canvasElement
      );

      const el = await getComponent<PromptField>(
        canvasElement,
        'swc-prompt-field'
      );
      await el.updateComplete;
      await new Promise((resolve) => requestAnimationFrame(resolve));

      await step(
        'logs a development warning when the legal slot is empty',
        async () => {
          expect(
            warnings.some(
              (message) =>
                message.includes('[swc-prompt-field]') &&
                message.includes('legal slot is empty')
            )
          ).toBe(true);
        }
      );
    } finally {
      console.warn = originalWarn;
    }
  },
};

export const MixedArtifactWarningTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    const warnings: string[] = [];
    const originalWarn = console.warn;
    console.warn = (message?: unknown) => {
      warnings.push(String(message));
    };

    try {
      render(
        html`
          <swc-prompt-field label="Prompt" value="Mixed attachments">
            <swc-upload-artifact slot="artifact" type="card">
              <span slot="title">Brief</span>
              <span slot="subtitle">PDF</span>
            </swc-upload-artifact>
            <swc-upload-artifact slot="artifact" type="media">
              <div slot="thumbnail" role="img" aria-label="Preview"></div>
            </swc-upload-artifact>
          </swc-prompt-field>
        `,
        canvasElement
      );

      await getComponent<PromptField>(canvasElement, 'swc-prompt-field');

      await step(
        'logs a development warning when card and media artifacts are mixed',
        async () => {
          expect(
            warnings.some(
              (message) =>
                message.includes('[swc-prompt-field]') &&
                message.includes('card and media')
            )
          ).toBe(true);
        }
      );
    } finally {
      console.warn = originalWarn;
    }
  },
};

const artifactScrollGradient =
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

function renderMultiArtifactPromptField(canvasElement: HTMLElement): void {
  render(
    html`
      <div style="inline-size:480px;">
        <swc-prompt-field label="Prompt" value="Review attachments.">
          ${Array.from({ length: 8 }, (_, index) => index).map(
            (index) => html`
              <swc-upload-artifact slot="artifact" type="media" dismissible>
                <div
                  slot="thumbnail"
                  role="img"
                  aria-label="Frame ${index + 1}"
                  style="inline-size:100%;block-size:100%;background:${artifactScrollGradient};"
                ></div>
              </swc-upload-artifact>
            `
          )}
        </swc-prompt-field>
      </div>
    `,
    canvasElement
  );
}

export const ArtifactScrollPaginationTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    renderMultiArtifactPromptField(canvasElement);

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await el.updateComplete;

    const scrollEl = el.shadowRoot?.querySelector<HTMLDivElement>(
      '.swc-PromptField-artifacts-scroll'
    );
    const nextButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
      '.swc-PromptField-artifacts-scroll-next'
    );

    await step(
      'renders multi-artifact paging controls when overflowing',
      async () => {
        expect(scrollEl).toBeTruthy();
        expect(nextButton).toBeTruthy();
        expect(
          (scrollEl?.scrollWidth ?? 0) > (scrollEl?.clientWidth ?? 0)
        ).toBe(true);
      }
    );

    await step('edge fades render when paging is available', async () => {
      const endFade = el.shadowRoot?.querySelector(
        '.swc-PromptField-artifacts-fade--end'
      );
      expect(endFade).toBeTruthy();
    });

    await step('chevron paging advances by more than one tile', async () => {
      const initialScrollLeft = scrollEl?.scrollLeft ?? 0;
      nextButton?.click();
      await el.updateComplete;
      expect(
        scrollEl?.classList.contains('is-artifact-scroll-from-buttons')
      ).toBe(true);

      await new Promise((resolve) => window.setTimeout(resolve, 400));

      const nextScrollLeft = scrollEl?.scrollLeft ?? 0;
      expect(nextScrollLeft).toBeGreaterThan(initialScrollLeft);

      const tileWidth =
        scrollEl
          ?.querySelector('slot')
          ?.assignedElements({ flatten: true })[0]
          ?.getBoundingClientRect().width ?? 68;
      expect(nextScrollLeft - initialScrollLeft).toBeGreaterThan(tileWidth);
    });

    await step('chevron paging keeps the scrollbar thumb hidden', async () => {
      await new Promise<void>((resolve) => {
        const done = (): void => resolve();
        scrollEl?.addEventListener('scrollend', done, { once: true });
        window.setTimeout(done, 1500);
      });
      await el.updateComplete;

      const scrollbarLane = el.shadowRoot?.querySelector(
        '.swc-PromptField-artifacts-scrollbar-lane'
      );
      expect(
        scrollEl?.classList.contains('is-artifact-scroll-from-buttons')
      ).toBe(false);
      expect(
        scrollbarLane?.classList.contains('is-artifact-scrollbar-interacting')
      ).toBe(false);
    });

    await step('wheel interaction shows the scrollbar thumb', async () => {
      scrollEl?.dispatchEvent(
        new WheelEvent('wheel', {
          bubbles: true,
          deltaX: 12,
        })
      );
      await el.updateComplete;

      const scrollbarLane = el.shadowRoot?.querySelector(
        '.swc-PromptField-artifacts-scrollbar-lane'
      );
      expect(
        scrollbarLane?.classList.contains('is-artifact-scrollbar-interacting')
      ).toBe(true);
    });

    await step(
      'chevron paging reaches the end when the last tile is only partially visible',
      async () => {
        const maxScroll = Math.max(
          0,
          (scrollEl?.scrollWidth ?? 0) - (scrollEl?.clientWidth ?? 0)
        );
        scrollEl?.scrollTo({
          left: Math.max(0, maxScroll - 10),
          behavior: 'auto',
        });
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await el.updateComplete;

        const nextButtonAtEnd = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-artifacts-scroll-next'
        );
        expect(nextButtonAtEnd).toBeTruthy();

        const beforeClick = scrollEl?.scrollLeft ?? 0;
        nextButtonAtEnd?.click();

        await new Promise<void>((resolve) => {
          const done = (): void => resolve();
          scrollEl?.addEventListener('scrollend', done, { once: true });
          window.setTimeout(done, 1500);
        });
        await el.updateComplete;

        expect(scrollEl?.scrollLeft ?? 0).toBeGreaterThan(beforeClick);
      }
    );
  },
};

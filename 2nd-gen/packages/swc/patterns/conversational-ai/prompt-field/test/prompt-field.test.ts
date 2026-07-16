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

import { getActiveElement } from '@adobe/spectrum-wc-core/utils/index.js';

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
          ${Array.from({ length: 14 }, (_, index) => index).map(
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
      const clientWidth = scrollEl?.clientWidth ?? 0;
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

      // The whole visible set should page forward together (only the one
      // edge tile that was under 50% visible may be carried over) rather
      // than nudging by a single tile's worth of scroll.
      expect(nextScrollLeft - initialScrollLeft).toBeGreaterThan(
        clientWidth - 2 * tileWidth
      );
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

function waitForScrollEnd(
  scrollEl: HTMLDivElement | null | undefined
): Promise<void> {
  return new Promise<void>((resolve) => {
    const done = (): void => resolve();
    scrollEl?.addEventListener('scrollend', done, { once: true });
    window.setTimeout(done, 1500);
  });
}

function dispatchKeydown(
  target: EventTarget,
  key: string,
  eventInit: Partial<KeyboardEventInit> = {}
): KeyboardEvent {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    composed: true,
    cancelable: true,
    ...eventInit,
  });
  target.dispatchEvent(event);
  return event;
}

export const ArtifactFocusOrderTest: Story = {
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

    const artifacts = Array.from(
      el.querySelectorAll<HTMLElement>('[slot="artifact"]')
    );
    const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
      '.swc-PromptField-textarea'
    );
    const scrollEl = el.shadowRoot?.querySelector<HTMLDivElement>(
      '.swc-PromptField-artifacts-scroll'
    );
    const getNextButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-artifacts-scroll-next'
      );
    const getPrevButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-artifacts-scroll-prev'
      );
    const getDismissButton = (
      tile: HTMLElement
    ): HTMLButtonElement | null | undefined =>
      tile.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-UploadArtifact-dismiss'
      );

    await step('landmark region wraps the strip', async () => {
      const row = el.shadowRoot?.querySelector(
        '.swc-PromptField-artifacts-row'
      );
      expect(row?.getAttribute('role')).toBe('region');
      expect(row?.getAttribute('aria-label')).toBe('Uploaded assets strip');
    });

    await step(
      'only one tile is the roving tab stop; dismiss/">" are never normal tab stops',
      async () => {
        expect(artifacts[0]?.tabIndex).toBe(0);
        expect(artifacts.slice(1).every((tile) => tile.tabIndex === -1)).toBe(
          true
        );
        expect(
          artifacts.every((tile) => getDismissButton(tile)?.tabIndex === -1)
        ).toBe(true);
        // ">" is excludeFromTabOrder per spec: reachable only via the Close
        // button's explicit Tab intercept below, never via native Tab.
        expect(getNextButton()?.tabIndex).toBe(-1);
      }
    );

    await step(
      'Arrow Right moves the roving tab stop one tile and marks the strip entered',
      async () => {
        artifacts[0]?.focus();
        dispatchKeydown(artifacts[0]!, 'ArrowRight');
        await el.updateComplete;

        expect(artifacts[0]?.tabIndex).toBe(-1);
        expect(artifacts[1]?.tabIndex).toBe(0);
        expect(getActiveElement()).toBe(artifacts[1]);
      }
    );

    await step(
      'Tab from the active (entered) tile reveals its Close button',
      async () => {
        const active = artifacts[1]!;
        const event = dispatchKeydown(active, 'Tab');
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(getDismissButton(active));
      }
    );

    await step(
      'Shift+Tab from the Close button returns focus to the tile',
      async () => {
        const active = artifacts[1]!;
        const dismiss = getDismissButton(active)!;
        const event = dispatchKeydown(dismiss, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(active);
      }
    );

    await step(
      'Tab from the Close button reaches the ">" button when more content is scrolled out of view',
      async () => {
        const active = artifacts[1]!;
        const dismiss = getDismissButton(active)!;
        dismiss.focus();
        const event = dispatchKeydown(dismiss, 'Tab');
        await el.updateComplete;

        const nextButton = getNextButton();
        expect(nextButton).toBeTruthy();
        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(nextButton);
      }
    );

    await step(
      'focus leaving the strip resets "entered"; Tab from an untouched tile does not intercept',
      async () => {
        textarea?.focus();
        await el.updateComplete;

        artifacts[1]?.focus();
        await el.updateComplete;
        const event = dispatchKeydown(artifacts[1]!, 'Tab');

        // Not "entered" (focus arrived via .focus(), not Arrow/Enter), so the
        // Close button/">" intercept must not fire; native Tab is left alone.
        expect(event.defaultPrevented).toBe(false);
      }
    );

    await step(
      'Enter marks the strip entered without moving focus off the tile',
      async () => {
        const active = artifacts[1]!;
        active.focus();
        const event = dispatchKeydown(active, 'Enter');
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(active);

        const tabEvent = dispatchKeydown(active, 'Tab');
        await el.updateComplete;
        expect(tabEvent.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(getDismissButton(active));
      }
    );

    await step(
      'Tab from the "<" button focuses the first fully-visible tile',
      async () => {
        artifacts[artifacts.length - 1]?.focus();
        await waitForScrollEnd(scrollEl);
        await el.updateComplete;
        dispatchKeydown(artifacts[artifacts.length - 1]!, 'ArrowLeft');
        await waitForScrollEnd(scrollEl);
        await el.updateComplete;

        const prevButton = getPrevButton();
        expect(prevButton).toBeTruthy();
        prevButton?.focus();
        const event = dispatchKeydown(prevButton!, 'Tab');
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        const active = getActiveElement();
        expect(active).not.toBe(prevButton);
        expect(artifacts.includes(active as HTMLElement)).toBe(true);
      }
    );

    await step(
      'Shift+Tab from the ">" button focuses the last fully-visible tile',
      async () => {
        // Force a known, deterministic scroll position rather than relying on
        // wherever the previous step's "first fully-visible tile" landed
        // (that position is layout-dependent and varies across browsers).
        scrollEl?.scrollTo({ left: 0, behavior: 'auto' });
        await waitForScrollEnd(scrollEl);
        await el.updateComplete;

        const nextButton = getNextButton();
        expect(nextButton).toBeTruthy();
        nextButton?.focus();
        const event = dispatchKeydown(nextButton!, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        const active = getActiveElement();
        expect(artifacts.includes(active as HTMLElement)).toBe(true);
      }
    );

    await step(
      'the "<" button disappearing while focused redirects focus to the first tile',
      async () => {
        scrollEl?.scrollTo({ left: 200, behavior: 'auto' });
        await waitForScrollEnd(scrollEl);
        await el.updateComplete;
        expect(scrollEl?.scrollLeft ?? 0).toBeGreaterThan(0);

        const prevButton = getPrevButton();
        expect(prevButton).toBeTruthy();
        prevButton?.focus();
        expect(getActiveElement()).toBe(prevButton);

        scrollEl?.scrollTo({ left: 0, behavior: 'auto' });
        await waitForScrollEnd(scrollEl);
        await el.updateComplete;

        expect(getPrevButton()).toBeFalsy();
        expect(getActiveElement()).toBe(artifacts[0]);
      }
    );

    await step(
      'a boundary Arrow key (no-op move) still marks the strip entered',
      async () => {
        // Leave and re-enter the first tile via .focus() (source: 'focus',
        // not 'keyboard') so "entered" is genuinely false going into this.
        textarea?.focus();
        await el.updateComplete;
        artifacts[0]?.focus();
        await el.updateComplete;

        // ArrowLeft at index 0 with wrap:false is a no-op for the roving
        // controller (no active-change event fires), but the spec still
        // counts pressing it as "entering" the strip.
        dispatchKeydown(artifacts[0]!, 'ArrowLeft');
        await el.updateComplete;
        expect(getActiveElement()).toBe(artifacts[0]);

        const event = dispatchKeydown(artifacts[0]!, 'Tab');
        await el.updateComplete;
        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(getDismissButton(artifacts[0]!));
      }
    );
  },
};

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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { getActiveElement } from '@adobe/spectrum-wc-core/utils/index.js';

import '../../upload-attachment/swc-upload-attachment.js';
import '../swc-prompt-field.js';

import { getComponent, withWarningSpy } from '../../../../utils/test-utils.js';
import { PromptField } from '../PromptField.js';
import { meta, Overview, Playground } from '../stories/prompt-field.stories.js';

const makeDragEvent = (type: string, dt?: DataTransfer): DragEvent =>
  new DragEvent(type, {
    cancelable: true,
    bubbles: true,
    composed: true,
    dataTransfer: dt,
  });

const makeFileDataTransfer = (): DataTransfer => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(
    new File(['hello'], 'hello.txt', { type: 'text/plain' })
  );
  return dataTransfer;
};

export default {
  ...meta,
  title: 'AI Toolkit/Prompt field/Tests',
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

    await step('renders with default state', async () => {
      expect(el.disabled).toBe(false);
      expect(el.generating).toBe(false);
      expect(el.collapsed).toBe(false);
      expect(el.label).toBe('Prompt');
      expect(el.sendLabel).toBe('Send');
      expect(el.stopLabel).toBe('Stop generating');
      expect(el.uploadLabel).toBe('Add attachment');
      expect(el.accessibleLabel).toBe('');

      const textarea =
        el.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
      expect(textarea?.rows).toBe(1);
      expect(el.minRows).toBeUndefined();
      expect(el.maxRows).toBeUndefined();
    });

    await step('min-rows and max-rows apply when set', async () => {
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

      el.minRows = undefined;
      el.maxRows = undefined;
      await el.updateComplete;
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
      el.generating = true;
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
    await withWarningSpy(async (warnCalls) => {
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
            warnCalls.some(([, message]) =>
              String(message).includes('legal slot is empty')
            ),
            'the empty legal slot emits a debug warning'
          ).toBe(true);
        }
      );

      el.innerHTML = '<p slot="legal">Approved legal copy.</p>';
      await el.updateComplete;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      expect(
        warnCalls,
        'valid legal content emits no additional warning'
      ).toHaveLength(1);
    });
  },
};

export const MixedAttachmentWarningTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    await withWarningSpy(async (warnCalls) => {
      render(
        html`
          <swc-prompt-field label="Prompt" value="Mixed attachments">
            <swc-upload-attachment slot="attachment" type="card">
              <span slot="title">Brief</span>
              <span slot="subtitle">PDF</span>
            </swc-upload-attachment>
            <swc-upload-attachment slot="attachment" type="media">
              <div slot="thumbnail" role="img" aria-label="Preview"></div>
            </swc-upload-attachment>
            <p slot="legal">Approved legal copy.</p>
          </swc-prompt-field>
        `,
        canvasElement
      );

      await getComponent<PromptField>(canvasElement, 'swc-prompt-field');
      await new Promise((resolve) => requestAnimationFrame(resolve));

      await step(
        'logs a development warning when card and media attachments are mixed',
        async () => {
          expect(
            warnCalls.some(([, message]) =>
              String(message).includes('card and media')
            ),
            'mixed card and media attachments emit a debug warning'
          ).toBe(true);
        }
      );

      canvasElement.querySelector<HTMLElement>('[type="media"]')?.remove();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      expect(
        warnCalls,
        'one attachment layout emits no additional warning'
      ).toHaveLength(1);
    });
  },
};

const attachmentScrollGradient =
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

// swc-action-button delegates focus to its internal <button>, so the deep
// active element is that button; resolve it back to the host action-button the
// strip manages (dismiss/chevron). Non-delegating targets are returned as-is.
const focusedControl = (): Element | null => {
  const active = getActiveElement();
  const root = active?.getRootNode();
  return root instanceof ShadowRoot &&
    root.host.localName === 'swc-action-button'
    ? root.host
    : (active ?? null);
};

function renderMultiAttachmentPromptField(
  canvasElement: HTMLElement,
  direction?: 'rtl'
): void {
  render(
    html`
      <div style="inline-size:480px;" dir=${direction ?? nothing}>
        <swc-prompt-field label="Prompt" value="Review attachments.">
          ${Array.from({ length: 14 }, (_, index) => index).map(
            (index) => html`
              <swc-upload-attachment slot="attachment" type="media" dismissible>
                <div
                  slot="thumbnail"
                  role="img"
                  aria-label="Frame ${index + 1}"
                  style="inline-size:100%;block-size:100%;background:${attachmentScrollGradient};"
                ></div>
              </swc-upload-attachment>
            `
          )}
        </swc-prompt-field>
      </div>
    `,
    canvasElement
  );
}

export const AttachmentScrollPaginationTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    renderMultiAttachmentPromptField(canvasElement);

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await el.updateComplete;

    const scrollEl = el.shadowRoot?.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    );
    const nextButton = el.shadowRoot?.querySelector<HTMLButtonElement>(
      '.swc-PromptField-attachments-scroll-next'
    );

    await step(
      'renders multi-attachment paging controls when overflowing',
      async () => {
        expect(scrollEl).toBeTruthy();
        expect(nextButton).toBeTruthy();
        expect(
          (scrollEl?.scrollWidth ?? 0) > (scrollEl?.clientWidth ?? 0)
        ).toBe(true);
        expect(
          el.shadowRoot?.querySelector(
            '.swc-PromptField-attachments-scrollbar-lane'
          )
        ).toBeNull();

        el.attachmentScrollPrevLabel = 'Show earlier attachments';
        el.attachmentScrollNextLabel = 'Show later attachments';
        await el.updateComplete;
        expect(nextButton?.getAttribute('accessible-label')).toBe(
          'Show later attachments'
        );
      }
    );

    await step('edge fades render when paging is available', async () => {
      // The edge fade is a mask on the scroll container, toggled by the
      // has-scroll-next class, not a separate fade element.
      expect(scrollEl?.classList.contains('has-scroll-next')).toBe(true);
    });

    await step(
      'chevron paging advances by one viewport with CSS Scroll Snap',
      async () => {
        const initialScrollLeft = scrollEl?.scrollLeft ?? 0;
        const clientWidth = scrollEl?.clientWidth ?? 0;
        nextButton?.click();
        // Paging is a smooth scroll; wait until it has advanced by more than
        // half a viewport (its settled position) rather than a fixed delay.
        await waitFor(() =>
          expect(
            (scrollEl?.scrollLeft ?? 0) - initialScrollLeft
          ).toBeGreaterThan(clientWidth / 2)
        );

        expect(scrollEl?.clientWidth).toBe(clientWidth);
        expect(
          el.shadowRoot
            ?.querySelector<HTMLButtonElement>(
              '.swc-PromptField-attachments-scroll-prev'
            )
            ?.getAttribute('accessible-label')
        ).toBe('Show earlier attachments');

        const tiles = scrollEl
          ?.querySelector('slot')
          ?.assignedElements({ flatten: true }) as HTMLElement[] | undefined;
        // Computed scroll-snap-type omits proximity (the default); only mandatory serializes.
        const snapType = getComputedStyle(scrollEl!).scrollSnapType;
        expect(snapType).toContain('inline');
        expect(snapType).not.toContain('mandatory');
        expect(getComputedStyle(tiles![0]!).scrollSnapAlign).toContain('start');
      }
    );

    await step(
      'scrolling to the end disables (not removes) the Next chevron, so a focused chevron is never blurred by unmounting',
      async () => {
        const maxScroll = Math.max(
          0,
          (scrollEl?.scrollWidth ?? 0) - (scrollEl?.clientWidth ?? 0)
        );
        scrollEl?.scrollTo({
          left: maxScroll,
          behavior: 'instant',
        });
        const getNextButtonAtEnd = (): HTMLButtonElement | null | undefined =>
          el.shadowRoot?.querySelector<HTMLButtonElement>(
            '.swc-PromptField-attachments-scroll-next'
          );
        // Reaching the end disables Next; wait for that state to settle.
        await waitFor(() =>
          expect(getNextButtonAtEnd()?.getAttribute('aria-disabled')).toBe(
            'true'
          )
        );

        const nextButtonAtEnd = getNextButtonAtEnd();
        expect(nextButtonAtEnd).toBeTruthy();
        expect(nextButtonAtEnd?.tabIndex).toBe(-1);
      }
    );
  },
};

export const AttachmentScrollRTLTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    renderMultiAttachmentPromptField(canvasElement, 'rtl');

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await el.updateComplete;

    const scrollEl = el.shadowRoot?.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    );
    const getPrevButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-attachments-scroll-prev'
      );
    const getNextButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-attachments-scroll-next'
      );
    const firstAttachment = el.querySelector<HTMLElement>(
      '[slot="attachment"]'
    );

    await step('the next chevron pages forward in RTL', async () => {
      expect(getComputedStyle(el).direction).toBe('rtl');
      expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('true');

      getNextButton()?.click();
      // Wait for the smooth page-forward to settle: Prev becomes enabled and
      // the first tile has scrolled off the (RTL) trailing edge.
      await waitFor(() => {
        expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('false');
        expect(
          firstAttachment!.getBoundingClientRect().left >=
            scrollEl!.getBoundingClientRect().right
        ).toBe(true);
      });
    });
  },
};

/**
 * Resolves once the strip's horizontal scroll comes to rest (smooth paging has
 * stopped). Built on `waitFor`, so it inherits its polling and timeout instead
 * of a hand-tuned frame budget; it only reports "settled" after motion has been
 * observed, so it never resolves early at the pre-animation start position.
 */
async function waitForScrollSettled(
  scrollEl: HTMLDivElement | null | undefined
): Promise<void> {
  if (!scrollEl) {
    return;
  }
  let previous = Number.NaN;
  let moved = false;
  await waitFor(() => {
    const current = scrollEl.scrollLeft;
    if (!Number.isNaN(previous) && current !== previous) {
      moved = true;
    }
    const settled = moved && current === previous;
    previous = current;
    expect(settled, 'scroll position has come to rest').toBe(true);
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

export const AttachmentFocusOrderTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    renderMultiAttachmentPromptField(canvasElement);

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await el.updateComplete;

    const attachments = Array.from(
      el.querySelectorAll<HTMLElement>('[slot="attachment"]')
    );
    const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
      '.swc-PromptField-textarea'
    );
    const scrollEl = el.shadowRoot?.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    );
    const getNextButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-attachments-scroll-next'
      );
    const getPrevButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-attachments-scroll-prev'
      );
    const getDismissButton = (
      tile: HTMLElement
    ): HTMLButtonElement | null | undefined =>
      tile.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-UploadAttachment-dismiss'
      );

    await step(
      'the strip landmark is a region, but not itself a tab stop',
      async () => {
        const viewport = el.shadowRoot?.querySelector(
          '.swc-PromptField-attachments-viewport'
        );
        expect(viewport?.getAttribute('role')).toBe('region');
        expect(viewport?.getAttribute('aria-label')).toBe(
          'Uploaded assets strip'
        );
        expect((viewport as HTMLElement | null)?.hasAttribute('tabindex')).toBe(
          false
        );
      }
    );

    await step(
      'the first tile carries tabindex 0 from the start; the rest and their Close buttons stay out of the tab order',
      async () => {
        expect(attachments[0]?.tabIndex).toBe(0);
        expect(attachments.slice(1).every((tile) => tile.tabIndex === -1)).toBe(
          true
        );
        expect(
          attachments.every((tile) => getDismissButton(tile)?.tabIndex === -1)
        ).toBe(true);
      }
    );

    await step('first Tab reaches the first tile directly', async () => {
      textarea?.blur();
      attachments[0]?.focus();
      expect(getActiveElement()).toBe(attachments[0]);
    });

    await step('second Tab reveals the tile’s Close button', async () => {
      const event = dispatchKeydown(attachments[0]!, 'Tab');
      await el.updateComplete;

      expect(event.defaultPrevented).toBe(true);
      expect(focusedControl()).toBe(getDismissButton(attachments[0]!));
    });

    await step(
      'Shift+Tab from the Close button returns focus to the tile',
      async () => {
        const dismiss = getDismissButton(attachments[0]!)!;
        const event = dispatchKeydown(dismiss, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(attachments[0]);
      }
    );

    await step('Arrow Right moves the roving tab stop one tile', async () => {
      attachments[0]?.focus();
      dispatchKeydown(attachments[0]!, 'ArrowRight');
      await el.updateComplete;

      expect(attachments[0]?.tabIndex).toBe(-1);
      expect(attachments[1]?.tabIndex).toBe(0);
      expect(getActiveElement()).toBe(attachments[1]);
    });

    await step(
      'Tab from any active tile (not just the first) reveals its Close button',
      async () => {
        const event = dispatchKeydown(attachments[1]!, 'Tab');
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(focusedControl()).toBe(getDismissButton(attachments[1]!));
      }
    );

    await step(
      'Tab from the Close button reaches the ">" button when more content is scrolled out of view',
      async () => {
        const dismiss = getDismissButton(attachments[1]!)!;
        dismiss.focus();
        const event = dispatchKeydown(dismiss, 'Tab');
        await el.updateComplete;

        const nextButton = getNextButton();
        expect(nextButton).toBeTruthy();
        expect(event.defaultPrevented).toBe(true);
        expect(focusedControl()).toBe(nextButton);
      }
    );

    await step(
      'Tab from the ">" button (without activating it) moves forward, outside the strip',
      async () => {
        const nextButton = getNextButton()!;
        nextButton.focus();
        const event = dispatchKeydown(nextButton, 'Tab');
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(false);
      }
    );

    await step(
      'Shift+Tab from any active tile exits the strip to native default, not the Close button',
      async () => {
        attachments[3]?.focus();
        const event = dispatchKeydown(attachments[3]!, 'Tab', {
          shiftKey: true,
        });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(false);
      }
    );

    await step(
      'the "<" button becoming disabled while focused moves focus into the strip, not onto the hidden chevron',
      async () => {
        scrollEl?.scrollTo({ left: 200, behavior: 'instant' });
        // Scrolling off the start enables Prev.
        await waitFor(() =>
          expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('false')
        );
        expect(scrollEl?.scrollLeft ?? 0).toBeGreaterThan(0);

        const prevButton = getPrevButton();
        prevButton?.focus();
        expect(focusedControl()).toBe(prevButton);

        scrollEl?.scrollTo({ left: 0, behavior: 'instant' });
        // Back at the start, Prev disables and focus is redirected into the strip.
        await waitFor(() =>
          expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('true')
        );
        expect(attachments).toContain(focusedControl());
      }
    );

    await step(
      'dismissing a focused attachment restores focus to the nearest tile',
      async () => {
        const active = attachments[1]!;
        const dismiss = getDismissButton(active)!;
        el.addEventListener(
          'swc-upload-attachment-dismiss',
          (event) => (event.target as HTMLElement).remove(),
          { once: true }
        );

        dismiss.focus();
        dismiss.click();
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await el.updateComplete;

        expect(getActiveElement(), 'focus moves to the replacement tile').toBe(
          attachments[2]
        );
      }
    );
  },
};

/**
 * @todo SWC-2528 Flaky on Firefox (smooth-scroll focus-settle timing); skipped there until fixed.
 */
export const AttachmentChevronPagingFocusTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    // Skip on Firefox pending SWC-2528.
    if (navigator.userAgent.includes('Firefox')) {
      return;
    }

    renderMultiAttachmentPromptField(canvasElement);

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await el.updateComplete;

    const attachments = Array.from(
      el.querySelectorAll<HTMLElement>('[slot="attachment"]')
    );
    const scrollEl = el.shadowRoot?.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    );
    const getNextButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-attachments-scroll-next'
      );
    const getPrevButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-attachments-scroll-prev'
      );
    const visibleTiles = (): HTMLElement[] => {
      const viewportRect = scrollEl!.getBoundingClientRect();
      return attachments.filter((tile) => {
        const tileRect = tile.getBoundingClientRect();
        return (
          tileRect.right > viewportRect.left &&
          tileRect.left < viewportRect.right
        );
      });
    };

    /** The tile owning the active element: the tile itself, or (if focus
     * landed on its Close button) the shadow host of that button. */
    const activeTile = (): HTMLElement | null => {
      // focusedControl resolves the delegated focus to the dismiss button host,
      // whose own shadow host is the owning tile.
      const active = focusedControl();
      if (!active) {
        return null;
      }
      if (attachments.includes(active as HTMLElement)) {
        return active as HTMLElement;
      }
      const root = active.getRootNode();
      if (
        root instanceof ShadowRoot &&
        attachments.includes(root.host as HTMLElement)
      ) {
        return root.host as HTMLElement;
      }
      return null;
    };

    await step(
      'activating Next keeps focus on Next, not on any tile',
      async () => {
        const nextButton = getNextButton()!;
        nextButton.focus();
        const initialScrollLeft = scrollEl?.scrollLeft ?? 0;
        const clientWidth = scrollEl?.clientWidth ?? 0;
        nextButton.click();
        // Wait for the page-forward to settle (advanced more than half a
        // viewport), then confirm focus stayed put.
        await waitFor(() =>
          expect(
            (scrollEl?.scrollLeft ?? 0) - initialScrollLeft
          ).toBeGreaterThan(clientWidth / 2)
        );
        await el.updateComplete;

        expect(focusedControl()).toBe(nextButton);
      }
    );

    await step(
      'Shift+Tab from Next lands in the newly displayed set of tiles, not wherever focus was before paging',
      async () => {
        const nextButton = getNextButton()!;
        const currentlyVisible = visibleTiles();
        expect(
          currentlyVisible.includes(attachments[0]!),
          'sanity check: paging actually moved past the first tile'
        ).toBe(false);

        const event = dispatchKeydown(nextButton, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(currentlyVisible.includes(activeTile()!)).toBe(true);
      }
    );

    await step(
      'paging backward to the start moves focus into the newly displayed tiles',
      async () => {
        scrollEl?.scrollTo({ left: 0, behavior: 'instant' });
        await waitFor(() =>
          expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('true')
        );

        // Page forward to the end: the strip spans more than two viewports, so
        // it takes two pages before Next disables.
        const nextButton = getNextButton()!;
        const clientWidth = scrollEl?.clientWidth ?? 0;
        nextButton.click();
        await waitFor(() =>
          expect(scrollEl?.scrollLeft ?? 0).toBeGreaterThan(clientWidth / 2)
        );
        await el.updateComplete;
        nextButton.click();
        await waitFor(() =>
          expect(getNextButton()?.getAttribute('aria-disabled')).toBe('true')
        );

        const tilesBeforePagingBack = visibleTiles();

        const prevButton = getPrevButton()!;
        prevButton.focus();
        prevButton.click();
        // The visible set and focus land only once the page-back comes to rest.
        await waitForScrollSettled(scrollEl);
        await el.updateComplete;

        const tilesAfterPagingBack = visibleTiles();
        expect(
          tilesAfterPagingBack.some(
            (tile) => !tilesBeforePagingBack.includes(tile)
          ),
          'sanity check: paging back actually revealed a different set of tiles'
        ).toBe(true);

        // One page-back can land mid-strip (prev stays enabled and focused; Tab
        // moves into the strip) or at the start (prev disables and focus is
        // redirected into the strip). Either way keyboard focus ends up on a
        // tile in the newly displayed set.
        if (focusedControl() === getPrevButton()) {
          dispatchKeydown(getPrevButton()!, 'Tab');
          await el.updateComplete;
        }
        expect(tilesAfterPagingBack).toContain(activeTile());
      }
    );
  },
};

export const SingleAttachmentFocusTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    render(
      html`
        <swc-prompt-field label="Prompt" value="Review attachment.">
          <swc-upload-attachment slot="attachment" type="card" dismissible>
            <span slot="title">Brief.pdf</span>
          </swc-upload-attachment>
        </swc-prompt-field>
      `,
      canvasElement
    );

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await el.updateComplete;

    const attachment = el.querySelector<HTMLElement>('[slot="attachment"]');
    const getDismissButton = (): HTMLButtonElement | null | undefined =>
      attachment?.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-UploadAttachment-dismiss'
      );

    await step('a single attachment tile is reachable by Tab', async () => {
      expect(attachment?.tabIndex).toBe(0);
    });

    await step('Tab from the tile reveals its Close button', async () => {
      attachment?.focus();
      const event = dispatchKeydown(attachment!, 'Tab');
      await el.updateComplete;

      expect(event.defaultPrevented).toBe(true);
      expect(focusedControl()).toBe(getDismissButton());
    });

    await step(
      'Shift+Tab from the Close button returns focus to the tile',
      async () => {
        const dismiss = getDismissButton()!;
        const event = dispatchKeydown(dismiss, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(attachment);
      }
    );
  },
};

export const DragAndDropTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    const outerBorder = el.shadowRoot?.querySelector(
      '.swc-PromptField-outer-border'
    );

    await step(
      'dragging a file over the field marks the box dragged',
      async () => {
        el.dispatchEvent(makeDragEvent('dragover', makeFileDataTransfer()));
        await el.updateComplete;
        expect(outerBorder?.classList.contains('dragged')).toBe(true);

        const box = el.shadowRoot?.querySelector('.swc-PromptField-box');
        const gloss = el.shadowRoot?.querySelector('.swc-PromptField-gloss');
        expect(getComputedStyle(outerBorder!).backgroundImage).not.toBe('none');
        expect(getComputedStyle(box!).backgroundImage).toBe('none');
        expect(getComputedStyle(box!).outlineStyle).toBe('solid');
        expect(getComputedStyle(gloss!).backgroundImage).toBe('none');
        expect(getComputedStyle(outerBorder!).transitionProperty).toContain(
          'box-shadow'
        );
        expect(getComputedStyle(box!).transitionProperty).toContain(
          'box-shadow'
        );
        expect(getComputedStyle(box!, '::after').transitionProperty).toContain(
          'box-shadow'
        );
        await waitFor(() => {
          expect(getComputedStyle(outerBorder!).boxShadow).toBe('none');
          expect(getComputedStyle(box!).boxShadow).toBe('none');
        });

        el.generating = true;
        await el.updateComplete;
        expect(outerBorder?.classList.contains('dragged')).toBe(true);
        expect(getComputedStyle(box!).outlineStyle).toBe('solid');
      }
    );

    await step(
      'dragleave clears the dragged state after the debounce',
      async () => {
        el.dispatchEvent(makeDragEvent('dragleave'));
        await waitFor(() =>
          expect(outerBorder?.classList.contains('dragged')).toBe(false)
        );
        await el.updateComplete;
        expect(outerBorder?.classList.contains('dragged')).toBe(false);
      }
    );

    await step(
      'dropping files fires swc-prompt-field-drop with the dropped files and clears dragged',
      async () => {
        el.dispatchEvent(makeDragEvent('dragover', makeFileDataTransfer()));
        await el.updateComplete;

        const dt = new DataTransfer();
        dt.items.add(new File(['hello'], 'hello.txt', { type: 'text/plain' }));

        let detail: { files: File[] } | undefined;
        el.addEventListener(
          'swc-prompt-field-drop',
          (event) => {
            detail = (event as CustomEvent<{ files: File[] }>).detail;
          },
          { once: true }
        );

        el.dispatchEvent(makeDragEvent('drop', dt));
        await el.updateComplete;

        expect(detail?.files.length).toBe(1);
        expect(detail?.files[0].name).toBe('hello.txt');
        expect(outerBorder?.classList.contains('dragged')).toBe(false);
      }
    );

    await step(
      'dropping with no files does not fire swc-prompt-field-drop',
      async () => {
        el.dispatchEvent(makeDragEvent('dragover', makeFileDataTransfer()));
        await el.updateComplete;

        let fired = false;
        el.addEventListener(
          'swc-prompt-field-drop',
          () => {
            fired = true;
          },
          { once: true }
        );

        el.dispatchEvent(makeDragEvent('drop', new DataTransfer()));
        await el.updateComplete;

        expect(fired).toBe(false);
      }
    );

    await step('non-file drags are rejected', async () => {
      const dataTransfer = new DataTransfer();
      dataTransfer.setData('text/plain', 'not a file');
      const event = makeDragEvent('dragover', dataTransfer);

      el.generating = false;
      await el.updateComplete;
      el.dispatchEvent(event);
      await el.updateComplete;

      expect(event.dataTransfer?.dropEffect).toBe('none');
      expect(outerBorder?.classList.contains('dragged')).toBe(false);
    });

    await step('disabled field rejects the drag entirely', async () => {
      el.disabled = true;
      await el.updateComplete;

      const event = makeDragEvent('dragover', makeFileDataTransfer());
      el.dispatchEvent(event);
      await el.updateComplete;

      expect(event.dataTransfer?.dropEffect).toBe('none');
      expect(outerBorder?.classList.contains('dragged')).toBe(false);

      el.disabled = false;
      await el.updateComplete;

      el.dispatchEvent(makeDragEvent('dragover', makeFileDataTransfer()));
      await el.updateComplete;
      expect(outerBorder?.classList.contains('dragged')).toBe(true);

      let fired = false;
      el.addEventListener('swc-prompt-field-drop', () => (fired = true), {
        once: true,
      });
      el.disabled = true;
      await el.updateComplete;
      el.dispatchEvent(makeDragEvent('drop', makeFileDataTransfer()));
      await el.updateComplete;

      expect(fired).toBe(false);
      expect(outerBorder?.classList.contains('dragged')).toBe(false);
    });
  },
};

export const PlaygroundDropTest: Story = {
  ...Playground,
  play: async ({ canvasElement, step }) => {
    const demo = canvasElement.querySelector('swc-prompt-field-behavior-demo');
    const el = await getComponent<PromptField>(demo!, 'swc-prompt-field');
    const textarea = el.shadowRoot?.querySelector<HTMLTextAreaElement>(
      '.swc-PromptField-textarea'
    );

    const dropFile = (name: string): void => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(new File(['hello'], name, { type: 'text/plain' }));
      el.dispatchEvent(makeDragEvent('dragover', dataTransfer));
      el.dispatchEvent(makeDragEvent('drop', dataTransfer));
    };

    await step(
      'Playground renders a dropped attachment without stealing focus',
      async () => {
        textarea?.blur();
        dropFile('first.txt');

        await waitFor(() => {
          const attachment = demo?.querySelector<HTMLElement>(
            '[data-attachment-id]'
          );
          expect(attachment).toBeTruthy();
          expect(getActiveElement()).not.toBe(attachment);
        });
      }
    );

    await step(
      'Playground preserves prompt input focus when another attachment is dropped',
      async () => {
        textarea?.focus();
        dropFile('second.txt');

        await waitFor(() => {
          expect(demo?.querySelectorAll('[data-attachment-id]').length).toBe(2);
          expect(getActiveElement()).toBe(textarea);
        });
      }
    );
  },
};

export const StatusLoaderTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    render(
      html`
        <swc-prompt-field
          label="Prompt"
          loader="analyze"
          generating
        ></swc-prompt-field>
      `,
      canvasElement
    );

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;

    const loader = () =>
      el.shadowRoot?.querySelector(
        '.swc-PromptField-status-icon swc-pixel-loader'
      );

    await step(
      'a preset name routes to the loader preset and generating animates it',
      async () => {
        expect(loader()?.getAttribute('preset')).toBe('analyze');
        expect(loader()?.hasAttribute('paused')).toBe(false);
      }
    );

    await step(
      'an icon name routes to the loader icon and idle pauses it',
      async () => {
        el.generating = false;
        el.loader = 'wand';
        await el.updateComplete;

        expect(loader()?.hasAttribute('paused')).toBe(true);
        expect(loader()?.hasAttribute('preset')).toBe(false);
        expect(loader()?.getAttribute('icon')).toBe('wand');
      }
    );
  },
};

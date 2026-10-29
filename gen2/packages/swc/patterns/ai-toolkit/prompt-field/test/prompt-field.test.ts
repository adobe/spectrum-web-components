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
      expect('label' in el).toBe(false);
      expect(el.accessibleLabel).toBe('AI prompt');
      expect(el.sendAccessibleLabel).toBe('Submit AI prompt');
      expect(el.stopAccessibleLabel).toBe('Stop generating');
      expect(el.uploadAccessibleLabel).toBe('Add attachment');
      expect(el.attachmentScrollPrevAccessibleLabel).toBe(
        'Show previous attachments'
      );
      expect(el.attachmentScrollNextAccessibleLabel).toBe(
        'Show more attachments'
      );
      expect(el.attachmentStripAccessibleLabel).toBe('Uploaded assets strip');

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
        textarea?.style.getPropertyValue(
          '--_swc-prompt-field-textarea-min-rows'
        )
      ).toBe('3');
      expect(
        textarea?.style.getPropertyValue(
          '--_swc-prompt-field-textarea-max-rows'
        )
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

export const AccessibleNameTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    const textarea = (): HTMLTextAreaElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
    const aiMark = (): HTMLElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLElement>('.swc-PromptField-status-icon');

    await step('textarea is named by aria-label', async () => {
      expect(textarea()?.getAttribute('aria-label')).toBe('AI prompt');
      expect(textarea()?.hasAttribute('aria-labelledby')).toBe(false);
    });

    await step('AI mark is decorative', async () => {
      expect(aiMark()?.getAttribute('aria-hidden')).toBe('true');
      expect(aiMark()?.hasAttribute('aria-label')).toBe(false);
      expect(aiMark()?.hasAttribute('id')).toBe(false);
    });

    await step('no visually hidden label text is rendered', async () => {
      expect(el.shadowRoot?.querySelector('.swc-PromptField-label')).toBeNull();
      expect(el.shadowRoot?.querySelector('.swc-VisuallyHidden')).toBeNull();
    });

    await step('accessible-label renames the textarea', async () => {
      el.accessibleLabel = 'Ask Firefly';
      await el.updateComplete;
      expect(textarea()?.getAttribute('aria-label')).toBe('Ask Firefly');
      el.accessibleLabel = 'AI prompt';
      await el.updateComplete;
    });
  },
};

export const ActionButtonStateTest: Story = {
  ...Overview,
  args: {
    ...Overview.args,
    value: 'Draft a launch plan.',
  },
  play: async ({ canvasElement, step }) => {
    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    const actionButton = (): HTMLElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLElement>(
        '.swc-PromptField-send, .swc-PromptField-stop'
      );
    const button = actionButton();

    await step('send state is named "Submit AI prompt"', async () => {
      expect(button?.classList.contains('swc-PromptField-send')).toBe(true);
      expect(button?.getAttribute('accessible-label')).toBe('Submit AI prompt');
    });

    await step(
      'the same button becomes "Stop generating" and keeps focus while generating',
      async () => {
        button?.focus();
        el.generating = true;
        await el.updateComplete;

        expect(actionButton()).toBe(button);
        expect(button?.classList.contains('swc-PromptField-stop')).toBe(true);
        expect(button?.getAttribute('accessible-label')).toBe(
          'Stop generating'
        );
        expect(el.shadowRoot?.activeElement).toBe(button);
      }
    );

    await step(
      'an empty prompt after generating keeps focus via aria-disabled',
      async () => {
        el.value = '';
        el.generating = false;
        await el.updateComplete;

        expect(actionButton()).toBe(button);
        expect(button?.classList.contains('swc-PromptField-send')).toBe(true);
        expect(button?.getAttribute('aria-disabled')).toBe('true');
        expect(button?.hasAttribute('disabled')).toBe(false);
        expect(el.shadowRoot?.activeElement).toBe(button);
      }
    );

    await step('the aria-disabled send button does not submit', async () => {
      let submitted = false;
      el.addEventListener(
        'swc-prompt-field-submit',
        () => {
          submitted = true;
        },
        { once: true }
      );
      button?.click();
      expect(submitted).toBe(false);
    });

    await step('a disabled field natively disables the button', async () => {
      el.value = 'Draft a launch plan.';
      el.disabled = true;
      await el.updateComplete;
      expect(button?.hasAttribute('disabled')).toBe(true);
      el.disabled = false;
      await el.updateComplete;
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
  render: () => '',
  play: async ({ canvasElement, step }) => {
    await withWarningSpy(async (warnCalls) => {
      render(
        html`
          <swc-prompt-field value="No legal disclaimer"></swc-prompt-field>
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

export const EmptyAccessibleLabelWarningTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    await withWarningSpy(async (warnCalls) => {
      render(
        html`
          <swc-prompt-field accessible-label="">
            <p slot="legal">Approved legal copy.</p>
          </swc-prompt-field>
        `,
        canvasElement
      );

      const el = await getComponent<PromptField>(
        canvasElement,
        'swc-prompt-field'
      );
      await el.updateComplete;

      await step(
        'logs a development warning when accessible-label is empty',
        async () => {
          expect(
            warnCalls.some(([, message]) =>
              String(message).includes('accessible-label is empty')
            ),
            'an empty accessible-label emits a debug warning'
          ).toBe(true);
        }
      );

      el.accessibleLabel = 'AI prompt';
      await el.updateComplete;
      expect(
        warnCalls,
        'a non-empty accessible-label emits no additional warning'
      ).toHaveLength(1);
    });
  },
};

export const MixedAttachmentWarningTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    await withWarningSpy(async (warnCalls) => {
      render(
        html`
          <swc-prompt-field value="Mixed attachments">
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

// A chevron with nothing to scroll to is hidden: via `aria-disabled` where
// the component tracks the scroll state, or via the scroll-driven
// `visibility: hidden` where scroll-driven animations are supported.
const isChevronHidden = (button: Element | null | undefined): boolean =>
  !!button &&
  (button.getAttribute('aria-disabled') === 'true' ||
    getComputedStyle(button).visibility === 'hidden');

// Failure-message detail for chevron visibility assertions.
const describeChevron = (button: Element | null | undefined): string =>
  button
    ? `aria-disabled=${button.getAttribute('aria-disabled')}, visibility=${
        getComputedStyle(button).visibility
      }, focus-visible-pin=${button.classList.contains('is-focus-visible')}`
    : 'not rendered';

// Whether `tile` is fully visible: inside the strip and clear of each shown
// chevron and its edge fade. That clearance is the strip's scroll-padding.
const isTileFullyVisible = (field: PromptField, tile: HTMLElement): boolean => {
  const part = (selector: string): HTMLElement | null =>
    field.shadowRoot!.querySelector<HTMLElement>(selector);
  const scrollEl = part('.swc-PromptField-attachments-scroll')!;
  const scrollRect = scrollEl.getBoundingClientRect();
  const scrollStyle = getComputedStyle(scrollEl);
  const prevShown = !isChevronHidden(
    part('.swc-PromptField-attachments-scroll-prev')
  );
  const nextShown = !isChevronHidden(
    part('.swc-PromptField-attachments-scroll-next')
  );
  const left =
    scrollRect.left +
    (prevShown ? parseFloat(scrollStyle.scrollPaddingLeft) : 0);
  const right =
    scrollRect.right -
    (nextShown ? parseFloat(scrollStyle.scrollPaddingRight) : 0);
  const rect = tile.getBoundingClientRect();
  return rect.left >= left - 1 && rect.right <= right + 1;
};

// Whether `tile` looks whole: its edge can reach into the lighter half of an
// edge fade, which runs from the chevron to the scroll-padding edge. This is
// how the strip picks its Tab stop after a scroll.
const looksWhole = (field: PromptField, tile: HTMLElement): boolean => {
  const part = (selector: string): HTMLElement | null =>
    field.shadowRoot!.querySelector<HTMLElement>(selector);
  const scrollEl = part('.swc-PromptField-attachments-scroll')!;
  const scrollRect = scrollEl.getBoundingClientRect();
  const scrollStyle = getComputedStyle(scrollEl);
  const prev = part('.swc-PromptField-attachments-scroll-prev');
  const next = part('.swc-PromptField-attachments-scroll-next');
  const left =
    prev && !isChevronHidden(prev)
      ? (scrollRect.left +
          parseFloat(scrollStyle.scrollPaddingLeft) +
          prev.getBoundingClientRect().right) /
        2
      : scrollRect.left + parseFloat(scrollStyle.paddingLeft);
  const right =
    next && !isChevronHidden(next)
      ? (scrollRect.right -
          parseFloat(scrollStyle.scrollPaddingRight) +
          next.getBoundingClientRect().left) /
        2
      : scrollRect.right - parseFloat(scrollStyle.paddingRight);
  const rect = tile.getBoundingClientRect();
  return rect.left >= left - 1 && rect.right <= right + 1;
};

// The scroll range over which each edge fade grows in. Where scroll-driven
// animations are supported, a chevron shows only past it.
const fadeRange = (field: PromptField): number =>
  parseFloat(
    getComputedStyle(
      field.shadowRoot!.querySelector('.swc-PromptField-attachments-row')!
    ).getPropertyValue('--_swc-prompt-field-attachment-fade-range')
  );

// Whether the strip has stopped inside an edge fade, where a tile is cut off
// but the chevron for that end is hidden.
const restsInsideEdgeFade = (field: PromptField): boolean => {
  const scrollEl = field.shadowRoot!.querySelector<HTMLElement>(
    '.swc-PromptField-attachments-scroll'
  )!;
  const offset = Math.abs(scrollEl.scrollLeft);
  const max = scrollEl.scrollWidth - scrollEl.clientWidth;
  const range = fadeRange(field);
  return (
    (offset > 1 && offset < range - 1) ||
    (offset > max - range + 1 && offset < max - 1)
  );
};

function renderMultiAttachmentPromptField(
  canvasElement: HTMLElement,
  direction?: 'rtl'
): void {
  render(
    html`
      <div style="inline-size:480px;" dir=${direction ?? nothing}>
        <swc-prompt-field value="Review attachments.">
          ${Array.from({ length: 14 }, (_, index) => index).map(
            (index) => html`
              <swc-upload-attachment slot="attachment" type="media" dismissible>
                <div
                  slot="thumbnail"
                  role="img"
                  aria-label="Frame ${index + 1}"
                  style="inline-size:100%;block-size:100%;background:${attachmentScrollGradient};"
                ></div>
                <span slot="title">frame-${index + 1}.png</span>
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
  render: () => '',
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
    useInstantScroll(scrollEl);
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

        el.attachmentScrollPrevAccessibleLabel = 'Show earlier attachments';
        el.attachmentScrollNextAccessibleLabel = 'Show later attachments';
        await el.updateComplete;
        expect(nextButton?.getAttribute('accessible-label')).toBe(
          'Show later attachments'
        );
      }
    );

    await step('edge fades render when paging is available', async () => {
      // has-scroll-next sets the chevron scroll-padding and the fallback end
      // fade; where supported, a scroll-driven animation runs the fades.
      expect(scrollEl?.classList.contains('has-scroll-next')).toBe(true);
      if (CSS.supports('animation-timeline: scroll()')) {
        const viewport = el.shadowRoot!.querySelector<HTMLElement>(
          '.swc-PromptField-attachments-viewport'
        )!;
        expect(viewport.getAnimations().length).toBeGreaterThan(0);
        expect(scrollEl!.getAnimations().length).toBeGreaterThan(0);
      }
    });

    await step(
      'a chevron shows only past its edge fade, and never partly transparent',
      async () => {
        if (!CSS.supports('animation-timeline: scroll()')) {
          return;
        }
        const prevButton = el.shadowRoot!.querySelector<HTMLElement>(
          '.swc-PromptField-attachments-scroll-prev'
        )!;
        const range = fadeRange(el);
        expect(range, 'sanity check: the fade range is set').toBeGreaterThan(4);

        // Inside the fade range, even near its end, Prev stays hidden.
        for (const left of [2, range / 2, range - 2]) {
          scrollEl!.scrollTo({ left, behavior: 'instant' });
          await waitForScrollSettled(scrollEl);
          expect(
            isChevronHidden(prevButton),
            `Prev at ${left}px: ${describeChevron(prevButton)}`
          ).toBe(true);
        }

        // Past the fade range, Prev shows fully opaque.
        scrollEl!.scrollTo({ left: range + 2, behavior: 'instant' });
        await waitForScrollSettled(scrollEl);
        const style = getComputedStyle(prevButton);
        expect(style.visibility).toBe('visible');
        expect(Number(style.opacity)).toBe(1);

        scrollEl!.scrollTo({ left: 0, behavior: 'instant' });
        await waitFor(() => expect(isChevronHidden(prevButton)).toBe(true));
      }
    );

    await step(
      'a chevron with keyboard focus stays shown; blurring it releases it',
      async () => {
        // Script focus with no prior pointer input matches :focus-visible.
        nextButton!.focus();
        await el.updateComplete;
        expect(nextButton!.classList.contains('is-focus-visible')).toBe(true);
        if (CSS.supports('animation-timeline: scroll()')) {
          expect(getComputedStyle(nextButton!).animationName).toBe('none');
        }
        nextButton!.blur();
        await el.updateComplete;
        expect(nextButton!.classList.contains('is-focus-visible')).toBe(false);
      }
    );

    await step(
      'chevron paging brings the partly hidden trailing tile to the start',
      async () => {
        const clientWidth = scrollEl?.clientWidth ?? 0;
        const tiles = scrollEl
          ?.querySelector('slot')
          ?.assignedElements({ flatten: true }) as HTMLElement[];
        const scrollRect = scrollEl!.getBoundingClientRect();
        const visibleRight =
          scrollRect.right -
          parseFloat(getComputedStyle(scrollEl!).scrollPaddingRight);
        // The first tile the Next chevron or its edge fade covers, even partly.
        const expectedFirst = tiles.find(
          (tile) => tile.getBoundingClientRect().right > visibleRight + 1
        )!;
        expect(
          expectedFirst.getBoundingClientRect().left < scrollRect.right,
          'sanity check: the expected tile is partly visible before paging'
        ).toBe(true);

        nextButton?.click();
        await waitForScrollSettled(scrollEl);
        await el.updateComplete;

        expect(scrollEl?.clientWidth).toBe(clientWidth);
        expect(
          el.shadowRoot
            ?.querySelector<HTMLButtonElement>(
              '.swc-PromptField-attachments-scroll-prev'
            )
            ?.getAttribute('accessible-label')
        ).toBe('Show earlier attachments');

        // The tile lands fully clear of the now-visible Prev chevron, and
        // the tile before it is no longer fully visible.
        const prevRect = el
          .shadowRoot!.querySelector<HTMLElement>(
            '.swc-PromptField-attachments-scroll-prev'
          )!
          .getBoundingClientRect();
        const firstRect = expectedFirst.getBoundingClientRect();
        expect(firstRect.left).toBeGreaterThanOrEqual(prevRect.right);
        const previousTile = tiles[tiles.indexOf(expectedFirst) - 1]!;
        expect(previousTile.getBoundingClientRect().left).toBeLessThan(
          scrollRect.left
        );

        expect(getComputedStyle(scrollEl!).scrollSnapType).toBe('none');
      }
    );

    await step(
      'scrolling to the end hides (not removes) the Next chevron, so a focused chevron is never blurred by unmounting',
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
          expect(isChevronHidden(getNextButtonAtEnd())).toBe(true)
        );

        const nextButtonAtEnd = getNextButtonAtEnd();
        expect(nextButtonAtEnd).toBeTruthy();
        expect(
          nextButtonAtEnd!.tabIndex === -1 ||
            getComputedStyle(nextButtonAtEnd!).visibility === 'hidden',
          'the hidden Next chevron is out of the tab order'
        ).toBe(true);
        if (CSS.supports('animation-timeline: scroll()')) {
          // Scroll-driven chevrons are never disabled, so they never show a
          // disabled state while the strip is still moving.
          expect(nextButtonAtEnd?.getAttribute('aria-disabled')).toBe('false');
        }
      }
    );
  },
};

export const AttachmentScrollMultipleFieldsTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    render(
      html`
        <div style="inline-size:480px;">
          <swc-prompt-field label="Media" value="Review frames.">
            ${Array.from(
              { length: 12 },
              (_, index) => html`
                <swc-upload-attachment
                  slot="attachment"
                  type="media"
                  dismissible
                >
                  <span slot="title">frame-${index + 1}.png</span>
                </swc-upload-attachment>
              `
            )}
          </swc-prompt-field>
          <swc-prompt-field label="Cards" value="Use these files.">
            ${Array.from(
              { length: 6 },
              (_, index) => html`
                <swc-upload-attachment
                  slot="attachment"
                  type="card"
                  dismissible
                >
                  <span slot="title">File ${index + 1}</span>
                  <span slot="subtitle">PDF</span>
                </swc-upload-attachment>
              `
            )}
          </swc-prompt-field>
        </div>
      `,
      canvasElement
    );

    const [media, cards] = Array.from(
      canvasElement.querySelectorAll<PromptField>('swc-prompt-field')
    );
    await media.updateComplete;
    await cards.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await media.updateComplete;
    await cards.updateComplete;

    const part = (field: PromptField, selector: string) =>
      field.shadowRoot?.querySelector<HTMLElement>(selector);
    const cardsScroll = part(
      cards,
      '.swc-PromptField-attachments-scroll'
    ) as HTMLDivElement;
    useInstantScroll(cardsScroll);

    await step('the cards Next chevron pages forward', async () => {
      part(cards, '.swc-PromptField-attachments-scroll-next')?.click();
      await waitForScrollSettled(cardsScroll);
      expect(cardsScroll.scrollLeft).toBeGreaterThan(0);
      cardsScroll.scrollTo({ left: 0, behavior: 'instant' });
    });

    await step(
      "each field's chevrons follow its own strip, not another field's",
      async () => {
        await waitFor(() =>
          expect(
            isChevronHidden(
              part(cards, '.swc-PromptField-attachments-scroll-prev')
            )
          ).toBe(true)
        );

        cardsScroll.scrollTo({
          left: cardsScroll.scrollWidth,
          behavior: 'instant',
        });
        await waitFor(() => {
          const cardsPrev = part(
            cards,
            '.swc-PromptField-attachments-scroll-prev'
          );
          const cardsNext = part(
            cards,
            '.swc-PromptField-attachments-scroll-next'
          );
          expect(
            isChevronHidden(cardsPrev),
            `cards Prev at the end: ${describeChevron(cardsPrev)}`
          ).toBe(false);
          expect(
            isChevronHidden(cardsNext),
            `cards Next at the end: ${describeChevron(cardsNext)}`
          ).toBe(true);
        });

        // The media strip never moved, so its chevrons stay at the start.
        expect(
          isChevronHidden(
            part(media, '.swc-PromptField-attachments-scroll-prev')
          )
        ).toBe(true);
        expect(
          isChevronHidden(
            part(media, '.swc-PromptField-attachments-scroll-next')
          )
        ).toBe(false);
      }
    );

    await step('the cards Prev chevron pages back', async () => {
      const before = cardsScroll.scrollLeft;
      part(cards, '.swc-PromptField-attachments-scroll-prev')?.click();
      await waitForScrollSettled(cardsScroll);
      expect(cardsScroll.scrollLeft).toBeLessThan(before);
    });
  },
};

export const AttachmentScrollNarrowCardsTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    // Cards wider than the space between the chevrons, as in a narrow
    // composer, so a card can't ever be fully visible. The end cards are
    // also wider than the space next to one chevron, so aligning them again
    // would not move the strip: paging must still reach both ends.
    render(
      html`
        <div style="inline-size:300px;">
          <swc-prompt-field value="Use these files.">
            ${Array.from(
              { length: 4 },
              (_, index) => html`
                <swc-upload-attachment
                  slot="attachment"
                  type="card"
                  dismissible
                >
                  <span slot="title">File ${index + 1}</span>
                  <span slot="subtitle">PDF</span>
                </swc-upload-attachment>
              `
            )}
          </swc-prompt-field>
        </div>
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

    const scrollEl = el.shadowRoot!.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    )!;
    useInstantScroll(scrollEl);
    const chevron = (side: 'prev' | 'next') =>
      el.shadowRoot!.querySelector<HTMLElement>(
        `.swc-PromptField-attachments-scroll-${side}`
      )!;
    const maxScroll = () => scrollEl.scrollWidth - scrollEl.clientWidth;

    await step('Next keeps paging until the end, then hides', async () => {
      for (
        let page = 0;
        page < 6 && scrollEl.scrollLeft < maxScroll() - 1;
        page++
      ) {
        const before = scrollEl.scrollLeft;
        chevron('next').click();
        await waitForScrollSettled(scrollEl);
        await el.updateComplete;
        expect(scrollEl.scrollLeft, `page ${page + 1} moved`).toBeGreaterThan(
          before
        );
      }
      expect(scrollEl.scrollLeft).toBeGreaterThanOrEqual(maxScroll() - 1);
      await waitFor(() =>
        expect(
          isChevronHidden(chevron('next')),
          describeChevron(chevron('next'))
        ).toBe(true)
      );
    });

    await step(
      "at the end, the last tile's Close button focus ring isn't clipped",
      async () => {
        const tiles = Array.from(
          el.querySelectorAll<HTMLElement>('[slot="attachment"]')
        );
        const dismiss = tiles[tiles.length - 1]!.shadowRoot!.querySelector(
          '.swc-UploadAttachment-dismiss'
        )!;
        // focus-ring-gap + focus-indicator-thickness, outside the button.
        const ringOverhang = 4;
        expect(
          dismiss.getBoundingClientRect().right + ringOverhang
        ).toBeLessThanOrEqual(scrollEl.getBoundingClientRect().right + 0.5);
      }
    );

    await step(
      "at the end, Tab from the last tile's Close button skips the hidden Next chevron",
      async () => {
        const tiles = Array.from(
          el.querySelectorAll<HTMLElement>('[slot="attachment"]')
        );
        const dismiss = tiles[
          tiles.length - 1
        ]!.shadowRoot!.querySelector<HTMLElement>(
          '.swc-UploadAttachment-dismiss'
        )!;
        dismiss.focus();
        const event = dispatchKeydown(dismiss, 'Tab');
        expect(event.defaultPrevented).toBe(false);
      }
    );

    await step('Prev keeps paging until the start, then hides', async () => {
      for (let page = 0; page < 6 && scrollEl.scrollLeft > 1; page++) {
        const before = scrollEl.scrollLeft;
        chevron('prev').click();
        await waitForScrollSettled(scrollEl);
        await el.updateComplete;
        expect(scrollEl.scrollLeft, `page ${page + 1} moved`).toBeLessThan(
          before
        );
      }
      expect(scrollEl.scrollLeft).toBeLessThanOrEqual(1);
      await waitFor(() =>
        expect(
          isChevronHidden(chevron('prev')),
          describeChevron(chevron('prev'))
        ).toBe(true)
      );
    });
  },
};

export const AttachmentScrollRTLTest: Story = {
  render: () => '',
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
      // A scroll-driven chevron's hidden state applies once its scroll
      // timeline attaches, a frame after it renders.
      await waitFor(() => expect(isChevronHidden(getPrevButton())).toBe(true));

      getNextButton()?.click();
      // Wait for the smooth page-forward to settle: Prev becomes enabled and
      // the first tile has scrolled off the (RTL) trailing edge.
      await waitFor(() => {
        expect(isChevronHidden(getPrevButton())).toBe(false);
        expect(
          firstAttachment!.getBoundingClientRect().left >=
            scrollEl!.getBoundingClientRect().right
        ).toBe(true);
      });
    });
  },
};

/**
 * Makes chevron paging in `scrollEl` instant instead of smooth. The scroll
 * then lands on its final position right away, so tests don't poll a smooth
 * scroll animation, which is timing-dependent on a loaded machine.
 */
function useInstantScroll(scrollEl: HTMLElement | null | undefined): void {
  scrollEl?.style.setProperty('scroll-behavior', 'auto');
}

/**
 * Waits for the frames after an instant scroll, so its `scroll`/`scrollend`
 * handling (including the component's frame-count fallback) and the
 * re-render have run.
 */
async function waitForScrollSettled(
  scrollEl: HTMLDivElement | null | undefined
): Promise<void> {
  if (!scrollEl) {
    return;
  }
  for (let frame = 0; frame < 5; frame++) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}

/**
 * Waits for a smooth scroll in `scrollEl` to stop: `scrollLeft` holds steady
 * for several frames in a row.
 */
async function waitForScrollStopped(scrollEl: HTMLElement): Promise<void> {
  let lastScrollLeft = Number.NaN;
  let stableFrames = 0;
  for (let frame = 0; frame < 300 && stableFrames < 5; frame++) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
    stableFrames =
      scrollEl.scrollLeft === lastScrollLeft ? stableFrames + 1 : 0;
    lastScrollLeft = scrollEl.scrollLeft;
  }
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
  render: () => '',
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
      'the "<" button hiding while focused moves focus to the first tile, not onto the hidden chevron',
      async () => {
        scrollEl?.scrollTo({ left: 200, behavior: 'instant' });
        // Scrolling off the start enables Prev.
        await waitFor(() =>
          expect(isChevronHidden(getPrevButton())).toBe(false)
        );
        expect(scrollEl?.scrollLeft ?? 0).toBeGreaterThan(0);

        const prevButton = getPrevButton();
        prevButton?.focus();
        expect(focusedControl()).toBe(prevButton);

        scrollEl?.scrollTo({ left: 0, behavior: 'instant' });
        // Back at the start, Prev hides and focus moves to the first tile.
        await waitFor(() =>
          expect(isChevronHidden(getPrevButton())).toBe(true)
        );
        expect(focusedControl()).toBe(attachments[0]);
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

export const AttachmentArrowKeyScrollTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    // Each card fits between the chevrons, but the next card is mostly
    // hidden. Smooth scrolling stays on: `focus()` stops a smooth scroll
    // that starts before it.
    render(
      html`
        <div style="inline-size:480px;">
          <swc-prompt-field value="Use these files.">
            ${Array.from(
              { length: 4 },
              (_, index) => html`
                <swc-upload-attachment
                  slot="attachment"
                  type="card"
                  dismissible
                >
                  <span slot="title">File ${index + 1}</span>
                  <span slot="subtitle">PDF</span>
                </swc-upload-attachment>
              `
            )}
          </swc-prompt-field>
        </div>
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

    const attachments = Array.from(
      el.querySelectorAll<HTMLElement>('[slot="attachment"]')
    );
    const scrollEl = el.shadowRoot!.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    )!;

    const moveFocus = async (
      key: 'ArrowLeft' | 'ArrowRight',
      tile: HTMLElement
    ): Promise<void> => {
      dispatchKeydown(getActiveElement()!, key);
      expect(getActiveElement()).toBe(tile);
      await waitFor(
        () =>
          expect(
            isTileFullyVisible(el, tile),
            `card ${attachments.indexOf(tile) + 1} is fully visible`
          ).toBe(true),
        { timeout: 3000 }
      );
      await waitForScrollStopped(scrollEl);
    };

    await step(
      'Arrow Right scrolls each focused card fully into view',
      async () => {
        attachments[0]!.focus();
        await waitForScrollStopped(scrollEl);
        for (const tile of attachments.slice(1)) {
          await moveFocus('ArrowRight', tile);
        }
      }
    );

    await step(
      'Arrow Left scrolls each focused card fully into view',
      async () => {
        for (const tile of attachments.slice(0, -1).reverse()) {
          await moveFocus('ArrowLeft', tile);
        }
      }
    );
  },
};

/**
 * @todo SWC-2528 Flaky on Firefox and WebKit (smooth-scroll focus-settle
 * timing); skipped there until fixed.
 */
export const AttachmentChevronPagingFocusTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    // Skip on Firefox and WebKit pending SWC-2528. WebKit UAs include
    // "Safari" but not "Chrome" (Chromium UAs include both).
    const isWebKit =
      navigator.userAgent.includes('Safari') &&
      !navigator.userAgent.includes('Chrome');
    if (navigator.userAgent.includes('Firefox') || isWebKit) {
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
    useInstantScroll(scrollEl);
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
        // Wait for the page-forward to come to rest, then confirm it advanced
        // and focus stayed put.
        await waitForScrollSettled(scrollEl);
        await el.updateComplete;

        expect((scrollEl?.scrollLeft ?? 0) - initialScrollLeft).toBeGreaterThan(
          clientWidth / 2
        );
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
        // Move focus off the tile first: the browser keeps a focused, partly
        // visible tile's Close button in view, which would pull the strip
        // back off the start after the reset below.
        const nextButton = getNextButton()!;
        nextButton.focus();
        scrollEl?.scrollTo({ left: 0, behavior: 'instant' });
        await waitFor(() =>
          expect(
            isChevronHidden(getPrevButton()),
            `Prev at scrollLeft ${scrollEl?.scrollLeft}: ${describeChevron(getPrevButton())}`
          ).toBe(true)
        );

        // Page forward to the end. Each page brings the partly hidden tile to
        // the start, so it takes several pages to reach the end, where Next
        // hides (after moving focus into the strip).
        for (
          let page = 0;
          page < 10 &&
          (scrollEl?.scrollLeft ?? 0) <
            (scrollEl?.scrollWidth ?? 0) - (scrollEl?.clientWidth ?? 0) - 1;
          page++
        ) {
          nextButton.click();
          await waitForScrollSettled(scrollEl);
          await el.updateComplete;
        }
        await waitFor(() =>
          expect(isChevronHidden(getNextButton())).toBe(true)
        );
        expect(
          focusedControl(),
          'Next hiding at the end moves focus to the last tile'
        ).toBe(attachments[attachments.length - 1]);

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

export const AttachmentChevronPagingTabStopTest: Story = {
  render: () => '',
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
    const scrollEl = el.shadowRoot!.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    )!;
    useInstantScroll(scrollEl);
    const chevron = (side: 'prev' | 'next'): HTMLElement =>
      el.shadowRoot!.querySelector<HTMLElement>(
        `.swc-PromptField-attachments-scroll-${side}`
      )!;
    const tabStop = (): HTMLElement | undefined =>
      attachments.find((tile) => tile.tabIndex === 0);
    const firstWholeTile = (): HTMLElement | undefined =>
      attachments.find((tile) => looksWhole(el, tile));
    const scrollDriven = CSS.supports('animation-timeline: scroll()');
    const page = async (side: 'prev' | 'next'): Promise<void> => {
      for (
        let count = 0;
        count < 10 && !isChevronHidden(chevron(side));
        count++
      ) {
        chevron(side).click();
        await waitForScrollSettled(scrollEl);
        await el.updateComplete;
        if (scrollDriven) {
          expect(
            restsInsideEdgeFade(el),
            `page ${count + 1} stopped inside an edge fade at ${scrollEl.scrollLeft}px`
          ).toBe(false);
        }
      }
      expect(
        isChevronHidden(chevron(side)),
        describeChevron(chevron(side))
      ).toBe(true);
    };

    await step(
      'after paging to the end, Tab moves to the first tile that looks whole, not a tile mid-strip',
      async () => {
        await page('next');
        await waitFor(() => expect(tabStop()).toBe(firstWholeTile()));
        expect(
          tabStop(),
          'sanity check: paging moved past the first tile'
        ).not.toBe(attachments[0]);

        chevron('prev').focus();
        const event = dispatchKeydown(chevron('prev'), 'Tab');
        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(firstWholeTile());
      }
    );

    await step(
      'after paging back to the start, the first tile is the Tab stop',
      async () => {
        el.shadowRoot!.querySelector<HTMLElement>(
          '.swc-PromptField-textarea'
        )!.focus();
        await page('prev');
        await waitFor(() => expect(tabStop()).toBe(attachments[0]));
      }
    );

    await step(
      'a tile whose edge only reaches the lighter half of an edge fade still becomes the Tab stop',
      async () => {
        // Put tile 5's start edge 4px into the start fade, as paging back can.
        const tile = attachments[4]!;
        const clearance = parseFloat(
          getComputedStyle(scrollEl).scrollPaddingLeft
        );
        const left =
          scrollEl.scrollLeft +
          tile.getBoundingClientRect().left -
          scrollEl.getBoundingClientRect().left -
          (clearance - 4);
        scrollEl.scrollTo({ left, behavior: 'instant' });
        // WebKit can fire `scrollend` before the scroll-driven chevron
        // updates, so let the chevron catch up first.
        await waitForScrollSettled(scrollEl);
        await waitFor(() => expect(tabStop()).toBe(tile));
        expect(
          isTileFullyVisible(el, tile),
          `sanity check: the tile reaches into the fade (tile at ${
            tile.getBoundingClientRect().left -
            scrollEl.getBoundingClientRect().left
          }px, Prev ${describeChevron(chevron('prev'))})`
        ).toBe(false);
      }
    );
  },
};

export const AttachmentFocusScrollTest: Story = {
  render: () => '',
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
    const scrollEl = el.shadowRoot!.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    )!;
    useInstantScroll(scrollEl);

    await step(
      'focusing a tile from either end shows all of it and never stops inside an edge fade',
      async () => {
        if (!CSS.supports('animation-timeline: scroll()')) {
          return;
        }
        for (const end of ['start', 'end'] as const) {
          for (const [index, tile] of attachments.entries()) {
            const max = scrollEl.scrollWidth - scrollEl.clientWidth;
            scrollEl.scrollTo({
              left: end === 'start' ? 0 : max,
              behavior: 'instant',
            });
            await waitForScrollStopped(scrollEl);
            tile.focus();
            await waitForScrollStopped(scrollEl);
            const where = `tile ${index + 1}, focused from the ${end}, at ${Math.round(scrollEl.scrollLeft)}px`;
            expect(
              restsInsideEdgeFade(el),
              `${where} stops inside an edge fade`
            ).toBe(false);
            expect(isTileFullyVisible(el, tile), `${where} is cut off`).toBe(
              true
            );
          }
        }
      }
    );
  },
};

export const AttachmentAddScrollTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    renderMultiAttachmentPromptField(canvasElement);

    const el = await getComponent<PromptField>(
      canvasElement,
      'swc-prompt-field'
    );
    await el.updateComplete;
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await el.updateComplete;

    const scrollEl = el.shadowRoot!.querySelector<HTMLDivElement>(
      '.swc-PromptField-attachments-scroll'
    )!;
    useInstantScroll(scrollEl);
    const textarea = el.shadowRoot!.querySelector<HTMLTextAreaElement>(
      '.swc-PromptField-textarea'
    )!;
    const tiles = (): HTMLElement[] =>
      Array.from(el.querySelectorAll<HTMLElement>('[slot="attachment"]'));
    const createTile = (fileName: string): HTMLElement => {
      const tile = document.createElement('swc-upload-attachment');
      tile.slot = 'attachment';
      tile.setAttribute('type', 'media');
      tile.toggleAttribute('dismissible', true);
      const title = document.createElement('span');
      title.slot = 'title';
      title.textContent = fileName;
      tile.append(title);
      return tile;
    };
    // The reveal runs after the strip re-renders, a frame later.
    const settle = async (): Promise<void> => {
      await el.updateComplete;
      await waitForScrollStopped(scrollEl);
      await el.updateComplete;
      await waitForScrollStopped(scrollEl);
    };

    await step(
      'the first render starts at the start of the strip',
      async () => {
        expect(scrollEl.scrollLeft).toBe(0);
      }
    );

    await step(
      'a tile added at the end scrolls into view, and focus stays put',
      async () => {
        textarea.focus();
        const tile = createTile('new-upload.png');
        el.append(tile);
        await settle();
        expect(isTileFullyVisible(el, tile)).toBe(true);
        expect(getActiveElement()).toBe(textarea);
      }
    );

    await step('a tile added at the start scrolls into view', async () => {
      const tile = createTile('first-upload.png');
      el.insertBefore(tile, tiles()[0]!);
      await settle();
      expect(isTileFullyVisible(el, tile)).toBe(true);
    });

    await step(
      'while focus is in the strip, adding a tile does not move the strip',
      async () => {
        const focused = tiles()[1]!;
        focused.focus();
        await settle();
        const before = scrollEl.scrollLeft;
        el.append(createTile('another-upload.png'));
        await settle();
        expect(scrollEl.scrollLeft).toBe(before);
        expect(isTileFullyVisible(el, focused)).toBe(true);
      }
    );

    await step(
      'replacing every tile, as when restoring a draft, does not scroll',
      async () => {
        textarea.focus();
        scrollEl.scrollTo({
          left: scrollEl.scrollWidth - scrollEl.clientWidth,
          behavior: 'instant',
        });
        await settle();
        const before = scrollEl.scrollLeft;
        expect(before, 'sanity check: the strip is scrolled').toBeGreaterThan(
          0
        );
        el.replaceChildren(
          ...tiles().map((_, index) => createTile(`draft-${index + 1}.png`))
        );
        await settle();
        expect(scrollEl.scrollLeft).toBe(before);
      }
    );
  },
};

export const SingleAttachmentFocusTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    render(
      html`
        <swc-prompt-field value="Review attachment.">
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
    const demo = canvasElement.querySelector<HTMLElement>(
      'swc-prompt-field-behavior-demo'
    );
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
      'Playground leaves focus alone for a drop with no keyboard focus anywhere',
      async () => {
        textarea?.blur();
        (document.activeElement as HTMLElement | null)?.blur();
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
      'A mouse-only drop still becomes the roving-tabindex entry point',
      () => {
        const attachment = demo?.querySelector<HTMLElement>(
          '[data-attachment-id]'
        );
        expect(attachment?.tabIndex).toBe(0);
      }
    );

    await step(
      'Playground focuses a dropped attachment when keyboard focus was elsewhere in the field',
      async () => {
        // A never-mouse-touched element matches `:focus-visible` once focused,
        // standing in for "the document is already in a keyboard session".
        const keyboardFocusHelper = document.createElement('button');
        document.body.appendChild(keyboardFocusHelper);
        keyboardFocusHelper.focus();

        dropFile('second.txt');

        await waitFor(() => {
          const attachments = demo?.querySelectorAll<HTMLElement>(
            '[data-attachment-id]'
          );
          expect(attachments?.length).toBe(2);
          expect(getActiveElement()).toBe(attachments?.[1]);
        });

        keyboardFocusHelper.remove();
      }
    );

    await step(
      'Playground preserves prompt input focus when another attachment is dropped',
      async () => {
        textarea?.focus();
        dropFile('third.txt');

        await waitFor(() => {
          expect(demo?.querySelectorAll('[data-attachment-id]').length).toBe(3);
          expect(getActiveElement()).toBe(textarea);
        });
      }
    );
  },
};

export const StatusLoaderTest: Story = {
  render: () => '',
  play: async ({ canvasElement, step }) => {
    render(
      html`
        <swc-prompt-field
          loader="analyze"
          generating
          animate-loader
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
      'a preset name routes to the loader preset and generating with animate-loader animates it',
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

    await step(
      'generating without animate-loader keeps the loader paused',
      async () => {
        el.generating = true;
        el.animateLoader = false;
        await el.updateComplete;

        expect(loader()?.hasAttribute('paused')).toBe(true);
      }
    );
  },
};

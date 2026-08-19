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

import { getComponent, withWarningSpy } from '../../../../utils/test-utils.js';
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

export const MixedArtifactWarningTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    await withWarningSpy(async (warnCalls) => {
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
            <p slot="legal">Approved legal copy.</p>
          </swc-prompt-field>
        `,
        canvasElement
      );

      await getComponent<PromptField>(canvasElement, 'swc-prompt-field');
      await new Promise((resolve) => requestAnimationFrame(resolve));

      await step(
        'logs a development warning when card and media artifacts are mixed',
        async () => {
          expect(
            warnCalls.some(([, message]) =>
              String(message).includes('card and media')
            ),
            'mixed card and media artifacts emit a debug warning'
          ).toBe(true);
        }
      );

      canvasElement.querySelector<HTMLElement>('[type="media"]')?.remove();
      await new Promise((resolve) => requestAnimationFrame(resolve));
      expect(
        warnCalls,
        'one artifact layout emits no additional warning'
      ).toHaveLength(1);
    });
  },
};

const artifactScrollGradient =
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

function renderMultiArtifactPromptField(
  canvasElement: HTMLElement,
  direction?: 'rtl'
): void {
  render(
    html`
      <div style="inline-size:480px;" dir=${direction ?? nothing}>
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
        expect(
          el.shadowRoot?.querySelector(
            '.swc-PromptField-artifacts-scrollbar-lane'
          )
        ).toBeNull();

        el.artifactScrollPrevLabel = 'Show earlier attachments';
        el.artifactScrollNextLabel = 'Show later attachments';
        await el.updateComplete;
        expect(nextButton?.ariaLabel).toBe('Show later attachments');
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
        const firstPageScrollEnd = waitForScrollEnd(scrollEl);
        nextButton?.click();
        await el.updateComplete;

        await firstPageScrollEnd;
        await el.updateComplete;

        const nextScrollLeft = scrollEl?.scrollLeft ?? 0;
        expect(scrollEl?.clientWidth).toBe(clientWidth);
        expect(nextScrollLeft).toBeGreaterThan(initialScrollLeft);
        expect(nextScrollLeft - initialScrollLeft).toBeGreaterThan(
          clientWidth / 2
        );
        expect(
          el.shadowRoot?.querySelector<HTMLButtonElement>(
            '.swc-PromptField-artifacts-scroll-prev'
          )?.ariaLabel
        ).toBe('Show earlier attachments');

        const tiles = scrollEl
          ?.querySelector('slot')
          ?.assignedElements({ flatten: true }) as HTMLElement[] | undefined;
        expect(getComputedStyle(scrollEl!).scrollSnapType).toContain(
          'mandatory'
        );
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
        const scrollEnd = waitForScrollEnd(scrollEl);
        scrollEl?.scrollTo({
          left: maxScroll,
          behavior: 'instant',
        });
        await scrollEnd;
        await el.updateComplete;

        const nextButtonAtEnd = el.shadowRoot?.querySelector<HTMLButtonElement>(
          '.swc-PromptField-artifacts-scroll-next'
        );
        expect(nextButtonAtEnd).toBeTruthy();
        expect(nextButtonAtEnd?.getAttribute('aria-disabled')).toBe('true');
        expect(nextButtonAtEnd?.tabIndex).toBe(-1);
      }
    );
  },
};

export const ArtifactScrollRTLTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    renderMultiArtifactPromptField(canvasElement, 'rtl');

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
    const getPrevButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-artifacts-scroll-prev'
      );
    const getNextButton = (): HTMLButtonElement | null | undefined =>
      el.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-PromptField-artifacts-scroll-next'
      );
    const firstArtifact = el.querySelector<HTMLElement>('[slot="artifact"]');

    await step('the next chevron pages forward in RTL', async () => {
      expect(getComputedStyle(el).direction).toBe('rtl');
      expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('true');

      const scrollEnd = waitForScrollEnd(scrollEl);
      getNextButton()?.click();
      await scrollEnd;
      await el.updateComplete;

      expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('false');
      expect(
        firstArtifact!.getBoundingClientRect().left >=
          scrollEl!.getBoundingClientRect().right
      ).toBe(true);
    });
  },
};

/**
 * Resolves on the native `scrollend` event, or (as a cross-browser
 * fallback) once `scrollLeft` stops changing across a few animation
 * frames — WebKit's test runner doesn't reliably fire `scrollend` for
 * `scrollIntoView`/`scrollTo` with `behavior: 'smooth'`, which would
 * otherwise hang this indefinitely.
 */
function waitForScrollEnd(
  scrollEl: HTMLDivElement | null | undefined
): Promise<void> {
  if (!scrollEl) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = (): void => {
      if (settled) {
        return;
      }
      settled = true;
      resolve();
    };

    scrollEl.addEventListener('scrollend', finish, { once: true });

    let lastScrollLeft = scrollEl.scrollLeft;
    let stableFrames = 0;
    const poll = (): void => {
      if (settled) {
        return;
      }
      if (scrollEl.scrollLeft === lastScrollLeft) {
        stableFrames += 1;
        if (stableFrames >= 3) {
          finish();
          return;
        }
      } else {
        stableFrames = 0;
        lastScrollLeft = scrollEl.scrollLeft;
      }
      requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
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

    await step(
      'the strip landmark is a region, but not itself a tab stop',
      async () => {
        const viewport = el.shadowRoot?.querySelector(
          '.swc-PromptField-artifacts-viewport'
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
        expect(artifacts[0]?.tabIndex).toBe(0);
        expect(artifacts.slice(1).every((tile) => tile.tabIndex === -1)).toBe(
          true
        );
        expect(
          artifacts.every((tile) => getDismissButton(tile)?.tabIndex === -1)
        ).toBe(true);
      }
    );

    await step('first Tab reaches the first tile directly', async () => {
      textarea?.blur();
      artifacts[0]?.focus();
      expect(getActiveElement()).toBe(artifacts[0]);
    });

    await step('second Tab reveals the tile’s Close button', async () => {
      const event = dispatchKeydown(artifacts[0]!, 'Tab');
      await el.updateComplete;

      expect(event.defaultPrevented).toBe(true);
      expect(getActiveElement()).toBe(getDismissButton(artifacts[0]!));
    });

    await step(
      'Shift+Tab from the Close button returns focus to the tile',
      async () => {
        const dismiss = getDismissButton(artifacts[0]!)!;
        const event = dispatchKeydown(dismiss, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(artifacts[0]);
      }
    );

    await step('Arrow Right moves the roving tab stop one tile', async () => {
      artifacts[0]?.focus();
      dispatchKeydown(artifacts[0]!, 'ArrowRight');
      await el.updateComplete;

      expect(artifacts[0]?.tabIndex).toBe(-1);
      expect(artifacts[1]?.tabIndex).toBe(0);
      expect(getActiveElement()).toBe(artifacts[1]);
    });

    await step(
      'Tab from any active tile (not just the first) reveals its Close button',
      async () => {
        const event = dispatchKeydown(artifacts[1]!, 'Tab');
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(getDismissButton(artifacts[1]!));
      }
    );

    await step(
      'Tab from the Close button reaches the ">" button when more content is scrolled out of view',
      async () => {
        const dismiss = getDismissButton(artifacts[1]!)!;
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
        artifacts[3]?.focus();
        const event = dispatchKeydown(artifacts[3]!, 'Tab', {
          shiftKey: true,
        });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(false);
      }
    );

    await step(
      'the "<" button becoming disabled while focused keeps focus on it, rather than moving it anywhere',
      async () => {
        const firstScrollEnd = waitForScrollEnd(scrollEl);
        scrollEl?.scrollTo({ left: 200, behavior: 'instant' });
        await firstScrollEnd;
        await el.updateComplete;
        expect(scrollEl?.scrollLeft ?? 0).toBeGreaterThan(0);

        const prevButton = getPrevButton();
        expect(prevButton?.getAttribute('aria-disabled')).toBe('false');
        prevButton?.focus();
        expect(getActiveElement()).toBe(prevButton);

        const secondScrollEnd = waitForScrollEnd(scrollEl);
        scrollEl?.scrollTo({ left: 0, behavior: 'instant' });
        await secondScrollEnd;
        await el.updateComplete;

        expect(getPrevButton()?.getAttribute('aria-disabled')).toBe('true');
        expect(getActiveElement()).toBe(prevButton);
      }
    );

    await step(
      'dismissing a focused artifact restores focus to the nearest tile',
      async () => {
        const active = artifacts[1]!;
        const dismiss = getDismissButton(active)!;
        el.addEventListener(
          'swc-upload-artifact-dismiss',
          (event) => (event.target as HTMLElement).remove(),
          { once: true }
        );

        dismiss.focus();
        dismiss.click();
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await el.updateComplete;

        expect(getActiveElement(), 'focus moves to the replacement tile').toBe(
          artifacts[2]
        );
      }
    );
  },
};

export const ArtifactChevronPagingFocusTest: Story = {
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
    const visibleTiles = (): HTMLElement[] => {
      const viewportRect = scrollEl!.getBoundingClientRect();
      return artifacts.filter((tile) => {
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
      const active = getActiveElement();
      if (!active) {
        return null;
      }
      if (artifacts.includes(active as HTMLElement)) {
        return active as HTMLElement;
      }
      const root = active.getRootNode();
      if (
        root instanceof ShadowRoot &&
        artifacts.includes(root.host as HTMLElement)
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
        const scrollEnd = waitForScrollEnd(scrollEl);
        nextButton.click();
        await scrollEnd;
        await el.updateComplete;

        expect(getActiveElement()).toBe(nextButton);
      }
    );

    await step(
      'Shift+Tab from Next lands in the newly displayed set of tiles, not wherever focus was before paging',
      async () => {
        const nextButton = getNextButton()!;
        const currentlyVisible = visibleTiles();
        expect(
          currentlyVisible.includes(artifacts[0]!),
          'sanity check: paging actually moved past the first tile'
        ).toBe(false);

        const event = dispatchKeydown(nextButton, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(currentlyVisible.includes(activeTile()!)).toBe(true);
      }
    );

    await step(
      'Tab from Prev (after paging backward) lands in the newly displayed set of tiles',
      async () => {
        scrollEl?.scrollTo({ left: 0, behavior: 'instant' });
        await new Promise((resolve) => requestAnimationFrame(resolve));
        await el.updateComplete;

        const nextButton = getNextButton()!;
        const firstPage = waitForScrollEnd(scrollEl);
        nextButton.click();
        await firstPage;
        await el.updateComplete;
        const secondPage = waitForScrollEnd(scrollEl);
        nextButton.click();
        await secondPage;
        await el.updateComplete;

        const tilesBeforePagingBack = visibleTiles();

        const prevButton = getPrevButton()!;
        prevButton.focus();
        const backPage = waitForScrollEnd(scrollEl);
        prevButton.click();
        await backPage;
        await el.updateComplete;

        expect(getActiveElement()).toBe(prevButton);

        const tilesAfterPagingBack = visibleTiles();
        expect(
          tilesAfterPagingBack.some(
            (tile) => !tilesBeforePagingBack.includes(tile)
          ),
          'sanity check: paging back actually revealed a different set of tiles'
        ).toBe(true);

        const event = dispatchKeydown(prevButton, 'Tab');
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(tilesAfterPagingBack.includes(activeTile()!)).toBe(true);
      }
    );
  },
};

export const SingleArtifactFocusTest: Story = {
  render: () => nothing,
  play: async ({ canvasElement, step }) => {
    render(
      html`
        <swc-prompt-field label="Prompt" value="Review attachment.">
          <swc-upload-artifact slot="artifact" type="card" dismissible>
            <span slot="title">Brief.pdf</span>
          </swc-upload-artifact>
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

    const artifact = el.querySelector<HTMLElement>('[slot="artifact"]');
    const getDismissButton = (): HTMLButtonElement | null | undefined =>
      artifact?.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-UploadArtifact-dismiss'
      );

    await step('a single artifact tile is reachable by Tab', async () => {
      expect(artifact?.tabIndex).toBe(0);
    });

    await step('Tab from the tile reveals its Close button', async () => {
      artifact?.focus();
      const event = dispatchKeydown(artifact!, 'Tab');
      await el.updateComplete;

      expect(event.defaultPrevented).toBe(true);
      expect(getActiveElement()).toBe(getDismissButton());
    });

    await step(
      'Shift+Tab from the Close button returns focus to the tile',
      async () => {
        const dismiss = getDismissButton()!;
        const event = dispatchKeydown(dismiss, 'Tab', { shiftKey: true });
        await el.updateComplete;

        expect(event.defaultPrevented).toBe(true);
        expect(getActiveElement()).toBe(artifact);
      }
    );
  },
};

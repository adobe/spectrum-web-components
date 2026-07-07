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
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Popover } from '@adobe/spectrum-wc/popover';
import { PopoverBase } from '@spectrum-web-components/core/components/popover';
import {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible,
} from '@spectrum-web-components/core/utils/index.js';

import '@adobe/spectrum-wc/components/popover/swc-popover.js';
import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/popover.stories.js';

export default {
  ...meta,
  title: 'Popover/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Registration and rendering
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('the custom element is registered', () => {
      expect(
        customElements.get('swc-popover'),
        'swc-popover is registered to the Popover class'
      ).toBe(Popover);
    });

    await step('the element is an instance of Popover', () => {
      expect(popover, 'swc-popover renders').toBeInstanceOf(Popover);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Click-to-toggle (default mode)
// ──────────────────────────────────────────────────────────────

export const ClickToggleTest: Story = {
  render: () => html`
    <button id="click-toggle-trigger">Trigger</button>
    <swc-popover for="click-toggle-trigger">Popover content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#click-toggle-trigger'
    ) as HTMLButtonElement;
    await popover.updateComplete;

    await step('starts closed with aria-expanded="false"', () => {
      expect(popover.open, 'closed initially').toBe(false);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      // The surface is a dialog in both modes, so the trigger always signals it.
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    });

    await step('clicking the trigger opens the popover', async () => {
      await userEvent.click(trigger);
      await popover.updateComplete;
      expect(popover.open, 'open after first click').toBe(true);
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    await step('clicking the trigger again closes the popover', async () => {
      await userEvent.click(trigger);
      await popover.updateComplete;
      expect(popover.open, 'closed after second click').toBe(false);
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: A programmatic close does not suppress a reopen click
// ──────────────────────────────────────────────────────────────

export const ProgrammaticCloseReopenTest: Story = {
  render: () => html`
    <button id="programmatic-close-trigger">Trigger</button>
    <swc-popover for="programmatic-close-trigger">Popover content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#programmatic-close-trigger'
    ) as HTMLButtonElement;
    await popover.updateComplete;

    await step('open then close programmatically', async () => {
      popover.open = true;
      await popover.updateComplete;
      popover.open = false;
      await popover.updateComplete;
      expect(popover.open, 'closed programmatically').toBe(false);
    });

    // The reopen guard only arms for an outside light-dismiss, so a programmatic
    // close must not suppress an immediate trigger click.
    await step('clicking the trigger immediately reopens it', async () => {
      await userEvent.click(trigger);
      await popover.updateComplete;
      expect(popover.open, 'reopened after programmatic close').toBe(true);
    });
  },
};
// ──────────────────────────────────────────────────────────────
// TEST: Property defaults (API contract)
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  render: () => html`
    <swc-popover>Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('open defaults to false', () => {
      expect(popover.open, 'open is false').toBe(false);
    });

    await step('modal defaults to false', () => {
      expect(popover.modal, 'modal is false').toBe(false);
    });

    await step('placement defaults to bottom', () => {
      expect(popover.placement, 'placement is bottom').toBe('bottom');
    });

    await step('size defaults to undefined', () => {
      expect(popover.size, 'size is undefined').toBeUndefined();
    });

    await step('hideArrow defaults to false (arrow shown by default)', () => {
      expect(popover.hideArrow, 'hideArrow is false').toBe(false);
    });

    await step('offset defaults to 8', () => {
      expect(popover.offset, 'offset is 8').toBe(8);
    });

    await step('crossOffset defaults to 0', () => {
      expect(popover.crossOffset, 'crossOffset is 0').toBe(0);
    });

    await step('shouldFlip defaults to true', () => {
      expect(popover.shouldFlip, 'shouldFlip is true').toBe(true);
    });

    await step('manual defaults to false', () => {
      expect(popover.manual, 'manual is false').toBe(false);
    });

    await step('triggerElement defaults to null', () => {
      expect(popover.triggerElement, 'triggerElement is null').toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Render shape (default mode)
// ──────────────────────────────────────────────────────────────

export const DefaultModeRenderTest: Story = {
  render: () => html`
    <swc-popover>Default content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step(
      'default mode renders a div[popover=auto] inside shadow root',
      () => {
        const inner = popover.shadowRoot?.querySelector('.swc-Popover');
        expect(inner, 'internal element is a <div>').toBeInstanceOf(
          HTMLDivElement
        );
        expect(
          inner?.getAttribute('popover'),
          'internal element has popover=auto'
        ).toBe('auto');
      }
    );

    await step('content wrapper is present', () => {
      const content = popover.shadowRoot?.querySelector('.swc-Popover-content');
      expect(content, '.swc-Popover-content is a <div>').toBeInstanceOf(
        HTMLDivElement
      );
    });

    await step('arrow tip is rendered by default (hideArrow=false)', () => {
      const tip = popover.shadowRoot?.querySelector('.swc-Popover-tip');
      expect(tip, '.swc-Popover-tip is a <span>').toBeInstanceOf(
        HTMLSpanElement
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Render shape (modal mode)
// ──────────────────────────────────────────────────────────────

export const ModalModeRenderTest: Story = {
  render: () => html`
    <swc-popover modal>Modal content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('modal mode renders a dialog inside shadow root', () => {
      const inner = popover.shadowRoot?.querySelector('.swc-Popover');
      expect(inner, 'internal element is a <dialog>').toBeInstanceOf(
        HTMLDialogElement
      );
      expect(
        inner?.hasAttribute('popover'),
        'dialog does not have popover attribute'
      ).toBe(false);
    });

    await step('content wrapper is present in modal mode', () => {
      const content = popover.shadowRoot?.querySelector('.swc-Popover-content');
      expect(content, '.swc-Popover-content is a <div>').toBeInstanceOf(
        HTMLDivElement
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: accessible-label forwarding (both modes — the surface is a dialog)
// ──────────────────────────────────────────────────────────────

export const AccessibleLabelTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Account settings">
      Modal content
    </swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;

    await step('forwards accessible-label to the dialog aria-label', () => {
      const dialog = popover.shadowRoot?.querySelector('.swc-Popover');
      expect(dialog?.getAttribute('aria-label')).toBe('Account settings');
    });
  },
};

export const AccessibleLabelWhitespaceTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="   ">Modal content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;

    // A whitespace-only label is effectively unnamed, so it is trimmed away and
    // not forwarded (rather than leaving a blank aria-label on the dialog).
    await step('does not forward a whitespace-only accessible-label', () => {
      const dialog = popover.shadowRoot?.querySelector('.swc-Popover');
      expect(
        dialog?.hasAttribute('aria-label'),
        'whitespace-only label is not forwarded'
      ).toBe(false);
    });
  },
};

export const DefaultModeDialogSemanticsTest: Story = {
  render: () => html`
    <swc-popover accessible-label="Account settings">Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;

    await step(
      'the default-mode surface is a named dialog (role + aria-label + focusable)',
      () => {
        const div = popover.shadowRoot?.querySelector('.swc-Popover');
        expect(div?.tagName, 'default mode renders a DIV').toBe('DIV');
        expect(div?.getAttribute('role'), 'surface is a dialog').toBe('dialog');
        expect(
          div?.getAttribute('aria-label'),
          'accessible-label names the dialog in default mode too'
        ).toBe('Account settings');
        expect(
          div?.getAttribute('tabindex'),
          'surface is programmatically focusable'
        ).toBe('-1');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: hide-arrow attribute
// ──────────────────────────────────────────────────────────────

export const HideArrowTest: Story = {
  render: () => html`
    <swc-popover hide-arrow>No arrow</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('tip is hidden when hide-arrow is set', () => {
      const tip = popover.shadowRoot?.querySelector('.swc-Popover-tip');
      expect(tip, '.swc-Popover-tip is not rendered').toBeNull();
    });

    await step('hideArrow property is true', () => {
      expect(popover.hideArrow, 'hideArrow is true').toBe(true);
    });

    await step('hide-arrow attribute is reflected', () => {
      expect(
        popover.hasAttribute('hide-arrow'),
        'hide-arrow attribute is present'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Property reflection
// ──────────────────────────────────────────────────────────────

export const PropertyReflectionTest: Story = {
  render: () => html`
    <swc-popover>Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('placement reflects to attribute after mutation', async () => {
      popover.placement = 'top';
      await popover.updateComplete;
      expect(
        popover.getAttribute('placement'),
        'placement attribute is top after mutation'
      ).toBe('top');
    });

    await step('modal reflects to attribute after mutation', async () => {
      popover.modal = true;
      await popover.updateComplete;
      expect(
        popover.hasAttribute('modal'),
        'modal attribute is present after setting modal=true'
      ).toBe(true);
    });

    await step('size reflects to attribute after mutation', async () => {
      popover.size = 'm';
      await popover.updateComplete;
      expect(
        popover.getAttribute('size'),
        'size attribute is m after mutation'
      ).toBe('m');
    });

    await step('should-flip reflects to attribute after mutation', async () => {
      popover.shouldFlip = false;
      await popover.updateComplete;
      expect(
        popover.hasAttribute('should-flip'),
        'should-flip attribute is absent when false'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Computed placement (actual-placement host attribute)
// ──────────────────────────────────────────────────────────────

export const ActualPlacementTest: Story = {
  render: () => html`
    <button id="actual-placement-trigger">Trigger</button>
    <swc-popover for="actual-placement-trigger" placement="bottom">
      Content
    </swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#actual-placement-trigger'
    ) as HTMLButtonElement;
    await popover.updateComplete;

    await step('no actual-placement attribute while closed', () => {
      expect(
        popover.hasAttribute('actual-placement'),
        'actual-placement is absent before opening'
      ).toBe(false);
    });

    await step('reflects the requested physical side while open', async () => {
      await userEvent.click(trigger);
      // The attribute is set by the controller's first (async) compute, so poll.
      // placement="bottom" fits below the trigger (no flip), so the reflected
      // physical side is exactly the requested one; a wrong-side resolution
      // would surface here rather than passing as "some physical side".
      await waitFor(() =>
        expect(
          popover.getAttribute('actual-placement'),
          'actual-placement matches the requested side'
        ).toBe('bottom')
      );
    });

    await step('removes the attribute after the close transition', async () => {
      // Positioning (and the attribute) is torn down only after the close
      // transition completes, so poll rather than awaiting updateComplete.
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(
          popover.hasAttribute('actual-placement'),
          'actual-placement is removed once closed'
        ).toBe(false)
      );
    });
  },
};

export const PositionedFadeGateTest: Story = {
  render: () => html`
    <button id="positioned-trigger">Trigger</button>
    <swc-popover for="positioned-trigger" placement="bottom">
      Content
    </swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;
    const surface = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLElement;

    await step('unanchored right after opening: hidden, no translate', () => {
      popover.open = true;
      // Positioning is async (the controller awaits `document.fonts.ready`), so
      // immediately after opening the surface has no translate and `actual-placement`
      // is absent, so the stylesheet keeps the fade gated off: it must not paint at
      // the 0,0 origin. (The computed opacity is the CSS consequence of this gate and
      // is mid-transition during reopen, so the attribute is the deterministic check.)
      expect(popover.hasAttribute('actual-placement')).toBe(false);
      expect(surface.style.translate).toBe('');
    });

    await step('reveals once the surface is anchored', async () => {
      await waitFor(() =>
        expect(popover.hasAttribute('actual-placement')).toBe(true)
      );
      // The anchored translate is applied in the same compute that sets
      // `actual-placement`, so the fade only runs from the correct location.
      expect(surface.style.translate, 'a pixel translate is applied').toMatch(
        /\dpx/
      );
    });

    await step('re-gates on a rapid reopen during the close fade', async () => {
      // Close, then reopen before the close transition finishes. Restarting
      // positioning clears `actual-placement` (and the surface translate), so the
      // fade is re-gated; otherwise the surface would briefly paint at 0,0 and jump.
      popover.open = false;
      await popover.updateComplete;
      popover.open = true;
      await popover.updateComplete;
      // `actual-placement` absent is the gate signal (the fade is keyed on it);
      // the computed opacity here is mid-transition from the interrupted close, so
      // it is not asserted.
      expect(popover.hasAttribute('actual-placement')).toBe(false);
      // Re-anchors once the new session computes.
      await waitFor(() =>
        expect(popover.hasAttribute('actual-placement')).toBe(true)
      );
    });

    await step(
      'drops actual-placement after the close transition',
      async () => {
        popover.open = false;
        await waitFor(() =>
          expect(popover.hasAttribute('actual-placement')).toBe(false)
        );
      }
    );
  },
};

export const TipOrientationGateTest: Story = {
  render: () => html`
    <a href="#x" id="tip-gate-anchor">Anchored link</a>
    <swc-popover placement="bottom" manual>Anchored to the link.</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    popover.triggerElement = canvasElement.querySelector(
      '#tip-gate-anchor'
    ) as HTMLElement;
    const tip = () =>
      popover.shadowRoot?.querySelector('.swc-Popover-tip') as HTMLElement;
    const tipVisible = () => getComputedStyle(tip()).visibility === 'visible';

    await step('tip is hidden while closed (no orientation)', () => {
      expect(popover.hasAttribute('actual-placement')).toBe(false);
      expect(tipVisible()).toBe(false);
    });

    await step('tip shows once oriented onto an edge', async () => {
      popover.open = true;
      await waitFor(() =>
        expect(popover.hasAttribute('actual-placement')).toBe(true)
      );
      expect(tipVisible()).toBe(true);
    });

    await step(
      'a visible tip is never unoriented across rapid toggles (no diamond)',
      async () => {
        // Hammer open/close at sub-transition spacing and assert the invariant
        // every frame: a tip without `actual-placement` would render as a
        // detached diamond at the surface bottom, the regression being fixed.
        for (let cycle = 0; cycle < 6; cycle++) {
          popover.open = !popover.open;
          await popover.updateComplete;
          for (let f = 0; f < 5; f++) {
            if (tipVisible()) {
              expect(
                popover.hasAttribute('actual-placement'),
                'visible tip is oriented'
              ).toBe(true);
            }
            await new Promise((r) => requestAnimationFrame(() => r(null)));
          }
        }
      }
    );
  },
};

export const UnresolvedTriggerWhileOpenTest: Story = {
  render: () => html`
    <button id="resolved-trigger">Trigger</button>
    <swc-popover for="resolved-trigger" placement="bottom">Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#resolved-trigger'
    ) as HTMLButtonElement;
    await popover.updateComplete;

    await step('opens and anchors against the resolved trigger', async () => {
      await userEvent.click(trigger);
      await waitFor(() =>
        expect(popover.hasAttribute('actual-placement')).toBe(true)
      );
    });

    await step(
      'changing to an unresolved trigger while open re-gates (no stale anchor)',
      async () => {
        // The trigger no longer resolves, so there is nothing to anchor to.
        // Positioning is torn down and the surface re-gated (actual-placement
        // removed) rather than left anchored to stale geometry.
        popover.for = 'does-not-exist';
        await popover.updateComplete;
        await waitFor(() =>
          expect(
            popover.hasAttribute('actual-placement'),
            'actual-placement cleared when no anchor resolves'
          ).toBe(false)
        );
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Modal lifecycle (showModal + backdrop close source)
// ──────────────────────────────────────────────────────────────

export const ModalLifecycleTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Settings">Modal content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;
    const dialog = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLDialogElement;

    await step(
      'opening enters the modal top layer and fires swc-open',
      async () => {
        let opened = false;
        popover.addEventListener('swc-open', () => (opened = true), {
          once: true,
        });
        popover.open = true;
        await popover.updateComplete;
        expect(dialog.tagName, 'internal element is a DIALOG').toBe('DIALOG');
        expect(dialog.matches(':modal'), 'opened via showModal()').toBe(true);
        expect(opened, 'swc-open dispatched').toBe(true);
      }
    );

    await step(
      'a pointerdown on the dialog border (inside its box) does not close',
      async () => {
        // Target is the dialog itself, but the point is within the dialog box
        // (its border/chrome), not the backdrop — it must not dismiss.
        const rect = dialog.getBoundingClientRect();
        dialog.dispatchEvent(
          new PointerEvent('pointerdown', {
            bubbles: true,
            clientX: Math.round(rect.left + 1),
            clientY: Math.round(rect.top + 1),
          })
        );
        await popover.updateComplete;
        expect(popover.open, 'still open after a border pointerdown').toBe(
          true
        );
      }
    );

    await step(
      'a backdrop pointerdown (outside the box) closes with source "outside"',
      async () => {
        let source: string | undefined;
        popover.addEventListener(
          'swc-close',
          (event) => {
            source = (event as CustomEvent<{ source: string }>).detail.source;
          },
          { once: true }
        );
        // A backdrop click targets the dialog but lands outside its box.
        // `<dialog>.close()` fires its `close` event asynchronously, so wait.
        const rect = dialog.getBoundingClientRect();
        dialog.dispatchEvent(
          new PointerEvent('pointerdown', {
            bubbles: true,
            clientX: Math.round(rect.right + 40),
            clientY: Math.round(rect.bottom + 40),
          })
        );
        await waitFor(() =>
          expect(popover.open, 'closed after backdrop click').toBe(false)
        );
        expect(source, 'swc-close.detail.source is outside').toBe('outside');
      }
    );
  },
};

export const ModalScrollLockTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Settings">Modal content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;
    const html = document.documentElement;
    const priorOverflow = html.style.overflow;

    await step('opening a modal locks page scroll', async () => {
      popover.open = true;
      await waitFor(() =>
        expect(
          html.style.overflow,
          'documentElement overflow is hidden while modal-open'
        ).toBe('hidden')
      );
    });

    await step('closing restores the prior overflow', async () => {
      popover.open = false;
      await waitFor(() =>
        expect(html.style.overflow, 'overflow restored on close').toBe(
          priorOverflow
        )
      );
    });
  },
};

export const ModalToggleWhileOpenTest: Story = {
  render: () => html`
    <button id="modal-toggle-trigger">Trigger</button>
    <swc-popover for="modal-toggle-trigger" accessible-label="Settings">
      <button>Inside</button>
    </swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#modal-toggle-trigger'
    ) as HTMLButtonElement;
    await popover.updateComplete;
    const surface = () =>
      popover.shadowRoot?.querySelector('.swc-Popover') as HTMLDialogElement;
    let openCount = 0;
    popover.addEventListener('swc-open', () => (openCount += 1));

    await step('opens in default (non-modal) mode', async () => {
      await userEvent.click(trigger);
      await popover.updateComplete;
      await waitFor(() =>
        expect(surface().matches(':popover-open'), 'div popover is open').toBe(
          true
        )
      );
    });

    await step(
      'toggling modal=true while open engages showModal()',
      async () => {
        // The render swaps the <div popover> for a <dialog>; the lifecycle must
        // re-show through showModal() so the focus trap actually engages.
        popover.modal = true;
        await popover.updateComplete;
        await waitFor(() => {
          expect(surface().tagName, 'internal element is a DIALOG').toBe(
            'DIALOG'
          );
          expect(surface().matches(':modal'), 'opened via showModal()').toBe(
            true
          );
        });
      }
    );

    await step(
      'toggling modal=false while open returns to popover mode',
      async () => {
        popover.modal = false;
        await popover.updateComplete;
        await waitFor(() => {
          expect(surface().tagName, 'internal element is a DIV').toBe('DIV');
          expect(
            surface().matches(':popover-open'),
            'div popover is open'
          ).toBe(true);
        });
      }
    );

    await step('the mode toggles did not re-emit swc-open', () => {
      // The popover stayed open across both toggles, so only the initial open
      // dispatched swc-open (the re-shows must be suppressed).
      expect(openCount, 'swc-open fired exactly once').toBe(1);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: dismissible-stack ordering (LIFO + move-to-top)
// ──────────────────────────────────────────────────────────────

export const DismissibleStackTest: Story = {
  render: () => html`
    <div></div>
  `,
  play: async ({ step }) => {
    const a = {};
    const b = {};

    await step('the most-recently registered key is topmost', () => {
      registerDismissible(a);
      registerDismissible(b);
      expect(isTopDismissible(b), 'b is on top').toBe(true);
      expect(isTopDismissible(a), 'a is not on top').toBe(false);
    });

    await step('unregistering the top exposes the next entry', () => {
      unregisterDismissible(b);
      expect(isTopDismissible(a), 'a is now on top').toBe(true);
    });

    await step(
      're-registering moves a key to the top without duplicating',
      () => {
        registerDismissible(b);
        registerDismissible(a); // a is mid-stack; move it to the top
        expect(isTopDismissible(a), 'a moved to the top').toBe(true);
        unregisterDismissible(a);
        // Only one entry for `a` existed, so removing it exposes b.
        expect(isTopDismissible(b), 'b is exposed after one unregister').toBe(
          true
        );
      }
    );

    await step('an unregistered key is never topmost', () => {
      unregisterDismissible(b);
      expect(isTopDismissible(a), 'a is gone').toBe(false);
      expect(isTopDismissible(b), 'b is gone').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidPlacementWarningTest: Story = {
  render: () => html`
    <swc-popover>Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step('warns when an invalid placement is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        popover.placement =
          'not-a-placement' as unknown as Popover['placement'];
        await popover.updateComplete;

        expect(
          warnCalls.length,
          'exactly one warning is emitted for invalid placement'
        ).toBe(1);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references placement'
        ).toContain('placement');
      })
    );
  },
};

export const ValidPlacementNoWarningTest: Story = {
  render: () => html`
    <swc-popover placement="top">Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');

    await step(
      'does not warn when a valid placement is set in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          popover.placement = 'bottom';
          await popover.updateComplete;

          expect(
            warnCalls.length,
            'no warnings are emitted for valid placement'
          ).toBe(0);
        })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Content click inside a focus region (regression)
// ──────────────────────────────────────────────────────────────

// Gen1 bug (#5731): an auto overlay placed inside a focus region
// (an ancestor with `tabindex="0"`) was dismissed when the user clicked into its
// own content, because the overlay's focus-out dismissal treated content focus as
// leaving the region. The Gen2 popover relies on the browser's native
// `popover="auto"` light-dismiss, which excludes the popover's own (flat-tree,
// including slotted) content from "outside", so clicking inside must keep it open.
export const FocusRegionContentClickTest: Story = {
  render: () => html`
    <div tabindex="0" style="display: flex; flex-direction: column; gap: 24px;">
      Focus region (tabindex="0")
      <button id="focus-region-trigger">Open popover</button>
      <swc-popover for="focus-region-trigger">
        <button id="popover-inside">Action inside the popover</button>
      </swc-popover>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#focus-region-trigger'
    ) as HTMLButtonElement;
    await popover.updateComplete;

    await step('opens on trigger click', async () => {
      await userEvent.click(trigger);
      await popover.updateComplete;
      expect(popover.open, 'open after trigger click').toBe(true);
    });

    await step(
      'stays open when clicking content inside the popover',
      async () => {
        const inside = popover.querySelector(
          '#popover-inside'
        ) as HTMLButtonElement;
        await userEvent.click(inside);
        await popover.updateComplete;
        expect(
          popover.open,
          'clicking the popover content does not dismiss it'
        ).toBe(true);
      }
    );

    await step('content inside the popover can take focus', async () => {
      const inside = popover.querySelector(
        '#popover-inside'
      ) as HTMLButtonElement;
      inside.focus();
      await popover.updateComplete;
      expect(
        popover.open,
        'focusing content inside the popover does not dismiss it'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Focus moves into the dialog surface on open (default mode)
// ──────────────────────────────────────────────────────────────

export const FocusOnOpenTest: Story = {
  render: () => html`
    <div style="padding: 40px">
      <button id="focus-open-trigger">Trigger</button>
      <swc-popover for="focus-open-trigger" accessible-label="Details">
        <button id="focus-open-inside">Inside</button>
      </swc-popover>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#focus-open-trigger'
    ) as HTMLElement;
    await popover.updateComplete;

    await step('opening moves focus into the dialog surface', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(popover.open).toBe(true));
      const surface = popover.shadowRoot?.querySelector('.swc-Popover');
      // Focus is deferred to the first placement compute, so wait for it to land.
      await waitFor(() =>
        expect(
          popover.shadowRoot?.activeElement,
          'focus lands on the dialog surface once anchored'
        ).toBe(surface)
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Focus restoration on close (default mode)
// ──────────────────────────────────────────────────────────────

export const FocusRestoreOnCloseTest: Story = {
  render: () => html`
    <div style="padding: 40px">
      <button id="restore-trigger">Trigger</button>
      <swc-popover for="restore-trigger">
        <button id="restore-inside">Inside</button>
      </swc-popover>
      <button id="restore-other">Other</button>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#restore-trigger'
    ) as HTMLElement;
    const other = canvasElement.querySelector('#restore-other') as HTMLElement;
    await popover.updateComplete;

    await step(
      'focus inside → close returns focus to the trigger',
      async () => {
        await userEvent.click(trigger);
        await waitFor(() => expect(popover.open).toBe(true));
        // Move focus into the popover's content, then close.
        (popover.querySelector('#restore-inside') as HTMLElement).focus();
        popover.open = false;
        await waitFor(() =>
          expect(document.activeElement, 'focus restored to the trigger').toBe(
            trigger
          )
        );
      }
    );

    await step(
      'focus already moved elsewhere → close leaves it (no yank)',
      async () => {
        await userEvent.click(trigger);
        await waitFor(() => expect(popover.open).toBe(true));
        // Simulate focus moving to another control (e.g. an outside click).
        other.focus();
        popover.open = false;
        await popover.updateComplete;
        await new Promise((r) => requestAnimationFrame(() => r(null)));
        expect(
          document.activeElement,
          'focus is left where the user moved it'
        ).toBe(other);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Nested popovers + tooltips (layering demo)
// ──────────────────────────────────────────────────────────────

// A popover-inside-a-popover, a tooltip on the inner trigger, and a standalone
// button + tooltip outside the popovers. Nested `popover="auto"` elements form an
// ancestor chain (resolved across the shadow/slot boundary), so opening the inner
// popover keeps the outer open rather than light-dismissing it. Tooltips are
// hover/focus driven and do NOT participate in the popover dismissible stack, so
// they layer and dismiss independently. (Native Escape/click light-dismiss needs
// trusted events, so the play function asserts the nesting invariant rather than
// simulating dismissal.)
export const NestedLayersTest: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; padding: 40px">
      <swc-button id="nl-outside">Standalone button</swc-button>
      <swc-tooltip for="nl-outside">
        A standalone tooltip, independent of the popovers.
      </swc-tooltip>

      <swc-button id="nl-outer-trigger">Open outer popover</swc-button>
      <swc-popover id="nl-outer" for="nl-outer-trigger">
        <div
          style="display: flex; flex-direction: column; gap: 12px; inline-size: 260px;"
        >
          <p class="swc-Body swc-Body--sizeS" style="margin: 0;">
            Outer popover. It stays open while the inner popover is open.
          </p>
          <swc-button id="nl-inner-trigger" size="s">
            Open inner popover
          </swc-button>
          <swc-tooltip for="nl-inner-trigger">
            Opens a popover nested in this one.
          </swc-tooltip>
          <swc-popover id="nl-inner" for="nl-inner-trigger" placement="bottom">
            Inner popover, stacked above the outer.
          </swc-popover>
        </div>
      </swc-popover>
    </div>
  `,
  play: async ({ canvasElement, step }) => {
    const outer = canvasElement.querySelector('#nl-outer') as Popover;
    const inner = canvasElement.querySelector('#nl-inner') as Popover;
    const outerTrigger = canvasElement.querySelector(
      '#nl-outer-trigger'
    ) as HTMLElement;
    await outer.updateComplete;

    await step('opening the outer popover', async () => {
      await userEvent.click(outerTrigger);
      await waitFor(() => expect(outer.open, 'outer is open').toBe(true));
    });

    await step('opening the inner popover keeps the outer open', async () => {
      // The inner trigger lives in the outer popover's slotted content.
      const innerTrigger = outer.querySelector(
        '#nl-inner-trigger'
      ) as HTMLElement;
      await userEvent.click(innerTrigger);
      await waitFor(() => expect(inner.open, 'inner is open').toBe(true));
      // Nested auto popovers form an ancestor chain, so opening the inner one
      // must not light-dismiss the outer.
      expect(outer.open, 'outer stays open under the inner').toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Close-source labeling + dismissal coordination
// ──────────────────────────────────────────────────────────────

export const UnresolvedForWarningTest: Story = {
  render: () => html`
    <swc-popover>Content</swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;
    await withWarningSpy(async (warnCalls) => {
      // Pointing `for` at an id that does not resolve in the tree root warns.
      popover.for = 'no-such-trigger-id';
      await popover.updateComplete;
      expect(
        warnCalls.length,
        'exactly one warning when for= does not resolve'
      ).toBe(1);
      expect(String(warnCalls[0]?.[1] || '')).toContain('did not resolve');
    });
  },
};

export const ModalContentPointerDownTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Settings">
      <button id="mcpd-inside">Inside</button>
    </swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const dialog = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLDialogElement;
    popover.open = true;
    await waitFor(() => expect(dialog.matches(':modal')).toBe(true));

    // A pointerdown on the padded content (target is the content, not the
    // dialog) is not a backdrop click and must not dismiss.
    const content = popover.shadowRoot?.querySelector(
      '.swc-Popover-content'
    ) as HTMLElement;
    content.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await popover.updateComplete;
    expect(popover.open, 'pointerdown inside content keeps it open').toBe(true);
  },
};

export const ModalBackdropClickTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Settings">
      <button id="mbc-inside">Inside</button>
    </swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const dialog = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLDialogElement;
    popover.open = true;
    await waitFor(() => expect(dialog.matches(':modal')).toBe(true));

    // A pointerdown on the dialog itself, at a point outside its box, is a
    // backdrop click and must dismiss with source "outside".
    let closeSource: string | undefined;
    popover.addEventListener('swc-close', (event) => {
      closeSource = (event as CustomEvent).detail.source;
    });
    const rect = dialog.getBoundingClientRect();
    dialog.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: rect.left - 10,
        clientY: rect.top - 10,
      })
    );
    await waitFor(() =>
      expect(popover.open, 'backdrop click closes the modal').toBe(false)
    );
    expect(closeSource, 'close source is "outside"').toBe('outside');
  },
};

export const ModalNestedEscapeTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Settings">Content</swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const dialog = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLDialogElement;
    popover.open = true;
    await waitFor(() => expect(dialog.matches(':modal')).toBe(true));

    // Something else is the topmost dismissible, so this modal's native Escape
    // (`cancel`) must be deferred: prevented, and the popover stays open.
    const other = {};
    registerDismissible(other);
    try {
      expect(isTopDismissible(popover), 'popover is not topmost').toBe(false);
      const cancelEvent = new Event('cancel', { cancelable: true });
      dialog.dispatchEvent(cancelEvent);
      expect(
        cancelEvent.defaultPrevented,
        'cancel is prevented when not topmost'
      ).toBe(true);
      expect(popover.open, 'modal stays open while not topmost').toBe(true);
    } finally {
      unregisterDismissible(other);
    }
  },
};

export const DefaultEscapeSourceTest: Story = {
  render: () => html`
    <button id="des-trigger">Trigger</button>
    <swc-popover for="des-trigger">Content</swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const surface = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLElement;
    popover.open = true;
    await waitFor(() => expect(surface.matches(':popover-open')).toBe(true));

    let source: string | undefined;
    popover.addEventListener(
      'swc-close',
      (event) => {
        source = (event as CustomEvent<{ source: string }>).detail.source;
      },
      { once: true }
    );
    // The document keydown listener labels the close source as `escape` while the
    // popover is the topmost dismissible. (Native light-dismiss needs a trusted
    // event, so close programmatically; the captured source is preserved.)
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );
    popover.open = false;
    await waitFor(() => expect(popover.open).toBe(false));
    expect(source, 'close source reflects the Escape keydown').toBe('escape');
  },
};

export const ProgrammaticCloseSourceTest: Story = {
  render: () => html`
    <button id="pcs-trigger">Trigger</button>
    <swc-popover for="pcs-trigger">Content</swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const surface = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLElement;
    popover.open = true;
    await waitFor(() => expect(surface.matches(':popover-open')).toBe(true));

    let source: string | undefined;
    popover.addEventListener(
      'swc-close',
      (event) => {
        source = (event as CustomEvent<{ source: string }>).detail.source;
      },
      { once: true }
    );
    // No Escape/outside cause recorded → a property-driven close is programmatic.
    popover.open = false;
    await waitFor(() => expect(popover.open).toBe(false));
    expect(source, 'property-driven close labels source programmatic').toBe(
      'programmatic'
    );
  },
};

export const ModalEscapeSourceTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Settings">Content</swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const dialog = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLDialogElement;
    popover.open = true;
    await waitFor(() => expect(dialog.matches(':modal')).toBe(true));

    let source: string | undefined;
    popover.addEventListener(
      'swc-close',
      (event) => {
        source = (event as CustomEvent<{ source: string }>).detail.source;
      },
      { once: true }
    );
    // Topmost modal: the native `cancel` (Escape) labels the close source
    // `escape`. (Synthetic cancel does not natively close, so close
    // programmatically; the captured source is preserved.)
    expect(isTopDismissible(popover), 'modal is topmost').toBe(true);
    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    popover.open = false;
    // `<dialog>.close()` fires `close` (and thus `swc-close`) asynchronously.
    await waitFor(() =>
      expect(source, 'modal Escape labels source escape').toBe('escape')
    );
  },
};

export const SequentialPopoversTest: Story = {
  render: () => html`
    <button id="seq-a">Open A</button>
    <swc-popover id="seq-pa" for="seq-a">A content</swc-popover>
    <button id="seq-b">Open B</button>
    <swc-popover id="seq-pb" for="seq-b">B content</swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const a = canvasElement.querySelector('#seq-pa') as Popover;
    const b = canvasElement.querySelector('#seq-pb') as Popover;
    const triggerA = canvasElement.querySelector('#seq-a') as HTMLButtonElement;
    const triggerB = canvasElement.querySelector('#seq-b') as HTMLButtonElement;
    await a.updateComplete;
    await b.updateComplete;

    await userEvent.click(triggerA);
    await waitFor(() => expect(a.open).toBe(true));
    // Opening B (a sibling auto popover, not an ancestor of A) light-dismisses A
    // natively; only one auto-popover stack stays open at a time.
    await userEvent.click(triggerB);
    await waitFor(() => expect(a.open, 'A light-dismissed by B').toBe(false));
    expect(b.open, 'B is open').toBe(true);
  },
};

// A minimal concrete subclass exercises the base-class default rendering-layer
// getters that the SWC layer always overrides (`tipElement` → null, `arrowHeight`
// → 0), which production tests never reach.
class BasePopoverProbe extends PopoverBase {
  protected override get internalElement(): HTMLElement | null {
    return this.shadowRoot?.querySelector('div') ?? null;
  }
  protected override render(): unknown {
    return html`
      <div><slot></slot></div>
    `;
  }
}
if (!customElements.get('base-popover-probe')) {
  customElements.define('base-popover-probe', BasePopoverProbe);
}

export const BaseDefaultsTest: Story = {
  render: () => html`
    <base-popover-probe>content</base-popover-probe>
  `,
  play: async ({ canvasElement, step }) => {
    const el = canvasElement.querySelector(
      'base-popover-probe'
    ) as BasePopoverProbe & {
      updateComplete: Promise<unknown>;
      tipElement: HTMLElement | null;
      arrowHeight: number;
    };
    await el.updateComplete;

    await step('base tipElement default is null (no arrow)', () => {
      expect(el.tipElement, 'base tipElement returns null').toBeNull();
    });
    await step('base arrowHeight default is 0', () => {
      expect(el.arrowHeight, 'base arrowHeight returns 0').toBe(0);
    });
  },
};

export const ModalNoLabelWarningTest: Story = {
  render: () => html`
    <swc-popover modal>Content</swc-popover>
  `,
  play: async ({ canvasElement }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;
    // Opening a modal with no accessible-label warns (the dialog would be
    // nameless for assistive technology).
    await withWarningSpy(async (warnCalls) => {
      popover.open = true;
      await popover.updateComplete;
      expect(warnCalls.length, 'exactly one warning for a nameless modal').toBe(
        1
      );
      expect(String(warnCalls[0]?.[1] || '')).toContain('accessible-label');
    });
  },
};

export const FailedShowTest: Story = {
  render: () => html`
    <button id="fs-trigger">Trigger</button>
    <swc-popover for="fs-trigger"><button>Inside</button></swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const surface = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLElement & { showPopover: () => void };

    await step('a thrown showPopover() leaves no wired-up state', async () => {
      const original = surface.showPopover.bind(surface);
      surface.showPopover = () => {
        throw new Error('show failed');
      };
      try {
        popover.open = true;
        await popover.updateComplete;
        // Show failed: the element never entered the top layer and positioning
        // was not started (no actual-placement), so nothing is left half-wired.
        expect(surface.matches(':popover-open'), 'not shown').toBe(false);
        expect(
          popover.hasAttribute('actual-placement'),
          'positioning not started on a failed show'
        ).toBe(false);
      } finally {
        surface.showPopover = original;
        popover.open = false;
        await popover.updateComplete;
      }
    });
  },
};

export const FailedShowModalTest: Story = {
  render: () => html`
    <swc-popover modal accessible-label="Settings">Content</swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const dialog = popover.shadowRoot?.querySelector(
      '.swc-Popover'
    ) as HTMLDialogElement & { showModal: () => void };

    await step('a thrown showModal() leaves no wired-up state', async () => {
      const original = dialog.showModal.bind(dialog);
      dialog.showModal = () => {
        throw new Error('showModal failed');
      };
      try {
        popover.open = true;
        await popover.updateComplete;
        expect(dialog.matches(':modal'), 'not modal-open').toBe(false);
        expect(
          popover.hasAttribute('actual-placement'),
          'positioning not started on a failed modal show'
        ).toBe(false);
      } finally {
        dialog.showModal = original;
        popover.open = false;
        await popover.updateComplete;
      }
    });
  },
};

export const TriggerAriaTest: Story = {
  render: () => html`
    <button id="ta-trigger">Trigger</button>
    <swc-popover for="ta-trigger" modal accessible-label="Settings">
      Content
    </swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    const trigger = canvasElement.querySelector(
      '#ta-trigger'
    ) as HTMLElement & {
      ariaControlsElements?: Element[] | null;
    };
    await popover.updateComplete;

    await step('a modal trigger advertises aria-haspopup="dialog"', () => {
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    });

    await step(
      'the trigger controls the popover (element-reference IDL)',
      () => {
        expect(
          trigger.ariaControlsElements,
          'aria-controls relationship is exactly the popover'
        ).toEqual([popover]);
      }
    );

    await step(
      'aria-haspopup stays "dialog" after clearing modal (dialog in both modes)',
      async () => {
        popover.modal = false;
        await popover.updateComplete;
        expect(
          trigger.getAttribute('aria-haspopup'),
          'the trigger still advertises the dialog in default mode'
        ).toBe('dialog');
      }
    );
  },
};

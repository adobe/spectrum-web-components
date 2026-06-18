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
import {
  isTopDismissible,
  registerDismissible,
  unregisterDismissible,
} from '@spectrum-web-components/core/utils/index.js';

import '@adobe/spectrum-wc/components/popover/swc-popover.js';

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
        'swc-popover is defined'
      ).toBeTruthy();
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
        expect(inner, 'internal .swc-Popover element exists').toBeTruthy();
        expect(inner?.tagName, 'internal element is a DIV').toBe('DIV');
        expect(
          inner?.getAttribute('popover'),
          'internal element has popover=auto'
        ).toBe('auto');
      }
    );

    await step('content wrapper is present', () => {
      const content = popover.shadowRoot?.querySelector('.swc-Popover-content');
      expect(content, '.swc-Popover-content wrapper exists').toBeTruthy();
    });

    await step('arrow tip is rendered by default (hideArrow=false)', () => {
      const tip = popover.shadowRoot?.querySelector('.swc-Popover-tip');
      expect(tip, '.swc-Popover-tip is rendered').toBeTruthy();
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
      expect(inner, 'internal .swc-Popover element exists').toBeTruthy();
      expect(inner?.tagName, 'internal element is a DIALOG').toBe('DIALOG');
      expect(
        inner?.hasAttribute('popover'),
        'dialog does not have popover attribute'
      ).toBe(false);
    });

    await step('content wrapper is present in modal mode', () => {
      const content = popover.shadowRoot?.querySelector('.swc-Popover-content');
      expect(content, '.swc-Popover-content wrapper exists').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: accessible-label forwarding (modal mode only)
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

export const AccessibleLabelDefaultModeTest: Story = {
  render: () => html`
    <swc-popover accessible-label="ignored in default mode">
      Content
    </swc-popover>
  `,
  play: async ({ canvasElement, step }) => {
    const popover = await getComponent<Popover>(canvasElement, 'swc-popover');
    await popover.updateComplete;

    await step(
      'does not set aria-label on the roleless default-mode surface',
      () => {
        const div = popover.shadowRoot?.querySelector('.swc-Popover');
        expect(div?.tagName, 'default mode renders a DIV').toBe('DIV');
        expect(
          div?.hasAttribute('aria-label'),
          'no aria-label on the generic container'
        ).toBe(false);
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
    await popover.updateComplete;

    await step('no actual-placement attribute while closed', () => {
      expect(
        popover.hasAttribute('actual-placement'),
        'actual-placement is absent before opening'
      ).toBe(false);
    });

    await step('reflects the requested physical side while open', async () => {
      popover.open = true;
      await popover.updateComplete;
      // placement="bottom" fits below the trigger (no flip), so the reflected
      // physical side is exactly the requested one; a wrong-side resolution
      // would surface here rather than passing as "some physical side".
      expect(
        popover.getAttribute('actual-placement'),
        'actual-placement matches the requested side'
      ).toBe('bottom');
    });

    await step('removes the attribute after the close transition', async () => {
      // Positioning (and the attribute) is torn down only after the close
      // transition completes, so poll rather than awaiting updateComplete.
      popover.open = false;
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

    await step('unpositioned right after opening: hidden, no translate', () => {
      popover.open = true;
      // Positioning is async (the controller awaits `document.fonts.ready`), so
      // immediately after opening the surface has no translate and the fade is
      // gated off: it must not paint at the reset 0,0 origin.
      expect(popover.hasAttribute('positioned')).toBe(false);
      expect(surface.style.translate).toBe('');
      expect(getComputedStyle(surface).opacity).toBe('0');
    });

    await step('becomes positioned once the surface is anchored', async () => {
      await waitFor(() =>
        expect(popover.hasAttribute('positioned')).toBe(true)
      );
      // The anchored translate is applied in the same compute that marks it
      // positioned, so the fade only runs from the correct location.
      expect(surface.style.translate).not.toBe('');
    });

    await step('re-gates on a rapid reopen during the close fade', async () => {
      // Close, then reopen before the close transition finishes. The deferred
      // teardown that clears `positioned` is cancelled by the reopen, and
      // restarting positioning clears the surface translate, so the fade must be
      // re-gated; otherwise the surface would briefly paint at 0,0 and jump.
      popover.open = false;
      await popover.updateComplete;
      popover.open = true;
      await popover.updateComplete;
      expect(popover.hasAttribute('positioned')).toBe(false);
      expect(getComputedStyle(surface).opacity).toBe('0');
      // Re-anchors and re-marks positioned once the new session computes.
      await waitFor(() =>
        expect(popover.hasAttribute('positioned')).toBe(true)
      );
    });

    await step('drops positioned after the close transition', async () => {
      popover.open = false;
      await waitFor(() =>
        expect(popover.hasAttribute('positioned')).toBe(false)
      );
    });
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
      'a backdrop pointerdown closes with source "outside"',
      async () => {
        let source: string | undefined;
        popover.addEventListener(
          'swc-close',
          (event) => {
            source = (event as CustomEvent<{ source: string }>).detail.source;
          },
          { once: true }
        );
        // A pointerdown whose target is the dialog itself (not its padded content)
        // is a backdrop click. `<dialog>.close()` fires its `close` event
        // asynchronously, so wait for the state to settle.
        dialog.dispatchEvent(
          new PointerEvent('pointerdown', { bubbles: true })
        );
        await waitFor(() =>
          expect(popover.open, 'closed after backdrop click').toBe(false)
        );
        expect(source, 'swc-close.detail.source is outside').toBe('outside');
      }
    );
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
          'at least one warning is emitted for invalid placement'
        ).toBeGreaterThan(0);
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
// TEST: Content click inside a focus region (SWC-1336 regression)
// ──────────────────────────────────────────────────────────────

// Gen1 bug (#5731 / SWC-1336): an auto overlay placed inside a focus region
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

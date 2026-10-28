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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Toast } from '@adobe/spectrum-wc/toast';
import {
  SWC_TOAST_ACTION_EVENT,
  TOAST_VARIANTS,
  type ToastVariant,
} from '@adobe/spectrum-wc-core/components/toast';

import '@adobe/spectrum-wc/components/toast/swc-toast.js';

import {
  getComponent,
  waitForEvent,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, { Overview } from '../stories/toast.stories.js';

// These tests cover standalone Toast only; queue and container behavior gets separate tests.
// TODO(SWC-2567): add queue tests: timeout floor, action disables timeout with its dev warning, pause and resume.
// TODO(SWC-2655): add collapsed-stack tests: peek layers, Show all, front-toast countdown.
// TODO(SWC-2654): add expanded-view tests: scrim, Escape, Collapse, Clear all, focus management.

export default {
  ...meta,
  title: 'Toast/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

const nextFrame = (): Promise<void> =>
  new Promise((resolve) => requestAnimationFrame(() => resolve()));

const messageSlot = (toast: Toast): HTMLSlotElement | null =>
  toast.shadowRoot?.querySelector('.swc-Toast-text slot') ?? null;

// Cancels every swc-close on the toast until the returned function is called.
const cancelClose = (
  toast: Toast,
  onClose?: (event: Event) => void
): (() => void) => {
  const controller = new AbortController();
  toast.addEventListener(
    'swc-close',
    (event) => {
      onClose?.(event);
      event.preventDefault();
    },
    { signal: controller.signal }
  );
  return () => controller.abort();
};

// ──────────────────────────────────────────────────────────────
// TEST: API
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  args: {
    ...Overview.args,
    open: false,
  },
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('registers the custom element', () => {
      expect(customElements.get('swc-toast'), 'registered element').toBe(Toast);
    });

    await step('creates an instance of Toast', () => {
      expect(toast, 'swc-toast instance').toBeInstanceOf(Toast);
    });

    await step('exposes reflected open and variant properties', async () => {
      expect(toast.open, 'default open').toBe(false);
      expect(toast.hasAttribute('open'), 'default open attribute').toBe(false);
      expect(toast.variant, 'default variant').toBe('neutral');
      expect(toast.getAttribute('variant'), 'default variant attribute').toBe(
        'neutral'
      );

      toast.open = true;
      toast.variant = 'positive';
      await toast.updateComplete;

      expect(toast.hasAttribute('open'), 'reflected open attribute').toBe(true);
      expect(toast.getAttribute('variant'), 'reflected variant attribute').toBe(
        'positive'
      );
    });
  },
};

export const VariantIconTest: Story = {
  render: () => html`
    <swc-toast open>Update available</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');
    const icon = (): Element | null =>
      toast.shadowRoot?.querySelector('.swc-Toast-icon') ?? null;

    await step('each variant renders its icon', async () => {
      const expectedIcons: Record<ToastVariant, string | null> = {
        neutral: null,
        info: 'swc-icon-info-circle',
        positive: 'swc-icon-checkmark-circle',
        negative: 'swc-icon-alert-triangle',
      };

      for (const [variant, tagName] of Object.entries(expectedIcons)) {
        toast.variant = variant as ToastVariant;
        await toast.updateComplete;

        expect(icon()?.localName ?? null, `icon for ${variant}`).toBe(tagName);
      }
    });

    await step('renders a decorative icon without icon-label', async () => {
      toast.variant = 'info';
      await toast.updateComplete;

      expect(
        icon()?.hasAttribute('accessible-label'),
        'icon accessible-label presence'
      ).toBe(false);
    });

    await step('icon-label is forwarded to the icon', async () => {
      toast.iconLabel = 'Information';
      await toast.updateComplete;

      expect(
        icon()?.getAttribute('accessible-label'),
        'forwarded icon label'
      ).toBe('Information');
    });

    await step(
      'renders a decorative icon for an empty icon-label',
      async () => {
        toast.iconLabel = '';
        await toast.updateComplete;

        expect(
          icon()?.hasAttribute('accessible-label'),
          'icon accessible-label presence'
        ).toBe(false);
      }
    );
  },
};

export const ActionButtonTest: Story = {
  render: () => html`
    <swc-toast open>File archived</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');
    const action = (): HTMLElement | null =>
      toast.shadowRoot?.querySelector('swc-button') ?? null;

    await step('no action renders without action-label', () => {
      expect(action(), 'action button').toBeNull();
      expect(
        toast.shadowRoot?.querySelector('slot[name="action"]'),
        'action slot'
      ).toBeNull();
    });

    await step('renders the action with its label', async () => {
      toast.actionLabel = 'Undo';
      await toast.updateComplete;

      expect(action()?.textContent?.trim(), 'action label').toBe('Undo');
    });

    await step('applies the fixed Spectrum 2 treatment to the action', () => {
      expect(action()?.getAttribute('size'), 'action size').toBe('m');
      expect(action()?.getAttribute('variant'), 'action variant').toBe(
        'secondary'
      );
      expect(action()?.getAttribute('fill-style'), 'action fill-style').toBe(
        'outline'
      );
      expect(
        action()?.getAttribute('static-color'),
        'action static-color'
      ).toBe('white');
    });

    await step('emits an action event without closing the toast', () => {
      let actionEvent: Event | undefined;
      canvasElement.addEventListener(
        SWC_TOAST_ACTION_EVENT,
        (event) => {
          actionEvent = event;
        },
        { once: true }
      );

      action()?.click();

      expect(actionEvent, 'action event').toBeInstanceOf(Event);
      expect(actionEvent?.target, 'action event target').toBe(toast);
      expect(actionEvent?.bubbles, 'action event bubbles').toBe(true);
      expect(actionEvent?.composed, 'action event composed').toBe(true);
      expect(toast.open, 'open after action').toBe(true);
    });

    await step('clearing action-label removes the action', async () => {
      toast.actionLabel = undefined;
      await toast.updateComplete;

      expect(action(), 'action button').toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const AccessibilitySemanticsTest: Story = {
  render: () => html`
    <swc-toast>File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('exposes alert dialog semantics on the closed host', () => {
      expect(toast.getAttribute('role'), 'host role').toBe('alertdialog');
      expect(toast.getAttribute('aria-modal'), 'host aria-modal').toBe('false');
      expect(toast.getAttribute('tabindex'), 'host tabindex').toBe('0');
      expect(toast.getAttribute('aria-label'), 'host aria-label').toBe(
        'File saved'
      );
      expect(toast.getAttribute('aria-hidden'), 'host aria-hidden').toBe(
        'true'
      );
    });

    await step('exposes an atomic alert on the inner wrapper', () => {
      const alert = toast.shadowRoot?.querySelector('[role="alert"]');
      expect(alert, 'inner alert wrapper').toBeTruthy();
      expect(alert?.getAttribute('aria-atomic'), 'alert aria-atomic').toBe(
        'true'
      );
    });

    await step(
      'updates the accessible name when the message changes',
      async () => {
        toast.textContent = 'Upload complete';
        await Promise.resolve();
        await toast.updateComplete;

        expect(toast.getAttribute('aria-label'), 'host aria-label').toBe(
          'Upload complete'
        );
      }
    );
  },
};

export const LabelledMessageTest: Story = {
  render: () => html`
    <swc-toast open><span id="toast-message">File saved</span></swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('labels the host by reference for an ID-bearing message', () => {
      expect(
        toast.getAttribute('aria-labelledby'),
        'host aria-labelledby'
      ).toBe('toast-message');
      expect(toast.hasAttribute('aria-label'), 'host aria-label presence').toBe(
        false
      );
    });

    // TODO(SWC-2567): drop the bare-text fallback steps if the container becomes the only creator of toasts.
    await step('bare text falls back to aria-label', async () => {
      toast.textContent = 'Upload complete';
      await Promise.resolve();
      await toast.updateComplete;

      expect(toast.getAttribute('aria-label'), 'host aria-label').toBe(
        'Upload complete'
      );
      expect(
        toast.hasAttribute('aria-labelledby'),
        'host aria-labelledby presence'
      ).toBe(false);
    });

    await step(
      'more than one message element falls back to aria-label',
      async () => {
        toast.innerHTML =
          '<span id="first-part">File</span> <span>saved</span>';
        await Promise.resolve();
        await toast.updateComplete;

        expect(toast.getAttribute('aria-label'), 'host aria-label').toBe(
          'File saved'
        );
        expect(
          toast.hasAttribute('aria-labelledby'),
          'host aria-labelledby presence'
        ).toBe(false);
      }
    );
  },
};

export const EmptySlotMessageTest: Story = {
  render: () => html`
    <swc-toast>
      <span slot="">File saved</span>
    </swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step(
      'labels the host from a slot="" text element like default-slot content',
      () => {
        expect(toast.getAttribute('aria-label'), 'host aria-label').toBe(
          'File saved'
        );
        expect(
          toast.hasAttribute('aria-labelledby'),
          'host aria-labelledby presence'
        ).toBe(false);
      }
    );
  },
};

export const EmptySlotLabelledMessageTest: Story = {
  render: () => html`
    <swc-toast>
      <span slot="" id="toast-message">File saved</span>
    </swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step(
      'labels the host by reference from a slot="" ID-bearing element',
      () => {
        expect(
          toast.getAttribute('aria-labelledby'),
          'host aria-labelledby'
        ).toBe('toast-message');
        expect(
          toast.hasAttribute('aria-label'),
          'host aria-label presence'
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Lifecycle
// ──────────────────────────────────────────────────────────────

export const OpenLifecycleTest: Story = {
  render: () => html`
    <swc-toast>File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');
    const events: string[] = [];
    const openAttributesDuringEvent: boolean[] = [];
    toast.addEventListener('swc-open', () => {
      openAttributesDuringEvent.push(toast.hasAttribute('open'));
      events.push('swc-open');
    });
    toast.addEventListener('swc-after-open', () =>
      events.push('swc-after-open')
    );
    const afterOpen = waitForEvent(toast, 'swc-after-open');
    const activeElement = document.activeElement;

    await step('opening exposes the host without moving focus', async () => {
      toast.open = true;
      await toast.updateComplete;

      expect(
        toast.hasAttribute('aria-hidden'),
        'host aria-hidden presence'
      ).toBe(false);
      expect(document.activeElement, 'focused element').toBe(activeElement);
      expect(
        openAttributesDuringEvent,
        'open attribute during swc-open'
      ).toEqual([false]);
      expect(events, 'events after opening').toEqual(['swc-open']);
    });

    // TODO(SWC-2567): confirm the container connects toasts closed and opens them after the first update (Q11).
    await step(
      'keeps the live region empty for two frames, then adds the message (Q10, Q11)',
      async () => {
        expect(
          messageSlot(toast),
          'message slot before first frame'
        ).toBeNull();

        await nextFrame();
        expect(messageSlot(toast), 'message slot after one frame').toBeNull();

        await nextFrame();
        await toast.updateComplete;
        expect(
          messageSlot(toast),
          'message slot after two frames'
        ).not.toBeNull();
      }
    );

    await step('swc-after-open follows swc-open', async () => {
      await afterOpen;
      expect(events, 'events after swc-after-open').toEqual([
        'swc-open',
        'swc-after-open',
      ]);
    });

    await step('reopening repeats the two-frame delay', async () => {
      const afterClose = waitForEvent(toast, 'swc-after-close');
      toast.close();
      await afterClose;

      toast.open = true;
      await toast.updateComplete;
      expect(messageSlot(toast), 'message slot after reopening').toBeNull();

      await nextFrame();
      await nextFrame();
      await toast.updateComplete;
      expect(
        messageSlot(toast),
        'message slot after two frames on reopen'
      ).not.toBeNull();
    });
  },
};

export const InitiallyOpenTest: Story = {
  render: () => html`
    <swc-toast open>File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('shows the message at once when rendered open', () => {
      expect(
        toast.hasAttribute('aria-hidden'),
        'host aria-hidden presence'
      ).toBe(false);
      expect(messageSlot(toast), 'message slot').not.toBeNull();
    });

    await step('makes the open host focusable', () => {
      toast.focus();
      expect(document.activeElement, 'focused element').toBe(toast);
      toast.blur();
    });
  },
};

export const SameTurnOpenTest: Story = {
  render: () => html`
    <div></div>
  `,
  play: async ({ canvasElement, step }) => {
    await step(
      'skips the delay when opened in the turn it is created (Q11)',
      async () => {
        const toast = document.createElement('swc-toast') as Toast;
        toast.textContent = 'File saved';
        canvasElement.append(toast);
        toast.open = true;
        await toast.updateComplete;

        expect(messageSlot(toast), 'message slot').not.toBeNull();
      }
    );
  },
};

export const CloseInteractionTest: Story = {
  render: () => html`
    <swc-toast open>File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');
    const closeButton = toast.shadowRoot?.querySelector(
      'swc-close-button'
    ) as HTMLElement;

    await step(
      'gives the close button an accessible name and treatment',
      () => {
        expect(closeButton, 'close button').toBeTruthy();
        expect(
          closeButton.getAttribute('accessible-label'),
          'close button accessible-label'
        ).toBe('Close');
        expect(
          closeButton.getAttribute('static-color'),
          'close button static-color'
        ).toBe('white');
      }
    );

    await step('swc-close can cancel dismissal', async () => {
      const restoreClose = cancelClose(toast);
      closeButton.click();
      await toast.updateComplete;

      expect(toast.open, 'open after canceled swc-close').toBe(true);
      restoreClose();
    });

    await step('close() can be canceled the same way', async () => {
      const restoreClose = cancelClose(toast);
      toast.close();
      await toast.updateComplete;

      expect(toast.open, 'open after canceled close()').toBe(true);
      restoreClose();
    });

    await step(
      'assigning open = false fires a cancelable swc-close before state changes',
      async () => {
        const openAttributesDuringEvent: boolean[] = [];
        const restoreClose = cancelClose(toast, () =>
          openAttributesDuringEvent.push(toast.hasAttribute('open'))
        );

        toast.open = false;
        await toast.updateComplete;

        expect(
          openAttributesDuringEvent,
          'open attribute during swc-close'
        ).toEqual([true]);
        expect(toast.open, 'open after canceled swc-close').toBe(true);
        expect(
          toast.hasAttribute('open'),
          'open attribute after canceled swc-close'
        ).toBe(true);
        restoreClose();
      }
    );

    await step('accepted dismissal emits lifecycle events', async () => {
      const events: string[] = [];
      toast.addEventListener('swc-close', () => events.push('swc-close'));
      toast.addEventListener('swc-after-close', () =>
        events.push('swc-after-close')
      );
      const afterClose = waitForEvent(toast, 'swc-after-close');

      closeButton.click();
      await toast.updateComplete;

      expect(toast.open, 'open after accepted dismissal').toBe(false);
      expect(
        toast.getAttribute('aria-hidden'),
        'host aria-hidden after accepted dismissal'
      ).toBe('true');
      expect(events, 'events after swc-close').toEqual(['swc-close']);

      await afterClose;
      expect(events, 'events after swc-after-close').toEqual([
        'swc-close',
        'swc-after-close',
      ]);
    });
  },
};

export const ReconnectTest: Story = {
  render: () => html`
    <swc-toast variant="positive">File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('variant and semantics survive reconnection', async () => {
      toast.remove();
      canvasElement.append(toast);
      await toast.updateComplete;

      expect(toast.getAttribute('variant'), 'host variant').toBe('positive');
      expect(toast.getAttribute('role'), 'host role').toBe('alertdialog');
      expect(toast.getAttribute('aria-label'), 'host aria-label').toBe(
        'File saved'
      );
    });

    await step(
      'disconnecting during the two-frame delay still shows the message after reconnection',
      async () => {
        toast.open = true;
        await toast.updateComplete;
        expect(messageSlot(toast), 'message slot after opening').toBeNull();

        toast.remove();
        canvasElement.append(toast);
        await nextFrame();
        await nextFrame();
        await toast.updateComplete;

        expect(
          messageSlot(toast),
          'message slot after reconnection'
        ).not.toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
  render: () => html`
    <swc-toast>File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('warns when variant is invalid', async () => {
      await withWarningSpy(async (warnCalls) => {
        toast.variant = 'invalid' as ToastVariant;
        await toast.updateComplete;

        expect(warnCalls, 'warning count for invalid variant').toHaveLength(1);
        expect(warnCalls[0][1], 'invalid variant warning message').toContain(
          'expects "variant" to be one of: neutral, info, positive, negative'
        );
      });
    });
  },
};

export const ValidVariantNoWarningTest: Story = {
  render: () => html`
    <swc-toast>File saved</swc-toast>
  `,
  play: async ({ canvasElement, step }) => {
    const toast = await getComponent<Toast>(canvasElement, 'swc-toast');

    await step('does not warn for valid variants', async () => {
      await withWarningSpy(async (warnCalls) => {
        for (const variant of TOAST_VARIANTS) {
          toast.variant = variant;
          await toast.updateComplete;
        }

        expect(warnCalls, 'warnings for valid variants').toHaveLength(0);
      });
    });
  },
};

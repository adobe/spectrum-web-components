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
import { expect, fn, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ToastQueue,
  type ToastQueueOptions,
} from '@adobe/spectrum-wc-core/components/toast-container/index.js';
import {
  deepContains,
  getActiveElement,
} from '@adobe/spectrum-wc-core/utils/index.js';

import '../swc-toast-container.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import { ToastQueue as RenderingToastQueue } from '../index.js';
import type { Toast } from '../Toast.js';
import type { ToastContainer } from '../ToastContainer.js';

export default {
  title: 'Toast container/Tests/Container',
  tags: ['!autodocs', 'dev'],
  render: () => html`
    <button id="trigger">Add notification</button>
    <swc-toast-container></swc-toast-container>
    <button id="outside">Outside region</button>
  `,
} as Meta;

const getFront = async (container: ToastContainer): Promise<Toast> => {
  await container.updateComplete;
  const toast = container.shadowRoot?.querySelector<Toast>('swc-toast');
  expect(toast, 'front toast').not.toBeNull();
  await waitFor(() => expect(toast?.open, 'front toast open').toBe(true));
  return toast!;
};

export const QueueOperationsTest: Story = {
  render: () => html`
    <div></div>
  `,
  play: async ({ step }) => {
    ToastQueue.clear();
    const onClose = fn();
    const changed = fn();
    const unsubscribe = ToastQueue.subscribe(changed);

    try {
      await step('new entries join the front without a queue cap', () => {
        for (let index = 0; index < 12; index += 1) {
          ToastQueue.add(`Notification ${index}`);
        }
        expect(ToastQueue.entries, 'queue entries').toHaveLength(12);
        expect(ToastQueue.entries[0].message, 'front entry message').toBe(
          'Notification 11'
        );
        expect(changed, 'change notifications').toHaveBeenCalledTimes(12);
      });

      await step('waiting entries close directly and notify once', () => {
        const key = ToastQueue.add('Waiting notification', { onClose });
        ToastQueue.add('Front notification');
        ToastQueue.close(key);
        ToastQueue.close(key);
        expect(
          ToastQueue.entries.some((entry) => entry.key === key),
          'closed entry still queued'
        ).toBe(false);
        expect(onClose, 'onClose calls').toHaveBeenCalledTimes(1);
      });

      await step('clear empties the queue without calling onClose', () => {
        ToastQueue.add('Cleared notification', { onClose });
        ToastQueue.clear();
        expect(ToastQueue.entries, 'queue entries after clear').toHaveLength(0);
        expect(onClose, 'onClose calls after clear').toHaveBeenCalledTimes(1);
      });

      await step('unsubscribing stops change notifications', () => {
        unsubscribe();
        changed.mockClear();
        ToastQueue.add('No subscriber');
        expect(
          changed,
          'change notifications after unsubscribe'
        ).not.toHaveBeenCalled();
      });
    } finally {
      unsubscribe();
      ToastQueue.clear();
    }
  },
};

export const RenderingAndClosureTest: Story = {
  play: async ({ canvasElement, step }) => {
    await step('core and SWC expose the same queue instance', () => {
      expect(RenderingToastQueue, 'SWC queue export').toBe(ToastQueue);
    });
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const onClose = fn();

    try {
      const olderKey = ToastQueue.add('Older notification');
      const newestKey = ToastQueue.add('Newest notification', { onClose });
      const toast = await getFront(container);

      await step(
        'only the newest toast renders and the region counts all entries',
        () => {
          expect(
            container.shadowRoot?.querySelectorAll('swc-toast'),
            'rendered toasts'
          ).toHaveLength(1);
          expect(toast.textContent, 'front toast message').toBe(
            'Newest notification'
          );
          const region = container.shadowRoot?.querySelector('[role="region"]');
          expect(region?.getAttribute('aria-label'), 'region aria-label').toBe(
            '2 notifications.'
          );
          expect(region?.getAttribute('tabindex'), 'region tabindex').toBe(
            '-1'
          );
          expect(toast.hasUpdated, 'toast has updated').toBe(true);
        }
      );

      await step('the container creates the default-slot naming target', () => {
        const message = toast.firstElementChild;
        expect(message?.id, 'message id').toBeTruthy();
        expect(
          toast.getAttribute('aria-labelledby'),
          'host aria-labelledby'
        ).toBe(message?.id);
        expect(
          toast.hasAttribute('aria-label'),
          'host aria-label presence'
        ).toBe(false);
        expect(
          message?.hasAttribute('slot'),
          'message slot attribute presence'
        ).toBe(false);
      });

      await step(
        'a canceled close retains the toast and does not notify',
        async () => {
          const cancel = (event: Event): void => event.preventDefault();
          toast.addEventListener('swc-close', cancel);
          ToastQueue.close(newestKey);
          await toast.updateComplete;
          expect(toast.open, 'open after canceled close').toBe(true);
          expect(
            ToastQueue.entries[0].key,
            'front entry key after canceled close'
          ).toBe(newestKey);
          expect(
            onClose,
            'onClose after canceled close'
          ).not.toHaveBeenCalled();
          toast.removeEventListener('swc-close', cancel);
        }
      );

      await step(
        'removal waits for after-close and promotes the waiting toast',
        async () => {
          const afterClose = fn();
          toast.addEventListener('swc-after-close', afterClose);
          ToastQueue.close(newestKey);
          expect(
            ToastQueue.entries[0].key,
            'front entry key before after-close'
          ).toBe(newestKey);
          expect(onClose, 'onClose before after-close').not.toHaveBeenCalled();
          await waitFor(() =>
            expect(afterClose, 'swc-after-close events').toHaveBeenCalledTimes(
              1
            )
          );
          await waitFor(() =>
            expect(ToastQueue.entries[0]?.key, 'promoted entry key').toBe(
              olderKey
            )
          );
          const promoted = await getFront(container);
          expect(promoted.textContent, 'promoted toast message').toBe(
            'Older notification'
          );
          expect(
            promoted.firstElementChild?.id,
            'promoted message id'
          ).not.toBe(toast.firstElementChild?.id);
          expect(onClose, 'onClose after removal').toHaveBeenCalledTimes(1);
          const region = container.shadowRoot?.querySelector('[role="region"]');
          expect(region?.getAttribute('aria-label'), 'region aria-label').toBe(
            '1 notification.'
          );
        }
      );

      await step(
        'clear empties the queue without firing close callbacks',
        async () => {
          ToastQueue.add('Cleared toast', { onClose });
          await getFront(container);
          ToastQueue.clear();
          await waitFor(() =>
            expect(
              ToastQueue.entries,
              'queue entries after clear'
            ).toHaveLength(0)
          );
          await container.updateComplete;
          expect(
            container.shadowRoot?.querySelector('swc-toast'),
            'rendered toast after clear'
          ).toBeNull();
          expect(onClose, 'onClose after clear').toHaveBeenCalledTimes(1);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const RegionLabelTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const regionLabel = (): string | null | undefined =>
      container.shadowRoot
        ?.querySelector('[role="region"]')
        ?.getAttribute('aria-label');

    try {
      ToastQueue.add('First notification');
      await getFront(container);

      await step('names the region in English by default', () => {
        expect(regionLabel(), 'default region label').toBe('1 notification.');
      });

      await step('getRegionLabel receives the queue count', async () => {
        const counts: number[] = [];
        container.getRegionLabel = (count) => {
          counts.push(count);
          return `${count} notificaciones`;
        };
        ToastQueue.add('Second notification');
        await container.updateComplete;

        expect(regionLabel(), 'custom region label').toBe('2 notificaciones');
        expect(counts[counts.length - 1], 'last count').toBe(2);
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const CloseLabelTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );

    try {
      ToastQueue.add('Fermeture', { closeLabel: 'Fermer' });
      const toast = await getFront(container);

      await step('forwards the queue closeLabel to the close button', () => {
        expect(
          toast.shadowRoot
            ?.querySelector('swc-close-button')
            ?.getAttribute('accessible-label'),
          'close button label'
        ).toBe('Fermer');
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const CloseBeforeOpenTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const root = container.shadowRoot!;
    const onClose = fn();
    const openedKeys: boolean[] = [];
    const recordOpen = (): void => {
      openedKeys.push(true);
    };
    root.addEventListener('swc-open', recordOpen);

    try {
      await step(
        'closing right after the toast renders but before it opens removes it without opening',
        async () => {
          const key = ToastQueue.add('Closed before open', { onClose });
          let toastWasOpenAtClose: boolean | undefined;
          // The observer callback runs as soon as the toast is committed, before openToast() resolves.
          await new Promise<void>((resolve) => {
            const observer = new MutationObserver(() => {
              const toast = root.querySelector<Toast>('swc-toast');
              if (!toast) {
                return;
              }
              observer.disconnect();
              toastWasOpenAtClose = toast.open;
              ToastQueue.close(key);
              resolve();
            });
            observer.observe(root, { childList: true, subtree: true });
          });

          expect(toastWasOpenAtClose, 'open when close was requested').toBe(
            false
          );
          await waitFor(() =>
            expect(
              ToastQueue.entries.some((entry) => entry.key === key),
              'entry still queued'
            ).toBe(false)
          );
          await container.updateComplete;
          expect(onClose, 'onClose calls').toHaveBeenCalledTimes(1);
          expect(openedKeys, 'swc-open events').toHaveLength(0);
          expect(
            root.querySelector('swc-toast'),
            'rendered toast after close'
          ).toBeNull();
        }
      );
    } finally {
      root.removeEventListener('swc-open', recordOpen);
      ToastQueue.clear();
    }
  },
};

export const QueueOrderTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const messages = (): string[] =>
      ToastQueue.entries.map((entry) => entry.message);
    const frontMessage = (): string | null | undefined =>
      container.shadowRoot?.querySelector('swc-toast')?.textContent;
    const regionLabel = (): string | null | undefined =>
      container.shadowRoot
        ?.querySelector('[role="region"]')
        ?.getAttribute('aria-label');
    const closeFront = (): void => {
      container.shadowRoot
        ?.querySelector('swc-toast')
        ?.shadowRoot?.querySelector<HTMLElement>('swc-close-button')
        ?.click();
    };

    try {
      const keys: Record<string, string> = {};
      for (const name of ['A', 'B', 'C', 'D']) {
        keys[name] = ToastQueue.add(name);
      }
      await getFront(container);

      await step('lists the newest toast first and shows it', () => {
        expect(messages(), 'queue order').toEqual(['D', 'C', 'B', 'A']);
        expect(frontMessage(), 'front toast').toBe('D');
        expect(regionLabel(), 'region label').toBe('4 notifications.');
      });

      await step(
        'closing a waiting toast keeps the others in order',
        async () => {
          ToastQueue.close(keys.B);
          await container.updateComplete;

          expect(messages(), 'queue order after removing B').toEqual([
            'D',
            'C',
            'A',
          ]);
          expect(frontMessage(), 'front toast after removing B').toBe('D');
          expect(regionLabel(), 'region label after removing B').toBe(
            '3 notifications.'
          );
        }
      );

      await step(
        'closing the front toast promotes the next in order',
        async () => {
          closeFront();
          await waitFor(() =>
            expect(frontMessage(), 'promoted toast').toBe('C')
          );
          await getFront(container);

          expect(messages(), 'queue order after closing D').toEqual(['C', 'A']);
          expect(regionLabel(), 'region label after closing D').toBe(
            '2 notifications.'
          );
        }
      );

      await step(
        'a toast added later jumps ahead of waiting ones',
        async () => {
          ToastQueue.add('E');
          await waitFor(() => expect(frontMessage(), 'newest toast').toBe('E'));

          expect(messages(), 'queue order after adding E').toEqual([
            'E',
            'C',
            'A',
          ]);
        }
      );

      await step('closing every toast empties the region', async () => {
        for (const expected of ['E', 'C', 'A']) {
          await waitFor(() =>
            expect(frontMessage(), `front toast ${expected}`).toBe(expected)
          );
          await getFront(container);
          closeFront();
        }
        await waitFor(() =>
          expect(container.shadowRoot?.querySelector('swc-toast')).toBeNull()
        );

        expect(messages(), 'queue after closing all').toEqual([]);
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ConnectsClosedThenOpensTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const root = container.shadowRoot!;
    const openAtInsertion: boolean[] = [];
    const updatedAtOpen: boolean[] = [];
    const observer = new MutationObserver(() => {
      const toast = root.querySelector<Toast>('swc-toast');
      if (toast && openAtInsertion.length === 0) {
        openAtInsertion.push(toast.open);
      }
    });
    const recordOpen = (event: Event): void => {
      updatedAtOpen.push((event.target as Toast).hasUpdated);
    };
    observer.observe(root, { childList: true, subtree: true });
    root.addEventListener('swc-open', recordOpen);

    try {
      ToastQueue.add('Connected closed notification');
      const toast = await getFront(container);

      await step('the toast connects closed', () => {
        expect(openAtInsertion, 'open when connected').toEqual([false]);
      });

      await step('the toast opens only after its first update', () => {
        expect(updatedAtOpen, 'hasUpdated when swc-open fired').toEqual([true]);
        expect(toast.open, 'open after first update').toBe(true);
      });
    } finally {
      observer.disconnect();
      root.removeEventListener('swc-open', recordOpen);
      ToastQueue.clear();
    }
  },
};

export const TimeoutConfigurationTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    try {
      ToastQueue.add('Timed notification', { timeout: 3000 });
      const toast = await getFront(container);
      await step(
        'positive timeouts floor to 6000ms and longer values remain valid',
        () => {
          expect(toast.timeout, 'floored timeout').toBe(6000);
          toast.timeout = 8000;
          expect(toast.timeout, 'longer timeout').toBe(8000);
        }
      );
      await step(
        'null, zero and negative timeouts disable auto-dismiss',
        () => {
          for (const timeout of [null, 0, -1]) {
            toast.timeout = timeout;
            expect(
              toast.timeout,
              `timeout after setting ${timeout}`
            ).toBeNull();
          }
        }
      );
      await step(
        'the normalized timeout reflects to the attribute',
        async () => {
          toast.timeout = 8000;
          await toast.updateComplete;
          expect(toast.getAttribute('timeout'), 'timeout attribute').toBe(
            '8000'
          );
          toast.timeout = 0;
          await toast.updateComplete;
          expect(
            toast.hasAttribute('timeout'),
            'timeout attribute after disabling'
          ).toBe(false);
        }
      );
      await step(
        'the timeout attribute supplies the same normalized configuration',
        async () => {
          toast.setAttribute('timeout', '3000');
          await toast.updateComplete;
          expect(toast.timeout, 'timeout from attribute').toBe(6000);
          toast.removeAttribute('timeout');
          await toast.updateComplete;
          expect(toast.timeout, 'timeout after removing attribute').toBeNull();
        }
      );
      await step(
        'bare text no longer creates an aria-label fallback',
        async () => {
          toast.textContent = 'Unsupported bare text';
          await waitFor(() =>
            expect(
              toast.hasAttribute('aria-labelledby'),
              'host aria-labelledby presence'
            ).toBe(false)
          );
          expect(
            toast.hasAttribute('aria-label'),
            'host aria-label presence'
          ).toBe(false);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const ActionsTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const onAction = fn();
    const onClose = fn();
    try {
      await step(
        'an action with timeout warns and does not close by default',
        async () => {
          await withWarningSpy(async (warnings) => {
            ToastQueue.add('File archived', {
              actionLabel: 'Undo',
              onAction,
              timeout: 6000,
            });
            const toast = await getFront(container);
            expect(
              warnings.some((warning) =>
                String(warning[1]).includes('auto-dismiss')
              ),
              'auto-dismiss warning'
            ).toBe(true);
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1);
            toast.shadowRoot!.querySelector<HTMLElement>('swc-button')!.click();
            expect(onAction, 'onAction calls').toHaveBeenCalledTimes(1);
            expect(toast.open, 'open after action').toBe(true);
            expect(
              ToastQueue.entries,
              'queue entries after action'
            ).toHaveLength(1);
          });
        }
      );

      await step('an action missing its label or callback warns', async () => {
        await withWarningSpy(async (warnings) => {
          ToastQueue.add('Label only', { actionLabel: 'Undo' });
          await getFront(container);
          expect(
            warnings.some((warning) =>
              String(warning[1]).includes('actionLabel and onAction')
            ),
            'incomplete action warning'
          ).toBe(true);
        });
      });

      await step(
        'shouldCloseOnAction opts into closure and its callback',
        async () => {
          const key = ToastQueue.add('Another file archived', {
            actionLabel: 'Undo',
            onAction,
            shouldCloseOnAction: true,
            onClose,
          });
          const toast = await getFront(container);
          toast.shadowRoot!.querySelector<HTMLElement>('swc-button')!.click();
          expect(onAction, 'onAction calls').toHaveBeenCalledTimes(2);
          await waitFor(() =>
            expect(
              ToastQueue.entries.some((entry) => entry.key === key),
              'closed entry still queued'
            ).toBe(false)
          );
          expect(onClose, 'onClose calls').toHaveBeenCalledTimes(1);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const FocusAndWarningsTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const trigger = canvasElement.querySelector<HTMLButtonElement>('#trigger')!;
    const outside = canvasElement.querySelector<HTMLButtonElement>('#outside')!;
    try {
      await step(
        'opening does not steal focus and closing the last toast restores it',
        async () => {
          trigger.focus();
          const key = ToastQueue.add('Focused notification');
          const toast = await getFront(container);
          expect(getActiveElement(), 'focus after opening').toBe(trigger);
          const closeButton =
            toast.shadowRoot!.querySelector<HTMLElement>('swc-close-button')!;
          closeButton.focus();
          ToastQueue.close(key);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after closing').toBe(trigger);
        }
      );

      await step(
        'focus is not pulled back after the user leaves the region',
        async () => {
          trigger.focus();
          const key = ToastQueue.add('Unfocused notification');
          const toast = await getFront(container);
          toast.focus();
          outside.focus();
          ToastQueue.close(key);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after leaving region').toBe(
            outside
          );
        }
      );

      await step(
        'clearing the focused region also restores focus',
        async () => {
          trigger.focus();
          ToastQueue.add('Cleared focused notification');
          const toast = await getFront(container);
          toast.focus();
          ToastQueue.clear();
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after clear').toBe(trigger);
        }
      );

      await step(
        'a later session entered without a previous target does not reuse a stale one',
        async () => {
          trigger.focus();
          ToastQueue.add('First session notification');
          const first = await getFront(container);
          first.focus();
          ToastQueue.clear();
          await waitFor(() =>
            expect(
              ToastQueue.entries,
              'queue entries after first session'
            ).toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after first session').toBe(trigger);

          trigger.blur();
          ToastQueue.add('Second session notification');
          const second = await getFront(container);
          second.focus();
          ToastQueue.clear();
          await waitFor(() =>
            expect(
              ToastQueue.entries,
              'queue entries after second session'
            ).toHaveLength(0)
          );
          expect(getActiveElement(), 'focus after second session').not.toBe(
            trigger
          );
        }
      );

      await step(
        'connecting a second container produces a dev warning',
        async () => {
          await withWarningSpy(async (warnings) => {
            const second = document.createElement('swc-toast-container');
            try {
              canvasElement.append(second);
              await second.updateComplete;
              expect(
                warnings.some((warning) =>
                  String(warning[1]).includes('Only one')
                ),
                'second container warning'
              ).toBe(true);
            } finally {
              second.remove();
            }
          });
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const InterruptedClosureTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const onClose = fn();
    try {
      await step(
        'a closing entry does not survive demotion by a newer toast',
        async () => {
          const key = ToastQueue.add('Closing notification', { onClose });
          await getFront(container);
          ToastQueue.close(key);
          const newerKey = ToastQueue.add('Newer notification');
          await getFront(container);
          expect(
            ToastQueue.entries.map((entry) => entry.key),
            'queue keys after demotion'
          ).toEqual([newerKey]);
          expect(onClose, 'onClose after demotion').toHaveBeenCalledTimes(1);
        }
      );

      await step(
        'clear interrupted by disconnection leaves no stale entries',
        async () => {
          ToastQueue.clear();
          container.remove();
          expect(
            ToastQueue.entries,
            'queue entries after disconnect'
          ).toHaveLength(0);
          expect(onClose, 'onClose after disconnect').toHaveBeenCalledTimes(1);
          canvasElement.append(container);
          await container.updateComplete;
        }
      );
      await step(
        'direct close-button dismissal also survives interruption',
        async () => {
          const key = ToastQueue.add('User-dismissed notification', {
            onClose,
          });
          const toast = await getFront(container);
          toast
            .shadowRoot!.querySelector<HTMLElement>('swc-close-button')!
            .click();
          const newerKey = ToastQueue.add('Notification after dismissal');
          await getFront(container);
          expect(
            ToastQueue.entries.some((entry) => entry.key === key),
            'dismissed entry still queued'
          ).toBe(false);
          expect(
            ToastQueue.entries[0]?.key,
            'front entry key after dismissal'
          ).toBe(newerKey);
          expect(onClose, 'onClose after dismissal').toHaveBeenCalledTimes(2);
        }
      );
    } finally {
      if (!container.isConnected) {
        canvasElement.append(container);
      }
      ToastQueue.clear();
    }
  },
};

const getLayers = (container: ToastContainer): HTMLElement[] => [
  ...container.shadowRoot!.querySelectorAll<HTMLElement>(
    '.swc-ToastContainer-layer'
  ),
];

const getRegion = (container: ToastContainer): HTMLElement =>
  container.shadowRoot!.querySelector<HTMLElement>('[role="region"]')!;

export const StackLayersTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );

    try {
      await step('a single toast has no layers and no shadow', async () => {
        ToastQueue.add('First notification');
        const front = await getFront(container);
        expect(getLayers(container), 'layers').toHaveLength(0);
        expect(getComputedStyle(front).filter, 'single toast filter').toBe(
          'none'
        );
      });

      await step(
        'two more toasts add two empty, non-interactive layers',
        async () => {
          ToastQueue.add('Second notification', { variant: 'info' });
          ToastQueue.add('Third notification', { variant: 'negative' });
          await getFront(container);
          const layers = getLayers(container);
          expect(layers, 'layers').toHaveLength(2);
          for (const layer of layers) {
            expect(layer.getAttribute('role'), 'layer role').toBe(
              'presentation'
            );
            expect(layer.childNodes, 'layer children').toHaveLength(0);
            expect(layer.hasAttribute('tabindex'), 'layer tabindex').toBe(
              false
            );
          }
          expect(
            container.shadowRoot!.querySelectorAll('swc-toast'),
            'rendered toasts'
          ).toHaveLength(1);
        }
      );

      await step('the region count label reflects the full queue', () => {
        expect(getRegion(container).getAttribute('aria-label')).toBe(
          '3 notifications.'
        );
      });

      await step(
        'a stack gives the layers and the front toast a shadow',
        async () => {
          const front = await getFront(container);
          expect(
            getComputedStyle(front).filter,
            'stacked front toast filter'
          ).toContain('drop-shadow');
          for (const layer of getLayers(container)) {
            expect(
              getComputedStyle(layer).boxShadow,
              'layer box shadow'
            ).not.toBe('none');
          }
        }
      );

      await step('each layer takes the variant of its toast', () => {
        const [first, second] = getLayers(container);
        expect(
          first.classList.contains('swc-ToastContainer-layer--info'),
          'nearest layer is the info toast'
        ).toBe(true);
        expect(
          [...second.classList],
          'neutral layer has no variant modifier'
        ).toEqual(['swc-ToastContainer-layer']);
        expect(
          getComputedStyle(second).backgroundColor,
          'neutral layer differs from the info layer'
        ).not.toBe(getComputedStyle(first).backgroundColor);
      });

      await step('layers stay in the queue order, newest nearest', () => {
        const indexes = getLayers(container).map((layer) =>
          layer.style.getPropertyValue('--_swc-toast-container-layer-index')
        );
        expect(indexes, 'layer depth indexes').toEqual(['1', '2']);
      });

      await step('nearer layers paint above farther ones', () => {
        const [near, far] = getLayers(container).map((layer) =>
          Number(getComputedStyle(layer).zIndex)
        );
        expect(near, 'nearest layer z-index').toBeGreaterThan(far);
      });

      await step(
        'layers beyond the third position stay in the DOM at opacity 0',
        async () => {
          ToastQueue.add('Fourth notification');
          ToastQueue.add('Fifth notification');
          await getFront(container);
          const opacities = getLayers(container).map(
            (layer) => getComputedStyle(layer).opacity
          );
          expect(opacities, 'layer opacities').toEqual(['1', '1', '0', '0']);
          expect(
            getLayers(container).map((layer) =>
              layer.classList.contains('swc-ToastContainer-layer--hidden')
            ),
            'layers marked hidden by depth'
          ).toEqual([false, false, true, true]);
          expect(getRegion(container).getAttribute('aria-label')).toBe(
            '5 notifications.'
          );
        }
      );

      await step('closing a queued toast removes its layer', async () => {
        const queued = ToastQueue.entries[2].key;
        ToastQueue.close(queued);
        await container.updateComplete;
        expect(getLayers(container), 'layers').toHaveLength(3);
        expect(getRegion(container).getAttribute('aria-label')).toBe(
          '4 notifications.'
        );
      });

      await step('layers include their border in their size', () => {
        for (const layer of getLayers(container)) {
          expect(getComputedStyle(layer).boxSizing, 'layer box-sizing').toBe(
            'border-box'
          );
        }
      });

      await step('layers hold no focusable content', () => {
        for (const layer of getLayers(container)) {
          expect(layer.querySelectorAll('*'), 'layer descendants').toHaveLength(
            0
          );
          expect(layer.hasAttribute('tabindex'), 'layer tabindex').toBe(false);
        }
        // The queue still holds older toasts, and none render real controls.
        expect(ToastQueue.entries.length, 'queued toasts').toBeGreaterThan(1);
        expect(
          container.shadowRoot!.querySelectorAll('swc-toast'),
          'rendered toasts'
        ).toHaveLength(1);
      });
    } finally {
      ToastQueue.clear();
    }
  },
};

// Apps that reload or navigate rebuild their toasts from saved data, so this is the documented restore recipe.
export const RestoreToastsTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    let renderedToasts = 0;
    const observer = new MutationObserver((records) => {
      for (const record of records) {
        // The first render adds the region with its toast already inside, so count nested toasts too.
        for (const node of record.addedNodes) {
          if (node instanceof HTMLElement) {
            renderedToasts +=
              (node.localName === 'swc-toast' ? 1 : 0) +
              node.querySelectorAll('swc-toast').length;
          }
        }
      }
    });
    observer.observe(container.shadowRoot!, { childList: true, subtree: true });
    const messages = (): string[] =>
      ToastQueue.entries.map((entry) => entry.message);
    const expectStack = (label: string): void => {
      expect(messages(), `${label} queue order`).toEqual(['C', 'B', 'A']);
      expect(
        container.shadowRoot?.querySelector('swc-toast')?.textContent,
        `${label} front toast`
      ).toBe('C');
      expect(getRegion(container).getAttribute('aria-label'), label).toBe(
        '3 notifications.'
      );
      expect(getLayers(container), `${label} layers`).toHaveLength(2);
    };
    const onClose = fn();
    let saved: ({ message: string } & ToastQueueOptions)[] = [];

    try {
      await step(
        'several adds in the same tick render a single toast',
        async () => {
          for (const message of ['A', 'B', 'C']) {
            ToastQueue.add(message, { variant: 'info', onClose });
          }
          await getFront(container);

          expect(renderedToasts, 'toasts rendered for the batch').toBe(1);
          expectStack('batch');
        }
      );

      await step(
        'entries list the front toast first and save without callbacks',
        () => {
          // entries lists the front toast first, so reverse it to replay oldest first.
          saved = [...ToastQueue.entries]
            .reverse()
            .map(
              ({
                key: _key,
                onAction: _onAction,
                onClose: _onClose,
                ...toast
              }) => toast
            );

          expect(
            saved.map((toast) => toast.message),
            'saved order, oldest first'
          ).toEqual(['A', 'B', 'C']);
          for (const toast of saved) {
            expect(Object.keys(toast), 'saved properties').toEqual([
              'variant',
              'message',
            ]);
          }
        }
      );

      await step(
        'replaying the saved list, before the container connects, restores the same stack',
        async () => {
          // A reload: the old page's queue is gone, and the container connects after the app restores.
          container.remove();
          ToastQueue.clear();
          expect(ToastQueue.entries, 'queue after the reload').toHaveLength(0);

          for (const { message, ...options } of saved) {
            ToastQueue.add(message, options);
          }
          expect(messages(), 'restored queue order').toEqual(['C', 'B', 'A']);
          expect(
            ToastQueue.entries.some((entry) => entry.onClose !== undefined),
            'restored callbacks'
          ).toBe(false);

          renderedToasts = 0;
          canvasElement.append(container);
          await getFront(container);

          expect(renderedToasts, 'toasts rendered for the restore').toBe(1);
          expectStack('restored');
        }
      );
    } finally {
      observer.disconnect();
      if (!container.isConnected) {
        canvasElement.append(container);
      }
      ToastQueue.clear();
    }
  },
};

export const StackPlacementTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );

    try {
      ToastQueue.add('Older notification');
      ToastQueue.add('Newer notification');
      await getFront(container);

      for (const placement of [
        'bottom',
        'bottom-end',
        'top',
        'top-end',
      ] as const) {
        await step(
          `${placement}: layers peek away from the anchored edge`,
          async () => {
            container.placement = placement;
            await container.updateComplete;
            const region = getRegion(container).getBoundingClientRect();
            const rect = getLayers(container)[0].getBoundingClientRect();
            if (placement.startsWith('bottom')) {
              expect(rect.top, 'layer top edge').toBeLessThan(region.top);
              expect(rect.bottom, 'layer bottom edge').toBeLessThanOrEqual(
                region.bottom
              );
            } else {
              expect(rect.bottom, 'layer bottom edge').toBeGreaterThan(
                region.bottom
              );
              expect(rect.top, 'layer top edge').toBeGreaterThanOrEqual(
                region.top
              );
            }
          }
        );
      }
    } finally {
      ToastQueue.clear();
    }
  },
};

const closeButtonOf = (toast: Toast): HTMLElement =>
  toast.shadowRoot!.querySelector<HTMLElement>('swc-close-button')!;

const emulateInput = (target: HTMLElement, type: 'pointer' | 'keyboard') => {
  target.dispatchEvent(
    type === 'pointer'
      ? new PointerEvent('pointerdown', { bubbles: true, composed: true })
      : new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          composed: true,
        })
  );
};

export const StackFocusTest: Story = {
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const trigger = canvasElement.querySelector<HTMLButtonElement>('#trigger')!;

    try {
      await step(
        'closing the focused toast from the keyboard focuses the promoted toast',
        async () => {
          trigger.focus();
          ToastQueue.add('Older notification');
          const frontKey = ToastQueue.add('Newer notification');
          const front = await getFront(container);
          closeButtonOf(front).focus();
          emulateInput(closeButtonOf(front), 'keyboard');
          ToastQueue.close(frontKey);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1)
          );
          const promoted = await getFront(container);
          expect(promoted.textContent, 'promoted message').toContain(
            'Older notification'
          );
          await waitFor(() =>
            expect(getActiveElement(), 'focus after keyboard close').toBe(
              promoted
            )
          );
        }
      );

      ToastQueue.clear();
      await waitFor(() => expect(ToastQueue.entries).toHaveLength(0));

      await step(
        'closing the focused toast with a pointer returns focus to where it was before the region',
        async () => {
          trigger.focus();
          ToastQueue.add('Older notification');
          const frontKey = ToastQueue.add('Newer notification');
          const front = await getFront(container);
          emulateInput(closeButtonOf(front), 'pointer');
          closeButtonOf(front).focus();
          ToastQueue.close(frontKey);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1)
          );
          const promoted = await getFront(container);
          await waitFor(() =>
            expect(getActiveElement(), 'focus after pointer close').toBe(
              trigger
            )
          );
          expect(
            deepContains(container, getActiveElement()),
            'focus is outside the region'
          ).toBe(false);
          expect(promoted.open, 'promoted toast is open').toBe(true);
        }
      );

      ToastQueue.clear();
      await waitFor(() => expect(ToastQueue.entries).toHaveLength(0));

      await step(
        'a toast without focus leaves focus alone when the front changes',
        async () => {
          trigger.focus();
          const frontKey = ToastQueue.add('Older notification');
          ToastQueue.add('Newer notification');
          await getFront(container);
          ToastQueue.close(ToastQueue.entries[0].key);
          await waitFor(() =>
            expect(ToastQueue.entries, 'queue entries').toHaveLength(1)
          );
          await getFront(container);
          expect(frontKey, 'remaining key').toBe(ToastQueue.entries[0].key);
          expect(getActiveElement(), 'focus').toBe(trigger);
        }
      );
    } finally {
      ToastQueue.clear();
    }
  },
};

export const TopLayerStackingTest: Story = {
  render: () => html`
    <div
      id="overlap"
      popover="manual"
      style="inset: auto 0 0 0; inline-size: auto; block-size: 200px; margin: 0;"
    ></div>
    <swc-toast-container></swc-toast-container>
  `,
  play: async ({ canvasElement, step }) => {
    ToastQueue.clear();
    const container = await getComponent<ToastContainer>(
      canvasElement,
      'swc-toast-container'
    );
    const overlap = canvasElement.querySelector<HTMLElement>('#overlap')!;
    const topElementOverToast = (): Element | null => {
      const rect = container.shadowRoot
        ?.querySelector('[role="region"]')
        ?.getBoundingClientRect();
      return rect
        ? document.elementFromPoint(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2
          )
        : null;
    };

    try {
      ToastQueue.add('First notification');
      await getFront(container);
      overlap.showPopover();

      await step('a popover opened after the first toast covers it', () => {
        expect(topElementOverToast(), 'top element').toBe(overlap);
      });

      await step('a newly added toast stacks above that popover', async () => {
        ToastQueue.add('Second notification');
        await getFront(container);
        expect(topElementOverToast(), 'top element').toBe(container);
      });
    } finally {
      if (overlap.matches(':popover-open')) {
        overlap.hidePopover();
      }
      ToastQueue.clear();
    }
  },
};

// Manual check for layering (see Q16, Q18): the region is in the top layer, so a
// high z-index header must not cover it; a modal dialog and open popovers are the cases to inspect.
export const LayeringFixture: Story = {
  name: 'Layering (manual check)',
  args: { placement: 'top' },
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'top-end', 'bottom', 'bottom-end'],
    },
  },
  tags: ['!test'],
  beforeEach: () => {
    ToastQueue.clear();
    return () => ToastQueue.clear();
  },
  render: (args) => {
    const add = (): void => {
      ToastQueue.add(`Layering check (${ToastQueue.entries.length + 1})`, {
        variant: 'info',
      });
    };
    const openDialog = (): void => {
      document
        .querySelector<HTMLDialogElement>('#layering-dialog')
        ?.showModal();
    };
    const closeDialog = (): void => {
      document.querySelector<HTMLDialogElement>('#layering-dialog')?.close();
    };
    const openPopover = (): void => {
      document.querySelector<HTMLElement>('#layering-popover')?.showPopover();
    };
    return html`
      <div
        style="position: fixed; inset: 0 0 auto 0; z-index: 100; padding: 16px; background: #333; color: #fff;"
      >
        App header (z-index: 100). A toast at the top placement should stay
        visible above it.
      </div>
      <div style="padding-block-start: 96px; display: flex; gap: 8px;">
        <swc-button variant="secondary" @click=${add}>Add toast</swc-button>
        <swc-button variant="secondary" @click=${openDialog}>
          Open modal dialog
        </swc-button>
        <swc-button variant="secondary" @click=${openPopover}>
          Open popover
        </swc-button>
      </div>
      <div id="layering-popover" popover="auto" style="padding: 24px;">
        <p>Auto popover. Adding a toast from here should not close it.</p>
        <swc-button variant="secondary" @click=${add}>Add toast</swc-button>
      </div>
      <dialog id="layering-dialog" style="padding: 24px;">
        <p>Modal dialog. A toast added from here should stay visible.</p>
        <swc-button variant="secondary" @click=${add}>Add toast</swc-button>
        <swc-button variant="secondary" @click=${closeDialog}>
          Close dialog
        </swc-button>
      </dialog>
      <swc-toast-container .placement=${args.placement}></swc-toast-container>
    `;
  },
};

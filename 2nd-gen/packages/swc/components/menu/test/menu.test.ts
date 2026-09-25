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

import { Menu } from '@adobe/spectrum-wc/menu';
import {
  MENU_PLACEMENTS,
  MENU_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/menu';
import { isTopDismissible } from '@adobe/spectrum-wc-core/utils/index.js';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/menu/swc-menu.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, { OpenAndClose } from '../stories/menu.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
  ...meta,
  title: 'Menu/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ─── Test helpers ─────────────────────────────────────────────────────────────

// Placeholders for `swc-menu-item`, which doesn't exist yet; matches its
// eventual tag name and `role="menuitem"` so tests stay aXe-clean.
const defaultItems = html`
  <swc-menu-item role="menuitem" tabindex="-1">Cut</swc-menu-item>
  <swc-menu-item role="menuitem" tabindex="-1">Copy</swc-menu-item>
  <swc-menu-item role="menuitem" tabindex="-1">Paste</swc-menu-item>
`;

const getItems = (canvasElement: HTMLElement): HTMLElement[] =>
  Array.from(canvasElement.querySelectorAll('swc-menu-item')) as HTMLElement[];

// The native popover lives on the shadow-internal `.swc-Menu` surface, not on
// the `<swc-menu>` host, so `:popover-open` must be checked there.
const isMenuOpen = (menu: Menu): boolean =>
  menu.shadowRoot?.querySelector('.swc-Menu')?.matches(':popover-open') ??
  false;

// Awaits a DOM event dispatched on the given element, resolving with the event object.
const waitForEvent = <T extends Event>(
  el: EventTarget,
  eventName: string
): Promise<T> =>
  new Promise<T>((resolve) => {
    el.addEventListener(eventName, (event) => resolve(event as T), {
      once: true,
    });
  });

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const DefaultsTest: Story = {
  render: () => html`
    <swc-button id="defaults-trigger">Edit</swc-button>
    <swc-menu for="defaults-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('renders expected default property values', async () => {
      expect(menu.placement, 'default placement is bottom-start').toBe(
        'bottom-start'
      );
      expect(menu.shouldFlip, 'default shouldFlip is true').toBe(true);
      expect(menu.open, 'default open is false').toBe(false);
      expect(menu.size, 'default size is m').toBe('m');
      expect(menu.for, 'for reflects the attribute').toBe('defaults-trigger');
      expect(menu.triggerElement, 'default triggerElement is null').toBeNull();
    });

    await step('does not set a role on the host element', async () => {
      expect(menu.hasAttribute('role'), 'host has no role attribute').toBe(
        false
      );
    });

    await step(
      'renders popover="auto" and role="menu" on the shadow-internal surface',
      async () => {
        const surface = menu.shadowRoot?.querySelector('.swc-Menu');
        expect(
          surface?.getAttribute('popover'),
          'shadow surface is popover="auto"'
        ).toBe('auto');
        expect(
          surface?.getAttribute('role'),
          'shadow surface has role="menu"'
        ).toBe('menu');
      }
    );

    await step(
      'does not carry an actual-placement attribute while closed',
      async () => {
        expect(
          menu.hasAttribute('actual-placement'),
          'no actual-placement while closed'
        ).toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('reflects placement attribute after mutation', async () => {
      menu.placement = 'top-end';
      await menu.updateComplete;
      expect(menu.getAttribute('placement'), 'placement is top-end').toBe(
        'top-end'
      );

      menu.placement = 'bottom-start';
      await menu.updateComplete;
      expect(
        menu.getAttribute('placement'),
        'placement reverts to bottom-start'
      ).toBe('bottom-start');
    });

    await step('updates the shouldFlip property directly', async () => {
      menu.shouldFlip = false;
      await menu.updateComplete;
      expect(menu.shouldFlip, 'shouldFlip is false').toBe(false);

      menu.shouldFlip = true;
      await menu.updateComplete;
      expect(menu.shouldFlip, 'shouldFlip reverts to true').toBe(true);
    });

    await step('reflects open attribute after mutation', async () => {
      menu.open = true;
      await waitFor(() => expect(menu.hasAttribute('open')).toBe(true), {
        timeout: 1000,
      });
      menu.open = false;
      await waitFor(() => expect(menu.hasAttribute('open')).toBe(false), {
        timeout: 1000,
      });
    });

    await step('renders in every valid size', async () => {
      for (const size of MENU_VALID_SIZES) {
        menu.size = size;
        await menu.updateComplete;
        expect(menu.size, `size property is "${size}"`).toBe(size);
        expect(menu.getAttribute('size'), `size attribute is "${size}"`).toBe(
          size
        );
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Lifecycle events
// ──────────────────────────────────────────────────────────────

export const LifecycleEventsTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('fires swc-open and swc-after-open when opened', async () => {
      // swc-after-open only fires once the enter transition settles, which
      // can land either side of the popover-open state flip depending on
      // transition timing in a given browser/CI environment. Await the
      // events directly rather than racing a boolean flag against an
      // unrelated `isMenuOpen` poll.
      const openPromise = waitForEvent(menu, 'swc-open');
      const afterOpenPromise = waitForEvent(menu, 'swc-after-open');

      menu.open = true;
      await openPromise;
      await afterOpenPromise;
    });

    await step('fires swc-close and swc-after-close when closed', async () => {
      const closePromise = waitForEvent(menu, 'swc-close');
      const afterClosePromise = waitForEvent(menu, 'swc-after-close');

      menu.open = false;
      await closePromise;
      await afterClosePromise;
    });

    await step('dispatches events that bubble and are composed', async () => {
      let bubbledOpen = false;
      canvasElement.addEventListener('swc-open', () => (bubbledOpen = true), {
        once: true,
      });
      menu.open = true;
      await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
        timeout: 1000,
      });
      expect(bubbledOpen, 'swc-open bubbled to canvas').toBe(true);
      menu.open = false;
      await menu.updateComplete;
    });
  },
};

export const StartsOpenNoPhantomEventTest: Story = {
  render: () => html`
    <button id="starts-open-trigger">Edit</button>
    <div id="starts-open-mount"></div>
  `,
  play: async ({ canvasElement, step }) => {
    const mount = canvasElement.querySelector(
      '#starts-open-mount'
    ) as HTMLElement;

    await step(
      'does not dispatch swc-open when the menu starts already open',
      async () => {
        let openFired = false;
        const menu = document.createElement('swc-menu') as Menu;
        menu.addEventListener('swc-open', () => (openFired = true));
        menu.setAttribute('for', 'starts-open-trigger');
        menu.open = true;
        menu.innerHTML =
          '<swc-menu-item role="menuitem" tabindex="-1">Cut</swc-menu-item>';
        mount.appendChild(menu);

        await menu.updateComplete;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });
        expect(
          openFired,
          'swc-open does not fire on the very first render'
        ).toBe(false);

        menu.open = false;
        await menu.updateComplete;
        menu.remove();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Click-to-toggle
// ──────────────────────────────────────────────────────────────

export const ClickToToggleTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const trigger = canvasElement.querySelector(
      '#open-close-trigger'
    ) as HTMLElement;

    await step('clicking the trigger opens the menu', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
        timeout: 1000,
      });
      expect(menu.open, 'open is true after trigger click').toBe(true);
    });

    await step('clicking the trigger again closes the menu', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(isMenuOpen(menu)).toBe(false), {
        timeout: 1000,
      });
      expect(menu.open, 'open is false after second trigger click').toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Trigger ARIA wiring
// ──────────────────────────────────────────────────────────────

export const TriggerAriaWiringNativeTest: Story = {
  render: () => html`
    <button id="aria-native-trigger">Native trigger</button>
    <swc-menu for="aria-native-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const trigger = canvasElement.querySelector(
      '#aria-native-trigger'
    ) as HTMLButtonElement;

    await step(
      'wires aria-haspopup and aria-expanded directly on a native trigger',
      async () => {
        expect(
          trigger.getAttribute('aria-haspopup'),
          'aria-haspopup is menu'
        ).toBe('menu');
        expect(
          trigger.getAttribute('aria-expanded'),
          'aria-expanded starts false'
        ).toBe('false');

        menu.open = true;
        await menu.updateComplete;
        expect(
          trigger.getAttribute('aria-expanded'),
          'aria-expanded reflects open'
        ).toBe('true');

        menu.open = false;
        await menu.updateComplete;
        expect(
          trigger.getAttribute('aria-expanded'),
          'aria-expanded reflects closed'
        ).toBe('false');
      }
    );
  },
};

export const TriggerAriaWiringSwcButtonTest: Story = {
  render: () => html`
    <swc-button id="aria-swc-trigger">Edit</swc-button>
    <swc-menu for="aria-swc-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const swcTrigger = canvasElement.querySelector(
      '#aria-swc-trigger'
    ) as HTMLElement & { updateComplete: Promise<boolean> };
    await swcTrigger.updateComplete;
    const innerButton = swcTrigger.shadowRoot?.querySelector('button') ?? null;

    await step(
      'wires aria-haspopup and aria-expanded onto the inner shadow button',
      async () => {
        expect(innerButton, 'swc-button has an inner button').toBeTruthy();
        expect(innerButton?.getAttribute('aria-haspopup')).toBe('menu');
        expect(innerButton?.getAttribute('aria-expanded')).toBe('false');

        menu.open = true;
        await menu.updateComplete;
        expect(innerButton?.getAttribute('aria-expanded')).toBe('true');

        menu.open = false;
        await menu.updateComplete;
      }
    );
  },
};

export const TriggerElementOverrideTest: Story = {
  render: () => html`
    <button id="aria-wrong-trigger">Wrong</button>
    <button id="aria-correct-trigger">Correct</button>
    <swc-menu for="aria-wrong-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const wrong = canvasElement.querySelector(
      '#aria-wrong-trigger'
    ) as HTMLButtonElement;
    const correct = canvasElement.querySelector(
      '#aria-correct-trigger'
    ) as HTMLButtonElement;

    await step(
      'triggerElement overrides for and receives the ARIA wiring instead',
      async () => {
        menu.triggerElement = correct;
        await menu.updateComplete;

        expect(
          correct.getAttribute('aria-haspopup'),
          'correct target is wired'
        ).toBe('menu');
        expect(
          wrong.hasAttribute('aria-haspopup'),
          'for target is not wired once triggerElement overrides it'
        ).toBe(false);
      }
    );

    await step(
      'click on the triggerElement target toggles the menu',
      async () => {
        await userEvent.click(correct);
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });
        menu.open = false;
        await menu.updateComplete;
      }
    );
  },
};

export const TriggerSwapClearsOldAriaTest: Story = {
  render: () => html`
    <button id="aria-old-trigger">Old</button>
    <button id="aria-new-trigger">New</button>
    <swc-menu for="aria-old-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const oldTrigger = canvasElement.querySelector(
      '#aria-old-trigger'
    ) as HTMLButtonElement;
    const newTrigger = canvasElement.querySelector(
      '#aria-new-trigger'
    ) as HTMLButtonElement;

    await step('wires the initial for target', async () => {
      expect(oldTrigger.getAttribute('aria-haspopup')).toBe('menu');
    });

    await step(
      'swapping for to a new id clears the previous trigger and wires the new one',
      async () => {
        menu.for = 'aria-new-trigger';
        await menu.updateComplete;

        expect(
          oldTrigger.hasAttribute('aria-haspopup'),
          'old trigger aria-haspopup cleared'
        ).toBe(false);
        expect(
          oldTrigger.hasAttribute('aria-expanded'),
          'old trigger aria-expanded cleared'
        ).toBe(false);
        expect(
          newTrigger.getAttribute('aria-haspopup'),
          'new trigger is wired'
        ).toBe('menu');
      }
    );
  },
};

export const ForIdNotFoundWarningTest: Story = {
  render: () => html`
    <swc-menu for="does-not-exist">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step(
      'warns in DEBUG mode when the for attribute does not resolve to an element',
      () =>
        withWarningSpy(async (warnCalls) => {
          menu.open = true;
          await menu.updateComplete;
          menu.open = false;
          await menu.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for unresolved for attribute'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] ?? ''),
            'warning message references the for attribute value'
          ).toContain('does-not-exist');
        })
    );
  },
};

export const NoTriggerNoThrowTest: Story = {
  render: () => html`
    <swc-menu>${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step(
      'opens without throwing when no for attribute or triggerElement is set',
      async () => {
        let threw = false;
        try {
          menu.open = true;
          await menu.updateComplete;
        } catch {
          threw = true;
        }
        expect(threw, 'no error thrown when opening without a trigger').toBe(
          false
        );
        menu.open = false;
        await menu.updateComplete;
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Shadow root scoping
// ──────────────────────────────────────────────────────────────

export const ShadowRootScopeTest: Story = {
  render: () => html`
    <div id="menu-shadow-root-host"></div>
  `,
  play: async ({ canvasElement, step }) => {
    const host = canvasElement.querySelector(
      '#menu-shadow-root-host'
    ) as HTMLDivElement;
    const shadow = host.attachShadow({ mode: 'open' });

    const trigger = document.createElement('button');
    trigger.id = 'sr-menu-trigger';
    trigger.textContent = 'Trigger';

    const menu = document.createElement('swc-menu') as Menu;
    menu.innerHTML =
      '<swc-menu-item role="menuitem" tabindex="-1">Cut</swc-menu-item>';

    shadow.append(trigger, menu);

    // Set `for` after connecting so getRootNode() resolves the trigger
    // scoped to the shadow root once the first updated() runs.
    menu.for = 'sr-menu-trigger';
    await menu.updateComplete;

    await step(
      'resolves the trigger via getRootNode() scoped to the shadow root',
      async () => {
        expect(
          trigger.getAttribute('aria-haspopup'),
          'trigger inside the shadow root is wired'
        ).toBe('menu');

        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });
        menu.open = false;
        await menu.updateComplete;
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Focus management
// ──────────────────────────────────────────────────────────────

export const FocusManagementTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const trigger = canvasElement.querySelector(
      '#open-close-trigger'
    ) as HTMLElement;

    await step('opening moves focus to the first row', async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
        timeout: 1000,
      });
      await waitFor(
        () => expect(document.activeElement).toBe(getItems(canvasElement)[0]),
        { timeout: 1000 }
      );
    });

    await step('closing restores focus to the trigger', async () => {
      menu.open = false;
      await waitFor(() => expect(isMenuOpen(menu)).toBe(false), {
        timeout: 1000,
      });
      expect(document.activeElement, 'focus returns to the trigger').toBe(
        trigger
      );
    });
  },
};

export const FocusNotStolenOnCloseTest: Story = {
  render: () => html`
    <button id="fm-trigger">Edit</button>
    <button id="fm-elsewhere">Elsewhere</button>
    <swc-menu for="fm-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const elsewhere = canvasElement.querySelector(
      '#fm-elsewhere'
    ) as HTMLButtonElement;

    await step(
      'does not move focus to the trigger when focus was not inside the menu at close',
      async () => {
        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });

        elsewhere.focus();
        expect(document.activeElement, 'focus moved to elsewhere').toBe(
          elsewhere
        );

        menu.open = false;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(false), {
          timeout: 1000,
        });
        expect(
          document.activeElement,
          'focus remains on the externally-focused element'
        ).toBe(elsewhere);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Keyboard interactions
// ──────────────────────────────────────────────────────────────

export const TabTrapAndEnterActivateTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const trigger = canvasElement.querySelector(
      '#open-close-trigger'
    ) as HTMLElement;

    await step('opens and focuses the first row', async () => {
      await userEvent.click(trigger);
      await waitFor(
        () => expect(document.activeElement).toBe(getItems(canvasElement)[0]),
        { timeout: 1000 }
      );
    });

    await step('Tab does not move focus out of the menu', async () => {
      const active = document.activeElement;
      await userEvent.tab();
      expect(document.activeElement, 'focus stays on the active row').toBe(
        active
      );
    });

    await step('Shift+Tab does not move focus out of the menu', async () => {
      const active = document.activeElement;
      await userEvent.tab({ shift: true });
      expect(document.activeElement, 'focus stays on the active row').toBe(
        active
      );
    });

    await step('Enter on the focused row closes the menu', async () => {
      let closeCount = 0;
      menu.addEventListener('swc-close', () => closeCount++);
      await userEvent.keyboard('{Enter}');
      await waitFor(() => expect(isMenuOpen(menu)).toBe(false), {
        timeout: 1000,
      });
      expect(menu.open, 'menu closes on Enter').toBe(false);
      expect(closeCount, 'swc-close fires exactly once').toBe(1);
    });
  },
};

export const ArrowKeyNavigationTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const trigger = canvasElement.querySelector(
      '#open-close-trigger'
    ) as HTMLElement;

    await step('opens and focuses the first row', async () => {
      await userEvent.click(trigger);
      await waitFor(
        () => expect(document.activeElement).toBe(getItems(canvasElement)[0]),
        { timeout: 1000 }
      );
    });

    await step('ArrowDown moves focus to the next row', async () => {
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement, 'focus on second row').toBe(
        getItems(canvasElement)[1]
      );
    });

    await step('ArrowDown wraps from the last row to the first', async () => {
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement, 'focus on third row').toBe(
        getItems(canvasElement)[2]
      );
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement, 'focus wraps to first row').toBe(
        getItems(canvasElement)[0]
      );
    });

    await step('ArrowUp wraps from the first row to the last', async () => {
      await userEvent.keyboard('{ArrowUp}');
      expect(document.activeElement, 'focus wraps to last row').toBe(
        getItems(canvasElement)[2]
      );
    });

    await step(
      'End moves focus to the last row, Home to the first',
      async () => {
        await userEvent.keyboard('{Home}');
        expect(document.activeElement, 'focus on first row').toBe(
          getItems(canvasElement)[0]
        );
        await userEvent.keyboard('{End}');
        expect(document.activeElement, 'focus on last row').toBe(
          getItems(canvasElement)[2]
        );
      }
    );

    await step('closes the menu', async () => {
      menu.open = false;
      await menu.updateComplete;
    });
  },
};

export const ClickActivationTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const trigger = canvasElement.querySelector(
      '#open-close-trigger'
    ) as HTMLElement;

    await step(
      'clicking inside the menu but not on a row does not close it',
      async () => {
        await userEvent.click(trigger);
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });

        await userEvent.click(menu);
        await menu.updateComplete;
        expect(
          menu.open,
          'menu stays open after a click on the host itself'
        ).toBe(true);
      }
    );

    await step('clicking a row closes the menu', async () => {
      await userEvent.click(getItems(canvasElement)[1]);
      await waitFor(() => expect(isMenuOpen(menu)).toBe(false), {
        timeout: 1000,
      });
      expect(menu.open, 'menu closes after clicking a row').toBe(false);
    });

    await step(
      'a click while closed does not throw or reopen the menu',
      async () => {
        await userEvent.click(getItems(canvasElement)[0]);
        await menu.updateComplete;
        expect(menu.open, 'menu remains closed').toBe(false);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slot restriction
// ──────────────────────────────────────────────────────────────

export const SlotRestrictionWarningTest: Story = {
  render: () => html`
    <swc-button id="slot-warning-trigger">Edit</swc-button>
    <swc-menu for="slot-warning-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('warns when a disallowed child is slotted', () =>
      withWarningSpy(async (warnCalls) => {
        const bad = document.createElement('div');
        bad.textContent = 'Not allowed';
        menu.appendChild(bad);
        await menu.updateComplete;
        await new Promise((r) => requestAnimationFrame(r));

        expect(
          warnCalls.length,
          'warns for the disallowed child'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] ?? ''),
          'warning references the disallowed tag'
        ).toContain('div');
        bad.remove();
      })
    );
  },
};

export const SlotRestrictionValidNoWarningTest: Story = {
  render: () => html`
    <swc-button id="slot-valid-trigger">Edit</swc-button>
    <swc-menu for="slot-valid-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('does not warn when adding another allowed child', () =>
      withWarningSpy(async (warnCalls) => {
        const item = document.createElement('swc-menu-item');
        item.setAttribute('role', 'menuitem');
        item.setAttribute('tabindex', '-1');
        item.textContent = 'Delete';
        menu.appendChild(item);
        await menu.updateComplete;
        await new Promise((r) => requestAnimationFrame(r));

        expect(warnCalls.length, 'no warnings for an allowed child').toBe(0);
        item.remove();
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: PlacementController integration
// ──────────────────────────────────────────────────────────────

export const PlacementControllerIntegrationTest: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center; padding: 120px;">
      <swc-button id="placement-trigger">Edit</swc-button>
    </div>
    <swc-menu for="placement-trigger" placement="bottom-start">
      ${defaultItems}
    </swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const surface = () =>
      menu.shadowRoot?.querySelector('.swc-Menu') as HTMLElement | null;

    await step(
      'applies translate positioning via PlacementController when opened',
      async () => {
        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });
        await waitFor(() => expect(surface()?.style.translate).toBeTruthy(), {
          timeout: 1000,
        });
      }
    );

    await step(
      'sets the actual-placement attribute to a valid physical side',
      async () => {
        await waitFor(
          () =>
            expect(['top', 'bottom', 'left', 'right']).toContain(
              menu.getAttribute('actual-placement')
            ),
          { timeout: 1000 }
        );
      }
    );

    await step('clears actual-placement once the menu closes', async () => {
      menu.open = false;
      await waitFor(
        () => expect(menu.hasAttribute('actual-placement')).toBe(false),
        { timeout: 2000 }
      );
    });
  },
};

export const ReanchorOnPlacementChangeTest: Story = {
  render: () => html`
    <div style="display: flex; justify-content: center; padding: 120px;">
      <swc-button id="reanchor-trigger">Edit</swc-button>
      <swc-button id="reanchor-trigger-2">Edit 2</swc-button>
    </div>
    <swc-menu for="reanchor-trigger" placement="bottom-start">
      ${defaultItems}
    </swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step(
      'reruns positioning when placement changes while open',
      async () => {
        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });
        await waitFor(
          () => expect(menu.getAttribute('actual-placement')).toBeTruthy(),
          { timeout: 1000 }
        );

        menu.removeAttribute('actual-placement');
        menu.placement = 'top-end';
        await menu.updateComplete;

        await waitFor(
          () => expect(menu.getAttribute('actual-placement')).toBeTruthy(),
          { timeout: 1000 }
        );

        menu.open = false;
        await menu.updateComplete;
      }
    );

    await step(
      'reruns positioning when shouldFlip, for, or triggerElement changes while open',
      async () => {
        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });

        menu.removeAttribute('actual-placement');
        menu.shouldFlip = false;
        await menu.updateComplete;
        await waitFor(
          () => expect(menu.getAttribute('actual-placement')).toBeTruthy(),
          { timeout: 1000 }
        );

        menu.removeAttribute('actual-placement');
        menu.for = 'reanchor-trigger-2';
        await menu.updateComplete;
        await waitFor(
          () => expect(menu.getAttribute('actual-placement')).toBeTruthy(),
          { timeout: 1000 }
        );

        const trigger = canvasElement.querySelector(
          '#reanchor-trigger'
        ) as HTMLElement;
        menu.removeAttribute('actual-placement');
        menu.triggerElement = trigger;
        await menu.updateComplete;
        await waitFor(
          () => expect(menu.getAttribute('actual-placement')).toBeTruthy(),
          { timeout: 1000 }
        );

        menu.open = false;
        await menu.updateComplete;
      }
    );
  },
};

export const InvalidPlacementWarningTest: Story = {
  render: () => html`
    <swc-button id="invalid-placement-trigger">Edit</swc-button>
    <swc-menu for="invalid-placement-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step(
      'warns when placement is set to an invalid value in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          menu.placement = 'diagonal' as Menu['placement'];
          await menu.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning for invalid placement'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning references placement'
          ).toContain('placement');
        })
    );
  },
};

export const ValidPlacementNoWarningTest: Story = {
  render: () => html`
    <swc-button id="valid-placement-trigger">Edit</swc-button>
    <swc-menu for="valid-placement-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('does not warn for valid placement values in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        for (const placement of MENU_PLACEMENTS) {
          menu.placement = placement;
          await menu.updateComplete;
        }
        expect(warnCalls.length, 'no warnings for valid placements').toBe(0);
      })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Native close reconciliation
// ──────────────────────────────────────────────────────────────

export const NativeCloseReconciliationTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const surface = () =>
      menu.shadowRoot?.querySelector('.swc-Menu') as HTMLElement;

    await step(
      'syncs the open property down when the surface closes without open being set first',
      async () => {
        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });

        // Simulates the surface closing on its own (e.g. native light-dismiss)
        // by calling hidePopover() directly instead of going through the
        // `open` setter. hidePopover() always fires a real beforetoggle
        // event, so this exercises the same _syncOpen reconciliation that a
        // trusted Escape/outside-click would (covered end-to-end with real
        // trusted input in menu.a11y.spec.ts).
        surface().hidePopover();
        await waitFor(() => expect(menu.open).toBe(false), { timeout: 1000 });
        expect(isMenuOpen(menu), 'surface is closed').toBe(false);
      }
    );
  },
};

export const KeydownWhileClosedTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step(
      'a keydown that arrives just as the menu closes is a no-op',
      async () => {
        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });

        // Setting `open` updates the property synchronously; the document
        // keydown listener isn't removed until the deferred close reaction
        // runs. Dispatching in this same synchronous window exercises
        // handleKeyDown's own `!this.open` guard rather than relying on the
        // listener already being gone.
        menu.open = false;
        let threw = false;
        try {
          document.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: 'Tab',
              bubbles: true,
              cancelable: true,
            })
          );
        } catch {
          threw = true;
        }
        expect(threw, 'no error dispatching keydown during close').toBe(false);

        await waitFor(() => expect(isMenuOpen(menu)).toBe(false), {
          timeout: 1000,
        });
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Trigger resolution changes
// ──────────────────────────────────────────────────────────────

export const TriggerBecomesUnresolvedTest: Story = {
  render: () => html`
    <button id="tbu-old-trigger">Old</button>
    <swc-menu for="tbu-old-trigger">${defaultItems}</swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');
    const oldTrigger = canvasElement.querySelector(
      '#tbu-old-trigger'
    ) as HTMLButtonElement;

    await step('wires the initial valid trigger', async () => {
      expect(oldTrigger.getAttribute('aria-haspopup')).toBe('menu');
    });

    await step(
      'switching for to an id that does not resolve clears the old click listener without adding a new one',
      () =>
        withWarningSpy(async () => {
          menu.for = 'does-not-exist-either';
          await menu.updateComplete;

          expect(
            oldTrigger.hasAttribute('aria-haspopup'),
            'old trigger is no longer wired'
          ).toBe(false);

          // The old trigger's click listener was removed and no trigger
          // resolved to receive a new one; clicking the old trigger element
          // must no longer toggle the menu.
          await userEvent.click(oldTrigger);
          await menu.updateComplete;
          expect(
            menu.open,
            'menu does not open from the now-unwired old trigger'
          ).toBe(false);
        })
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Opening with no rows
// ──────────────────────────────────────────────────────────────

export const OpensWithNoItemsTest: Story = {
  render: () => html`
    <swc-button id="empty-menu-trigger">Edit</swc-button>
    <swc-menu for="empty-menu-trigger"></swc-menu>
  `,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('opens without throwing when it has no rows', async () => {
      let threw = false;
      try {
        menu.open = true;
        await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
          timeout: 1000,
        });
      } catch {
        threw = true;
      }
      expect(threw, 'no error opening an empty menu').toBe(false);

      menu.open = false;
      await menu.updateComplete;
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dismissible stack integration
// ──────────────────────────────────────────────────────────────

export const DismissibleStackTest: Story = {
  ...OpenAndClose,
  play: async ({ canvasElement, step }) => {
    const menu = await getComponent<Menu>(canvasElement, 'swc-menu');

    await step('registers as the top dismissible while open', async () => {
      menu.open = true;
      await waitFor(() => expect(isMenuOpen(menu)).toBe(true), {
        timeout: 1000,
      });
      expect(
        isTopDismissible(menu),
        'menu is the top dismissible while open'
      ).toBe(true);
    });

    await step('unregisters once closed', async () => {
      menu.open = false;
      await waitFor(() => expect(isMenuOpen(menu)).toBe(false), {
        timeout: 1000,
      });
      expect(
        isTopDismissible(menu),
        'menu is no longer a dismissible once closed'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Disconnect cleanup
// ──────────────────────────────────────────────────────────────

export const DisconnectCleanupTest: Story = {
  render: () => html`
    <button id="disconnect-trigger">Edit</button>
    <div id="disconnect-mount"></div>
  `,
  play: async ({ canvasElement, step }) => {
    const trigger = canvasElement.querySelector(
      '#disconnect-trigger'
    ) as HTMLButtonElement;
    const mount = canvasElement.querySelector(
      '#disconnect-mount'
    ) as HTMLElement;
    const menu = document.createElement('swc-menu') as Menu;
    menu.setAttribute('for', 'disconnect-trigger');
    menu.innerHTML =
      '<swc-menu-item role="menuitem" tabindex="-1">Cut</swc-menu-item>';
    mount.appendChild(menu);
    await menu.updateComplete;

    await step('wires the trigger while connected', async () => {
      expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    });

    await step('disconnects while closed', async () => {
      menu.remove();
      await new Promise((r) => requestAnimationFrame(r));
    });

    await step('clears the trigger aria after disconnect', async () => {
      expect(
        trigger.hasAttribute('aria-haspopup'),
        'aria-haspopup cleared'
      ).toBe(false);
      expect(
        trigger.hasAttribute('aria-expanded'),
        'aria-expanded cleared'
      ).toBe(false);
    });
  },
};

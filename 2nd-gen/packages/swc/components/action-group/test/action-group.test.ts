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
import { expect, userEvent } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { ActionGroup } from '@adobe/spectrum-wc/action-group';
import {
  ACTION_GROUP_ORIENTATIONS,
  ACTION_GROUP_STATIC_COLORS,
  ACTION_GROUP_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/action-group';

import '@adobe/spectrum-wc/components/action-group/swc-action-group.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, {
  Compact,
  Disabled,
  Orientations,
  Overview,
  Sizes,
} from '../stories/action-group.stories.js';

export default {
  ...meta,
  title: 'Action Group/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step('renders with expected default values', async () => {
      expect(group.orientation, 'default orientation').toBe('horizontal');
      expect(group.disabled, 'default disabled').toBe(false);
      expect(group.compact, 'default compact').toBe(false);
      expect(group.quiet, 'default quiet').toBe(false);
      expect(group.justified, 'default justified').toBe(false);
    });

    await step('sets correct ARIA attributes', async () => {
      expect(group.getAttribute('role'), 'host role').toBe('group');
      expect(
        group.getAttribute('aria-label'),
        'aria-label from accessible-label'
      ).toBe('Text formatting');
    });

    await step('never sets aria-orientation', async () => {
      expect(
        group.hasAttribute('aria-orientation'),
        'no aria-orientation'
      ).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const AccessibleLabelTest: Story = {
  render: () => html`
    <swc-action-group>
      <swc-action-button>Cut</swc-action-button>
      <swc-action-button>Copy</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step('has no aria-label when accessible-label is unset', async () => {
      expect(group.hasAttribute('aria-label'), 'no aria-label by default').toBe(
        false
      );
    });

    await step('reflects accessible-label to aria-label', async () => {
      group.accessibleLabel = 'Edit actions';
      await group.updateComplete;
      expect(group.getAttribute('aria-label'), 'aria-label set').toBe(
        'Edit actions'
      );
    });

    await step(
      'removes aria-label when accessible-label is cleared',
      async () => {
        group.accessibleLabel = '';
        await group.updateComplete;
        expect(group.hasAttribute('aria-label'), 'aria-label removed').toBe(
          false
        );
      }
    );
  },
};

export const OrientationMutationTest: Story = {
  render: () => html`
    <swc-action-group>
      <swc-action-button>Action 1</swc-action-button>
      <swc-action-button>Action 2</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step('reflects orientation attribute', async () => {
      expect(
        group.getAttribute('orientation'),
        'default orientation attribute'
      ).toBe('horizontal');
    });

    await step(
      'updates orientation attribute when changed to vertical',
      async () => {
        group.orientation = 'vertical';
        await group.updateComplete;
        expect(
          group.getAttribute('orientation'),
          'orientation after vertical'
        ).toBe('vertical');
      }
    );

    await step(
      'reverts orientation attribute when changed back to horizontal',
      async () => {
        group.orientation = 'horizontal';
        await group.updateComplete;
        expect(
          group.getAttribute('orientation'),
          'orientation after horizontal'
        ).toBe('horizontal');
      }
    );

    await step(
      'never sets aria-orientation regardless of orientation',
      async () => {
        expect(
          group.hasAttribute('aria-orientation'),
          'no aria-orientation'
        ).toBe(false);
      }
    );
  },
};

export const BooleanAttributeReflectionTest: Story = {
  render: () => html`
    <swc-action-group>
      <swc-action-button>Action</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step(
      'reflects compact, quiet, and justified to attributes',
      async () => {
        group.compact = true;
        group.quiet = true;
        group.justified = true;
        await group.updateComplete;
        expect(group.hasAttribute('compact'), 'compact attribute set').toBe(
          true
        );
        expect(group.hasAttribute('quiet'), 'quiet attribute set').toBe(true);
        expect(group.hasAttribute('justified'), 'justified attribute set').toBe(
          true
        );
      }
    );

    await step('removes attributes when properties are unset', async () => {
      group.compact = false;
      group.quiet = false;
      group.justified = false;
      await group.updateComplete;
      expect(group.hasAttribute('compact'), 'compact attribute removed').toBe(
        false
      );
      expect(group.hasAttribute('quiet'), 'quiet attribute removed').toBe(
        false
      );
      expect(
        group.hasAttribute('justified'),
        'justified attribute removed'
      ).toBe(false);
    });
  },
};

export const ChildPropagationTest: Story = {
  render: () => html`
    <swc-action-group size="m">
      <swc-action-button>Cut</swc-action-button>
      <swc-action-button>Copy</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );
    type Child = HTMLElement & {
      size: string;
      quiet: boolean;
      staticColor?: string;
      updateComplete: Promise<boolean>;
    };
    const buttons = () =>
      Array.from(
        canvasElement.querySelectorAll('swc-action-button')
      ) as Child[];

    await step('propagates initial size to child buttons', async () => {
      for (const button of buttons()) {
        await button.updateComplete;
        expect(button.size, 'button receives group size').toBe('m');
      }
    });

    await step('propagates quiet to child buttons', async () => {
      group.quiet = true;
      await group.updateComplete;
      for (const button of buttons()) {
        await button.updateComplete;
        expect(button.quiet, 'button receives group quiet').toBe(true);
      }
    });

    await step('propagates static-color to child buttons', async () => {
      group.staticColor = 'white';
      await group.updateComplete;
      for (const button of buttons()) {
        await button.updateComplete;
        expect(button.staticColor, 'button receives group static-color').toBe(
          'white'
        );
      }
    });

    await step('clears static-color from child buttons', async () => {
      group.staticColor = undefined;
      await group.updateComplete;
      for (const button of buttons()) {
        await button.updateComplete;
        expect(button.staticColor, 'button static-color cleared').toBeNull();
      }
    });

    await step('propagates updated size to child buttons', async () => {
      group.size = 'l' as ActionGroup['size'];
      await group.updateComplete;
      for (const button of buttons()) {
        await button.updateComplete;
        expect(button.size, 'button size after group change').toBe('l');
      }
    });

    await step(
      'propagates current state to a newly slotted child',
      async () => {
        const newButton = document.createElement('swc-action-button') as Child;
        newButton.textContent = 'New';
        group.appendChild(newButton);
        await group.updateComplete;
        await new Promise((r) => requestAnimationFrame(r));
        await newButton.updateComplete;
        expect(newButton.size, 'new button receives group size').toBe('l');
        expect(newButton.quiet, 'new button receives group quiet').toBe(true);
      }
    );
  },
};

export const DisabledPropagationTest: Story = {
  ...Disabled,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );
    const buttons = canvasElement.querySelectorAll('swc-action-button');

    await step('host and children carry aria-disabled', async () => {
      expect(group.getAttribute('aria-disabled'), 'host aria-disabled').toBe(
        'true'
      );
      for (const button of buttons) {
        expect(
          button.getAttribute('aria-disabled'),
          'child aria-disabled'
        ).toBe('true');
      }
    });

    await step(
      'children remain keyboard-reachable (not natively disabled)',
      async () => {
        for (const button of buttons) {
          expect(
            (button as HTMLElement & { disabled?: boolean }).disabled,
            'child not natively disabled'
          ).not.toBe(true);
        }
      }
    );

    await step(
      'newly slotted child receives aria-disabled while group is disabled',
      async () => {
        const newButton = document.createElement('swc-action-button');
        newButton.textContent = 'New';
        group.appendChild(newButton);
        await group.updateComplete;
        await new Promise((r) => requestAnimationFrame(r));
        expect(
          newButton.getAttribute('aria-disabled'),
          'new child receives aria-disabled'
        ).toBe('true');
      }
    );

    await step(
      'clears aria-disabled from host and children when re-enabled',
      async () => {
        group.disabled = false;
        await group.updateComplete;
        expect(
          group.hasAttribute('aria-disabled'),
          'host aria-disabled removed'
        ).toBe(false);
        for (const button of canvasElement.querySelectorAll(
          'swc-action-button'
        )) {
          expect(
            button.getAttribute('aria-disabled'),
            'child aria-disabled removed'
          ).toBeNull();
        }
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Keyboard & Focus
// ──────────────────────────────────────────────────────────────

export const RovingTabindexTest: Story = {
  render: () => html`
    <swc-action-group accessible-label="Edit actions">
      <swc-action-button>Cut</swc-action-button>
      <swc-action-button>Copy</swc-action-button>
      <swc-action-button>Paste</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );
    const buttons = Array.from(
      canvasElement.querySelectorAll('swc-action-button')
    ) as HTMLElement[];

    await step('exactly one child has tabindex 0 initially', async () => {
      const tabbable = buttons.filter((b) => b.tabIndex === 0);
      expect(tabbable.length, 'one tabbable child').toBe(1);
      expect(buttons[0].tabIndex, 'first child is the initial tab stop').toBe(
        0
      );
      expect(buttons[1].tabIndex, 'second child not tabbable').toBe(-1);
      expect(buttons[2].tabIndex, 'third child not tabbable').toBe(-1);
    });

    await step(
      'mouse focus moves the roving tab stop to the clicked item (SWC-250)',
      async () => {
        buttons[2].focus();
        await group.updateComplete;
        expect(buttons[2].tabIndex, 'clicked child becomes tab stop').toBe(0);
        expect(buttons[0].tabIndex, 'previous tab stop reverts').toBe(-1);
      }
    );

    await step(
      'newly slotted child joins the sequence without disturbing the current tab stop',
      async () => {
        const newButton = document.createElement('swc-action-button');
        newButton.textContent = 'New';
        group.appendChild(newButton);
        await group.updateComplete;
        await new Promise((r) => requestAnimationFrame(r));
        expect(
          (newButton as unknown as HTMLElement).tabIndex,
          'new child is not the tab stop'
        ).toBe(-1);
        expect(buttons[2].tabIndex, 'existing tab stop is preserved').toBe(0);
      }
    );

    await step('focus() delegates to the current roving tab stop', async () => {
      group.focus();
      expect(
        document.activeElement,
        'DOM focus lands on the active roving item'
      ).toBe(buttons[2]);
    });
  },
};

// `skipDisabled: false` keeps aria-disabled children in the roving sequence
// (see `DisabledKeyboardReachabilityTest`), but a *natively* disabled child is
// a different case: browsers refuse to focus it regardless of tabindex, so
// `FocusgroupNavigationController` always falls through to the first
// non-natively-disabled eligible item when assigning the roving tab stop.
// `ActionGroup`'s `childObserver` exists specifically to catch this — a
// `disabled` attribute change on an existing child doesn't fire `slotchange`,
// so without it the controller would never re-run and the strip could lose
// its only tab stop.
export const IndividuallyDisabledChildTest: Story = {
  render: () => html`
    <swc-action-group accessible-label="Edit actions">
      <swc-action-button>Cut</swc-action-button>
      <swc-action-button>Copy</swc-action-button>
      <swc-action-button>Paste</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    await getComponent<ActionGroup>(canvasElement, 'swc-action-group');
    const buttons = Array.from(
      canvasElement.querySelectorAll('swc-action-button')
    ) as (HTMLElement & {
      disabled: boolean;
      updateComplete: Promise<boolean>;
    })[];

    await step(
      'roving tab stop falls through when the active child becomes natively disabled',
      async () => {
        expect(buttons[0].tabIndex, 'first child starts as the tab stop').toBe(
          0
        );

        buttons[0].disabled = true;
        await buttons[0].updateComplete;
        await new Promise((r) => requestAnimationFrame(r));

        expect(
          buttons[0].tabIndex,
          'disabled child is no longer the tab stop'
        ).not.toBe(0);
        const tabbable = buttons.filter((b) => b.tabIndex === 0);
        expect(tabbable.length, 'exactly one tab stop remains').toBe(1);
        expect(
          buttons[1].tabIndex,
          'next enabled child becomes the tab stop'
        ).toBe(0);
      }
    );

    await step(
      'the strip stays keyboard-operable after the toggle (MutationObserver refresh)',
      async () => {
        buttons[1].focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(
          document.activeElement,
          'arrow navigation still moves away from the disabled child'
        ).toBe(buttons[2]);
      }
    );

    await step(
      'arrowing toward the disabled boundary child is a safe no-op',
      async () => {
        buttons[1].focus();
        await userEvent.keyboard('{ArrowLeft}');
        expect(
          document.activeElement,
          'focus does not move onto the disabled child'
        ).toBe(buttons[1]);
        const tabbable = buttons.filter((b) => b.tabIndex === 0);
        expect(
          tabbable.length,
          'still exactly one tab stop after the no-op arrow press'
        ).toBe(1);
      }
    );

    await step(
      're-enabling restores the child as a normal focus target',
      async () => {
        buttons[0].disabled = false;
        await buttons[0].updateComplete;
        await new Promise((r) => requestAnimationFrame(r));

        buttons[0].focus();
        expect(
          document.activeElement,
          're-enabled child can receive focus directly'
        ).toBe(buttons[0]);
        expect(
          buttons[0].tabIndex,
          're-enabled child becomes the tab stop once focused'
        ).toBe(0);
      }
    );
  },
};

export const KeyboardNavigationTest: Story = {
  render: () => html`
    <swc-action-group accessible-label="Edit actions">
      <swc-action-button>Cut</swc-action-button>
      <swc-action-button>Copy</swc-action-button>
      <swc-action-button>Paste</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    await getComponent<ActionGroup>(canvasElement, 'swc-action-group');
    const buttons = Array.from(
      canvasElement.querySelectorAll('swc-action-button')
    ) as HTMLElement[];

    await step('ArrowRight moves focus to the next child', async () => {
      buttons[0].focus();
      await userEvent.keyboard('{ArrowRight}');
      expect(document.activeElement, 'focus on second child').toBe(buttons[1]);
    });

    await step(
      'ArrowRight wraps from the last child to the first',
      async () => {
        buttons[2].focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement, 'focus wraps to first child').toBe(
          buttons[0]
        );
      }
    );

    await step('ArrowLeft wraps from the first child to the last', async () => {
      buttons[0].focus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(document.activeElement, 'focus wraps to last child').toBe(
        buttons[2]
      );
    });

    await step(
      'End moves focus to the last child, Home to the first',
      async () => {
        buttons[0].focus();
        await userEvent.keyboard('{End}');
        expect(document.activeElement, 'focus on last child').toBe(buttons[2]);

        await userEvent.keyboard('{Home}');
        expect(document.activeElement, 'focus on first child').toBe(buttons[0]);
      }
    );

    await step(
      'ArrowDown/ArrowUp do not move focus in horizontal orientation',
      async () => {
        buttons[0].focus();
        await userEvent.keyboard('{ArrowDown}');
        expect(document.activeElement, 'focus unchanged by ArrowDown').toBe(
          buttons[0]
        );
        await userEvent.keyboard('{ArrowUp}');
        expect(document.activeElement, 'focus unchanged by ArrowUp').toBe(
          buttons[0]
        );
      }
    );
  },
};

export const VerticalKeyboardNavigationTest: Story = {
  render: () => html`
    <swc-action-group orientation="vertical" accessible-label="Alignment">
      <swc-action-button>Left</swc-action-button>
      <swc-action-button>Center</swc-action-button>
      <swc-action-button>Right</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    await getComponent<ActionGroup>(canvasElement, 'swc-action-group');
    const buttons = Array.from(
      canvasElement.querySelectorAll('swc-action-button')
    ) as HTMLElement[];

    await step('ArrowDown moves focus to the next child', async () => {
      buttons[0].focus();
      await userEvent.keyboard('{ArrowDown}');
      expect(document.activeElement, 'focus on second child').toBe(buttons[1]);
    });

    await step('ArrowUp wraps from the first child to the last', async () => {
      buttons[0].focus();
      await userEvent.keyboard('{ArrowUp}');
      expect(document.activeElement, 'focus wraps to last child').toBe(
        buttons[2]
      );
    });

    await step(
      'ArrowRight/ArrowLeft do not move focus in vertical orientation',
      async () => {
        buttons[0].focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(document.activeElement, 'focus unchanged by ArrowRight').toBe(
          buttons[0]
        );
      }
    );
  },
};

export const DisabledKeyboardReachabilityTest: Story = {
  render: () => html`
    <swc-action-group accessible-label="Edit actions" disabled>
      <swc-action-button>Cut</swc-action-button>
      <swc-action-button>Copy</swc-action-button>
      <swc-action-button>Paste</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    await getComponent<ActionGroup>(canvasElement, 'swc-action-group');
    const buttons = Array.from(
      canvasElement.querySelectorAll('swc-action-button')
    ) as HTMLElement[];

    await step(
      'aria-disabled children remain reachable via arrow keys',
      async () => {
        buttons[0].focus();
        await userEvent.keyboard('{ArrowRight}');
        expect(
          document.activeElement,
          'arrow moves to next aria-disabled child'
        ).toBe(buttons[1]);
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Variants / States
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('renders groups in all valid sizes', async () => {
      for (const size of ACTION_GROUP_VALID_SIZES) {
        const group = canvasElement.querySelector(
          `swc-action-group[size="${size}"]`
        ) as ActionGroup | null;
        expect(group, `group with size="${size}" is rendered`).toBeTruthy();
        await group?.updateComplete;
        expect(group?.size, `group size property is "${size}"`).toBe(size);
      }
    });
  },
};

export const OrientationsTest: Story = {
  ...Orientations,
  play: async ({ canvasElement, step }) => {
    await step('renders groups in all valid orientations', async () => {
      for (const orientation of ACTION_GROUP_ORIENTATIONS) {
        const group = canvasElement.querySelector(
          `swc-action-group[orientation="${orientation}"]`
        ) as ActionGroup | null;
        expect(
          group,
          `group with orientation="${orientation}" is rendered`
        ).toBeTruthy();
        await group?.updateComplete;
        expect(
          group?.orientation,
          `group orientation property is "${orientation}"`
        ).toBe(orientation);
      }
    });
  },
};

export const CompactTest: Story = {
  ...Compact,
  play: async ({ canvasElement, step }) => {
    const groups = Array.from(
      canvasElement.querySelectorAll('swc-action-group')
    ) as (HTMLElement & { compact: boolean; orientation: string })[];

    await step('both compact groups have compact=true', async () => {
      for (const group of groups) {
        expect(group.compact, 'compact property is true').toBe(true);
      }
    });

    await step('second group is vertical, first is horizontal', async () => {
      expect(groups[0].orientation, 'first group orientation').toBe(
        'horizontal'
      );
      expect(groups[1].orientation, 'second group orientation').toBe(
        'vertical'
      );
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidOrientationWarningTest: Story = {
  render: () => html`
    <swc-action-group>
      <swc-action-button>Action</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step('warns when an invalid orientation is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        group.orientation = 'diagonal' as unknown as ActionGroup['orientation'];
        await group.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning for invalid orientation'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning references orientation'
        ).toContain('orientation');
      })
    );
  },
};

export const ValidOrientationNoWarningTest: Story = {
  render: () => html`
    <swc-action-group>
      <swc-action-button>Action</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step('does not warn for valid orientation values in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        for (const orientation of ACTION_GROUP_ORIENTATIONS) {
          group.orientation = orientation;
          await group.updateComplete;
        }

        expect(warnCalls.length, 'no warnings for valid orientations').toBe(0);
      })
    );
  },
};

export const InvalidStaticColorWarningTest: Story = {
  render: () => html`
    <swc-action-group>
      <swc-action-button>Action</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step('warns when an invalid static-color is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        group.staticColor = 'purple' as unknown as ActionGroup['staticColor'];
        await group.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning for invalid static-color'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning references static-color'
        ).toContain('static-color');
      })
    );
  },
};

export const ValidStaticColorNoWarningTest: Story = {
  render: () => html`
    <swc-action-group>
      <swc-action-button>Action</swc-action-button>
    </swc-action-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ActionGroup>(
      canvasElement,
      'swc-action-group'
    );

    await step(
      'does not warn for valid static-color values in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          for (const staticColor of ACTION_GROUP_STATIC_COLORS) {
            group.staticColor = staticColor;
            await group.updateComplete;
          }

          expect(warnCalls.length, 'no warnings for valid static-colors').toBe(
            0
          );
        })
    );
  },
};

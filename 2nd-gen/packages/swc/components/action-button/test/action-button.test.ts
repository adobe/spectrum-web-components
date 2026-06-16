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

import { ActionButton } from '@adobe/spectrum-wc/action-button';
import {
  ACTION_BUTTON_STATIC_COLORS,
  ACTION_BUTTON_VALID_SIZES,
} from '@spectrum-web-components/core/components/action-button';

import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  Accessibility,
  Anatomy,
  Overview,
  Quiet,
  Sizes,
  States,
} from '../stories/action-button.stories.js';

export default {
  ...meta,
  title: 'Action Button/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// ──────────────────────────────────────────────────────────────
// SECTION 1: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step('renders expected default property values', async () => {
      expect(button.quiet, 'quiet defaults to false').toBe(false);
      expect(
        button.staticColor,
        'staticColor defaults to undefined'
      ).toBeUndefined();
      expect(button.size, 'size defaults to m').toBe('m');
      expect(button.pending, 'pending defaults to false').toBe(false);
      expect(button.disabled, 'disabled defaults to false').toBe(false);
    });

    await step(
      'renders internal <button> as semantic control in shadow root',
      async () => {
        const internalButton = button.renderRoot.querySelector('button');
        expect(
          internalButton,
          'internal <button> exists in shadow root'
        ).toBeTruthy();
      }
    );

    await step('excludes role attribute from host element', async () => {
      expect(
        button.getAttribute('role'),
        'host has no role attribute'
      ).toBeNull();
    });

    await step(
      'omits aria-pressed from internal button — toggle semantics belong on swc-toggle-button',
      async () => {
        const internalButton = button.renderRoot.querySelector('button');
        expect(
          internalButton?.getAttribute('aria-pressed'),
          'internal button has no aria-pressed'
        ).toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 2: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step(
      'reflects each valid size to attribute after mutation — including xs',
      async () => {
        for (const size of ACTION_BUTTON_VALID_SIZES) {
          button.size = size;
          await button.updateComplete;
          expect(
            button.getAttribute('size'),
            `size="${size}" reflects after mutation`
          ).toBe(size);
          expect(button.size, `size property equals "${size}"`).toBe(size);
        }
      }
    );

    await step(
      'reflects quiet to and from attribute after mutation',
      async () => {
        button.quiet = true;
        await button.updateComplete;
        expect(
          button.hasAttribute('quiet'),
          'quiet=true adds attribute to host'
        ).toBe(true);

        button.quiet = false;
        await button.updateComplete;
        expect(
          button.hasAttribute('quiet'),
          'quiet=false removes attribute from host'
        ).toBe(false);
      }
    );

    await step(
      'reflects each valid static-color to attribute after mutation',
      async () => {
        for (const color of ACTION_BUTTON_STATIC_COLORS) {
          button.staticColor = color;
          await button.updateComplete;
          expect(
            button.getAttribute('static-color'),
            `static-color="${color}" reflects after mutation`
          ).toBe(color);
        }

        button.staticColor = undefined;
        await button.updateComplete;
        expect(
          button.hasAttribute('static-color'),
          'static-color attribute removed when property is undefined'
        ).toBe(false);
      }
    );
  },
};

export const AccessibleLabelTest: Story = {
  render: () => html`
    <swc-action-button>Format</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );
    const internalButton = button.renderRoot.querySelector('button');

    await step(
      'omits aria-label from internal button when accessible-label is not set',
      async () => {
        expect(
          internalButton?.getAttribute('aria-label'),
          'no aria-label without accessibleLabel'
        ).toBeNull();
      }
    );

    await step(
      'forwards accessible-label as aria-label on internal button after mutation',
      async () => {
        button.accessibleLabel = 'Format document';
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label matches new accessibleLabel'
        ).toBe('Format document');
      }
    );

    await step(
      'clears aria-label from internal button when accessible-label is removed',
      async () => {
        button.accessibleLabel = undefined;
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label removed after clearing accessibleLabel'
        ).toBeNull();
      }
    );
  },
};

export const PendingAriaAttributesTest: Story = {
  render: () => html`
    <swc-action-button>Format</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );
    const internalButton = button.renderRoot.querySelector('button');

    await step(
      'omits aria-disabled from internal button in default state',
      async () => {
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'aria-disabled absent in default state'
        ).toBeNull();
      }
    );

    await step(
      'sets aria-disabled and derived busy name when pending becomes true',
      async () => {
        button.pending = true;
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'aria-disabled set to true when pending'
        ).toBe('true');
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label set to derived busy name'
        ).toBe('Format, busy');
      }
    );

    await step(
      'removes aria-disabled and aria-label when pending becomes false',
      async () => {
        button.pending = false;
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'aria-disabled cleared when pending ends'
        ).toBeNull();
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label cleared when pending ends'
        ).toBeNull();
      }
    );

    await step(
      'uses explicit pending-label as aria-label when provided',
      async () => {
        button.pendingLabel = 'Formatting your document';
        button.pending = true;
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'explicit pendingLabel overrides derived busy name'
        ).toBe('Formatting your document');
      }
    );
  },
};

export const AriaPassthroughTest: Story = {
  render: () => html`
    <swc-action-button>Open menu</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );
    const internalButton = button.renderRoot.querySelector('button');

    await step(
      'strips aria-haspopup from host and forwards it to internal button',
      async () => {
        button.setAttribute('aria-haspopup', 'menu');
        await button.updateComplete;
        expect(
          button.getAttribute('aria-haspopup'),
          'aria-haspopup is stripped from host'
        ).toBeNull();
        expect(
          internalButton?.getAttribute('aria-haspopup'),
          'aria-haspopup is forwarded to internal button'
        ).toBe('menu');
      }
    );

    await step(
      'updates forwarded aria-haspopup when value changes',
      async () => {
        // The attribute is already stripped from the host after the previous
        // step; re-setting it triggers a fresh forward with the new value.
        button.setAttribute('aria-haspopup', 'dialog');
        await button.updateComplete;
        expect(
          button.getAttribute('aria-haspopup'),
          'aria-haspopup is stripped from host after update'
        ).toBeNull();
        expect(
          internalButton?.getAttribute('aria-haspopup'),
          'forwarded aria-haspopup updated to dialog'
        ).toBe('dialog');
      }
    );

    await step(
      'strips aria-expanded from host and forwards it to internal button',
      async () => {
        button.setAttribute('aria-expanded', 'false');
        await button.updateComplete;
        expect(
          button.getAttribute('aria-expanded'),
          'aria-expanded is stripped from host'
        ).toBeNull();
        expect(
          internalButton?.getAttribute('aria-expanded'),
          'aria-expanded is forwarded to internal button'
        ).toBe('false');
      }
    );

    await step(
      'updates forwarded aria-expanded when value changes',
      async () => {
        button.setAttribute('aria-expanded', 'true');
        await button.updateComplete;
        expect(
          button.getAttribute('aria-expanded'),
          'aria-expanded is stripped from host after update'
        ).toBeNull();
        expect(
          internalButton?.getAttribute('aria-expanded'),
          'forwarded aria-expanded updated to true'
        ).toBe('true');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 3: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step(
      'renders label-only button with visible text content',
      async () => {
        const labelOnly = buttons[0];
        expect(labelOnly, 'label-only button is rendered').toBeTruthy();
        expect(
          labelOnly.textContent?.trim(),
          'label-only button has non-empty text'
        ).toBeTruthy();
      }
    );

    await step('renders icon-and-label button with slotted icon', async () => {
      const withIcon = buttons.find((b) => b.querySelector('[slot="icon"]'));
      expect(withIcon, 'icon+label button is rendered').toBeTruthy();
      const slottedIcon = withIcon?.querySelector('[slot="icon"]');
      expect(slottedIcon, 'icon slot is populated').toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 4: Variants / States
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('renders all valid sizes including xs', async () => {
      for (const size of ACTION_BUTTON_VALID_SIZES) {
        const button = canvasElement.querySelector(
          `swc-action-button[size="${size}"]`
        ) as ActionButton;
        await button.updateComplete;
        expect(button.size, `size="${size}" is reflected`).toBe(size);
      }
    });
  },
};

export const QuietTest: Story = {
  ...Quiet,
  play: async ({ canvasElement, step }) => {
    await step(
      'renders default and quiet variants with correct quiet attribute state',
      async () => {
        const buttons = await getComponents<ActionButton>(
          canvasElement,
          'swc-action-button'
        );
        const [defaultButton, quietButton] = buttons;

        expect(defaultButton.quiet, 'default button quiet is false').toBe(
          false
        );
        expect(
          defaultButton.hasAttribute('quiet'),
          'default button has no quiet attribute'
        ).toBe(false);

        expect(quietButton.quiet, 'quiet button quiet is true').toBe(true);
        expect(
          quietButton.hasAttribute('quiet'),
          'quiet button has quiet attribute'
        ).toBe(true);
      }
    );
  },
};

export const StaticColorsTest: Story = {
  render: () => html`
    ${ACTION_BUTTON_STATIC_COLORS.map(
      (color) => html`
        <swc-action-button static-color=${color}>Label</swc-action-button>
      `
    )}
  `,
  parameters: { staticColorsDemo: true },
  play: async ({ canvasElement, step }) => {
    await step(
      'reflects static-color attribute for each valid value',
      async () => {
        for (const color of ACTION_BUTTON_STATIC_COLORS) {
          const button = canvasElement.querySelector(
            `swc-action-button[static-color="${color}"]`
          ) as ActionButton;
          await button.updateComplete;
          expect(
            button.staticColor,
            `staticColor="${color}" is reflected`
          ).toBe(color);
        }
      }
    );
  },
};

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<ActionButton>(
      canvasElement,
      'swc-action-button'
    );
    const [defaultButton, disabledButton, pendingButton] = buttons;

    await step(
      'verifies default button is neither disabled nor pending',
      async () => {
        expect(defaultButton.disabled, 'default button disabled is false').toBe(
          false
        );
        expect(defaultButton.pending, 'default button pending is false').toBe(
          false
        );
        const internalButton = defaultButton.renderRoot.querySelector('button');
        expect(
          internalButton?.hasAttribute('disabled'),
          'internal button has no native disabled'
        ).toBe(false);
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'internal button has no aria-disabled'
        ).toBeNull();
      }
    );

    await step(
      'verifies disabled button uses native disabled on internal button',
      async () => {
        expect(disabledButton.disabled, 'disabled prop is true').toBe(true);
        const internalButton =
          disabledButton.renderRoot.querySelector('button');
        expect(
          internalButton?.hasAttribute('disabled'),
          'native disabled is set on internal button'
        ).toBe(true);
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'disabled does not add aria-disabled'
        ).toBeNull();
      }
    );

    await step(
      'verifies pending button uses aria-disabled, not native disabled',
      async () => {
        expect(pendingButton.pending, 'pending prop is true').toBe(true);
        const internalButton = pendingButton.renderRoot.querySelector('button');
        expect(
          internalButton?.hasAttribute('disabled'),
          'pending does not set native disabled'
        ).toBe(false);
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'pending sets aria-disabled=true'
        ).toBe('true');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 5: Behaviors
// ──────────────────────────────────────────────────────────────

export const DisabledBehaviorTest: Story = {
  render: () => html`
    <swc-action-button disabled>Format</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step(
      'prevents focus delegation to internal button when disabled',
      async () => {
        button.focus();
        const activeElement = (button.renderRoot as ShadowRoot).activeElement;
        expect(
          activeElement,
          'focus not delegated to internal <button disabled>'
        ).toBeNull();
      }
    );
  },
};

export const PendingBehaviorTest: Story = {
  render: () => html`
    <swc-action-button pending>Format</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step('suppresses click events while pending is true', async () => {
      let clickCount = 0;
      const listener = () => {
        clickCount++;
      };
      button.addEventListener('click', listener);
      button.click();
      await button.updateComplete;
      button.removeEventListener('click', listener);
      expect(clickCount, 'click is suppressed while pending').toBe(0);
    });

    await step('allows click events after pending is cleared', async () => {
      button.pending = false;
      await button.updateComplete;

      let clickCount = 0;
      const listener = () => {
        clickCount++;
      };
      button.addEventListener('click', listener);
      button.click();
      await button.updateComplete;
      button.removeEventListener('click', listener);
      expect(clickCount, 'click fires normally after pending is cleared').toBe(
        1
      );
    });
  },
};

export const IconOnlyAriaTest: Story = {
  render: () => html`
    <swc-action-button accessible-label="Edit" pending>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-1.717 0L23 5.516 30.485 13l3.082-3.083a1.215 1.215 0 0 0 0-1.717zM21.586 7l-3.805 3.805 7.414 7.415 3.805-3.805zM3 29.788V37h7.212L23.414 23.8l-7.414-7.415zM6 32v-1.591l9.914-9.914 1.591 1.591L7.591 32z"
        />
      </svg>
    </swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );
    const internalButton = button.renderRoot.querySelector('button');

    await step(
      'derives pending accessible name from accessibleLabel when icon-only',
      async () => {
        expect(
          internalButton?.getAttribute('aria-label'),
          'pending name is derived from accessibleLabel with busy suffix'
        ).toBe('Edit, busy');
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'aria-disabled is set to true while pending'
        ).toBe('true');
      }
    );
  },
};

export const HostListenersTest: Story = {
  render: () => html`
    <swc-action-button>Focus me</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step(
      'routes programmatic focus to internal button via delegatesFocus',
      async () => {
        button.focus();
        const activeElement = (button.renderRoot as ShadowRoot).activeElement;
        expect(
          activeElement?.tagName.toLowerCase(),
          'delegatesFocus routes focus to internal <button>'
        ).toBe('button');
      }
    );
  },
};

export const AccessibilityTest: Story = {
  ...Accessibility,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<ActionButton>(
      canvasElement,
      'swc-action-button'
    );
    const [labeledButton, iconOnlyButton, pendingButton] = buttons;

    await step(
      'verifies labeled button internal control has no aria-label override',
      async () => {
        const internal = labeledButton.renderRoot.querySelector('button');
        expect(
          internal?.getAttribute('aria-label'),
          'labeled button has no aria-label on internal control'
        ).toBeNull();
      }
    );

    await step(
      'verifies icon-only button forwards accessible-label to internal button',
      async () => {
        const internal = iconOnlyButton.renderRoot.querySelector('button');
        expect(
          internal?.getAttribute('aria-label'),
          'icon-only button aria-label is forwarded'
        ).toBe('Edit');
      }
    );

    await step(
      'verifies pending button has aria-disabled and explicit pending-label',
      async () => {
        const internal = pendingButton.renderRoot.querySelector('button');
        expect(
          internal?.getAttribute('aria-disabled'),
          'pending button has aria-disabled=true'
        ).toBe('true');
        expect(
          internal?.getAttribute('aria-label'),
          'pending button uses explicit pending-label'
        ).toBe('Upload in-progress');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 6: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const IconOnlyMissingLabelWarningTest: Story = {
  render: () => html`
    <swc-action-button>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-1.717 0L23 5.516 30.485 13l3.082-3.083a1.215 1.215 0 0 0 0-1.717zM21.586 7l-3.805 3.805 7.414 7.415 3.805-3.805zM3 29.788V37h7.212L23.414 23.8l-7.414-7.415zM6 32v-1.591l9.914-9.914 1.591 1.591L7.591 32z"
        />
      </svg>
    </swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step('warns when icon-only button is missing accessible-label', () =>
      withWarningSpy(async (warnCalls) => {
        button.requestUpdate();
        await button.updateComplete;

        expect(
          warnCalls.length,
          'warning emitted for icon-only button without accessible-label'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message mentions accessible-label'
        ).toContain('accessible-label');
      })
    );
  },
};

export const PendingAndDisabledWarningTest: Story = {
  render: () => html`
    <swc-action-button pending disabled>Format</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step(
      'warns when both pending and disabled are set simultaneously',
      () =>
        withWarningSpy(async (warnCalls) => {
          button.requestUpdate();
          await button.updateComplete;

          expect(
            warnCalls.length,
            'warning emitted for pending+disabled combination'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message mentions pending'
          ).toContain('pending');
        })
    );
  },
};

export const IconOnlyWithLabelNoWarningTest: Story = {
  render: () => html`
    <swc-action-button accessible-label="Edit">
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M33.567 8.2L27.8 2.432a1.215 1.215 0 0 0-1.717 0L23 5.516 30.485 13l3.082-3.083a1.215 1.215 0 0 0 0-1.717zM21.586 7l-3.805 3.805 7.414 7.415 3.805-3.805zM3 29.788V37h7.212L23.414 23.8l-7.414-7.415zM6 32v-1.591l9.914-9.914 1.591 1.591L7.591 32z"
        />
      </svg>
    </swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step(
      'emits no warnings when icon-only button has an accessible-label',
      () =>
        withWarningSpy(async (warnCalls) => {
          button.requestUpdate();
          await button.updateComplete;

          expect(
            warnCalls.length,
            'no warning emitted when accessible-label is present'
          ).toBe(0);
        })
    );
  },
};

export const PendingAloneNoWarningTest: Story = {
  render: () => html`
    <swc-action-button pending>Format</swc-action-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<ActionButton>(
      canvasElement,
      'swc-action-button'
    );

    await step('emits no warnings when pending is set without disabled', () =>
      withWarningSpy(async (warnCalls) => {
        button.requestUpdate();
        await button.updateComplete;

        expect(
          warnCalls.length,
          'no warning emitted for pending without disabled'
        ).toBe(0);
      })
    );
  },
};

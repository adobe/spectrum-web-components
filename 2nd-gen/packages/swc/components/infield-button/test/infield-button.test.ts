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

import { InfieldButton } from '@adobe/spectrum-wc/infield-button';
import { INFIELD_BUTTON_VALID_SIZES } from '@adobe/spectrum-wc-core/components/infield-button';

import '@adobe/spectrum-wc/components/infield-button/swc-infield-button.js';

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
} from '../stories/infield-button.stories.js';

export default {
  ...meta,
  title: 'Infield Button/Tests',
  parameters: {
    ...meta.parameters,
    docs: { disable: true, page: null },
  },
  tags: ['!autodocs', 'dev'],
} as Meta;

// Shared inline chevron SVG used in tests that need a slotted icon.
const chevronSvg = `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-hidden="true" focusable="false"><path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z"/></svg>`;

// ──────────────────────────────────────────────────────────────
// SECTION 1: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
    );

    await step('renders expected default property values', async () => {
      expect(button.quiet, 'quiet defaults to false').toBe(false);
      expect(button.disabled, 'disabled defaults to false').toBe(false);
      expect(button.size, 'size is set to m from Overview story').toBe('m');
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

    await step(
      'sets type="button" on inner button to prevent form submission',
      async () => {
        const internalButton = button.renderRoot.querySelector('button');
        expect(
          internalButton?.getAttribute('type'),
          'inner button has type="button"'
        ).toBe('button');
      }
    );

    await step(
      'sets tabindex="-1" on inner button — button is pointer-only, not in tab order',
      async () => {
        const internalButton = button.renderRoot.querySelector('button');
        expect(
          internalButton?.getAttribute('tabindex'),
          'inner button has tabindex="-1"'
        ).toBe('-1');
      }
    );

    await step('excludes role attribute from host element', async () => {
      expect(
        button.getAttribute('role'),
        'host has no role attribute'
      ).toBeNull();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 2: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
    );

    await step(
      'reflects each valid size to attribute after mutation',
      async () => {
        for (const size of INFIELD_BUTTON_VALID_SIZES) {
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
      'reflects disabled to and from attribute after mutation',
      async () => {
        button.disabled = true;
        await button.updateComplete;
        expect(
          button.hasAttribute('disabled'),
          'disabled=true adds attribute to host'
        ).toBe(true);

        button.disabled = false;
        await button.updateComplete;
        expect(
          button.hasAttribute('disabled'),
          'disabled=false removes attribute from host'
        ).toBe(false);
      }
    );
  },
};

export const AccessibleLabelTest: Story = {
  render: () => html`
    <swc-infield-button>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z" />
      </svg>
    </swc-infield-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
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
        button.accessibleLabel = 'Clear search';
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label matches new accessibleLabel'
        ).toBe('Clear search');
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

// ──────────────────────────────────────────────────────────────
// SECTION 3: Slots
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<InfieldButton>(
      canvasElement,
      'swc-infield-button'
    );

    await step('renders all four Anatomy buttons', async () => {
      expect(buttons.length, 'four Anatomy buttons are rendered').toBe(4);
    });

    await step('each Anatomy button has a slotted icon element', async () => {
      for (const btn of buttons) {
        const slottedIcon = btn.querySelector('[slot="icon"]');
        expect(
          slottedIcon,
          `${btn.getAttribute('accessible-label') ?? 'button'} has a slotted icon`
        ).toBeTruthy();
      }
    });

    await step(
      'each Anatomy button has an aria-label on its inner button',
      async () => {
        for (const btn of buttons) {
          await btn.updateComplete;
          const internalButton = btn.renderRoot.querySelector('button');
          expect(
            internalButton?.getAttribute('aria-label'),
            `${btn.getAttribute('accessible-label') ?? 'button'} inner button has aria-label`
          ).toBeTruthy();
        }
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 4: Variants / States
// ──────────────────────────────────────────────────────────────

export const SizesTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('renders all valid sizes', async () => {
      for (const size of INFIELD_BUTTON_VALID_SIZES) {
        const button = await getComponent<InfieldButton>(
          canvasElement,
          `swc-infield-button[size="${size}"]`
        );
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
        const buttons = await getComponents<InfieldButton>(
          canvasElement,
          'swc-infield-button'
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

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const defaultButton = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button:not([disabled]):not([quiet])'
    );
    const disabledButton = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button[disabled]:not([quiet])'
    );

    await step(
      'verifies default button is neither disabled nor quiet',
      async () => {
        expect(defaultButton.disabled, 'default button disabled is false').toBe(
          false
        );
        expect(defaultButton.quiet, 'default button quiet is false').toBe(
          false
        );
        const internalButton = defaultButton.renderRoot.querySelector('button');
        expect(
          internalButton?.hasAttribute('disabled'),
          'default inner button has no native disabled'
        ).toBe(false);
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
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 5: Behaviors
// ──────────────────────────────────────────────────────────────

export const DisabledBehaviorTest: Story = {
  render: () => html`
    <swc-infield-button
      disabled
      accessible-label="Clear"
      .innerHTML=${chevronSvg}
    ></swc-infield-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
    );

    await step('suppresses click events while disabled', async () => {
      let clickCount = 0;
      const listener = () => {
        clickCount++;
      };
      button.addEventListener('click', listener);
      button.click();
      await button.updateComplete;
      button.removeEventListener('click', listener);
      expect(clickCount, 'click is suppressed while disabled').toBe(0);
    });
  },
};

export const ClickBehaviorTest: Story = {
  render: () => html`
    <swc-infield-button accessible-label="Clear">
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z" />
      </svg>
    </swc-infield-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
    );

    await step('allows click events when not disabled', async () => {
      let clickCount = 0;
      const listener = () => {
        clickCount++;
      };
      button.addEventListener('click', listener);
      button.click();
      await button.updateComplete;
      button.removeEventListener('click', listener);
      expect(clickCount, 'click fires normally when enabled').toBe(1);
    });
  },
};

export const FocusDelegationTest: Story = {
  render: () => html`
    <swc-infield-button accessible-label="Clear">
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z" />
      </svg>
    </swc-infield-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
    );

    await step(
      'does not delegate focus to inner button — infield buttons are pointer-only',
      async () => {
        button.focus();
        const activeElement = (button.renderRoot as ShadowRoot).activeElement;
        expect(
          activeElement,
          'delegatesFocus=false means inner button is not focused via host.focus()'
        ).toBeNull();
      }
    );
  },
};

export const AccessibilityTest: Story = {
  ...Accessibility,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
    );

    await step(
      'forwards accessible-label as aria-label on internal button',
      async () => {
        const internalButton = button.renderRoot.querySelector('button');
        expect(
          internalButton?.getAttribute('aria-label'),
          'accessible-label is forwarded to internal button as aria-label'
        ).toBe('Open picker');
      }
    );

    await step(
      'internal button has no aria-pressed or aria-expanded',
      async () => {
        const internalButton = button.renderRoot.querySelector('button');
        expect(
          internalButton?.getAttribute('aria-pressed'),
          'no aria-pressed on infield button'
        ).toBeNull();
        expect(
          internalButton?.getAttribute('aria-expanded'),
          'no aria-expanded on infield button by default'
        ).toBeNull();
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// SECTION 6: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const IconOnlyMissingLabelWarningTest: Story = {
  render: () => html`
    <swc-infield-button>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z" />
      </svg>
    </swc-infield-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
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

export const IconOnlyWithLabelNoWarningTest: Story = {
  render: () => html`
    <swc-infield-button accessible-label="Open picker">
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M5 7.376 1.281 3.656l.875-.875L5 5.625l2.844-2.844.875.875Z" />
      </svg>
    </swc-infield-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<InfieldButton>(
      canvasElement,
      'swc-infield-button'
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

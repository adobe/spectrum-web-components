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

import { Button } from '@adobe/spectrum-wc/button';
import {
  BUTTON_FILL_STYLES,
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/button';

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta, {
  Accessibility,
  Anatomy,
  Outline,
  Overview,
  Sizes,
  States,
  Variants,
} from '../stories/button.stories.js';

export default {
  ...meta,
  title: 'Button/Tests',
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
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('renders expected default property values', async () => {
      expect(button.variant, 'variant defaults to primary').toBe('primary');
      expect(button.fillStyle, 'fillStyle defaults to fill').toBe('fill');
      expect(button.size, 'size defaults to m').toBe('m');
      expect(button.pending, 'pending defaults to false').toBe(false);
      expect(button.disabled, 'disabled defaults to false').toBe(false);
      expect(button.truncate, 'truncate defaults to false').toBe(false);
      expect(button.justified, 'justified defaults to false').toBe(false);
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
      'reflects variant to host attribute on initial render',
      async () => {
        expect(
          button.getAttribute('variant'),
          'variant attribute reflects to host'
        ).toBe('primary');
      }
    );

    await step(
      'reflects fill-style to host attribute on initial render',
      async () => {
        expect(
          button.getAttribute('fill-style'),
          'fill-style attribute reflects to host'
        ).toBe('fill');
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
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step(
      'reflects each valid variant to attribute after mutation',
      async () => {
        for (const variant of BUTTON_VARIANTS) {
          button.variant = variant;
          await button.updateComplete;
          expect(
            button.getAttribute('variant'),
            `variant="${variant}" reflects after mutation`
          ).toBe(variant);
        }
      }
    );

    await step(
      'reflects each valid fill-style to attribute after mutation',
      async () => {
        for (const style of BUTTON_FILL_STYLES) {
          button.fillStyle = style;
          await button.updateComplete;
          expect(
            button.getAttribute('fill-style'),
            `fill-style="${style}" reflects after mutation`
          ).toBe(style);
        }
      }
    );

    await step(
      'reflects each valid size to attribute after mutation',
      async () => {
        for (const size of BUTTON_VALID_SIZES) {
          button.size = size;
          await button.updateComplete;
          expect(
            button.getAttribute('size'),
            `size="${size}" reflects after mutation`
          ).toBe(size);
        }
      }
    );

    await step(
      'reflects truncate to and from attribute after mutation',
      async () => {
        button.truncate = true;
        await button.updateComplete;
        expect(
          button.hasAttribute('truncate'),
          'truncate=true adds attribute to host'
        ).toBe(true);

        button.truncate = false;
        await button.updateComplete;
        expect(
          button.hasAttribute('truncate'),
          'truncate=false removes attribute from host'
        ).toBe(false);
      }
    );

    await step(
      'reflects justified to and from attribute after mutation',
      async () => {
        button.justified = true;
        await button.updateComplete;
        expect(
          button.hasAttribute('justified'),
          'justified=true adds attribute to host'
        ).toBe(true);

        button.justified = false;
        await button.updateComplete;
        expect(
          button.hasAttribute('justified'),
          'justified=false removes attribute from host'
        ).toBe(false);
      }
    );
  },
};

export const AccessibleLabelTest: Story = {
  render: () => html`
    <swc-button>Save</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');
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
        button.accessibleLabel = 'Save document';
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label matches new accessibleLabel'
        ).toBe('Save document');
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
    <swc-button>Save</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');
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
        ).toBe('Save, busy');
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
        button.pendingLabel = 'Processing your request';
        button.pending = true;
        await button.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'explicit pendingLabel overrides derived busy name'
        ).toBe('Processing your request');
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
    const buttons = await getComponents<Button>(canvasElement, 'swc-button');

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

    await step(
      'renders icon-only button with accessible-label forwarded to internal control',
      async () => {
        const iconOnly = buttons.find((b) =>
          b.hasAttribute('accessible-label')
        );
        expect(iconOnly, 'icon-only button is rendered').toBeTruthy();
        expect(
          iconOnly?.getAttribute('accessible-label'),
          'accessible-label is set on host'
        ).toBeTruthy();

        const internalButton = iconOnly?.renderRoot.querySelector('button');
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label forwarded to internal button'
        ).toBeTruthy();
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
      for (const size of BUTTON_VALID_SIZES) {
        const button = canvasElement.querySelector(
          `swc-button[size="${size}"]`
        ) as Button;
        await button.updateComplete;
        expect(button.size, `size="${size}" is reflected`).toBe(size);
      }
    });
  },
};

export const VariantsTest: Story = {
  ...Variants,
  play: async ({ canvasElement, step }) => {
    await step('renders all valid variants', async () => {
      for (const variant of BUTTON_VARIANTS) {
        const button = canvasElement.querySelector(
          `swc-button[variant="${variant}"]`
        ) as Button;
        await button.updateComplete;
        expect(button.variant, `variant="${variant}" is reflected`).toBe(
          variant
        );
      }
    });
  },
};

export const OutlineTest: Story = {
  ...Outline,
  play: async ({ canvasElement, step }) => {
    await step(
      'reflects fill-style="outline" on primary and secondary variants',
      async () => {
        for (const variant of ['primary', 'secondary']) {
          const button = canvasElement.querySelector(
            `swc-button[fill-style="outline"][variant="${variant}"]`
          ) as Button;
          await button.updateComplete;
          expect(button.fillStyle, `fillStyle is outline for ${variant}`).toBe(
            'outline'
          );
          expect(button.variant, `variant="${variant}" is reflected`).toBe(
            variant
          );
        }
      }
    );
  },
};

export const StaticColorsTest: Story = {
  render: () => html`
    ${BUTTON_STATIC_COLORS.map(
      (color) => html`
        <swc-button static-color=${color} variant="primary">Label</swc-button>
      `
    )}
  `,
  parameters: {
    staticColorsDemo: true,
  },
  play: async ({ canvasElement, step }) => {
    await step(
      'reflects static-color attribute for each valid value',
      async () => {
        for (const color of BUTTON_STATIC_COLORS) {
          const button = canvasElement.querySelector(
            `swc-button[static-color="${color}"]`
          ) as Button;
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
    const buttons = await getComponents<Button>(canvasElement, 'swc-button');
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

export const DisabledBehaviorTest: Story = {
  render: () => html`
    <swc-button disabled>Save</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

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

export const IconOnlyPendingAriaTest: Story = {
  render: () => html`
    <swc-button accessible-label="Add item" pending>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"
        />
      </svg>
    </swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');
    const internalButton = button.renderRoot.querySelector('button');

    await step(
      'derives pending accessible name from accessibleLabel when icon-only',
      async () => {
        expect(
          internalButton?.getAttribute('aria-label'),
          'pending name is derived from accessibleLabel with busy suffix'
        ).toBe('Add item, busy');
        expect(
          internalButton?.getAttribute('aria-disabled'),
          'aria-disabled is set to true while pending'
        ).toBe('true');
      }
    );
  },
};

export const PendingBehaviorTest: Story = {
  render: () => html`
    <swc-button pending>Save</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

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

export const AccessibilityTest: Story = {
  ...Accessibility,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<Button>(canvasElement, 'swc-button');
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
        ).toBe('Add item');
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

export const HostListenersTest: Story = {
  render: () => html`
    <swc-button>Focus me</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

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

// ──────────────────────────────────────────────────────────────
// SECTION 5: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidVariantWarningTest: Story = {
  render: () => html`
    <swc-button>Label</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('warns when an invalid variant is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        button.variant = 'not-a-variant' as Button['variant'];
        await button.updateComplete;

        expect(
          warnCalls.length,
          'warning is emitted for invalid variant'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message mentions variant'
        ).toContain('variant');
      })
    );
  },
};

export const ValidVariantNoWarningTest: Story = {
  render: () => html`
    <swc-button>Label</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('emits no warnings when each valid variant is set', () =>
      withWarningSpy(async (warnCalls) => {
        for (const variant of BUTTON_VARIANTS) {
          button.variant = variant;
          await button.updateComplete;
        }
        expect(warnCalls.length, 'no warnings emitted for valid variants').toBe(
          0
        );
      })
    );
  },
};

export const InvalidFillStyleWarningTest: Story = {
  render: () => html`
    <swc-button>Label</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('warns when an invalid fill-style is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        button.fillStyle = 'not-a-style' as Button['fillStyle'];
        await button.updateComplete;

        expect(
          warnCalls.length,
          'warning is emitted for invalid fill-style'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message mentions fill-style'
        ).toContain('fill-style');
      })
    );
  },
};

export const OutlineUnsupportedVariantWarningTest: Story = {
  render: () => html`
    <swc-button fill-style="outline">Label</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step(
      'warns when outline fill-style is used with accent variant',
      () =>
        withWarningSpy(async (warnCalls) => {
          button.variant = 'accent';
          await button.updateComplete;

          expect(
            warnCalls.length,
            'warning emitted for accent+outline'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message mentions outline'
          ).toContain('outline');
        })
    );

    await step(
      'warns when outline fill-style is used with negative variant',
      () =>
        withWarningSpy(async (warnCalls) => {
          button.variant = 'negative';
          await button.updateComplete;

          expect(
            warnCalls.length,
            'warning emitted for negative+outline'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message mentions outline'
          ).toContain('outline');
        })
    );
  },
};

export const StaticColorUnsupportedVariantWarningTest: Story = {
  render: () => html`
    <swc-button static-color="white">Label</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('warns when static-color is used with accent variant', () =>
      withWarningSpy(async (warnCalls) => {
        button.variant = 'accent';
        await button.updateComplete;

        expect(
          warnCalls.length,
          'warning emitted for accent+static-color'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message mentions static-color'
        ).toContain('static-color');
      })
    );

    await step('warns when static-color is used with negative variant', () =>
      withWarningSpy(async (warnCalls) => {
        button.variant = 'negative';
        await button.updateComplete;

        expect(
          warnCalls.length,
          'warning emitted for negative+static-color'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message mentions static-color'
        ).toContain('static-color');
      })
    );
  },
};

export const PendingAndDisabledWarningTest: Story = {
  render: () => html`
    <swc-button pending disabled>Label</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

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

export const IconOnlyMissingLabelWarningTest: Story = {
  render: () => html`
    <swc-button>
      <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M31.5 17H19V4.5a1 1 0 0 0-2 0V17H4.5a1 1 0 0 0 0 2H17v12.5a1 1 0 0 0 2 0V19h12.5a1 1 0 0 0 0-2z"
        />
      </svg>
    </swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

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

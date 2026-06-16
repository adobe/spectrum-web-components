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

import { CloseButton } from '@adobe/spectrum-wc/components/close-button';
import {
  BUTTON_STATIC_COLORS,
  BUTTON_VALID_SIZES,
  ButtonBase,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/components/close-button/swc-close-button.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, {
  Accessibility,
  Overview,
  Sizes,
  States,
  StaticColors,
} from '../stories/close-button.stories.js';

export default {
  ...meta,
  title: 'Close Button/Tests',
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
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step('renders with default size and accessible name', async () => {
      expect(closeButton.size, 'default size is m').toBe('m');
      expect(
        closeButton.getAttribute('size'),
        'default size is reflected on the host'
      ).toBe('m');
      expect(
        closeButton.getAttribute('accessible-label'),
        'accessible-label is set from story args'
      ).toBe('Close');
      const button = closeButton.shadowRoot?.querySelector('button');
      expect(
        button?.getAttribute('aria-label'),
        'inner button exposes the accessible name'
      ).toBe('Close');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / attributes
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step('reflects size on the host', async () => {
      expect(
        closeButton.getAttribute('size'),
        'default size is reflected on the host'
      ).toBe('m');

      closeButton.size = 'l';
      await closeButton.updateComplete;
      expect(
        closeButton.getAttribute('size'),
        'size attribute is reflected'
      ).toBe('l');
    });

    await step('reflects static-color when set', async () => {
      closeButton.staticColor = 'white';
      await closeButton.updateComplete;
      expect(
        closeButton.getAttribute('static-color'),
        'static-color attribute is reflected'
      ).toBe('white');
    });

    await step('reflects disabled when set', async () => {
      closeButton.disabled = true;
      await closeButton.updateComplete;
      expect(
        closeButton.shadowRoot?.querySelector('button')?.disabled,
        'inner button is disabled'
      ).toBe(true);
    });
  },
};

export const AccessibleLabelMutationTest: Story = {
  render: () => html`
    <swc-close-button>Close</swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );
    const internalButton = closeButton.shadowRoot?.querySelector('button');

    await step(
      'uses slot text as aria-label when accessible-label is not set',
      async () => {
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label comes from slot text when accessible-label is unset'
        ).toBe('Close');
      }
    );

    await step(
      'forwards accessible-label as aria-label on internal button after mutation',
      async () => {
        closeButton.accessibleLabel = 'Close dialog';
        await closeButton.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label matches new accessibleLabel'
        ).toBe('Close dialog');
      }
    );

    await step(
      'prefers accessible-label over slot text when both are present',
      async () => {
        closeButton.accessibleLabel = 'Dismiss overlay';
        await closeButton.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'accessible-label takes precedence over slot text'
        ).toBe('Dismiss overlay');
      }
    );

    await step(
      'falls back to slot text when accessible-label is cleared',
      async () => {
        closeButton.accessibleLabel = undefined;
        await closeButton.updateComplete;
        expect(
          internalButton?.getAttribute('aria-label'),
          'aria-label matches slot text after clearing accessible-label'
        ).toBe('Close');
      }
    );
  },
};

export const SlotLabelAccessibleNameTest: Story = {
  render: () => html`
    <swc-close-button>Dismiss</swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step('uses slot text for the accessible name', async () => {
      await closeButton.updateComplete;
      const button = closeButton.shadowRoot?.querySelector('button');
      expect(
        button?.getAttribute('aria-label'),
        'inner button aria-label matches slot text'
      ).toBe('Dismiss');
    });
  },
};

export const AccessibleLabelPrecedenceTest: Story = {
  render: () => html`
    <swc-close-button accessible-label="Close dialog">Dismiss</swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step(
      'prefers accessible-label over slot text when both are set at render',
      async () => {
        await closeButton.updateComplete;
        const button = closeButton.shadowRoot?.querySelector('button');
        expect(
          button?.getAttribute('aria-label'),
          'accessible-label takes precedence over slot text at render'
        ).toBe('Close dialog');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessibility
// ──────────────────────────────────────────────────────────────

export const DelegatesFocusTest: Story = {
  render: () => html`
    <swc-close-button accessible-label="Close"></swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step(
      'routes programmatic focus to internal button via delegatesFocus',
      async () => {
        closeButton.focus();
        const activeElement = (closeButton.renderRoot as ShadowRoot)
          .activeElement;
        expect(
          activeElement?.tagName.toLowerCase(),
          'delegatesFocus routes focus to internal <button>'
        ).toBe('button');
      }
    );
  },
};

export const HostSemanticsTest: Story = {
  render: () => html`
    <swc-close-button accessible-label="Close"></swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step('host does not duplicate button role', async () => {
      expect(
        closeButton.getAttribute('role'),
        'host has no explicit role attribute'
      ).toBeNull();
      expect(
        closeButton.shadowRoot?.querySelector('button')?.tagName.toLowerCase(),
        'inner native button is the semantic control'
      ).toBe('button');
    });

    await step('cross icon is hidden from assistive technology', async () => {
      expect(
        closeButton.shadowRoot
          ?.querySelector('.swc-CloseButton-icon')
          ?.getAttribute('aria-hidden'),
        'icon wrapper is aria-hidden'
      ).toBe('true');
    });
  },
};

export const KeyboardActivationTest: Story = {
  render: () => html`
    <swc-close-button accessible-label="Close"></swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );
    const internalButton = closeButton.shadowRoot?.querySelector('button');

    await step('Enter activates the close button', async () => {
      let activated = false;
      closeButton.addEventListener('click', () => {
        activated = true;
      });

      internalButton?.focus();
      await userEvent.keyboard('{Enter}');

      expect(activated, 'Enter key activates the control').toBe(true);
    });

    await step('Space activates the close button', async () => {
      let activated = false;
      closeButton.addEventListener('click', () => {
        activated = true;
      });

      internalButton?.focus();
      await userEvent.keyboard(' ');

      expect(activated, 'Space key activates the control').toBe(true);
    });
  },
};

export const DisabledKeyboardTest: Story = {
  render: () => html`
    <swc-close-button disabled accessible-label="Close"></swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );
    const internalButton = closeButton.shadowRoot?.querySelector('button');

    await step('disabled close button does not activate on click', async () => {
      let activated = false;
      closeButton.addEventListener('click', () => {
        activated = true;
      });

      internalButton?.click();
      expect(activated, 'click is suppressed when disabled').toBe(false);
      expect(
        internalButton?.disabled,
        'inner button is natively disabled'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Story coverage
// ──────────────────────────────────────────────────────────────

export const SizesStoryTest: Story = {
  ...Sizes,
  play: async ({ canvasElement, step }) => {
    await step('renders all size variants', async () => {
      const closeButtons = canvasElement.querySelectorAll('swc-close-button');
      expect(closeButtons.length, 'one close button per size variant').toBe(
        BUTTON_VALID_SIZES.length
      );
    });
  },
};

export const StaticColorsStoryTest: Story = {
  ...StaticColors,
  play: async ({ canvasElement, step }) => {
    await step('renders static color variants', async () => {
      const closeButtons = canvasElement.querySelectorAll('swc-close-button');
      expect(
        closeButtons.length,
        'default and static color examples render'
      ).toBe(3);
    });
  },
};

export const AccessibilityStoryTest: Story = {
  ...Accessibility,
  play: async ({ canvasElement, step }) => {
    await step('renders accessibility examples', async () => {
      const closeButtons = canvasElement.querySelectorAll('swc-close-button');
      expect(
        closeButtons.length,
        'icon-only, slot label, dialog chrome, and disabled examples render'
      ).toBe(4);
    });
  },
};

export const StatesStoryTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    await step('renders default and disabled states', async () => {
      const closeButtons = canvasElement.querySelectorAll('swc-close-button');
      expect(closeButtons.length, 'default and disabled examples render').toBe(
        2
      );
      const disabledButton =
        closeButtons[1]?.shadowRoot?.querySelector('button');
      expect(
        disabledButton?.disabled,
        'disabled example is not interactive'
      ).toBe(true);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidStaticColorWarningTest: Story = {
  render: () => html`
    <swc-close-button accessible-label="Close"></swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step('warns when an invalid static-color is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        closeButton.staticColor =
          'not-a-color' as unknown as CloseButton['staticColor'];
        await closeButton.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning is emitted for invalid static-color'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning message references static-color attribute'
        ).toContain('static-color');
      })
    );
  },
};

export const MissingAccessibleLabelWarningTest: Story = {
  render: () => html`
    <swc-close-button></swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step(
      'warns when icon-only close button has no accessible name in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          closeButton.requestUpdate();
          await closeButton.updateComplete;

          expect(
            warnCalls.length,
            'at least one warning is emitted for missing accessible-label'
          ).toBeGreaterThan(0);
          expect(
            String(warnCalls[0]?.[1] || ''),
            'warning message references accessible-label'
          ).toContain('accessible-label');
        })
    );
  },
};

export const ValidStaticColorNoWarningTest: Story = {
  render: () => html`
    <swc-close-button accessible-label="Close"></swc-close-button>
  `,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step(
      'does not warn for any valid static-color value in DEBUG mode',
      () =>
        withWarningSpy(async (warnCalls) => {
          for (const color of BUTTON_STATIC_COLORS) {
            closeButton.staticColor = color;
            await closeButton.updateComplete;
          }

          expect(
            warnCalls.length,
            'no warnings are emitted for valid static-color values'
          ).toBe(0);
        })
    );
  },
};

export const ButtonBaseInstanceofTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const closeButton = await getComponent<CloseButton>(
      canvasElement,
      'swc-close-button'
    );

    await step('is a ButtonBase', async () => {
      expect(
        closeButton instanceof ButtonBase,
        'swc-close-button instanceof ButtonBase'
      ).toBe(true);
    });
  },
};

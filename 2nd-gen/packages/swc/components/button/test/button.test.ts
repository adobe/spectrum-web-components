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
  BUTTON_VALID_SIZES,
  BUTTON_VARIANTS,
} from '@spectrum-web-components/core/components/button';

import '@adobe/spectrum-wc/button';

import {
  getComponent,
  getComponents,
  withWarningSpy,
} from '../../../utils/test-utils.js';
import meta from '../stories/button.stories.js';
import {
  Accessibility,
  Anatomy,
  Overview,
  States,
} from '../stories/button.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
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
// TEST: Defaults
// ──────────────────────────────────────────────────────────────

export const OverviewTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('renders expected default values', async () => {
      expect(button.variant).toBe('primary');
      expect(button.fillStyle).toBe('fill');
      expect(button.size).toBe('m');
      expect(button.pending).toBe(false);
      expect(button.disabled).toBe(false);
    });

    await step('internal <button> is the semantic control', async () => {
      const internalButton = button.renderRoot.querySelector('button');
      expect(internalButton).toBeTruthy();
    });

    await step('host does not carry a button role', async () => {
      expect(button.getAttribute('role')).toBeNull();
    });

    await step('variant reflects to attribute', async () => {
      expect(button.getAttribute('variant')).toBe('primary');
    });

    await step('fill-style reflects to attribute', async () => {
      expect(button.getAttribute('fill-style')).toBe('fill');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Property Mutations
// ──────────────────────────────────────────────────────────────

export const PropertyMutationTest: Story = {
  ...Overview,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('variant reflects to attribute after mutation', async () => {
      for (const variant of BUTTON_VARIANTS) {
        button.variant = variant;
        await button.updateComplete;
        expect(button.getAttribute('variant')).toBe(variant);
      }
    });

    await step('fill-style reflects to attribute after mutation', async () => {
      for (const style of BUTTON_FILL_STYLES) {
        button.fillStyle = style;
        await button.updateComplete;
        expect(button.getAttribute('fill-style')).toBe(style);
      }
    });

    await step('size reflects to attribute after mutation', async () => {
      for (const size of BUTTON_VALID_SIZES) {
        button.size = size;
        await button.updateComplete;
        expect(button.getAttribute('size')).toBe(size);
      }
    });

    await step('truncate reflects to attribute after mutation', async () => {
      button.truncate = true;
      await button.updateComplete;
      expect(button.hasAttribute('truncate')).toBe(true);

      button.truncate = false;
      await button.updateComplete;
      expect(button.hasAttribute('truncate')).toBe(false);
    });

    await step('justified reflects to attribute after mutation', async () => {
      button.justified = true;
      await button.updateComplete;
      expect(button.hasAttribute('justified')).toBe(true);

      button.justified = false;
      await button.updateComplete;
      expect(button.hasAttribute('justified')).toBe(false);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots / Anatomy
// ──────────────────────────────────────────────────────────────

export const AnatomyTest: Story = {
  ...Anatomy,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<Button>(canvasElement, 'swc-button');

    await step('renders label-only button', async () => {
      const labelOnly = buttons[0];
      expect(labelOnly).toBeTruthy();
      expect(labelOnly.textContent?.trim()).toBeTruthy();
    });

    await step('renders icon-and-label button', async () => {
      const withIcon = buttons.find((b) => b.querySelector('[slot="icon"]'));
      expect(withIcon).toBeTruthy();
      const slottedIcon = withIcon?.querySelector('[slot="icon"]');
      expect(slottedIcon).toBeTruthy();
    });

    await step('renders icon-only button with accessible-label', async () => {
      const iconOnly = buttons.find((b) => b.hasAttribute('accessible-label'));
      expect(iconOnly).toBeTruthy();
      expect(iconOnly?.getAttribute('accessible-label')).toBeTruthy();

      const internalButton = iconOnly?.renderRoot.querySelector('button');
      expect(internalButton?.getAttribute('aria-label')).toBeTruthy();
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: States
// ──────────────────────────────────────────────────────────────

export const StatesTest: Story = {
  ...States,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<Button>(canvasElement, 'swc-button');
    const [defaultButton, disabledButton, pendingButton] = buttons;

    await step('default button is not disabled or pending', async () => {
      expect(defaultButton.disabled).toBe(false);
      expect(defaultButton.pending).toBe(false);
      const internalButton = defaultButton.renderRoot.querySelector('button');
      expect(internalButton?.hasAttribute('disabled')).toBe(false);
      expect(internalButton?.getAttribute('aria-disabled')).toBeNull();
    });

    await step(
      'disabled button uses native disabled on internal button',
      async () => {
        expect(disabledButton.disabled).toBe(true);
        const internalButton =
          disabledButton.renderRoot.querySelector('button');
        expect(internalButton?.hasAttribute('disabled')).toBe(true);
        expect(internalButton?.getAttribute('aria-disabled')).toBeNull();
      }
    );

    await step(
      'pending button uses aria-disabled, not native disabled',
      async () => {
        expect(pendingButton.pending).toBe(true);
        const internalButton = pendingButton.renderRoot.querySelector('button');
        expect(internalButton?.hasAttribute('disabled')).toBe(false);
        expect(internalButton?.getAttribute('aria-disabled')).toBe('true');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Pending state behavior (SWC-459)
// ──────────────────────────────────────────────────────────────

export const PendingAriaTest: Story = {
  render: () => html`
    <swc-button pending>Save</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');
    const internalButton = button.renderRoot.querySelector('button');

    await step(
      'internal button has aria-disabled="true" when pending',
      async () => {
        expect(internalButton?.getAttribute('aria-disabled')).toBe('true');
      }
    );

    await step(
      'internal button is not natively disabled when pending',
      async () => {
        expect(internalButton?.hasAttribute('disabled')).toBe(false);
      }
    );

    await step(
      'accessible name includes busy suffix when pending',
      async () => {
        expect(internalButton?.getAttribute('aria-label')).toBe('Save, busy');
      }
    );
  },
};

export const PendingLabelOverrideTest: Story = {
  render: () => html`
    <swc-button pending pending-label="Uploading your document, please wait">
      Save
    </swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');
    const internalButton = button.renderRoot.querySelector('button');

    await step('pending-label overrides derived busy name', async () => {
      expect(internalButton?.getAttribute('aria-label')).toBe(
        'Uploading your document, please wait'
      );
    });
  },
};

export const PendingClickSuppressedTest: Story = {
  render: () => html`
    <swc-button pending>Save</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('click events are suppressed while pending', async () => {
      let clickCount = 0;
      const listener = () => {
        clickCount++;
      };
      button.addEventListener('click', listener);
      button.click();
      await button.updateComplete;
      button.removeEventListener('click', listener);
      expect(clickCount).toBe(0);
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Accessible name / Icon-only (SWC-1333)
// ──────────────────────────────────────────────────────────────

export const AccessibleLabelForwardedTest: Story = {
  render: () => html`
    <swc-button accessible-label="Add item">
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
      'accessible-label is forwarded as aria-label on internal button',
      async () => {
        expect(internalButton?.getAttribute('aria-label')).toBe('Add item');
      }
    );

    await step('host does not carry aria-label itself', async () => {
      expect(button.getAttribute('aria-label')).toBeNull();
    });
  },
};

export const AccessibilityTest: Story = {
  ...Accessibility,
  play: async ({ canvasElement, step }) => {
    const buttons = await getComponents<Button>(canvasElement, 'swc-button');
    const [labeledButton, iconOnlyButton, pendingButton] = buttons;

    await step(
      'labeled button internal control has no aria-label override',
      async () => {
        const internal = labeledButton.renderRoot.querySelector('button');
        expect(internal?.getAttribute('aria-label')).toBeNull();
      }
    );

    await step(
      'icon-only button forwards accessible-label to internal button',
      async () => {
        const internal = iconOnlyButton.renderRoot.querySelector('button');
        expect(internal?.getAttribute('aria-label')).toBe('Add item');
      }
    );

    await step(
      'pending button has aria-disabled and explicit pending-label',
      async () => {
        const internal = pendingButton.renderRoot.querySelector('button');
        expect(internal?.getAttribute('aria-disabled')).toBe('true');
        expect(internal?.getAttribute('aria-label')).toBe('Upload in-progress');
      }
    );
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
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

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('variant');
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

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('fill-style');
      })
    );
  },
};

export const OutlineAccentWarningTest: Story = {
  render: () => html`
    <swc-button variant="accent" fill-style="outline">
      Accent Outline
    </swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('warns when outline is used with accent variant', () =>
      withWarningSpy(async (warnCalls) => {
        button.requestUpdate();
        await button.updateComplete;

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('outline');
      })
    );
  },
};

export const StaticColorAccentWarningTest: Story = {
  render: () => html`
    <swc-button variant="accent" static-color="white">Accent Static</swc-button>
  `,
  play: async ({ canvasElement, step }) => {
    const button = await getComponent<Button>(canvasElement, 'swc-button');

    await step('warns when static-color is used with accent variant', () =>
      withWarningSpy(async (warnCalls) => {
        button.requestUpdate();
        await button.updateComplete;

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('static-color');
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

    await step('warns when both pending and disabled are set', () =>
      withWarningSpy(async (warnCalls) => {
        button.requestUpdate();
        await button.updateComplete;

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('pending');
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

    await step('warns when icon-only button has no accessible-label', () =>
      withWarningSpy(async (warnCalls) => {
        button.requestUpdate();
        await button.updateComplete;

        expect(warnCalls.length).toBeGreaterThan(0);
        expect(String(warnCalls[0]?.[1] || '')).toContain('accessible-label');
      })
    );
  },
};

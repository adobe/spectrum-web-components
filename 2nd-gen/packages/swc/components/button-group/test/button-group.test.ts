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

import { ButtonGroup } from '@adobe/spectrum-wc/button-group';
import {
  BUTTON_GROUP_ALIGNMENTS,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_SIZES,
} from '@spectrum-web-components/core/components/button-group';

import '@adobe/spectrum-wc/components/button-group/swc-button-group.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import { getComponent, withWarningSpy } from '../../../utils/test-utils.js';
import meta, {
  Alignment,
  Disabled,
  Orientations,
  Overview,
  Sizes,
} from '../stories/button-group.stories.js';

export default {
  ...meta,
  title: 'Button Group/Tests',
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
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );

    await step('renders with expected default values', async () => {
      expect(group.orientation, 'default orientation').toBe('horizontal');
      expect(group.size, 'default size').toBe('m');
      expect(group.disabled, 'default disabled').toBe(false);
      expect(group.align, 'default align').toBe('start');
    });

    await step('sets correct ARIA attributes', async () => {
      expect(group.getAttribute('role'), 'host role').toBe('group');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Properties / Attributes
// ──────────────────────────────────────────────────────────────

export const OrientationMutationTest: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Action 1</swc-button>
      <swc-button>Action 2</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
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
  },
};

export const SizePropagationTest: Story = {
  render: () => html`
    <swc-button-group size="m">
      <swc-button>Save</swc-button>
      <swc-button>Cancel</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );
    const buttons = canvasElement.querySelectorAll('swc-button');

    await step('propagates initial size to child buttons', async () => {
      for (const button of buttons) {
        await (button as HTMLElement & { updateComplete: Promise<boolean> })
          .updateComplete;
        expect(
          (button as HTMLElement & { size: string }).size,
          'button receives group size'
        ).toBe('m');
      }
    });

    await step('propagates updated size to child buttons', async () => {
      group.size = 'l' as ButtonGroup['size'];
      await group.updateComplete;

      for (const button of buttons) {
        await (button as HTMLElement & { updateComplete: Promise<boolean> })
          .updateComplete;
        expect(
          (button as HTMLElement & { size: string }).size,
          'button size after group change'
        ).toBe('l');
      }
    });
  },
};

export const DisabledPropagationTest: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Save</swc-button>
      <swc-button>Cancel</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );
    const buttons = canvasElement.querySelectorAll('swc-button');

    await step('buttons are enabled by default', async () => {
      for (const button of buttons) {
        expect(
          (button as HTMLElement & { disabled: boolean }).disabled,
          'button is not disabled'
        ).toBe(false);
      }
    });

    await step('propagates disabled to child buttons', async () => {
      group.disabled = true;
      await group.updateComplete;

      for (const button of buttons) {
        await (button as HTMLElement & { updateComplete: Promise<boolean> })
          .updateComplete;
        expect(
          (button as HTMLElement & { disabled: boolean }).disabled,
          'button is disabled after group disabled'
        ).toBe(true);
      }
    });

    await step('re-enables buttons when disabled is removed', async () => {
      group.disabled = false;
      await group.updateComplete;

      for (const button of buttons) {
        await (button as HTMLElement & { updateComplete: Promise<boolean> })
          .updateComplete;
        expect(
          (button as HTMLElement & { disabled: boolean }).disabled,
          'button is re-enabled'
        ).toBe(false);
      }
    });
  },
};

export const AlignReflectionTest: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Action</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );

    await step('reflects align attribute after mutation', async () => {
      group.align = 'center';
      await group.updateComplete;
      expect(group.getAttribute('align'), 'align attribute is center').toBe(
        'center'
      );

      group.align = 'end';
      await group.updateComplete;
      expect(group.getAttribute('align'), 'align attribute is end').toBe('end');
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Slots
// ──────────────────────────────────────────────────────────────

export const SlotchangeTest: Story = {
  render: () => html`
    <swc-button-group size="l" disabled>
      <swc-button>Existing</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );

    await step(
      'newly slotted buttons receive current size and disabled state',
      async () => {
        const newButton = document.createElement('swc-button');
        newButton.textContent = 'New';
        group.appendChild(newButton);

        await group.updateComplete;
        await new Promise((r) => requestAnimationFrame(r));
        await (newButton as HTMLElement & { updateComplete: Promise<boolean> })
          .updateComplete;

        expect(
          (newButton as HTMLElement & { size: string }).size,
          'new button receives group size'
        ).toBe('l');
        expect(
          (newButton as HTMLElement & { disabled: boolean }).disabled,
          'new button receives group disabled'
        ).toBe(true);
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
      for (const size of BUTTON_GROUP_SIZES) {
        const group = canvasElement.querySelector(
          `swc-button-group[size="${size}"]`
        ) as ButtonGroup | null;
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
      for (const orientation of BUTTON_GROUP_ORIENTATIONS) {
        const group = canvasElement.querySelector(
          `swc-button-group[orientation="${orientation}"]`
        ) as ButtonGroup | null;
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

export const DisabledTest: Story = {
  ...Disabled,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );
    const buttons = canvasElement.querySelectorAll('swc-button');

    await step('all child buttons are disabled', async () => {
      expect(group.disabled, 'group is disabled').toBe(true);
      for (const button of buttons) {
        await (button as HTMLElement & { updateComplete: Promise<boolean> })
          .updateComplete;
        expect(
          (button as HTMLElement & { disabled: boolean }).disabled,
          'button is disabled'
        ).toBe(true);
      }
    });
  },
};

export const AlignmentTest: Story = {
  ...Alignment,
  play: async ({ canvasElement, step }) => {
    await step('renders groups in all valid alignments', async () => {
      for (const align of BUTTON_GROUP_ALIGNMENTS) {
        const group = canvasElement.querySelector(
          `swc-button-group[align="${align}"]`
        ) as ButtonGroup | null;
        expect(group, `group with align="${align}" is rendered`).toBeTruthy();
        await group?.updateComplete;
        expect(group?.align, `group align property is "${align}"`).toBe(align);
      }
    });
  },
};

// ──────────────────────────────────────────────────────────────
// TEST: Dev mode warnings
// ──────────────────────────────────────────────────────────────

export const InvalidOrientationWarningTest: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Action</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );

    await step('warns when an invalid orientation is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        group.orientation = 'diagonal' as unknown as ButtonGroup['orientation'];
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
    <swc-button-group>
      <swc-button>Action</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );

    await step('does not warn for valid orientation values in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        for (const orientation of BUTTON_GROUP_ORIENTATIONS) {
          group.orientation = orientation;
          await group.updateComplete;
        }

        expect(warnCalls.length, 'no warnings for valid orientations').toBe(0);
      })
    );
  },
};

export const InvalidAlignWarningTest: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Action</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );

    await step('warns when an invalid align is set in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        group.align = 'stretch' as unknown as ButtonGroup['align'];
        await group.updateComplete;

        expect(
          warnCalls.length,
          'at least one warning for invalid align'
        ).toBeGreaterThan(0);
        expect(
          String(warnCalls[0]?.[1] || ''),
          'warning references align'
        ).toContain('align');
      })
    );
  },
};

export const ValidAlignNoWarningTest: Story = {
  render: () => html`
    <swc-button-group>
      <swc-button>Action</swc-button>
    </swc-button-group>
  `,
  play: async ({ canvasElement, step }) => {
    const group = await getComponent<ButtonGroup>(
      canvasElement,
      'swc-button-group'
    );

    await step('does not warn for valid align values in DEBUG mode', () =>
      withWarningSpy(async (warnCalls) => {
        for (const align of BUTTON_GROUP_ALIGNMENTS) {
          group.align = align;
          await group.updateComplete;
        }

        expect(warnCalls.length, 'no warnings for valid aligns').toBe(0);
      })
    );
  },
};

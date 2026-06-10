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
import { ref } from 'lit/directives/ref.js';
import { expect, userEvent, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

import {
  TOOLTIP_PLACEMENTS,
  TOOLTIP_VARIANTS,
  type TooltipPlacement,
  type TooltipVariant,
} from '@spectrum-web-components/core/components/tooltip';

import '@adobe/spectrum-wc/components/button/swc-button.js';
import '@adobe/spectrum-wc/components/tooltip/swc-tooltip.js';

// ────────────────
//    METADATA
// ────────────────

const { args, argTypes, template } = getStorybookHelpers('swc-tooltip');

argTypes.variant = {
  ...argTypes.variant,
  control: { type: 'select' },
  options: TOOLTIP_VARIANTS,
};

argTypes.placement = {
  ...argTypes.placement,
  control: { type: 'select' },
  options: TOOLTIP_PLACEMENTS,
};

// ────────────────────
//    HELPERS
// ────────────────────

const variantLabels = {
  neutral: 'Save your changes',
  informative: 'File will be compressed',
  negative: 'Action cannot be undone',
} as const satisfies Record<TooltipVariant, string>;

const variantTriggerLabels = {
  neutral: 'Save',
  informative: 'Upload',
  negative: 'Delete',
} as const satisfies Record<TooltipVariant, string>;

const placementLabels = {
  top: 'Appears above',
  right: 'Appears to the right',
  end: 'Appears at end',
  bottom: 'Appears below',
  left: 'Appears to the left',
  start: 'Appears at start',
} as const satisfies Record<TooltipPlacement, string>;

const TABULAR_PLACEMENTS: TooltipPlacement[] = [
  'top',
  'right',
  'end',
  'bottom',
  'left',
  'start',
];

// Renders a button+tooltip pair linked via the `for` attribute.
// Each pair needs a unique `id` so multiple instances can coexist in the same story.
const triggered = (
  tooltipArgs: Record<string, unknown>,
  id: string,
  buttonLabel?: string,
  iconOnly: boolean = false
) => {
  if (!iconOnly) {
    return html`
      <swc-button id=${id}>${buttonLabel}</swc-button>
      ${template({ ...tooltipArgs, for: id })}
    `;
  } else {
    return html`
      <swc-button
        id=${id}
        accessible-label=${String(tooltipArgs['default-slot'] ?? '')}
      >
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
      ${template({ ...tooltipArgs, for: id })}
    `;
  }
};

/**
 * A `<swc-tooltip>` displays a brief, contextual message near a trigger element.
 *
 * Author `<swc-tooltip>` as a sibling of the trigger element. Reference the trigger by its `id`
 * using the `for` attribute; the tooltip can be placed anywhere in the same document tree root.
 *
 * For cross-shadow-root triggers where `getElementById` cannot reach the trigger, set the
 * `triggerElement` property directly with an element reference.
 */
const meta: Meta = {
  title: 'Tooltip',
  component: 'swc-tooltip',
  parameters: {
    actions: {
      handles: ['swc-open', 'swc-close', 'swc-after-open', 'swc-after-close'],
    },
    docs: {
      subtitle: `Brief contextual message that appears near a trigger element.`,
    },
  },
  args,
  argTypes,
  render: (args) => {
    return html`
      ${triggered({ ...args }, 'swc-tooltip-default-trigger', 'Open')}
    `;
  },
  tags: ['migrated'],
};

export default meta;

// ────────────────────
//    PLAYGROUND STORY
// ────────────────────

export const Playground: Story = {
  tags: ['dev'],
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': variantLabels.neutral,
  },
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-playground', 'Open')}
  `,
};

// ──────────────────────────
//    OVERVIEW STORY
// ──────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': 'Save your changes',
  },
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-overview', 'Open')}
  `,
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

export const Anatomy: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltip = canvasElement.querySelector(
      'swc-tooltip'
    ) as HTMLElement & {
      open: boolean;
    };
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    tooltip.open = true;
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-anatomy-short', 'Action')}
    ${triggered(
      {
        ...args,
        'default-slot':
          'Longer tooltip text needs to wrap across multiple lines when the content exceeds the maximum inline size',
      },
      'tooltip-anatomy-long',
      'Another action'
    )}
  `,
  args: {
    placement: 'top',
    'default-slot': 'Short label',
  },
  tags: ['anatomy'],
  parameters: { flexLayout: 'row-wrap' },
};

// ──────────────────────────
//    OPTIONS STORIES
// ──────────────────────────

export const Variants: Story = {
  render: (args) => html`
    ${TOOLTIP_VARIANTS.map((variant) =>
      triggered(
        { ...args, variant, 'default-slot': variantLabels[variant] },
        `tooltip-trigger-${variant}`,
        variantTriggerLabels[variant]
      )
    )}
  `,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltips = canvasElement.querySelectorAll('swc-tooltip');
    const tooltip = tooltips[1] as HTMLElement & { open: boolean }; // informative
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    tooltip.open = true;
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap' },
};

export const Placements: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltips = canvasElement.querySelectorAll('swc-tooltip');
    const tooltip = tooltips[3] as HTMLElement & { open: boolean }; // bottom
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    tooltip.open = true;
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  render: (args) => html`
    <style>
      .tooltip-placements {
        display: grid;
        justify-content: center;
        justify-items: center;
        gap: var(--swc-spacing-400);
        grid-template-areas:
          '. top .'
          'start . right'
          'left . end'
          '. bottom .';
      }

      #tooltip-trigger-top {
        grid-area: top;
      }
      #tooltip-trigger-right {
        grid-area: right;
      }
      #tooltip-trigger-end {
        grid-area: end;
      }
      #tooltip-trigger-bottom {
        grid-area: bottom;
      }
      #tooltip-trigger-left {
        grid-area: left;
      }
      #tooltip-trigger-start {
        grid-area: start;
      }
    </style>
    <div class="tooltip-placements">
      ${TABULAR_PLACEMENTS.map((placement) =>
        triggered(
          { ...args, placement, 'default-slot': placementLabels[placement] },
          `tooltip-trigger-${placement}`,
          placement
        )
      )}
    </div>
  `,
  tags: ['options'],
  parameters: {
    layout: 'padded',
    docs: {
      canvas: {
        sourceState: 'hidden',
      },
    },
  },
};

// ──────────────────────────
//    STATES STORIES
// ──────────────────────────

export const Open: Story = {
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-state-open', 'Action')}
  `,
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': 'Save your changes',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltip = canvasElement.querySelector(
      'swc-tooltip'
    ) as HTMLElement & {
      open: boolean;
    };
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    tooltip.open = true;
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  tags: ['states'],
};

export const Disabled: Story = {
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-disabled', 'Action')}
  `,
  args: {
    variant: 'neutral',
    placement: 'top',
    disabled: true,
    'default-slot': 'Hover and focus are disabled',
  },
  tags: ['states'],
};

export const Manual: Story = {
  render: (args) => {
    const onShowTooltip = (event: MouseEvent) => {
      const root = (event.currentTarget as HTMLElement).getRootNode() as
        | Document
        | ShadowRoot;
      const tooltip = root.querySelector(
        'swc-tooltip[for="tooltip-manual-trigger"]'
      ) as HTMLElement & { open: boolean };
      if (tooltip) {
        tooltip.open = !tooltip.open;
      }
    };

    return html`
      ${triggered({ ...args }, 'tooltip-manual-trigger', 'Action')}
      <swc-button variant="secondary" @click=${onShowTooltip}>
        Show tooltip
      </swc-button>
    `;
  },
  args: {
    variant: 'neutral',
    placement: 'top',
    manual: true,
    'default-slot': 'Consumer-controlled tooltip',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const buttons = canvasElement.querySelectorAll('swc-button');
    const tooltip = canvasElement.querySelector('swc-tooltip') as HTMLElement;
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    await userEvent.click(buttons[1] as HTMLElement);
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  tags: ['states'],
  parameters: { flexLayout: 'row-wrap' },
};

// ────────────────────────────────
//    BEHAVIORS STORIES
// ────────────────────────────────

export const Events: Story = {
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-behavior-events', 'Action')}
  `,
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': 'Save your changes',
  },
  tags: ['behaviors'],
};

export const TriggerElement: Story = {
  // The ref directive wires triggerElement during rendering so the story is
  // functional in the Docs page canvas, not just when the play function runs.
  render: () => {
    let triggerEl: HTMLElement | null = null;

    return html`
      <swc-button
        id="te-trigger"
        ${ref((el) => {
          triggerEl = (el as HTMLElement) ?? null;
        })}
      >
        Action
      </swc-button>
      <swc-tooltip
        placement="top"
        ${ref((el) => {
          if (el && triggerEl) {
            (
              el as HTMLElement & { triggerElement: HTMLElement | null }
            ).triggerElement = triggerEl;
          }
        })}
      >
        Wired via the triggerElement property
      </swc-tooltip>
    `;
  },
  // Play function opens the tooltip for sidebar view and VRT.
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltip = canvasElement.querySelector(
      'swc-tooltip'
    ) as HTMLElement & {
      open: boolean;
    };
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    tooltip.open = true;
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  tags: ['behaviors'],
};

export const Labeling: Story = {
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltip = canvasElement.querySelector(
      'swc-tooltip'
    ) as HTMLElement & {
      open: boolean;
    };
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    tooltip.open = true;
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  render: (args) => html`
    ${triggered(
      {
        ...args,
        labeling: true,
        'default-slot': 'Save changes',
      },
      'tooltip-labeling-trigger',
      undefined,
      true
    )}
  `,
  args: {
    placement: 'top',
    variant: 'neutral',
  },
  tags: ['behaviors'],
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

export const Accessibility: Story = {
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-a11y', 'Action button')}
  `,
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': 'Save your changes',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const tooltip = canvasElement.querySelector(
      'swc-tooltip'
    ) as HTMLElement & {
      open: boolean;
    };
    const afterOpen = new Promise<void>((resolve) => {
      tooltip.addEventListener('swc-after-open', () => resolve(), {
        once: true,
      });
    });
    tooltip.open = true;
    await afterOpen;
    await waitFor(() => {
      expect(tooltip.matches(':popover-open')).toBe(true);
    });
  },
  tags: ['a11y'],
};

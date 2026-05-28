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
// Temporary: floating-ui used only in stories for basic positioning until
// PlacementController and HoverController land in the additive phase.
import { computePosition, type Placement } from '@floating-ui/dom';
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

// SWC uses logical 'start'/'end'; map to physical values for Floating UI.
const toFloatingPlacement = (placement: string): Placement => {
  if (placement === 'start') {
    if (document.dir === 'rtl') {
      return 'right';
    }
    return 'left';
  }
  if (placement === 'end') {
    if (document.dir === 'rtl') {
      return 'left';
    }
    return 'right';
  }
  return placement as Placement;
};

// Temporary: positions the tooltip via Floating UI once the popover appears in the
// top layer.
const positionTooltip = (button: HTMLElement, tooltip: HTMLElement): void => {
  const placement = tooltip.getAttribute('placement') ?? 'top';
  void computePosition(button, tooltip, {
    placement: toFloatingPlacement(placement),
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
};

// Temporary: toggles `open` on the linked tooltip on click until HoverController is
// available. Waits for the `toggle` event before measuring so Floating UI sees the
// element after showPopover() places it in the top layer.
const makeToggle = (id: string) => (event: MouseEvent) => {
  const root = (event.currentTarget as HTMLElement).getRootNode() as
    | Document
    | ShadowRoot;
  const button = event.currentTarget as HTMLElement;
  const tooltip = root.querySelector(
    `swc-tooltip[for="${id}"]`
  ) as HTMLElement & { open: boolean };

  if (!tooltip) {
    return;
  }

  tooltip.open = !tooltip.open;

  if (tooltip.open) {
    tooltip.addEventListener(
      'toggle',
      (toggleEvent) => {
        if ((toggleEvent as ToggleEvent).newState !== 'open') {
          return;
        }
        positionTooltip(button, tooltip);
      },
      { once: true }
    );
  }
};

// Renders a button+tooltip pair linked via the `for` attribute.
// Each pair needs a unique `id` so multiple instances can coexist in the same story.
const triggered = (
  tooltipArgs: Record<string, unknown>,
  id: string,
  buttonLabel: string
) => html`
  <swc-button id=${id} @click=${makeToggle(id)}>${buttonLabel}</swc-button>
  ${template({ ...tooltipArgs, for: id })}
`;

/**
 * Each story renders one or more buttons that trigger associated tooltips when clicked.
 * These stories use a temporary click-to-toggle implementation until `HoverController` is available in the additive phase.
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
//    AUTODOCS STORY
// ────────────────────

export const Playground: Story = {
  tags: ['autodocs', 'dev'],
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': variantLabels.neutral,
  },
};

// ──────────────────────────────
//    OVERVIEW STORIES
// ──────────────────────────────

export const Overview: Story = {
  tags: ['overview'],
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': 'Save your changes',
  },
};

// ──────────────────────────
//    ANATOMY STORIES
// ──────────────────────────

/**
 * A tooltip consists of:
 *
 * 1. **Tooltip bubble**: Container with rounded corners and variant-specific background color
 * 2. **Tip indicator**: Triangular arrow pointing toward the trigger element (placement-aware)
 * 3. **Default slot**: Text content displayed inside the bubble
 *
 * Click each button below to toggle short and long text variants.
 */
export const Anatomy: Story = {
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
  tags: ['options'],
  parameters: { flexLayout: 'row-wrap', 'section-order': 1 },
};

/**
 * The `placement` attribute sets the preferred position of the tooltip relative to its trigger.
 * Pixel-accurate anchoring requires `PlacementController` (additive phase); these stories
 * temporarily use Floating UI directly to verify visual appearance across placements.
 */
export const Placements: Story = {
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
    'section-order': 2,
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

// TODO: will complete in separate documentation pass of phase 7

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

// TODO: will complete in separate documentation pass of phase 7

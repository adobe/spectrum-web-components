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
  buttonLabel?: string,
  iconOnly: boolean = false
) => {
  if (!iconOnly) {
    return html`
      <swc-button id=${id} @click=${makeToggle(id)}>${buttonLabel}</swc-button>
      ${template({ ...tooltipArgs, for: id })}
    `;
  } else {
    return html`
      <swc-button
        id=${id}
        @click=${makeToggle(id)}
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
 *
 * Each story in this document uses a temporary click-to-toggle interaction.
 * Automatic hover and focus wiring is available in a future release.
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

/**
 * Three semantic variants are available: `neutral` (default), `informative`, and `negative`.
 * Each applies a distinct background color token.
 */
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
 * Pixel-accurate anchoring requires `PlacementController` (future release); these stories
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

/**
 * The tooltip has two states: closed (default) and open.
 *
 * When open, the bubble and directional tip are visible. The `open` property reflects whether the
 * tooltip is currently shown. Click the button below to toggle the open state.
 */
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
    const button = canvasElement.querySelector('swc-button') as HTMLElement;
    button?.click();
  },
  tags: ['states'],
};

// ────────────────────────────────
//    BEHAVIORS STORIES
// ────────────────────────────────

/**
 * `<swc-tooltip>` dispatches four lifecycle events as the tooltip opens and closes:
 *
 * - **`swc-open`**: Dispatched when the tooltip begins to open, before the enter transition plays.
 * - **`swc-after-open`**: Dispatched after the enter transition completes.
 * - **`swc-close`**: Dispatched when the tooltip begins to close, before the exit transition plays.
 * - **`swc-after-close`**: Dispatched after the exit transition completes.
 *
 * When no CSS transition is active (for example, when `prefers-reduced-motion` removes it),
 * `swc-after-open` and `swc-after-close` are dispatched synchronously on the same tick as
 * `swc-open` and `swc-close`.
 *
 * Events fire regardless of what caused the state change: setting `open` directly, calling
 * `showPopover()`/`hidePopover()`, pressing `Escape`, or a light-dismiss click.
 */
export const Events: Story = {
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-behavior-events', 'Open')}
  `,
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': 'Save your changes',
  },
  tags: ['behaviors'],
};

/**
 * `<swc-tooltip>` uses `popover="auto"`, which participates in the browser's auto popover stack.
 * Opening a tooltip dismisses any other open `auto` popover in the document: other tooltips,
 * menus, pickers, and selects.
 *
 * Set `manual` on the tooltip and manage the `open` property directly to opt out of automatic
 * open and close behavior. ARIA relationship wiring still fires on `open` change when `for` or
 * `triggerElement` is set.
 */
export const AutoStack: Story = {
  tags: ['behaviors', 'description-only'],
};

/**
 * When a trigger has no visible text label and the tooltip text is its sole accessible name,
 * set the `labeling` attribute on the tooltip. This switches the ARIA wiring from
 * `ariaDescribedByElements` (supplementary description) to `ariaLabelledByElements` (accessible name)
 * on the trigger's inner interactive element.
 */
export const Labeling: Story = {
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
  parameters: { 'section-order': 1 },
};

// ────────────────────────────────
//    ACCESSIBILITY STORIES
// ────────────────────────────────

/**
 * ### Features
 *
 * The `<swc-tooltip>` element implements the following accessibility features:
 *
 * #### ARIA role and relationship
 *
 * 1. **`role="tooltip"`**: Set on the host element via `connectedCallback`.
 * 2. **`ariaDescribedByElements`**: When the tooltip opens, the SWC layer resolves the trigger
 *    via `for` or `triggerElement` and sets `Element.ariaDescribedByElements = [tooltipHost]`
 *    on the trigger's interactive surface. For 2nd-gen SWC components with an open shadow root,
 *    the inner `<button>` is targeted; for native elements, the trigger host is used directly.
 *    The association is removed when the tooltip closes.
 * 3. **`labeling` attribute**: When set, the SWC layer wires `ariaLabelledByElements` instead of
 *    `ariaDescribedByElements` on the trigger's inner interactive element. Use for icon-only
 *    triggers where the tooltip text is the sole accessible name and adding a visible or
 *    programmatic name directly to the trigger is not possible.
 *
 * #### Keyboard behavior
 *
 * - <kbd>Escape</kbd>: Closes the tooltip; focus remains on the trigger. Handled by native
 *   `popover="auto"`.
 * - Tooltip text is never in the tab order; focus always stays on the trigger.
 *
 * #### High contrast mode
 *
 * A `1px solid transparent` border is present in base styles. Forced-colors mode fills
 * `transparent` with `CanvasText` automatically, ensuring the bubble is visible in Windows High
 * Contrast mode.
 *
 * #### Variant colors
 *
 * Variant colors supplement the tooltip text but never serve as the sole conveyance of meaning
 * (WCAG 1.4.1). Each variant pairs the color with legible text.
 *
 * ### Best practices
 *
 * - **Use focusable triggers only.** Place `<swc-tooltip>` only on elements that can receive
 *   keyboard focus. Non-interactive elements (static text, decorative icons) require a focusable
 *   wrapper or a different pattern such as contextual help.
 * - **Use plain text.** Do not include interactive elements (links, buttons) or rich formatting
 *   inside a tooltip. `role="tooltip"` is not focusable; use `<swc-popover>` or contextual help
 *   for disclosures that require interactive content.
 * - **Supplement, do not duplicate.** Tooltip text supplements the trigger's accessible name.
 *   Do not use tooltip text to repeat what `aria-label` or `aria-labelledby` already conveys.
 * - **Icon-only triggers.** When the tooltip text is the sole accessible name for an icon-only
 *   trigger, prefer adding the name directly to the trigger: `aria-label` on native elements;
 *   `accessible-label` on 2nd-gen SWC components. Use `labeling` when the trigger host cannot be
 *   modified; it switches ARIA wiring from description to labeling so the inner interactive element
 *   receives an accessible name from the tooltip text.
 * - **No auto-dismiss timer.** The tooltip must remain visible until the user dismisses it or the
 *   triggering state ends (WCAG 1.4.13).
 * - **Touch devices.** Hover-triggered tooltips are not accessible on touch-only devices. For
 *   touch disclosure, use `<swc-popover>` or contextual help instead.
 */
export const Accessibility: Story = {
  render: (args) => html`
    ${triggered({ ...args }, 'tooltip-a11y', 'Action button')}
  `,
  args: {
    variant: 'neutral',
    placement: 'top',
    'default-slot': 'Save your changes',
  },
  tags: ['a11y'],
};

// ──────────────────────────────────────
//    UPCOMING FEATURES STORIES
// ──────────────────────────────────────

/**
 * The following features are planned for an upcoming release:
 *
 * - **Automatic hover and focus interactions**: The tooltip opens on trigger hover after a
 *   warm-up delay and on keyboard focus immediately; closes when the pointer leaves or focus
 *   moves away.
 * - **Configurable delay (`delay`)**: Controls the warm-up delay before the tooltip appears on
 *   hover. Defaults to 1500ms; set to `0` to show immediately. Moving quickly between adjacent
 *   triggers (for example, a toolbar) shows each subsequent tooltip immediately after the first
 *   warm-up elapses.
 * - **`disabled` attribute**: Prevents the tooltip from responding to hover and focus in
 *   automatic mode. No-op when `manual` is set.
 * - **Pointer hover bridge**: The pointer can move from the trigger into the tooltip bubble
 *   without the tooltip closing (WCAG 1.4.13).
 * - **Tip-less display (`no-tip`)**: Removes the directional tip arrow from the tooltip bubble.
 * - **Tooltip directive**: A Lit directive for programmatic tooltip insertion and lifecycle
 *   management.
 */
export const UpcomingFeatures: Story = {
  tags: ['upcoming', 'description-only'],
};

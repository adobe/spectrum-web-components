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
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/element/index.js';

import {
  TOOLTIP_PLACEMENTS,
  TOOLTIP_VARIANTS,
  type TooltipPlacement,
  type TooltipVariant,
} from './Tooltip.types.js';

/**
 * Abstract base class for the Tooltip component.
 *
 * Declares all public properties and sets `role="tooltip"` on the host element.
 * No rendering logic. No DOM traversal. No Floating UI.
 *
 * @slot - Text label displayed in the tooltip.
 */
export abstract class TooltipBase extends SpectrumElement {
  // ──────────────────
  //     SHARED API
  // ──────────────────

  /**
   * @internal
   *
   * All valid variants for the tooltip.
   */
  static readonly VARIANTS: readonly string[] = TOOLTIP_VARIANTS;

  /**
   * @internal
   *
   * All valid placement values: physical cardinals (`top`, `bottom`, `left`, `right`)
   * and logical inline values (`start`, `end`).
   */
  static readonly PLACEMENTS: readonly string[] = TOOLTIP_PLACEMENTS;

  /**
   * The semantic variant of the tooltip.
   *
   * @default 'neutral'
   */
  @property({ type: String, reflect: true })
  public variant: TooltipVariant = 'neutral';

  /**
   * The preferred placement of the tooltip relative to its trigger.
   * Applies a CSS class for tip direction; pixel positioning requires `PlacementController` (additive phase).
   *
   * @default 'top'
   */
  @property({ type: String, reflect: true })
  public placement: TooltipPlacement = 'top';

  /**
   * Whether the tooltip is visible.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open: boolean = false;

  /**
   * The `id` of the trigger element in the same document tree root.
   * The SWC layer resolves the trigger via `getRootNode().getElementById(this.for)`.
   * Active from the initial release; drives ARIA relationship wiring on `open` change.
   */
  @property({ attribute: 'for', type: String })
  public for: string | undefined;

  /**
   * Explicit trigger element reference. Overrides `for` when set.
   * Use for cross-shadow-root triggers or programmatic insertion where `getElementById` is scoped to the wrong root.
   * Setter only — no HTML attribute.
   *
   * @default null
   */
  @property({ attribute: false })
  public triggerElement: HTMLElement | null = null;

  /**
   * Whether to apply warm-up and cooldown timing (1500ms each) to hover and focus events.
   *
   * Additive/deferred: active when `HoverController` is integrated.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public delayed: boolean = false;

  /**
   * When set, prevents automatic trigger wiring from responding to hover and focus events.
   * No-op when `manual` is also set.
   *
   * Additive/deferred: active when `HoverController` is integrated.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * Suppresses controller wiring for automatic hover and focus open/close.
   * The consumer manages visibility via the `open` property or the popover API directly.
   * ARIA relationship wiring still fires on `open` change when `for` or `triggerElement` is set.
   *
   * Additive/deferred: effective when controllers are integrated.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public manual: boolean = false;

  /**
   * Pixel offset between the tooltip and its trigger.
   * Passed to `PlacementController` offset middleware.
   *
   * Additive/deferred: active when `PlacementController` is integrated.
   *
   * @default 0
   */
  @property({ type: Number })
  public offset: number = 0;

  /**
   * When set, wires `ariaLabelledByElements` instead of `ariaDescribedByElements` on the trigger's
   * inner interactive element. For icon-only triggers where the tooltip text is the sole accessible name.
   *
   * Additive/deferred: active in the additive phase.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public labeling: boolean = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'tooltip');
  }
}

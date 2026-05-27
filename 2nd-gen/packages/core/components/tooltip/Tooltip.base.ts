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
import { PropertyValues } from 'lit';
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
 * Declares all public properties, sets `role="tooltip"` and `popover="auto"` on
 * the host element, wires the popover lifecycle (`beforetoggle`, `toggle`,
 * `transitionend`), dispatches `swc-open`, `swc-close`, `swc-after-open`, and
 * `swc-after-close` events, resolves the trigger element via `for` or
 * `triggerElement`, and maintains the `ariaDescribedByElements` relationship on
 * `open` change. No rendering logic, including placement.
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
   * Resolved via `getRootNode().getElementById(this.for)`.
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
   * Duration in milliseconds of the warm-up delay before the tooltip shows on pointer hover.
   * Set to `0` to show immediately on hover. Keyboard focus (`focusin` when `:focus-visible`)
   * always shows the tooltip immediately regardless of this value. The cooldown duration (before the next hover must wait again)
   * matches this value. Warm-up/cooldown state is shared across all tooltips in the same document,
   * so moving quickly between adjacent triggers (e.g. a toolbar) shows each subsequent tooltip
   * immediately after the first warm-up elapses.
   *
   * Additive/deferred: active when `HoverController` is integrated.
   *
   * @default 1500
   */
  @property({ type: Number, reflect: true })
  public delay: number = 1500;

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

  // Reflects the browser's actual popover state. Used to guard showPopover/hidePopover
  // calls in updated() so the toggle listener can sync this.open without re-triggering
  // the API (preventing a setter → showPopover → toggle → setter cycle).
  private get isPopoverOpen(): boolean {
    return this.matches(':popover-open');
  }

  private resolveTrigger(): HTMLElement | null {
    if (this.triggerElement) {
      return this.triggerElement;
    }
    if (this.for) {
      const root = this.getRootNode() as Document | ShadowRoot;
      const trigger = root.getElementById(this.for);
      if (!trigger && window.__swc?.DEBUG) {
        window.__swc.warn(
          this,
          `<${this.localName}> for="${this.for}" did not resolve to an element in the current tree root. Check that the referenced id exists in the same document tree root.`,
          'https://opensource.adobe.com/spectrum-web-components/components/tooltip/',
          { level: 'high' }
        );
      }
      return trigger;
    }
    return null;
  }

  private syncAriaRelationship(): void {
    const trigger = this.resolveTrigger();
    if (!trigger) {
      return;
    }
    const target = (trigger.shadowRoot?.querySelector('button') ??
      trigger) as Element & {
      ariaDescribedByElements: Element[] | null;
    };
    const current = target.ariaDescribedByElements ?? [];
    target.ariaDescribedByElements = this.open
      ? [...current.filter((el) => el !== this), this]
      : current.filter((el) => el !== this);
  }

  private dispatchAfterEvent(isOpen: boolean): void {
    this.dispatchEvent(
      new CustomEvent(isOpen ? 'swc-after-open' : 'swc-after-close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  // Guards dispatchAfterEvent so only the first transitionend per open/close cycle fires,
  // preventing one after event from firing for each CSS property that transitions.
  private afterEventPending = false;

  private readonly handleBeforeToggle = (event: Event): void => {
    const { newState } = event as ToggleEvent;
    const eventName = newState === 'open' ? 'swc-open' : 'swc-close';
    this.dispatchEvent(
      new CustomEvent(eventName, { bubbles: true, composed: true })
    );
    // Set here so the flag is set regardless of whether this.open already matches
    // newState. handleToggle exits early when open was set externally, which would
    // otherwise leave the flag unset and suppress swc-after-open / swc-after-close.
    this.afterEventPending = true;
  };

  private readonly handleToggle = (event: Event): void => {
    const { newState } = event as ToggleEvent;
    const isOpen = newState === 'open';
    if (isOpen !== this.open) {
      this.open = isOpen;
    }
    // When no CSS transition is active, dispatch after-* immediately since transitionend will not fire.
    if (getComputedStyle(this).transitionDuration === '0s') {
      this.afterEventPending = false;
      this.dispatchAfterEvent(isOpen);
    }
  };

  private readonly handleTransitionEnd = (event: TransitionEvent): void => {
    if (event.target !== this || !this.afterEventPending) {
      return;
    }
    this.afterEventPending = false;
    this.dispatchAfterEvent(this.open);
  };

  // Allows Escape behavior to be testable, does not interfere with native popover dismissal
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.open) {
      this.open = false;
    }
  };

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open !== this.isPopoverOpen) {
        if (this.open) {
          this.showPopover();
        } else {
          this.hidePopover();
        }
      }
      this.syncAriaRelationship();
    }
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'tooltip');
    this.setAttribute('popover', 'auto');
    this.addEventListener('beforetoggle', this.handleBeforeToggle);
    this.addEventListener('toggle', this.handleToggle);
    this.addEventListener('transitionend', this.handleTransitionEnd);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('beforetoggle', this.handleBeforeToggle);
    this.removeEventListener('toggle', this.handleToggle);
    this.removeEventListener('transitionend', this.handleTransitionEnd);
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}

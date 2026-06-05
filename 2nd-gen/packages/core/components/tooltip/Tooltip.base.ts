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
  HoverController,
  type HoverControllerHost,
} from '../../controllers/hover-controller/index.js';
import {
  type Placement as ControllerPlacement,
  PlacementController,
} from '../../controllers/placement-controller/index.js';
import {
  TOOLTIP_PLACEMENTS,
  TOOLTIP_VARIANTS,
  type TooltipPlacement,
  type TooltipVariant,
} from './Tooltip.types.js';

/**
 * Abstract base class for the Tooltip component.
 * Handles all non-rendering logic: property declarations, popover lifecycle,
 * event dispatch, trigger resolution, ARIA wiring, `HoverController` integration
 * (hover/focus open/close), and `PlacementController` integration (pixel positioning).
 *
 * @slot - Text label displayed in the tooltip.
 */
export abstract class TooltipBase
  extends SpectrumElement
  implements HoverControllerHost
{
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
   * Preferred placement of the tooltip relative to its trigger. Reflects the
   * actual computed side when `PlacementController` is active (which may differ
   * from the requested value after a viewport-driven flip).
   *
   * @default 'top'
   */
  @property({ type: String, reflect: true })
  get placement(): TooltipPlacement {
    return this._placement;
  }

  set placement(value: TooltipPlacement) {
    const old = this._placement;
    this._placement = value;
    if (!this._placementFromController) {
      this._requestedPlacement = value;
    }
    this.requestUpdate('placement', old);
  }

  /**
   * Whether the tooltip is visible.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public open: boolean = false;

  /**
   * The `id` of the trigger element in the same document tree root.
   */
  @property({ attribute: 'for', type: String })
  public for: string | undefined;

  /**
   * Explicit trigger element reference; overrides `for` when set.
   * Use when `getElementById` cannot reach the trigger, such as across a shadow boundary.
   *
   * @default null
   */
  @property({ attribute: false })
  public triggerElement: HTMLElement | null = null;

  /**
   * Warm-up delay in milliseconds before the tooltip opens on pointer hover.
   * Set to `0` to open immediately. Keyboard focus always opens immediately.
   *
   * @default 1500
   */
  @property({ type: Number, reflect: true })
  public delay: number = 1500;

  /**
   * When set, the tooltip does not respond to hover or focus events.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public disabled: boolean = false;

  /**
   * Suppresses automatic hover and focus wiring.
   * The consumer manages visibility via the `open` property or the popover API.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public manual: boolean = false;

  /**
   * Pixel gap along the placement axis between the trigger and the tooltip bubble.
   *
   * @default 4
   */
  @property({ type: Number })
  public offset: number = 4;

  /**
   * Slide along the trigger edge perpendicular to the placement direction, in pixels.
   *
   * @default 0
   */
  @property({ type: Number, attribute: 'cross-offset' })
  public crossOffset: number = 0;

  /**
   * Minimum inset from the viewport edge, in pixels, for collision detection.
   *
   * @default 12
   */
  @property({ type: Number, attribute: 'container-padding' })
  public containerPadding: number = 12;

  /**
   * Whether the tooltip may reposition to the opposite side when the requested
   * placement does not fit within the viewport.
   *
   * @default true
   */
  @property({ type: Boolean, attribute: 'should-flip' })
  public shouldFlip: boolean = true;

  /**
   * When set, the tooltip acts as the trigger's accessible name rather than its description.
   * Use for icon-only triggers where the tooltip text is the sole accessible name.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  public labeling: boolean = false;

  // ──────────────────────
  //     IMPLEMENTATION
  // ──────────────────────

  private readonly hoverController = new HoverController(this, {
    warmStateKey: 'swc-tooltip',
  });

  private readonly placementController = new PlacementController(this);

  // Backing fields for the custom placement getter/setter.
  private _placement: TooltipPlacement = 'top';
  // The placement originally requested by the consumer. PlacementController
  // always starts from this value so a viewport-driven flip can revert when
  // space opens up again.
  private _requestedPlacement: TooltipPlacement = 'top';
  // Set while onPlacementChange is writing the computed placement back into
  // the property, so the setter knows not to overwrite _requestedPlacement.
  private _placementFromController = false;
  // Guards dispatchAfterEvent so only the first transitionend per open/close cycle fires,
  // preventing one after event from firing for each CSS property that transitions.
  private afterEventPending = false;

  /**
   * Returns the tip arrow element to pass to `PlacementController` so the
   * `arrow` middleware keeps the tip aligned with the trigger when the bubble
   * is shifted (e.g. via `crossOffset` or viewport `shift`).
   *
   * Returns `null` in the base class; the SWC rendering layer overrides this
   * to return the actual `.swc-Tooltip-tip` element from the shadow DOM.
   */
  protected get tipElement(): HTMLElement | null {
    return null;
  }

  // Reflects the browser's actual popover state. Used to guard showPopover/hidePopover
  // calls in updated() so the toggle listener can sync this.open without re-triggering
  // the API (preventing a setter → showPopover → toggle → setter cycle).
  private get isPopoverOpen(): boolean {
    return this.matches(':popover-open');
  }

  private startPlacement(): void {
    const trigger = this.resolveTrigger();
    if (!trigger) {
      return;
    }
    this.placementController.start(trigger, this, {
      // Always use the consumer's original requested placement, not the last
      // computed value, so a viewport-driven flip can revert when space opens up.
      placement: this._requestedPlacement as ControllerPlacement,
      offset: this.offset,
      crossOffset: this.crossOffset,
      containerPadding: this.containerPadding,
      shouldFlip: this.shouldFlip,
      tipElement: this.tipElement ?? undefined,
      onPlacementChange: (actualPlacement: ControllerPlacement) => {
        const mainSide = actualPlacement.split('-')[0] as TooltipPlacement;
        if (this._placement !== mainSide) {
          // Flag prevents the setter from treating this as a consumer change
          // and overwriting _requestedPlacement.
          this._placementFromController = true;
          this.placement = mainSide;
          this._placementFromController = false;
        }
      },
    });
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
      ariaLabelledByElements: Element[] | null;
    };

    if (this.labeling) {
      // Remove any stale describedby reference (e.g. if labeling changed while open).
      const described = target.ariaDescribedByElements ?? [];
      target.ariaDescribedByElements = described.filter((el) => el !== this);

      const labelled = target.ariaLabelledByElements ?? [];
      target.ariaLabelledByElements = this.open
        ? [...labelled.filter((el) => el !== this), this]
        : labelled.filter((el) => el !== this);
    } else {
      // Remove any stale labelledby reference (e.g. if labeling changed while open).
      const labelled = target.ariaLabelledByElements ?? [];
      target.ariaLabelledByElements = labelled.filter((el) => el !== this);

      const described = target.ariaDescribedByElements ?? [];
      target.ariaDescribedByElements = this.open
        ? [...described.filter((el) => el !== this), this]
        : described.filter((el) => el !== this);
    }
  }

  private dispatchAfterEvent(isOpen: boolean): void {
    this.dispatchEvent(
      new CustomEvent(isOpen ? 'swc-after-open' : 'swc-after-close', {
        bubbles: true,
        composed: true,
      })
    );
    if (!isOpen) {
      // Clear PlacementController's inline positioning only after the exit
      // transition completes. Removing translate/top/left earlier (e.g. in
      // updated()) displaces the tooltip to 0,0 while it is still visible
      // and fading out, causing a flash.
      this.style.removeProperty('translate');
      this.style.removeProperty('top');
      this.style.removeProperty('left');
    }
  }

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
    // transitionDuration is comma-separated when multiple properties transition ("0s, 0s, …"),
    // so check that every value in the list is zero rather than comparing the full string.
    const durations = getComputedStyle(this).transitionDuration.split(',');
    if (durations.every((d) => d.trim() === '0s')) {
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

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);
    // Sync the animation distance to the current offset value on first render
    // so the open/close animation slides by the same distance as the gap.
    this.style.setProperty(
      '--_swc-tooltip-animation-distance',
      `${this.offset}px`
    );
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('offset')) {
      this.style.setProperty(
        '--_swc-tooltip-animation-distance',
        `${this.offset}px`
      );
    }
    if (changedProperties.has('open')) {
      if (this.open !== this.isPopoverOpen) {
        if (this.open) {
          this.showPopover();
        } else {
          this.hidePopover();
        }
      }
    }
    if (changedProperties.has('open') || changedProperties.has('labeling')) {
      this.syncAriaRelationship();
    }
    if (
      changedProperties.has('for') ||
      changedProperties.has('triggerElement')
    ) {
      this.hoverController.setTarget(this.resolveTrigger());
    }

    // Placement controller: start when opening, stop when closing, restart
    // when positioning options or the trigger change while already open.
    const openChanged = changedProperties.has('open');
    if (openChanged) {
      if (this.open) {
        this.startPlacement();
      } else {
        // Stop autoUpdate immediately so the position stops tracking the trigger
        // during the exit transition. The translate/top/left are cleared by
        // dispatchAfterEvent once the exit transition completes.
        this.placementController.stop();
      }
    } else if (this.open) {
      const placementOptsChanged =
        changedProperties.has('placement') ||
        changedProperties.has('offset') ||
        changedProperties.has('crossOffset') ||
        changedProperties.has('containerPadding') ||
        changedProperties.has('shouldFlip') ||
        changedProperties.has('for') ||
        changedProperties.has('triggerElement');
      if (placementOptsChanged) {
        this.startPlacement();
      }
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

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
  validateEnum,
  warnIf,
} from '@spectrum-web-components/core/utils/index.js';

import {
  HoverController,
  type HoverControllerHost,
} from '../../controllers/hover-controller/index.js';
import {
  fromFloatingPlacement,
  type Placement as ControllerPlacement,
  PlacementController,
  toFloatingPlacement,
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
   * Preferred placement of the tooltip relative to its trigger. This is always
   * the consumer's requested side; the resolved physical side (after any
   * viewport-driven flip) is reflected as `actual-placement`.
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
   * When set, the tooltip does not respond to hover or focus events and cannot
   * be opened. `disabled` takes priority over `open`: setting `open` to `true`
   * while disabled is a no-op, and disabling an open tooltip closes it. Applies
   * in `manual` mode as well.
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

  // Guards dispatchAfterEvent so only the first transitionend per open/close cycle fires,
  // preventing one after event from firing for each CSS property that transitions.
  private afterEventPending = false;

  // Fallback timer for browsers that do not fire transitionend for
  // transition-behavior:allow-discrete discrete properties (e.g. Firefox in CI).
  // Cleared when transitionend fires or a new toggle starts.
  private afterEventFallbackTimer: ReturnType<typeof setTimeout> | null = null;

  // Tracks the most recently ARIA-wired target so syncAriaRelationship can
  // remove stale references when for or triggerElement changes while open.
  private _lastWiredTrigger:
    | (Element & {
        ariaDescribedByElements: Element[] | null;
        ariaLabelledByElements: Element[] | null;
      })
    | null = null;

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

  // Reflects the browser's actual popover state. Used in updated() to reconcile
  // `open` against native light-dismiss: when the browser closes the popover
  // (e.g. Escape or outside click), `open` is synced by the toggle listener
  // without re-invoking the Popover API, and the guard prevents a redundant
  // hidePopover() (which would throw on an already-closed popover).
  private get isPopoverOpen(): boolean {
    return this.matches(':popover-open');
  }

  /**
   * {@link HoverControllerHost} contract. `open` is the single source of truth
   * for visibility; the controller asks to open via this method rather than
   * driving the Popover API directly. `updated()` then reconciles the popover.
   */
  public requestOpen(): void {
    this.open = true;
  }

  /**
   * {@link HoverControllerHost} contract. Asks the tooltip to close by setting
   * `open`; `updated()` reconciles the popover.
   */
  public requestClose(): void {
    this.open = false;
  }

  // Writes actual-placement to the physical side of the declared `placement`,
  // resolving logical start/end against the trigger's writing direction. Used
  // synchronously before showPopover() so @starting-style has a direction; the
  // PlacementController overwrites it with the flip-resolved side afterwards.
  private setDeclaredActualPlacement(): void {
    const trigger = this.resolveTrigger();
    const direction =
      trigger && getComputedStyle(trigger).direction === 'rtl' ? 'rtl' : 'ltr';
    const side = fromFloatingPlacement(
      toFloatingPlacement(this.placement as ControllerPlacement, direction)
    ).split('-')[0];
    this.setAttribute('actual-placement', side);
  }

  private startPlacement(): void {
    const trigger = this.resolveTrigger();
    if (!trigger) {
      return;
    }
    this.placementController.start(trigger, this, {
      placement: this.placement as ControllerPlacement,
      offset: this.offset,
      crossOffset: this.crossOffset,
      containerPadding: this.containerPadding,
      shouldFlip: this.shouldFlip,
      tipElement: this.tipElement ?? undefined,
      onPlacementChange: (resolvedPlacement: ControllerPlacement) => {
        this.setAttribute('actual-placement', resolvedPlacement.split('-')[0]);
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
      warnIf(
        this,
        !trigger,
        `<${this.localName}> for="${this.for}" did not resolve to an element in the current tree root. Check that the referenced id exists in the same document tree root.`,
        'https://spectrum-web-components.adobe.com/?path=/docs/components-tooltip--docs',
        { level: 'high' }
      );
      return trigger;
    }
    return null;
  }

  // Removes this tooltip from the previously wired target's ARIA element arrays
  // and forgets the reference. Called before re-wiring and on disconnect so a
  // trigger never retains a reference to a detached tooltip node.
  private clearAriaRelationship(): void {
    if (!this._lastWiredTrigger) {
      return;
    }
    const stale = this._lastWiredTrigger;
    stale.ariaDescribedByElements = (
      stale.ariaDescribedByElements ?? []
    ).filter((el) => el !== this);
    stale.ariaLabelledByElements = (stale.ariaLabelledByElements ?? []).filter(
      (el) => el !== this
    );
    this._lastWiredTrigger = null;
  }

  private syncAriaRelationship(): void {
    // Remove stale references from the previously wired target before resolving
    // the new one. Handles for/triggerElement changes while the tooltip is open.
    this.clearAriaRelationship();

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

    if (this.open) {
      this._lastWiredTrigger = target;
    }
  }

  private clearPositioningState(): void {
    // Called after the exit transition. Clearing earlier would displace the
    // tooltip to 0,0 while still visible and fading out.
    this.removeAttribute('actual-placement');
    this.style.removeProperty('translate');
    this.style.removeProperty('top');
    this.style.removeProperty('left');
    this.style.removeProperty('--swc-placement-available-width');
    this.style.removeProperty('--swc-placement-available-height');
    if (this.tipElement) {
      this.tipElement.style.removeProperty('translate');
      this.tipElement.style.removeProperty('top');
      this.tipElement.style.removeProperty('left');
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
      this.clearPositioningState();
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
    // Cancel any in-flight close fallback; a new toggle resets the cycle.
    if (this.afterEventFallbackTimer !== null) {
      clearTimeout(this.afterEventFallbackTimer);
      this.afterEventFallbackTimer = null;
    }
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
    } else if (!isOpen) {
      // Some browsers (e.g. Firefox in CI) do not fire transitionend for
      // transition-behavior:allow-discrete discrete properties. Start a fallback
      // so positioning is always cleared after the exit transition window.
      const maxMs = Math.max(
        0,
        ...durations.map((d) => {
          const trimmed = d.trim();
          const value = parseFloat(trimmed);
          return trimmed.endsWith('ms') ? value : value * 1000;
        })
      );
      this.afterEventFallbackTimer = setTimeout(() => {
        this.afterEventFallbackTimer = null;
        if (this.afterEventPending) {
          this.afterEventPending = false;
          this.dispatchAfterEvent(false);
        }
      }, maxMs + 100);
    }
  };

  private readonly handleTransitionEnd = (event: TransitionEvent): void => {
    if (event.target !== this || !this.afterEventPending) {
      return;
    }
    if (this.afterEventFallbackTimer !== null) {
      clearTimeout(this.afterEventFallbackTimer);
      this.afterEventFallbackTimer = null;
    }
    this.afterEventPending = false;
    this.dispatchAfterEvent(this.open);
  };

  // Escape-to-close. Registered on `document` only while open (see updated()),
  // not for the whole connected lifetime: the tooltip is non-interactive and
  // never receives focus, so a host-level keydown would not fire, and scoping to
  // the open state keeps at most one listener active at a time (popover="auto"
  // permits one open tooltip). Under `popover="auto"` this duplicates the
  // browser's native Escape light-dismiss; it is kept as a mode-independent
  // handler so a `manual` tooltip (which gets no native light-dismiss, e.g. one
  // that coexists with an open popover) still closes on Escape.
  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.open) {
      this.open = false;
    }
  };

  protected override willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties);
    // `disabled` takes priority over `open`: a disabled tooltip cannot be shown,
    // regardless of how `open` became true (set programmatically, or `disabled`
    // toggled on while already open). Normalizing here — before render and
    // before updated() acts on `open` — keeps `open` and visibility consistent
    // and prevents the `open` attribute from briefly reflecting `true`. Hover
    // and focus opening are separately blocked by HoverController's guards.
    if (this.disabled && this.open) {
      this.open = false;
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('variant')) {
      const constructor = this.constructor as typeof TooltipBase;
      validateEnum(this, {
        prop: 'variant',
        value: this.variant,
        valid: constructor.VARIANTS,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-tooltip--docs',
      });
    }
    if (changedProperties.has('placement')) {
      const constructor = this.constructor as typeof TooltipBase;
      validateEnum(this, {
        prop: 'placement',
        value: this.placement,
        valid: constructor.PLACEMENTS,
        url: 'https://spectrum-web-components.adobe.com/?path=/docs/components-tooltip--docs',
      });
    }
    if (changedProperties.has('offset')) {
      this.style.setProperty(
        '--_swc-tooltip-animation-distance',
        `${this.offset}px`
      );
    }
    if (
      changedProperties.has('open') ||
      changedProperties.has('labeling') ||
      changedProperties.has('for') ||
      changedProperties.has('triggerElement')
    ) {
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
        // Register Escape handling only while open; removed on close below.
        document.addEventListener('keydown', this.handleKeyDown);
        // Set actual-placement to the declared side synchronously, before
        // showPopover(). @starting-style is evaluated by the browser the moment
        // the popover enters the top layer, so the direction-bearing attribute
        // must already be present or the entrance animation has no direction to
        // animate from. PlacementController writes actual-placement again from
        // onPlacementChange, but that is async (it awaits document.fonts.ready),
        // so it lands after showPopover() — too late for @starting-style. The
        // popover is display:none until shown and therefore unmeasurable, so a
        // viewport flip cannot be known here; on a flip the resolved side
        // arrives from onPlacementChange and the slide direction corrects then.
        this.setDeclaredActualPlacement();
        this.startPlacement();
        if (this.open !== this.isPopoverOpen) {
          this.showPopover();
        }
      } else {
        document.removeEventListener('keydown', this.handleKeyDown);
        if (this.open !== this.isPopoverOpen) {
          this.hidePopover();
        }
        // Stop autoUpdate immediately so positioning stops tracking the trigger
        // during the exit transition. clearPositioningState() runs after the
        // transition completes via dispatchAfterEvent.
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
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('beforetoggle', this.handleBeforeToggle);
    this.removeEventListener('toggle', this.handleToggle);
    this.removeEventListener('transitionend', this.handleTransitionEnd);
    // Defensive: the keydown listener is normally removed on close, but a
    // tooltip disconnected while open would still have it registered.
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.afterEventFallbackTimer !== null) {
      clearTimeout(this.afterEventFallbackTimer);
      this.afterEventFallbackTimer = null;
    }
    // If the tooltip is removed while open, the trigger would otherwise retain a
    // reference to this now-detached node in its ARIA element arrays.
    this.clearAriaRelationship();
  }
}

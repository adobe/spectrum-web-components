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
import {
  CSSResultArray,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';

import {
  ToastContainerBase,
  ToastQueue,
  type ToastQueueEntry,
} from '@adobe/spectrum-wc-core/components/toast-container/index.js';

import '../action-button/swc-action-button.js';
import './swc-toast.js';

import { uniqueId } from '../../utils/id.js';
import type { Toast } from './Toast.js';

import styles from './toast-container.css';

// Only the layers nearest the front toast show, however many are queued. One
// more renders fully transparent, so a layer can fade in or out of the stack.
const VISIBLE_LAYER_COUNT = 2;

// RSP S2 runs every move as one 400ms view transition on the default `ease` curve. `animation-duration-800`
// matches the duration; no Spectrum easing token matches `ease`.
const MOVE_DURATION = 400;
const MOVE_EASING = 'ease';

// As in RSP S2, Show all fades out faster than the toast moves when expanding, and slower when
// collapsing, so it never seems to overlap the moving message.
const SHOW_ALL_OUT_DURATION = 300;
const SHOW_ALL_IN_DURATION = 600;

// Match the stylesheet's stack depth: `perspective: 80px`, with each layer `spacing-200` further back.
const PERSPECTIVE = 80;
const LAYER_DEPTH = 12;

// A new toast slides in from this far past its own size, as in RSP S2 (`spacing-200`).
const SLIDE_GAP = 12;

// The Clear all and Collapse controls start (expanding) or end (collapsing) this much larger, past the stack.
const CONTROLS_ZOOM = 1.2;
const CONTROLS_GAP = 12;

// The front toast's parts that move on their own while its background changes size.
const FRONT_PARTS = [
  '.swc-Toast-body',
  '.swc-Toast-action',
  '.swc-Toast-close',
];

// The inline styles that take a toast out of the layout; see `pinAt()`.
const PIN_PROPERTIES = [
  'position',
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height',
  'margin',
  'z-index',
];

// One toast's move between a listed box and a layer: its box, in viewport coordinates, at the start and the end.
interface ListMove {
  toast: Toast;
  from: DOMRect;
  to: DOMRect;
  // Opacity of the whole toast, for one that leaves or joins the visible stack.
  fade?: [number, number];
  // Opacity of the toast's content, which a layer does not have.
  contentFade?: [number, number];
}

// The front toast's background and parts, in viewport coordinates.
interface FrontBoxes {
  surface: DOMRect;
  parts: Map<string, DOMRect>;
  showAll?: DOMRect;
}

// Where the old front toast and the region were before a new toast took the front.
interface FrontChange {
  key: string;
  toast: DOMRect;
  region: DOMRect;
}

// A new front toast: sliding in, growing out of its layer, or joining the expanded list.
interface Arrival {
  toast: Toast;
  kind: 'enter' | 'promote' | 'list';
}

const nextFrame = (): Promise<void> =>
  new Promise((resolve) => requestAnimationFrame(() => resolve()));

/**
 * Renders queued notifications in a named region: the front toast with a
 * stack behind it, or every toast in a modal list while expanded.
 *
 * @element swc-toast-container
 * @since 2.0.0
 */
export class ToastContainer extends ToastContainerBase {
  // ────────────────────
  //     API OVERRIDES
  // ────────────────────

  protected override get currentToast(): Toast | undefined {
    const key = this.frontEntry?.key;
    return key ? this._toasts.get(key) : undefined;
  }

  protected override get renderedToasts(): ReadonlyMap<string, Toast> {
    return this._toasts;
  }

  protected override get region(): HTMLElement | undefined {
    return (
      this.renderRoot.querySelector<HTMLElement>('.swc-ToastContainer') ??
      undefined
    );
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  // The toast elements to render, by queue key, in queue order: the front toast and any
  // toast still leaving, or every toast in the expanded view.
  private _toasts = new Map<string, Toast>();
  private _shownKey?: string;
  // Whether another top-layer element covered the region when the front toast changed.
  // Measured then, while the old front toast still filled the region.
  private _reshow = false;
  // The stack keeps this width until the new front toast's message renders and it starts to move.
  private _heldInlineSize?: number;
  // Where the front toast and the layers were before expanding.
  private _expandFrom?: { front?: FrontBoxes; positions: Map<string, DOMRect> };
  // True while the expanded view animates out, before it closes.
  private _collapsing = false;
  // The collapse holds each toast at its last frame until the stack takes over.
  private _collapseAnimations: Animation[] = [];
  // The front toast whose Show all is fading out after expanding, and that fade.
  private _showAllFading?: Toast;
  private _showAllFade?: Animation;
  // A new front toast, which stays transparent until its message renders and it starts to move.
  private _arrival?: Arrival;
  private _frontChange?: FrontChange;
  // Old front toasts that a new toast pushed back, shrinking into their layers as their content fades.
  private _ghosts = new Map<string, Toast>();
  // A promoted toast's layer, kept until the toast grows out of it.
  private _ghostLayer?: ToastQueueEntry;
  // While expanded: toasts that started closing in this update, and where every toast was before.
  private _leaving: Toast[] = [];
  private _listOrigins?: Map<string, DOMRect>;
  // True for the first collapsed render after the expanded view closes: the layers are already
  // where the collapsing toasts left off, so they do not recede from the front again.
  private _settledLayers = false;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override disconnectedCallback(): void {
    this.releaseHeldSize();
    super.disconnectedCallback();
  }

  protected override expand(): void {
    // The expanded view lists every toast, so the old front toasts still shrinking into the stack go.
    for (const [key, ghost] of this._ghosts) {
      this.dropGhost(key, ghost);
    }
    const front = this.currentToast;
    this._expandFrom = {
      front: front?.open ? this.measureFront(front) : undefined,
      positions: this.measurePositions(),
    };
    // Show all stays while it fades out.
    if (front && !this.prefersReducedMotion()) {
      this._showAllFading = front;
    }
    super.expand();
  }

  protected override willChangeFront(): void {
    this._frontChange = undefined;
    const region = this.region;
    // Also when the last toast closes and no new front toast takes its place.
    const old = this._shownKey ? this._toasts.get(this._shownKey) : undefined;
    if (
      old &&
      this._shownKey &&
      !this.expanded &&
      ToastQueue.isClosing(this._shownKey)
    ) {
      this.pinLeaving(old);
    }
    if (
      !this.frontEntry ||
      this.expanded ||
      !region?.matches(':popover-open')
    ) {
      return;
    }
    const regionRect = region.getBoundingClientRect();
    this._heldInlineSize = regionRect.width;
    this._reshow = this.isCovered(region);
    this._frontChange =
      old?.open && this._shownKey
        ? {
            key: this._shownKey,
            toast: old.getBoundingClientRect(),
            region: regionRect,
          }
        : undefined;
  }

  /**
   * Animates the expanded view into the stack before it closes, in one
   * motion; see `animateOut()`. The stack that replaces the view then looks
   * the same, so nothing moves again.
   */
  protected override collapse(focusRegion: boolean): void {
    if (!this.expanded || this._collapsing) {
      return;
    }
    this._collapsing = true;
    void this.animateOut().finally(() => {
      this._collapsing = false;
      if (!this.expanded) {
        return;
      }
      // Cancelled in the same task as the swap below, so no frame shows the toasts back in the list.
      for (const animation of this._collapseAnimations) {
        animation.cancel();
      }
      this._collapseAnimations = [];
      const front = this.currentToast;
      if (front) {
        this.unpin(front);
        front.classList.remove('swc-ToastContainer-front');
      }
      this._settledLayers = true;
      super.collapse(focusRegion);
    });
  }

  protected override willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes);
    const entries = ToastQueue.entries;
    const front = this.frontEntry;
    const motion = !this.prefersReducedMotion();
    // Collapsed, only the front entry is a real toast; the layers behind it are empty (Q14).
    // A closing toast stays until its exit transition ends.
    // In queue order, so a leaving toast keeps its place in the DOM. Moving it
    // would restart its styles and cut its exit transition short.
    const shown = this.expanded
      ? entries
      : entries.filter(
          (entry) =>
            entry === front ||
            (ToastQueue.isClosing(entry.key) && this._toasts.has(entry.key))
        );
    // The old front toast, pushed back by a new one, shrinks into its layer instead of vanishing.
    const previous = this._shownKey;
    const pushedBack = previous ? this._toasts.get(previous) : undefined;
    if (
      motion &&
      !this.expanded &&
      pushedBack?.open &&
      previous &&
      previous !== front?.key &&
      !ToastQueue.isClosing(previous) &&
      entries.some((entry) => entry.key === previous)
    ) {
      pushedBack.inert = true;
      pushedBack.setAttribute('aria-hidden', 'true');
      this._ghosts.set(previous, pushedBack);
    }
    const toasts = new Map<string, Toast>();
    for (const entry of shown) {
      let toast = this._toasts.get(entry.key) ?? this._ghosts.get(entry.key);
      if (toast && this._ghosts.get(entry.key) === toast) {
        // Back at the front before its ghost finished: a new toast replaces it.
        toast = undefined;
      }
      if (!toast) {
        // Only the front toast announces. The others in the expanded list were announced when they were in front.
        toast = this.createToast(entry, entry === front);
        if (entry === front) {
          let kind: Arrival['kind'] = 'enter';
          if (this.expanded) {
            kind = 'list';
          } else if (this.hasLayer(entry.key)) {
            kind = 'promote';
            if (motion) {
              this._ghostLayer = entry;
            }
          }
          this._arrival = { toast, kind };
        }
      }
      toasts.set(entry.key, toast);
    }
    // Measured while the closing toast still holds its place in the list.
    const leaving = this.expanded
      ? [...this._toasts].filter(
          ([key, toast]) =>
            ToastQueue.isClosing(key) &&
            toasts.has(key) &&
            toast.style.position !== 'absolute'
        )
      : [];
    if (leaving.length > 0) {
      this._leaving = leaving.map(([, toast]) => toast);
      this._listOrigins = this.measurePositions();
    }
    this._toasts = toasts;
    for (const [key, toast] of toasts) {
      // A toast pushed back from the front stops being a live region. The reverse is never done:
      // giving an existing toast `role="alert"` can make screen readers announce it again.
      if (key !== front?.key && toast.announces) {
        toast.announces = false;
        toast.requestUpdate();
      }
      const fading = toast === this._showAllFading;
      // While collapsing, the front toast already takes its stack shape.
      const stacked =
        (!this.expanded || this._collapsing) &&
        key === front?.key &&
        this.layerEntries.length > 0;
      toast.showAllLabel = stacked || fading ? this.showAllLabel : undefined;
      toast.showAllLeaving = fading && !stacked;
      // The list opens away from the anchored edge.
      toast.showAllDirection = this.placement.startsWith('top') ? 'down' : 'up';
    }
  }

  protected override updated(changes: PropertyValues): void {
    const region = this.region;
    const frontKey = this.frontEntry?.key;
    // The expanded view is a modal dialog, which the base class shows.
    if (region && !this.expanded) {
      // Re-showing moves the region to the end of the top layer, above anything opened since.
      // It sets `display: none` for a moment, which cuts any motion short, so it runs only when
      // something actually covers the region.
      if (
        region.matches(':popover-open') &&
        this._shownKey !== frontKey &&
        this._reshow
      ) {
        region.hidePopover();
      }
      if (!region.matches(':popover-open')) {
        region.showPopover();
      }
    }
    this._shownKey = region && !this.expanded ? frontKey : undefined;
    this._reshow = false;
    // The base class opens the toasts, so the surface must be shown first (a hidden popover is display: none).
    super.updated(changes);
    const expandFrom = this._expandFrom;
    this._expandFrom = undefined;
    if (expandFrom && changes.has('expanded') && this.expanded) {
      if (this.prefersReducedMotion()) {
        this._showAllFading = undefined;
      } else {
        void this.expandFrom(expandFrom);
      }
    }
    const frontChange = this._frontChange;
    this._frontChange = undefined;
    const ghost = frontChange ? this._ghosts.get(frontChange.key) : undefined;
    if (ghost && frontChange && !ghost.style.position) {
      this.pinAt(ghost, frontChange.toast, 0);
    }
    const arrival = this._arrival;
    this._arrival = undefined;
    if (arrival) {
      // Hidden while its message is not yet rendered, so the empty toast is never painted.
      arrival.toast.style.opacity = '0';
      void this.arrive(arrival, frontChange);
    }
    if (this._leaving.length > 0) {
      this.closeInList(this._leaving, this._listOrigins);
      this._leaving = [];
      this._listOrigins = undefined;
    }
    if (this._settledLayers && !this.expanded) {
      // Layers created from here on recede from the front as usual.
      requestAnimationFrame(() => {
        this._settledLayers = false;
        this.requestUpdate();
      });
    }
  }

  protected override render(): TemplateResult | typeof nothing {
    if (this._toasts.size === 0) {
      return nothing;
    }
    return this.expanded ? this.renderExpanded() : this.renderCollapsed();
  }

  private createToast(entry: ToastQueueEntry, announces: boolean): Toast {
    const toast = this.ownerDocument.createElement('swc-toast');
    toast.announces = announces;
    toast.variant = entry.variant ?? 'neutral';
    toast.iconLabel = entry.iconLabel;
    toast.closeLabel = entry.closeLabel;
    toast.actionLabel = entry.actionLabel;
    toast.timeout = entry.timeout ?? null;
    const message = this.ownerDocument.createElement('span');
    message.id = uniqueId('toast-message');
    message.textContent = entry.message;
    toast.append(message);
    return toast;
  }

  private renderCollapsed(): TemplateResult {
    // A promoted toast's layer stays until the toast grows out of it.
    const layers = [
      ...(this._ghostLayer ? [this._ghostLayer] : []),
      ...this.layerEntries,
    ].slice(0, VISIBLE_LAYER_COUNT + 1);
    return html`
      <div
        class=${classMap({
          ['swc-ToastContainer']: true,
          [`swc-ToastContainer--${this.placement}`]: true,
          ['swc-ToastContainer--stacked']: layers.length > 0,
          ['swc-ToastContainer--settled']: this._settledLayers,
        })}
        role="region"
        popover="manual"
        tabindex="-1"
        aria-label=${this.getRegionLabel(ToastQueue.entries.length)}
        style=${styleMap({
          'min-inline-size':
            this._heldInlineSize === undefined
              ? undefined
              : `${this._heldInlineSize}px`,
        })}
        @click=${this.handleRegionClick}
        @pointerenter=${this.handlePointerEnter}
        @pointerleave=${this.handlePointerLeave}
        @pointerdown=${this.handlePointerDown}
        @keydown=${this.handleKeyDown}
        @focusin=${this.handleFocusIn}
        @focusout=${this.handleFocusOut}
        @swc-close=${this.handleClose}
        @swc-after-close=${this.handleAfterClose}
        @swc-toast-action=${this.handleAction}
        @swc-toast-expand=${this.handleExpand}
        @swc-after-open=${this.handleAfterOpen}
      >
        ${repeat(
          layers,
          (entry) => entry.key,
          (entry, index) => html`
            <div
              class=${classMap({
                ['swc-ToastContainer-layer']: true,
                [`swc-ToastContainer-layer--${entry.variant}`]:
                  entry.variant != null && entry.variant !== 'neutral',
              })}
              role="presentation"
              data-key=${entry.key}
              style=${styleMap({
                '--_swc-toast-container-layer-index': index + 1,
              })}
            ></div>
          `
        )}
        ${repeat(
          this._ghosts,
          ([key]) => key,
          ([, toast]) => toast
        )}
        ${repeat(
          this._toasts,
          ([key]) => key,
          ([, toast]) => toast
        )}
      </div>
    `;
  }

  private renderExpanded(): TemplateResult {
    return html`
      <dialog
        class=${classMap({
          ['swc-ToastContainer']: true,
          [`swc-ToastContainer--${this.placement}`]: true,
          ['swc-ToastContainer--expanded']: true,
          ['swc-ToastContainer--collapsing']: this._collapsing,
        })}
        aria-label=${this.getRegionLabel(ToastQueue.entries.length)}
        @cancel=${this.handleCancel}
        @close=${this.handleDialogClose}
        @pointerdown=${this.handleDialogPointerDown}
        @keydown=${this.handleKeyDown}
        @focusin=${this.handleFocusIn}
        @focusout=${this.handleFocusOut}
        @swc-close=${this.handleClose}
        @swc-after-close=${this.handleAfterClose}
        @swc-toast-action=${this.handleAction}
      >
        <div class="swc-ToastContainer-list">
          ${repeat(
            this._toasts,
            ([key]) => key,
            ([, toast]) => toast
          )}
        </div>
        <div class="swc-ToastContainer-controls">
          <swc-action-button size="s" @click=${this.handleClearAllClick}>
            ${this.clearAllLabel}
          </swc-action-button>
          <swc-action-button size="s" @click=${this.handleCollapseClick}>
            ${this.collapseLabel}
          </swc-action-button>
        </div>
      </dialog>
    `;
  }

  private readonly handleAfterOpen = (event: Event): void => {
    // A fallback in case the front toast's arrival never starts its motion.
    if (event.target === this.currentToast) {
      this.releaseHeldSize();
    }
  };

  private releaseHeldSize(): void {
    if (this._heldInlineSize !== undefined) {
      this._heldInlineSize = undefined;
      this.requestUpdate();
    }
  }

  // Only another top-layer element can cover the region, so a hit test at its center finds one.
  private isCovered(region: HTMLElement): boolean {
    const rect = region.getBoundingClientRect();
    const hit = this.ownerDocument.elementFromPoint(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );
    return Boolean(hit) && hit !== this;
  }

  private measurePositions(): Map<string, DOMRect> {
    const positions = new Map<string, DOMRect>();
    for (const [key, toast] of this._toasts) {
      positions.set(key, toast.getBoundingClientRect());
    }
    for (const layer of this.renderRoot.querySelectorAll<HTMLElement>(
      '.swc-ToastContainer-layer'
    )) {
      if (layer.dataset.key) {
        positions.set(layer.dataset.key, layer.getBoundingClientRect());
      }
    }
    return positions;
  }

  private hasLayer(key: string): boolean {
    return [
      ...this.renderRoot.querySelectorAll<HTMLElement>(
        '.swc-ToastContainer-layer'
      ),
    ].some((layer) => layer.dataset.key === key);
  }

  private get controls(): HTMLElement | null {
    return this.renderRoot.querySelector<HTMLElement>(
      '.swc-ToastContainer-controls'
    );
  }

  // ──────────────
  //     MOTION
  // ──────────────

  /**
   * Fades the scrim and the controls, and in one motion moves the view into
   * the stack: the front toast takes its stack box with Show all, its
   * background changing size while its parts move, and the toasts behind it
   * shrink into their layers as their content fades. Resolves when the
   * motion ends.
   */
  private async animateOut(): Promise<void> {
    const front = this.currentToast;
    const origins = this.measurePositions();
    const frontFrom = front?.open ? this.measureFront(front) : undefined;
    const controlsFrom = this.controls?.getBoundingClientRect();
    this.stopShowAllFade();
    this.requestUpdate();
    await this.updateComplete;
    await front?.updateComplete;
    const animations: Animation[] = [];
    if (front && frontFrom && !this.prefersReducedMotion()) {
      const count = this._toasts.size;
      if (this.layerEntries.length > 0) {
        front.classList.add('swc-ToastContainer-front');
      }
      const stack = this.pinAt(front, this.stackRect(front), count + 2);
      animations.push(...this.morphFront(front, frontFrom));
      this.fadeShowAllIn(front);
      // A layer is as tall as the toast's minimum height, which the toast's surface carries.
      const layerHeight =
        parseFloat(
          getComputedStyle(
            front.shadowRoot?.querySelector('.swc-Toast') ?? front
          ).minBlockSize
        ) || stack.height;
      const moves: ListMove[] = [];
      let depth = 0;
      for (const [key, toast] of this._toasts) {
        const from = origins.get(key);
        if (toast === front || !toast.open || !from) {
          continue;
        }
        depth += 1;
        moves.push({
          toast,
          from,
          to: this.layerRect(stack, layerHeight, depth),
          fade: [1, depth > VISIBLE_LAYER_COUNT ? 0 : 1],
          contentFade: [1, 0],
        });
      }
      animations.push(...this.moveList(moves, 'forwards'));
      const controls = this.controls;
      if (controls && controlsFrom) {
        animations.push(
          this.moveControls(controls, stack, 'out', count + 1, controlsFrom)
        );
      }
    }
    this._collapseAnimations = animations;
    // Lets the class change start the CSS transitions before collecting them.
    await nextFrame();
    // Capped, so an animation that never finishes (paused, for example) cannot leave the view
    // open with its controls ignoring the pointer.
    await Promise.race([
      Promise.all(
        [...animations, ...(this.shadowRoot?.getAnimations() ?? [])].map(
          (animation) => animation.finished.catch(() => undefined)
        )
      ),
      new Promise((resolve) => setTimeout(resolve, MOVE_DURATION * 2)),
    ]);
  }

  /**
   * Moves every listed toast out of the stack in one motion: the front
   * toast's background grows from its stack box while its parts move and Show
   * all fades out in place; the other toasts grow out of their layers as their
   * content fades in, and any deeper toast from the deepest layer.
   */
  private async expandFrom({
    front: frontFrom,
    positions,
  }: {
    front?: FrontBoxes;
    positions: Map<string, DOMRect>;
  }): Promise<void> {
    // The listed toasts open, and the front toast's Show all leaves the layout, in their own updates.
    for (let pass = 0; pass < 3; pass++) {
      await Promise.all(
        [...this._toasts.values()].map((toast) => toast.updateComplete)
      );
      if ([...this._toasts.values()].every((toast) => toast.open)) {
        break;
      }
      await nextFrame();
    }
    if (!this.expanded) {
      return;
    }
    const front = this.currentToast;
    const count = this._toasts.size;
    const known = [...positions.values()];
    const deepest = known[known.length - 1];
    const moves: ListMove[] = [];
    for (const [key, toast] of this._toasts) {
      const to = toast.getBoundingClientRect();
      if (toast === front || !toast.open || to.width === 0) {
        continue;
      }
      const from = positions.get(key);
      moves.push(
        from
          ? { toast, from, to, contentFade: [0, 1] }
          : { toast, from: deepest ?? to, to, fade: [0, 1] }
      );
    }
    this.moveList(moves, 'none');
    if (front && frontFrom) {
      this.morphFront(front, frontFrom);
      front.animate([{ zIndex: count + 2 }, { zIndex: count + 2 }], {
        duration: MOVE_DURATION,
      });
      if (frontFrom.showAll) {
        this.fadeShowAllOut(front, frontFrom.showAll);
      } else {
        this.stopShowAllFade();
      }
      const controls = this.controls;
      if (controls) {
        this.moveControls(controls, frontFrom.surface, 'in', count + 1);
      }
    }
  }

  /** The front toast's background and parts, in viewport coordinates. */
  private measureFront(toast: Toast): FrontBoxes {
    const root = toast.shadowRoot;
    const rectOf = (selector: string): DOMRect | undefined =>
      root?.querySelector(selector)?.getBoundingClientRect();
    const parts = new Map<string, DOMRect>();
    for (const selector of FRONT_PARTS) {
      const rect = rectOf(selector);
      if (rect && rect.width > 0) {
        parts.set(selector, rect);
      }
    }
    return {
      surface: rectOf('.swc-Toast') ?? toast.getBoundingClientRect(),
      parts,
      showAll: rectOf('.swc-Toast-showAll'),
    };
  }

  /**
   * Moves the front toast from `from` to its layout now, as RSP S2 does: only
   * its background changes size, and the message, the action, and the close
   * button each move on their own, so the text never rewraps.
   */
  private morphFront(toast: Toast, from: FrontBoxes): Animation[] {
    const root = toast.shadowRoot;
    const surface = root?.querySelector<HTMLElement>('.swc-Toast');
    const to = surface?.getBoundingClientRect();
    if (!root || !surface || !to || to.width === 0) {
      return [];
    }
    const options = { duration: MOVE_DURATION, easing: MOVE_EASING };
    const start = from.surface;
    const animations = [
      surface.animate(
        [
          {
            top: `${start.top - to.top}px`,
            right: `${to.right - start.right}px`,
            bottom: `${to.bottom - start.bottom}px`,
            left: `${start.left - to.left}px`,
          },
          { top: '0px', right: '0px', bottom: '0px', left: '0px' },
        ],
        { ...options, pseudoElement: '::before' }
      ),
    ];
    for (const [selector, rect] of from.parts) {
      const part = root.querySelector<HTMLElement>(selector);
      const now = part?.getBoundingClientRect();
      if (!part || !now || now.width === 0) {
        continue;
      }
      const dx = rect.left - now.left;
      const dy = rect.top - now.top;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        continue;
      }
      animations.push(
        part.animate(
          [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }],
          options
        )
      );
    }
    return animations;
  }

  /** Fades the toast's content, but not its background. */
  private fadeContent(
    toast: Toast,
    [from, to]: [number, number],
    fill: FillMode = 'none'
  ): Animation[] {
    return [
      ...(toast.shadowRoot?.querySelectorAll<HTMLElement>(
        '.swc-Toast > :not(.swc-Toast-footer--leaving)'
      ) ?? []),
    ].map((part) =>
      part.animate([{ opacity: from }, { opacity: to }], {
        duration: MOVE_DURATION,
        easing: MOVE_EASING,
        fill,
      })
    );
  }

  /** Keeps Show all where it was, out of the layout, while it fades out; then drops it. */
  private fadeShowAllOut(toast: Toast, from: DOMRect): void {
    const showAll = toast.shadowRoot?.querySelector<HTMLElement>(
      '.swc-Toast-footer--leaving .swc-Toast-showAll'
    );
    const now = showAll?.getBoundingClientRect();
    if (!showAll || !now) {
      this.stopShowAllFade();
      return;
    }
    const transform = `translate(${from.left - now.left}px, ${from.top - now.top}px)`;
    const fade = showAll.animate(
      [
        { transform, opacity: 1 },
        { transform, opacity: 0 },
      ],
      { duration: SHOW_ALL_OUT_DURATION, easing: MOVE_EASING, fill: 'forwards' }
    );
    this._showAllFade = fade;
    void fade.finished
      .then(() => {
        if (this._showAllFade === fade) {
          this.stopShowAllFade();
        }
      })
      .catch(() => undefined);
  }

  private fadeShowAllIn(toast: Toast): void {
    toast.shadowRoot
      ?.querySelector('.swc-Toast-showAll')
      ?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: SHOW_ALL_IN_DURATION,
        easing: MOVE_EASING,
      });
  }

  private stopShowAllFade(): void {
    const fade = this._showAllFade;
    this._showAllFade = undefined;
    if (this._showAllFading) {
      this._showAllFading = undefined;
      this.requestUpdate();
    }
    fade?.cancel();
  }

  /**
   * Moves listed toasts between their list boxes and layers. A toast zooms
   * to the box's width and is cropped to its height, keeping its top, so its
   * text never rewraps, as in RSP S2. Nearer the front paints higher, as in
   * the stack; in DOM order, the oldest toast would paint over the others.
   */
  private moveList(moves: ListMove[], fill: FillMode): Animation[] {
    const list = this.region?.querySelector<HTMLElement>(
      '.swc-ToastContainer-list'
    );
    const animations: Animation[] = [];
    moves.forEach(({ toast, from, to, fade, contentFade }, index) => {
      const animation = this.zoomBetween(
        toast,
        from,
        to,
        moves.length - index,
        fill,
        fade
      );
      if (animation) {
        animations.push(animation);
      }
      if (contentFade) {
        animations.push(...this.fadeContent(toast, contentFade, fill));
      }
    });
    if (list && animations.length > 0) {
      // The toasts start or end outside the list, which would otherwise clip them.
      animations.push(
        list.animate([{ overflow: 'visible' }, { overflow: 'visible' }], {
          duration: MOVE_DURATION,
          fill,
        })
      );
    }
    return animations;
  }

  /** Moves a toast from one box to another, zoomed to each box's width and cropped to its height. */
  private zoomBetween(
    toast: Toast,
    from: DOMRect,
    to: DOMRect,
    zIndex: number,
    fill: FillMode,
    fade?: [number, number]
  ): Animation | undefined {
    const layout = toast.getBoundingClientRect();
    if (layout.width === 0) {
      return undefined;
    }
    const rtl = getComputedStyle(this).direction === 'rtl';
    const radius = this.cornerRadius(toast);
    const frame = (rect: DOMRect, opacity?: number): Keyframe => {
      const scale = rect.width / layout.width;
      const crop = Math.max(0, layout.height - rect.height / scale);
      const x = rtl ? rect.right - layout.right : rect.left - layout.left;
      return {
        transform: `translate(${x}px, ${rect.top - layout.top}px) scale(${scale})`,
        transformOrigin: rtl ? 'top right' : 'top left',
        clipPath: `inset(0 0 ${crop}px 0 round ${radius}px)`,
        zIndex: String(zIndex),
        ...(opacity === undefined ? {} : { opacity }),
      };
    };
    return toast.animate([frame(from, fade?.[0]), frame(to, fade?.[1])], {
      duration: MOVE_DURATION,
      easing: MOVE_EASING,
      fill,
    });
  }

  /**
   * Zooms the Clear all and Collapse controls in from just past the stack, or
   * back toward it. They paint above the toasts behind the front one.
   */
  private moveControls(
    controls: HTMLElement,
    stack: DOMRect,
    direction: 'in' | 'out',
    zIndex: number,
    from?: DOMRect
  ): Animation {
    const now = controls.getBoundingClientRect();
    const anchoredTop = this.placement.startsWith('top');
    const rtl = getComputedStyle(this).direction === 'rtl';
    const x = rtl ? stack.left - now.left : stack.right - now.right;
    const top = anchoredTop
      ? stack.bottom + CONTROLS_GAP
      : stack.top - CONTROLS_GAP - now.height;
    const zoomed: Keyframe = {
      transform: `translate(${x}px, ${top - now.top}px) scale(${CONTROLS_ZOOM})`,
      zIndex: String(zIndex),
    };
    // Where the controls were before the front toast left the list, which moves them.
    const inPlace: Keyframe = {
      transform: from
        ? `translate(${from.left - now.left}px, ${from.top - now.top}px)`
        : 'none',
      zIndex: String(zIndex),
    };
    return controls.animate(
      direction === 'in' ? [zoomed, inPlace] : [inPlace, zoomed],
      {
        duration: MOVE_DURATION,
        easing: MOVE_EASING,
        fill: direction === 'out' ? 'forwards' : 'none',
      }
    );
  }

  private cornerRadius(toast: Toast): number {
    const surface = toast.shadowRoot?.querySelector('.swc-Toast');
    return surface
      ? parseFloat(getComputedStyle(surface).borderStartStartRadius) || 0
      : 0;
  }

  /**
   * Where the front toast lands in the stack: as wide as its own content with
   * Show all, rather than the widest listed toast, against the anchored edge.
   */
  private stackRect(front: Toast): DOMRect {
    const now = front.getBoundingClientRect();
    front.style.setProperty('inline-size', 'max-content');
    const { width, height } = front.getBoundingClientRect();
    front.style.removeProperty('inline-size');
    if (!front.getAttribute('style')) {
      front.removeAttribute('style');
    }
    const top = this.placement.startsWith('top')
      ? now.top
      : now.bottom - height;
    const rtl = getComputedStyle(this).direction === 'rtl';
    let left = now.left + (now.width - width) / 2;
    if (this.placement.endsWith('end')) {
      left = rtl ? now.left : now.right - width;
    }
    return new DOMRect(left, top, width, height);
  }

  /**
   * Where a layer appears in the stack: a box as wide as the front toast and
   * `height` tall at its edge away from the anchor, pushed back along Z, as
   * projected from the stack's perspective origin.
   */
  private layerRect(front: DOMRect, height: number, depth: number): DOMRect {
    const peek =
      parseFloat(
        getComputedStyle(this.region ?? this).getPropertyValue(
          '--_swc-toast-container-peek-origin'
        )
      ) || 0;
    const scale = PERSPECTIVE / (PERSPECTIVE + LAYER_DEPTH * depth);
    const originX = front.left + front.width / 2;
    const anchoredTop = this.placement.startsWith('top');
    const originY = anchoredTop ? front.bottom + peek : front.top - peek;
    const top = anchoredTop ? front.bottom - height : front.top;
    return new DOMRect(
      originX + (front.left - originX) * scale,
      originY + (top - originY) * scale,
      front.width * scale,
      height * scale
    );
  }

  /**
   * Starts a new front toast's motion once its message renders, so it moves
   * at its final size. Until then it stays transparent, and the stack keeps
   * its width. A new toast slides in while the toast it pushed back shrinks
   * into its layer; a promoted toast grows out of its layer.
   */
  private async arrive(
    { toast, kind }: Arrival,
    frontChange?: FrontChange
  ): Promise<void> {
    const revealed = await this.whenRevealed(toast);
    const motion =
      revealed &&
      !this.prefersReducedMotion() &&
      toast === this.currentToast &&
      (kind === 'list') === this.expanded;
    const ghostLayer = this.measureGhostLayer();
    this._ghostLayer = undefined;
    this.releaseHeldSize();
    this.requestUpdate();
    await this.updateComplete;
    toast.style.removeProperty('opacity');
    const ghost = frontChange ? this._ghosts.get(frontChange.key) : undefined;
    if (!motion) {
      if (ghost && frontChange) {
        this.dropGhost(frontChange.key, ghost);
      }
      return;
    }
    if (kind === 'list') {
      toast.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: MOVE_DURATION,
        easing: MOVE_EASING,
      });
      return;
    }
    if (kind === 'promote' && ghostLayer) {
      this.morphFront(toast, { surface: ghostLayer, parts: new Map() });
      this.fadeContent(toast, [0, 1]);
    } else {
      this.slideIn(toast);
    }
    if (frontChange) {
      this.recede(frontChange, ghost);
    }
  }

  /** Waits for the toast to open and, for a toast that announces, for its message to render. */
  private async whenRevealed(toast: Toast): Promise<boolean> {
    // The base class opens the toast a few microtasks after this update.
    for (let attempt = 0; attempt < 10 && !toast.open; attempt++) {
      await toast.updateComplete;
    }
    // The message renders two frames after the toast opens.
    for (
      let frame = 0;
      frame < 6 &&
      toast.open &&
      toast.announces &&
      !toast.shadowRoot?.querySelector('.swc-Toast-text');
      frame++
    ) {
      await nextFrame();
      await toast.updateComplete;
    }
    return toast.open && toast.isConnected;
  }

  private measureGhostLayer(): DOMRect | undefined {
    const key = this._ghostLayer?.key;
    return key
      ? [
          ...this.renderRoot.querySelectorAll<HTMLElement>(
            '.swc-ToastContainer-layer'
          ),
        ]
          .find((layer) => layer.dataset.key === key)
          ?.getBoundingClientRect()
      : undefined;
  }

  /**
   * Moves the layers from where they were before a new toast took the front,
   * measured from the anchored edge. The old front toast shrinks from its box
   * into its new layer while its content fades, and covers that layer until
   * it gets there; then the layer takes over.
   */
  private recede(
    { key, region: before }: FrontChange,
    ghost: Toast | undefined
  ): void {
    const region = this.region;
    if (!region) {
      return;
    }
    const anchoredTop = this.placement.startsWith('top');
    const now = region.getBoundingClientRect();
    const end = this.placement.endsWith('end');
    // The far edge's distance from the anchored edge; the layers sit at the far edge.
    const edge = anchoredTop ? 'insetBlockEnd' : 'insetBlockStart';
    const farEdge = anchoredTop
      ? `calc(100% - ${before.bottom - now.top}px)`
      : `calc(100% - ${now.bottom - before.top}px)`;
    const inline = end
      ? { insetInlineStart: `calc(100% - ${before.width}px)` }
      : {
          insetInlineStart: `calc(50% - ${before.width / 2}px)`,
          insetInlineEnd: `calc(50% - ${before.width / 2}px)`,
        };
    const options = { duration: MOVE_DURATION, easing: MOVE_EASING };
    let depth = 0;
    for (const layer of region.querySelectorAll<HTMLElement>(
      '.swc-ToastContainer-layer'
    )) {
      depth += 1;
      if (layer.dataset.key === key && ghost) {
        layer.animate([{ opacity: 0 }, { opacity: 0 }], options);
        const layerHeight = layer.offsetHeight;
        const animation = this.zoomBetween(
          ghost,
          ghost.getBoundingClientRect(),
          this.layerRect(now, layerHeight, depth),
          0,
          'forwards'
        );
        this.fadeContent(ghost, [1, 0], 'forwards');
        if (animation) {
          void animation.finished
            .then(() => this.dropGhost(key, ghost))
            .catch(() => this.dropGhost(key, ghost));
        } else {
          this.dropGhost(key, ghost);
        }
        continue;
      }
      layer.animate(
        [
          { [edge]: farEdge, ...inline },
          {
            [edge]: '0px',
            insetInlineStart: '0px',
            ...(end ? {} : { insetInlineEnd: '0px' }),
          },
        ],
        options
      );
    }
    if (ghost && !this.hasLayer(key)) {
      this.dropGhost(key, ghost);
    }
  }

  private dropGhost(key: string, ghost: Toast): void {
    if (this._ghosts.get(key) !== ghost) {
      return;
    }
    this._ghosts.delete(key);
    for (const animation of ghost.getAnimations({ subtree: true })) {
      animation.cancel();
    }
    this.requestUpdate();
  }

  /**
   * Slides a new front toast in from past the anchored edge, or from the end
   * edge at an end placement, as RSP S2 does.
   */
  private slideIn(toast: Toast): void {
    const away = `calc(100% + ${SLIDE_GAP}px)`;
    const back = `calc(-100% - ${SLIDE_GAP}px)`;
    const rtl = getComputedStyle(this).direction === 'rtl';
    let start = `0 ${this.placement.startsWith('top') ? back : away}`;
    if (this.placement.endsWith('end')) {
      start = `${rtl ? back : away} 0`;
    }
    toast.animate(
      [
        { translate: start, opacity: 0 },
        { translate: '0 0', opacity: 1 },
      ],
      { duration: MOVE_DURATION, easing: MOVE_EASING }
    );
  }

  private prefersReducedMotion(): boolean {
    return Boolean(
      this.ownerDocument.defaultView?.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
    );
  }

  /**
   * Keeps a closing toast at its width while it slides out of the stack. Out
   * of the layout, it would otherwise rewrap to fit the next toast's width.
   */
  private pinLeaving(toast: Toast): void {
    const width = toast.getBoundingClientRect().width;
    if (width === 0) {
      return;
    }
    toast.style.inlineSize = `${width}px`;
    // Centered (or at the end edge) in the region, even where it is wider than the region.
    toast.style.marginInline = this.placement.endsWith('end')
      ? `calc(100% - ${width}px) 0`
      : `calc((100% - ${width}px) / 2)`;
  }

  /**
   * Takes a toast out of the view's layout at `rect`, placed from the view's
   * edges that stay put while the view changes size: the anchored edge, and
   * the center or the end edge. Returns where it is now.
   */
  private pinAt(toast: Toast, rect: DOMRect, zIndex: number): DOMRect {
    const view = this.region;
    if (!view) {
      return rect;
    }
    const box = view.getBoundingClientRect();
    const rtl = getComputedStyle(this).direction === 'rtl';
    const block = this.placement.startsWith('top')
      ? { top: `${rect.top - box.top}px` }
      : { bottom: `${box.bottom - rect.bottom}px` };
    let inline: Record<string, string> = {
      left: `calc(50% + ${rect.left - (box.left + box.width / 2)}px)`,
    };
    if (this.placement.endsWith('end')) {
      inline = rtl
        ? { left: `${rect.left - box.left}px` }
        : { right: `${box.right - rect.right}px` };
    }
    Object.assign(toast.style, {
      position: 'absolute',
      ...block,
      ...inline,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      margin: '0',
      zIndex: String(zIndex),
    });
    return toast.getBoundingClientRect();
  }

  private unpin(toast: Toast): void {
    for (const property of PIN_PROPERTIES) {
      toast.style.removeProperty(property);
    }
  }

  /**
   * Takes a toast that starts closing in the expanded list out of the layout,
   * where it is, so it slides out over the list while the toasts around it
   * move into its place, as in RSP S2.
   */
  private closeInList(
    leaving: Toast[],
    origins: Map<string, DOMRect> | undefined
  ): void {
    for (const toast of leaving) {
      const rect = toast.getBoundingClientRect();
      if (rect.width > 0) {
        this.pinAt(toast, rect, 1);
      }
    }
    if (!origins || this.prefersReducedMotion()) {
      return;
    }
    for (const [key, toast] of this._toasts) {
      const from = origins.get(key);
      if (!from || leaving.includes(toast) || !toast.open) {
        continue;
      }
      const dy = from.top - toast.getBoundingClientRect().top;
      if (Math.abs(dy) < 0.5) {
        continue;
      }
      toast.animate(
        [{ transform: `translateY(${dy}px)` }, { transform: 'none' }],
        { duration: MOVE_DURATION, easing: MOVE_EASING }
      );
    }
  }
}

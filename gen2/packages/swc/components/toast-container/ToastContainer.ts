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

// The controls' zoom at the front toast's edge. A fixed design value, not derived from layout, so the
// motion is the same for any message length; design can tune it. It sits between no zoom and the
// zoom in RSP S2's demo, where view transitions stretch the controls to the stacked toast's width.
const CONTROLS_ZOOM = 1.15;

// A new toast slides in from this far past its own size, as in RSP S2 (`spacing-200`).
const SLIDE_GAP = 12;

// Keyframes along a cropped zoom, so the box it shows moves one way.
const ZOOM_STEPS = 8;

// Room outside a zoomed toast's box for its drop shadow, which its crop would otherwise cut off.
const SHADOW_ROOM = 24;

// The front toast's parts that move on their own while its background changes size.
const FRONT_PARTS = [
  '.swc-Toast-body',
  '.swc-Toast-action',
  '.swc-Toast-close',
];

// The stack's perspective origin, past its far edge: at rest, and while hovered. Match the stylesheet.
const PEEK_ORIGIN = 55;
const PEEK_ORIGIN_HOVER = 95;

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
  // The toast's drop shadow, as `filter` values: a layer's elevated shadow, or none in the list.
  shadow?: [string, string];
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

// Every listed toast's background and parts, and the controls, before the expanded list changes.
interface ListBefore {
  toasts: Map<Toast, FrontBoxes>;
  controls?: DOMRect;
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
  private _heldBlockSize?: number;
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
  // The layers shown last, and the ones held while a new front toast waits for its message, so
  // the stack changes depth on the frame the rest of the motion starts.
  private _renderedLayers: readonly ToastQueueEntry[] = [];
  private _heldLayers?: readonly ToastQueueEntry[];
  // The layers that fade out with the front toast when the queue is cleared.
  private _fadingLayers?: readonly ToastQueueEntry[];
  // True while `clear()` closes the rendered toasts: they fade out without sliding.
  private _clearing = false;
  // True while the emptied expanded view fades out before it closes.
  private _emptying = false;
  // While expanded: toasts that started closing in this update, and the list before it changed.
  private _leaving: Toast[] = [];
  private _listBefore?: ListBefore;
  // Where the pointer is over the expanded view, so a collapse knows whether it lands on a hovered stack.
  private _pointer?: { x: number; y: number };
  // Holds the hovered stack's peek after a collapse that lands under the pointer, until the pointer leaves.
  private _peekHeld = false;
  private _showAllIn?: Animation;
  // The stacked toasts' elevated drop shadow, as a `filter` value, read from the stack before expanding.
  private _elevatedFilter = 'none';
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
    if (front) {
      this._elevatedFilter = getComputedStyle(front).filter;
      front.showAllHovered = Boolean(
        front.shadowRoot?.querySelector('.swc-Toast-showAll')?.matches(':hover')
      );
    }
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
    // Measured before the closing toast is pinned: its pinned margins would collapse the stack's width.
    const regionRect = region?.getBoundingClientRect();
    // Also when the last toast closes and no new front toast takes its place.
    const old = this._shownKey ? this._toasts.get(this._shownKey) : undefined;
    const oldRect = old?.getBoundingClientRect();
    if (
      old &&
      this._shownKey &&
      !this.expanded &&
      ToastQueue.isClosing(this._shownKey)
    ) {
      this.pinLeaving(old);
    }
    if (this.expanded || !region?.matches(':popover-open') || !regionRect) {
      return;
    }
    if (!this.frontEntry) {
      // Clear all fades the layers out with the front toast, which leaves the layout, so the stack
      // keeps its size until they are gone.
      if (this._shownKey && ToastQueue.isClearing(this._shownKey)) {
        this._heldInlineSize = regionRect.width;
        this._heldBlockSize = regionRect.height;
      }
      return;
    }
    this._heldInlineSize = regionRect.width;
    this._heldBlockSize = regionRect.height;
    this._reshow = this.isCovered(region);
    // On every front change, closes included: the layers move from where they were. A toast that
    // closed has already set `open` to false, so that is not checked here.
    this._frontChange =
      oldRect && this._shownKey
        ? { key: this._shownKey, toast: oldRect, region: regionRect }
        : undefined;
  }

  /**
   * Animates the expanded view into the stack before it closes, in one
   * motion; see `animateOut()`. The stack that replaces the view then looks
   * the same, so nothing moves again.
   */
  protected override collapse(focusRegion: boolean): void {
    if (!this.expanded || this._collapsing || this._emptying) {
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
      this.region?.style.removeProperty('inline-size');
      const front = this.currentToast;
      if (front) {
        this.unpin(front);
        front.classList.remove('swc-ToastContainer-front');
      }
      this._settledLayers = true;
      super.collapse(focusRegion);
      void this.keepShowAllFading();
    });
  }

  /**
   * Fades the emptied expanded view out (the scrim, the controls, and the
   * toasts' own exits) before it closes, as RSP S2 does for Clear all.
   */
  protected override closeEmptyView(): void {
    if (this._emptying) {
      return;
    }
    this._emptying = true;
    void this.fadeOutView().finally(() => {
      this._emptying = false;
      this.requestUpdate();
      this.finishEmptyView();
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
          }
          if (kind !== 'list' && motion) {
            this._heldLayers ??= this._renderedLayers;
          }
          this._arrival = { toast, kind };
        }
      }
      toasts.set(entry.key, toast);
    }
    // While the queue empties, the toasts fade out where they are instead.
    const leaving =
      this.expanded && front
        ? [...this._toasts].filter(
            ([key, toast]) =>
              ToastQueue.isClosing(key) &&
              toasts.has(key) &&
              toast.style.position !== 'absolute'
          )
        : [];
    this._leaving = leaving.map(([, toast]) => toast);
    // Measured while the list still has its old contents, so every change to it moves in one pass.
    const listChanged =
      leaving.length > 0 ||
      toasts.size !== this._toasts.size ||
      [...toasts.keys()].some((key) => !this._toasts.has(key));
    if (
      this.expanded &&
      !changes.has('expanded') &&
      !this._collapsing &&
      !this._emptying &&
      listChanged
    ) {
      this._listBefore = this.measureList();
    }
    this._clearing = [...this._toasts.keys()].some((key) =>
      ToastQueue.isClearing(key)
    );
    if (this._clearing && !this.expanded) {
      this._fadingLayers ??= this._renderedLayers;
    } else if (!this._clearing && this._fadingLayers) {
      this._fadingLayers = undefined;
      this._heldInlineSize = undefined;
      this._heldBlockSize = undefined;
    }
    this._toasts = toasts;
    for (const [key, toast] of toasts) {
      // A toast pushed back from the front stops being a live region. The reverse is never done:
      // giving an existing toast `role="alert"` can make screen readers announce it again.
      if (key !== front?.key && toast.announces) {
        toast.announces = false;
        toast.requestUpdate();
      }
      // A closing toast keeps its look: Clear all removes the layers, but the front toast's Show
      // all fades out with it instead of disappearing and changing its height.
      if (ToastQueue.isClosing(key) || ToastQueue.isClearing(key)) {
        continue;
      }
      const fading = toast === this._showAllFading;
      // While collapsing, the front toast already takes its stack shape.
      const stacked =
        (!this.expanded || this._collapsing) &&
        key === front?.key &&
        this.layerEntries.length > 0;
      toast.showAllLabel = stacked || fading ? this.showAllLabel : undefined;
      toast.showAllLeaving = fading && !stacked;
      if (!toast.showAllLeaving) {
        toast.showAllHovered = false;
      }
      // The list opens away from the anchored edge.
      toast.showAllDirection = this.placement.startsWith('top') ? 'down' : 'up';
    }
  }

  protected override updated(changes: PropertyValues): void {
    const region = this.region;
    const frontKey = this.frontEntry?.key;
    // The expanded view is a modal dialog, which the base class shows.
    if (region && !this.expanded && this.isConnected) {
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
    // A shown toast that is closing with nothing to replace it (Clear all marks it closing before
    // this update) stays the shown one, so its close can still pin it in place.
    const leavingKey =
      this._shownKey &&
      ToastQueue.isClosing(this._shownKey) &&
      this._toasts.has(this._shownKey)
        ? this._shownKey
        : undefined;
    this._shownKey =
      region && !this.expanded ? (frontKey ?? leavingKey) : undefined;
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
    for (const toast of this._leaving) {
      this.leaveList(toast);
    }
    this._leaving = [];
    const listBefore = this._listBefore;
    this._listBefore = undefined;
    const arrival = this._arrival;
    this._arrival = undefined;
    // Until a new toast in the list starts to move, the others stay where they were.
    const holds =
      listBefore && arrival?.kind === 'list'
        ? this.animateList(listBefore, true)
        : [];
    if (listBefore && arrival?.kind !== 'list') {
      this.animateList(listBefore);
    }
    if (arrival) {
      // Hidden while its message is not yet rendered, so the empty toast is never painted.
      arrival.toast.style.opacity = '0';
      void this.arrive(arrival, frontChange, listBefore, holds);
    }
    if (this._settledLayers && !this.expanded) {
      // Layers created from here on recede from the front as usual.
      void nextFrame()
        .then(nextFrame)
        .then(() => {
          this._settledLayers = false;
          this.requestUpdate();
        });
    }
  }

  protected override render(): TemplateResult | typeof nothing {
    // An emptied expanded view stays until it has faded out.
    if (this._toasts.size === 0 && !(this.expanded && this._emptying)) {
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
    const layers = (
      this._fadingLayers ??
      this._heldLayers ??
      this.layerEntries
    ).slice(0, VISIBLE_LAYER_COUNT + 1);
    this._renderedLayers = layers;
    return html`
      <div
        class=${classMap({
          ['swc-ToastContainer']: true,
          [`swc-ToastContainer--${this.placement}`]: true,
          ['swc-ToastContainer--stacked']: layers.length > 0,
          ['swc-ToastContainer--settled']: this._settledLayers,
          ['swc-ToastContainer--clearing']: this._clearing,
          ['swc-ToastContainer--peek']: this._peekHeld,
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
          'min-block-size':
            this._heldBlockSize === undefined
              ? undefined
              : `${this._heldBlockSize}px`,
        })}
        @click=${this.handleRegionClick}
        @pointerenter=${this.handlePointerEnter}
        @pointerleave=${this.handleStackPointerLeave}
        @pointerdown=${this.handlePointerDown}
        @keydown=${this.handleKeyDown}
        @focusin=${this.handleFocusIn}
        @focusout=${this.handleFocusOut}
        @swc-close=${this.handleClose}
        @swc-after-close=${this.handleAfterClose}
        @swc-toast-action=${this.handleAction}
        @swc-toast-expand=${this.handleExpand}
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
          ['swc-ToastContainer--collapsing']:
            this._collapsing || this._emptying,
          ['swc-ToastContainer--clearing']: this._clearing,
        })}
        aria-label=${this.getRegionLabel(ToastQueue.entries.length)}
        @cancel=${this.handleCancel}
        @close=${this.handleDialogClose}
        @pointerdown=${this.handleDialogPointerDown}
        @pointermove=${this.handleViewPointerMove}
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

  private readonly handleStackPointerLeave = (): void => {
    if (this._peekHeld) {
      this._peekHeld = false;
      this.requestUpdate();
    }
    this.handlePointerLeave();
  };

  private readonly handleViewPointerMove = (event: PointerEvent): void => {
    this._pointer = { x: event.clientX, y: event.clientY };
  };

  private releaseHeldSize(): void {
    if (
      this._heldInlineSize !== undefined ||
      this._heldBlockSize !== undefined
    ) {
      this._heldInlineSize = undefined;
      this._heldBlockSize = undefined;
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
    const motion = Boolean(front && frontFrom && !this.prefersReducedMotion());
    // The view keeps its width while the front toast takes its stack shape and leaves the list, so
    // nothing else reflows: the list would widen to the front toast with Show all, and with one
    // toast, the view would narrow to the controls, and they would jump sideways.
    const view = this.region;
    if (motion && view) {
      view.style.inlineSize = `${view.getBoundingClientRect().width}px`;
    }
    this.stopShowAllFade();
    this.requestUpdate();
    await this.updateComplete;
    await front?.updateComplete;
    const animations: Animation[] = [];
    if (front && frontFrom && motion) {
      const count = this._toasts.size;
      if (this.layerEntries.length > 0) {
        front.classList.add('swc-ToastContainer-front');
      }
      const stack = this.pinAt(front, this.stackRect(front), count + 2);
      animations.push(...this.morphFront(front, frontFrom));
      this._showAllIn = this.fadeShowAllIn(front);
      // The stack peeks out further while hovered, so if it lands under the pointer, the layers
      // land where the hovered stack shows them, and the stack holds that until the pointer leaves.
      const pointer = this._pointer;
      this._peekHeld = Boolean(
        pointer &&
        this.ownerDocument.defaultView?.matchMedia('(hover: hover)').matches &&
        pointer.x >= stack.left &&
        pointer.x <= stack.right &&
        pointer.y >= stack.top &&
        pointer.y <= stack.bottom
      );
      const peek = this._peekHeld ? PEEK_ORIGIN_HOVER : PEEK_ORIGIN;
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
          to: this.layerRect(stack, layerHeight, depth, peek),
          fade: [1, depth > VISIBLE_LAYER_COUNT ? 0 : 1],
          contentFade: [1, 0],
          // The layers that replace them have the stack's shadow.
          shadow: ['none', this._elevatedFilter],
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
    await this.untilSettled([
      ...animations,
      ...(this.shadowRoot?.getAnimations() ?? []),
    ]);
  }

  /**
   * Resolves when every running animation in `animations` has finished. It
   * waits on the animations, not on a timer, so motion that plays slower (on a
   * slow device, or slowed down to inspect it) runs to the end. An animation
   * that stops running without finishing (paused, or cancelled) no longer holds
   * it up, so the view cannot stay open with its controls ignoring the
   * pointer.
   */
  private untilSettled(animations: Animation[]): Promise<void> {
    const running = animations.filter(
      (animation) => animation.playState === 'running' || animation.pending
    );
    return new Promise((resolve) => {
      let done = false;
      const finish = (): void => {
        if (!done) {
          done = true;
          resolve();
        }
      };
      void Promise.all(
        running.map((animation) => animation.finished.catch(() => undefined))
      ).then(finish);
      const check = (): void => {
        if (done) {
          return;
        }
        if (running.every((animation) => animation.playState !== 'running')) {
          finish();
          return;
        }
        requestAnimationFrame(check);
      };
      requestAnimationFrame(check);
    });
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
    const front = this.currentToast;
    const count = this._toasts.size;
    const view = this.region;
    // Everything starts on one frame: the scrim and the controls wait to fade in, and the front
    // toast holds its first frame, until the listed toasts can move too.
    view?.classList.add('swc-ToastContainer--held');
    const others = [...this._toasts.values()].filter(
      (toast) => toast !== front
    );
    // The front toast's background holds its stack box, measured against the toast's layout as it
    // is now. Its Show all leaves the layout in its own update, and the listed toasts opening can
    // widen the list, so it is measured again after each; either can take a frame.
    let background: Animation[] = [];
    const holdBackground = (): void => {
      for (const animation of background) {
        animation.cancel();
      }
      background =
        front && frontFrom && this.expanded
          ? this.morphFront(front, {
              surface: frontFrom.surface,
              parts: new Map(),
            })
          : [];
      for (const animation of background) {
        animation.pause();
      }
    };
    holdBackground();
    await front?.updateComplete;
    holdBackground();
    const held: Animation[] = [];
    if (front && frontFrom && this.expanded) {
      // Only the background and the shadow are held here. The parts and Show all are measured
      // right before everything plays: until every toast has settled, the toast's inner layout can
      // still change, and a part's offset measured now would put it in the wrong place.
      held.push(
        front.animate(
          [
            { zIndex: count + 2, filter: this._elevatedFilter },
            { zIndex: count + 2, filter: 'none' },
          ],
          { duration: MOVE_DURATION, easing: MOVE_EASING }
        )
      );
      for (const animation of held) {
        animation.pause();
      }
    }
    // The listed toasts open in their own updates, normally within this task. A toast that is not
    // open is not painted, so nothing shows at rest meanwhile.
    for (
      let attempt = 0;
      attempt < 20 && !others.every((toast) => toast.open);
      attempt++
    ) {
      await Promise.all(others.map((toast) => toast.updateComplete));
    }
    // Rarely, they need a frame. They stay transparent for it. As in `whenOpen()`, this counts
    // frames, not time.
    if (!others.every((toast) => toast.open)) {
      for (const toast of others) {
        toast.style.opacity = '0';
      }
      for (
        let frame = 0;
        frame < 3 && !others.every((toast) => toast.open);
        frame++
      ) {
        await nextFrame();
        await Promise.all(others.map((toast) => toast.updateComplete));
      }
      for (const toast of others) {
        toast.style.removeProperty('opacity');
      }
    }
    holdBackground();
    held.push(...background);
    view?.classList.remove('swc-ToastContainer--held');
    if (!this.expanded) {
      for (const animation of held) {
        animation.cancel();
      }
      return;
    }
    const known = [...positions.values()];
    const deepest = known[known.length - 1];
    const moves: ListMove[] = [];
    for (const [key, toast] of this._toasts) {
      const to = toast.getBoundingClientRect();
      if (toast === front || !toast.open || to.width === 0) {
        continue;
      }
      const from = positions.get(key);
      // They start as layers, with the stack's shadow, which fades out in the list.
      const shadow: [string, string] = [this._elevatedFilter, 'none'];
      moves.push(
        from
          ? { toast, from, to, contentFade: [0, 1], shadow }
          : { toast, from: deepest ?? to, to, fade: [0, 1], shadow }
      );
    }
    this.moveList(moves, 'none');
    if (front && frontFrom) {
      await front.updateComplete;
      this.morphParts(front, frontFrom);
      const fade = frontFrom.showAll
        ? this.fadeShowAllOut(front, frontFrom.showAll)
        : undefined;
      if (!fade) {
        this.stopShowAllFade();
      }
      // Measured now, with the listed toasts in place: until then, the controls' place can change.
      const controls = this.controls;
      if (controls) {
        this.moveControls(controls, frontFrom.surface, 'in', count + 1);
      }
    }
    for (const animation of held) {
      animation.play();
    }
  }

  /**
   * Fades out the emptied expanded view: the scrim and the controls fade with
   * the collapsing class, while the closing toasts run their own exits.
   * Resolves when they end.
   */
  private async fadeOutView(): Promise<void> {
    this.requestUpdate();
    await this.updateComplete;
    // Lets the class change start the CSS transitions before collecting them.
    await nextFrame();
    const exits = [...this._toasts.values()].flatMap(
      (toast) =>
        toast.shadowRoot?.querySelector('.swc-Toast')?.getAnimations() ?? []
    );
    await this.untilSettled([
      ...exits,
      ...(this.shadowRoot?.getAnimations() ?? []),
    ]);
  }

  /**
   * Show all's fade-in (600ms) outlasts the collapse (400ms), and moving the
   * toast into the stack can cancel it, so it continues from where it was.
   */
  private async keepShowAllFading(): Promise<void> {
    const fade = this._showAllIn;
    this._showAllIn = undefined;
    const elapsed = Number(fade?.currentTime ?? SHOW_ALL_IN_DURATION);
    await this.updateComplete;
    const front = this.currentToast;
    await front?.updateComplete;
    if (
      !front ||
      !fade ||
      fade.playState === 'running' ||
      fade.playState === 'finished' ||
      elapsed >= SHOW_ALL_IN_DURATION
    ) {
      return;
    }
    const restarted = this.fadeShowAllIn(front);
    if (restarted) {
      restarted.currentTime = elapsed;
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
  private morphFront(
    toast: Toast,
    from: FrontBoxes,
    { clip = false }: { clip?: boolean } = {}
  ): Animation[] {
    const root = toast.shadowRoot;
    const surface = root?.querySelector<HTMLElement>('.swc-Toast');
    const to = surface?.getBoundingClientRect();
    if (!root || !surface || !to || to.width === 0) {
      return [];
    }
    const options = { duration: MOVE_DURATION, easing: MOVE_EASING };
    const start = from.surface;
    const inset = [
      start.top - to.top,
      to.right - start.right,
      to.bottom - start.bottom,
      start.left - to.left,
    ];
    const animations: Animation[] = [];
    // A background that stays as it is does not animate; only the parts can move.
    if (inset.some((value) => Math.abs(value) >= 0.5)) {
      animations.push(
        surface.animate(
          [
            {
              top: `${inset[0]}px`,
              right: `${inset[1]}px`,
              bottom: `${inset[2]}px`,
              left: `${inset[3]}px`,
            },
            { top: '0px', right: '0px', bottom: '0px', left: '0px' },
          ],
          { ...options, pseudoElement: '::before' }
        )
      );
    }
    // With `clip`, the content stays inside the background while it grows, as RSP S2's scaled image does.
    if (clip && animations.length > 0) {
      const radius = this.cornerRadius(toast);
      animations.push(
        surface.animate(
          [
            {
              clipPath: `inset(${inset.map((value) => `${value}px`).join(' ')} round ${radius}px)`,
            },
            { clipPath: `inset(0px round ${radius}px)` },
          ],
          options
        )
      );
    }
    animations.push(...this.morphParts(toast, from));
    return animations;
  }

  /** Moves each of the front toast's parts from its box in `from` to where it is now. */
  private morphParts(toast: Toast, from: FrontBoxes): Animation[] {
    const root = toast.shadowRoot;
    if (!root) {
      return [];
    }
    const options = { duration: MOVE_DURATION, easing: MOVE_EASING };
    const rtl = getComputedStyle(this).direction === 'rtl';
    const animations: Animation[] = [];
    for (const [selector, rect] of from.parts) {
      const part = root.querySelector<HTMLElement>(selector);
      const now = part?.getBoundingClientRect();
      if (!part || !now || now.width === 0) {
        continue;
      }
      // By the inline-start edge, where a part's content starts; its box can be wider in one layout.
      const dx = rtl ? rect.right - now.right : rect.left - now.left;
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
  private fadeShowAllOut(toast: Toast, from: DOMRect): Animation | undefined {
    const showAll = toast.shadowRoot?.querySelector<HTMLElement>(
      '.swc-Toast-footer--leaving .swc-Toast-showAll'
    );
    const now = showAll?.getBoundingClientRect();
    if (!showAll || !now) {
      return undefined;
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
    return fade;
  }

  private fadeShowAllIn(toast: Toast): Animation | undefined {
    return toast.shadowRoot
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
    moves.forEach(({ toast, from, to, fade, contentFade, shadow }, index) => {
      const animation = this.zoomBetween(toast, from, to, {
        zIndex: moves.length - index,
        fill,
        fade,
        shadow,
      });
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

  /**
   * Moves a toast from one box to another, zoomed to each box's width and,
   * with `crop`, cropped to its height. The crop keeps the edge a layer peeks
   * out from (the far edge from the anchor) and cuts the side the front toast
   * covers. `shadow` animates the toast's drop shadow between two `filter`
   * values; the clip leaves room for it on every side but the cut one.
   */
  private zoomBetween(
    toast: Toast,
    from: DOMRect,
    to: DOMRect,
    {
      zIndex,
      fill,
      fade,
      crop = true,
      shadow,
    }: {
      zIndex: number;
      fill: FillMode;
      fade?: [number, number];
      crop?: boolean;
      shadow?: [string, string];
    }
  ): Animation | undefined {
    const layout = toast.getBoundingClientRect();
    if (layout.width === 0) {
      return undefined;
    }
    const rtl = getComputedStyle(this).direction === 'rtl';
    // Layers peek out past the far edge: the top edge for a stack at the bottom, and the reverse.
    const keepBottom = this.placement.startsWith('top');
    const radius = this.cornerRadius(toast);
    const room = -SHADOW_ROOM;
    const lerp = (a: number, b: number, progress: number): number =>
      a + (b - a) * progress;
    const cutAt = (rect: DOMRect): number =>
      Math.max(0, layout.height - rect.height / (rect.width / layout.width));
    // A cropped side starts and ends at its cut, even a cut of 0, so the crop moves one way.
    const cropping = crop && (cutAt(from) > 0 || cutAt(to) > 0);
    // Zoom and crop each interpolate linearly, so the box they show would not: its cropped edge
    // could move back. Keyframes along the way put that box where it belongs at each step.
    const frame = (progress: number): Keyframe => {
      const rect = new DOMRect(
        lerp(from.left, to.left, progress),
        lerp(from.top, to.top, progress),
        lerp(from.width, to.width, progress),
        lerp(from.height, to.height, progress)
      );
      const scale = rect.width / layout.width;
      const cut = cropping ? cutAt(rect) : room;
      const x = rtl ? rect.right - layout.right : rect.left - layout.left;
      const y = keepBottom
        ? rect.bottom - layout.bottom
        : rect.top - layout.top;
      const inset = keepBottom
        ? `${cut}px ${room}px ${room}px ${room}px`
        : `${room}px ${room}px ${cut}px ${room}px`;
      const keyframe: Keyframe = {
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: `${keepBottom ? 'bottom' : 'top'} ${rtl ? 'right' : 'left'}`,
        clipPath: `inset(${inset} round ${radius}px)`,
        zIndex: String(zIndex),
        offset: progress,
      };
      // Fades and shadows run across the whole motion, from the first keyframe to the last.
      if (progress === 0 || progress === 1) {
        if (fade) {
          keyframe.opacity = fade[progress];
        }
        if (shadow) {
          keyframe.filter = shadow[progress];
        }
      }
      return keyframe;
    };
    const steps = cropping ? ZOOM_STEPS : 1;
    return toast.animate(
      Array.from({ length: steps + 1 }, (_, step) => frame(step / steps)),
      {
        duration: MOVE_DURATION,
        easing: MOVE_EASING,
        fill,
      }
    );
  }

  /**
   * Moves the Clear all and Collapse controls between their place in the view
   * and a box flush against the front toast's far edge, aligned to its end
   * edge, so they grow out of the front toast and shrink back into it, their
   * end edge moving straight between the two. There they are zoomed by
   * `CONTROLS_ZOOM`. They
   * fade in CSS, and paint above the toasts behind the front one. `from` is
   * where they were before the front toast left the list.
   */
  private moveControls(
    controls: HTMLElement,
    stack: DOMRect,
    direction: 'in' | 'out',
    zIndex: number,
    from?: DOMRect
  ): Animation {
    const layout = controls.getBoundingClientRect();
    const rest = from ?? layout;
    const anchoredTop = this.placement.startsWith('top');
    const rtl = getComputedStyle(this).direction === 'rtl';
    const width = rest.width * CONTROLS_ZOOM;
    const height = rest.height * CONTROLS_ZOOM;
    const left = rtl ? stack.left : stack.right - width;
    const top = anchoredTop ? stack.bottom : stack.top - height;
    const beyond = new DOMRect(left, top, width, height);
    // Draws the controls over `rect`, zoomed from their layout box's top corner on the end side.
    const frame = (rect: DOMRect): Keyframe => ({
      transform: `translate(${rtl ? rect.left - layout.left : rect.right - layout.right}px, ${rect.top - layout.top}px) scale(${rect.width / layout.width})`,
      transformOrigin: rtl ? 'top left' : 'top right',
      zIndex: String(zIndex),
    });
    return controls.animate(
      direction === 'in'
        ? [frame(beyond), frame(rest)]
        : [frame(rest), frame(beyond)],
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
  private layerRect(
    front: DOMRect,
    height: number,
    depth: number,
    peek = parseFloat(
      getComputedStyle(this.region ?? this).getPropertyValue(
        '--_swc-toast-container-peek-origin'
      )
    ) || PEEK_ORIGIN
  ): DOMRect {
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
   * Starts a new front toast's motion as soon as it opens, on the same frame
   * as the close or the add that brought it: a new toast slides in while the
   * toast it pushed back shrinks into its layer; a promoted toast grows out of
   * its layer; in the expanded list, a new toast slides in while the others
   * move. The layers move from where they were. The toast's message renders
   * into the live region two frames later, so the toast takes its final size
   * up front (see `holdFinalSize()`). With reduced motion, the new toast fades
   * in and the old one fades out in place.
   */
  private async arrive(
    { toast, kind }: Arrival,
    frontChange?: FrontChange,
    listBefore?: ListBefore,
    holds: Animation[] = []
  ): Promise<void> {
    const opened = await this.whenOpen(toast);
    const current =
      opened &&
      toast === this.currentToast &&
      (kind === 'list') === this.expanded;
    const reduced = this.prefersReducedMotion();
    const key = [...this._toasts].find(
      ([, candidate]) => candidate === toast
    )?.[0];
    const layer = key ? this.measureLayer(key) : undefined;
    const unpin = current
      ? await this.holdFinalSize(toast, kind === 'list')
      : undefined;
    this._heldLayers = undefined;
    this.releaseHeldSize();
    this.requestUpdate();
    await this.updateComplete;
    for (const hold of holds) {
      hold.cancel();
    }
    toast.style.removeProperty('opacity');
    if (unpin) {
      void this.whenRevealed(toast).then(unpin);
    }
    const ghost = frontChange ? this._ghosts.get(frontChange.key) : undefined;
    const options = { duration: MOVE_DURATION, easing: MOVE_EASING };
    if (!current) {
      if (ghost && frontChange) {
        this.dropGhost(frontChange.key, ghost);
      }
      return;
    }
    if (reduced) {
      toast.animate([{ opacity: 0 }, { opacity: 1 }], options);
      if (ghost && frontChange) {
        const fade = ghost.animate([{ opacity: 1 }, { opacity: 0 }], {
          ...options,
          fill: 'forwards',
        });
        const drop = (): void => this.dropGhost(frontChange.key, ghost);
        void fade.finished.then(drop, drop);
      }
      return;
    }
    if (kind === 'list') {
      this.slideIn(toast);
      if (listBefore) {
        this.animateList(listBefore);
      }
      return;
    }
    if (kind === 'promote' && layer) {
      this.morphFront(
        toast,
        { surface: layer, parts: new Map() },
        { clip: true }
      );
      this.fadeContent(toast, [0, 1]);
    } else {
      this.slideIn(toast);
    }
    if (frontChange) {
      this.recede(frontChange, ghost);
    }
  }

  /**
   * Gives a toast whose message is not yet rendered its final size, measured
   * from a hidden, inert copy that renders its message at once and never
   * announces. Returns a function that lets the toast size itself again, for
   * once its message has rendered at the same size.
   */
  private async holdFinalSize(
    toast: Toast,
    heightOnly: boolean
  ): Promise<(() => void) | undefined> {
    const key = [...this._toasts].find(
      ([, candidate]) => candidate === toast
    )?.[0];
    const entry = ToastQueue.entries.find((candidate) => candidate.key === key);
    const parent = this.region;
    if (
      !entry ||
      !parent ||
      !toast.announces ||
      toast.shadowRoot?.querySelector('.swc-Toast-text')
    ) {
      return undefined;
    }
    const copy = this.createToast(entry, false);
    copy.showAllLabel = toast.showAllLabel;
    copy.showAllDirection = toast.showAllDirection;
    copy.inert = true;
    copy.setAttribute('aria-hidden', 'true');
    Object.assign(copy.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      visibility: 'hidden',
      pointerEvents: 'none',
      inlineSize: heightOnly
        ? `${toast.getBoundingClientRect().width}px`
        : 'max-content',
    });
    // In the stack, so it reads the same custom properties as the toast.
    parent.append(copy);
    copy.open = true;
    await copy.updateComplete;
    await copy.updateComplete;
    const { width, height } = copy.getBoundingClientRect();
    copy.remove();
    if (width === 0 || height === 0) {
      return undefined;
    }
    const inline = heightOnly ? undefined : `${width}px`;
    const block = `${height}px`;
    if (inline) {
      toast.style.inlineSize = inline;
    }
    toast.style.blockSize = block;
    // A toast that closed meanwhile keeps its size; `pinLeaving()` may have set it since.
    return () => {
      if (!toast.open) {
        return;
      }
      if (inline) {
        toast.style.removeProperty('inline-size');
      }
      toast.style.removeProperty('block-size');
    };
  }

  /** Waits for the toast to open, and for the update that follows. */
  private async whenOpen(toast: Toast): Promise<boolean> {
    // The base class opens the toast a few microtasks after this update, or later if it waits on
    // the toast's own update. A few frames is plenty; past that, the motion is skipped. These waits
    // count frames, not time, so a slow device or slowed-down motion gets the same frames: they only
    // bound a wait for an update that normally lands within a frame or two, and cut nothing short.
    for (let attempt = 0; attempt < 6 && !toast.open; attempt++) {
      await toast.updateComplete;
      if (!toast.open) {
        await nextFrame();
      }
    }
    // Its update after opening hides the message until it renders into the live region.
    await toast.updateComplete;
    return toast.open && toast.isConnected;
  }

  /** Waits for the toast to open and, for a toast that announces, for its message to render. */
  private async whenRevealed(toast: Toast): Promise<boolean> {
    await this.whenOpen(toast);
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

  private measureLayer(key: string): DOMRect | undefined {
    return [
      ...this.renderRoot.querySelectorAll<HTMLElement>(
        '.swc-ToastContainer-layer'
      ),
    ]
      .find((layer) => layer.dataset.key === key)
      ?.getBoundingClientRect();
  }

  /**
   * Moves the layers from where they were before a new toast took the front,
   * measured from the anchored edge. The old front toast shrinks from its box
   * to its new layer's width, without cropping, and cross-fades with that
   * layer, as RSP S2's snapshots do.
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
        const from = ghost.getBoundingClientRect();
        const to = this.layerRect(now, layer.offsetHeight, depth);
        // A new layer starts in the front plane of the new region (its starting style), not where the
        // old front toast was. It follows the ghost from that toast's box into its place, and fades in
        // to its own opacity, so the two cross-fade as one toast.
        const start = layer.getBoundingClientRect();
        const map = (rect: DOMRect): string =>
          `translate(${rect.left - start.left}px, ${rect.top - start.top}px) scale(${rect.width / start.width}, ${rect.height / start.height})`;
        if (start.width > 0 && start.height > 0) {
          layer.animate(
            [
              {
                opacity: 0,
                translate: '0 0 0',
                transform: map(from),
                transformOrigin: 'top left',
              },
              {
                translate: '0 0 0',
                transform: map(to),
                transformOrigin: 'top left',
              },
            ],
            options
          );
        } else {
          layer.animate([{ opacity: 0, offset: 0 }], options);
        }
        const animation = this.zoomBetween(ghost, from, to, {
          zIndex: 0,
          fill: 'forwards',
          fade: [1, 0],
          crop: false,
        });
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

  /** Every listed toast's background and parts, and the controls, as they are now. */
  private measureList(): ListBefore {
    const toasts = new Map<Toast, FrontBoxes>();
    for (const toast of this._toasts.values()) {
      if (toast.open && toast.style.position !== 'absolute') {
        toasts.set(toast, this.measureFront(toast));
      }
    }
    return { toasts, controls: this.controls?.getBoundingClientRect() };
  }

  /**
   * Moves every listed toast and the controls from where they were before the
   * list changed, in one pass: each toast's background changes size (the list
   * stretches its toasts to the widest one) while its parts move. With
   * `hold`, the animations stay paused at their first frame.
   */
  private animateList(before: ListBefore, hold = false): Animation[] {
    if (this.prefersReducedMotion()) {
      return [];
    }
    const animations: Animation[] = [];
    for (const [toast, from] of before.toasts) {
      if (
        !toast.isConnected ||
        !toast.open ||
        toast.style.position === 'absolute'
      ) {
        continue;
      }
      animations.push(...this.morphFront(toast, from));
    }
    const controls = this.controls;
    const was = before.controls;
    const now = controls?.getBoundingClientRect();
    if (controls && was && now) {
      const dx = was.left - now.left;
      const dy = was.top - now.top;
      if (Math.abs(dx) >= 0.5 || Math.abs(dy) >= 0.5) {
        animations.push(
          controls.animate(
            [
              { transform: `translate(${dx}px, ${dy}px)` },
              { transform: 'none' },
            ],
            { duration: MOVE_DURATION, easing: MOVE_EASING }
          )
        );
      }
    }
    const list = this.region?.querySelector<HTMLElement>(
      '.swc-ToastContainer-list'
    );
    if (list && animations.length > 0) {
      // A toast's background can start wider than the list it now sits in.
      animations.push(
        list.animate([{ overflow: 'visible' }, { overflow: 'visible' }], {
          duration: MOVE_DURATION,
        })
      );
    }
    if (hold) {
      for (const animation of animations) {
        animation.pause();
      }
    }
    return animations;
  }

  /**
   * Takes a toast that starts closing in the expanded list out of the layout,
   * where it is, so it slides out over the list while the toasts around it
   * move into its place, as in RSP S2.
   */
  private leaveList(toast: Toast): void {
    const rect = toast.getBoundingClientRect();
    if (rect.width > 0) {
      this.pinAt(toast, rect, 1);
    }
  }
}

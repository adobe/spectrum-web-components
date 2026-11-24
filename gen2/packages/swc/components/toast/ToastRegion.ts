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
  ToastQueue,
  type ToastQueueEntry,
  ToastRegionBase,
} from '@adobe/spectrum-wc-core/components/toast/index.js';

import '../action-button/swc-action-button.js';
import './swc-toast.js';

import { uniqueId } from '../../utils/id.js';
import type { Toast } from './Toast.js';

import styles from './toast-region.css';

// Only the layers nearest the front toast render, however many are queued.
const VISIBLE_LAYER_COUNT = 2;

/**
 * Renders queued notifications in a named region: the front toast with a
 * stack behind it, or every toast in a modal list while expanded.
 *
 * @element swc-toast-region
 * @since 2.0.0
 */
export class ToastRegion extends ToastRegionBase {
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
      this.renderRoot.querySelector<HTMLElement>('.swc-ToastRegion') ??
      undefined
    );
  }

  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // The toast elements to render, by queue key, in queue order.
  private _toasts = new Map<string, Toast>();
  private _shownKey?: string;

  protected override willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes);
    const entries = ToastQueue.entries;
    const front = entries[0];
    // Collapsed, only the front entry is a real toast; the layers behind it are empty (Q14).
    const shown = this.expanded ? entries : entries.slice(0, 1);
    const toasts = new Map<string, Toast>();
    for (const entry of shown) {
      // Only the front toast announces. The others in the expanded list were announced when they were in front.
      toasts.set(
        entry.key,
        this._toasts.get(entry.key) ?? this.createToast(entry, entry === front)
      );
    }
    this._toasts = toasts;
    for (const [key, toast] of toasts) {
      // A toast pushed back from the front stops being a live region. The reverse is never done:
      // giving an existing toast `role="alert"` can make screen readers announce it again.
      if (key !== front?.key && toast.announces) {
        toast.announces = false;
        toast.requestUpdate();
      }
      toast.showAllLabel =
        !this.expanded && key === front?.key && entries.length > 1
          ? this.showAllLabel
          : undefined;
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
      if (region.matches(':popover-open') && this._shownKey !== frontKey) {
        region.hidePopover();
      }
      if (!region.matches(':popover-open')) {
        region.showPopover();
      }
    }
    this._shownKey = region && !this.expanded ? frontKey : undefined;
    // The base class opens the toasts, so the surface must be shown first (a hidden popover is display: none).
    super.updated(changes);
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
    const layers = this.layerEntries.slice(0, VISIBLE_LAYER_COUNT);
    return html`
      <div
        class=${classMap({
          ['swc-ToastRegion']: true,
          [`swc-ToastRegion--${this.placement}`]: true,
          ['swc-ToastRegion--stacked']: layers.length > 0,
        })}
        role="region"
        popover="manual"
        tabindex="-1"
        aria-label=${this.getRegionLabel(ToastQueue.entries.length)}
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
      >
        ${layers.map((entry, index) => {
          const depth = index + 1;
          return html`
            <div
              class=${classMap({
                ['swc-ToastRegion-layer']: true,
                [`swc-ToastRegion-layer--${entry.variant}`]:
                  entry.variant != null && entry.variant !== 'neutral',
              })}
              role="presentation"
              style=${styleMap({
                '--_swc-toast-region-layer-index': depth,
              })}
            ></div>
          `;
        })}
        ${this.currentToast}
      </div>
    `;
  }

  private renderExpanded(): TemplateResult {
    return html`
      <dialog
        class=${classMap({
          ['swc-ToastRegion']: true,
          [`swc-ToastRegion--${this.placement}`]: true,
          ['swc-ToastRegion--expanded']: true,
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
        <div class="swc-ToastRegion-list">
          ${repeat(
            this._toasts,
            ([key]) => key,
            ([, toast]) => toast
          )}
        </div>
        <div class="swc-ToastRegion-controls">
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
}

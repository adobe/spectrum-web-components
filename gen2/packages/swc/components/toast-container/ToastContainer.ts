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

import {
  ToastContainerBase,
  ToastQueue,
} from '@adobe/spectrum-wc-core/components/toast-container/index.js';

import './swc-toast.js';

import { uniqueId } from '../../utils/id.js';
import type { Toast } from './Toast.js';

import styles from './toast-container.css';

/**
 * Renders the front queued notification in a named region.
 *
 * @element swc-toast-container
 * @since 2.0.0
 */
export class ToastContainer extends ToastContainerBase {
  private _toast?: Toast;
  private _renderedKey?: string;
  private _shownKey?: string;

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override get currentToast(): Toast | undefined {
    return this._toast;
  }

  protected override get region(): HTMLElement | undefined {
    return (
      this.renderRoot.querySelector<HTMLElement>('[role="region"]') ?? undefined
    );
  }

  protected override willUpdate(changes: PropertyValues): void {
    super.willUpdate(changes);
    const entry = this.frontEntry;
    if (!entry) {
      this._toast = undefined;
      this._renderedKey = undefined;
      return;
    }
    if (entry.key === this._renderedKey) {
      return;
    }
    const toast = this.ownerDocument.createElement('swc-toast');
    toast.variant = entry.variant ?? 'neutral';
    toast.iconLabel = entry.iconLabel;
    toast.actionLabel = entry.actionLabel;
    toast.timeout = entry.timeout ?? null;
    const message = this.ownerDocument.createElement('span');
    message.id = uniqueId('toast-message');
    message.textContent = entry.message;
    toast.append(message);
    this._toast = toast;
    this._renderedKey = entry.key;
  }

  protected override updated(changes: PropertyValues): void {
    const region = this.region;
    if (region) {
      // Re-showing moves the region to the end of the top layer, above anything opened since.
      if (
        region.matches(':popover-open') &&
        this._shownKey !== this._renderedKey
      ) {
        region.hidePopover();
      }
      if (!region.matches(':popover-open')) {
        region.showPopover();
      }
    }
    this._shownKey = region ? this._renderedKey : undefined;
    // The base class opens the toast, so the region must be shown first (a hidden popover is display: none).
    super.updated(changes);
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._toast) {
      return nothing;
    }
    const count = ToastQueue.entries.length;
    return html`
      <div
        class=${classMap({
          'swc-ToastContainer': true,
          [`swc-ToastContainer--${this.placement}`]: true,
        })}
        role="region"
        popover="manual"
        tabindex="-1"
        aria-label=${`${count} ${count === 1 ? 'notification' : 'notifications'}.`}
        @pointerenter=${this.handlePointerEnter}
        @pointerleave=${this.handlePointerLeave}
        @focusin=${this.handleFocusIn}
        @focusout=${this.handleFocusOut}
        @swc-close=${this.handleClose}
        @swc-after-close=${this.handleAfterClose}
        @swc-toast-action=${this.handleAction}
      >
        ${this._toast}
      </div>
    `;
  }
}

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
import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';

import { TooltipBase } from '@spectrum-web-components/core/components/tooltip';

import styles from './tooltip.css';

/**
 * A tooltip component that displays a brief, contextual message near a trigger element.
 *
 * @element swc-tooltip
 * @since 2.0.0
 *
 * @example
 * <button id="save-btn">Save</button>
 * <swc-tooltip for="save-btn">Save your changes</swc-tooltip>
 *
 * @slot - Text label displayed in the tooltip.
 */
export class Tooltip extends TooltipBase {
  // ──────────────────────────────
  //     RENDERING & STYLING
  // ──────────────────────────────

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  // Reflects the browser's actual popover state. Used to guard showPopover/hidePopover
  // calls in updated() so the toggle listener can sync this.open without re-triggering
  // the API (preventing a setter → showPopover → toggle → setter cycle).
  private get isPopoverOpen(): boolean {
    return this.matches(':popover-open');
  }

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

  public override connectedCallback(): void {
    super.connectedCallback();
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
  }

  protected override render(): TemplateResult {
    return html`
      <div class="swc-Tooltip">
        <span class="swc-Tooltip-tip" aria-hidden="true"></span>
        <slot></slot>
      </div>
    `;
  }
}

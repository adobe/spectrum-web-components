/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations in the License.
 */

import {
  html,
  nothing,
  PropertyValues,
  ReactiveElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import { state } from '@spectrum-web-components/base/src/decorators.js';
import type { Placement } from '@spectrum-web-components/overlay';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

/**
 * Host interface for TruncatedValueTooltipMixin. The host must provide these
 * properties (e.g. TextfieldBase already has them). Used for documentation
 * and for typing the mixin result; the constructor passed in may be a base
 * that does not declare these until the final class in the chain.
 */
export interface TruncatedValueTooltipHost {
  inputElement: HTMLInputElement | HTMLTextAreaElement;
  multiline: boolean;
  type: string;
  disabled: boolean;
  displayValue: string;
  truncatedValueTooltipPlacement: Placement;
}

/** Methods added by TruncatedValueTooltipMixin. */
export interface TruncatedValueTooltipMixinInterface {
  renderTruncatedValueTooltip(): TemplateResult | typeof nothing;
}

/**
 * Mixin that adds truncated-value tooltip behavior: when the visible value is
 * clipped, a tooltip with the full value is shown on hover/focus. Overlay and
 * tooltip are lazy-loaded only when truncation is first detected. The class
 * that ultimately extends the returned constructor must provide the
 * TruncatedValueTooltipHost properties (e.g. TextfieldBase).
 */
export function TruncatedValueTooltipMixin<
  T extends Constructor<ReactiveElement>,
>(constructor: T): T & Constructor<TruncatedValueTooltipMixinInterface> {
  class TruncatedValueTooltipElement extends constructor {
    @state()
    protected isTruncated = false;

    private _tooltipDepsLoaded = false;

    private _truncationResizeObserver: ResizeObserver | null = null;

    private get _host(): TruncatedValueTooltipHost {
      return this as unknown as TruncatedValueTooltipHost;
    }

    protected get inputElementIsTruncated(): boolean {
      if (
        !this._host.inputElement ||
        this._host.multiline ||
        this._host.type === 'password'
      ) {
        return false;
      }
      // Add 1 because Safari sometimes rounds by 1px, breaking the calculation otherwise.
      return (
        this._host.inputElement.scrollWidth >
        this._host.inputElement.clientWidth + 1
      );
    }

    protected refreshTruncationState(): void {
      const isTruncated = this.inputElementIsTruncated;
      if (isTruncated === this.isTruncated) {
        return;
      }
      this.isTruncated = isTruncated;
    }

    private async ensureTooltipDeps(): Promise<void> {
      if (this._tooltipDepsLoaded) {
        return;
      }
      await Promise.all([
        import('@spectrum-web-components/overlay/sp-overlay.js'),
        import('@spectrum-web-components/tooltip/sp-tooltip.js'),
      ]);
      this._tooltipDepsLoaded = true;
      this.requestUpdate();
    }

    renderTruncatedValueTooltip(): TemplateResult | typeof nothing {
      const host = this._host;
      if (
        !this.isTruncated ||
        host.disabled ||
        !host.inputElement ||
        host.type === 'password'
      ) {
        return nothing;
      }
      if (!this._tooltipDepsLoaded) {
        this.ensureTooltipDeps();
        return nothing;
      }
      return html`
        <sp-overlay
          id="truncated-value-tooltip"
          aria-hidden="true"
          .describeTrigger=${'none'}
          .triggerElement=${host.inputElement}
          .triggerInteraction=${'hover'}
          type="hint"
          .placement=${host.truncatedValueTooltipPlacement}
        >
          <sp-tooltip
            aria-hidden="true"
            placement=${host.truncatedValueTooltipPlacement}
          >
            ${host.displayValue}
          </sp-tooltip>
        </sp-overlay>
      `;
    }

    protected override firstUpdated(changedProperties: PropertyValues): void {
      super.firstUpdated(changedProperties);
      const host = this._host;
      if (!host.multiline) {
        if (!this._truncationResizeObserver) {
          this._truncationResizeObserver = new ResizeObserver(() => {
            this.refreshTruncationState();
          });
        }
        this._truncationResizeObserver.observe(this as unknown as Element);
        if (host.inputElement) {
          this._truncationResizeObserver.observe(host.inputElement);
        }
        this.refreshTruncationState();
      }
    }

    protected override update(changedProperties: PropertyValues): void {
      super.update(changedProperties);
      if (changedProperties.has('value')) {
        this.updateComplete.then(() => {
          this.refreshTruncationState();
        });
      }
    }

    public override disconnectedCallback(): void {
      if (this._truncationResizeObserver) {
        this._truncationResizeObserver.disconnect();
        this._truncationResizeObserver = null;
      }
      super.disconnectedCallback();
    }
  }
  return TruncatedValueTooltipElement;
}

/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    CSSResultArray,
    TemplateResult,
    SpectrumElement,
    property,
    query,
} from '@spectrum-web-components/base';
import {
    OverlayDisplayQueryDetail,
    Placement,
} from '@spectrum-web-components/overlay';

import tooltipStyles from './tooltip.css.js';

/**
 * @slot icon - The icon that appears on the left of the label
 * @slot - The label
 */

export class Tooltip extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [tooltipStyles];
    }

    /**
     * @private
     */
    static instanceCount = 0;

    private _tooltipId = `sp-tooltip-describedby-helper-${Tooltip.instanceCount++}`;

    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement: Placement = 'top';

    @query('#tip')
    private tipElement!: HTMLSpanElement;

    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    private _variant = '';

    @property({ type: String })
    public get variant(): string {
        return this._variant;
    }
    public set variant(variant: string) {
        if (variant === this.variant) {
            return;
        }
        if (['info', 'positive', 'negative'].includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
            return;
        }
        this.removeAttribute('variant');
        this._variant = '';
    }

    public constructor() {
        super();
        this.addEventListener('sp-overlay-query', this.onOverlayQuery);
    }

    public onOverlayQuery(event: CustomEvent<OverlayDisplayQueryDetail>): void {
        /* c8 ignore next */
        if (!event.target) return;

        const target = event.target as Node;
        /* c8 ignore next */
        if (target !== this) return;

        event.detail.overlayContentTipElement = this.tipElement;
    }

    render(): TemplateResult {
        return html`
            <slot name="icon"></slot>
            <span id="label"><slot></slot></span>
            <span id="tip"></span>
        `;
    }

    private _proxy?: HTMLElement;

    public overlayWillOpenCallback({
        trigger,
    }: {
        trigger: HTMLElement;
    }): void {
        this.setAttribute('aria-hidden', 'true');
        if (!this._proxy) {
            this._proxy = document.createElement('span');
            this._proxy.textContent = this.textContent;
            this._proxy.id = this._tooltipId;
            this._proxy.hidden = true;
            this._proxy.setAttribute('role', 'tooltip');
        }
        trigger.setAttribute('aria-describedby', this._tooltipId);
        trigger.insertAdjacentElement('beforebegin', this._proxy);
    }

    public overlayOpenCancelledCallback({
        trigger,
    }: {
        trigger: HTMLElement;
    }): void {
        this.overlayCloseCallback({ trigger });
    }

    public overlayCloseCallback({ trigger }: { trigger: HTMLElement }): void {
        trigger.removeAttribute('aria-describedby');
        this.removeAttribute('aria-hidden');
        this.removeProxy();
    }

    private removeProxy(): void {
        if (this._proxy) {
            this._proxy.remove();
            this._proxy = undefined;
        }
    }
}

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
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import type { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';

import tooltipStyles from './tooltip.css.js';

/**
 * @element sp-tooltip
 *
 * @slot icon - the icon element appearing at the start of the label
 * @slot - the text label of the Tooltip
 */

export class Tooltip extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [tooltipStyles];
    }

    /**
     * @private
     */
    static instanceCount = 0;

    // private _tooltipId = `sp-tooltip-describedby-helper-${Tooltip.instanceCount++}`;

    @property({ type: Boolean, attribute: 'self-managed' })
    public selfManaged = false;

    @property({ type: Number, reflect: true })
    public offset = 6;
    // private hadTooltipId = false;

    @property({ type: Boolean, reflect: true })
    public open = false;

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement: Placement = 'top';

    @query('#tip')
    public tipElement!: HTMLSpanElement;

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

    // public overlayWillOpenCallback({
    //     trigger,
    // }: {
    //     trigger: HTMLElement;
    // }): void {
    //     this.setAttribute('aria-hidden', 'true');
    //     const ariaDescribedby = trigger.getAttribute('aria-describedby') || '';
    //     this.hadTooltipId = ariaDescribedby.search(this._tooltipId) > -1;

    //     if (this.hadTooltipId) return;

    //     if (ariaDescribedby) {
    //         trigger.setAttribute(
    //             'aria-describedby',
    //             `${ariaDescribedby} ${this._tooltipId}`
    //         );
    //     } else {
    //         trigger.setAttribute('aria-describedby', `${this._tooltipId}`);
    //     }
    // }

    // public overlayCloseCallback({ trigger }: { trigger: HTMLElement }): void {
    //     const ariaDescribedby = trigger.getAttribute('aria-describedby') || '';
    //     let descriptors = ariaDescribedby.split(/\s+/);

    //     if (!this.hadTooltipId) {
    //         descriptors = descriptors.filter(
    //             (descriptor) => descriptor !== this._tooltipId
    //         );
    //     }
    //     if (descriptors.length) {
    //         trigger.setAttribute('aria-describedby', descriptors.join(' '));
    //     } else {
    //         trigger.removeAttribute('aria-describedby');
    //     }

    //     this.removeAttribute('aria-hidden');
    // }

    private handleOpenOverlay = (): void => {
        this.open = true;
    };

    protected handleCloseOverlay = (): void => {
        this.open = false;
    };

    protected handleTransitionend(): void {
        this.dispatchEvent(
            new Event('transitionend', {
                bubbles: true,
                composed: true,
            })
        );
    }

    override render(): TemplateResult {
        const tooltip = html`
            <span id="tooltip" @transitionend=${this.handleTransitionend}>
                <slot name="icon"></slot>
                <span id="label"><slot></slot></span>
                <span id="tip"></span>
            </span>
        `;
        if (this.selfManaged) {
            return html`
                <sp-overlay
                    ?open=${this.open}
                    offset=${this.offset}
                    type="hint"
                    .placement=${this.placement}
                    .triggerElement=${this.parentElement}
                    .triggerInteraction=${'hover'}
                    @sp-opened=${this.handleOpenOverlay}
                    @sp-closed=${this.handleCloseOverlay}
                >
                    ${tooltip}
                </sp-overlay>
            `;
        } else {
            return tooltip;
        }
    }
}

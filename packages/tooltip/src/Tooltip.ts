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
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement: Placement = 'top';

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

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-overlay-query', this.onOverlyQuery);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('sp-overlay-query', this.onOverlyQuery);
    }

    public onOverlyQuery(event: CustomEvent<OverlayDisplayQueryDetail>): void {
        /* istanbul ignore if */
        if (!event.target || !this.shadowRoot) return;

        const target = event.target as Node;
        /* istanbul ignore if */
        if (!target.isSameNode(this)) return;

        const tipElement = this.shadowRoot.querySelector('#tip') as HTMLElement;
        if (tipElement) {
            event.detail.overlayContentTipElement = tipElement;
        }
    }

    render(): TemplateResult {
        return html`
            <slot name="icon"></slot>
            <span id="label"><slot></slot></span>
            <span id="tip"></span>
        `;
    }
}

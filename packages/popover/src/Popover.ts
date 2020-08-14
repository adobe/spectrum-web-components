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
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
} from '@spectrum-web-components/base';
import { nothing } from 'lit-html';

import {
    Placement,
    OverlayDisplayQueryDetail,
} from '@spectrum-web-components/overlay';
import popoverStyles from './popover.css.js';

/**
 * @attr {Boolean} open - The open state of the popover
 * @attr {Boolean} dialog - Adds some padding to the popover
 */

export class Popover extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [popoverStyles];
    }

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement: Placement = 'none';

    @property({ type: Boolean, reflect: true })
    public tip = false;

    protected renderTip(): TemplateResult {
        return html`
            <div id="tip"></div>
        `;
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-overlay-query', this.onOverlayQuery);
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('sp-overlay-query', this.onOverlayQuery);
    }

    public onOverlayQuery(event: CustomEvent<OverlayDisplayQueryDetail>): void {
        /* istanbul ignore if */
        if (!event.target) return;

        const target = event.target as Node;
        /* istanbul ignore if */
        if (!target.isSameNode(this)) return;

        const tipElement = this.shadowRoot.querySelector('#tip') as HTMLElement;
        if (tipElement) {
            event.detail.overlayContentTipElement = tipElement;
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
            ${this.tip ? this.renderTip() : nothing}
        `;
    }
}

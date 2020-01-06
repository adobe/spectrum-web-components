/*
Copyright 2019 Adobe. All rights reserved.
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
    LitElement,
    CSSResultArray,
    TemplateResult,
    property,
} from 'lit-element';

import { nothing } from 'lit-html';

import popoverStyles from './popover.css.js';

/**
 * @attr {Boolean} open - The open state of the popover
 * @attr {Boolean} dialog - Adds some padding to the popover
 *
 * @cssproperty {Color} [--spectrum-popover-background-color=var(--spectrum-global-color-gray-50)]
 * @cssproperty {Color} [--spectrum-popover-border-color=var(--spectrum-alias-border-color-dark)]
 * @cssproperty {Color} [--spectrum-popover-shadow-color=var(--spectrum-alias-dropshadow-color)]
 * @cssproperty {Length} [--spectrum-popover-shadow-blur=var(--spectrum-alias-dropshadow-blur)]
 * @cssproperty {Length} [--spectrum-popover-shadow-offset-y=var(--spectrum-alias-dropshadow-offset-y)]
 * @cssproperty {Length} [--spectrum-popover-elevation=2dp]
 * @cssproperty {Length} [--spectrum-popover-border-size=var(--spectrum-alias-border-size-thin)]
 * @cssproperty {Length} [--spectrum-popover-border-radius=var(--spectrum-alias-border-radius-regular)]
 * @cssproperty {Length} [--spectrum-popover-padding-x=0px]
 * @cssproperty {Length} [--spectrum-popover-padding-y=var(--spectrum-global-dimension-size-50)]
 * @cssproperty {Length} [--spectrum-popover-tip-width=var(--spectrum-global-dimension-size-250)]
 * @cssproperty {Length} [--spectrum-popover-tip-height=var(--spectrum-global-dimension-size-125)]
 * @cssproperty {Length} [--spectrum-popover-shadow-y-offset=var(--spectrum-global-dimension-size-10)]
 * @cssproperty {Length} [--spectrum-popover-source-gap=var(--spectrum-global-dimension-size-75)]
 * @cssproperty {Length} [--spectrum-popover-min-width=var(--spectrum-global-dimension-size-400)]
 * @cssproperty {Length} [--spectrum-popover-min-height=var(--spectrum-global-dimension-size-400)]
 */

export class Popover extends LitElement {
    public static get styles(): CSSResultArray {
        return [popoverStyles];
    }

    @property({ reflect: true })
    public direction: 'top' | 'bottom' | 'left' | 'right' | 'none' = 'none';

    @property({ type: Boolean, reflect: true })
    public tip = false;

    protected renderTip(): TemplateResult {
        return html`
            <div id="tip"></div>
        `;
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
            ${this.tip ? this.renderTip() : nothing}
        `;
    }
}

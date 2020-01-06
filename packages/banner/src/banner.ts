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
    property,
    CSSResultArray,
    TemplateResult,
} from 'lit-element';

import bannerStyles from './banner.css.js';

/**
 * Banner component
 *
 * @attr type - Determines the style, can be "info", "warning", or "error". Default is "info"
 * @attr corner - Determines if banner sets position at upper right corner or not.
 *
 * @slot header - Primary message of the banner.
 * @slot content - Secondary message of the banner. Used to provide a description.
 *
 * @cssproperty {Color} [--spectrum-banner-text-color=var(--spectrum-global-color-static-white)]
 * @cssproperty {Length} [--spectrum-banner-border-radius=var(--spectrum-global-dimension-static-size-100)]
 * @cssproperty {Length} [--spectrum-banner-padding-y=var(--spectrum-global-dimension-static-size-50)]
 * @cssproperty {Length} [--spectrum-banner-padding-x=var(--spectrum-global-dimension-static-size-100)]
 * @cssproperty {Length} [--spectrum-banner-text-size=var(--spectrum-global-dimension-font-size-75)]
 * @cssproperty {Length} [--spectrum-banner-text-line-height=var(--spectrum-alias-heading-text-line-height)]
 * @cssproperty {Color} [--spectrum-banner-error-background-color=var(--spectrum-semantic-negative-color-default)]
 * @cssproperty {Color} [--spectrum-banner-info-background-color=var(--spectrum-semantic-informative-color-default)]
 * @cssproperty {Color} [--spectrum-banner-warning-background-color=var(--spectrum-semantic-notice-color-default)]
 */
export class Banner extends LitElement {
    @property({ reflect: true, type: String })
    public type: 'info' | 'warning' | 'error' = 'info';

    @property({ reflect: true, type: Boolean })
    public corner = false;

    public static get styles(): CSSResultArray {
        return [bannerStyles];
    }

    protected render(): TemplateResult {
        return html`
            <div id="header"><slot name="header"></slot></div>
            <div id="content"><slot name="content"></slot></div>
        `;
    }
}

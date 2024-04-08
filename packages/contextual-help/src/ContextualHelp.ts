/*
Copyright 2024 Adobe. All rights reserved.
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
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';

import {
    IS_MOBILE,
    MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

import styles from './contextual-help.css.js';

/**
 * @element sp-contextual-help
 */
export class ContextualHelp extends SpectrumElement {
    protected isMobile = new MatchMediaController(this, IS_MOBILE);

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property()
    public headline = '';

    private renderContent(): TemplateResult {
        if (this.isMobile.matches) {
            return html`
                <sp-dialog-wrapper
                    dismissable
                    underlay
                    headline=${this.headline}
                >
                    <slot></slot>
                    <div class="link">
                        <slot name="link"></slot>
                    </div>
                <sp-dialog-wrapper>
            `
        } else {
            return html`
                <sp-popover class="popover">
                    <section>
                        <h2 class="heading">${this.headline}</h2>
                        <slot></slot>
                        <div class="link">
                            <slot name="link"></slot>
                        </div>
                    </section>
                </sp-popover>
            `
        }
    }

    protected override render(): TemplateResult {
        return html`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label="Informations"
                id="trigger"
            >
                <sp-icon-info-outline slot="icon"></sp-icon-info-outline>
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${this.isMobile.matches ? undefined : 'bottom-start'}
                type=${this.isMobile.matches ? 'modal' : 'auto'}
                receivesFocus='true'
            >
                ${this.renderContent()}
            <sp-overlay>
        `;
    }
}

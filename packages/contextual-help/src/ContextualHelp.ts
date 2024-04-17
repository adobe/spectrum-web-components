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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js';
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
    public headline?: string;

    @property()
    public label?: string;

    @property()
    public variant: 'info' | 'help' = 'info';

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement = 'bottom-start';

    @property({ type: Number })
    public offset: number | [number, number];

    private get buttonAriaLabel(): string {
        if (this.label) {
            return this.label;
        } else {
            if (this.variant === 'help') {
                return 'Help';
            }
            return 'Informations';
        }
    }

    private renderContent(): TemplateResult {
        if (this.isMobile.matches) {
            const headlineVisibility = !this.headline ? 'none' : undefined;

            return html`
                <sp-dialog-wrapper
                    dismissable
                    underlay
                    headline=${ifDefined(this.headline)}
                    headline-visibility=${ifDefined(headlineVisibility)}
                >
                    <slot></slot>
                    <div class="link">
                        <slot name="link"></slot>
                    </div>
                </sp-dialog-wrapper>
            `;
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
            `;
        }
    }

    protected override render(): TemplateResult {
        const actualPlacement = this.isMobile.matches
            ? undefined
            : this.placement;

        return html`
            <sp-action-button
                quiet
                size="s"
                id="trigger"
                aria-label=${this.buttonAriaLabel}
                id="trigger"
            >
                ${this.variant === 'help'
                    ? html`
                          <sp-icon-help-outline
                              slot="icon"
                          ></sp-icon-help-outline>
                      `
                    : html`
                          <sp-icon-info-outline
                              slot="icon"
                          ></sp-icon-info-outline>
                      `}
            </sp-action-button>
            <sp-overlay
                trigger="trigger@click"
                placement=${ifDefined(actualPlacement)}
                type=${this.isMobile.matches ? 'modal' : 'auto'}
                receives-focus="true"
                .offset=${this.offset}
            >
                ${this.renderContent()}
            </sp-overlay>
        `;
    }
}

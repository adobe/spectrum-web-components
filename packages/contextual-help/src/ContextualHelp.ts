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
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';
import {
    IS_MOBILE,
    MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import { trigger } from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';

import styles from './contextual-help.css.js';

/**
 * Spectrum Contextual help provides additional information about
 * the state of either an adjacent component or an entire view.
 * @element sp-contextual-help
 *
 * @slot Text content to display in the popover
 * @slot link - link to additional informations
 */
export class ContextualHelp extends SpectrumElement {
    protected isMobile = new MatchMediaController(this, IS_MOBILE);

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    /**
     * Optional title to be displayed inside the popover.
     * @param {String} headline
     */
    @property()
    public headline?: string;

    /**
     * Provides an accessible name for the action button trigger.
     * @param {String} label
     */
    @property()
    public label?: string;

    /**
     * The `variant` property applies specific styling on the action button trigger.
     * @param {String} variant
     */
    @property()
    public variant: 'info' | 'help' = 'info';

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement = 'bottom-start';

    /**
     * The `offset` property accepts either a single number, to
     * define the offset of the Popover along the main axis from
     * the action button, or 2-tuple, to define the offset along the
     * main axis and the cross axis.
     */
    @property({ type: Number })
    public offset: number | [number, number] = 0;

    @property({ type: Boolean })
    open = false;

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

    private handleOpened(): void {
        this.open = true;
    }

    private handleClosed(): void {
        this.open = false;
    }

    override connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('sp-opened', this.handleOpened);
        this.addEventListener('sp-closed', this.handleClosed);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.removeEventListener('sp-opened', this.handleOpened);
        this.removeEventListener('sp-closed', this.handleClosed);
    }

    private renderOverlayContent(): TemplateResult {
        if (this.isMobile.matches) {
            import('@spectrum-web-components/dialog/sp-dialog-wrapper.js');

            return html`
                <sp-dialog-wrapper
                    dismissable
                    underlay
                    headline=${ifDefined(this.headline)}
                >
                    <slot></slot>
                    <slot name="link"></slot>
                </sp-dialog-wrapper>
            `;
        } else {
            import('@spectrum-web-components/popover/sp-popover.js');

            return html`
                <sp-popover class="popover">
                    <section>
                        <h2 class="heading">${this.headline}</h2>
                        <slot></slot>
                        <slot name="link"></slot>
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
                .active=${this.open}
                ${trigger(this.renderOverlayContent.bind(this), {
                    open: this.open,
                    triggerInteraction: 'click',
                    overlayOptions: {
                        placement: actualPlacement,
                        offset: this.offset,
                        type: this.isMobile.matches ? 'modal' : 'auto',
                    },
                })}
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
        `;
    }
}

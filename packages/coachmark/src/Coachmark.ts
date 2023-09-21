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
    nothing,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    ifDefined,
    when,
} from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import {
    IS_MOBILE,
    MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import '@spectrum-web-components/asset/sp-asset.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
import coachmarkStyles from './coachmark.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js';
/**
 * @element sp-coackmark
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot heading - HTML content to be listed as the heading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 * @slot footer - Footer text
 */
export class Coachmark extends LikeAnchor(
    SizedMixin(
        ObserveSlotPresence(FocusVisiblePolyfillMixin(SpectrumElement), [
            '[slot="cover-photo"]',
        ])
    )
) {
    protected isMobile = new MatchMediaController(this, IS_MOBILE);

    public static override get styles(): CSSResultArray {
        return [coachmarkStyles, chevronStyles];
    }

    @property()
    public asset?: 'file' | 'folder';

    @property({ type: Boolean })
    public hasActionMenu = true;

    @property({ type: Boolean })
    public hasPagination = true;

    @property({ type: Boolean })
    public isSkipTour = false;

    @property({ type: Boolean })
    public isRestartTour = false;

    @property()
    public heading = '';

    @property({ type: Number })
    public currentStep = 4;

    @property({ type: Number })
    public totalSteps = 0;

    protected get hasCoverPhoto(): boolean {
        return this.getSlotContentPresence('[slot="cover-photo"]');
    }

    protected get renderHeading(): TemplateResult {
        return html`
            <div class="title">${this.heading}</div>
        `;
    }

    protected get renderCoverImage(): TemplateResult {
        return html`
            <sp-asset id="cover-photo" variant=${ifDefined(this.asset)}>
                <div class="image-wrapper">
                    <slot name="cover-photo"></slot>
                </div>
            </sp-asset>
        `;
    }

    protected get images(): TemplateResult[] {
        const images: TemplateResult[] = [];
        if (this.hasCoverPhoto) images.push(this.renderCoverImage);
        return images;
    }

    private renderImage(): TemplateResult[] {
        return this.images;
    }

    protected renderSubtitleAndDescription(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    private stopPropagationOnHref(event: Event): void {
        if (this.href) {
            event.stopPropagation();
        }
    }

    public updateActionMenu(val: boolean): void {
        this.hasActionMenu = val;
    }

    protected renderButtons(): TemplateResult {
        const showPreviousButton = this.currentStep > 0;
        const showNextButton = this.totalSteps > 0;
        const nextButtonText =
            this.currentStep === this.totalSteps ? 'Finish' : 'Next';
        if (this.totalSteps === 0) {
            this.updateActionMenu(false);
            return html`
                <sp-button-group class="spectrum-ButtonGroup buttongroup">
                    <sp-button variant="primary" treatment="outline" size="s">
                        Ok
                    </sp-button>
                </sp-button-group>
            `;
        }

        return html`
            <sp-button-group class="spectrum-ButtonGroup buttongroup">
                ${showPreviousButton
                    ? html`
                          <sp-button variant="secondary" treatment="outline">
                              Previous
                          </sp-button>
                      `
                    : nothing}
                ${showNextButton
                    ? html`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              ?hidden=${!showNextButton}
                              size="s"
                          >
                              ${nextButtonText}
                          </sp-button>
                      `
                    : nothing}
            </sp-button-group>
            <sp-button-group
                class="spectrum-ButtonGroup buttongroup-mobile"
                size="s"
            >
                ${showPreviousButton
                    ? html`
                          <sp-button
                              variant="secondary"
                              treatment="outline"
                              icon-only
                              aria-label="previous"
                          >
                              <sp-icon-chevron200
                                  size="s"
                                  class="spectrum-UIIcon-ChevronLeft75"
                                  slot="icon"
                              ></sp-icon-chevron200>
                          </sp-button>
                      `
                    : nothing}
                ${showNextButton
                    ? html`
                          <sp-button
                              variant="primary"
                              treatment="outline"
                              ?hidden=${!showNextButton}
                              size="s"
                          >
                              ${nextButtonText}
                          </sp-button>
                      `
                    : nothing}
            </sp-button-group>
        `;
    }

    /**
     * @description function to render the steps count
     * role="status" to the div element to indicate that this element is providing status information.
     * aria-live="polite" to make sure that screen readers announce changes to this content as it updates dynamically.
     * @returns
     */

    protected renderSteps = (): TemplateResult => {
        return html`
            <div class="step" role="status">
                <span aria-live="polite">
                    ${this.currentStep} of ${this.totalSteps}
                </span>
            </div>
        `;
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public changeHandler(): void {}

    protected renderActionMenu = (): TemplateResult => {
        return html`
            <div class="action-menu" @pointerdown=${this.stopPropagationOnHref}>
                <sp-action-menu
                    @change=${this.changeHandler}
                    placement="bottom-end"
                    quiet
                >
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </div>
        `;
    };

    protected override render(): TemplateResult {
        return html`
            ${this.renderImage()}
            <div class="header">
                ${this.renderHeading}
                ${when(this.hasActionMenu, this.renderActionMenu)}
            </div>
            <div class="content">${this.renderSubtitleAndDescription()}</div>
            <div class="footer">
                ${when(
                    this.hasPagination && this.totalSteps > 0,
                    this.renderSteps
                )}
                ${this.renderButtons()}
            </div>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
    }
}

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
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { when } from '@spectrum-web-components/base/src/directives.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import coachmarkStyles from './coachmark.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js';
import { Popover } from '@spectrum-web-components/popover';
import { join } from 'lit/directives/join.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Placement } from '@spectrum-web-components/overlay';
import { MediaType, VideoType } from './CoachmarkItem.js';
import type { CoachmarkItem } from './CoachmarkItem.js';
import '@spectrum-web-components/asset/sp-asset.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
/**
 * @element sp-coackmark
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot heading - HTML content to be listed as the heading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 * @slot footer - Footer text
 */
export class Coachmark extends LikeAnchor(Popover) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, coachmarkStyles, chevronStyles];
    }
    @property({ type: Object })
    public item?: CoachmarkItem;

    @property({ type: String })
    public override placement: Placement = 'right';
    /**
     * The text content of the Rich Tooltip.
     * Includes an optional text descriptor for an image.
     */
    @property({ type: Object, attribute: false })
    private content?: {
        title?: string;
        description?: string;
        imageAlt?: string;
    };

    @property({ type: Number })
    public offset = 6;

    /**
     * The keyboard shortcut corresponding to an action
     */
    @property({ attribute: 'shortcut-key' })
    private shortcutKey?: string;

    /**
     * Any modifier keys needed for the shortcut, like Shift, Alt, Cmd, or Win.
     * These render before the shortcutKey.
     */
    @property({ type: Array })
    public modifierKeys?: string[] = [];

    @property()
    public triggerInteraction?: 'click' | 'longpress' | 'hover';

    @property({ attribute: 'src' })
    private source?: string;

    @property({ attribute: 'media-type' })
    private mediaType?: MediaType;

    @property({ attribute: 'video-type' })
    private videoType?: VideoType;

    @property({ type: Boolean, attribute: 'has-asset', reflect: true })
    public hasAsset = false;

    /**
     * attr can-play is used to trigger the video play
     */
    @property({ type: Boolean, attribute: 'can-play' })
    public canPlay = false;

    protected videoPlayPromise?: Promise<void>;

    @query('video')
    protected videoAsset?: HTMLVideoElement;

    @property()
    public asset?: 'file' | 'folder';

    @property({ type: Number })
    public currentStep?: number;

    @property({ type: Number })
    public totalSteps?: number;

    @property({ type: Boolean })
    public inTour = true;

    @property({ type: Boolean })
    public nextButton = true;

    @property({ type: Boolean })
    public prevButton = true;

    @property({ type: Boolean })
    public hasActionMenu = true;

    @property({ type: Boolean })
    public showSteps = true;

    @property({ type: Boolean, attribute: 'skip-dissmissable' })
    private skipDismissable = false;

    constructor() {
        super();
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    protected handleKeydown(event: KeyboardEvent): void {
        if (this.skipDismissable) {
            return;
        }
        if (isCloseKeyEvent(event)) {
            event.preventDefault();
            this.dispatchClose();
        }
    }

    private dispatchClose(): void {
        this.dispatchEvent(
            new Event('close', { bubbles: true, composed: true })
        );
    }

    private interactOnVideo(): void {
        if (!this.videoAsset) return;

        if (this.canPlay) {
            this.videoPlayPromise = this.videoAsset.play();
            this.videoPlayPromise.catch((error) => {
                console.error(error);
            });
        } else {
            this.pauseVideo();
        }
    }

    private pauseVideo(): void {
        if (this.videoPlayPromise !== undefined) {
            this.videoPlayPromise.then(() => {
                this.videoAsset?.pause();
            });
        }
    }

    private renderMedia(): TemplateResult {
        const isVideo = this.mediaType === MediaType.VIDEO;
        const isImage = this.mediaType === MediaType.IMAGE;
        this.hasAsset = isVideo || isImage;

        if (!isVideo && !isImage) {
            return html`
                <slot name="asset"></slot>
            `;
        }

        if (isVideo) {
            return html`
                <sp-asset class="asset">
                    <video loop muted preload="auto">
                        <source
                            src="${ifDefined(this.source)}"
                            type="${ifDefined(this.videoType)}"
                        />
                    </video>
                </sp-asset>
            `;
        }

        return html`
            <sp-asset id="cover-photo">
                <div class="image-wrapper">
                    <img
                        class="image"
                        loading="lazy"
                        slot="cover-photo"
                        src="${ifDefined(this.source)}"
                        alt="${ifDefined(this?.content?.imageAlt)}"
                    />
                </div>
            </sp-asset>
        `;
    }

    private renderModifier(
        modifierKey: string,
        type: 'modifier' | 'shortcut' = 'modifier'
    ): TemplateResult {
        return html`
            <span type="${type}" class="keyboard-shortcut">${modifierKey}</span>
        `;
    }

    private renderJoiner(): TemplateResult {
        return html`
            <span class="plus">&plus;</span>
        `;
    }

    private renderHeader(): TemplateResult {
        const hasModifier = this.modifierKeys && this.modifierKeys?.length > 0;
        const hasShortcut = Boolean(this.shortcutKey);
        const hasTitle = Boolean(this.content?.title);
        if (!hasTitle && !hasModifier && !hasShortcut) {
            return html`
                <slot name="title"></slot>
            `;
        }
        return html`
            <div class="header">
                ${hasTitle
                    ? html`
                          <div class="title">${this.content?.title}</div>
                      `
                    : nothing}
                ${hasModifier || hasShortcut
                    ? html`
                          <kbd class="keys spectrum-Body spectrum-Body--sizeS">
                              ${hasModifier
                                  ? join(
                                        this.modifierKeys?.map((k) =>
                                            this.renderModifier(k)
                                        ),
                                        this.renderJoiner()
                                    )
                                  : nothing}
                              ${hasShortcut && hasModifier
                                  ? this.renderJoiner()
                                  : nothing}
                              ${hasShortcut
                                  ? this.renderModifier(
                                        this.shortcutKey!,
                                        'shortcut'
                                    )
                                  : nothing}
                          </kbd>
                      `
                    : nothing}
                ${this.hasActionMenu ? this.renderActionMenu() : nothing}
            </div>
        `;
    }

    private renderContent(): TemplateResult {
        const hasDescription = Boolean(this.content?.description);
        if (!hasDescription)
            return html`
                <slot name="content"></slot>
            `;
        return html`
            <div>${unsafeHTML(this.content?.description)}</div>
        `;
    }

    private stopPropagationOnHref(event: Event): void {
        if (this.href) {
            event.stopPropagation();
        }
    }

    protected renderButtons = (): TemplateResult => {
        // if not in tour or for a single coach mark use OK
        if (!this.inTour || this.totalSteps === 1) {
            return html`
                <sp-button-group class="spectrum-ButtonGroup buttongroup">
                    <sp-button variant="primary" treatment="outline" size="s">
                        Ok
                    </sp-button>
                </sp-button-group>
            `;
        }

        if (this.inTour && this.totalSteps && this.totalSteps > 1) {
            const showPreviousButton =
                this.currentStep && this.currentStep > 1 && this.prevButton;
            const showNextButton = this.totalSteps > 0 && this.nextButton;
            // Within a tour, use “Next” for all but the last step, and “Finish” for the last step
            const nextButtonText =
                this.currentStep === this.totalSteps ? 'Finish' : 'Next';
            return html`
                <sp-button-group class="spectrum-ButtonGroup buttongroup">
                    ${showPreviousButton
                        ? html`
                              <sp-button
                                  variant="secondary"
                                  treatment="outline"
                              >
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
        // Default case: return an empty template
        return html``;
    };

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

    protected renderActionMenu = (): TemplateResult => {
        return html`
            <div class="action-menu" @pointerdown=${this.stopPropagationOnHref}>
                <sp-action-menu placement="bottom-end" quiet slot="actions">
                    <sp-menu-item>Skip tour</sp-menu-item>
                    <sp-menu-item>Restart tour</sp-menu-item>
                </sp-action-menu>
            </div>
        `;
    };

    protected override render(): TemplateResult {
        return html`
            ${this.renderMedia()} ${this.renderHeader()}
            <div class="content">${this.renderContent()}</div>
            <div class="footer">
                ${when(
                    this.inTour && this.totalSteps && this.totalSteps > 0,
                    this.renderSteps
                )}
                ${this.renderButtons()}
            </div>
        `;
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        document.addEventListener('keydown', this.handleKeydown);
    }

    public override disconnectedCallback(): void {
        document.removeEventListener('keydown', this.handleKeydown);
        super.disconnectedCallback();
    }

    protected override updated(changed: PropertyValues): void {
        super.updated(changed);
        if (!this.videoAsset) {
            return;
        }
        if (changed.has('source')) {
            this.videoAsset.load();
            this.canPlay = true;
            this.interactOnVideo();
        }
        if (changed.has('canPlay')) {
            if (this.canPlay) {
                this.interactOnVideo();
            }
        }
    }
}

export function isCloseKeyEvent(event: KeyboardEvent): boolean {
    return (
        event.key === 'Escape' ||
        (event.key === '.' && (event.metaKey || event.ctrlKey))
    );
}

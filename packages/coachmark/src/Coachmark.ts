/*
Copyright 2023 Adobe. All rights reserved.
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
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { when } from '@spectrum-web-components/base/src/directives.js';
import coachmarkStyles from './coachmark.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import chevronIconOverrides from '@spectrum-web-components/icon/src/icon-chevron-overrides.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron200.js';
import { Popover } from '@spectrum-web-components/popover';
import { join } from '@spectrum-web-components/base/src/directives.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import type { Placement } from '@spectrum-web-components/overlay';
import { MediaType } from './CoachmarkItem.js';
import type { CoachmarkItem } from './CoachmarkItem.js';
import '@spectrum-web-components/asset/sp-asset.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/button-group/sp-button-group.js';

/**
 * @element sp-coachmark
 * @fires primary - Announces that the "primary" button has been clicked.
 * @fires secondary - Announces that the "secondary" button has been clicked.
 * @slot cover-photo - This is the cover photo for Default and Quiet Coachmark
 * @slot heading - HTML content to be listed as the heading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represented object
 * @slot step-count - Override the default pagination delivery with your own internationalized content
 */
export class Coachmark extends Popover {
    public static override get styles(): CSSResultArray {
        return [
            ...super.styles,
            coachmarkStyles,
            chevronStyles,
            chevronIconOverrides,
        ];
    }
    /**
     * The item associated with the coachmark.
     */
    @property({ type: Object })
    public item?: CoachmarkItem;

    /**
     * The placement of the coachmark.
     * Can be 'top', 'bottom', 'left', or 'right'.
     */
    @property({ type: String })
    public override placement: Placement = 'right';

    /**
     * The content of the coachmark.
     * Includes title, description, and image alt text.
     */
    @property({ type: Object, attribute: false })
    private content?: {
        title?: string;
        description?: string;
        imageAlt?: string;
    };

    /**
     * The shortcut key for the coachmark.
     */
    @property({ attribute: 'shortcut-key' })
    private shortcutKey?: string;

    /**
     * The modifier keys for the coachmark.
     */
    @property({ type: Array })
    public modifierKeys?: string[] = [];

    /**
     * The source URL for the coachmark.
     */
    @property({ attribute: 'src' })
    private source?: string;

    /**
     * The media type for the coachmark.
     */
    @property({ attribute: 'media-type' })
    private mediaType?: MediaType;

    /**
     * Indicates whether the coachmark has an asset.
     */
    @property({ type: Boolean, attribute: 'has-asset', reflect: true })
    public hasAsset = false;

    /**
     * The type of asset represented by the coachmark.
     * Can be 'file' or 'folder'.
     */
    @property()
    public asset?: 'file' | 'folder';

    /**
     * The current step of the coachmark.
     */
    @property({ type: Number, attribute: 'current-step' })
    public currentStep?: number;

    /**
     * The total number of steps in the coachmark.
     */
    @property({ type: Number, attribute: 'total-steps' })
    public totalSteps?: number;

    /**
     * The primary call-to-action label for the coachmark.
     */
    @property({ type: String, attribute: 'primary-cta' })
    primaryCTA?: string;

    /**
     * The secondary call-to-action label for the coachmark.
     */
    @property({ type: String, attribute: 'secondary-cta' })
    secondaryCTA?: string;

    /**
     * Renders the media content of the coachmark.
     * Includes the video or image based on the media type.
     */
    private renderMedia(): TemplateResult {
        const isImage = this.mediaType === MediaType.IMAGE;
        if (!isImage) {
            return html`
                <slot name="asset"></slot>
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

    /**
     * Renders a keyboard shortcut modifier key.
     */
    private renderModifier(
        modifierKey: string,
        type: 'modifier' | 'shortcut' = 'modifier'
    ): TemplateResult {
        return html`
            <span type="${type}" class="keyboard-shortcut">${modifierKey}</span>
        `;
    }

    /**
     * Renders a joiner symbol for keyboard shortcuts.
     */
    private renderJoiner(): TemplateResult {
        return html`
            <span class="plus">&plus;</span>
        `;
    }

    /**
     * Renders the header of the coachmark.
     * Includes the title and keyboard shortcuts.
     */
    private renderHeader(): TemplateResult {
        const hasModifier = this.modifierKeys && this.modifierKeys?.length > 0;
        const hasShortcut = Boolean(this.shortcutKey);
        const hasTitle = Boolean(this.content?.title);
        if (!hasTitle && !hasModifier && !hasShortcut) {
            return html`
                <div class="title"><slot name="title"></slot></div>
            `;
        }
        return html`
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
        `;
    }

    /**
     * Renders the content of the coachmark.
     * Includes the description.
     */
    private renderContent(): TemplateResult {
        const hasDescription = Boolean(this.content?.description);
        if (!hasDescription)
            return html`
                <slot name="content"></slot>
            `;
        return html`
            <div>${this.content?.description}</div>
        `;
    }

    /**
     * Handles the click event on the primary button.
     * Dispatches the "primary" event.
     */
    private handlePrimaryCTA(): void {
        this.dispatchEvent(
            new Event('primary', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Handles the click event on the secondary button.
     * Dispatches the "secondary" event.
     */
    private handleSecondaryCTA(): void {
        this.dispatchEvent(
            new Event('secondary', {
                bubbles: true,
                composed: true,
            })
        );
    }

    /**
     * Renders the secondary button.
     */
    private renderSecondaryButton = (): TemplateResult => {
        return html`
            <sp-button
                treatment="outline"
                variant="secondary"
                @click=${this.handleSecondaryCTA}
            >
                ${this.secondaryCTA}
            </sp-button>
        `;
    };

    /**
     * Renders the primary button.
     */
    private renderPrimaryButton = (): TemplateResult => {
        return html`
            <sp-button
                size="s"
                treatment="outline"
                variant="primary"
                @click=${this.handlePrimaryCTA}
            >
                ${this.primaryCTA}
            </sp-button>
        `;
    };

    /**
     * Renders the secondary button for mobile view.
     */
    private renderSecondaryButtonMobile = (): TemplateResult => {
        return html`
            <sp-button
                variant="secondary"
                treatment="outline"
                icon-only
                aria-label="previous"
                @click=${this.handleSecondaryCTA}
            >
                <sp-icon-chevron200
                    size="s"
                    class="spectrum-UIIcon-ChevronLeft75"
                    slot="icon"
                ></sp-icon-chevron200>
            </sp-button>
        `;
    };

    /**
     * Renders the primary button for mobile view.
     */
    private renderPrimaryButtonMobile = (): TemplateResult => {
        return html`
            <sp-button
                size="s"
                treatment="outline"
                variant="primary"
                @click=${this.handlePrimaryCTA}
            >
                ${this.primaryCTA}
            </sp-button>
        `;
    };

    /**
     * Renders the buttons for the coachmark.
     */
    protected renderButtons(): TemplateResult {
        return html`
            <sp-button-group class="spectrum-ButtonGroup buttongroup">
                ${when(this.secondaryCTA, this.renderSecondaryButton)}
                ${when(this.primaryCTA, this.renderPrimaryButton)}
            </sp-button-group>
            <sp-button-group
                class="spectrum-ButtonGroup buttongroup-mobile"
                size="s"
            >
                ${when(this.secondaryCTA, this.renderSecondaryButtonMobile)}
                ${when(this.primaryCTA, this.renderPrimaryButtonMobile)}
            </sp-button-group>
        `;
    }

    /**
     * Renders the step count for the coachmark.
     */
    protected renderSteps = (): TemplateResult => {
        return html`
            <div class="step" role="status">
                <span aria-live="polite">
                    <slot name="step-count">
                        ${this.currentStep} of ${this.totalSteps}
                    </slot>
                </span>
            </div>
        `;
    };

    /**
     * Renders the action menu for the coachmark.
     */
    protected renderActionMenu = (): TemplateResult => {
        return html`
            <div class="action-menu">
                <slot name="actions"></slot>
            </div>
        `;
    };

    /**
     * Renders the coachmark.
     */
    protected override render(): TemplateResult {
        return html`
            ${this.renderMedia()}
            <div class="header">
                <div class="flex-container">${this.renderHeader()}</div>
                <div class="static-item">
                    ${when(
                        this.secondaryCTA && this.primaryCTA,
                        this.renderActionMenu
                    )}
                </div>
            </div>

            <div class="content">${this.renderContent()}</div>
            <div class="footer">
                ${when(
                    this.totalSteps && this.totalSteps > 1,
                    this.renderSteps
                )}
                ${this.renderButtons()}
            </div>
        `;
    }
}

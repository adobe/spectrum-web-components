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
import { property } from '@spectrum-web-components/base/src/decorators.js';
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
import { MediaType } from './CoachmarkItem.js';
import type { CoachmarkItem } from './CoachmarkItem.js';
import '@spectrum-web-components/asset/sp-asset.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/quick-actions/sp-quick-actions.js';

/**
 * @element sp-coachmark
 * @slot cover-photo - This is the cover photo for Default and Quiet Coachmark
 * @slot heading - HTML content to be listed as the heading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 */
export class Coachmark extends LikeAnchor(Popover) {
    public static override get styles(): CSSResultArray {
        return [...super.styles, coachmarkStyles, chevronStyles];
    }
    @property({ type: Object })
    public item?: CoachmarkItem;

    @property({ type: String })
    public override placement: Placement = 'right';

    @property({ type: Object, attribute: false })
    private content?: {
        title?: string;
        description?: string;
        imageAlt?: string;
    };

    @property({ type: Number })
    public offset = 6;

    @property({ attribute: 'shortcut-key' })
    private shortcutKey?: string;

    @property({ type: Array })
    public modifierKeys?: string[] = [];

    @property({ attribute: 'src' })
    private source?: string;

    @property({ attribute: 'media-type' })
    private mediaType?: MediaType;

    @property({ type: Boolean, attribute: 'has-asset', reflect: true })
    public hasAsset = false;

    @property()
    public asset?: 'file' | 'folder';

    @property({ type: Number })
    public currentStep?: number;

    @property({ type: Number })
    public totalSteps?: number;

    @property({ type: Boolean })
    public hasActionMenu = true;

    @property({ type: String, attribute: 'primary-cta' })
    primaryCTA?: string;

    @property({ type: String, attribute: 'secondary-cta' })
    secondaryCTA?: string;

    constructor() {
        super();
    }

    // render video and images
    private renderMedia(): TemplateResult {
        const isImage = this.mediaType === MediaType.IMAGE;
        if (!isImage) {
            return html`
                <slot name="asset"></slot>
            `;
        }
        return html`
            <sp-asset id="cover-photo">
                <div class="image-container">
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
    // method to render modifier
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
    // render heading title and modifier
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
    // render description
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

    private close(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
    }
    // event on primary button
    private handlePrimaryCTA(): void {
        this.dispatchEvent(
            new Event('primary', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
        this.close();
    }
    // event on secondary button
    private handleSecondaryCTA(): void {
        this.dispatchEvent(
            new Event('secondary', {
                bubbles: true,
                cancelable: true,
                composed: true,
            })
        );
        this.close();
    }

    protected renderButtons(): TemplateResult {
        return html`
            <sp-button-group class="spectrum-ButtonGroup buttongroup">
                ${when(
                    this.secondaryCTA,
                    () => html`
                        <sp-button
                            treatment="outline"
                            variant="secondary"
                            @click=${this.handleSecondaryCTA}
                        >
                            ${this.secondaryCTA}
                        </sp-button>
                    `
                )}
                ${when(
                    this.primaryCTA,
                    () => html`
                        <sp-button
                            size="s"
                            treatment="outline"
                            variant="primary"
                            @click=${this.handlePrimaryCTA}
                        >
                            ${this.primaryCTA}
                        </sp-button>
                    `
                )}
            </sp-button-group>
            <sp-button-group
                class="spectrum-ButtonGroup buttongroup-mobile"
                size="s"
            >
                ${when(
                    this.secondaryCTA,
                    () => html`
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
                    `
                )}
                ${when(
                    this.primaryCTA,
                    () => html`
                        <sp-button
                            size="s"
                            treatment="outline"
                            variant="primary"
                            @click=${this.handlePrimaryCTA}
                        >
                            ${this.primaryCTA}
                        </sp-button>
                    `
                )}
            </sp-button-group>
        `;
    }

    // render steps
    protected renderSteps = (): TemplateResult => {
        return html`
            <div class="step" role="status">
                <span aria-live="polite">
                    ${this.currentStep} of ${this.totalSteps}
                </span>
            </div>
        `;
    };
    // render action menu
    protected renderActionMenu = (): TemplateResult => {
        return html`
            <div class="action-menu" @pointerdown=${this.stopPropagationOnHref}>
                <slot name="actions"></slot>
            </div>
        `;
    };

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
                    this.totalSteps && this.totalSteps > 0,
                    this.renderSteps
                )}
                ${this.renderButtons()}
            </div>
        `;
    }

    public override connectedCallback(): void {
        super.connectedCallback();
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
    }

    protected override updated(changed: PropertyValues): void {
        super.updated(changed);
    }
}

export function isCloseKeyEvent(event: KeyboardEvent): boolean {
    return (
        event.key === 'Escape' ||
        (event.key === '.' && (event.metaKey || event.ctrlKey))
    );
}

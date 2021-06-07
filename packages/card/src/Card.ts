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
    property,
    CSSResultArray,
    TemplateResult,
    PropertyValues,
    ifDefined,
} from '@spectrum-web-components/base';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import '@spectrum-web-components/asset/sp-asset.js';

import { ObserveSlotPresence } from '@spectrum-web-components/shared';
import { Checkbox } from '@spectrum-web-components/checkbox/src/Checkbox';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
import cardStyles from './card.css.js';
import headingStyles from '@spectrum-web-components/styles/heading.js';
import detailStyles from '@spectrum-web-components/styles/detail.js';

/**
 * @element sp-card
 *
 * @fires change - Announces a change in the `selected` property of a card
 * @slot preview - This is the preview image for Gallery Cards
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot heading - HTML content to be listed as the heading
 * @slot subheading - HTML content to be listed as the subheading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 * @slot footer - Footer text
 */
export class Card extends ObserveSlotPresence(
    FocusVisiblePolyfillMixin(SpectrumElement),
    ['[slot="cover-photo"]', '[slot="preview"]']
) {
    public static get styles(): CSSResultArray {
        return [headingStyles, detailStyles, cardStyles];
    }

    @property()
    public asset?: 'file' | 'folder';

    @property({ reflect: true })
    public variant: 'standard' | 'gallery' | 'quiet' = 'standard';

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property()
    public heading = '';

    @property({ type: Boolean, reflect: true })
    public horizontal = false;

    @property({ type: Boolean, reflect: true })
    public small = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true })
    public toggles = false;

    @property()
    public subheading = '';

    protected get hasCoverPhoto(): boolean {
        return this.getSlotContentPresence('[slot="cover-photo"]');
    }

    protected get hasPreview(): boolean {
        return this.getSlotContentPresence('[slot="preview"]');
    }

    private handleFocusin = (event: Event): void => {
        this.focused = true;
        const target = event.composedPath()[0];
        if (target !== this) {
            this.removeEventListener('keydown', this.handleKeydown);
            return;
        }
        this.addEventListener('keydown', this.handleKeydown);
    };

    private handleFocusout(event: Event): void {
        this.focused = false;
        const target = event.composedPath()[0];
        if (target === this) {
            this.removeEventListener('keydown', this.handleKeydown);
        }
    }

    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;
        if (code === 'Space') {
            this.toggleSelected();
        }
    }

    private handleSelectedChange({
        target: { checked },
    }: Event & { target: Checkbox }): void {
        this.selected = checked;
        this.announceChange();
    }

    public toggleSelected(): void {
        if (!this.toggles) {
            this.dispatchEvent(
                new Event('click', {
                    bubbles: true,
                    composed: true,
                })
            );
            return;
        }
        this.selected = !this.selected;
        this.announceChange();
    }

    private announceChange(): void {
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.selected = !this.selected;
        }
    }

    protected get renderHeading(): TemplateResult {
        return html`
            <div class="title spectrum-Heading spectrum-Heading--sizeXS">
                <slot name="heading">${this.heading}</slot>
            </div>
        `;
    }

    protected get renderPreviewImage(): TemplateResult {
        return html`
            <sp-asset id="preview" variant=${ifDefined(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
        `;
    }

    protected get renderCoverImage(): TemplateResult {
        return html`
            <sp-asset id="cover-photo" variant=${ifDefined(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
        `;
    }

    protected get images(): TemplateResult[] {
        const images: TemplateResult[] = [];
        if (this.hasPreview) images.push(this.renderPreviewImage);
        if (this.hasCoverPhoto) images.push(this.renderCoverImage);
        return images;
    }

    private renderImage(): TemplateResult[] {
        if (this.horizontal) {
            return this.images;
        }
        if (this.variant !== 'standard') {
            return [this.renderPreviewImage];
        }
        return this.images;
    }

    private get renderSubtitleAndDescription(): TemplateResult {
        return html`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `;
    }

    protected render(): TemplateResult {
        return html`
            ${this.toggles
                ? html`
                      <sp-quick-actions class="quickActions">
                          <sp-checkbox
                              tabindex="-1"
                              class="checkbox"
                              @change=${this.handleSelectedChange}
                              ?checked=${this.selected}
                          ></sp-checkbox>
                      </sp-quick-actions>
                  `
                : html``}
            ${this.variant === 'quiet' && this.small
                ? html`
                      <sp-quick-actions class="spectrum-QuickActions actions">
                          <slot name="actions"></slot>
                      </sp-quick-actions>
                  `
                : html``}
            ${this.renderImage()}
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${this.variant === 'gallery'
                        ? this.renderSubtitleAndDescription
                        : html``}
                    ${this.variant !== 'quiet' || !this.small
                        ? html`
                              <div class="actionButton">
                                  <slot name="actions"></slot>
                              </div>
                          `
                        : html``}
                </div>
                ${this.variant !== 'gallery'
                    ? html`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `
                    : html``}
            </div>
            ${this.variant === 'standard'
                ? html`
                      <slot name="footer"></slot>
                  `
                : html``}
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'figure');
        this.tabIndex = 0;
        this.addEventListener('focusin', this.handleFocusin);
        this.shadowRoot.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
    }
}

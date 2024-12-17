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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import '@spectrum-web-components/asset/sp-asset.js';
import { Checkbox } from '@spectrum-web-components/checkbox/src/Checkbox';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/divider/sp-divider.js';
import cardStyles from './card.css.js';
import headingStyles from '@spectrum-web-components/styles/heading.js';
import detailStyles from '@spectrum-web-components/styles/detail.js';

/**
 * An `<sp-card>` represents a rectangular card that contains a variety of text and image layouts. Cards
 * are typically used to encapsulate units of a data set, such as a gallery of image/caption pairs.
 *
 * @element sp-card
 *
 * @slot preview - This is the preview image for Gallery Cards
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot heading - HTML content to be listed as the heading
 * @slot subheading - HTML content to be listed as the subheading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represented object
 * @slot footer - Footer text
 *
 * @fires change - Announces a change in the `selected` property of a card
 */
export class Card extends LikeAnchor(
    SizedMixin(
        ObserveSlotPresence(FocusVisiblePolyfillMixin(SpectrumElement), [
            '[slot="cover-photo"]',
            '[slot="preview"]',
        ]),
        {
            validSizes: ['s', 'm'],
            noDefaultSize: true,
        }
    )
) {
    public static override get styles(): CSSResultArray {
        return [headingStyles, detailStyles, cardStyles];
    }

    /**
     * The type of asset displayed in the card.
     * Can be either `file` or `folder`.
     */
    @property()
    public asset?: 'file' | 'folder';

    /**
     * The variant of the card.
     * Can be `standard`, `gallery`, or `quiet`.
     */
    @property({ reflect: true })
    public variant: 'standard' | 'gallery' | 'quiet' = 'standard';

    /**
     * Indicates whether the card is selected.
     */
    @property({ type: Boolean, reflect: true })
    get selected(): boolean {
        return this._selected;
    }
    set selected(selected: boolean) {
        if (selected === this.selected) return;

        this._selected = selected;
        this.requestUpdate('selected', !this._selected);
    }

    private _selected = false;

    /**
     * The heading text of the card.
     */
    @property()
    public heading = '';

    /**
     * Indicates whether the card is displayed horizontally.
     */
    @property({ type: Boolean, reflect: true })
    public horizontal = false;

    @query('#like-anchor')
    private likeAnchor?: HTMLAnchorElement;

    /**
     * Indicates whether the card is focused.
     */
    @property({ type: Boolean, reflect: true })
    public focused = false;

    /**
     * Indicates whether the card has a toggleable selection state.
     */
    @property({ type: Boolean, reflect: true })
    public toggles = false;

    /**
     * The value associated with the card.
     */
    @property()
    public value = '';

    /**
     * The subheading text of the card.
     */
    @property()
    public subheading = '';

    protected get hasCoverPhoto(): boolean {
        return this.getSlotContentPresence('[slot="cover-photo"]');
    }

    protected get hasPreview(): boolean {
        return this.getSlotContentPresence('[slot="preview"]');
    }

    public override click(): void {
        this.likeAnchor?.click();
    }

    /**
     * Handle focusin event to manage focus state and keydown event listener.
     */
    private handleFocusin = (event: Event): void => {
        this.focused = true;
        const target = event.composedPath()[0];

        if (target !== this) {
            this.removeEventListener('keydown', this.handleKeydown);

            return;
        }

        this.addEventListener('keydown', this.handleKeydown);
    };

    /**
     * Handle focusout event to manage focus state and keydown event listener.
     */
    private handleFocusout(event: Event): void {
        this.focused = false;
        const target = event.composedPath()[0];

        if (target === this) {
            this.removeEventListener('keydown', this.handleKeydown);
        }
    }

    /**
     * Handle keydown event to manage selection and click actions.
     */
    private handleKeydown(event: KeyboardEvent): void {
        const { code } = event;

        switch (code) {
            case 'Space':
                this.toggleSelected();

                if (this.toggles) {
                    event.preventDefault();
                    break;
                }
            case 'Enter':
            case 'NumpadEnter':
                this.click();
        }
    }

    /**
     * Handle change event from the checkbox to update the selected state.
     */
    private handleSelectedChange(event: Event & { target: Checkbox }): void {
        event.stopPropagation();
        this.selected = event.target.checked;
        this.announceChange();
    }

    /**
     * Toggle the selected state of the card.
     */
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

    /**
     * Announce a change in the selected state of the card.
     */
    private announceChange(): void {
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
                bubbles: true,
                composed: true,
            })
        );

        if (!applyDefault) {
            this.selected = !this.selected;
        }
    }

    /**
     * Stop event propagation if the card has an href attribute.
     */
    private stopPropagationOnHref(event: Event): void {
        if (this.href) {
            event.stopPropagation();
        }
    }

    /**
     * Handle pointerdown event to manage click actions.
     */
    private handlePointerdown(event: Event): void {
        const path = event.composedPath();
        const hasAnchor = path.some(
            (el) => (el as HTMLElement).localName === 'a'
        );

        if (hasAnchor) return;

        const start = +new Date();
        const handleEnd = (): void => {
            const end = +new Date();

            if (end - start < 200) {
                this.click();
            }

            this.removeEventListener('pointerup', handleEnd);
            this.removeEventListener('pointercancel', handleEnd);
        };

        this.addEventListener('pointerup', handleEnd);
        this.addEventListener('pointercancel', handleEnd);
    }

    /**
     * Render the heading section of the card, including the slot for custom heading content.
     */
    protected get renderHeading(): TemplateResult {
        return html`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `;
    }

    /**
     * Render the preview image of the card, which is displayed in the preview slot.
     */
    protected get renderPreviewImage(): TemplateResult {
        return html`
            <sp-asset id="preview" variant=${ifDefined(this.asset)}>
                <slot name="preview"></slot>
            </sp-asset>
            ${this.variant !== 'quiet' && !this.horizontal
                ? html`
                      <sp-divider size="s"></sp-divider>
                  `
                : nothing}
        `;
    }

    /**
     * Render the cover image of the card, which is displayed in the cover-photo slot.
     */
    protected get renderCoverImage(): TemplateResult {
        return html`
            <sp-asset id="cover-photo" variant=${ifDefined(this.asset)}>
                <slot name="cover-photo"></slot>
            </sp-asset>
            ${this.variant !== 'quiet' && !this.horizontal
                ? html`
                      <sp-divider size="s"></sp-divider>
                  `
                : nothing}
        `;
    }

    /**
     * Get the images to be rendered in the card.
     */
    protected get images(): TemplateResult[] {
        const images: TemplateResult[] = [];

        if (this.hasPreview) images.push(this.renderPreviewImage);

        if (this.hasCoverPhoto) images.push(this.renderCoverImage);

        return images;
    }

    /**
     * Render the images in the card based on its layout.
     */
    private renderImage(): TemplateResult[] {
        if (this.horizontal) {
            return this.images;
        }

        if (this.variant !== 'standard') {
            return [this.renderPreviewImage];
        }

        return this.images;
    }

    /**
     * Render the subtitle and description slots of the card, including the subheading and description content.
     */
    private get renderSubtitleAndDescription(): TemplateResult {
        return html`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `;
    }

    /**
     * Render the card's layout and content based on its properties and slots.
     */
    protected override render(): TemplateResult {
        return html`
            ${this.renderImage()}
            <div class="body">
                <div class="header">
                    ${this.renderHeading}
                    ${this.variant === 'gallery'
                        ? this.renderSubtitleAndDescription
                        : nothing}
                    ${this.variant !== 'quiet' || this.size !== 's'
                        ? html`
                              <div
                                  class="action-button"
                                  @pointerdown=${this.stopPropagationOnHref}
                              >
                                  <slot name="actions"></slot>
                              </div>
                          `
                        : nothing}
                </div>
                ${this.variant !== 'gallery'
                    ? html`
                          <div class="content">
                              ${this.renderSubtitleAndDescription}
                          </div>
                      `
                    : nothing}
            </div>
            ${this.href
                ? this.renderAnchor({
                      id: 'like-anchor',
                      labelledby: 'heading',
                  })
                : nothing}
            ${this.variant === 'standard'
                ? html`
                      <slot name="footer"></slot>
                  `
                : nothing}
            ${this.toggles
                ? html`
                      <sp-popover
                          class="checkbox-toggle"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <sp-checkbox
                              class="checkbox"
                              @change=${this.handleSelectedChange}
                              ?checked=${this.selected}
                              tabindex="-1"
                          ></sp-checkbox>
                      </sp-popover>
                  `
                : nothing}
            ${this.variant === 'quiet' && this.size === 's'
                ? html`
                      <div
                          class="spectrum-QuickActions actions"
                          @pointerdown=${this.stopPropagationOnHref}
                      >
                          <slot name="actions"></slot>
                      </div>
                  `
                : nothing}
        `;
    }

    /**
     * Perform initial setup after the first update.
     */
    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('focusin', this.handleFocusin);
        this.shadowRoot.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
    }
}

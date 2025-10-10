/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
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
        return [cardStyles];
    }

    @property()
    public asset?: 'file' | 'folder';

    @property({ reflect: true })
    public variant: 'standard' | 'gallery' | 'quiet' = 'standard';

    @property({ type: Boolean, reflect: true })
    get selected(): boolean {
        return this._selected;
    }
    set selected(selected: boolean) {
        if (selected === this.selected) return;
        this._selected = selected;
        if (this.role === 'row' && this.toggles) {
            this.setAttribute('aria-selected', String(this.selected));
        }
        this.requestUpdate('selected', !this._selected);
    }

    private _selected = false;

    @property()
    public heading = '';

    @property({ type: Boolean, reflect: true })
    public horizontal = false;

    @query('#like-anchor')
    private likeAnchor?: HTMLAnchorElement;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    /**
     * Indicates whether the card can be toggled between selected and unselected states.
     */
    @property({ type: Boolean, reflect: true })
    public toggles = false;

    @property()
    public value = '';

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

    private handleSelectedChange(event: Event & { target: Checkbox }): void {
        event.stopPropagation();
        this.selected = event.target.checked;
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
                bubbles: true,
                composed: true,
            })
        );
        if (!applyDefault) {
            this.selected = !this.selected;
        }
    }

    private stopPropagationOnHref(event: Event): void {
        if (this.href) {
            event.stopPropagation();
        }
    }

    /**
     * Handles pointer down events on the card element.
     * Implements a click detection system that distinguishes between clicks and drags
     * based on duration and movement distance.
     */
    private handlePointerdown(event: PointerEvent): void {
        const path = event.composedPath();
        const hasAnchor = path.some(
            (el) => (el as HTMLElement).localName === 'a'
        );
        if (hasAnchor) return;
        // Record the time and initial position of the pointerdown event
        const startTime = event.timeStamp;
        const startX = event.clientX;
        const startY = event.clientY;

        // Define the handler for when the pointer interaction ends
        const handleEnd = (endEvent: PointerEvent): void => {
            const endTime = endEvent.timeStamp;
            const endX = endEvent.clientX;
            const endY = endEvent.clientY;

            // Calculate time duration and movement distance of the pointer
            const timeDelta = endTime - startTime;
            const moveX = Math.abs(endX - startX);
            const moveY = Math.abs(endY - startY);

            // Consider the pointer interaction a "click" only if:
            // - It was short (under 200ms)
            // - It didn't move significantly (less than 10px in any direction)
            const moved = moveX > 10 || moveY > 10;

            if (timeDelta < 200 && !moved) {
                this.click();
            }

            this.removeEventListener('pointerup', handleEnd);
            this.removeEventListener('pointercancel', handleEnd);
        };

        this.addEventListener('pointerup', handleEnd);
        this.addEventListener('pointercancel', handleEnd);
    }

    protected get renderHeading(): TemplateResult {
        return html`
            <div class="title" id="heading">
                <slot name="heading">${this.heading}</slot>
            </div>
        `;
    }

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
            <div class="subtitle">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `;
    }

    protected override render(): TemplateResult {
        /* When rendering the card within a grid,
        where the card has role="row", the row have an
        immediate descendant of role="gridcell", otherwise
        the role for the content wrapper can remain undefined. */
        const roleForWrapper = this.role === 'row' ? 'gridcell' : undefined;
        return html`
            <div class="wrapper" role=${ifDefined(roleForWrapper)}>
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
                                  .checked=${this.selected}
                              >
                                  <span class="sr-only">
                                      ${this.label || this.heading}
                                  </span>
                              </sp-checkbox>
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
            </div>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (changes.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('focusin', this.handleFocusin);
        this.shadowRoot.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
    }

    protected override update(changes: PropertyValues): void {
        super.update(changes);
        if (changes.has('label')) {
            if (this.label) {
                this.setAttribute('aria-label', this.label);
            } else {
                this.removeAttribute('aria-label');
            }
        }
    }
}

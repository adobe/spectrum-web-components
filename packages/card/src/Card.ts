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

import '@spectrum-web-components/asset/sp-asset.js';
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
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    ifDefined,
    when,
} from '@spectrum-web-components/base/src/directives.js';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import { Checkbox } from '@spectrum-web-components/checkbox/src/Checkbox';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import { LikeAnchor } from '@spectrum-web-components/shared/src/like-anchor.js';
import { ObserveSlotPresence } from '@spectrum-web-components/shared/src/observe-slot-presence.js';
import detailStyles from '@spectrum-web-components/styles/detail.js';
import headingStyles from '@spectrum-web-components/styles/heading.js';
import cardStyles from './card.css.js';

/**
 * @element sp-card
 *
 * @fires change - Announces a change in the `selected` property of a card
 * @slot image - This is the image of the card
 * @slot heading - HTML content to be listed as the heading
 * @slot subheading - HTML content to be listed as the subheading
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 * @slot footer - Footer text
 */
export class Card extends LikeAnchor(
    SizedMixin(
        ObserveSlotPresence(
            FocusVisiblePolyfillMixin(SpectrumElement),
            '[slot="image"]'
        ),
        {
            validSizes: ['s', 'm'],
            noDefaultSize: true,
        }
    )
) {
    public static override get styles(): CSSResultArray {
        return [headingStyles, detailStyles, cardStyles];
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

    @property({ type: Boolean, reflect: true })
    public toggles = false;

    @property()
    public value = '';

    @property()
    public subheading = '';

    protected hasImage(): boolean {
        return this.getSlotContentPresence('[slot="image"]');
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

    protected renderHeading(): TemplateResult {
        return html`
            <div
                class="title spectrum-Heading spectrum-Heading--sizeXS"
                id="heading"
            >
                <slot name="heading">${this.heading}</slot>
            </div>
        `;
    }

    protected renderImage(): TemplateResult {
        const hasPreview =
            this.variant === 'gallery' ||
            this.variant === 'quiet' ||
            this.horizontal;

        return html`
            <sp-asset
                id=${hasPreview ? 'preview' : 'cover-photo'}
                variant=${ifDefined(this.asset)}
            >
                <slot name="image"></slot>
            </sp-asset>
            ${this.variant !== 'quiet' && !this.horizontal
                ? html`
                      <sp-divider size="s"></sp-divider>
                  `
                : nothing}
        `;
    }

    protected renderSubtitleAndDescription(): TemplateResult {
        return html`
            <div class="subtitle spectrum-Detail spectrum-Detail--sizeS">
                <slot name="subheading">${this.subheading}</slot>
            </div>
            <slot name="description"></slot>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            ${when(
                this.hasImage(),
                () => this.renderImage(),
                () => nothing
            )}
            <div class="body">
                <div class="header">
                    ${this.renderHeading()}
                    ${this.variant === 'gallery'
                        ? this.renderSubtitleAndDescription()
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
                              ${this.renderSubtitleAndDescription()}
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

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('pointerdown', this.handlePointerdown);
        this.addEventListener('focusin', this.handleFocusin);
        this.shadowRoot.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
    }
}

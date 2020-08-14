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
} from '@spectrum-web-components/base';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import '@spectrum-web-components/asset/sp-asset.js';

// import { MoreIcon } from '@spectrum-web-components/icons-workflow';
import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
import cardStyles from './card.css.js';
import { Checkbox } from '@spectrum-web-components/checkbox/src/Checkbox';
import { ifDefined } from 'lit-html/directives/if-defined';

/**
 * @element sp-card
 *
 * @fires change - Announces a change in the `selected` property of a card
 * @slot preview - This is the preview image for Gallery Cards
 * @slot cover-photo - This is the cover photo for Default and Quiet Cards
 * @slot title - HTML content to be listed as the title
 * @slot subtitle - HTML content to be listed as the subtitle
 * @slot description - A description of the card
 * @slot actions - an `sp-action-menu` element outlining actions to take on the represened object
 * @slot footer - Footer text
 */
export class Card extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static get styles(): CSSResultArray {
        return [cardStyles];
    }

    @property()
    public asset?: 'file' | 'folder';

    @property({ reflect: true })
    public variant: 'standard' | 'gallery' | 'quiet' = 'standard';

    @property({ type: Boolean, reflect: true })
    public selected = false;

    @property()
    public title = '';

    @property({ type: Boolean, reflect: true })
    public horizontal = false;

    @property({ type: Boolean, reflect: true })
    public small = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: Boolean, reflect: true })
    public toggles = false;

    @property()
    public subtitle = '';

    public constructor() {
        super();
        this.addEventListener('focusin', this.handleFocusin);
        this.shadowRoot.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
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
        /* istanbul ignore else */
        if (code === 'Space') {
            this.toggleSelected();
        }
    }

    private handleSelectedChange(event: Event & { target: Checkbox }): void {
        const { target } = event;
        this.selected = target.checked;
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
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                cancelable: true,
            })
        );
        if (!applyDefault) {
            this.selected = !this.selected;
        }
    }

    protected get renderTitle(): TemplateResult {
        return html`
            <div class="title">
                <slot name="title">
                    ${this.title}
                </slot>
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

    private renderImage(): TemplateResult {
        if (this.horizontal) {
            return this.renderPreviewImage;
        }
        if (this.variant === 'standard') {
            return html`
                <sp-asset id="cover-photo" variant=${ifDefined(this.asset)}>
                    <slot name="cover-photo"></slot>
                </sp-asset>
            `;
        }
        return this.renderPreviewImage;
    }

    /**
     * sp-asset
     * sp-quick-actions
     * sp-checkbox
     *
     */
    protected render(): TemplateResult {
        return html`
            ${this.toggles
                ? html`
                      <sp-quick-actions
                          class="spectrum-QuickActions quickActions"
                      >
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
                    ${this.renderTitle}
                    ${this.variant === 'gallery'
                        ? html`
                              <div class="subtitle">
                                  <slot name="subtitle">
                                      ${this.subtitle}
                                  </slot>
                              </div>
                              <slot name="description"></slot>
                          `
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
                              <div class="subtitle">
                                  <slot name="subtitle">
                                      ${this.subtitle}
                                  </slot>
                              </div>
                              <slot name="description"></slot>
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
    }
}

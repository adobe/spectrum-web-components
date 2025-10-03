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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';

import { SpectrumElement } from '@swc/core/shared/base';

import styles from './select-box.css';
/**
 * A select box component that allows users to choose from a collection of options.
 * Select boxes are ideal for presenting multiple options in a selectable format,
 * often used for configuration settings or content selection interfaces.
 *
 * @element swc-select-box
 * @since 2.0.0
 * @status stable
 * @github https://github.com/adobe/spectrum-web-components/tree/main/second-gen/packages/swc/components/select-box
 * @figma https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Desktop?node-id=147054-100043
 *
 * @attribute {boolean} selected - Whether the select box is selected.
 * @attribute {boolean} disabled - Whether the select box is disabled.
 * @attribute {string} orientation - The orientation of the select box: 'vertical' or 'horizontal'.
 * @attribute {string} size - The size of the select box.
 * @attribute {boolean} show-illustration - Whether to show the illustration.
 * @attribute {boolean} show-checkbox - Whether to show the checkbox indicator.
 * @attribute {boolean} emphasized - Whether the checkbox should be emphasized (blue styling).
 *
 * @slot - The main label content of the select box
 * @slot description - Optional description text that provides additional context
 * @slot illustration - Optional illustration or icon content
 *
 * @fires select-change - Dispatched when the selection state changes
 *
 * @example
 * <swc-select-box selected>Home address</swc-select-box>
 *
 * @example
 * <swc-select-box show-illustration show-checkbox>
 *   <span slot="illustration">🏠</span>
 *   Home address
 *   <span slot="description">Primary residential address</span>
 * </swc-select-box>
 */
export class SelectBox extends SpectrumElement {
    /**
     * Whether the select box is in a selected state.
     */
    @property({ type: Boolean, reflect: true })
    public selected: boolean = false;

    /**
     * Whether the select box is disabled.
     */
    @property({ type: Boolean, reflect: true })
    public disabled: boolean = false;

    /**
     * The orientation of the select box layout.
     * @default 'vertical'
     */
    @property({ reflect: true })
    public orientation: 'vertical' | 'horizontal' = 'vertical';

    /**
     * Whether to display the illustration slot.
     * @default true
     */
    @property({ type: Boolean, reflect: true, attribute: 'show-illustration' })
    public showIllustration: boolean = true;

    /**
     * Whether to display a checkbox indicator.
     * @default false
     */
    @property({ type: Boolean, reflect: true, attribute: 'show-checkbox' })
    public showCheckbox: boolean = false;

    /**
     * Whether the checkbox should be emphasized (blue styling).
     * @default false
     */
    @property({ type: Boolean, reflect: true })
    public emphasized: boolean = false;

    /**
     * SVG content to display in the illustration slot.
     */
    @property({ type: String })
    public svgContent: string = '';

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    ['spectrum-SelectBox']: true,
                    [`spectrum-SelectBox--size${this.size?.toUpperCase()}`]:
                        typeof this.size !== 'undefined',
                    [`spectrum-SelectBox--${this.orientation}`]: true,
                    [`spectrum-SelectBox--selected`]: this.selected,
                    [`spectrum-SelectBox--disabled`]: this.disabled,
                })}
                role="option"
                aria-selected=${this.selected ? 'true' : 'false'}
                tabindex=${this.disabled ? '-1' : '0'}
                @click=${this.handleClick}
                @keydown=${this.handleKeydown}
            >
                <div class="spectrum-SelectBox-content">
                    ${when(
                        this.showIllustration,
                        () => html`
                            <div class="spectrum-SelectBox-illustration">
                                ${this.svgContent
                                    ? unsafeHTML(this.svgContent)
                                    : html`<slot name="illustration"></slot>`}
                            </div>
                        `
                    )}
                    <div class="spectrum-SelectBox-textFrame">
                        <div class="spectrum-SelectBox-label">
                            <slot></slot>
                        </div>
                        ${when(
                            this.hasSlotContent('description'),
                            () => html`
                                <div class="spectrum-SelectBox-description">
                                    <slot name="description"></slot>
                                </div>
                            `
                        )}
                    </div>
                </div>
                ${when(
                    this.showCheckbox,
                    () => html`
                        <!-- <sp-checkbox
                            class="spectrum-SelectBox-checkbox"
                            .checked=${this.selected}
                            .disabled=${this.disabled}
                            .emphasized=${this.emphasized}
                            @change=${this.handleCheckboxChange}
                        ></sp-checkbox> -->
                        <div class="spectrum-SelectBox-checkbox">
                            <div class="spectrum-SelectBox-checkmark">
                                ${this.selected ? '✓' : ''}
                            </div>
                        </div>
                    `
                )}
            </div>
        `;
    }

    private handleClick(): void {
        if (this.disabled) {
            return;
        }

        this.selected = !this.selected;
        this.dispatchEvent(
            new CustomEvent('select-change', {
                detail: { selected: this.selected },
                bubbles: true,
            })
        );
    }

    private handleCheckboxChange(event: Event): void {
        // Prevent the checkbox event from bubbling up to avoid double-toggling
        event.stopPropagation();

        if (this.disabled) {
            return;
        }

        const checkbox = event.target as Checkbox;
        this.selected = checkbox.checked;
        this.dispatchEvent(
            new CustomEvent('select-change', {
                detail: { selected: this.selected },
                bubbles: true,
            })
        );
    }

    private handleKeydown(event: KeyboardEvent): void {
        if (this.disabled) {
            return;
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleClick();
        }
    }

    private hasSlotContent(slotName: string): boolean {
        const slot = this.shadowRoot?.querySelector(
            `slot[name="${slotName}"]`
        ) as HTMLSlotElement;
        return slot ? slot.assignedNodes().length > 0 : false;
    }
}

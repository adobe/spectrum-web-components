/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, PropertyValues, ReactiveElement, TemplateResult } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface FormFieldElementInterface {
    fieldId: string;
    label?: string;
    helpText?: string;
    negativeHelpText?: string;
    labelPosition?: string;
    necessityIndicator?: string;
    disabled: boolean;
    hideLabel: boolean;
    invalid: boolean;
    required: boolean;
    readOnly: boolean;
}

export function FormFieldMixin<T extends Constructor<ReactiveElement>>(
    constructor: T
): T & Constructor<FormFieldElementInterface> {
    class FormFieldElement extends constructor {
        /**
         * id of the field element using the mixin
         */
        @property({ type: String }) fieldId = 'field';

        /**
         * optional label as property
         */
        @property({ type: String }) label?: string;

        /**
         * optional help text as property
         */
        @property({ type: String, attribute: 'help-text' }) helpText?: string;

        /**
         * optional error help text as property
         */
        @property({ type: String, attribute: 'negative-help-text' })
        negativeHelpText?: string;

        /**
         * optional label position as property,
         * where 'end' aligns the label against the edge of the field
         * and 'start' aligns the label against the edge of the container
         */
        @property({ type: String, attribute: 'label-position' })
        labelPosition?: 'start' | 'end';

        /**
         * optional property to add text indicating field is required,
         * for example: '(required)'
         */
        @property({ type: String, attribute: 'necessity-indicator' })
        necessityIndicator?: string;

        /**
         * whether field is disabled
         */
        @property({ type: Boolean }) disabled = false;

        /**
         * whether field value is invalid
         */
        @property({ type: Boolean }) invalid = false;

        /**
         * whether label should be visually hidden (not recommended)
         */
        @property({ type: Boolean, attribute: 'hide-label' }) hideLabel = false;

        /**
         * whether a field value is required
         */
        @property({ type: Boolean }) required = false;

        /**
         * whether field value cannot be changed
         */
        @property({ type: Boolean }) readOnly = false;

        @queryAssignedNodes({ slot: 'label', flatten: true })
        _labelNodes!: Array<Node>;

        @queryAssignedNodes({ slot: 'help-text', flatten: true })
        _helpNodes!: Array<Node>;

        @queryAssignedNodes({ slot: 'help-text', flatten: true })
        _negativeHelpNodes!: Array<Node>;

        /**
         * help text's `aria-describedby` attribute value for the field element
         */
        protected get describedBy(): string {
            return this._showNegativeHelpText
                ? `${this.fieldId}-negative-help-text`
                : this._showHelpText
                  ? `${this.fieldId}-help-text`
                  : '';
        }

        /**
         *  class map of common classes for labels and help text
         */
        protected get baseClasses(): Record<string, boolean> {
            return {
                'is-disabled': this.disabled,
                'is-invalid': this.invalid,
                'is-required': this.required,
                'is-readOnly': this.readOnly,
            };
        }

        private get _hasLabel(): boolean {
            const label = this.label ? this.label.trim()?.length > 0 : false;
            return label || this._hasNodeContent(this._labelNodes);
        }

        private get _hasHelpText(): boolean {
            const helpText = this.helpText
                ? this.helpText.trim()?.length > 0
                : false;
            return helpText || this._hasNodeContent(this._helpNodes);
        }

        private get _hasNegativeHelpText(): boolean {
            const negativeHelpText = this.negativeHelpText
                ? this.negativeHelpText.trim()?.length > 0
                : false;
            return (
                negativeHelpText ||
                this._hasNodeContent(this._negativeHelpNodes)
            );
        }

        // show negative help text if it exists and there is an error
        private get _showNegativeHelpText(): boolean {
            return this.invalid && this._hasNegativeHelpText;
        }

        // show help text if it exists and negative help text is not shown
        private get _showHelpText(): boolean {
            return this._hasHelpText && !this._showNegativeHelpText;
        }

        /**
         * generates a label element for the field, given a size and direction
         * @param size from field's SizedMixin
         * @param rtl  from field's direction property
         */
        protected renderLabel(size = 'M', rtl?: false): TemplateResult {
            const componentClass = 'spectrum-FieldLabel';
            const direction =
                (this.labelPosition === 'end' && rtl) ||
                (this.labelPosition !== 'end' && !rtl)
                    ? 'left'
                    : 'right';
            const classes = {
                ...this.baseClasses,
            };
            classes[componentClass] = true;
            classes[`${componentClass}--${size}`] = true;
            classes[`${componentClass}--${direction}`] = true;
            return html`
                <label
                    aria-hidden="${this.hideLabel}"
                    class="${classMap(classes)}"
                    ?hidden=${!this._hasLabel}
                    for="${this.fieldId}"
                >
                    <slot name="label">${this.label}</slot>
                    <slot name="necessity-indicator" ?hidden=${!this.required}>
                        ${this.necessityIndicator || '*'}
                    </slot>
                </label>
            `;
        }

        /**
         * generates help text elements for the field, given a size and direction
         * @param size from field's SizedMixin
         */
        protected renderHelpText(size = 'M'): TemplateResult {
            const componentClass = 'spectrum-HelpText';
            const classes = {
                ...this.baseClasses,
            };
            classes[componentClass] = true;
            classes[`${componentClass}--${size}`] = true;
            const helpTextClasses = {
                ...classes,
                'spectrum-HelpText--neutral': true,
            };
            const negativeHelpTextClasses = {
                ...classes,
                'spectrum-HelpText--negative': true,
            };
            return html`
                <div 
                    aria-live="polite"
                    class="${classMap(helpTextClasses)}"  
                    ?hidden=${!this._showHelpText}
                    id="${this.fieldId}-help-text" 
                    role="alert" >
                    <slot name="help-text">${this.helpText}</slot>
                </div>
                <div 
                    aria-live="polite"
                    class="${classMap(negativeHelpTextClasses)}" 
                    ?hidden=${!this._showNegativeHelpText}
                    id="${this.fieldId}-negative-help-text" 
                    role="alert"></div>
                    <slot name="negative-help-text">${this.negativeHelpText}</slot>
                </div>`;
        }

        protected override update(changes: PropertyValues): void {
            super.update(changes);

            // a warning is logged if no label is provided
            if (!this._hasLabel) {
                window.__swc.warn(
                    this,
                    `No label provided for ${this.localName} with id ${this.fieldId}`,
                    `https://opensource.adobe.com/spectrum-web-components/components/${this.localName}`,
                    {
                        type: 'accessibility',
                    }
                );
            }
        }

        // check if array of nodes have text content
        private _hasNodeContent(node: Array<Node>): boolean {
            return (
                node
                    .map((node) => {
                        node.textContent?.trim();
                    })
                    .join('').length > 0
            );
        }
    }
    return FormFieldElement;
}

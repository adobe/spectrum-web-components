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

import { PropertyValues, SizedMixin } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import type { TemplateResult } from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';

import { ObserveSlotText } from '@spectrum-web-components/shared/src/observe-slot-text.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import type { NumberField } from '@spectrum-web-components/number-field';
import { HandleController, HandleValueDictionary } from './HandleController.js';
import { SliderNormalization } from './SliderHandle.js';
import { NumberFormatter } from '@internationalized/number';
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';

export const variants = ['filled', 'ramp', 'range', 'tick'];

/**
 * Base class for slider components that provides common functionality
 * for handling slider interactions, properties, and rendering.
 */
export abstract class SliderBase extends SizedMixin(
    ObserveSlotText(Focusable, ''),
    {
        noDefaultSize: true,
        validSizes: ['s', 'm', 'l', 'xl'],
    }
) {
    /**
     * Tag name to use when creating slider handle elements.
     * Must be implemented by classes extending SliderBase.
     */
    static sliderHandleTagname: string;

    // Controllers
    public handleController: HandleController;
    private languageResolver: LanguageResolutionController;

    // Core properties
    @property({ type: Number, reflect: true })
    public min = 0;

    @property({ type: Number, reflect: true })
    public max = 100;

    @property({ type: Number })
    public step = 1;

    @property({ type: Number })
    public value!: number;

    @property({ type: Number, attribute: 'default-value' })
    public defaultValue?: number;

    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    // Visual properties
    @property({ type: String })
    public set variant(variant: string) {
        const oldVariant = this.variant;
        if (variant === this.variant) {
            return;
        }
        if (variants.includes(variant) && this.fillStart === undefined) {
            this._variant = variant;
            this.setAttribute('variant', variant);
        } else {
            this._variant = '';
            this.removeAttribute('variant');
        }
        this.requestUpdate('variant', oldVariant);
    }

    public get variant(): string {
        return this._variant;
    }

    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    private _variant = '';

    @property({ type: Number, reflect: true, attribute: 'fill-start' })
    public fillStart?: number | boolean;

    @property({ type: Number, attribute: 'tick-step' })
    public tickStep = 0;

    @property({ type: Boolean, attribute: 'tick-labels' })
    public tickLabels = false;

    // State properties
    @property({ type: Boolean, reflect: true })
    public dragging = false;

    @property({ type: Boolean })
    public highlight = false;

    @property({ type: Boolean })
    public indeterminate = false;

    // Editable properties
    @property({ type: Boolean, reflect: true })
    public get editable(): boolean {
        return this._editable;
    }

    public set editable(editable: boolean) {
        if (editable === this.editable) {
            return;
        }
        const oldValue = this.editable;
        this._editable = this.handleController.size < 2 ? editable : false;
        if (this.editable) {
            this._numberFieldInput = import(
                '@spectrum-web-components/number-field/sp-number-field.js'
            );
        }
        if (oldValue !== this.editable) {
            this.requestUpdate('editable', oldValue);
        }
    }

    private _editable = false;

    @property({ type: Boolean, reflect: true, attribute: 'hide-stepper' })
    public hideStepper = false;

    @property({ type: Boolean })
    public quiet = false;

    // Label properties
    @property({ type: String })
    public label = '';

    @property({ type: String, reflect: true, attribute: 'label-visibility' })
    public labelVisibility?: 'text' | 'value' | 'none';

    // Formatting properties
    @property({ type: Object, attribute: 'format-options' })
    public formatOptions?: Intl.NumberFormatOptions;

    @property({ type: Object, attribute: 'normalization' })
    public normalization?: SliderNormalization;

    // Other properties
    @property()
    public type = '';

    @property({ reflect: true })
    public override dir!: 'ltr' | 'rtl';

    // DOM references
    @query('#label')
    public labelEl!: HTMLLabelElement;

    @query('#number-field')
    public numberField!: NumberField;

    @query('#track')
    public track!: HTMLDivElement;

    // Internal state
    protected centerPoint: number | undefined;
    private _numberFieldInput: Promise<unknown> = Promise.resolve();
    private _forcedUnit = '';

    // Callback properties
    @property({ attribute: false })
    public getAriaValueText: (values: Map<string, string>) => string = (
        values
    ) => {
        const valueArray = [...values.values()];
        if (valueArray.length === 2) {
            return `${valueArray[0]} - ${valueArray[1]}`;
        }
        return valueArray.join(', ');
    };

    @property({ attribute: false })
    public getAriaHandleText: (
        value: number,
        numberFormat: NumberFormatter
    ) => string = (value, numberFormat) => {
        return numberFormat.format(value);
    };

    // Constructor and lifecycle methods
    constructor() {
        super();
        this.languageResolver = new LanguageResolutionController(this);
        this.handleController = new HandleController(this);
        this.handleController.languageChanged(this.languageResolver.language);
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.handleController.hostConnected();

        // Deprecation warning for default slot when content is provided
        if (window.__swc.DEBUG && this.textContent?.trim()) {
            window.__swc.warn(
                this,
                `The default slot for text label in <${this.localName}> has been deprecated and will be removed in a future release. Use the "label" property instead.`,
                'https://opensource.adobe.com/spectrum-web-components/components/slider/',
                { level: 'deprecation' }
            );
        }
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();
        this.handleController.hostDisconnected();
    }

    public override update(changedProperties: Map<string, boolean>): void {
        if (!this.hasUpdated) {
            this.handleController?.setDefaultValue(this);
        }

        this.handleController.updateModel();
        if (changedProperties.has('disabled') && this.disabled) {
            this.handleController.cancelDrag();
        }
        super.update(changedProperties);
    }

    protected override willUpdate(changed: PropertyValues): void {
        // Handle fillStart and value changes for center point
        if (changed.has('value') && changed.has('fillStart')) {
            // Test if fill-start is set without a value
            if (this.getAttribute('fill-start') === '') {
                this.centerPoint =
                    (Number(this.max) - Number(this.min)) / 2 +
                    Number(this.min);
            } else if (!Number.isNaN(Number(this.fillStart))) {
                this.centerPoint = Number(this.fillStart);
            }
        }

        // Check if any sync-able property has changed
        const syncProps = [
            'min',
            'max',
            'value',
            'step',
            'defaultValue',
            'formatOptions',
            'label',
            'normalization',
            'getAriaHandleText',
        ];
        const needsSync = syncProps.some((prop) => changed.has(prop));

        if (needsSync) {
            this.handleController.syncHandleProps();
        }

        if (changed.has('formatOptions')) {
            this.handleController.formatOptionsChanged(this);
        }

        if (changed.has(languageResolverUpdatedSymbol)) {
            this.handleController.languageChanged(
                this.languageResolver.language
            );
        }
    }

    public override updated(changedProperties: Map<string, boolean>): void {
        super.updated(changedProperties);
        this.handleController.hostUpdated();
    }

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        if (this.editable) {
            await this._numberFieldInput;
            await this.numberField.updateComplete;
        }
        await this.handleController.updateComplete();
        return complete;
    }

    // Computed properties
    public get values(): HandleValueDictionary {
        return this.handleController.values;
    }

    public override get ariaValueText(): string {
        if (!this.getAriaValueText) {
            return `${this.value}${this._forcedUnit}`;
        }
        return this.getAriaValueText(this.handleController.formattedValues);
    }

    public override get focusElement(): HTMLElement {
        return this.handleController.focusElement;
    }

    // Event handlers
    protected handleLabelClick(event: Event): void {
        if (this.editable) {
            event.preventDefault();
            this.focus();
        }
    }

    protected handleDoubleClick(event: PointerEvent): void {
        this.handleController.handleDoubleClick(event);
    }

    protected handlePointerdown(event: PointerEvent): void {
        this.handleController.handlePointerdown(event);
    }

    protected handlePointermove(event: PointerEvent): void {
        this.handleController.handlePointermove(event);
    }

    protected handlePointerup(event: PointerEvent): void {
        this.handleController.handlePointerup(event);
    }

    protected handleNumberInput(event: Event & { target: NumberField }): void {
        const { value } = event.target;
        if (event.target?.managedInput && !isNaN(value)) {
            this.value = value;
            return;
        }
        // Do not apply uncommited values to the parent element unless interacting with the stepper UI.
        // Stop uncommitted input from being announced to the parent application.
        event.stopPropagation();
    }

    protected handleNumberChange(event: Event & { target: NumberField }): void {
        const { value } = event.target;
        if (isNaN(value)) {
            event.target.value = this.value;
            event.stopPropagation();
        } else {
            this.value = value;
            if (!event.target?.managedInput) {
                // When stepper is not active, sythesize an `input` event so that the
                // `change` event isn't surprising.
                this.dispatchInputEvent();
            }
        }
        this.indeterminate = false;
    }

    // Public methods
    public dispatchInputEvent(): void {
        const inputEvent = new Event('input', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(inputEvent);
    }

    // Abstract methods
    /**
     * Render method to be implemented by subclasses
     */
    protected abstract override render(): TemplateResult;
}

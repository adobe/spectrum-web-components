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

import { PropertyValues } from 'lit';
import { property } from '../../base/decorators.js';
import { Focusable } from '../../shared/focusable.js';
import { HandleController } from './HandleController.js';
import { NumberFormatter } from '@internationalized/number';

export type NumberFormatOptions = Intl.NumberFormatOptions;
export type HandleMin = number | 'previous';
export type HandleMax = number | 'next';

export type HandleValues = {
    name: string;
    value: number;
}[];

/**
 * Normalization interface for converting between raw and normalized values
 */
export interface SliderNormalization {
    toNormalized: (value: number, min: number, max: number) => number;
    fromNormalized: (value: number, min: number, max: number) => number;
}

export const defaultNormalization: SliderNormalization = {
    toNormalized(value: number, min: number, max: number) {
        return (value - min) / (max - min);
    },
    fromNormalized(value: number, min: number, max: number) {
        return value * (max - min) + min;
    },
};

const MinConverter = {
    fromAttribute: (value: string): number | 'previous' => {
        if (value === 'previous') {
            return value;
        }
        return parseFloat(value);
    },
    toAttribute: (value: 'previous' | number): string => {
        return value.toString();
    },
};

const MaxConverter = {
    fromAttribute: (value: string): number | 'next' => {
        if (value === 'next') {
            return value;
        }
        return parseFloat(value);
    },
    toAttribute: (value: 'next' | number): string => {
        return value.toString();
    },
};

/**
 * @element sp-slider-handle
 *
 * Represents an individual handle in a slider component.
 * Can be used standalone or as part of a multi-handle slider.
 *
 * @fires input - The value of the element has changed.
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export class SliderHandle extends Focusable {
    // Controller reference
    public handleController?: HandleController;

    // Core properties
    @property({ type: Number })
    public value!: number;

    @property({ type: Number, attribute: 'default-value' })
    public defaultValue!: number;

    @property({ reflect: true, converter: MinConverter })
    public min?: number | 'previous';

    @property({ reflect: true, converter: MaxConverter })
    public max?: number | 'next';

    @property({ type: Number, reflect: true })
    public step?: number;

    // State properties
    @property({ type: Boolean, reflect: true })
    public dragging = false;

    @property({ type: Boolean })
    public highlight = false;

    // Identification properties
    @property({ type: String })
    public name = '';

    @property({ type: String })
    public label = '';

    // Formatting properties
    @property({ type: Object, attribute: 'format-options' })
    public formatOptions?: NumberFormatOptions;

    @property({ attribute: false })
    public normalization: SliderNormalization = defaultNormalization;

    // Internal state
    _forcedUnit = '';

    // Callback properties
    @property({ attribute: false })
    public getAriaHandleText: (
        value: number,
        numberFormat: NumberFormatter
    ) => string = (value, numberFormat) => {
        return numberFormat.format(value);
    };

    // Computed properties
    public get handleName(): string {
        return this.name;
    }

    public override get focusElement(): HTMLElement {
        /* c8 ignore next */
        return this.handleController?.inputForHandle(this) ?? this;
    }

    // Lifecycle methods
    protected override update(changes: PropertyValues): void {
        if (!this.hasUpdated) {
            this.handleController?.setDefaultValue(this);
        }

        if (changes.has('formatOptions')) {
            this.handleController?.formatOptionsChanged(this);
        }
        if (changes.has('value')) {
            const oldValue = changes.get('value');
            if (oldValue != null) {
                this.updateComplete.then(() => {
                    this.handleController?.setValueFromHandle(this);
                });
            }
        }
        this.handleController?.handleHasChanged();
        super.update(changes);
    }

    protected override firstUpdated(
        changedProperties: PropertyValues<this>
    ): void {
        super.firstUpdated(changedProperties);
        this.dispatchEvent(new CustomEvent('sp-slider-handle-ready'));
    }

    // Event methods
    public dispatchInputEvent(): void {
        const inputEvent = new Event('input', {
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(inputEvent);
    }
}

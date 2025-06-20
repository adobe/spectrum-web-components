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

import { PropertyValues } from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import {
    LanguageResolutionController,
    languageResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/LanguageResolution.js';
import {
    NumberFormatOptions,
    NumberFormatter,
} from '@internationalized/number';
import { HandleController } from './HandleController.js';

export type HandleMin = number | 'previous';
export type HandleMax = number | 'next';

export type HandleValues = {
    name: string;
    value: number;
}[];

export type SliderNormalization = {
    toNormalized: (value: number, min: number, max: number) => number;
    fromNormalized: (value: number, min: number, max: number) => number;
};

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
        if (value === 'previous') return value;
        return parseFloat(value);
    },
    toAttribute: (value: 'previous' | number): string => {
        return value.toString();
    },
};

const MaxConverter = {
    fromAttribute: (value: string): number | 'next' => {
        if (value === 'next') return value;
        return parseFloat(value);
    },
    toAttribute: (value: 'next' | number): string => {
        return value.toString();
    },
};

/**
 * @element sp-slider-handle
 *
 * @fires input - The value of the element has changed.
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export class SliderHandle extends Focusable {
    public handleController?: HandleController;

    public get handleName(): string {
        return this.name;
    }

    public override get focusElement(): HTMLElement {
        /* c8 ignore next */
        return this.handleController?.inputForHandle(this) ?? this;
    }

    _forcedUnit = '';

    /**
     * By default, the value of a Slider Handle will be halfway between its
     * `min` and `max` values, or the `min` value when `max` is less than `min`.
     */
    @property({ type: Number })
    public value!: number;

    /**
     * Set the default value of the handle. Setting this property will cause the
     * handle to reset to the default value on double click or pressing the `escape` key.
     */
    @property({ type: Number, attribute: 'default-value' })
    public defaultValue!: number;

    @property({ type: Boolean, reflect: true })
    public dragging = false;

    @property({ type: Boolean })
    public highlight = false;

    @property({ type: String })
    public name = '';

    @property({ reflect: true, converter: MinConverter })
    public min?: number | 'previous';

    @property({ reflect: true, converter: MaxConverter })
    public max?: number | 'next';

    @property({ type: Number, reflect: true })
    public step?: number;

    @property({ type: Object, attribute: 'format-options' })
    public formatOptions?: NumberFormatOptions;

    @property({ type: String })
    public label = '';

    @property({ attribute: false })
    public getAriaHandleText: (
        value: number,
        numberFormat: NumberFormatter
    ) => string = (value, numberFormat) => {
        return numberFormat.format(value);
    };

    private languageResolver = new LanguageResolutionController(this);

    protected override update(changes: PropertyValues): void {
        if (!this.hasUpdated) {
            const { max, min } = this as { max: number; min: number };
            if (this.value == null) {
                if (!isNaN(max) && !isNaN(min)) {
                    this.value = max < min ? min : min + (max - min) / 2;
                    this.handleController?.hostUpdate();
                }
            }
        }

        if (
            changes.has('formatOptions') ||
            changes.has(languageResolverUpdatedSymbol)
        ) {
            delete this._numberFormatCache;
        }
        if (changes.has('value')) {
            const oldValue = changes.get('value');
            if (oldValue != null) {
                this.updateComplete.then(() => {
                    this.handleController?.setValueFromHandle(this);
                });
            }
        }
        this.handleController?.handleHasChanged(this);
        super.update(changes);
    }

    protected override firstUpdated(
        changedProperties: PropertyValues<this>
    ): void {
        super.firstUpdated(changedProperties);
        this.dispatchEvent(new CustomEvent('sp-slider-handle-ready'));
    }

    @property({ attribute: false })
    public normalization: SliderNormalization = defaultNormalization;

    public dispatchInputEvent(): void {
        const inputEvent = new Event('input', {
            bubbles: true,
            composed: true,
        });

        this.dispatchEvent(inputEvent);
    }

    protected _numberFormatCache:
        | { numberFormat: NumberFormatter; language: string }
        | undefined;
    protected getNumberFormat(): NumberFormatter {
        /* c8 ignore next */
        if (
            !this._numberFormatCache ||
            this.languageResolver.language !== this._numberFormatCache.language
        ) {
            let numberFormatter: NumberFormatter;
            try {
                numberFormatter = new NumberFormatter(
                    this.languageResolver.language,
                    this.formatOptions
                );
                this._forcedUnit = '';
                // numberFormatter.format(1);
            } catch (error) {
                const {
                    style,
                    unit,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    unitDisplay,
                    ...formatOptionsNoUnit
                } = this.formatOptions || {};
                if (style === 'unit') {
                    this._forcedUnit = unit as string;
                }
                numberFormatter = new NumberFormatter(
                    this.languageResolver.language,
                    formatOptionsNoUnit
                );
            }
            this._numberFormatCache = {
                language: this.languageResolver.language,
                numberFormat: numberFormatter,
            };
        }
        /* c8 ignore next */
        return this._numberFormatCache?.numberFormat;
    }

    public get numberFormat(): NumberFormatter | undefined {
        if (!this.formatOptions) return;
        return this.getNumberFormat();
    }
}

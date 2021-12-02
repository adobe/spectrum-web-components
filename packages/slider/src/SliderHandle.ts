/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { PropertyValues } from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import { ProvideLang } from '@spectrum-web-components/theme';
import {
    NumberFormatOptions,
    NumberFormatter,
} from '@internationalized/number';

export type HandleMin = number | 'previous';
export type HandleMax = number | 'next';

export type HandleValues = {
    name: string;
    value: number;
}[];

export interface Controller {
    inputForHandle(handle: SliderHandle): HTMLInputElement | undefined;
    requestUpdate(): void;
    setValueFromHandle(handle: SliderHandle): void;
    handleHasChanged(handle: SliderHandle): void;
}

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
    public handleController?: Controller;

    public get handleName(): string {
        return this.name;
    }

    public get focusElement(): HTMLElement {
        /* c8 ignore next */
        return this.handleController?.inputForHandle(this) ?? this;
    }

    _forcedUnit = '';

    @property({ type: Number })
    value = 10;

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

    @property({ attribute: false })
    private resolvedLanguage =
        document.documentElement.lang || navigator.language;

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

    protected update(changes: PropertyValues): void {
        if (changes.has('formatOptions') || changes.has('resolvedLanguage')) {
            delete this._numberFormatCache;
        }
        super.update(changes);
    }

    protected updated(changedProperties: PropertyValues<this>): void {
        if (changedProperties.has('value')) {
            const oldValue = changedProperties.get('value');
            if (oldValue != null) {
                this.handleController /* c8 ignore next */
                    ?.setValueFromHandle(this);
            }
        }
        this.handleController?.handleHasChanged(this);
        super.updated(changedProperties);
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
    protected getNumberFormat(): Intl.NumberFormat {
        /* c8 ignore next */
        if (
            !this._numberFormatCache ||
            this.resolvedLanguage !== this._numberFormatCache.language
        ) {
            let numberFormatter: NumberFormatter;
            try {
                numberFormatter = new NumberFormatter(
                    this.resolvedLanguage,
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
                    this.resolvedLanguage,
                    formatOptionsNoUnit
                );
            }
            this._numberFormatCache = {
                language: this.resolvedLanguage,
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

    public connectedCallback(): void {
        super.connectedCallback();
        this.resolveLanguage();
    }

    public disconnectedCallback(): void {
        this.resolveLanguage();
        super.disconnectedCallback();
    }

    private resolveLanguage(): void {
        const queryThemeEvent = new CustomEvent<ProvideLang>(
            'sp-language-context',
            {
                bubbles: true,
                composed: true,
                detail: {
                    callback: (lang: string) => {
                        this.resolvedLanguage = lang;
                    },
                },
                cancelable: true,
            }
        );
        this.dispatchEvent(queryThemeEvent);
    }
}

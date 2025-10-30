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

import type { PropertyValues, ReactiveElement } from 'lit';

import { property } from 'lit/decorators.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export type ElementSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export const ElementSizes: Record<string, ElementSize> = {
    xxs: 'xxs',
    xs: 'xs',
    s: 's',
    m: 'm',
    l: 'l',
    xl: 'xl',
    xxl: 'xxl',
};
export type DefaultElementSize = Exclude<ElementSize, 'xxs' | 'xs' | 'xxl'>;

export interface SizedElementInterface {
    size: ElementSize;
}

export interface SizedElementConstructor {
    readonly VALID_SIZES: ElementSize[];
}

export function SizedMixin<T extends Constructor<ReactiveElement>>(
    constructor: T,
    {
        validSizes = ['s', 'm', 'l', 'xl'],
        noDefaultSize,
        defaultSize = 'm',
    }: {
        validSizes?: ElementSize[];
        noDefaultSize?: boolean;
        defaultSize?: ElementSize;
    } = {}
): T & Constructor<SizedElementInterface> & SizedElementConstructor {
    class SizedElement extends constructor {
        /**
         * @internal
         */
        static readonly VALID_SIZES: ElementSize[] = validSizes;

        @property({ type: String })
        public get size(): ElementSize {
            return this._size ?? defaultSize;
        }

        public set size(value: ElementSize) {
            const fallbackSize = noDefaultSize ? null : defaultSize;
            const size = (
                value ? value.toLocaleLowerCase() : value
            ) as ElementSize;
            const validSize = (
                validSizes.includes(size) ? size : fallbackSize
            ) as ElementSize;
            if (validSize) {
                this.setAttribute('size', validSize);
            }
            if (this._size === validSize) {
                return;
            }
            const oldSize = this._size;
            this._size = validSize;
            this.requestUpdate('size', oldSize);
        }

        private _size: ElementSize | null = defaultSize;

        protected override update(changes: PropertyValues): void {
            if (!this.hasAttribute('size') && !noDefaultSize) {
                this.setAttribute('size', this.size);
            }
            super.update(changes);
        }
    }
    return SizedElement;
}

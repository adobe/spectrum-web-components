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
import { ReactiveElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export type ElementSize = 's' | 'm' | 'l' | 'xl' | 'xxl';

export interface SizedElementInterface {
    size: ElementSize;
}

export function SizedMixin<T extends Constructor<ReactiveElement>>(
    constructor: T,
    {
        validSizes = ['s', 'm', 'l', 'xl'],
        noDefaultSize,
    }: {
        validSizes?: ElementSize[];
        noDefaultSize?: boolean;
    } = {}
): T & Constructor<SizedElementInterface> {
    class SizedElement extends constructor {
        @property({ type: String, reflect: true })
        public get size(): ElementSize {
            return this._size || 'm';
        }

        public set size(value: ElementSize) {
            const defaultSize = noDefaultSize ? null : 'm';
            const size = (value
                ? value.toLocaleLowerCase()
                : value) as ElementSize;
            const validSize = (validSizes.includes(size)
                ? size
                : defaultSize) as ElementSize;
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

        private _size: ElementSize | null = 'm';

        protected firstUpdated(changes: PropertyValues): void {
            super.firstUpdated(changes);
            if (!this.hasAttribute('size') && !noDefaultSize) {
                this.setAttribute('size', this.size);
            }
        }
    }
    return SizedElement;
}

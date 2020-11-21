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
import { UpdatingElement, property, PropertyValues } from './index.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

type ElementSize = 's' | 'm' | 'l' | 'xl';

export interface SizedElementInterface {
    size: ElementSize;
}

export function SizedMixin<T extends Constructor<UpdatingElement>>(
    constructor: T,
    sizes = ['s', 'm', 'l', 'xl']
): T & Constructor<SizedElementInterface> {
    class SizedElement extends constructor {
        @property({ type: String, reflect: true })
        public get size(): ElementSize {
            return this._size;
        }

        public set size(value: ElementSize) {
            const size = value.toLocaleLowerCase();
            const validSize = (sizes.includes(size)
                ? size
                : 'm') as ElementSize;
            if (this._size === validSize) return;
            const oldSize = this._size;
            this._size = validSize;
            this.setAttribute('size', validSize);
            this.requestUpdate('size', oldSize);
        }

        private _size: ElementSize = 'm';

        protected firstUpdated(changes: PropertyValues): void {
            super.firstUpdated(changes);
            if (!this.hasAttribute('size')) {
                this.setAttribute('size', this.size);
            }
        }
    }
    return SizedElement;
}

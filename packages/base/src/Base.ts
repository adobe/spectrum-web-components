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

import { LitElement } from 'lit-element';

export * from 'lit-element';

import { UpdatingElement } from 'lit-element';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export function SpectrumMixin<T extends Constructor<UpdatingElement>>(
    constructor: T
): T & Constructor<UpdatingElement> {
    return class SlotTextObservingElement extends constructor {
        public shadowRoot!: ShadowRoot;

        public connectedCallback(): void {
            if (!this.hasAttribute('dir')) {
                this.dir = document.dir || 'ltr';
            }
            super.connectedCallback();
        }
    };
}

export class SpectrumElement extends SpectrumMixin(LitElement) {}

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

import { LitElement, property } from 'lit-element';

export * from 'lit-element';

import { UpdatingElement } from 'lit-element';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SpectrumInterface {
    shadowRoot: ShadowRoot;
    isDefaultDir: boolean;
    dir: 'ltr' | 'rtl';
}

const observedForElements: Set<HTMLElement> = new Set();

const updateRTL = (): void => {
    const dir =
        document.documentElement.dir === 'rtl'
            ? document.documentElement.dir
            : 'ltr';
    observedForElements.forEach((el) => {
        el.setAttribute('dir', dir);
    });
};

const rtlObserver = new MutationObserver(updateRTL);

rtlObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir'],
});

export function SpectrumMixin<T extends Constructor<UpdatingElement>>(
    constructor: T
): T & Constructor<SpectrumInterface> {
    class SlotTextObservingElement extends constructor {
        public shadowRoot!: ShadowRoot;

        /**
         * @private
         */
        @property({ reflect: true })
        public dir: 'ltr' | 'rtl' = 'ltr';

        /**
         * @private
         */
        public get isDefaultDir(): boolean {
            return this.dir === 'ltr';
        }

        public connectedCallback(): void {
            super.connectedCallback();
            if (!this.hasAttribute('dir')) {
                this.dir =
                    document.documentElement.dir === 'rtl'
                        ? document.documentElement.dir
                        : 'ltr';
            }
            observedForElements.add(this);
        }

        public disconnectedCallback(): void {
            super.disconnectedCallback();
            observedForElements.delete(this);
        }
    }
    return SlotTextObservingElement;
}

export class SpectrumElement extends SpectrumMixin(LitElement) {}

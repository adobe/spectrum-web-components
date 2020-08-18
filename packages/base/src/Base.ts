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
import { Theme } from '@spectrum-web-components/theme';

export * from 'lit-element';

import { UpdatingElement } from 'lit-element';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface SpectrumInterface {
    shadowRoot: ShadowRoot;
    isLTR: boolean;
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
        private _dirParent!: HTMLElement;

        /**
         * @private
         */
        @property({ reflect: true })
        public dir: 'ltr' | 'rtl' = 'ltr';

        /**
         * @private
         */
        public get isLTR(): boolean {
            return this.dir === 'ltr';
        }

        public connectedCallback(): void {
            if (!this.hasAttribute('dir')) {
                let dirParent = ((this as HTMLElement).assignedSlot ||
                    this.parentNode) as
                    | HTMLElement
                    | DocumentFragment
                    | ShadowRoot;
                while (
                    dirParent !== document.documentElement &&
                    !(dirParent instanceof Theme)
                ) {
                    dirParent = ((dirParent as HTMLElement).assignedSlot || // step into the shadow DOM of the parent of a slotted node
                    dirParent.parentNode || // DOM Element detected
                        (dirParent as ShadowRoot).host) as
                        | HTMLElement
                        | DocumentFragment
                        | ShadowRoot;
                }
                this.dir = dirParent.dir === 'rtl' ? dirParent.dir : 'ltr';
                if (dirParent === document.documentElement) {
                    observedForElements.add(this);
                } else {
                    (dirParent as Theme).trackChild(this);
                }
                this._dirParent = dirParent;
            }
            super.connectedCallback();
        }

        public disconnectedCallback(): void {
            super.disconnectedCallback();
            if (this._dirParent === document.documentElement) {
                observedForElements.delete(this);
            } else {
                (this._dirParent as Theme).untrackChild(this);
            }
        }
    }
    return SlotTextObservingElement;
}

export class SpectrumElement extends SpectrumMixin(LitElement) {}

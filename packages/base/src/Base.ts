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

import { LitElement, ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';
type ThemeRoot = HTMLElement & {
    startManagingContentDirection: (el: HTMLElement) => void;
    stopManagingContentDirection: (el: HTMLElement) => void;
};

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

type ContentDirectionManager = HTMLElement & {
    startManagingContentDirection?(): void;
};

const canManageContentDirection = (el: ContentDirectionManager): boolean =>
    typeof el.startManagingContentDirection !== 'undefined' ||
    el.tagName === 'SP-THEME';

export function SpectrumMixin<T extends Constructor<ReactiveElement>>(
    constructor: T
): T & Constructor<SpectrumInterface> {
    class SlotTextObservingElement extends constructor {
        /**
         * @private
         */
        public shadowRoot!: ShadowRoot;
        private _dirParent?: HTMLElement;

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
                    this.parentNode) as HTMLElement;
                while (
                    dirParent !== document.documentElement &&
                    !canManageContentDirection(
                        dirParent as ContentDirectionManager
                    )
                ) {
                    dirParent = ((dirParent as HTMLElement).assignedSlot || // step into the shadow DOM of the parent of a slotted node
                        dirParent.parentNode || // DOM Element detected
                        ((dirParent as unknown) as ShadowRoot)
                            .host) as HTMLElement;
                }
                this.dir =
                    dirParent.dir === 'rtl' ? dirParent.dir : this.dir || 'ltr';
                if (dirParent === document.documentElement) {
                    observedForElements.add(this);
                } else {
                    const { localName } = dirParent;
                    if (
                        localName.search('-') > -1 &&
                        !customElements.get(localName)
                    ) {
                        customElements.whenDefined(localName).then(() => {
                            (dirParent as ThemeRoot).startManagingContentDirection(
                                this
                            );
                        });
                    } else {
                        (dirParent as ThemeRoot).startManagingContentDirection(
                            this
                        );
                    }
                }
                this._dirParent = dirParent as HTMLElement;
            }
            super.connectedCallback();
        }

        public disconnectedCallback(): void {
            super.disconnectedCallback();
            if (this._dirParent) {
                if (this._dirParent === document.documentElement) {
                    observedForElements.delete(this);
                } else {
                    (this._dirParent as ThemeRoot).stopManagingContentDirection(
                        this
                    );
                }
                this.removeAttribute('dir');
            }
        }
    }
    return SlotTextObservingElement;
}

export class SpectrumElement extends SpectrumMixin(LitElement) {}

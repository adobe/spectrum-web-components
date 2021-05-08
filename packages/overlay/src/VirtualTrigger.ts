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

type VirtualElement = HTMLElement & { updateBoundingClientRect: void };

export class VirtualTrigger extends HTMLElement {
    x = 0;
    y = 0;
    constructor(host: HTMLElement, x: number, y: number) {
        super();
        this.x = x;
        this.y = y;

        const target = {};
        const getHandler = (
            _target: Record<string, unknown>,
            prop: keyof VirtualElement
        ): unknown => {
            if (
                prop !== 'getBoundingClientRect' &&
                prop !== 'updateBoundingClientRect'
            ) {
                const hostProp = host[prop];
                if (typeof hostProp === 'function') {
                    return hostProp.bind(host);
                }
                return hostProp;
            }
            return this[prop].bind(this);
        };

        const handler2 = {
            get: getHandler,
        };
        const proxy2 = (new Proxy(
            target,
            handler2
        ) as unknown) as VirtualTrigger;

        return proxy2;
    }

    updateBoundingClientRect(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    getBoundingClientRect(): DOMRect {
        return {
            width: 0,
            height: 0,
            top: this.y,
            right: this.x,
            y: this.y,
            x: this.x,
            bottom: this.y,
            left: this.x,
            toJSON() {
                return;
            },
        };
    }
}

customElements.define('sp-virtual-overlay-target', VirtualTrigger);

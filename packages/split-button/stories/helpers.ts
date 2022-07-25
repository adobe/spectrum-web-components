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
import { html, TemplateResult } from '@spectrum-web-components/base';

import { SplitButton } from '@spectrum-web-components/split-button';

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

class OpenSplitButtonReady extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    async setup(): Promise<void> {
        await nextFrame();

        const button = document.querySelector(`sp-split-button`) as SplitButton;
        button.addEventListener(
            'sp-opened',
            () => {
                this.ready(true);
            },
            { once: true }
        );
    }

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('open-split-button-ready', OpenSplitButtonReady);

export const openSplitButtonDecorator = (
    story: () => TemplateResult
): TemplateResult => {
    return html`
        ${story()}
        <open-split-button-ready></open-split-button-ready>
    `;
};

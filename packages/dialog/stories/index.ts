/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from '@spectrum-web-components/base';

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

class OverlayTriggerReady extends HTMLElement {
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

        const overlay = document.querySelector(
            `overlay-trigger`
        ) as HTMLElement;
        overlay.addEventListener('sp-opened', this.handleTriggerOpened);
    }

    handleTriggerOpened = async (): Promise<void> => {
        await nextFrame();

        this.ready(true);
    };

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('overlay-trigger-ready', OverlayTriggerReady);

export const overlayTriggerDecorator = (
    story: () => TemplateResult
): TemplateResult => {
    return html`
        ${story()}
        <overlay-trigger-ready></overlay-trigger-ready>
    `;
};

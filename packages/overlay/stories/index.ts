/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from '@spectrum-web-components/base';
import type { Overlay } from '@spectrum-web-components/overlay';

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

class IsOverlayOpen extends HTMLElement {
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
        document.addEventListener('sp-opened', this.handleOpened);
    }

    private sendFocus = async (): Promise<void> => {
        const selectedItem = document
            .querySelector('[focusable]')
            ?.querySelector('[selected]') as HTMLElement & {
            focused?: boolean;
        };

        if (selectedItem) {
            selectedItem.focus();
            selectedItem.focused = true;

            // scroll the selected item into view with block start alignment to ensure consistent behavior in VRTs
            await nextFrame();
            selectedItem.scrollIntoView({ block: 'start' });
            await nextFrame();
        }
    };

    handleOpened = async (event: Event): Promise<void> => {
        const overlay = event.target as Overlay;
        const actions = [nextFrame(), overlay.updateComplete, this.sendFocus()];

        await Promise.all(actions);
        // Focus happens _after_ `sp-opened` by at least two frames.
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        this.ready(true);
    };

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('is-overlay-open', IsOverlayOpen);

export const isOverlayOpen = (story: () => TemplateResult): TemplateResult => {
    return html`
        ${story()}
        <is-overlay-open></is-overlay-open>
    `;
};

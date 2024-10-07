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

class IsOverlayOpen extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    constructor() {
        super();
        this.readyPromise = new Promise((resolve) => {
            this.ready = resolve;
            this.setup();
        });
    }

    async setup(): Promise<void> {
        // Add a listener for the 'sp-opened' event, which opens the overlay
        document.addEventListener('sp-opened', this.handleOpened);
    }

    handleOpened = async (event: Event): Promise<void> => {
        const overlay = event.target as Overlay;

        // Wait for the overlay to fully finish updating
        await overlay.updateComplete;

        // Resolve the ready promise
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

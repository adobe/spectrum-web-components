/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';

class CountdownWatcher extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    connectedCallback(): void {
        (this.previousElementSibling as HTMLElement).addEventListener(
            'countdown-complete',
            () => {
                this.ready(true);
            }
        );
        this.readyPromise = new Promise((res) => {
            this.ready = res;
        });
    }
    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('countdown-complete-watcher', CountdownWatcher);

export const disabledButtonDecorator = (
    story: () => TemplateResult
): TemplateResult => {
    return html`
        ${story()}
        <countdown-complete-watcher></countdown-complete-watcher>
    `;
};

export const withOverlayDecorator = (
    story: () => TemplateResult
): TemplateResult => {
    return html`
        <sp-button variant="primary" id="trigger">Toggle Dialog</sp-button>
        <sp-overlay type="modal" trigger="trigger@click" open>
            ${story()}
        </sp-overlay>
    `;
};

export const disabledButtonWithOverlayDecorator = (
    story: () => TemplateResult
): TemplateResult => withOverlayDecorator(() => disabledButtonDecorator(story));

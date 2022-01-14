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

import '@spectrum-web-components/split-button/sp-split-button.js';
import type { SplitButton } from '@spectrum-web-components/split-button';
import '@spectrum-web-components/menu/sp-menu-item.js';
import { html } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';

class SplitButtonWorkflow extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;
    splitButton!: SplitButton;
    count = 0;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    async setup(): Promise<void> {
        this.splitButton = this.nextElementSibling as SplitButton;
        this.splitButton.addEventListener('sp-opened', () => {
            requestAnimationFrame(() => (this.splitButton.open = false));
        });
        this.splitButton.addEventListener('sp-closed', () => {
            this.count += 1;
            if (this.count >= 5) {
                this.ready(true);
                return;
            }
            requestAnimationFrame(() => (this.splitButton.open = true));
        });
        requestAnimationFrame(() => (this.splitButton.open = true));
    }

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('split-button-workflow', SplitButtonWorkflow);

measureFixtureCreation(
    html`
        <split-button-workflow></split-button-workflow>
        <sp-split-button>
            <sp-menu-item>Action 1</sp-menu-item>
            <sp-menu-item>Action 2</sp-menu-item>
            <sp-menu-item>Action 3</sp-menu-item>
        </sp-split-button>
    `,
    { numRenders: 1 }
);

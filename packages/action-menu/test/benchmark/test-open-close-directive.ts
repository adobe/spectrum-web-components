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

import '@spectrum-web-components/action-menu/sp-action-menu.js';
import type { ActionMenu } from '@spectrum-web-components/action-menu';
import { slottableRequest } from '@spectrum-web-components/overlay/src/slottable-request-directive.js';
import { html, TemplateResult } from 'lit';
import { measureFixtureCreation } from '../../../../test/benchmark/helpers.js';
import { SpectrumElement } from '@spectrum-web-components/base';

const renderOptions = (): TemplateResult => {
    import('@spectrum-web-components/menu/sp-menu-item.js');
    import('@spectrum-web-components/menu/sp-menu-divider.js');
    return html`
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    `;
};

class ActionMenuWorkflow extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;
    target!: ActionMenu;
    count = 0;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    async setup(): Promise<void> {
        this.target = this.nextElementSibling as ActionMenu;
        const childPromises = [] as Promise<boolean>[];
        [...this.target.children].forEach((child) => {
            if ('updateComplete' in child) {
                childPromises.push((child as SpectrumElement).updateComplete);
            }
        });
        await Promise.all([this.target.updateComplete, ...childPromises]);
        this.target.addEventListener('sp-opened', () => {
            requestAnimationFrame(() => (this.target.open = false));
        });
        this.target.addEventListener('sp-closed', () => {
            this.count += 1;
            if (this.count >= 5) {
                this.ready(true);
                return;
            }
            requestAnimationFrame(() => (this.target.open = true));
        });
        requestAnimationFrame(() => (this.target.open = true));
    }

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('action-menu-workflow', ActionMenuWorkflow);

measureFixtureCreation(
    html`
        <action-menu-workflow></action-menu-workflow>
        <sp-action-menu ${slottableRequest(renderOptions)}>
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
        </sp-action-menu>
    `,
    { numRenders: 1 }
);

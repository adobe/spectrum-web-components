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

import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    customElement,
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';

import styles from './demo-container.css';

@customElement('demo-container')
export class DemoContainer extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    scrollable = false;

    @query('.wrapper')
    wrapper!: HTMLDivElement;

    resizeController = new ResizeController(this, {
        callback: () => this.shouldUpdateScrollableState(),
    });

    public shouldUpdateScrollableState = (): void => {
        const { offsetHeight, scrollHeight } = this;
        this.scrollable = offsetHeight < scrollHeight;
    };

    public override render(): TemplateResult {
        return html`
            <div class="wrapper">
                <slot></slot>
            </div>
        `;
    }

    public override firstUpdated(): void {
        this.resizeController.observe(this.wrapper);
    }
}

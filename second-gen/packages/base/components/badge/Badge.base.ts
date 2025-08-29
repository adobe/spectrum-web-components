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
    css,
    type CSSResult,
    html,
    LitElement,
    type TemplateResult,
} from 'lit';
import { property } from 'lit/decorators.js';

export class BadgeBase extends LitElement {
    @property({ type: String })
    variant: 'neutral' | 'accent' | 'informative' | 'positive' | 'negative' =
        'neutral';

    @property({ type: String })
    size: 'small' | 'medium' | 'large' = 'medium';

    static styles: CSSResult = css`
        :host {
            display: inline-block;
            font-family: adobe-clean, sans-serif;
        }
    `;

    render(): TemplateResult {
        return html`<slot></slot>`;
    }
}

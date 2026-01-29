/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { CSSResultArray, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { DividerBase } from '@spectrum-web-components/core/components/divider';
import { capitalize } from '@spectrum-web-components/core/shared/utilities';

import styles from './divider.css';

/**
 * @element swc-divider
 */
export class Divider extends DividerBase {
    // ────────────────────
    //     RENDERING & STYLING
    // ────────────────────

    public static override styles: CSSResultArray = [styles];

    protected override render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    ['swc-Divider']: true,
                    [`swc-Divider--size${this.size?.toUpperCase()}`]:
                        this.size != null,
                    [`swc-Divider--static${capitalize(this.staticColor)}`]:
                        this.staticColor != null,
                    [`swc-Divider--vertical`]: this.vertical,
                })}
            ></div>
        `;
    }
}

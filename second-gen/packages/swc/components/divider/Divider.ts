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

import { CSSResultArray, html, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { DividerBase } from '@swc/core/components/divider';

import styles from './divider.css';

// @todo Pull this up into a utility function for all components to leverage
function capitalize(str?: string): string {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @element swc-divider
 */
export class Divider extends DividerBase {
    // ────────────────────
    //     API OVERRIDES
    // ────────────────────

    public static override styles: CSSResultArray = [styles];

    protected override render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    ['spectrum-Divider']: true,
                    [`spectrum-Divider--size${this.size?.toUpperCase()}`]:
                        this.size != null,
                    [`spectrum-Divider--static${capitalize(this.staticColor)}`]:
                        this.staticColor != null,
                    [`spectrum-Divider--vertical`]: this.vertical,
                })}
            ></div>
        `;
    }
}

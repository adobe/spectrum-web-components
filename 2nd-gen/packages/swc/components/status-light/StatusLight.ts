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
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import {
    STATUSLIGHT_VARIANTS_COLOR_S2,
    STATUSLIGHT_VARIANTS_S2,
    STATUSLIGHT_VARIANTS_SEMANTIC_S2,
    StatusLightBase,
    type StatusLightVariantS2 as StatusLightVariant,
} from '@spectrum-web-components/core/components/status-light';

import styles from './status-light.css';

/**
 * A status light is a great way to convey semantic meaning and the condition of an entity, such as statuses and categories. It provides visual indicators through colored dots accompanied by descriptive text.
 *
 * @element swc-status-light
 *
 * @example
 * <swc-status-light variant="positive">Approved</swc-status-light>
 *
 *  @example
 * <swc-status-light variant="silver">Supported in Edge</swc-status-light>
 */
export class StatusLight extends StatusLightBase {
    // ────────────────────
    //     API OVERRIDES
    // ────────────────────

    /**
     * @internal
     */
    static override readonly VARIANTS_COLOR = STATUSLIGHT_VARIANTS_COLOR_S2;

    /**
     * @internal
     */
    static override readonly VARIANTS_SEMANTIC =
        STATUSLIGHT_VARIANTS_SEMANTIC_S2;

    /**
     * @internal
     */
    static override readonly VARIANTS = STATUSLIGHT_VARIANTS_S2;

    /**
     * Changes the color of the status dot. The variant list includes both semantic and non-semantic options.
     */
    @property({ type: String, reflect: true })
    public override variant: StatusLightVariant = 'info';

    // ──────────────────────────────
    //     RENDERING & STYLING
    // ──────────────────────────────

    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        return html`
            <div
                class=${classMap({
                    ['swc-StatusLight']: true,
                    [`swc-StatusLight--size${this.size?.toUpperCase()}`]:
                        this.size != null,
                    [`swc-StatusLight--${this.variant}`]:
                        typeof this.variant !== 'undefined',
                })}
            >
                <slot></slot>
            </div>
        `;
    }
}

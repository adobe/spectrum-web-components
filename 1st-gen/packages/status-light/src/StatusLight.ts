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
    PropertyValues,
    TemplateResult,
} from '@spectrum-web-components/base';

import { property } from '@spectrum-web-components/base/src/decorators.js';

import {
    STATUSLIGHT_VARIANTS_COLOR_S1,
    STATUSLIGHT_VARIANTS_S1,
    STATUSLIGHT_VARIANTS_SEMANTIC_S1,
    StatusLightBase,
    type StatusLightVariantS1,
} from '@spectrum-web-components/core/components/status-light';

import statusLightStyles from './status-light.css.js';

/**
 * @deprecated The `STATUSLIGHT_VARIANTS` export is deprecated and will be removed
 * in a future release. If needed, you can access the internal
 * `StatusLight.VARIANTS` property from the constructor.
 */
export const STATUSLIGHT_VARIANTS = STATUSLIGHT_VARIANTS_S1;

/**
 * @deprecated The `StatusLightVariant` type export is deprecated and will be removed
 * in a future release. If needed, you can infer this type from the `StatusLight`
 * prototype as follows: `typeof StatusLight.prototype.variant`
 */
export type StatusLightVariant = StatusLightVariantS1;

/**
 * @element sp-status-light
 *
 * @slot - text label of the Status Light
 */
export class StatusLight extends StatusLightBase {
    // ────────────────────
    //     API OVERRIDES
    // ────────────────────

    /**
     * @internal
     */
    static override readonly VARIANTS_COLOR = STATUSLIGHT_VARIANTS_COLOR_S1;

    /**
     * @internal
     */
    static override readonly VARIANTS_SEMANTIC =
        STATUSLIGHT_VARIANTS_SEMANTIC_S1;

    /**
     * @internal
     */
    static override readonly VARIANTS = STATUSLIGHT_VARIANTS_S1;

    /**
     * The variant of the status light.
     */
    @property({ type: String, reflect: true })
    public override variant: StatusLightVariantS1 = 'info';

    // ───────────────────────
    //     API ADDITIONS
    // ───────────────────────

    /**
     * @deprecated The `disabled` property is is deprecated and will be removed
     * in a future release.
     *
     * A status light in a disabled state shows that a status exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a status may become available later.
     *
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    // ──────────────────────
    //     IMPLEMENTATION
    // ──────────────────────

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('disabled')) {
            if (this.disabled) {
                this.setAttribute('aria-disabled', 'true');
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
    // ──────────────────────────────
    //     RENDERING & STYLING
    // ──────────────────────────────

    public static override get styles(): CSSResultArray {
        return [statusLightStyles];
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }
}

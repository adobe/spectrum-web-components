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
import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import {
    SizedMixin,
    SpectrumElement,
} from '@spectrum-web-components/core/shared/base';

import { type StatusLightVariant } from './StatusLight.types.js';

/**
 * A status light is a great way to convey semantic meaning and the condition of an entity, such as statuses and categories. It provides visual indicators through colored dots accompanied by descriptive text.
 *
 * @slot - The text label of the status light.
 */
export abstract class StatusLightBase extends SizedMixin(SpectrumElement, {
    noDefaultSize: true,
}) {
    // ─────────────────────────
    //     API TO OVERRIDE
    // ─────────────────────────

    /**
     * @internal
     *
     * A readonly array of the valid color variants for the status light.
     *
     * This is an actual internal property, intended not for customer use
     * but for use in internal validation logic, stories, tests, etc.
     *
     * Because S1 and S2 support different color variants, the value of this
     * property must be set in each subclass.
     */
    static readonly VARIANTS_COLOR: readonly string[];

    /**
     * @internal
     *
     * A readonly array of the valid semantic variants for the status light.
     *
     * This is an actual internal property, intended not for customer use
     * but for use in internal validation logic, stories, tests, etc.
     *
     * Because S1 and S2 support different semantic variants, the value of this
     * property must be set in each subclass.
     */
    static readonly VARIANTS_SEMANTIC: readonly string[];

    /**
     * @internal
     *
     * A readonly array of all valid variants for the status light.
     *
     * This is an actual internal property, intended not for customer use
     * but for use in internal validation logic, stories, tests, etc.
     *
     * Because S1 and S2 support different variants, the value of this
     * property must be set in each subclass.
     */
    static readonly VARIANTS: readonly string[];

    /**
     * @internal
     *
     * The variant of the status light.
     *
     * This is a public property, but its valid values vary between S1 and S2,
     * so the property (and its docs) need to be redefined in each subclass.
     *
     * The type declared here is a union of the valid values for S1 and S2,
     * and should be narrowed in each subclass.
     */
    @property({ type: String, reflect: true })
    public variant: StatusLightVariant = 'info';

    // ──────────────────────
    //     IMPLEMENTATION
    // ──────────────────────

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (window.__swc?.DEBUG) {
            const constructor = this.constructor as typeof StatusLightBase;
            if (!constructor.VARIANTS.includes(this.variant)) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
                    'https://opensource.adobe.com/spectrum-web-components/components/status-light/#variants',
                    {
                        issues: [...constructor.VARIANTS],
                    }
                );
            }
            // Check disabled property if it exists (S1 only)
            if (this.hasAttribute('disabled') && !('disabled' in this)) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element does not support the disabled state.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/status-light/#states',
                    {
                        issues: [
                            'disabled is not a supported property in Spectrum 2',
                        ],
                    }
                );
            }
        }
    }
}

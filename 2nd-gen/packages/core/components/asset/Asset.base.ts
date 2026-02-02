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

import { PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

import { SpectrumElement } from '@spectrum-web-components/core/shared/base/index.js';

import { ASSET_VARIANTS, type AssetVariant } from './Asset.types.js';

export abstract class AssetBase extends SpectrumElement {
    // ─────────────────────────
    //     API TO OVERRIDE
    // ─────────────────────────

    /**
     * @internal
     *
     * A readonly array of all valid variants for the asset.
     *
     * This is an actual internal property, intended not for customer use
     */
    static readonly VARIANTS: readonly AssetVariant[] = ASSET_VARIANTS;

    // ─────────────────
    //     SHARED API
    // ─────────────────

    /**
     * The variant of the asset. When not provided, slot content is rendered (e.g., an image).
     */
    @property({ type: String, reflect: true })
    public variant: AssetVariant | undefined;

    /**
     * Accessible label for the asset’s file or folder variant.
     */
    @property()
    public label = '';

    // ──────────────────────
    //     IMPLEMENTATION
    // ──────────────────────

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (window.__swc?.DEBUG) {
            const constructor = this.constructor as typeof AssetBase;
            if (
                typeof this.variant !== 'undefined' &&
                !constructor.VARIANTS.includes(this.variant)
            ) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element expects the "variant" attribute to be one of the following:`,
                    'https://opensource.adobe.com/spectrum-web-components/components/asset/',
                    {
                        issues: [...constructor.VARIANTS],
                    }
                );
            }
        }
    }
}

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

/**
 * Base class for the Asset component. Asset is a media wrapper: it displays
 * either a built-in file/folder icon, an error state, or slotted content
 * (e.g. swc-image, video, iframe). Use the default slot to wrap images, video,
 * or other media.
 */
export abstract class AssetBase extends SpectrumElement {
    /**
     * @internal
     * A readonly array of all valid variants for the asset.
     */
    static readonly VARIANTS: readonly AssetVariant[] = ASSET_VARIANTS;

    /**
     * The variant of the asset. When set to `file` or `folder`, displays the
     * built-in icon. When not set, slotted content is displayed (e.g. swc-image, video, iframe).
     */
    @property({ type: String, reflect: true })
    public variant: AssetVariant | undefined;

    /**
     * Accessible label for the asset's file or folder variant, or for the error state.
     */
    @property()
    public label = '';

    /**
     * Indicates an error state for the asset. When true, displays an error indicator.
     */
    @property({ type: Boolean, reflect: true })
    public error = false;

    /**
     * Aspect ratio of the asset container. Any valid CSS aspect-ratio value
     * (e.g. "1", "16/9", "4/3"). When set, the wrapper keeps this ratio regardless of slotted content.
     */
    @property({ type: String, attribute: 'aspect-ratio' })
    public aspectRatio?: string;

    /**
     * When true, applies rounded corners to the asset container (and clips slotted content to that shape).
     */
    @property({ type: Boolean, reflect: true })
    public rounded = false;

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);

        if (this.aspectRatio) {
            this.style.aspectRatio = this.aspectRatio;
        } else {
            this.style.removeProperty('aspect-ratio');
        }

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

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

import {
    ASSET_VARIANTS,
    type AssetVariant,
    type CrossOrigin,
    type DecodingType,
    type LoadingType,
    type ObjectFit,
    type ReferrerPolicy,
} from './Asset.types.js';

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
     * The variant of the asset. When not provided and no src is set, slot content is rendered (e.g., an image).
     */
    @property({ type: String, reflect: true })
    public variant: AssetVariant | undefined;

    /**
     * Accessible label for the asset's file or folder variant.
     */
    @property()
    public label = '';

    /**
     * Indicates an error state for the asset. When true, displays an error indicator.
     */
    @property({ type: Boolean, reflect: true })
    public error = false;

    // ─────────────────────────────
    //     IMAGE PROPERTIES
    // ─────────────────────────────

    /**
     * The image source URL. When provided, renders an <img> element directly.
     */
    @property({ type: String })
    public src?: string;

    /**
     * Alternative text for the image. Required for accessibility when using src.
     */
    @property({ type: String })
    public alt?: string;

    /**
     * Loading behavior for the image.
     * - 'lazy': Defers loading until the image is near the viewport
     * - 'eager': Loads immediately
     */
    @property({ type: String })
    public loading?: LoadingType;

    /**
     * How the image should be resized to fit its container.
     * - 'contain': Scale to fit while maintaining aspect ratio
     * - 'cover': Scale to fill container while maintaining aspect ratio
     * - 'fill': Stretch to fill container
     * - 'none': Do not resize
     * - 'scale-down': Use whichever is smaller: none or contain
     */
    @property({ type: String, attribute: 'object-fit' })
    public objectFit?: ObjectFit;

    /**
     * Position of the image within its container when using object-fit.
     * Accepts standard CSS object-position values (e.g., 'center', 'top left', '50% 50%').
     */
    @property({ type: String, attribute: 'object-position' })
    public objectPosition?: string;

    /**
     * Responsive image sources. A comma-separated list of image URLs with optional width/pixel density descriptors.
     * Example: "image-320w.jpg 320w, image-480w.jpg 480w, image-800w.jpg 800w"
     */
    @property({ type: String })
    public srcset?: string;

    /**
     * Sizes for responsive images. Defines image display size for different viewport widths.
     * Example: "(max-width: 600px) 480px, 800px"
     */
    @property({ type: String })
    public sizes?: string;

    /**
     * Image decoding hint for the browser.
     * - 'sync': Decode synchronously for atomic presentation
     * - 'async': Decode asynchronously to avoid delaying other content
     * - 'auto': Let the browser decide (default)
     */
    @property({ type: String })
    public decoding?: DecodingType;

    /**
     * CORS setting for cross-origin images.
     * - 'anonymous': Request without credentials
     * - 'use-credentials': Request with credentials
     */
    @property({ type: String })
    public crossorigin?: CrossOrigin;

    /**
     * Referrer policy for image requests.
     */
    @property({ type: String })
    public referrerpolicy?: ReferrerPolicy;

    /**
     * Width of the image in pixels. Used for aspect ratio calculation and layout hints.
     */
    @property({ type: Number })
    public width?: number;

    /**
     * Height of the image in pixels. Used for aspect ratio calculation and layout hints.
     */
    @property({ type: Number })
    public height?: number;

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

            // Warn if src is provided but alt is missing
            if (this.src && !this.alt) {
                window.__swc.warn(
                    this,
                    `<${this.localName}> element with "src" should include an "alt" attribute for accessibility.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/asset/',
                    {
                        issues: ['Missing alt text'],
                    }
                );
            }
        }
    }
}

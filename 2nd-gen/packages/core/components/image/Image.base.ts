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

import type {
    CrossOrigin,
    DecodingType,
    LoadingType,
    ObjectFit,
    ReferrerPolicy,
} from './Image.types.js';

/**
 * Base class for the Image component. Renders a container that holds an image
 * via the `src` attribute. The inner image element is exposed for styling
 * (width, height, border-radius, etc.) via the `image` part and the
 * `.spectrum-Image-image` class.
 */
export abstract class ImageBase extends SpectrumElement {
    /**
     * The image source URL. When provided, an `<img>` is rendered inside the container.
     * When not provided, the default slot is used (e.g. for video or custom content).
     */
    @property({ type: String })
    public src?: string;

    /**
     * Alternative text for the image. Required for accessibility when using `src`.
     */
    @property({ type: String })
    public alt?: string;

    /**
     * Loading behavior for the image.
     * - 'lazy': Defers loading until near the viewport
     * - 'eager': Loads immediately
     */
    @property({ type: String })
    public loading?: LoadingType;

    /**
     * How the image fits within the container.
     * - 'contain': Scale to fit, maintain aspect ratio
     * - 'cover': Scale to fill, maintain aspect ratio
     * - 'fill': Stretch to fill
     * - 'none': Do not resize
     * - 'scale-down': Smaller of none or contain
     */
    @property({ type: String, attribute: 'object-fit' })
    public objectFit?: ObjectFit;

    /**
     * Position of the image when using object-fit.
     * Accepts CSS object-position values (e.g. 'center', 'top left').
     */
    @property({ type: String, attribute: 'object-position' })
    public objectPosition?: string;

    /**
     * Responsive image sources (e.g. "image-320w.jpg 320w, image-480w.jpg 480w").
     */
    @property({ type: String })
    public srcset?: string;

    /**
     * Sizes for responsive images (e.g. "(max-width: 600px) 480px, 800px").
     */
    @property({ type: String })
    public sizes?: string;

    /**
     * Image decoding hint: 'sync' | 'async' | 'auto'.
     */
    @property({ type: String })
    public decoding?: DecodingType;

    /**
     * CORS setting for cross-origin images.
     */
    @property({ type: String })
    public crossorigin?: CrossOrigin;

    /**
     * Referrer policy for image requests.
     */
    @property({ type: String })
    public referrerpolicy?: ReferrerPolicy;

    /**
     * Width in pixels. Used for layout and aspect ratio.
     */
    @property({ type: Number })
    public width?: number;

    /**
     * Height in pixels. Used for layout and aspect ratio.
     */
    @property({ type: Number })
    public height?: number;

    /**
     * When true, shows an error state (e.g. failed to load).
     * Set automatically when the image fails to load; can also be set manually.
     */
    @property({ type: Boolean, reflect: true })
    public error = false;

    protected override updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('src') || changes.has('srcset')) {
            this.error = false;
        }
        if (window.__swc?.DEBUG && this.src && !this.alt) {
            window.__swc.warn(
                this,
                `<${this.localName}> with "src" should include an "alt" attribute for accessibility.`,
                'https://opensource.adobe.com/spectrum-web-components/components/image/',
                { issues: ['Missing alt text'] }
            );
        }
    }

    /**
     * Called when the inner image fails to load. Sets `error` to true so the
     * component (or parent e.g. swc-asset) can show an error state.
     */
    protected handleImageError(): void {
        this.error = true;
    }
}

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
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import { ImageBase } from '@spectrum-web-components/core/components/image';

import styles from './image.css';

/**
 * @element swc-image
 *
 * Renders an image inside a container. Use the `image` part or the `.spectrum-Image-image`
 * class to style the inner image (width, height, border-radius, etc.).
 *
 * @example
 * <swc-image src="photo.jpg" alt="Landscape"></swc-image>
 *
 * @example Styling the image
 * swc-image::part(image) { width: 80px; height: 80px; border-radius: 8px; }
 */
export class Image extends ImageBase {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        if (!this.src) {
            return html`<div class="spectrum-Image"></div>`;
        }

        const imageStyles: Record<string, string> = {};
        if (this.objectFit) {
            imageStyles['object-fit'] = this.objectFit;
        }
        if (this.objectPosition) {
            imageStyles['object-position'] = this.objectPosition;
        }

        return html`
            <div
                class=${classMap({
                    ['spectrum-Image']: true,
                })}
            >
                <img
                    part="image"
                    class="spectrum-Image-image"
                    src=${this.src}
                    alt=${this.alt || ''}
                    loading=${ifDefined(this.loading)}
                    decoding=${ifDefined(this.decoding)}
                    srcset=${ifDefined(this.srcset)}
                    sizes=${ifDefined(this.sizes)}
                    crossorigin=${ifDefined(this.crossorigin)}
                    referrerpolicy=${ifDefined(this.referrerpolicy)}
                    width=${ifDefined(this.width)}
                    height=${ifDefined(this.height)}
                    style=${styleMap(imageStyles)}
                />
            </div>
        `;
    }
}

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

const errorIcon = (label: string): TemplateResult => html`
  <svg
    class="spectrum-Image-error"
    role="img"
    viewBox="0 0 18 18"
    aria-label=${label || 'Failed to load image'}
  >
    <path
      class="spectrum-Image-errorBackground"
      d="M9,0.5c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5S0.5,13.7,0.5,9S4.3,0.5,9,0.5z"
    ></path>
    <path
      class="spectrum-Image-errorIcon"
      d="M9,11c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1s1,0.4,1,1v5C10,10.6,9.6,11,9,11z M9,14c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S9.6,14,9,14z"
    ></path>
  </svg>
`;

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
 *
 * @fires swc-image-load - Dispatched when the image finishes loading.
 * Detail: `{ src, originalEvent }`
 * @fires swc-image-error - Dispatched when the image fails to load. Sets `error` to true.
 * Detail: `{ src, originalEvent }`
 */
export class Image extends ImageBase {
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  protected override render(): TemplateResult {
    if (!this.src) {
      return html`
        <div
          class=${classMap({
            ['spectrum-Image']: true,
            ['spectrum-Image--error']: this.error,
          })}
        >
          ${this.error ? errorIcon('Failed to load image') : ''}
        </div>
      `;
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
          ['spectrum-Image--error']: this.error,
        })}
      >
        ${this.error ? errorIcon('Failed to load image') : ''}
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
          @load=${this.handleImageLoad}
          @error=${this.handleImageError}
        />
      </div>
    `;
  }
}

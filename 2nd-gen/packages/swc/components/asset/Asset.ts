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

import { AssetBase } from '@spectrum-web-components/core/components/asset';

import styles from './asset.css';

const file = (label: string): TemplateResult => html`
    <svg
        class="spectrum-Asset-file"
        role="img"
        viewBox="0 0 128 128"
        aria-label=${label || 'File'}
    >
        <path
            class="spectrum-Asset-fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="spectrum-Asset-fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
`;

const folder = (label: string): TemplateResult => html`
    <svg
        class="spectrum-Asset-folder"
        role="img"
        viewBox="0 0 32 32"
        aria-label=${label || 'Folder'}
    >
        <path
            class="spectrum-Asset-folderBackground"
            d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"
        ></path>
        <path
            class="spectrum-Asset-folderOutline"
            d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"
        ></path>
    </svg>
`;

const error = (label: string): TemplateResult => html`
    <svg
        class="spectrum-Asset-error"
        role="img"
        viewBox="0 0 18 18"
        aria-label=${label || 'Error'}
    >
        <path
            class="spectrum-Asset-errorBackground"
            d="M9,0.5c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5S0.5,13.7,0.5,9S4.3,0.5,9,0.5z"
        ></path>
        <path
            class="spectrum-Asset-errorIcon"
            d="M9,11c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1s1,0.4,1,1v5C10,10.6,9.6,11,9,11z M9,14c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S9.6,14,9,14z"
        ></path>
    </svg>
`;

/**
 * @element swc-asset
 * @slot - Media content when no `variant` is set: e.g. swc-image, video, or iframe.
 *
 * Asset is a media wrapper. It either shows a file/folder icon, an error state,
 * or whatever you put in the default slot (image via swc-image, video, iframe, etc.).
 *
 * @example File or folder variant
 * <swc-asset variant="file" label="README.md"></swc-asset>
 * <swc-asset variant="folder" label="packages/"></swc-asset>
 *
 * @example Error state
 * <swc-asset error label="Failed to load"></swc-asset>
 *
 * @example Media wrapper (image, video, iframe)
 * <swc-asset>
 *   <swc-image src="photo.jpg" alt="Landscape"></swc-image>
 * </swc-asset>
 * <swc-asset>
 *   <video src="clip.mp4" muted playsinline></video>
 * </swc-asset>
 */
export class Asset extends AssetBase {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    protected override render(): TemplateResult {
        if (this.error) {
            return html`
                <div
                    class=${classMap({
                        ['spectrum-Asset']: true,
                        ['spectrum-Asset--error']: true,
                    })}
                >
                    ${error(this.label)}
                    ${this.label
                        ? html`<span class="spectrum-Asset-errorLabel"
                              >${this.label}</span
                          >`
                        : ''}
                </div>
            `;
        }

        if (this.variant === 'file') {
            return html`
                <div
                    class=${classMap({
                        ['spectrum-Asset']: true,
                    })}
                >
                    ${file(this.label)}
                </div>
            `;
        }

        if (this.variant === 'folder') {
            return html`
                <div
                    class=${classMap({
                        ['spectrum-Asset']: true,
                    })}
                >
                    ${folder(this.label)}
                </div>
            `;
        }

        return html`
            <div
                class=${classMap({
                    ['spectrum-Asset']: true,
                })}
            >
                <slot></slot>
            </div>
        `;
    }
}

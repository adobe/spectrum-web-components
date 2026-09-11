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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
export type AvatarSize = 50 | 75 | 100 | 200 | 300 | 400 | 500 | 600 | 700;
declare const Avatar_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
};
/**
 * @element sp-avatar
 */
export declare class Avatar extends Avatar_base {
    static get styles(): CSSResultArray;
    anchorElement: HTMLAnchorElement;
    get focusElement(): HTMLElement;
    src: string;
    /**
     * When true, marks the avatar as decorative and hides it from screen readers.
     * The underlying img will have an empty alt attribute (alt="").
     */
    isDecorative: boolean;
    get size(): AvatarSize;
    set size(value: AvatarSize);
    private _size;
    /**
     * Renders the avatar image with appropriate accessibility attributes.
     * Label takes precedence over isDecorative. When decorative and has href,
     * aria-hidden is not set so the link remains accessible.
     */
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
    private warnMissingAlt;
}
export {};

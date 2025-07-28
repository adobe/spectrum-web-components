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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
declare const ButtonBase_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
    prototype: import("@spectrum-web-components/shared/src/like-anchor.js").LikeAnchorInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
};
/**
 * @slot - text content to be displayed in the Button element
 * @slot icon - icon element(s) to display at the start of the button
 */
export declare class ButtonBase extends ButtonBase_base {
    static get styles(): CSSResultArray;
    active: boolean;
    /**
     * The default behavior of the button.
     * Possible values are: `button` (default), `submit`, and `reset`.
     */
    type: 'button' | 'submit' | 'reset';
    /**
     * HTML anchor element that component clicks by proxy
     */
    private anchorElement;
    get focusElement(): HTMLElement;
    protected get hasLabel(): boolean;
    protected get buttonContent(): TemplateResult[];
    constructor();
    private handleClickCapture;
    private proxyFocus;
    private shouldProxyClick;
    renderAnchor(): TemplateResult;
    protected renderButton(): TemplateResult;
    protected render(): TemplateResult;
    protected handleKeydown(event: KeyboardEvent): void;
    private handleKeypress;
    protected handleKeyup(event: KeyboardEvent): void;
    private manageAnchor;
    protected firstUpdated(changed: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    protected update(changes: PropertyValues): void;
}
export {};

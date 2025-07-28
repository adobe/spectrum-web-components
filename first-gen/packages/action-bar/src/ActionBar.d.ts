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
import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
export declare const actionBarVariants: string[];
declare const ActionBar_base: typeof SpectrumElement;
/**
 * @element sp-action-bar
 * @slot - Content to display with the Action Bar
 */
export declare class ActionBar extends ActionBar_base {
    static get styles(): CSSResultArray;
    /**
     * Deliver the Action Bar with additional visual emphasis.
     */
    emphasized: boolean;
    /**
     * When `flexible` the action bar sizes itself to its content
     * rather than a specific width.
     *
     * @param {Boolean} flexible
     */
    flexible: boolean;
    open: boolean;
    /**
     * The variant applies specific styling when set to `sticky` or `fixed`.
     * `variant` attribute is removed when not matching one of the above.
     *
     * @param {String} variant
     */
    set variant(variant: string);
    get variant(): string;
    private _variant;
    private handleClick;
    render(): TemplateResult;
}
export {};

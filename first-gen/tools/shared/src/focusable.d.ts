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
import { PropertyValues, SpectrumElement } from '@spectrum-web-components/base';
type DisableableElement = HTMLElement & {
    disabled?: boolean;
};
declare const Focusable_base: typeof SpectrumElement;
/**
 * Focusable base class handles tabindex setting into shadowed elements automatically.
 *
 * This implementation is based heavily on the aybolit delegate-focus-mixin at
 * https://github.com/web-padawan/aybolit/blob/master/packages/core/src/mixins/delegate-focus-mixin.js
 */
export declare class Focusable extends Focusable_base {
    /**
     * Disable this control. It will not receive focus or events
     */
    disabled: boolean;
    /**
     * When this control is rendered, focus it automatically
     * @private
     */
    autofocus: boolean;
    /**
     * The tab index to apply to this control. See general documentation about
     * the tabindex HTML property
     *
     * @private
     */
    get tabIndex(): number;
    set tabIndex(tabIndex: number);
    private _tabIndex;
    private onPointerdownManagementOfTabIndex;
    private manageFocusElementTabindex;
    private manipulatingTabindex;
    /**
     * @private
     */
    get focusElement(): DisableableElement;
    /**
     * @public
     * @returns {boolean} whether the component should manage its focusElement tab-index or not
     * Needed for action-menu to be supported in action-group in an accessible way
     */
    get selfManageFocusElement(): boolean;
    focus(options?: FocusOptions): void;
    blur(): void;
    click(): void;
    protected manageAutoFocus(): void;
    protected firstUpdated(changes: PropertyValues): void;
    protected update(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    private handleDisabledChanged;
    protected getUpdateComplete(): Promise<boolean>;
    private autofocusReady;
    connectedCallback(): void;
}
export {};

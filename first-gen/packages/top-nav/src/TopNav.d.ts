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
import { CSSResultArray, PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { TopNavItem } from './TopNavItem.js';
declare const TopNav_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-top-nav
 *
 * @slot - Nav Items to display as a group
 * @attr {Boolean} compact - The collection of tabs take up less space
 */
export declare class TopNav extends TopNav_base {
    static get styles(): CSSResultArray;
    dir: 'ltr' | 'rtl';
    label: string;
    /**
     * A space separated list of part of the URL to ignore when matching
     * for the "selected" Top Nav Item. Currently supported values are
     * `hash` and `search`, which will remove the `#hash` and
     * `?search=value` respectively.
     */
    ignoreURLParts: string;
    selectionIndicatorStyle: string;
    shouldAnimate: boolean;
    /**
     * The Top Nav is displayed without a border.
     */
    quiet: boolean;
    private onClick;
    set selected(value: string | undefined);
    get selected(): string | undefined;
    private _selected;
    private slotEl;
    protected get items(): TopNavItem[];
    protected set items(items: TopNavItem[]);
    private _items;
    protected resizeController: ResizeController<void>;
    private manageItems;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
    private selectTarget;
    protected onSlotChange(): void;
    protected updateCheckedState(value: string | undefined): void;
    private updateSelectionIndicator;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export {};

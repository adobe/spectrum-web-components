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
import { CSSResult, CSSResultArray, PropertyValueMap, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import { Tab } from './Tab.js';
import { Focusable } from '@spectrum-web-components/shared';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
export declare const ScaledIndicator: {
    baseSize: 100;
    noSelectionStyle: string;
    transformX(left: number, width: number): string;
    transformY(top: number, height: number): string;
    baseStyles(): CSSResult;
};
/**
 * Given that the scroll needs to be on the right side of the viewport.
 * Returns the coordonate x it needs to scroll so that the tab with given index is visible.
 */
export declare function calculateScrollTargetForRightSide(index: number, direction: 'rtl' | 'ltr', tabs: Tab[], container: HTMLDivElement): number;
/**
 * Given that the scroll needs to be on the left side of the viewport.
 * Returns the coordonate x it needs to scroll so that the tab with given index is visible.
 */
export declare function calculateScrollTargetForLeftSide(index: number, direction: 'rtl' | 'ltr', tabs: Tab[], container: HTMLDivElement): number;
declare const Tabs_base: typeof Focusable & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-tabs
 *
 * @slot - Tab elements to manage as a group
 * @slot tab-panel - Tab Panel elements related to the listed Tab elements
 * @csspart tablist - Container element for the slotted sp-tab elements
 *
 * @fires change - The selected Tab child has changed.
 */
export declare class Tabs extends Tabs_base {
    static get styles(): CSSResultArray;
    /**
     * Whether to activate a tab on keyboard focus or not.
     *
     * By default a tab is activated via a "click" interaction. This is specifically intended for when
     * tab content cannot be displayed instantly, e.g. not all of the DOM content is available, etc.
     * To learn more about "Deciding When to Make Selection Automatically Follow Focus", visit:
     * https://w3c.github.io/aria-practices/#kbd_selection_follows_focus
     */
    auto: boolean;
    /**
     * The tab items are displayed closer together.
     */
    compact: boolean;
    dir: 'ltr' | 'rtl';
    direction: 'vertical' | 'vertical-right' | 'horizontal';
    emphasized: boolean;
    label: string;
    enableTabsScroll: boolean;
    /**
     * The tab list is displayed without a border.
     */
    quiet: boolean;
    selectionIndicatorStyle: string;
    shouldAnimate: boolean;
    private slotEl;
    private tabList;
    selected: string;
    private set tabs(value);
    private get tabs();
    private _tabs;
    constructor();
    protected resizeController: ResizeController<void>;
    rovingTabindexController: RovingTabindexController<Tab>;
    /**
     * @private
     */
    get focusElement(): Tab | this;
    private limitDeltaToInterval;
    /**
     * Scrolls through the tabs component, on the X-axis, by a given ammount of pixels/ delta. The given delta is limited to the scrollable area of the tabs component.
     * @param {number} delta - The ammount of pixels to scroll by. If the value is positive, the tabs will scroll to the right. If the value is negative, the tabs will scroll to the left.
     * @param {ScrollBehavior} behavior - The scroll behavior to use. Defaults to 'smooth'.
     */
    scrollTabs(delta: number, behavior?: ScrollBehavior): void;
    get scrollState(): Record<string, boolean>;
    getUpdateComplete(): Promise<boolean>;
    private getNecessaryAutoScroll;
    scrollToSelection(): Promise<void>;
    protected updated(changedProperties: PropertyValueMap<this>): void;
    protected managePanels({ target, }: Event & {
        target: HTMLSlotElement;
    }): void;
    protected render(): TemplateResult;
    protected willUpdate(changes: PropertyValues): void;
    private onTabsScroll;
    private onClick;
    private onKeyDown;
    private selectTarget;
    private onSlotChange;
    private updateCheckedState;
    private updateSelectionIndicator;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export {};

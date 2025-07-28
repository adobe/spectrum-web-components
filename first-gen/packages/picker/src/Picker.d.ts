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
import { StyleInfo } from '@spectrum-web-components/base/src/directives.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';
import type { Menu, MenuItem, MenuItemChildren } from '@spectrum-web-components/menu';
import type { MenuItemKeydownEvent } from '@spectrum-web-components/menu';
import { Placement } from '@spectrum-web-components/overlay';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import { PendingStateController } from '@spectrum-web-components/reactive-controllers/src/PendingState.js';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import type { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import type { FieldLabel } from '@spectrum-web-components/field-label';
import { DesktopController } from './DesktopController.js';
import { MobileController } from './MobileController.js';
export declare const DESCRIPTION_ID = "option-picker";
declare const PickerBase_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-picker
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 */
export declare class PickerBase extends PickerBase_base {
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    isMobile: MatchMediaController;
    strategy: DesktopController | MobileController;
    appliedLabel?: string;
    button: HTMLButtonElement;
    dependencyManager: DependencyManagerController;
    private deprecatedMenu;
    disabled: boolean;
    focused: boolean;
    icons?: 'only' | 'none';
    invalid: boolean;
    /**
     * Forces the Picker to render as a popover on mobile instead of a tray.
     *
     * @memberof PickerBase
     */
    forcePopover: boolean;
    /** Whether the items are currently loading. */
    pending: boolean;
    /** Defines a string value that labels the Picker while it is in pending state. */
    pendingLabel: string;
    label?: string;
    open: boolean;
    readonly: boolean;
    selects: undefined | 'single';
    labelAlignment?: 'inline';
    protected get menuItems(): MenuItem[];
    optionsMenu: Menu;
    /**
     * @deprecated
     * */
    get selfManageFocusElement(): boolean;
    overlayElement: Overlay;
    protected tooltipEl?: Tooltip;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    placement: Placement;
    quiet: boolean;
    value: string;
    get selectedItem(): MenuItem | undefined;
    pendingStateController: PendingStateController<this>;
    /**
     * Initializes the `PendingStateController` for the Picker component.
     * The `PendingStateController` manages the pending state of the Picker.
     */
    constructor();
    set selectedItem(selectedItem: MenuItem | undefined);
    _selectedItem?: MenuItem;
    protected listRole: 'listbox' | 'menu';
    protected itemRole: string;
    get focusElement(): HTMLElement;
    forceFocusVisible(): void;
    click(): void;
    handleButtonClick(): void;
    handleButtonBlur(): void;
    focus(options?: FocusOptions): void;
    /**
     * @deprecated - Use `focus` instead.
     */
    handleHelperFocus(): void;
    handleFocus(): void;
    handleChange(event: Event): void;
    handleButtonFocus(event: FocusEvent): void;
    protected handleEscape: (event: MenuItemKeydownEvent | KeyboardEvent) => void;
    protected handleKeydown: (event: KeyboardEvent) => void;
    protected keyboardOpen(): Promise<void>;
    protected setValueFromItem(item: MenuItem, menuChangeEvent?: Event): Promise<void>;
    protected setMenuItemSelected(item: MenuItem, value: boolean): void;
    toggle(target?: boolean): void;
    close(): void;
    protected get containerStyles(): StyleInfo;
    protected get selectedItemContent(): MenuItemChildren;
    protected set selectedItemContent(selectedItemContent: MenuItemChildren | undefined);
    _selectedItemContent?: MenuItemChildren;
    protected handleTooltipSlotchange(event: Event & {
        target: HTMLSlotElement;
    }): void;
    handleSlottableRequest: (_event: SlottableRequestEvent) => void;
    protected renderLabelContent(content: Node[]): TemplateResult | Node[];
    protected get buttonContent(): TemplateResult[];
    applyFocusElementLabel: (value: string, labelElement: FieldLabel) => void;
    protected hasAccessibleLabel(): boolean;
    protected warnNoLabel(): void;
    protected renderOverlay(menu: TemplateResult): TemplateResult;
    protected get renderDescriptionSlot(): TemplateResult;
    protected render(): TemplateResult;
    protected willUpdate(changes: PropertyValues<this>): void;
    protected update(changes: PropertyValues<this>): void;
    protected bindButtonKeydownListener(): void;
    protected updated(changes: PropertyValues<this>): void;
    protected firstUpdated(changes: PropertyValues<this>): void;
    protected get dismissHelper(): TemplateResult;
    protected renderContainer(menu: TemplateResult): TemplateResult;
    protected hasRenderedOverlay: boolean;
    private onScroll;
    protected get renderMenu(): TemplateResult;
    /**
     * whether a selection change is already scheduled
     */
    willManageSelection: boolean;
    /**
     * when the value changes or the menu slot changes, manage the selection on the next frame, if not already scheduled
     * @param event
     */
    protected shouldScheduleManageSelection(event?: Event): void;
    /**
     * when an item is added or updated, manage the selection, if it's not already scheduled
     */
    protected shouldManageSelection(): void;
    /**
     * updates menu selection based on value
     */
    protected manageSelection(): Promise<void>;
    private selectionPromise;
    private selectionResolver;
    protected getUpdateComplete(): Promise<boolean>;
    private recentlyConnected;
    private enterKeydownOn;
    protected handleEnterKeydown: (event: KeyboardEvent) => void;
    bindEvents(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
/**
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export declare class Picker extends PickerBase {
    static get styles(): CSSResultArray;
    protected get containerStyles(): StyleInfo;
    protected handleKeydown: (event: KeyboardEvent) => void;
}
export {};

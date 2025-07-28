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
import { ActionButton } from '@spectrum-web-components/action-button';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
declare const ActionGroup_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-action-group
 * @slot - the sp-action-button elements that make up the group
 *
 * @fires change - Announces that selection state has been changed by user
 */
export declare class ActionGroup extends ActionGroup_base {
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    static get styles(): CSSResultArray;
    set buttons(buttons: ActionButton[]);
    get buttons(): ActionButton[];
    _buttons: ActionButton[];
    protected _buttonSelector: string;
    constructor();
    rovingTabindexController: RovingTabindexController<ActionButton>;
    compact: boolean;
    emphasized: boolean;
    justified: boolean;
    label: string;
    quiet: boolean;
    selects: undefined | 'single' | 'multiple';
    staticColor?: 'white' | 'black';
    vertical: boolean;
    private _selected;
    set selected(selected: string[]);
    get selected(): string[];
    slotElement: HTMLSlotElement;
    private dispatchChange;
    private setSelected;
    focus(options?: FocusOptions): void;
    private deselectSelectedButtons;
    private handleActionButtonChange;
    private handleClick;
    private applySelects;
    private manageSelects;
    protected render(): TemplateResult;
    protected firstUpdated(changes: PropertyValues): void;
    protected updated(changes: PropertyValues): void;
    private manageChildren;
    private hasManaged;
    private manageButtons;
}
export {};

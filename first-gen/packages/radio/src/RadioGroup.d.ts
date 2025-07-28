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
import { PropertyValues } from '@spectrum-web-components/base';
import { FieldGroup } from '@spectrum-web-components/field-group';
import { Radio } from './Radio.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
declare const RadioGroup_base: typeof FieldGroup;
/**
 * @element sp-radio-group
 *
 * @slot - The `sp-radio` elements to display/manage in the group.
 * @slot help-text - default or non-negative help text to associate to your form element
 * @slot negative-help-text - negative help text to associate to your form element when `invalid`
 *
 * @fires change - An alteration to the value of the element has been committed by the user.
 */
export declare class RadioGroup extends RadioGroup_base {
    name: string;
    defaultNodes: Node[];
    get buttons(): Radio[];
    rovingTabindexController: RovingTabindexController<Radio>;
    focus(): void;
    private _setSelected;
    selected: string;
    protected willUpdate(changes: PropertyValues<this>): void;
    private validateRadios;
    protected handleSlotchange(): void;
}
export {};

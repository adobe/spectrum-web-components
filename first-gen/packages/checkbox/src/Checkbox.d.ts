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
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-checkmark300.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-dash300.js';
declare const Checkbox_base: typeof SpectrumElement & {
    new (...args: any[]): import("./CheckboxMixin.js").CheckboxElement;
    prototype: import("./CheckboxMixin.js").CheckboxElement;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-checkbox
 * @slot - content to display as the label for the Checkbox
 * @fires change - Announces a change in the `checked` property of a Checkbox
 */
export declare class Checkbox extends Checkbox_base {
    static shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    /**
     * Disable this control. It will not receive focus or events
     */
    disabled: boolean;
    indeterminate: boolean;
    invalid: boolean;
    emphasized: boolean;
    tabIndex: number;
    connectedCallback(): void;
    static get styles(): CSSResultArray;
    click(): void;
    handleChange(): void;
    protected render(): TemplateResult;
    protected updated(changes: PropertyValues): void;
}
export {};

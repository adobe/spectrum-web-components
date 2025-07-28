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
import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { TextfieldBase } from '@spectrum-web-components/textfield';
/**
 * @element sp-color-field
 * @fires input - The value of the color-field has changed.
 * @fires change - An alteration to the value of the color-field has been committed by the user.
 */
export declare class ColorField extends TextfieldBase {
    static get styles(): CSSResultArray;
    viewColor: boolean;
    private colorController;
    constructor();
    set value(value: string);
    get value(): string;
    protected _value: string;
    private renderColorHandle;
    getColorValue(): string;
    protected render(): TemplateResult;
    checkValidity(): boolean;
}

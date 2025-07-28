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
import { StyledButton } from './StyledButton.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross75.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross100.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js';
declare const ClearButton_base: typeof StyledButton & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-clear-button
 *
 * @slot - text label of the Clear Button
 */
export declare class ClearButton extends ClearButton_base {
    static get styles(): CSSResultArray;
    quiet: boolean;
    /**
     * The visual variant to apply to this button.
     * @deprecated Use `static-color='white'` instead.
     */
    set variant(variant: 'overBackground' | undefined);
    get variant(): 'overBackground' | undefined;
    private _variant;
    /**
     * The visual variant to apply to this button.
     */
    staticColor: 'white' | undefined;
    protected get buttonContent(): TemplateResult[];
    protected render(): TemplateResult;
}
export {};

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
import { ButtonBase } from '@spectrum-web-components/button/src/ButtonBase.js';
declare const InfieldButton_base: typeof ButtonBase & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-infield-button
 */
export declare class InfieldButton extends InfieldButton_base {
    static get styles(): CSSResultArray;
    /**
     * Whether to style the button as if it is at the start or end of a vertical stack
     * @type {'start' | 'end'}
     */
    block?: 'start' | 'end';
    /**
     * Whether to style the button as if it is at the start or end of a horizontal group
     * @type {'start' | 'end'}
     */
    inline?: 'start' | 'end';
    quiet: boolean;
    protected get buttonContent(): TemplateResult[];
}
export {};

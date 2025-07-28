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
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross200.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross300.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross400.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-cross500.js';
import type { ButtonStaticColors } from './Button.js';
declare const CloseButton_base: typeof StyledButton & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-close-button
 *
 * @slot - text label of the Close Button
 */
export declare class CloseButton extends CloseButton_base {
    static get styles(): CSSResultArray;
    /**
     * The visual variant to apply to this button.
     */
    variant: ButtonStaticColors | '';
    staticColor?: 'black' | 'white';
    protected get buttonContent(): TemplateResult[];
}
export {};

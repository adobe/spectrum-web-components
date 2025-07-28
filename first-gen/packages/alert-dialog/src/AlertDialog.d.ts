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
import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
export type AlertDialogVariants = 'confirmation' | 'information' | 'warning' | 'error' | 'destructive' | 'secondary' | '';
export declare const alertDialogVariants: AlertDialogVariants[];
declare const AlertDialog_base: typeof SpectrumElement;
export declare class AlertDialog extends AlertDialog_base {
    static get styles(): CSSResultArray;
    private contentElement;
    private resizeController;
    _variant: AlertDialogVariants;
    set variant(variant: AlertDialogVariants);
    get variant(): AlertDialogVariants;
    protected renderIcon(): TemplateResult;
    protected renderHeading(): TemplateResult;
    protected renderContent(): TemplateResult;
    static instanceCount: number;
    private labelledbyId;
    private conditionLabelledby?;
    private conditionDescribedby?;
    private onHeadingSlotchange;
    shouldManageTabOrderForScrolling: () => void;
    private describedbyId;
    protected onContentSlotChange({ target, }: Event & {
        target: HTMLSlotElement;
    }): void;
    protected renderButtons(): TemplateResult;
    protected render(): TemplateResult;
}
export {};

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
import { FocusGroupController } from '@spectrum-web-components/reactive-controllers/src/FocusGroup.js';
import { AccordionItem } from './AccordionItem.js';
declare const Accordion_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-accordion
 * @slot - The sp-accordion-item children to display.
 */
export declare class Accordion extends Accordion_base {
    static get styles(): CSSResultArray;
    /**
     * Allows multiple accordion items to be opened at the same time
     */
    allowMultiple: boolean;
    /**
     * Sets the spacing between the content to borders of an accordion item
     */
    density?: 'compact' | 'spacious';
    private defaultNodes;
    private get items();
    focusGroupController: FocusGroupController<AccordionItem>;
    focus(): void;
    private onToggle;
    private handleSlotchange;
    protected updated(changed: PropertyValues<this>): void;
    protected render(): TemplateResult;
}
export {};

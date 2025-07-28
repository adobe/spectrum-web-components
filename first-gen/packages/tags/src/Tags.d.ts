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
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { Tag } from './Tag.js';
declare const Tags_base: typeof SpectrumElement;
/**
 * @element sp-tags
 *
 * @slot - Tag elements to manage as a group
 */
export declare class Tags extends Tags_base {
    static get styles(): CSSResultArray;
    defaultNodes: Node[];
    get tags(): Tag[];
    rovingTabindexController: RovingTabindexController<Tag>;
    constructor();
    focus(): void;
    private handleFocusin;
    private handleKeydown;
    private handleFocusout;
    private handleSlotchange;
    protected render(): TemplateResult;
    protected firstUpdated(): void;
}
export {};

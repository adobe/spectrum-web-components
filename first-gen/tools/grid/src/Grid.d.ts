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
import { CSSResultArray, PropertyValues, TemplateResult } from '@spectrum-web-components/base';
import { LitVirtualizer } from '@lit-labs/virtualizer/LitVirtualizer.js';
import { GridController } from './GridController.js';
/**
 * @element sp-grid
 *
 * @fires change - Announces that the value of `selected` has changed
 */
export declare class Grid extends LitVirtualizer {
    static get styles(): CSSResultArray;
    private __gridPart;
    focusableSelector: string;
    gap: `${'0' | `${number}px`}`;
    padding: `${'0' | `${number}px`}` | undefined;
    items: Record<string, unknown>[];
    itemSize: {
        width: number;
        height: number;
    };
    selected: Record<string, unknown>[];
    gridController: GridController<HTMLElement>;
    private lastTargetForChange?;
    private animationFrameId?;
    protected handleChange(event: Event): void;
    createRenderRoot(): this;
    render(): TemplateResult<1>;
    protected update(changes: PropertyValues<this>): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}

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
import type { Placement } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
/**
 * @element sp-truncated
 */
export declare class Truncated extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     */
    placement: Placement;
    successMessage: string;
    hasCopied: boolean;
    private fullText;
    private overflowing;
    private content;
    private overlayEl?;
    private slottedContent;
    private slottedOverflow;
    get hasCustomOverflow(): boolean;
    private resizeObserver;
    private mutationObserver;
    render(): TemplateResult;
    private renderTooltip;
    protected firstUpdated(_changedProperties: PropertyValues<this>): void;
    protected updated(changedProperties: PropertyValues<this>): void;
    private handleOverflowSlotchange;
    private handleClick;
    private measureOverflow;
    private copyText;
}

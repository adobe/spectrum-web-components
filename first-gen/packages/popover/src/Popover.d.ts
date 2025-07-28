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
import type { Placement } from '@spectrum-web-components/overlay/src/overlay-types.js';
/**
 * @element sp-popover
 *
 * @slot - content to display within the Popover
 */
export declare class Popover extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Whether the popover is visible or not.
     */
    open: boolean;
    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */
    placement?: Placement;
    tip: boolean;
    tipElement: HTMLSpanElement;
    protected renderTip(): TemplateResult;
    protected render(): TemplateResult;
}

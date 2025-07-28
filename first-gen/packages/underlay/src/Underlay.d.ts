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
/**
 * @element sp-underlay
 *
 * @fires close - When the underlay is "clicked" and the consuming pattern should chose whether to close based on that interaction
 */
export declare class Underlay extends SpectrumElement {
    static get styles(): CSSResultArray;
    private canClick;
    open: boolean;
    click(): void;
    protected handlePointerdown(): void;
    protected handlePointerup(): void;
    protected render(): TemplateResult;
    protected firstUpdated(): void;
}

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
import { PropertyValues, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
/**
 * @element sp-tab-panel
 *
 * @slot - content of the Tab Panel
 */
export declare class TabPanel extends SpectrumElement {
    static styles: import("@spectrum-web-components/base").CSSResult[];
    selected: boolean;
    value: string;
    protected handleFocusin(): void;
    protected handleFocusout(): void;
    protected render(): TemplateResult;
    protected firstUpdated(): void;
    protected updated(changes: PropertyValues<this>): void;
}

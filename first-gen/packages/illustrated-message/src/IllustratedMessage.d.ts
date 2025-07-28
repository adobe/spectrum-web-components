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
 * @element sp-illustrated-message
 *
 * @slot - The SVG that represents the illustration
 * @slot heading - Headline for the message
 * @slot description - Description text for the illustration
 */
export declare class IllustratedMessage extends SpectrumElement {
    static readonly is = "sp-illustrated-message";
    static get styles(): CSSResultArray;
    heading: string;
    description: string;
    protected render(): TemplateResult;
}

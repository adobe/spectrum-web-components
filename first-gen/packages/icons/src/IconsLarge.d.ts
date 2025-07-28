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
import { TemplateResult } from '@spectrum-web-components/base';
import { IconsetSVG } from '@spectrum-web-components/iconset/src/iconset-svg.js';
/**
 * @element sp-icons-large
 */
export declare class IconsLarge extends IconsetSVG {
    constructor();
    protected firstUpdated(): void;
    protected renderDefaultContent(): TemplateResult;
    /**
     * Overrides createIconName to make icon strings compatible with spectrum-icon id format
     * @param icon
     * @param size
     */
    protected getSVGIconName(icon: string): string;
    protected getSanitizedIconName(icon: string): string;
}

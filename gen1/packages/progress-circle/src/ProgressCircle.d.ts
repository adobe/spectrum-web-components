/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import { ProgressCircleBase } from './ProgressCircle.base.js';
import { type ProgressCircleStaticColorS1 } from './ProgressCircle.types.js';
/**
 * @element sp-progress-circle
 */
export declare class ProgressCircle extends ProgressCircleBase {
    /**
     * @internal
     */
    static readonly STATIC_COLORS: readonly ["white"];
    /**
     * Static color variant for use on different backgrounds.
     *
     * When set to 'white', the component uses white styling for images with a dark tinted background.
     */
    staticColor?: ProgressCircleStaticColorS1;
    static get styles(): CSSResultArray;
    protected render(): TemplateResult;
}

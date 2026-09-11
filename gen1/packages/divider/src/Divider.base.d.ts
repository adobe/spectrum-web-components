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
import { PropertyValues, SpectrumElement } from '@spectrum-web-components/base';
import { type DividerStaticColor } from './Divider.types.js';
declare const DividerBase_base: typeof SpectrumElement & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * A divider separates and distinguishes sections of content or groups of menu items.
 *
 * @attribute {ElementSize} size - The size of the divider.
 */
export declare abstract class DividerBase extends DividerBase_base {
    /**
     * @internal
     *
     * A readonly array of the valid static color variants for the divider.
     */
    static readonly STATIC_COLORS: readonly string[];
    /**
     * Whether the divider is vertical. If false, the divider is horizontal. The default is false.
     */
    vertical: boolean;
    /**
     * The static color variant to use for the divider.
     */
    staticColor?: DividerStaticColor;
    protected firstUpdated(changed: PropertyValues<this>): void;
    protected updated(changed: PropertyValues<this>): void;
}
export {};

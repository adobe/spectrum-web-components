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
import { type AssetVariant } from './Asset.types.js';
export declare abstract class AssetBase extends SpectrumElement {
    /**
     * @internal
     *
     * A readonly array of all valid variants for the asset.
     */
    static readonly VARIANTS: readonly AssetVariant[];
    /**
     * The variant of the asset. When not provided, slot content is rendered (e.g., an image).
     */
    variant: AssetVariant | undefined;
    /**
     * Accessible label for the asset's file or folder variant.
     */
    label: string;
    protected updated(changes: PropertyValues): void;
}

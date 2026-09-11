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
import { type BadgeVariant, type FixedValues } from './Badge.types.js';
declare const BadgeBase_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
} & import("@spectrum-web-components/base").Constructor<import("@spectrum-web-components/base").SizedElementInterface> & import("@spectrum-web-components/base").SizedElementConstructor;
/**
 * A badge component that displays short, descriptive information about an element.
 * Badges are typically used to indicate status, categories, or provide supplementary information.
 *
 * @attribute {ElementSize} size - The size of the badge.
 *
 * @slot - Text label of the badge.
 * @slot icon - Optional icon that appears to the left of the label
 */
export declare abstract class BadgeBase extends BadgeBase_base {
    /**
     * @internal
     *
     * A readonly array of the valid color variants for the badge.
     */
    static readonly VARIANTS_COLOR: readonly string[];
    /**
     * @internal
     *
     * A readonly array of all valid variants for the badge.
     */
    static readonly VARIANTS: readonly string[];
    /**
     * @internal
     *
     * The variant of the badge.
     */
    variant: BadgeVariant;
    /**
     * @internal
     */
    static readonly FIXED_VALUES: readonly string[];
    /**
     * @internal
     */
    static readonly VARIANTS_SEMANTIC: readonly string[];
    /**
     * The fixed position of the badge.
     */
    get fixed(): FixedValues | undefined;
    set fixed(fixed: FixedValues | undefined);
    private _fixed?;
    /**
     * Used for rendering gap when the badge has an icon.
     *
     * @internal
     */
    protected get hasIcon(): boolean;
    protected update(changedProperties: PropertyValues): void;
}
export {};

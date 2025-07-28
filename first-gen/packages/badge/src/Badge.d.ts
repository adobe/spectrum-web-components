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
export declare const BADGE_VARIANTS: readonly ["accent", "neutral", "informative", "positive", "negative", "notice", "fuchsia", "indigo", "magenta", "purple", "seafoam", "yellow", "gray", "red", "orange", "chartreuse", "celery", "green", "cyan", "blue"];
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
export declare const FIXED_VALUES: readonly ["inline-start", "inline-end", "block-start", "block-end"];
export type FixedValues = (typeof FIXED_VALUES)[number];
declare const Badge_base: typeof SpectrumElement & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-presence.js").SlotPresenceObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
    prototype: import("@spectrum-web-components/shared/src/observe-slot-text.js").SlotTextObservingInterface;
} & {
    new (...args: any[]): import("@spectrum-web-components/base").SizedElementInterface;
    prototype: import("@spectrum-web-components/base").SizedElementInterface;
};
/**
 * @element sp-badge
 *
 * @slot - Text label of the badge
 * @slot icon - Optional icon that appears to the left of the label
 */
export declare class Badge extends Badge_base {
    static get styles(): CSSResultArray;
    get fixed(): FixedValues | undefined;
    set fixed(fixed: FixedValues | undefined);
    private _fixed?;
    variant: BadgeVariant;
    protected get hasIcon(): boolean;
    protected render(): TemplateResult;
}
export {};

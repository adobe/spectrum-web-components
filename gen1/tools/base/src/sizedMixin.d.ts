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
import { ReactiveElement } from 'lit';
export type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export declare const ELEMENT_SIZES: readonly ["xxs", "xs", "s", "m", "l", "xl", "xxl"];
export type ElementSize = (typeof ELEMENT_SIZES)[number];
export declare const DEFAULT_ELEMENT_SIZES: readonly ["s", "m", "l", "xl"];
export type DefaultElementSize = (typeof DEFAULT_ELEMENT_SIZES)[number];
export interface SizedElementInterface {
    size: ElementSize;
}
export interface SizedElementConstructor {
    readonly VALID_SIZES: readonly ElementSize[];
}
export declare function SizedMixin<T extends Constructor<ReactiveElement>>(constructor: T, { validSizes, noDefaultSize, defaultSize, }?: {
    validSizes?: readonly ElementSize[];
    noDefaultSize?: boolean;
    defaultSize?: ElementSize;
}): T & Constructor<SizedElementInterface> & SizedElementConstructor;
/**
 * @deprecated Use `ELEMENT_SIZES` instead. This record will be removed in a future release.
 */
export declare const ElementSizes: Record<string, ElementSize>;

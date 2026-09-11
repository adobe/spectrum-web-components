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
import { LitElement, ReactiveElement } from 'lit';
type Constructor<T = Record<string, unknown>> = {
    new (...args: any[]): T;
    prototype: T;
};
export interface SpectrumInterface {
    shadowRoot: ShadowRoot;
    hasVisibleFocusInTree(): boolean;
}
export declare function SpectrumMixin<T extends Constructor<ReactiveElement>>(constructor: T): T & Constructor<SpectrumInterface>;
declare const SpectrumElement_base: typeof LitElement & Constructor<SpectrumInterface>;
/**
 * Base class for 1st-gen Spectrum Web Components.
 */
export declare class SpectrumElement extends SpectrumElement_base {
    /**
     * The version of the 1st-gen Spectrum Web Components library.
     */
    static VERSION: string;
    /**
     * The version of the core base package.
     */
    static CORE_VERSION: string;
    get dir(): CSSStyleDeclaration['direction'];
}
export {};

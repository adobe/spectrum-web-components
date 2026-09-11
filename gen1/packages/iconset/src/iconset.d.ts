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
import { LitElement } from '@spectrum-web-components/base';
export declare abstract class Iconset extends LitElement {
    protected registered: boolean;
    private _name;
    protected firstUpdated(): void;
    /**
     * Name of the iconset, used by the IconsetRegistry to serve this icon set
     * to consuming icons.
     */
    set name(value: string);
    get name(): string;
    /**
     * Applies an icon to the given element
     */
    abstract applyIconToElement(el: HTMLElement, icon: string, size: string, label: string): void;
    /**
     * Returns a list of all icons in this iconset.
     */
    abstract getIconList(): string[];
    private handleRemoved;
    /**
     * On updated we register the iconset if we're not already registered
     */
    connectedCallback(): void;
    /**
     * On disconnected we remove the iconset
     */
    disconnectedCallback(): void;
    private addIconset;
    private removeIconset;
}

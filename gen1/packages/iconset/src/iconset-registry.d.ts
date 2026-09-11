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
import { Iconset } from './iconset.js';
export interface IconsetAddedDetail {
    name: string;
    iconset: Iconset;
}
export interface IconsetRemovedDetail {
    name: string;
}
export declare class IconsetRegistry {
    static getInstance(): IconsetRegistry;
    private static instance;
    private iconsetMap;
    addIconset(name: string, iconset: Iconset): void;
    removeIconset(name: string): void;
    getIconset(name: string): Iconset | undefined;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'sp-iconset-added': CustomEvent<IconsetAddedDetail>;
        'sp-iconset-removed': CustomEvent<IconsetRemovedDetail>;
    }
}

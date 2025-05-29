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

export class IconsetRegistry {
    // singleton getter
    public static getInstance(): IconsetRegistry {
        if (!IconsetRegistry.instance) {
            IconsetRegistry.instance = new IconsetRegistry();
        }
        return IconsetRegistry.instance;
    }
    private static instance: IconsetRegistry;

    private iconsetMap = new Map<string, Iconset>();

    public addIconset(name: string, iconset: Iconset): void {
        this.iconsetMap.set(name, iconset);

        // dispatch a sp-iconset-added event on window to let everyone know we have a new iconset
        // note we're using window here for efficiency since we don't need to bubble through the dom since everyone
        // will know where to look for this event
        const event = new CustomEvent('sp-iconset-added', {
            bubbles: true,
            composed: true,
            detail: { name, iconset },
        });
        // we're dispatching this event in the next tick to allow the iconset to finish any slotchange or other event
        // listeners caused by connection to the dom and first render to complete, this way any icons listening for
        // this iconset will be able to access the completed iconset
        setTimeout(() => window.dispatchEvent(event), 0);
    }
    public removeIconset(name: string): void {
        this.iconsetMap.delete(name);
        // dispatch a sp-iconset-removed event on window to let everyone know we have a new iconset
        // note we're using window here for efficiency since we don't need to bubble through the dom since everyone
        // will know where to look for this event
        const event = new CustomEvent('sp-iconset-removed', {
            bubbles: true,
            composed: true,
            detail: { name },
        });
        // we're dispatching this event in the next tick To keep the event model consistent with the added event
        setTimeout(() => window.dispatchEvent(event), 0);
    }
    public getIconset(name: string): Iconset | undefined {
        return this.iconsetMap.get(name);
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-iconset-added': CustomEvent<IconsetAddedDetail>;
        'sp-iconset-removed': CustomEvent<IconsetRemovedDetail>;
    }
}

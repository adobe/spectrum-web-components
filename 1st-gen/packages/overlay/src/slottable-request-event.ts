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

export class SlottableRequestEvent extends Event {
    readonly data: unknown;
    readonly name: string;
    readonly slotName: string;
    constructor(name: string, data: unknown, key?: string) {
        super('slottable-request', {
            bubbles: false,
            cancelable: true,
            composed: false,
        });
        this.name = name;
        this.data = data;
        this.slotName = key !== undefined ? `${name}.${key}` : name;
        if (window.__swc?.DEBUG) {
            window.__swc.warn(
                undefined,
                `⚠️  WARNING ⚠️ : \`slottable-request\` events are experimental and there is no guarantees behind usage of them in an application!! Their shape and presence within the library could be changed at anytime.

Learn more about the protocol these events are based on below:`,
                'https://github.com/webcomponents-cg/community-protocols/pull/45',
                {
                    level: 'high',
                    type: 'api',
                }
            );
        }
    }
}

export const removeSlottableRequest = Symbol('remove-slottable-request');

declare global {
    interface GlobalEventHandlersEventMap {
        'slottable-request': SlottableRequestEvent;
    }
}

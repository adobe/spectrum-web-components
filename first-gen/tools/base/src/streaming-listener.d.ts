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
import { nothing, Part } from 'lit';
import { AsyncDirective } from 'lit/async-directive.js';
import type { DirectiveResult } from 'lit/directive.js';
type ListenerConfig = [string | string[], (event?: any) => void];
type ListenerConfigGroup = {
    start: ListenerConfig;
    end: ListenerConfig;
    streamInside?: ListenerConfig;
    streamOutside?: ListenerConfig;
};
/**
 * Performantly manage listening to event in a series, like:
 *   - `input[type="range"]`: input, input, etc. => change
 *   - `sp-color-area`: pointerdown => pointermove, pointermove, etc. => pointerup
 * Lazily bind events to the specific part of the series while
 * throttling streamed events to 1/frame.
 */
declare class StreamingListenerDirective extends AsyncDirective {
    host: EventTarget | Record<string, unknown> | Element;
    element: Element;
    start: ListenerConfig;
    streamInside: ListenerConfig;
    end: ListenerConfig;
    streamOutside: ListenerConfig;
    state: 'off' | 'on';
    stream?: number;
    render(_configGroup: ListenerConfigGroup): typeof nothing;
    update(part: Part, [{ start, end, streamInside, streamOutside, },]: Parameters<this['render']>): void;
    addListeners(state?: 'on' | 'off'): void;
    callHandler(value: (event: Event) => void | EventListenerObject, event: Event): void;
    handleStream(value: (event: Event) => void | EventListenerObject, event: Event): void;
    clearStream(): void;
    handleStart: (event: Event) => void;
    handleInside: (event: Event) => void;
    handleEnd: (event: Event) => void;
    handleOutside: (event: Event) => void;
    addListener(type: string | string[], fn: (event: Event) => void): void;
    removeListener(type: string | string[], fn: (event: Event) => void): void;
    removeListeners(): void;
    disconnected(): void;
    reconnected(): void;
}
export declare const streamingListener: (_configGroup: ListenerConfigGroup) => DirectiveResult<typeof StreamingListenerDirective>;
/**
 * The type of the class that powers this directive. Necessary for naming the
 * directive's return type.
 */
export type { StreamingListenerDirective };

/* eslint-disable @typescript-eslint/no-explicit-any */
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { nothing, Part, ElementPart } from 'lit';
import { directive, AsyncDirective } from 'lit/async-directive.js';
import type { DirectiveResult } from 'lit/directive.js';

type ListenerConfig = [string | string[], (event?: any) => void];
type ListenerConfigGroup = {
    start: ListenerConfig;
    end: ListenerConfig;
    streamInside?: ListenerConfig;
    streamOutside?: ListenerConfig;
};

/* c8 ignore next 6 */
const defaultListener: ListenerConfig = [
    '',
    (): void => {
        return;
    },
];

class StreamingListenerDirective extends AsyncDirective {
    host!: EventTarget | Record<string, unknown> | Element;
    element!: Element;

    start: ListenerConfig = defaultListener;
    streamInside: ListenerConfig = defaultListener;
    end: ListenerConfig = defaultListener;
    streamOutside: ListenerConfig = defaultListener;

    state: 'off' | 'on' = 'off';

    /* c8 ignore next 4 */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render(_configGroup: ListenerConfigGroup): typeof nothing {
        return nothing;
    }

    update(
        part: Part,
        [
            {
                start,
                end,
                streamInside = defaultListener,
                streamOutside = defaultListener,
            },
        ]: Parameters<this['render']>
    ): void {
        if (this.element !== (part as ElementPart).element) {
            this.element = (part as ElementPart).element;
            this.removeListeners();
        }
        this.host =
            (part.options?.host as Record<string, unknown>) || this.element;
        this.start = start;
        this.end = end;
        this.streamInside = streamInside;
        this.streamOutside = streamOutside;
        this.addListeners();
    }

    addListeners(state?: 'on' | 'off'): void {
        this.state = state || this.state;
        if (this.state === 'off') {
            this.addListener(this.streamOutside[0], this.handleBetween);
            this.addListener(this.start[0], this.handleStart);
        } else if (this.state === 'on') {
            this.addListener(this.streamInside[0], this.handleStream);
            this.addListener(this.end[0], this.handleEnd);
        }
    }

    callHandler(
        value: (event: Event) => void | EventListenerObject,
        event: Event
    ): void {
        if (typeof value === 'function') {
            (value as (event: Event) => void).call(this.host, event);
        } else {
            (value as EventListenerObject).handleEvent(event);
        }
    }

    handleStart = (event: Event): void => {
        this.callHandler(this.start[1], event);
        if (event.defaultPrevented) {
            return;
        }
        this.removeListeners();
        this.addListeners('on');
    };

    handleStream = (event: Event): void => {
        this.callHandler(this.streamInside[1], event);
    };

    handleEnd = (event: Event): void => {
        this.callHandler(this.end[1], event);
        this.removeListeners();
        this.addListeners('off');
    };

    handleBetween = (event: Event): void => {
        this.callHandler(this.streamOutside[1], event);
    };

    addListener(type: string | string[], fn: (event: Event) => void): void {
        if (Array.isArray(type)) {
            type.map((eventName) => {
                this.element.addEventListener(eventName, fn);
            });
        } else {
            this.element.addEventListener(type, fn);
        }
    }

    removeListener(type: string | string[], fn: (event: Event) => void): void {
        if (Array.isArray(type)) {
            type.map((eventName) => {
                this.element.removeEventListener(eventName, fn);
            });
        } else {
            this.element.removeEventListener(type, fn);
        }
    }

    removeListeners(): void {
        this.removeListener(this.start[0], this.handleStart);
        this.removeListener(this.streamInside[0], this.handleStream);
        this.removeListener(this.end[0], this.handleEnd);
        this.removeListener(this.streamOutside[0], this.handleBetween);
    }

    disconnected(): void {
        this.removeListeners();
    }

    reconnected(): void {
        this.addListeners();
    }
}

export const streamingListener: (
    _configGroup: ListenerConfigGroup
) => DirectiveResult<typeof StreamingListenerDirective> = directive(
    StreamingListenerDirective
);

/**
 * The type of the class that powers this directive. Necessary for naming the
 * directive's return type.
 */
export type { StreamingListenerDirective };

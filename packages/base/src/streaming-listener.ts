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
import { EventPart, directive, Part } from 'lit-html';

type StreamingEvent = {
    type: string | string[];
    fn: (event: any) => void;
};

type StreamingListener = {
    start: StreamingEvent;
    stream: StreamingEvent;
    end: StreamingEvent;
    removeEventListeners: () => void;
};

const previousValues = new WeakMap<Part, StreamingListener>();

const stateMap = new WeakMap<Part, boolean>();

const addListener = (
    el: Element,
    type: string | string[],
    fn: EventListenerOrEventListenerObject
): void => {
    if (Array.isArray(type)) {
        type.map((eventName) => {
            el.addEventListener(eventName, fn);
        });
    } else {
        el.addEventListener(type, fn);
    }
};

const removeListener = (
    el: Element,
    type: string | string[],
    fn: EventListenerOrEventListenerObject
): void => {
    if (Array.isArray(type)) {
        type.map((eventName) => {
            el.removeEventListener(eventName, fn);
        });
    } else {
        el.removeEventListener(type, fn);
    }
};

const addEventListeners = (
    part: EventPart,
    start: StreamingEvent,
    stream: StreamingEvent,
    end: StreamingEvent
): (() => void) => {
    const { element, eventContext } = part;
    const isStreaming = stateMap.get(part);
    let handledStream = false;

    const handleStream = (event: any): void => {
        if (!handledStream) {
            handledStream = true;
            stream.fn.call(eventContext || element, event);
            requestAnimationFrame(() => {
                handledStream = false;
            });
        }
    };

    const handleEnd = (event: any): void => {
        addListener(element, start.type, handleStart);
        removeListener(element, stream.type, handleStream);
        removeListener(element, end.type, handleEnd);
        stateMap.set(part, false);
        end.fn.call(eventContext || element, event);
    };

    const handleStart = (event: any): void => {
        removeListener(element, start.type, handleStart);
        addListener(element, stream.type, handleStream);
        addListener(element, end.type, handleEnd);
        stateMap.set(part, true);
        start.fn.call(eventContext || element, event);
    };

    if (!isStreaming) {
        addListener(element, start.type, handleStart);
    } else {
        addListener(element, stream.type, handleStream);
        addListener(element, end.type, handleEnd);
    }

    return () => {
        removeListener(element, start.type, handleStart);
        removeListener(element, stream.type, handleStream);
        removeListener(element, end.type, handleEnd);
    };
};

/**
 * For AttributeParts, sets the attribute if the value is defined and removes
 * the attribute if the value is undefined.
 *
 * For other part types, this directive is a no-op.
 */
export const streamingListener = directive(
    (start: StreamingEvent, stream: StreamingEvent, end: StreamingEvent) => (
        part: Part
    ) => {
        if (!(part instanceof EventPart)) {
            return;
        }
        if (previousValues.has(part)) {
            const previous = previousValues.get(part) as StreamingListener;
            if (
                start.type === previous.start.type &&
                stream.type === previous.stream.type &&
                end.type === previous.end.type &&
                start.fn === previous.start.fn &&
                stream.fn === previous.stream.fn &&
                end.fn === previous.end.fn
            ) {
                return;
            }
            previous.removeEventListeners();
        } else {
            stateMap.set(part, false);
        }
        previousValues.set(part, {
            start,
            stream,
            end,
            removeEventListeners: addEventListeners(part, start, stream, end),
        });
    }
);

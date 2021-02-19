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

// Opt-in resize observer types
export interface SWCResizeObserverEntry {
    contentRect: DOMRectReadOnly;
}

export interface SWCResizeObserver {
    // eslint-disable-next-line @typescript-eslint/no-misused-new
    new (callback: SWCResizeObserverCallback): SWCResizeObserver;
    disconnect(): void;
    observe(target: Element): void;
    unobserve(target: Element): void;
}

export interface WithSWCResizeObserver {
    ResizeObserver: SWCResizeObserver;
}

export type SWCResizeObserverCallback = (
    entries: SWCResizeObserverEntry[],
    observer: SWCResizeObserver
) => void;

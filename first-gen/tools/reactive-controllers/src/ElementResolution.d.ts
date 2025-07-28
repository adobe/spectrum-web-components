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
import type { ReactiveController, ReactiveElement } from 'lit';
export declare const elementResolverUpdatedSymbol: unique symbol;
export declare class ElementResolutionController implements ReactiveController {
    get element(): HTMLElement | null;
    set element(element: HTMLElement | null);
    private _element;
    private host;
    private observer;
    get selector(): string;
    set selector(selector: string);
    private _selector;
    get selectorAsId(): string;
    get selectorIsId(): boolean;
    constructor(host: ReactiveElement, { selector }?: {
        selector: string;
    });
    protected mutationCallback: MutationCallback;
    hostConnected(): void;
    hostDisconnected(): void;
    private resolveElement;
    private releaseElement;
    private elementIsSelected;
}

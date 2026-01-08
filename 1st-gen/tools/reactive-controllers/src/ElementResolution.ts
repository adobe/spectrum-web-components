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
export const elementResolverUpdatedSymbol = Symbol('element resolver updated');

export class ElementResolutionController implements ReactiveController {
    get element(): HTMLElement | null {
        return this._element;
    }

    set element(element: HTMLElement | null) {
        if (element === this.element) return;
        const previous = this.element;
        this._element = element;
        // requestUpdate leveraging the exported Symbol() so that the
        // changes can be easily tracked in the host element.
        this.host.requestUpdate(elementResolverUpdatedSymbol, previous);
    }

    private _element: HTMLElement | null = null;

    private host!: ReactiveElement;

    private observer!: MutationObserver;

    get selector(): string {
        return this._selector;
    }

    set selector(selector: string) {
        if (selector === this.selector) return;
        this.releaseElement();
        this._selector = selector;
        this.resolveElement();
    }

    private _selector = '';

    get selectorAsId(): string {
        return this.selector.slice(1);
    }

    get selectorIsId(): boolean {
        return !!this.selector && this.selector.startsWith('#');
    }

    constructor(
        host: ReactiveElement,
        { selector }: { selector: string } = { selector: '' }
    ) {
        this.host = host;
        this.selector = selector;
        this.observer = new MutationObserver(this.mutationCallback);
        // Add the controller after the MutationObserver has been created in preparation
        // for the `hostConnected`/`hostDisconnected` callbacks to be run.
        this.host.addController(this);
    }

    protected mutationCallback: MutationCallback = (mutationList) => {
        let needsResolution = false;
        mutationList.forEach((mutation) => {
            if (needsResolution) return;
            if (mutation.type === 'childList') {
                const currentElementRemoved =
                    this.element &&
                    [...mutation.removedNodes].includes(this.element);
                const matchingElementAdded =
                    !!this.selector &&
                    ([...mutation.addedNodes] as HTMLElement[]).some(
                        this.elementIsSelected
                    );
                needsResolution =
                    needsResolution ||
                    currentElementRemoved ||
                    matchingElementAdded;
            }
            if (mutation.type === 'attributes') {
                const attributeChangedOnCurrentElement =
                    mutation.target === this.element;
                const attributeChangedOnMatchingElement =
                    !!this.selector &&
                    this.elementIsSelected(mutation.target as HTMLElement);
                needsResolution =
                    needsResolution ||
                    attributeChangedOnCurrentElement ||
                    attributeChangedOnMatchingElement;
            }
        });
        if (needsResolution) {
            this.resolveElement();
        }
    };

    public hostConnected(): void {
        this.resolveElement();
        this.observer.observe(this.host.getRootNode(), {
            subtree: true,
            childList: true,
            attributes: true,
        });
    }

    public hostDisconnected(): void {
        this.releaseElement();
        this.observer.disconnect();
    }

    private resolveElement(): void {
        if (!this.selector) {
            this.releaseElement();
            return;
        }

        const parent = this.host.getRootNode() as ShadowRoot;
        this.element = this.selectorIsId
            ? (parent.getElementById(this.selectorAsId) as HTMLElement)
            : (parent.querySelector(this.selector) as HTMLElement);
    }

    private releaseElement(): void {
        this.element = null;
    }

    private elementIsSelected = (el: HTMLElement): boolean => {
        return this.selectorIsId
            ? el?.id === this.selectorAsId
            : el?.matches?.(this.selector);
    };
}

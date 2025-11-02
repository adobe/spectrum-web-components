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

type DirectionTypes = 'horizontal' | 'vertical' | 'both' | 'grid';
export type FocusGroupConfig<T> = {
    hostDelegatesFocus?: boolean;
    focusInIndex?: (_elements: T[]) => number;
    direction?: DirectionTypes | (() => DirectionTypes);
    elementEnterAction?: (el: T) => void;
    elements: () => T[];
    isFocusableElement?: (el: T) => boolean;
    listenerScope?: HTMLElement | (() => HTMLElement);
};

function ensureMethod<T, RT>(
    value: T | RT | undefined,
    type: string,
    fallback: T
): T {
    if (typeof value === type) {
        return (() => value) as T;
    } else if (typeof value === 'function') {
        return value as T;
    }
    return fallback;
}

export class FocusGroupController<T extends HTMLElement>
    implements ReactiveController
{
    protected cachedElements?: T[];
    private mutationObserver: MutationObserver;

    get currentIndex(): number {
        if (this._currentIndex === -1) {
            this._currentIndex = this.focusInIndex;
        }
        return this._currentIndex - this.offset;
    }

    set currentIndex(currentIndex) {
        this._currentIndex = currentIndex + this.offset;
    }

    private _currentIndex = -1;

    private prevIndex = -1;

    get direction(): DirectionTypes {
        return this._direction();
    }

    _direction = (): DirectionTypes => 'both';

    public directionLength = 5;

    public hostDelegatesFocus = false;

    elementEnterAction = (_el: T): void => {
        return;
    };

    get elements(): T[] {
        if (!this.cachedElements) {
            this.cachedElements = this._elements();
        }
        return this.cachedElements;
    }

    private _elements!: () => T[];

    protected set focused(focused: boolean) {
        /* c8 ignore next 1 */
        if (focused === this.focused) return;
        this._focused = focused;
    }

    protected get focused(): boolean {
        return this._focused;
    }

    private _focused = false;

    get focusInElement(): T {
        return this.elements[this.focusInIndex];
    }

    get focusInIndex(): number {
        return this._focusInIndex(this.elements);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _focusInIndex = (_elements: T[]): number => 0;

    host: ReactiveElement;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isFocusableElement = (_el: T): boolean => true;

    isEventWithinListenerScope(event: Event): boolean {
        if (this._listenerScope() === this.host) return true;
        return event.composedPath().includes(this._listenerScope());
    }

    _listenerScope = (): HTMLElement => this.host;

    // When elements are virtualized, the delta between the first element
    // and the first rendered element.
    offset = 0;

    recentlyConnected = false;

    constructor(
        host: ReactiveElement,
        {
            hostDelegatesFocus,
            direction,
            elementEnterAction,
            elements,
            focusInIndex,
            isFocusableElement,
            listenerScope,
        }: FocusGroupConfig<T> = { elements: () => [] }
    ) {
        this.mutationObserver = new MutationObserver(() => {
            this.handleItemMutation();
        });
        this.hostDelegatesFocus = hostDelegatesFocus || false;
        this.host = host;
        this.host.addController(this);
        this._elements = elements;
        this.isFocusableElement = isFocusableElement || this.isFocusableElement;
        this._direction = ensureMethod<() => DirectionTypes, DirectionTypes>(
            direction,
            'string',
            this._direction
        );
        this.elementEnterAction = elementEnterAction || this.elementEnterAction;
        this._focusInIndex = ensureMethod<(_elements: T[]) => number, number>(
            focusInIndex,
            'number',
            this._focusInIndex
        );
        this._listenerScope = ensureMethod<() => HTMLElement, HTMLElement>(
            listenerScope,
            'object',
            this._listenerScope
        );
    }
    /*  In  handleItemMutation() method the first if condition is checking if the element is not focused or if the element's children's length is not decreasing then it means no element has been deleted and we must return.
        Then we are checking if the deleted element was the focused one before the deletion if so then we need to proceed else we casn return;
    */
    handleItemMutation(): void {
        if (
            this._currentIndex == -1 ||
            this.elements.length <= this._elements().length
        )
            return;
        const focusedElement = this.elements[this.currentIndex];
        this.clearElementCache();
        if (this.elements.includes(focusedElement)) return;
        const moveToNextElement = this.currentIndex !== this.elements.length;
        const diff = moveToNextElement ? 1 : -1;
        if (moveToNextElement) {
            this.setCurrentIndexCircularly(-1);
        }
        this.setCurrentIndexCircularly(diff);
        this.focus();
    }

    update({ elements }: FocusGroupConfig<T> = { elements: () => [] }): void {
        this.unmanage();
        this._elements = elements;
        this.clearElementCache();
        this.manage();
    }

    /**
     * resets the focusedItem to initial item
     */
    reset(): void {
        const elements = this.elements;
        if (!elements.length) return;
        this.setCurrentIndexCircularly(this.focusInIndex - this.currentIndex);
        let focusElement = elements[this.currentIndex];
        if (this.currentIndex < 0) {
            return;
        }
        if (!focusElement || !this.isFocusableElement(focusElement)) {
            this.setCurrentIndexCircularly(1);
            focusElement = elements[this.currentIndex];
        }
        if (focusElement && this.isFocusableElement(focusElement)) {
            elements[this.prevIndex]?.setAttribute('tabindex', '-1');
            focusElement.setAttribute('tabindex', '0');
        }
    }

    focusOnItem(item?: T, options?: FocusOptions): void {
        const elements = this.elements || [];
        const newIndex: number =
            !item || !this.isFocusableElement(item)
                ? -1
                : elements.indexOf(item);
        if (newIndex > -1) {
            this.currentIndex = newIndex;
            elements[this.prevIndex]?.setAttribute('tabindex', '-1');
        }
        this.focus(options);
    }

    focus(options?: FocusOptions): void {
        const elements = this.elements;
        if (!elements.length) return;
        let focusElement = elements[this.currentIndex];
        if (!focusElement || !this.isFocusableElement(focusElement)) {
            this.setCurrentIndexCircularly(1);
            focusElement = elements[this.currentIndex];
        }
        if (focusElement && this.isFocusableElement(focusElement)) {
            if (
                !this.hostDelegatesFocus ||
                elements[this.prevIndex] !== focusElement
            ) {
                elements[this.prevIndex]?.setAttribute('tabindex', '-1');
            }
            focusElement.tabIndex = 0;
            focusElement.focus(options);
            if (this.hostDelegatesFocus && !this.focused) {
                this.hostContainsFocus();
            }
        }
    }

    clearElementCache(offset = 0): void {
        this.mutationObserver.disconnect();
        delete this.cachedElements;
        this.offset = offset;
        requestAnimationFrame(() => {
            this.elements.forEach((element) => {
                this.mutationObserver.observe(element, {
                    attributes: true,
                });
            });
        });
    }

    setCurrentIndexCircularly(diff: number): void {
        const { length } = this.elements;
        let steps = length;
        this.prevIndex = this.currentIndex;
        // start at a possibly not 0 index
        let nextIndex = (length + this.currentIndex + diff) % length;
        while (
            // don't cycle the elements more than once
            steps &&
            this.elements[nextIndex] &&
            !this.isFocusableElement(this.elements[nextIndex])
        ) {
            nextIndex = (length + nextIndex + diff) % length;
            steps -= 1;
        }
        this.currentIndex = nextIndex;
    }

    hostContainsFocus(): void {
        this.host.addEventListener('focusout', this.handleFocusout);
        this.host.addEventListener('keydown', this.handleKeydown);
        this.focused = true;
    }

    hostNoLongerContainsFocus(): void {
        this.host.addEventListener('focusin', this.handleFocusin);
        this.host.removeEventListener('focusout', this.handleFocusout);
        this.host.removeEventListener('keydown', this.handleKeydown);
        this.focused = false;
    }

    isRelatedTargetOrContainAnElement(event: FocusEvent): boolean {
        const relatedTarget = event.relatedTarget as null | Element;

        const isRelatedTargetAnElement = this.elements.includes(
            relatedTarget as T
        );
        const isRelatedTargetContainedWithinElements = this.elements.some(
            (el) => el.contains(relatedTarget)
        );
        return !(
            isRelatedTargetAnElement || isRelatedTargetContainedWithinElements
        );
    }

    handleFocusin = (event: FocusEvent): void => {
        if (!this.isEventWithinListenerScope(event)) return;

        const path = event.composedPath() as T[];
        let targetIndex = -1;
        path.find((el) => {
            targetIndex = this.elements.indexOf(el);
            return targetIndex !== -1;
        });
        this.prevIndex = this.currentIndex;
        this.currentIndex = targetIndex > -1 ? targetIndex : this.currentIndex;

        if (this.isRelatedTargetOrContainAnElement(event)) {
            this.hostContainsFocus();
        }
    };

    /**
     * handleClick - Finds the element that was clicked and sets the tabindex to 0
     * @returns void
     */
    handleClick = (): void => {
        // Manually set the tabindex to 0 for the current element on receiving focus (from keyboard or mouse)
        const elements = this.elements;
        if (!elements.length) return;
        let focusElement = elements[this.currentIndex];
        if (this.currentIndex < 0) {
            return;
        }
        if (!focusElement || !this.isFocusableElement(focusElement)) {
            this.setCurrentIndexCircularly(1);
            focusElement = elements[this.currentIndex];
        }
        if (focusElement && this.isFocusableElement(focusElement)) {
            elements[this.prevIndex]?.setAttribute('tabindex', '-1');
            focusElement.setAttribute('tabindex', '0');
        }
    };

    handleFocusout = (event: FocusEvent): void => {
        if (this.isRelatedTargetOrContainAnElement(event)) {
            this.hostNoLongerContainsFocus();
        }
    };

    acceptsEventKey(key: string): boolean {
        if (key === 'End' || key === 'Home') {
            return true;
        }
        switch (this.direction) {
            case 'horizontal':
                return key === 'ArrowLeft' || key === 'ArrowRight';
            case 'vertical':
                return key === 'ArrowUp' || key === 'ArrowDown';
            case 'both':
            case 'grid':
                return key.startsWith('Arrow');
        }
    }

    handleKeydown = (event: KeyboardEvent): void => {
        if (!this.acceptsEventKey(event.key) || event.defaultPrevented) {
            return;
        }
        let diff = 0;
        this.prevIndex = this.currentIndex;
        switch (event.key) {
            case 'ArrowRight':
                diff += 1;
                break;
            case 'ArrowDown':
                diff += this.direction === 'grid' ? this.directionLength : 1;
                break;
            case 'ArrowLeft':
                diff -= 1;
                break;
            case 'ArrowUp':
                diff -= this.direction === 'grid' ? this.directionLength : 1;
                break;
            case 'End':
                this.currentIndex = 0;
                diff -= 1;
                break;
            case 'Home':
                this.currentIndex = this.elements.length - 1;
                diff += 1;
                break;
        }
        event.preventDefault();
        if (this.direction === 'grid' && this.currentIndex + diff < 0) {
            this.currentIndex = 0;
        } else if (
            this.direction === 'grid' &&
            this.currentIndex + diff > this.elements.length - 1
        ) {
            this.currentIndex = this.elements.length - 1;
        } else {
            this.setCurrentIndexCircularly(diff);
        }
        // To allow the `focusInIndex` to be calculated with the "after" state of the keyboard interaction
        // do `elementEnterAction` _before_ focusing the next element.
        this.elementEnterAction(this.elements[this.currentIndex]);
        this.focus();
    };

    manage(): void {
        this.addEventListeners();
    }

    unmanage(): void {
        this.removeEventListeners();
    }

    addEventListeners(): void {
        this.host.addEventListener('focusin', this.handleFocusin);
        this.host.addEventListener('click', this.handleClick);
    }

    removeEventListeners(): void {
        this.host.removeEventListener('focusin', this.handleFocusin);
        this.host.removeEventListener('focusout', this.handleFocusout);
        this.host.removeEventListener('keydown', this.handleKeydown);
        this.host.removeEventListener('click', this.handleClick);
    }

    hostConnected(): void {
        this.recentlyConnected = true;
        this.addEventListeners();
    }

    hostDisconnected(): void {
        this.mutationObserver.disconnect();
        this.removeEventListeners();
    }

    hostUpdated(): void {
        if (this.recentlyConnected) {
            this.recentlyConnected = false;
            this.elements.forEach((element) => {
                this.mutationObserver.observe(element, {
                    attributes: true,
                });
            });
        }
    }
}

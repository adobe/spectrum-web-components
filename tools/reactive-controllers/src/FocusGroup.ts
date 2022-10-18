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
import type { ReactiveController, ReactiveElement } from 'lit';

type DirectionTypes = 'horizontal' | 'vertical' | 'both' | 'grid';
export type FocusGroupConfig<T> = {
    focusInIndex?: (_elements: T[]) => number;
    direction?: DirectionTypes | (() => DirectionTypes);
    elementEnterAction?: (el: T) => void;
    elements: () => T[];
    isFocusableElement?: (el: T) => boolean;
    listenerScope?: HTMLElement | (() => HTMLElement);
};

export class FocusGroupController<T extends HTMLElement>
    implements ReactiveController
{
    protected cachedElements?: T[];

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

    get direction(): DirectionTypes {
        return this._direction();
    }

    _direction = (): DirectionTypes => 'both';

    public directionLength = 5;

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

    constructor(
        host: ReactiveElement,
        {
            direction,
            elementEnterAction,
            elements,
            focusInIndex,
            isFocusableElement,
            listenerScope,
        }: FocusGroupConfig<T> = { elements: () => [] }
    ) {
        this.host = host;
        this.host.addController(this);
        this._elements = elements;
        this.isFocusableElement = isFocusableElement || this.isFocusableElement;
        // @TODO: abstract a method to simplify the conditional wrapping of the values as functions.
        if (typeof direction === 'string') {
            this._direction = () => direction;
        } else if (typeof direction === 'function') {
            this._direction = direction;
        }
        this.elementEnterAction = elementEnterAction || this.elementEnterAction;
        if (typeof focusInIndex === 'number') {
            this._focusInIndex = () => focusInIndex;
        } else if (typeof focusInIndex === 'function') {
            this._focusInIndex = focusInIndex;
        }
        if (typeof listenerScope === 'object') {
            this._listenerScope = () => listenerScope;
        } else if (typeof listenerScope === 'function') {
            this._listenerScope = listenerScope as () => HTMLElement;
        }
    }

    update({ elements }: FocusGroupConfig<T> = { elements: () => [] }): void {
        this.unmanage();
        this._elements = elements;
        this.clearElementCache();
        this.manage();
    }

    focus(options?: FocusOptions): void {
        let focusElement = this.elements[this.currentIndex];
        if (!focusElement || !this.isFocusableElement(focusElement)) {
            this.setCurrentIndexCircularly(1);
            focusElement = this.elements[this.currentIndex];
        }
        if (focusElement && this.isFocusableElement(focusElement)) {
            focusElement.focus(options);
        }
    }

    clearElementCache(offset = 0): void {
        delete this.cachedElements;
        this.offset = offset;
    }

    setCurrentIndexCircularly(diff: number): void {
        const { length } = this.elements;
        let steps = length;
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
        this.currentIndex = this.focusInIndex;
        this.focused = false;
    }

    isRelatedTargetAnElement(event: FocusEvent): boolean {
        const relatedTarget = event.relatedTarget as null | Element;
        return !this.elements.includes(relatedTarget as T);
    }

    handleFocusin = (event: FocusEvent): void => {
        if (!this.isEventWithinListenerScope(event)) return;
        if (this.isRelatedTargetAnElement(event)) {
            this.hostContainsFocus();
        }
        const path = event.composedPath() as T[];
        let targetIndex = -1;
        path.find((el) => {
            targetIndex = this.elements.indexOf(el);
            return targetIndex !== -1;
        });
        this.currentIndex = targetIndex > -1 ? targetIndex : this.currentIndex;
    };

    handleFocusout = (event: FocusEvent): void => {
        if (this.isRelatedTargetAnElement(event)) {
            this.hostNoLongerContainsFocus();
        }
    };

    acceptsEventCode(code: string): boolean {
        if (code === 'End' || code === 'Home') {
            return true;
        }
        switch (this.direction) {
            case 'horizontal':
                return code === 'ArrowLeft' || code === 'ArrowRight';
            case 'vertical':
                return code === 'ArrowUp' || code === 'ArrowDown';
            case 'both':
            case 'grid':
                return code.startsWith('Arrow');
        }
    }

    handleKeydown = (event: KeyboardEvent): void => {
        if (!this.acceptsEventCode(event.code) || event.defaultPrevented) {
            return;
        }
        let diff = 0;
        switch (event.code) {
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
    }

    removeEventListeners(): void {
        this.host.removeEventListener('focusin', this.handleFocusin);
        this.host.removeEventListener('focusout', this.handleFocusout);
        this.host.removeEventListener('keydown', this.handleKeydown);
    }

    hostConnected(): void {
        this.addEventListeners();
    }

    hostDisconnected(): void {
        this.removeEventListeners();
    }
}

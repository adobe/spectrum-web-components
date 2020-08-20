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

export function waitForPredicate(
    predicateFn: () => boolean | undefined,
    timeout: number = 250
): Promise<boolean> {
    const initialTime = Date.now();
    return new Promise<boolean>((resolve, reject) => {
        function testPredicate() {
            if (predicateFn()) {
                resolve(true);
            } else if (Date.now() - initialTime < timeout) {
                requestAnimationFrame(testPredicate);
            } else {
                reject(false);
            }
        }
        testPredicate();
    });
}

export function isVisible(element: HTMLElement) {
    return !!element.offsetParent;
}

const keyboardEvent = (code: string, eventDetails = {}): KeyboardEvent => {
    return new KeyboardEvent('keydown', {
        ...eventDetails,
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
        key: code,
    });
};
export const shiftTabEvent = keyboardEvent('Tab', { shiftKey: true });
export const enterEvent = keyboardEvent('Enter');
export const escapeEvent = keyboardEvent('Escape');
export const arrowRightEvent = keyboardEvent('ArrowRight');
export const arrowLeftEvent = keyboardEvent('ArrowLeft');
export const arrowUpEvent = keyboardEvent('ArrowUp');
export const arrowDownEvent = keyboardEvent('ArrowDown');
export const deleteEvent = keyboardEvent('Delete');
export const spaceEvent = keyboardEvent('Space');
export const backspaceEvent = keyboardEvent('Backspace');
export const endEvent = keyboardEvent('End');
export const homeEvent = keyboardEvent('Home');
export const pageUpEvent = keyboardEvent('PageUp');
export const pageDownEvent = keyboardEvent('PageDown');
export const tabEvent = keyboardEvent('Tab');
export const tEvent = keyboardEvent('t');

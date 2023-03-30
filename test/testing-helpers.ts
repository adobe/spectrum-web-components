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

import {
    elementUpdated,
    expect,
    nextFrame,
    fixture as owcFixture,
} from '@open-wc/testing';
import { html } from '@spectrum-web-components/base';
import { spy, stub } from 'sinon';
import type { HookFunction } from 'mocha';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Theme } from '@spectrum-web-components/theme';
import { TemplateResult } from '@spectrum-web-components/base';

import { sendMouse } from './plugins/browser.js';

export async function testForLitDevWarnings(
    fixture: () => Promise<HTMLElement>
): Promise<void> {
    it('does not emit Lit Dev Mode warnings', async () => {
        const consoleWarnStub = stub(console, 'warn');
        const el = await fixture();

        await elementUpdated(el);

        expect(consoleWarnStub.called).to.be.false;
        consoleWarnStub.restore();
    });
}

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

const keyboardEvent = (
    code: string,
    eventDetails = {},
    eventName = 'keydown'
): KeyboardEvent => {
    return new KeyboardEvent(eventName, {
        ...eventDetails,
        bubbles: true,
        composed: true,
        cancelable: true,
        code,
        key: code,
    });
};
export const shiftTabEvent = (): KeyboardEvent =>
    keyboardEvent('Tab', { shiftKey: true });
export const shiftEvent = (): KeyboardEvent =>
    keyboardEvent('Shift', { shiftKey: true });
export const enterEvent = (): KeyboardEvent => keyboardEvent('Enter');
export const escapeEvent = (): KeyboardEvent => keyboardEvent('Escape');
export const arrowRightEvent = (): KeyboardEvent => keyboardEvent('ArrowRight');
export const arrowLeftEvent = (): KeyboardEvent => keyboardEvent('ArrowLeft');
export const arrowUpEvent = (): KeyboardEvent => keyboardEvent('ArrowUp');
export const arrowDownEvent = (): KeyboardEvent => keyboardEvent('ArrowDown');
export const deleteEvent = (): KeyboardEvent => keyboardEvent('Delete');
export const spaceEvent = (): KeyboardEvent => keyboardEvent('Space');
export const backspaceEvent = (): KeyboardEvent => keyboardEvent('Backspace');
export const endEvent = (): KeyboardEvent => keyboardEvent('End');
export const homeEvent = (): KeyboardEvent => keyboardEvent('Home');
export const pageUpEvent = (): KeyboardEvent => keyboardEvent('PageUp');
export const pageDownEvent = (): KeyboardEvent => keyboardEvent('PageDown');
export const tabEvent = (): KeyboardEvent => keyboardEvent('Tab');
export const tEvent = (): KeyboardEvent => keyboardEvent('t');

export const shiftKeyupEvent = (): KeyboardEvent =>
    keyboardEvent('Shift', { shiftKey: true }, 'keyup');
export const arrowRightKeyupEvent = (): KeyboardEvent =>
    keyboardEvent('ArrowRight', {}, 'keyup');
export const arrowLeftKeyupEvent = (): KeyboardEvent =>
    keyboardEvent('ArrowLeft', {}, 'keyup');
export const arrowUpKeyupEvent = (): KeyboardEvent =>
    keyboardEvent('ArrowUp', {}, 'keyup');
export const arrowDownKeyupEvent = (): KeyboardEvent =>
    keyboardEvent('ArrowDown', {}, 'keyup');

export function ignoreResizeObserverLoopError(
    before: HookFunction,
    after: HookFunction
) {
    let globalErrorHandler: undefined | OnErrorEventHandler = undefined;
    before(function () {
        // Save Mocha's handler.
        (
            Mocha as unknown as {
                process: { removeListener(name: string): void };
            }
        ).process.removeListener('uncaughtException');
        globalErrorHandler = window.onerror;
        addEventListener('error', (error) => {
            console.error('Uncaught global error:', error);
            if (error.message?.match?.(/ResizeObserver loop limit exceeded/)) {
                return;
            } else {
                globalErrorHandler?.(error);
            }
        });
    });
    after(function () {
        window.onerror = globalErrorHandler as OnErrorEventHandler;
    });
}

export async function isOnTopLayer(element: HTMLElement): Promise<boolean> {
    let resolve!: (isFound: boolean) => void;
    const found = new Promise<boolean>((res) => (resolve = res));
    const queryEvent = new Event('on-top-layer-event', {
        composed: true,
        bubbles: true,
    });
    element.addEventListener(queryEvent.type, (event: Event) => {
        const closestDialog = ([...event.composedPath()] as HTMLElement[]).find(
            (el) => {
                return el.localName === 'dialog';
            }
        );
        if (!closestDialog) {
            resolve(false);
            return;
        }
        let open = false;
        try {
            open = closestDialog.matches(':open');
        } catch (error) {}
        let modal = false;
        try {
            modal = closestDialog.matches(':modal');
        } catch (error) {}
        let polyfill = false;
        if (!open && !modal) {
            const style = getComputedStyle(closestDialog);
            polyfill =
                style.getPropertyValue('position') === 'fixed' &&
                style.getPropertyValue('pointer-events') !== 'none';
        }
        resolve(open || modal || polyfill);
    });
    element.dispatchEvent(queryEvent);
    return found;
}

export async function isInteractive(
    el: HTMLElement,
    position = 'center'
): Promise<boolean> {
    const clickSpy = spy();
    el.addEventListener(
        'click',
        () => {
            clickSpy();
        },
        { once: true }
    );
    await nextFrame();
    await nextFrame();
    const clientRect = el.getBoundingClientRect();
    const points: Record<string, [number, number]> = {
        center: [
            clientRect.left + clientRect.width / 2,
            clientRect.top + clientRect.height / 2,
        ],
        'top-left': [clientRect.left + 10, clientRect.top + 2],
    };
    await sendMouse({
        steps: [
            {
                type: 'click',
                position: points[position],
            },
        ],
    });
    return clickSpy.callCount === 1;
}

export async function fixture<T extends Element>(
    story: TemplateResult
): Promise<T> {
    const test = await owcFixture<Theme>(html`
        <sp-theme theme="spectrum" scale="medium" color="dark">
            ${story}
        </sp-theme>
    `);
    return test.children[0] as T;
}

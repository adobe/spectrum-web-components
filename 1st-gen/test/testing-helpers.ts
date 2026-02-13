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

import {
    elementUpdated,
    expect,
    nextFrame,
    fixture as owcFixture,
} from '@open-wc/testing';
import { html, render, TemplateResult } from '@spectrum-web-components/base';
import { Theme } from '@spectrum-web-components/theme';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import type { HookFunction } from 'mocha';
import { SinonStub, spy, stub } from 'sinon';

import { sendMouse } from './plugins/browser.js';
import { MouseOptions, PointerPosition } from './plugins/send-mouse-plugin.js';
import { sendKeys } from '@web/test-runner-commands';
import { isWebKit } from '@spectrum-web-components/shared';

/**
 * Send a mouse click to a specific DOMRect or HTMLElement
 * @param target - The DOMRect or HTMLElement to click on
 * @param type - The type of mouse event to send (move, down, up, click, wheel)
 * @param pointerPosition - The position of the pointer relative to the element (center, top-left, outside)
 * @param options - The options for the mouse event ({button: 'left' | 'right' | 'middle', delay: number in ms})
 * @returns The result of the mouse event
 */
export async function mouseClickOn(
    target: HTMLElement | DOMRect,
    pointerPosition: PointerPosition = 'center',
    options?: MouseOptions
): Promise<unknown> {
    return await sendMouse({
        type: 'click',
        position: [target, pointerPosition],
        options: options,
    });
}

/**
 * Send a mouse click away from a specific DOMRect or HTMLElement
 * @param target - The DOMRect or HTMLElement to click away from
 * @param options - The options for the mouse event ({button: 'left' | 'right' | 'middle', delay: number in ms})
 * @returns The result of the mouse event
 */
export async function mouseClickAway(
    target: HTMLElement | DOMRect,
    options?: MouseOptions
): Promise<unknown> {
    return await mouseClickOn(target, 'outside', options);
}

/**
 * Send a mouse move over a specific DOMRect or HTMLElement
 * @param target - The DOMRect or HTMLElement to move over
 * @param pointerPosition - The position of the pointer relative to the element (center, top-left, outside)
 * @param options - The options for the mouse event ({button: 'left' | 'right' | 'middle', delay: number in ms})
 * @returns The result of the mouse event
 */
export async function mouseMoveOver(
    target: HTMLElement | DOMRect,
    pointerPosition: PointerPosition = 'center',
    options?: MouseOptions
): Promise<unknown> {
    return await sendMouse({
        type: 'move',
        position: [target, pointerPosition],
        options: options,
    });
}

/**
 * Send a mouse move away from a specific DOMRect or HTMLElement
 * @param target - The DOMRect or HTMLElement to move away from
 * @param options - The options for the mouse event ({button: 'left' | 'right' | 'middle', delay: number in ms})
 * @returns The result of the mouse event
 */
export async function mouseMoveAway(
    target: HTMLElement | DOMRect,
    options?: MouseOptions
): Promise<unknown> {
    return await mouseMoveOver(target, 'outside', options);
}

/**
 * Send the correct tab key event based on the browser to the active element.
 * @returns The result of the tab key event
 */
export async function sendTabKey() {
    const tab = isWebKit() ? 'Alt+Tab' : 'Tab';
    return await sendKeys({ press: tab });
}

/**
 * Send the correct shift tab key event based on the browser to the active element.
 * @returns The result of the shift tab key event
 */
export async function sendShiftTabKey() {
    const shiftTab = isWebKit() ? 'Alt+Shift+Tab' : 'Shift+Tab';
    return await sendKeys({ press: shiftTab });
}

export async function testForLitDevWarnings(
    fixture: () => Promise<HTMLElement>
): Promise<void> {
    describe('lit dev mode', () => {
        let consoleWarnStub!: SinonStub;
        before(() => {
            consoleWarnStub = stub(console, 'warn');
        });
        afterEach(() => {
            consoleWarnStub.resetHistory();
        });
        after(() => {
            consoleWarnStub.restore();
        });
        it('does not emit warnings', async () => {
            const el = await fixture();

            await elementUpdated(el);

            expect(
                consoleWarnStub.called,
                consoleWarnStub.getCall(0)?.args.join(', ')
            ).to.be.false;
        });
    });
}

export async function testForMemoryLeaks(
    element: TemplateResult
): Promise<void> {
    describe('Memory usage', () => {
        it('releases references on disconnect', async function () {
            if (
                !window.gc ||
                !('measureUserAgentSpecificMemory' in performance)
            ) {
                this.skip();
            }

            this.timeout(10000);

            const iterations = 50;
            let active = false;

            // Call fixture with 'htmlString' as the additional argument
            const el = await fixture<HTMLElement>(html`
                <div></div>
            `);

            async function toggle(
                forced: boolean | undefined = undefined
            ): Promise<void> {
                active = forced != null ? forced : !active;
                render(active ? element : html``, el);
                await nextFrame();
                await nextFrame();
            }

            // "shake things out" to get a good first reading
            for (let i = 0; i < 5; i++) {
                await toggle();
            }
            await toggle(false);
            const beforeMB = await usedHeapMB();

            for (let i = 0; i < iterations; i++) {
                await toggle();
            }
            await toggle(false);
            const afterMB = await usedHeapMB();

            expect(
                afterMB.dom - beforeMB.dom,
                `DOM | before: ${beforeMB.dom}, after: ${afterMB.dom}`
            ).to.be.lte(0);
            expect(
                afterMB.js - beforeMB.js,
                `JS | before: ${beforeMB.js}, after: ${afterMB.js}`
            ).to.be.lte(0);
        });
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

// @TODO - SWC-1013 - resolve the uncaught global error in tests
export function ignoreResizeObserverLoopError(
    before: HookFunction,
    after: HookFunction
) {
    // Store reference to the original global error handler
    let globalErrorHandler: undefined | OnErrorEventHandler = undefined;
    // Store reference to our custom error listener for cleanup
    let errorListener: (error: ErrorEvent) => void;

    // Setup function - called before tests run
    before(function () {
        // Remove Mocha's default uncaught exception handler to prevent interference
        // with our custom error handling logic
        try {
            (
                Mocha as unknown as {
                    process: { removeListener: (event: string) => void };
                }
            )?.process?.removeListener?.('uncaughtException');
        } catch (error) {
            console.warn(
                'Failed to remove Mocha uncaught exception handler:',
                error
            );
        }

        // Save the current window.onerror handler so we can restore it later
        globalErrorHandler = window.onerror;

        // Create custom error handler that filters out ResizeObserver loop errors
        errorListener = (error: ErrorEvent) => {
            // Check if this is a ResizeObserver loop error (common in tests)
            // Using more comprehensive pattern matching for ResizeObserver errors
            const isResizeObserverError = error.message?.match?.(
                /ResizeObserver.*loop|loop.*ResizeObserver/i
            );
            if (isResizeObserverError) {
                console.warn(
                    'Uncaught global error in ignoreResizeObserverLoopError:',
                    error.message
                );
                // Silently ignore ResizeObserver loop errors - they're benign in tests
                return;
            } else {
                console.warn(
                    'There is a non-resize observer loop error',
                    error.message
                );
                // For all other errors, delegate to the original error handler
                globalErrorHandler?.(error);
            }
        };

        // Install custom error handler
        addEventListener('error', errorListener);
    });

    // Cleanup function - called after tests complete
    after(function () {
        // Remove our custom error listener to prevent memory leaks
        removeEventListener('error', errorListener);
        // Restore the original global error handler
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
    element.addEventListener(
        queryEvent.type,
        (event: Event) => {
            const closestDialog = (
                [...event.composedPath()] as HTMLElement[]
            ).find((el) => {
                return (
                    el.classList?.contains('dialog') &&
                    el.part?.contains('dialog')
                );
            });
            if (!closestDialog) {
                resolve(false);
                return;
            }
            let popoverOpen = false;
            try {
                popoverOpen = closestDialog.matches(':popover-open');
            } catch (error) {
                // do nothing
            }
            let open = false;
            try {
                open = closestDialog.matches(':open');
            } catch (error) {
                // do nothing
            }
            let modal = false;
            try {
                modal = closestDialog.matches(':modal');
            } catch (error) {
                // do nothing
            }
            let polyfill = false;
            if (!popoverOpen && !open && !modal) {
                const style = getComputedStyle(closestDialog);
                polyfill =
                    style.getPropertyValue('--sp-overlay-open') === 'true' &&
                    style.getPropertyValue('position') === 'fixed';
            }
            resolve(popoverOpen || open || modal || polyfill);
        },
        { once: true }
    );
    element.dispatchEvent(queryEvent);
    return found;
}

export async function isInteractive(
    el: HTMLElement,
    pointerPosition: PointerPosition = 'center'
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
    await mouseClickOn(el, pointerPosition);
    return clickSpy.callCount === 1;
}

export async function fixture<T extends Element>(
    story: TemplateResult,
    dir: CSSStyleDeclaration['direction'] = 'ltr'
): Promise<T> {
    const test = await owcFixture<Theme>(html`
        <sp-theme system="spectrum" scale="medium" color="light">
            ${story}
            <style>
                sp-theme {
                    --spectrum-animation-duration-0: 50ms;
                    --spectrum-animation-duration-100: 50ms;
                    --spectrum-animation-duration-200: 50ms;
                    --spectrum-animation-duration-300: 50ms;
                    --spectrum-animation-duration-400: 50ms;
                    --spectrum-animation-duration-500: 50ms;
                    --spectrum-animation-duration-600: 50ms;
                    --spectrum-animation-duration-700: 50ms;
                    --spectrum-animation-duration-800: 50ms;
                    --spectrum-animation-duration-900: 50ms;
                    --spectrum-animation-duration-1000: 50ms;
                    --spectrum-animation-duration-2000: 50ms;
                    --spectrum-animation-duration-4000: 50ms;
                    --spectrum-coachmark-animation-indicator-ring-duration: 50ms;
                    --swc-test-duration: 1ms;
                }
            </style>
        </sp-theme>
    `);
    document.documentElement.dir = dir;
    return test.children[0] as T;
}

export async function usedHeapMB(): Promise<
    Record<'dom' | 'js' | 'shared' | 'total', number>
> {
    // @ts-expect-error - expect typescript error
    const memorySample = performance.measureUserAgentSpecificMemory();
    const result = (await memorySample) as {
        bytes: number;
        breakdown: {
            attribution: string;
            bytes: number;
            types: ('DOM' | 'JS' | 'Shared')[];
        }[];
    };
    return {
        total: result.bytes,
        js:
            result.breakdown.find((entry) => entry.types.includes('JS'))
                ?.bytes || 0,
        dom:
            result.breakdown.find((entry) => entry.types.includes('DOM'))
                ?.bytes || 0,
        shared:
            result.breakdown.find((entry) => entry.types.includes('Shared'))
                ?.bytes || 0,
    };
}

export function detectOS(): string | null {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (macosPlatforms.indexOf(platform) !== -1) {
        return 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        return 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        return 'Windows';
    } else if (/Android/.test(userAgent)) {
        return 'Android';
    } else if (/Linux/.test(platform)) {
        return 'Linux';
    }

    return null;
}

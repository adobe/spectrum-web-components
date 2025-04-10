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
import { html, render } from '@spectrum-web-components/base';
import { SinonStub, spy, stub } from 'sinon';
import type { HookFunction } from 'mocha';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import { Theme } from '@spectrum-web-components/theme';
import { TemplateResult } from '@spectrum-web-components/base';

import { sendMouse } from './plugins/browser.js';

/**
 * send mouse to the middle of a specific DOM rect or HTMLElement
 */
export async function sendMouseTo(
    elementOrRect: HTMLElement | DOMRect,
    type: 'click' | 'move' | 'down' | 'up' | 'wheel' = 'move',
    button?: 'left' | 'right' | 'middle'
): Promise<unknown> {
    const rect =
        elementOrRect instanceof HTMLElement
            ? elementOrRect.getBoundingClientRect()
            : elementOrRect;
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const options = button ? { button: button } : {};

    return await sendMouse({
        steps: [
            {
                options: options,
                position: [x, y],
                type: type,
            },
        ],
    });
}

/**
 * send mouse outside of a particular DOMRect or HTMLElement
 */
export async function sendMouseFrom(
    elementOrRect: HTMLElement | DOMRect,
    type: 'click' | 'move' | 'down' | 'up' | 'wheel' = 'move',
    button?: 'left' | 'right' | 'middle'
): Promise<unknown> {
    const rect =
        elementOrRect instanceof HTMLElement
            ? elementOrRect.getBoundingClientRect()
            : elementOrRect;
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height * 2;
    const options = button ? { button: button } : {};

    return await sendMouse({
        steps: [
            {
                options: options,
                position: [x, y],
                type: type,
            },
        ],
    });
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
            if (error.message?.match?.(/ResizeObserver loop/)) {
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
    story: TemplateResult,
    dir: 'ltr' | 'rtl' | 'auto' = 'ltr'
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

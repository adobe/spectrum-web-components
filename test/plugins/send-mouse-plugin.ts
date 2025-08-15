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
import type { Page } from 'playwright';

/**
 * The type of mouse event to send
 */
export type MouseType = 'move' | 'down' | 'up' | 'click' | 'wheel';

/**
 * The options for the mouse event
 */
export type MouseOptions = {
    button?: 'left' | 'right' | 'middle';
    delay?: number;
};

/**
 * The element or rect to get the position from
 */
export type PointerTarget = HTMLElement | DOMRect;

/**
 * The position of the pointer relative to the element or rect
 * @default center
 */
export type PointerPosition = 'center' | 'top-left' | 'top-right' | 'outside';

export type PointerTargetAndPosition = [
    target: PointerTarget,
    position?: PointerPosition,
];

export type Step = {
    type: MouseType;
    position?: [number, number] | PointerTargetAndPosition;
    options?: MouseOptions;
};

/**
 * Convert a DOMRect and position to coordinates
 */
function getPositionFromRect(
    rect: DOMRect,
    position: PointerPosition = 'center'
): [number, number] {
    const points: Record<PointerPosition, [number, number]> = {
        center: [
            Math.round(rect.left + rect.width / 2),
            Math.round(rect.top + rect.height / 2),
        ],
        'top-left': [Math.round(rect.left + 10), Math.round(rect.top + 2)],
        'top-right': [Math.round(rect.right - 10), Math.round(rect.top + 2)],
        outside: [
            Math.round(rect.left + rect.width / 2),
            Math.round(rect.top + rect.height * 2),
        ],
    };
    return points[position];
}

async function executeStep(step: Step, page: Page) {
    step.options = step.options || {};
    // adding a delay to make sure the consecutive mouse events are not too fast
    // picker open/close tests were failing without this
    step.options.delay = step.options.delay || 1;

    // if no PointerPosition is provided, default to center
    if (
        step.position &&
        step.position.length === 1 &&
        typeof step.position[0] === 'object'
    ) {
        step.position.push('center');
    }

    if (step.position && step.position.length === 2) {
        if (
            typeof step.position[0] === 'number' &&
            typeof step.position[1] === 'number'
        ) {
            await page.mouse[step.type](
                Math.round(step.position[0]),
                Math.round(step.position[1]),
                step.options
            );
        } else if (
            typeof step.position[0] === 'object' &&
            typeof step.position[1] === 'string'
        ) {
            // Now step.position[0] should be a DOMRect (serialized from browser)
            const [x, y] = getPositionFromRect(
                step.position[0] as DOMRect,
                step.position[1] as PointerPosition
            );
            await page.mouse[step.type](x, y, step.options);
        }
    } else {
        await page.mouse[step.type as 'down' | 'up'](step.options);
    }
}

export function sendMousePlugin() {
    return {
        name: 'send-pointer-command',
        async executeCommand({
            command,
            session,
            payload,
        }: {
            payload: Step[] | Step;
            command: string;
            session: {
                id: string;
                browser: { type: string; getPage: (id: string) => Page };
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }): Promise<any> {
            if (command === 'send-pointer') {
                // handle specific behavior for playwright
                if (session.browser.type === 'playwright') {
                    const page = session.browser.getPage(session.id);
                    if (Array.isArray(payload) && payload) {
                        for (const step of payload) {
                            await executeStep(step, page);
                        }
                    } else {
                        await executeStep(payload, page);
                    }
                    return true;
                }
                // you might not be able to support all browser launchers
                throw new Error(
                    `Sending mouse commands is not supported for browser type ${session.browser.type}.`
                );
            }
        },
    };
}

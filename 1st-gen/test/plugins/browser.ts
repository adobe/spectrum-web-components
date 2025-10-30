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

import { executeServerCommand, resetMouse } from '@web/test-runner-commands';
import type { Step } from './send-mouse-plugin.js';

export type SendMouseOptions = {
    steps: Step[];
};

/**
 * If available, add cleanup work to the `afterEach` and `after` commands.
 */
function queueMouseCleanUp() {
    if (mouseCleanupQueued) {
        return;
    }
    /**
     * This registers the fixture cleanup as a side effect
     */
    try {
        // We should not assume that our users load mocha types globally
        if ('afterEach' in window && 'after' in window) {
            mouseCleanupQueued = true;
            afterEach(async function () {
                await resetMouse();
            });
            after(() => {
                mouseCleanupQueued = false;
            });
        }
    } catch (error) {
        /* do nothing */
    }
}

let mouseCleanupQueued = false;

/**
 * Call to the browser with instructions for interacting with the pointing
 * device while queueing cleanup of those commands after the test is run.
 */
export async function sendMouse(options: Step[] | Step | SendMouseOptions) {
    queueMouseCleanUp();
    let steps: Step[];
    if (typeof options === 'object' && 'steps' in options) {
        steps = options.steps;
    } else {
        steps = Array.isArray(options) ? options : [options];
    }
    // Process steps to convert HTMLElements to DOMRects on the browser side
    const processedSteps = steps.map((step) => {
        if (
            step.position &&
            Array.isArray(step.position) &&
            step.position.length >= 1
        ) {
            const [target, position] = step.position;

            // If the target is an HTMLElement, convert it to a DOMRect
            if (target instanceof HTMLElement) {
                return {
                    ...step,
                    position: [
                        target.getBoundingClientRect(),
                        position || 'center',
                    ],
                };
            }
        }
        return step;
    });

    return await executeServerCommand('send-pointer', processedSteps);
}

/**
 * Call to the browser with instructions for interacting with the pointing
 * device while queueing cleanup of those commands after the test is run.
 */
export function grantPermissions(options: string[]) {
    return executeServerCommand('grant-permissions', options);
}

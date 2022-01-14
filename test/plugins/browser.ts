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

import { executeServerCommand } from '@web/test-runner-commands';
import type { Step } from './send-mouse-plugin.js';

/**
 * Return the mouse to the `up` position.
 */
async function mouseCleanup() {
    await executeServerCommand('send-mouse', {
        steps: [
            {
                type: 'up',
            },
        ],
    });
}

/**
 * If available, add cleanup work to the `afterEach` and `after` commands.
 */
function queueMouseCleanUp() {
    if (mouseCleanupQueued) return;
    /**
     * This registers the fixture cleanup as a side effect
     */
    try {
        // we should not assume that our users load mocha types globally
        // @ts-ignore
        if ('afterEach' in window && 'after' in window) {
            mouseCleanupQueued = true;
            // @ts-ignore
            afterEach(async function () {
                // @ts-ignore
                await mouseCleanup();
            });
            // @ts-ignore
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
export function sendMouse(options: { steps: Step[] }) {
    queueMouseCleanUp();
    return executeServerCommand('send-mouse', options);
}

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

import { oneEvent, waitUntil } from '@open-wc/testing';
import { Overlay } from '../src/Overlay';

// make sure overlay state is about to change, and wait until overlay state changes to 'opened'
export const overlayOpened = async (
    overlay: Overlay,
    timeout: number = 100,
    messagePrefix?: string
): Promise<unknown> => {
    if (overlay?.state === 'opened') {
        return Promise.resolve();
    }

    return await Promise.race([
        waitUntil(
            () => overlay?.state === 'opened',
            `${messagePrefix ? `${messagePrefix}: ` : ''}open timeout (still ${overlay?.state})`,
            { timeout: timeout }
        ),
        oneEvent(overlay, 'sp-opened'),
    ]);
};

export const overlayClosed = async (
    overlay: Overlay,
    timeout: number = 100,
    messagePrefix?: string
): Promise<unknown> => {
    if (overlay?.state === 'closed') {
        return Promise.resolve();
    }

    return await Promise.race([
        waitUntil(
            () => overlay?.state === 'closed',
            `${messagePrefix ? `${messagePrefix}: ` : ''}closed timeout (still ${overlay?.state})`,
            { timeout: timeout }
        ),
        oneEvent(overlay, 'sp-closed'),
    ]);
};

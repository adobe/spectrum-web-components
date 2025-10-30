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

import { randomID } from '@spectrum-web-components/shared/src/random-id.js';
import { expect } from '@open-wc/testing';

describe('randomID()', () => {
    it('creates unique strings of 8 hex characters', () => {
        const n = 1000;
        const ids = Array.from({ length: n }, randomID);
        const shape = ids.filter((id) => {
            return (
                typeof id === 'string' &&
                id.length === 8 &&
                id.split('').every((char) => '0123456789abcdef'.includes(char))
            );
        });
        const unique = new Set(ids);

        expect(shape).to.have.length(n);
        expect(unique).to.have.length(n);
    });
    it('generates 100k IDs in less than a second', () => {
        const n = 100000;
        const sec = 1000;
        const start = performance.now();
        const ids = Array.from({ length: n }, randomID);
        const time = performance.now() - start;

        expect(ids).to.have.length(n);
        expect(time).to.be.lessThan(sec);
    });
});

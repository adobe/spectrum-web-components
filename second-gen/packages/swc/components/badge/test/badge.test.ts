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

import { beforeEach, describe, expect, test } from 'vitest';

describe('Badge Component (Simple DOM Test)', () => {
    beforeEach(() => {
        // Clean up the DOM before each test
        document.body.innerHTML = '';
    });

    test('should manipulate DOM with hardcoded fixtures', () => {
        // Create a simple fixture
        document.body.innerHTML = `
            <div id="badge-container">
                <span class="badge" data-variant="informative" data-size="m">
                    Badge
                </span>
            </div>
        `;

        const container = document.querySelector('#badge-container');
        const badge = document.querySelector('.badge');

        // Verify the elements exist
        expect(container).toBeTruthy();
        expect(badge).toBeTruthy();
        expect(badge?.textContent?.trim()).toBe('Badge');

        // Verify attributes
        expect(badge?.getAttribute('data-variant')).toBe('informative');
        expect(badge?.getAttribute('data-size')).toBe('m');

        // Test DOM manipulation
        badge?.setAttribute('data-variant', 'positive');
        expect(badge?.getAttribute('data-variant')).toBe('positive');
    });

    test('should handle multiple elements', () => {
        document.body.innerHTML = `
            <div id="badges">
                <span class="badge" data-variant="positive">Positive</span>
                <span class="badge" data-variant="negative">Negative</span>
                <span class="badge" data-variant="informative">Info</span>
            </div>
        `;

        const badges = document.querySelectorAll('.badge');

        expect(badges).toHaveLength(3);
        expect(badges[0]?.getAttribute('data-variant')).toBe('positive');
        expect(badges[1]?.getAttribute('data-variant')).toBe('negative');
        expect(badges[2]?.getAttribute('data-variant')).toBe('informative');

        // Test that we can modify all of them
        badges.forEach((badge, index) => {
            badge.setAttribute('data-test-id', `badge-${index}`);
        });

        expect(badges[0]?.getAttribute('data-test-id')).toBe('badge-0');
        expect(badges[1]?.getAttribute('data-test-id')).toBe('badge-1');
        expect(badges[2]?.getAttribute('data-test-id')).toBe('badge-2');
    });

    test('should demonstrate browser APIs work', () => {
        document.body.innerHTML = `<button id="test-btn">Click me</button>`;

        const button = document.querySelector('#test-btn') as HTMLButtonElement;
        let clicked = false;

        button?.addEventListener('click', () => {
            clicked = true;
        });

        // Simulate click
        button?.click();

        expect(clicked).toBe(true);
    });
});

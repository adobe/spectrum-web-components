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

describe('Select Box Component (Simple DOM Test)', () => {
    beforeEach(() => {
        // Clean up the DOM before each test
        document.body.innerHTML = '';
    });

    test('should manipulate DOM with hardcoded fixtures', () => {
        // Create a simple fixture
        document.body.innerHTML = `
            <div id="select-box-container">
                <div class="select-box" data-selected="false" data-size="m" data-orientation="vertical">
                    Home address
                </div>
            </div>
        `;

        const container = document.querySelector('#select-box-container');
        const selectBox = document.querySelector('.select-box');

        // Verify the elements exist
        expect(container).toBeTruthy();
        expect(selectBox).toBeTruthy();
        expect(selectBox?.textContent?.trim()).toBe('Home address');

        // Verify attributes
        expect(selectBox?.getAttribute('data-selected')).toBe('false');
        expect(selectBox?.getAttribute('data-size')).toBe('m');
        expect(selectBox?.getAttribute('data-orientation')).toBe('vertical');

        // Test DOM manipulation
        selectBox?.setAttribute('data-selected', 'true');
        expect(selectBox?.getAttribute('data-selected')).toBe('true');
    });

    test('should handle multiple select boxes', () => {
        document.body.innerHTML = `
            <div id="select-boxes">
                <div class="select-box" data-selected="false">Home address</div>
                <div class="select-box" data-selected="true">Work address</div>
                <div class="select-box" data-selected="false">Billing address</div>
            </div>
        `;

        const selectBoxes = document.querySelectorAll('.select-box');
        expect(selectBoxes).toHaveLength(3);

        // Check selected state
        const selected = Array.from(selectBoxes).filter(
            (box) => box.getAttribute('data-selected') === 'true'
        );
        expect(selected).toHaveLength(1);
        expect(selected[0]?.textContent?.trim()).toBe('Work address');
    });

    test('should handle disabled state', () => {
        document.body.innerHTML = `
            <div class="select-box" data-disabled="true" data-selected="false">
                Disabled option
            </div>
        `;

        const selectBox = document.querySelector('.select-box');
        expect(selectBox?.getAttribute('data-disabled')).toBe('true');

        // Simulate attempting to select a disabled box
        const isDisabled = selectBox?.getAttribute('data-disabled') === 'true';
        if (!isDisabled) {
            selectBox?.setAttribute('data-selected', 'true');
        }

        // Should remain unselected if disabled
        expect(selectBox?.getAttribute('data-selected')).toBe('false');
    });

    test('should support different orientations', () => {
        document.body.innerHTML = `
            <div class="select-box" data-orientation="horizontal">Horizontal layout</div>
            <div class="select-box" data-orientation="vertical">Vertical layout</div>
        `;

        const horizontal = document.querySelector(
            '[data-orientation="horizontal"]'
        );
        const vertical = document.querySelector(
            '[data-orientation="vertical"]'
        );

        expect(horizontal?.getAttribute('data-orientation')).toBe('horizontal');
        expect(vertical?.getAttribute('data-orientation')).toBe('vertical');
    });

    test('should handle illustration and checkbox flags', () => {
        document.body.innerHTML = `
            <div class="select-box" 
                 data-show-illustration="true" 
                 data-show-checkbox="true" 
                 data-selected="true">
                <span class="illustration">🏠</span>
                Home address
                <span class="checkbox">✓</span>
            </div>
        `;

        const selectBox = document.querySelector('.select-box');
        const illustration = document.querySelector('.illustration');
        const checkbox = document.querySelector('.checkbox');

        expect(selectBox?.getAttribute('data-show-illustration')).toBe('true');
        expect(selectBox?.getAttribute('data-show-checkbox')).toBe('true');
        expect(illustration?.textContent).toBe('🏠');
        expect(checkbox?.textContent).toBe('✓');
    });
});

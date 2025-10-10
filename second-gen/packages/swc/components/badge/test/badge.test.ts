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

import '@swc/components/badge';

describe('swc-badge', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    describe('defaults', () => {
        test('should have correct default values', async () => {
            await customElements.whenDefined('swc-badge');
            const badge = document.createElement('swc-badge');

            // Add some content to make the component visible
            badge.textContent = 'Test Badge';

            document.body.appendChild(badge);
            await badge.updateComplete;

            // Ensure the component is fully rendered
            expect(badge.shadowRoot).toBeTruthy();
            expect(
                badge.shadowRoot?.querySelector('.spectrum-Badge')
            ).toBeTruthy();

            // Test default properties
            expect(badge.variant).toBe('informative');
            expect(badge.subtle).toBe(false);
            expect(badge.outline).toBe(false);
            expect(badge.fixed).toBeUndefined();
        });
    });
});

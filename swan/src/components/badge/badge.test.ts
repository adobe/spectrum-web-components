/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { describe, it, expect } from 'vitest';
import { BADGE_VARIANTS, FIXED_VALUES } from './badge.component.js';

describe('SwanBadge - Unit Tests', () => {
    it('should export all badge variants', () => {
        expect(BADGE_VARIANTS).toContain('informative');
        expect(BADGE_VARIANTS).toContain('positive');
        expect(BADGE_VARIANTS).toContain('negative');
        expect(BADGE_VARIANTS).toContain('accent');
        expect(BADGE_VARIANTS).toContain('neutral');
        expect(BADGE_VARIANTS).toContain('notice');
        expect(BADGE_VARIANTS).toHaveLength(20);
    });

    it('should include all color variants', () => {
        const colorVariants = [
            'fuchsia',
            'indigo',
            'magenta',
            'purple',
            'seafoam',
            'yellow',
            'gray',
            'red',
            'orange',
            'chartreuse',
            'celery',
            'green',
            'cyan',
            'blue',
        ];

        colorVariants.forEach((variant) => {
            expect(BADGE_VARIANTS).toContain(variant);
        });
    });

    it('should export all fixed position values', () => {
        expect(FIXED_VALUES).toContain('inline-start');
        expect(FIXED_VALUES).toContain('inline-end');
        expect(FIXED_VALUES).toContain('block-start');
        expect(FIXED_VALUES).toContain('block-end');
        expect(FIXED_VALUES).toHaveLength(4);
    });

    it('should have consistent variant types', () => {
        expect(typeof BADGE_VARIANTS[0]).toBe('string');
        expect(typeof FIXED_VALUES[0]).toBe('string');
    });
});

/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { html } from 'lit';
import { describe, expect, it } from 'vitest';

import type { Button } from '@adobe/swc/button';

import '@adobe/swc/button';

import { fixture } from '../../../utils/test-utils.js';

describe('Button', () => {
    it('should render a button element', async () => {
        const element = await fixture<Button>(html`
            <swc-button>Click me</swc-button>
        `);

        expect(element).toBeDefined();
        expect(element.tagName.toLowerCase()).toBe('swc-button');
    });

    it('should have default variant of accent', async () => {
        const element = await fixture<Button>(html`
            <swc-button>Click me</swc-button>
        `);

        expect(element.variant).toBe('accent');
    });

    it('should have default treatment of fill', async () => {
        const element = await fixture<Button>(html`
            <swc-button>Click me</swc-button>
        `);

        expect(element.treatment).toBe('fill');
    });

    // @todo Add comprehensive tests for variants, treatments, states, etc.
});

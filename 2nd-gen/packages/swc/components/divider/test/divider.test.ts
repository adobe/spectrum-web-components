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
import { expect } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { Divider } from '@adobe/swc/divider';

import '@adobe/swc/divider';

import meta from '../stories/divider.stories.js';
import {
    Overview,
    StaticColors,
    Vertical,
} from '../stories/divider.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...meta,
    title: 'Divider/Tests',
    parameters: {
        ...meta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs', 'dev'],
} as Meta;

const getDivider = (canvasElement: HTMLElement): Divider => {
    return canvasElement.querySelector('swc-divider') as Divider;
};

// Test: overview renders a separator with expected public attributes.
export const OverviewTest: Story = {
    ...Overview,
    play: async ({ canvasElement }) => {
        const divider = getDivider(canvasElement);
        await divider.updateComplete;
        expect(divider.getAttribute('role')).toBe('separator');
        expect(divider.getAttribute('size')).toBe('m');
    },
};

// Test: vertical dividers reflect orientation attributes.
export const VerticalTest: Story = {
    ...Vertical,
    play: async ({ canvasElement }) => {
        const dividers = Array.from(
            canvasElement.querySelectorAll('swc-divider')
        ) as Divider[];
        await Promise.all(dividers.map((divider) => divider.updateComplete));

        dividers.forEach((divider) => {
            expect(divider.hasAttribute('vertical')).toBe(true);
            expect(divider.getAttribute('aria-orientation')).toBe('vertical');
        });
    },
};

// Test: static colors reflect to expected public attribute values.
export const StaticColorsTest: Story = {
    ...StaticColors,
    play: async ({ canvasElement }) => {
        const dividers = Array.from(
            canvasElement.querySelectorAll('swc-divider[static-color]')
        ) as Divider[];
        await Promise.all(dividers.map((divider) => divider.updateComplete));

        dividers.forEach((divider) => {
            const staticColor = divider.getAttribute('static-color');
            expect(staticColor).toBeTruthy();
            expect(['white', 'black']).toContain(staticColor);
        });
    },
};

// Test: static-color can be removed and clears attributes.
export const StaticColorToggleTest: Story = {
    render: () => html` <swc-divider static-color="black"></swc-divider> `,
    play: async ({ canvasElement }) => {
        const divider = getDivider(canvasElement);
        await divider.updateComplete;
        expect(divider.getAttribute('static-color')).toBe('black');

        divider.removeAttribute('static-color');
        divider.requestUpdate();
        await divider.updateComplete;
        expect(divider.getAttribute('static-color')).toBeNull();
        expect(divider.hasAttribute('static-color')).toBe(false);
    },
};

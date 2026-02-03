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
import type {
    Meta,
    StoryContext,
    StoryObj as Story,
} from '@storybook/web-components';

import { StatusLight } from '@adobe/swc/status-light';

import '@adobe/swc/status-light';

import { setupSwcWarningSpy } from '../../../utils/test-utils.js';
import { meta } from '../stories/status-light.stories.js';
import {
    Overview,
    Playground,
    Sizes,
} from '../stories/status-light.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...meta,
    title: 'Status light/Tests',
    parameters: {
        ...meta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs', 'dev'],
} as Meta;

// Reuse the same element lookup for all play functions.
const getStatusLight = (canvasElement: HTMLElement): StatusLight => {
    return canvasElement.querySelector('swc-status-light') as StatusLight;
};
// Test: default properties and slot content.
export const DefaultTest: Story = {
    ...Overview,
    play: async ({ canvasElement }) => {
        const statusLight = getStatusLight(canvasElement);
        expect(statusLight.variant).toBe('info');
        expect(statusLight.size).toBe('m');
        expect(statusLight.textContent?.trim()).toBeTruthy();
    },
};

// Test: each size renders and reflects correctly.
export const SizesTest: Story = {
    ...Sizes,
    play: async ({ canvasElement }) => {
        StatusLight.VALID_SIZES.forEach((size) => {
            // Get the current status light from the canvas element.
            const statusLight = canvasElement.querySelector(
                `swc-status-light[size="${size}"]`
            ) as StatusLight;
            expect(statusLight.variant).toBe('info');
            expect(statusLight.size).toBe(size);
        });
    },
};

// Test: composed content still renders the status light.
export const ComposedComponentTest: Story = {
    render: (args) => {
        const storyArgs = {
            ...Playground.args,
            ...args,
            size: 'm',
            variant: 'positive',
            'default-slot': 'Positive',
        };

        return html`
            <div style="display: flex; gap: 10px;">
                ${meta.render?.(storyArgs, {} as StoryContext)}
                <p>This is a test of the composed component</p>
            </div>
        `;
    },
    play: async ({ canvasElement }) => {
        const statusLight = getStatusLight(canvasElement);
        expect(statusLight.variant).toBe('positive');
        expect(statusLight.size).toBe('m');
        expect(statusLight.textContent?.trim()).toBeTruthy();
    },
};

// Test: unsupported variants warn in debug mode.
export const UnsupportedVariantWarningTest: Story = {
    render: () => html`
        <swc-status-light variant="info">Active</swc-status-light>
    `,
    play: async ({ canvasElement }) => {
        const { warnCalls, restore } = setupSwcWarningSpy();
        try {
            const statusLight = getStatusLight(canvasElement);
            statusLight.setAttribute('variant', 'accent');
            await statusLight.updateComplete;

            expect(warnCalls.length).toBeGreaterThan(0);
            expect(warnCalls[0][0]).toBe(statusLight);
            expect(warnCalls[0][1]).toBe(
                `<${statusLight.localName}> element expects the "variant" attribute to be one of the following:`
            );
        } finally {
            restore();
        }
    },
};

// Test: disabled attribute warns in debug mode.
export const DisabledAttributeWarningTest: Story = {
    render: () => html`
        <swc-status-light variant="positive">Positive</swc-status-light>
    `,
    play: async ({ canvasElement }) => {
        const { warnCalls, restore } = setupSwcWarningSpy();
        try {
            const statusLight = getStatusLight(canvasElement);
            statusLight.setAttribute('disabled', '');
            statusLight.requestUpdate();
            await statusLight.updateComplete;

            expect(warnCalls.length).toBeGreaterThan(0);
            expect(warnCalls[0][0]).toBe(statusLight);
            expect(warnCalls[0][1]).toContain(
                'does not support the disabled state'
            );
        } finally {
            restore();
        }
    },
};

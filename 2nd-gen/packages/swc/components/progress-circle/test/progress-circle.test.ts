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

import { ProgressCircle } from '@adobe/swc/progress-circle';

import '@adobe/swc/progress-circle';

import { setupSwcWarningSpy } from '../../../utils/test-utils.js';
import meta from '../stories/progress-circle.stories.js';
import {
    Indeterminate,
    Overview,
    ProgressValues,
    Sizes,
    StaticColors,
} from '../stories/progress-circle.stories.js';

// This file defines dev-only test stories that reuse the main story metadata.
export default {
    ...meta,
    title: 'Progress circle/Tests',
    parameters: {
        ...meta.parameters,
        docs: { disable: true, page: null },
    },
    tags: ['!autodocs', 'dev'],
} as Meta;

const getProgressCircle = (canvasElement: HTMLElement): ProgressCircle => {
    return canvasElement.querySelector('swc-progress-circle') as ProgressCircle;
};

// Test: overview renders determinate progress with an accessible label.
export const OverviewTest: Story = {
    ...Overview,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;
        expect(progressCircle.getAttribute('role')).toBe('progressbar');
        expect(progressCircle.getAttribute('aria-label')).toBe(
            progressCircle.label
        );
        expect(progressCircle.getAttribute('aria-valuenow')).toBe(
            String(progressCircle.progress)
        );
    },
};

// Test: sizes render the proper size class.
export const SizesTest: Story = {
    ...Sizes,
    play: async ({ canvasElement }) => {
        const circles = Array.from(
            canvasElement.querySelectorAll('swc-progress-circle')
        );
        circles.forEach((circle) => {
            const size = circle.getAttribute('size');
            expect(size).toBeTruthy();
            expect(
                circle.shadowRoot?.querySelector(
                    `.swc-ProgressCircle--size${size?.toUpperCase()}`
                )
            ).toBeTruthy();
        });
    },
};

// Test: static colors reflect to class.
export const StaticColorsTest: Story = {
    ...StaticColors,
    play: async ({ canvasElement }) => {
        const circles = Array.from(
            canvasElement.querySelectorAll('swc-progress-circle[static-color]')
        );
        circles.forEach((circle) => {
            const staticColor = circle.getAttribute('static-color');
            expect(staticColor).toBeTruthy();
            const className = `swc-ProgressCircle--static${staticColor
                ?.toString()
                .slice(0, 1)
                .toUpperCase()}${staticColor?.toString().slice(1)}`;
            expect(
                circle.shadowRoot?.querySelector(`.${className}`)
            ).toBeTruthy();
        });
    },
};

// Test: progress values reflect to aria-valuenow.
export const ProgressValuesTest: Story = {
    ...ProgressValues,
    play: async ({ canvasElement }) => {
        const circles = Array.from(
            canvasElement.querySelectorAll('swc-progress-circle')
        );
        circles.forEach((circle) => {
            const progress = String(circle.progress);
            expect(circle.getAttribute('aria-valuenow')).toBe(progress);
        });
    },
};

// Test: indeterminate removes aria-valuenow and sets class.
export const IndeterminateTest: Story = {
    ...Indeterminate,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;
        expect(progressCircle.indeterminate).toBe(true);
        expect(progressCircle.hasAttribute('aria-valuenow')).toBe(false);
        expect(
            progressCircle.shadowRoot?.querySelector(
                '.swc-ProgressCircle--indeterminate'
            )
        ).toBeTruthy();
    },
};

// Test: slot content becomes the label.
export const SlotLabelTest: Story = {
    render: () => html`
        <swc-progress-circle>Loading data</swc-progress-circle>
    `,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;
        expect(progressCircle.label).toBe('Loading data');
        expect(progressCircle.getAttribute('aria-label')).toBe('Loading data');
    },
};

// Test: user-supplied role is preserved.
export const RoleOverrideTest: Story = {
    render: () => html`
        <swc-progress-circle
            role="status"
            label="Loading"
        ></swc-progress-circle>
    `,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;
        expect(progressCircle.getAttribute('role')).toBe('status');
    },
};

// Test: warning emitted when there is no accessible name.
export const AccessibilityWarningTest: Story = {
    render: () => html` <swc-progress-circle></swc-progress-circle> `,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        const { warnCalls, restore } = setupSwcWarningSpy();

        try {
            progressCircle.progress = 10;
            await progressCircle.updateComplete;

            expect(warnCalls.length).toBeGreaterThan(0);
            expect(String(warnCalls[0]?.[1] || '')).toContain('accessible');
        } finally {
            restore();
        }
    },
};

// Test: aria-label is accepted directly.
export const AriaLabelTest: Story = {
    render: () => html`
        <swc-progress-circle aria-label="Loading"></swc-progress-circle>
    `,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;
        expect(progressCircle.hasAttribute('aria-label')).toBe(true);
        expect(progressCircle.getAttribute('aria-label')).toBe('Loading');
    },
};

// Test: label sets the aria-label value.
export const LabelSetsAriaLabelTest: Story = {
    render: () => html`
        <swc-progress-circle label="Loading"></swc-progress-circle>
    `,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;
        expect(progressCircle.hasAttribute('aria-label')).toBe(true);
        expect(progressCircle.getAttribute('aria-label')).toBe('Loading');
    },
};

// Test: aria-label is preserved when label is empty.
export const PreserveAriaLabelTest: Story = {
    render: () => html`
        <swc-progress-circle
            label=""
            aria-label="Loading"
        ></swc-progress-circle>
    `,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;
        expect(progressCircle.hasAttribute('aria-label')).toBe(true);
        expect(progressCircle.getAttribute('aria-label')).toBe('Loading');
    },
};

// Test: determinate can return to indeterminate and clears aria-valuenow.
export const ReturnToIndeterminateTest: Story = {
    render: () => html`
        <swc-progress-circle
            progress="50"
            label="Processing"
        ></swc-progress-circle>
    `,
    play: async ({ canvasElement }) => {
        const progressCircle = getProgressCircle(canvasElement);
        await progressCircle.updateComplete;

        expect(progressCircle.hasAttribute('aria-valuenow')).toBe(true);
        expect(progressCircle.getAttribute('aria-valuenow')).toBe('50');

        progressCircle.indeterminate = true;
        await progressCircle.updateComplete;

        expect(progressCircle.hasAttribute('aria-valuenow')).toBe(false);
    },
};

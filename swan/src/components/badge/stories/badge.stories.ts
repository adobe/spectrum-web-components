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

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../badge.component.js';

type BadgeArgs = {
    variant: 'neutral' | 'positive' | 'negative' | 'notice' | 'accent';
    size: 'small' | 'medium' | 'large';
    pill: boolean;
    pulse: boolean;
    content: string;
};

const meta: Meta<BadgeArgs> = {
    title: 'Components/Badge',
    component: 'swan-badge',
    parameters: {
        docs: {
            description: {
                component:
                    'Badge component for displaying status, counts, or labels.',
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['neutral', 'positive', 'negative', 'notice', 'accent'],
            description: 'The badge variant that determines its color scheme',
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'The size of the badge',
        },
        pill: {
            control: { type: 'boolean' },
            description: 'Makes the badge pill-shaped with rounded corners',
        },
        pulse: {
            control: { type: 'boolean' },
            description: 'Makes the badge pulsate to draw attention',
        },
        content: {
            control: { type: 'text' },
            description: 'The content displayed inside the badge',
        },
    },
    args: {
        variant: 'neutral',
        size: 'medium',
        pill: false,
        pulse: false,
        content: 'Badge',
    },
};

export default meta;
type Story = StoryObj<BadgeArgs>;

// Default story
export const Default: Story = {
    render: (args) => html`
        <swan-badge
            variant="${args.variant}"
            size="${args.size}"
            ?pill="${args.pill}"
            ?pulse="${args.pulse}"
        >
            ${args.content}
        </swan-badge>
    `,
};

// Variants showcase
export const Variants: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All available badge variants.',
            },
        },
    },
    render: () => html`
        <div
            style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
        >
            <swan-badge variant="neutral">Neutral</swan-badge>
            <swan-badge variant="positive">Positive</swan-badge>
            <swan-badge variant="negative">Negative</swan-badge>
            <swan-badge variant="notice">Notice</swan-badge>
            <swan-badge variant="accent">Accent</swan-badge>
        </div>
    `,
};

// Sizes showcase
export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All available badge sizes.',
            },
        },
    },
    render: () => html`
        <div
            style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
        >
            <swan-badge size="small">Small</swan-badge>
            <swan-badge size="medium">Medium</swan-badge>
            <swan-badge size="large">Large</swan-badge>
        </div>
    `,
};

// Pill badges
export const Pill: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Pill-shaped badges with rounded corners.',
            },
        },
    },
    render: () => html`
        <div
            style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
        >
            <swan-badge variant="neutral" pill>Neutral</swan-badge>
            <swan-badge variant="positive" pill>Positive</swan-badge>
            <swan-badge variant="negative" pill>Negative</swan-badge>
            <swan-badge variant="notice" pill>Notice</swan-badge>
            <swan-badge variant="accent" pill>Accent</swan-badge>
        </div>
    `,
};

// Numbers/counts
export const Numbers: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Badges displaying numbers or counts.',
            },
        },
    },
    render: () => html`
        <div
            style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
        >
            <swan-badge variant="accent" size="small">1</swan-badge>
            <swan-badge variant="accent">12</swan-badge>
            <swan-badge variant="accent" size="large">99+</swan-badge>
            <swan-badge variant="negative" pill>3</swan-badge>
            <swan-badge variant="positive" pill>New</swan-badge>
        </div>
    `,
};

// Pulsing badges
export const Pulse: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Pulsing badges to draw attention.',
            },
        },
    },
    render: () => html`
        <div
            style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
        >
            <swan-badge variant="accent" pulse>Live</swan-badge>
            <swan-badge variant="positive" pulse pill>New</swan-badge>
            <swan-badge variant="notice" pulse>Alert</swan-badge>
        </div>
    `,
};

// Usage examples
export const UsageExamples: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Common usage patterns for badges in UI elements.',
            },
        },
    },
    render: () => html`
        <div style="display: flex; flex-direction: column; gap: 2rem;">
            <!-- Status indicators -->
            <div>
                <h4 style="margin: 0 0 1rem;">Status Indicators</h4>
                <div
                    style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
                >
                    <span
                        style="display: flex; align-items: center; gap: 0.5rem;"
                    >
                        Server Status:
                        <swan-badge variant="positive">Online</swan-badge>
                    </span>
                    <span
                        style="display: flex; align-items: center; gap: 0.5rem;"
                    >
                        Build:
                        <swan-badge variant="negative">Failed</swan-badge>
                    </span>
                    <span
                        style="display: flex; align-items: center; gap: 0.5rem;"
                    >
                        Deploy:
                        <swan-badge variant="notice">Pending</swan-badge>
                    </span>
                </div>
            </div>

            <!-- Notification counts -->
            <div>
                <h4 style="margin: 0 0 1rem;">Notification Counts</h4>
                <div
                    style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;"
                >
                    <span
                        style="display: flex; align-items: center; gap: 0.5rem;"
                    >
                        Messages
                        <swan-badge variant="accent" size="small" pill>
                            5
                        </swan-badge>
                    </span>
                    <span
                        style="display: flex; align-items: center; gap: 0.5rem;"
                    >
                        Notifications
                        <swan-badge variant="negative" size="small" pill>
                            12
                        </swan-badge>
                    </span>
                    <span
                        style="display: flex; align-items: center; gap: 0.5rem;"
                    >
                        Updates
                        <swan-badge variant="positive" pulse pill>
                            New
                        </swan-badge>
                    </span>
                </div>
            </div>

            <!-- Category tags -->
            <div>
                <h4 style="margin: 0 0 1rem;">Category Tags</h4>
                <div
                    style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;"
                >
                    <swan-badge variant="neutral" pill>
                        Documentation
                    </swan-badge>
                    <swan-badge variant="accent" pill>Feature</swan-badge>
                    <swan-badge variant="notice" pill>Bug Fix</swan-badge>
                    <swan-badge variant="positive" pill>Enhancement</swan-badge>
                </div>
            </div>
        </div>
    `,
};

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

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '@swc/components/badge';
import { BADGE_VARIANTS, FIXED_VALUES } from '@swc/components/badge';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta = {
    title: 'Components/Badge',
    component: 'sp-badge',
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: BADGE_VARIANTS,
        },
        fixed: {
            control: { type: 'select' },
            options: [undefined, ...FIXED_VALUES],
        },
        size: {
            control: { type: 'select' },
            options: ['s', 'm', 'l', 'xl'],
        },
    },
    args: {
        variant: 'informative',
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        variant: 'informative',
    },
    render: (args) => html`
        <sp-badge
            variant="${args.variant}"
            size="${args.size || 'm'}"
            ?fixed=${ifDefined(args.fixed)}
        >
            Badge
        </sp-badge>
    `,
};

export const Variants: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${BADGE_VARIANTS.map(
                (variant) => html`
                    <sp-badge variant="${variant}">${variant}</sp-badge>
                `
            )}
        </div>
    `,
};

export const Sizes: Story = {
    render: () => html`
        <div style="display: flex; gap: 8px; align-items: center;">
            <sp-badge size="s">Small</sp-badge>
            <sp-badge size="m">Medium</sp-badge>
            <sp-badge size="l">Large</sp-badge>
            <sp-badge size="xl">Extra Large</sp-badge>
        </div>
    `,
};

export const WithIcon: Story = {
    render: () => html`
        <sp-badge variant="positive">
            <span slot="icon">✓</span>
            With icon
        </sp-badge>
    `,
};

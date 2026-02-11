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

import { html } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
    LANGS,
    SIZES,
    template,
    type TypographyTemplateProps,
    VARIANTS,
} from './typography.template.js';

const meta: Meta<TypographyTemplateProps> = {
    title: 'Typography',
    argTypes: {
        variant: { control: 'select', options: VARIANTS },
        size: { control: 'select', options: SIZES },
        serif: { control: 'boolean' },
        heavy: { control: 'boolean' },
        margins: { control: 'boolean' },
        prose: { control: 'boolean' },
        lang: { control: 'select', options: LANGS },
        includeMultipleSizes: { control: 'boolean' },
        showAllVariants: { control: 'boolean' },
        sampleText: { control: 'text' },
    },
    render: (args) => html` ${template(args)} `,
    tags: ['migrated'],
};

export default meta;

export const Playground: Story = {
    render: (args) => html` ${template(args)} `,
    args: {
        variant: 'heading',
        size: 'M',
        serif: false,
        heavy: false,
        margins: false,
        prose: false,
        lang: undefined,
        includeMultipleSizes: false,
        showAllVariants: false,
        sampleText: '',
    },
    tags: ['autodocs', 'dev'],
};

/**
 * Each type variant defaults to sans-serif and size medium.
 */
export const AllVariants: Story = {
    args: {
        showAllVariants: true,
    },
    parameters: { 'section-order': 1 },
    tags: ['options'],
};

export const AllVariantsSerif: Story = {
    args: {
        showAllVariants: true,
        serif: true,
    },
    parameters: { 'section-order': 2 },
    tags: ['options'],
};

export const HeadingSizes: Story = {
    args: {
        variant: 'heading',
        includeMultipleSizes: true,
    },
    parameters: {
        'section-order': 3,
    },
    tags: ['options'],
};

export const BodySizes: Story = {
    args: {
        variant: 'body',
        includeMultipleSizes: true,
    },
    parameters: { 'section-order': 4 },
    tags: ['options'],
};

export const DetailSizes: Story = {
    args: {
        variant: 'detail',
        includeMultipleSizes: true,
    },
    parameters: { 'section-order': 5 },
    tags: ['options'],
};

export const CodeSizes: Story = {
    args: {
        variant: 'code',
        includeMultipleSizes: true,
    },
    parameters: { 'section-order': 6 },
    tags: ['options'],
};

export const MarginsOneOff: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Applies margin multipliers via the `--margins` modifier.',
            },
        },
    },
    args: {
        variant: 'body',
        margins: true,
        sampleText:
            'This paragraph should receive margins when the `--margins` modifier is applied.',
    },
    tags: ['options'],
};

export const MarginsProseParent: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Applies margin multipliers via `.swc-Typography--prose .swc-<variant>` selector.',
            },
        },
    },
    args: {
        variant: 'body',
        prose: true,
        sampleText:
            'This paragraph should receive margins when nested under `.swc-Typography--prose`.',
    },
    tags: ['options'],
};

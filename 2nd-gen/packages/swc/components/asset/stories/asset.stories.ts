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
import type { Meta, StoryObj } from '@storybook/web-components';

import '@adobe/swc/asset';

const meta: Meta = {
    title: 'Asset',
    component: 'swc-asset',
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['file', 'folder', undefined],
        },
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
    args: {
        variant: 'file',
    },
    render: (args) => html` <swc-asset variant="${args.variant}"></swc-asset> `,

    // render: () => html`
    //     <swc-asset style="height: 128px">
    //         <img src=${portrait} alt="Demo Graphic" />
    //     </swc-asset>
    // `,
};

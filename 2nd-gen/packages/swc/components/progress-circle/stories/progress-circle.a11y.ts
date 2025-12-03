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

const meta: Meta = {
    title: 'Progress Circle',
    component: 'swc-progress-circle',
};

export default meta;
// ───────────────
//    STORIES
// ───────────────

/**
 * These stories are used to document the accessibility features of the component.
 */

export const Accessibility: Story = {
    render: () => html`
        <div>
            <p>
                This is coming from the accessibility story through the
                Accessibility block. This option allows us to fully customize
                the accessibility documentation for a component by writing a
                custom story that renders the accessibility documentation.
            </p>
        </div>
    `,
    tags: ['!dev', '!autodocs', 'a11y'],
};

export const KeyboardNavigation: Story = {
    render: () => html`
        <div>
            <p>
                This is coming from the keyboard navigation story through the
                Accessibility block. This option allows us to fully customize
                allows us to fully customize the accessibility documentation for
                a component by writing a custom story that renders the
                accessibility documentation.
            </p>
        </div>
    `,
    tags: ['!dev', '!autodocs', 'a11y'],
};

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

import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '../sp-header.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/status-light/sp-status-light.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-star.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';

export default {
    title: 'Header',
    component: 'sp-header',
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['l1', 'l2'],
            description:
                'Header variant - L1 for top-level pages, L2 for sub-pages',
        },

        title: {
            control: { type: 'text' },
            description: 'Main title text',
        },
        subtitle: {
            control: { type: 'text' },
            description: 'Subtitle text (L1 only)',
        },
        editableTitle: {
            control: { type: 'boolean' },
            description: 'Whether the title can be edited (L2 only)',
        },
        showBack: {
            control: { type: 'boolean' },
            description: 'Show back button (L2 only)',
        },
        disableBack: {
            control: { type: 'boolean' },
            description: 'Disable back button',
        },
    },
};

interface Story<T> {
    (args: T): TemplateResult;
    args?: Partial<T>;
}

interface HeaderArgs {
    variant: 'l1' | 'l2';
    title: string;
    subtitle: string;
    editableTitle: boolean;
    showBack: boolean;
    disableBack: boolean;
    showStartActions: boolean;
    showEndActions: boolean;
    showMiddleActions: boolean;
    showStatus: boolean;
}

const HeaderTemplate = ({
    variant = 'l1',
    title = 'Page Title',
    subtitle = 'Subtitle description',
    editableTitle = false,
    showBack = false,
    disableBack = false,
    showStartActions = true,
    showEndActions = true,
    showMiddleActions = false,
    showStatus = false,
}: Partial<HeaderArgs>): TemplateResult => {
    const handleBack = () => console.log('Back button clicked');
    const handleEditStart = (event: CustomEvent) =>
        console.log('Edit started:', event.detail);
    const handleEditSave = (event: CustomEvent) =>
        console.log('Edit saved:', event.detail);
    const handleEditCancel = () => console.log('Edit cancelled');

    const titleValidation = (value: string) => {
        const errors = [];
        if (value.length > 50) {
            errors.push({
                type: 'length',
                message: 'Title must be 50 characters or less',
            });
        }
        if (/[<>]/.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Title cannot contain < or > characters',
            });
        }
        return errors.length > 0 ? errors : null;
    };

    return html`
        <sp-header
            variant=${variant}
            title=${title}
            subtitle=${ifDefined(variant === 'l1' ? subtitle : undefined)}
            ?editable-title=${editableTitle}
            ?show-back=${showBack}
            ?disable-back=${disableBack}
            .titleValidation=${titleValidation}
            @sp-header-back=${handleBack}
            @sp-header-edit-start=${handleEditStart}
            @sp-header-edit-save=${handleEditSave}
            @sp-header-edit-cancel=${handleEditCancel}
        >
            ${showStartActions
                ? html`
                      <sp-action-button slot="start-actions" quiet>
                          <sp-icon-settings slot="icon"></sp-icon-settings>
                          Settings
                      </sp-action-button>
                  `
                : ''}
            ${showMiddleActions && variant === 'l2'
                ? html`
                      <sp-action-button slot="middle-actions" quiet>
                          <sp-icon-star slot="icon"></sp-icon-star>
                          Favorite
                      </sp-action-button>
                  `
                : ''}
            ${showEndActions
                ? html`
                      <sp-button slot="end-actions" variant="accent">
                          Publish
                      </sp-button>
                  `
                : ''}
            ${showStatus && variant === 'l2'
                ? html`
                      <sp-status-light slot="status" variant="positive">
                          Published
                      </sp-status-light>
                      <sp-status-light slot="status" variant="neutral">
                          Draft
                      </sp-status-light>
                      <span slot="status">Last saved: 2 minutes ago</span>
                  `
                : ''}
        </sp-header>
    `;
};

export const L1Header: Story<HeaderArgs> = HeaderTemplate.bind({});
L1Header.args = {
    variant: 'l1',
    title: 'Create',
    subtitle:
        'This report analyzes underperforming creative assets to uncover areas of improvement and growth opportunities. It highlights key metrics',
    showStartActions: false,
    showEndActions: true,
};

export const L2Header: Story<HeaderArgs> = HeaderTemplate.bind({});
L2Header.args = {
    variant: 'l2',
    title: 'New Meta Ads activation',
    showBack: true,
    showStartActions: false,
    showEndActions: true,
    showMiddleActions: false,
    showStatus: false,
};

export const L2EditableHeader: Story<HeaderArgs> = HeaderTemplate.bind({});
L2EditableHeader.args = {
    variant: 'l2',
    title: 'Q1 2025 Kayak Adventures - Meta Campaign',
    editableTitle: true,
    showBack: true,
    showEndActions: false,
    showStatus: true,
};

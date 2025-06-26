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
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark.js';

export default {
    title: 'Header',
    component: 'sp-header',
    parameters: {
        docs: {
            description: {
                component: `
# Header Component

A composable page header component for Spectrum Web Components, designed for scalability and flexibility.

## Variants

- **L1 Header**: Top-level pages with title, subtitle, and action slots
- **L2 Header**: Sub-pages with back button, editable title, status indicators, and action regions

## Key Features

- ✅ L1/L2 variants with appropriate layouts
- ✅ Editable titles with validation and error handling  
- ✅ Flexible action slot system (start, middle, end)
- ✅ Status indicators and spacing
- ✅ Full accessibility support (WCAG 2.1 AA)
- ✅ Responsive behavior and overflow handling
- ✅ Keyboard navigation and focus management
                `,
            },
        },
    },
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['l1', 'l2'],
            description: 'Header variant - L1 for top-level pages, L2 for sub-pages',
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
    const handleEditStart = (event: CustomEvent) => console.log('Edit started:', event.detail);
    const handleEditSave = (event: CustomEvent) => console.log('Edit saved:', event.detail);
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

// Primary Stories
export const L1Basic: Story<HeaderArgs> = HeaderTemplate.bind({});
L1Basic.args = {
    variant: 'l1',
    title: 'Dashboard',
    subtitle: 'Analytics and insights for your campaigns',
    showStartActions: false,
    showEndActions: true,
};

export const L1WithActions: Story<HeaderArgs> = HeaderTemplate.bind({});
L1WithActions.args = {
    variant: 'l1',
    title: 'Create Campaign',
    subtitle: 'Build and launch your next marketing campaign',
    showStartActions: true,
    showEndActions: true,
};

export const L2Basic: Story<HeaderArgs> = HeaderTemplate.bind({});
L2Basic.args = {
    variant: 'l2',
    title: 'Campaign Settings',
    showBack: true,
    showStartActions: false,
    showEndActions: true,
};

export const L2WithStatus: Story<HeaderArgs> = HeaderTemplate.bind({});
L2WithStatus.args = {
    variant: 'l2',
    title: 'Q1 2025 Meta Campaign',
    showBack: true,
    showEndActions: true,
    showStatus: true,
};

export const L2EditableTitle: Story<HeaderArgs> = HeaderTemplate.bind({});
L2EditableTitle.args = {
    variant: 'l2',
    title: 'Editable Campaign Name',
    editableTitle: true,
    showBack: true,
    showEndActions: false,
    showStatus: true,
};

export const L2AllRegions: Story<HeaderArgs> = HeaderTemplate.bind({});
L2AllRegions.args = {
    variant: 'l2',
    title: 'Advanced Campaign',
    showBack: true,
    showStartActions: true,
    showMiddleActions: true,
    showEndActions: true,
    showStatus: true,
};

// Rich Content Examples
export const L1WithRichContent = (): TemplateResult => html`
    <sp-header variant="l1">
        <span slot="title">
            <strong>Project</strong> <em>Portfolio</em>
            <sp-status-light variant="positive">New</sp-status-light>
        </span>
        <span slot="subtitle">
            Advanced analytics dashboard with <strong>real-time collaboration</strong>
        </span>
        <sp-action-button slot="start-actions" quiet>
            <sp-icon-bookmark slot="icon"></sp-icon-bookmark>
            Bookmark
        </sp-action-button>
        <sp-button slot="end-actions" variant="accent">Export</sp-button>
    </sp-header>
`;

export const L2MultipleActions = (): TemplateResult => {
    const handleAction = (action: string) => () => console.log(`${action} clicked`);

    return html`
        <sp-header
            variant="l2"
            title="Content Editor"
            show-back
            @sp-header-back=${() => console.log('Back clicked')}
        >
            <sp-action-button slot="start-actions" quiet @click=${handleAction('Edit')}>
                <sp-icon-edit slot="icon"></sp-icon-edit>
            </sp-action-button>
            <sp-action-button slot="start-actions" quiet @click=${handleAction('Settings')}>
                <sp-icon-settings slot="icon"></sp-icon-settings>
            </sp-action-button>

            <sp-button slot="middle-actions" @click=${handleAction('Preview')}>
                Preview
            </sp-button>

            <sp-action-button slot="end-actions" quiet @click=${handleAction('More')}>
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
            <sp-button slot="end-actions" @click=${handleAction('Save')}>
                Save Draft
            </sp-button>
            <sp-button slot="end-actions" variant="accent" @click=${handleAction('Publish')}>
                Publish
            </sp-button>

            <sp-status-light slot="status" variant="notice">Draft</sp-status-light>
            <span slot="status">Last saved: 2 minutes ago</span>
        </sp-header>
    `;
};

export const MinimalExamples = (): TemplateResult => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
        <div>
            <h4>Minimal L1 - Title Only</h4>
            <sp-header variant="l1" title="Simple Dashboard"></sp-header>
        </div>
        
        <div>
            <h4>Minimal L2 - Back + Title</h4>
            <sp-header 
                variant="l2" 
                title="Settings Page" 
                show-back
                @sp-header-back=${() => console.log('Back clicked')}
            ></sp-header>
        </div>
        
        <div>
            <h4>L2 with Disabled Back</h4>
            <sp-header 
                variant="l2" 
                title="Loading..." 
                show-back
                disable-back
            ></sp-header>
        </div>
    </div>
`;

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

import '../sp-header.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/status-light/sp-status-light.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-duplicate.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-download.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-share.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-star.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark.js';

export default {
    title: 'Header/Advanced Features',
    component: 'sp-header',
    parameters: {
        docs: {
            description: {
                component: `
# Header Advanced Features

This section demonstrates advanced functionality of the header component:

## Features Covered

- ✅ **Action Slot Management**: Start, middle, and end action regions
- ✅ **Action Layout**: Visual spacing between action groups  
- ✅ **Overflow Handling**: Responsive behavior with overflow menus
- ✅ **Edit Title Workflow**: Complete editable title implementation
- ✅ **Status Indicators**: Multiple status elements with proper spacing
- ✅ **Real-world Examples**: Complex scenarios like content editors and dashboards

## Action Slot System

- **L1 Headers**: Start and end action slots
- **L2 Headers**: Start, middle, and end action slots with proper spacing
- **Overflow Support**: Automatic overflow handling based on available space
- **Priority System**: Actions can be prioritized for overflow scenarios
                `,
            },
        },
    },
};

// Action Slot Management
export const ActionSlotLayout = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h3>L2 Header - All Action Regions</h3>
                <sp-header
                    variant="l2"
                    title="Content Management System"
                    show-back
                    @sp-header-back=${() => console.log('Back clicked')}
                >
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        @click=${handleAction('Edit')}
                    >
                        <sp-icon-edit slot="icon"></sp-icon-edit>
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        @click=${handleAction('Delete')}
                    >
                        <sp-icon-delete slot="icon"></sp-icon-delete>
                    </sp-action-button>

                    <sp-button
                        slot="middle-actions"
                        @click=${handleAction('Clone')}
                    >
                        Duplicate
                    </sp-button>
                    <sp-button
                        slot="middle-actions"
                        @click=${handleAction('Share')}
                    >
                        Share
                    </sp-button>

                    <sp-button
                        slot="end-actions"
                        @click=${handleAction('Save')}
                    >
                        Save Draft
                    </sp-button>
                    <sp-button
                        slot="end-actions"
                        variant="accent"
                        @click=${handleAction('Publish')}
                    >
                        Publish
                    </sp-button>
                </sp-header>
            </div>
        </div>
    `;
};

// Overflow Handling
export const OverflowHandling = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h3>Overflow Enabled - Resize window to see overflow menu</h3>
                <sp-header
                    variant="l2"
                    title="Document Editor with Many Actions"
                    show-back
                    enable-overflow
                    overflow-threshold="600"
                    @sp-header-back=${() => console.log('Back clicked')}
                >
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="1"
                        @click=${handleAction('Bold')}
                    >
                        <strong>B</strong>
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="2"
                        @click=${handleAction('Italic')}
                    >
                        <em>I</em>
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="3"
                        @click=${handleAction('Underline')}
                    >
                        <u>U</u>
                    </sp-action-button>

                    <sp-button
                        slot="middle-actions"
                        data-priority="5"
                        @click=${handleAction('Preview')}
                    >
                        Preview
                    </sp-button>
                    <sp-button
                        slot="middle-actions"
                        data-priority="6"
                        @click=${handleAction('History')}
                    >
                        History
                    </sp-button>

                    <sp-action-button
                        slot="end-actions"
                        quiet
                        data-priority="8"
                        @click=${handleAction('Settings')}
                    >
                        <sp-icon-settings slot="icon"></sp-icon-settings>
                    </sp-action-button>
                    <sp-button
                        slot="end-actions"
                        data-priority="4"
                        @click=${handleAction('Save')}
                    >
                        Save Draft
                    </sp-button>
                    <sp-button
                        slot="end-actions"
                        variant="accent"
                        data-priority="1"
                        @click=${handleAction('Publish')}
                    >
                        Publish
                    </sp-button>
                </sp-header>
            </div>

            <div>
                <h3>Max Visible Actions Limited</h3>
                <sp-header
                    variant="l2"
                    title="E-commerce Admin Dashboard"
                    show-back
                    enable-overflow
                    max-visible-actions="4"
                    @sp-header-back=${() => console.log('Back clicked')}
                >
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="1"
                    >
                        <sp-icon-edit slot="icon"></sp-icon-edit>
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="2"
                    >
                        <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="3"
                    >
                        <sp-icon-delete slot="icon"></sp-icon-delete>
                    </sp-action-button>

                    <sp-button slot="middle-actions" data-priority="4">
                        Export
                    </sp-button>
                    <sp-button slot="middle-actions" data-priority="5">
                        Import
                    </sp-button>
                    <sp-button slot="middle-actions" data-priority="6">
                        Analytics
                    </sp-button>

                    <sp-button slot="end-actions" data-priority="7">
                        Save
                    </sp-button>
                    <sp-button
                        slot="end-actions"
                        variant="accent"
                        data-priority="1"
                    >
                        Update Products
                    </sp-button>
                </sp-header>
            </div>
        </div>
    `;
};

// Edit Title Workflow
export const EditTitleWorkflow = (): TemplateResult => {
    const handleEditSave = (event: CustomEvent) => {
        console.log('Title saved:', event.detail);
        // Optional: Add custom save logic here
    };

    const basicValidation = (value: string) => {
        if (value.length > 80) {
            return [
                {
                    type: 'length',
                    message: 'Title must be 80 characters or less',
                },
            ];
        }
        return null;
    };

    return html`
        <div style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h3>Basic Editable Title</h3>
                <p>Click on the title or edit icon to start editing</p>
                <sp-header
                    variant="l2"
                    title="Click to Edit This Title"
                    editable-title
                    show-back
                    @sp-header-back=${() => console.log('Back clicked')}
                    @sp-header-edit-save=${handleEditSave}
                >
                    <sp-status-light slot="status" variant="notice">
                        Draft
                    </sp-status-light>
                    <sp-button slot="end-actions">Save Changes</sp-button>
                </sp-header>
            </div>

            <div>
                <h3>Editable with Character Limit</h3>
                <p>Try typing more than 80 characters to see validation</p>
                <sp-header
                    variant="l2"
                    title="Long Title Example - This title is approaching the character limit for testing"
                    editable-title
                    show-back
                    max-title-length="80"
                    .titleValidation=${basicValidation}
                    @sp-header-back=${() => console.log('Back clicked')}
                    @sp-header-edit-save=${handleEditSave}
                >
                    <sp-status-light slot="status" variant="info">
                        Testing
                    </sp-status-light>
                    <sp-button slot="end-actions" variant="accent">
                        Validate
                    </sp-button>
                </sp-header>
            </div>

            <div>
                <h3>Editable with Toast Notifications</h3>
                <p>Edit and save to see success toast notification</p>
                <sp-header
                    variant="l2"
                    title="Project with Toast Messages"
                    editable-title
                    show-back
                    show-success-toast
                    success-toast-message="Project title updated successfully!"
                    @sp-header-back=${() => console.log('Back clicked')}
                    @sp-header-edit-save=${handleEditSave}
                >
                    <sp-status-light slot="status" variant="positive">
                        Active
                    </sp-status-light>
                    <sp-button slot="end-actions">Apply Changes</sp-button>
                </sp-header>
            </div>
        </div>
    `;
};

// Real-world Complex Examples
export const RealWorldExamples = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="display: flex; flex-direction: column; gap: 40px;">
            <div>
                <h3>Content Management Dashboard</h3>
                <sp-header
                    variant="l1"
                    title="Content Library"
                    subtitle="Manage your digital assets, campaigns, and creative content"
                >
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        @click=${handleAction('Filter')}
                    >
                        Filter
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        @click=${handleAction('Search')}
                    >
                        Search
                    </sp-action-button>

                    <sp-button
                        slot="end-actions"
                        @click=${handleAction('Import')}
                    >
                        Import Assets
                    </sp-button>
                    <sp-button
                        slot="end-actions"
                        variant="accent"
                        @click=${handleAction('Create')}
                    >
                        Create Campaign
                    </sp-button>
                </sp-header>
            </div>

            <div>
                <h3>Project Editor Interface</h3>
                <sp-header
                    variant="l2"
                    title="Q1 2025 Marketing Campaign Strategy"
                    editable-title
                    show-back
                    @sp-header-back=${() => console.log('Back to projects')}
                >
                    <!-- Edit Tools -->
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        @click=${handleAction('Undo')}
                    >
                        ↶
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        @click=${handleAction('Redo')}
                    >
                        ↷
                    </sp-action-button>

                    <!-- View Options -->
                    <sp-button
                        slot="middle-actions"
                        @click=${handleAction('Preview')}
                    >
                        Preview
                    </sp-button>
                    <sp-button
                        slot="middle-actions"
                        @click=${handleAction('Comments')}
                    >
                        Comments (3)
                    </sp-button>

                    <!-- Actions -->
                    <sp-action-button
                        slot="end-actions"
                        quiet
                        @click=${handleAction('Share')}
                    >
                        <sp-icon-share slot="icon"></sp-icon-share>
                    </sp-action-button>
                    <sp-action-button
                        slot="end-actions"
                        quiet
                        @click=${handleAction('More')}
                    >
                        <sp-icon-more slot="icon"></sp-icon-more>
                    </sp-action-button>
                    <sp-button
                        slot="end-actions"
                        @click=${handleAction('Save')}
                    >
                        Save Draft
                    </sp-button>
                    <sp-button
                        slot="end-actions"
                        variant="accent"
                        @click=${handleAction('Publish')}
                    >
                        Publish Campaign
                    </sp-button>

                    <!-- Status Row -->
                    <sp-status-light slot="status" variant="positive">
                        Active
                    </sp-status-light>
                    <span slot="status">Last modified: 2 hours ago</span>
                    <span slot="status">85% Complete</span>
                    <sp-status-light slot="status" variant="notice">
                        Review Required
                    </sp-status-light>
                </sp-header>
            </div>

            <div>
                <h3>E-commerce Product Management</h3>
                <sp-header
                    variant="l2"
                    title="Winter Collection 2025 - Product Catalog"
                    editable-title
                    show-back
                    enable-overflow
                    overflow-threshold="700"
                    @sp-header-back=${() => console.log('Back to catalog')}
                >
                    <!-- Quick Actions -->
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="1"
                    >
                        <sp-icon-edit slot="icon"></sp-icon-edit>
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="2"
                    >
                        <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                    </sp-action-button>
                    <sp-action-button
                        slot="start-actions"
                        quiet
                        data-priority="3"
                    >
                        <sp-icon-star slot="icon"></sp-icon-star>
                    </sp-action-button>

                    <!-- Bulk Operations -->
                    <sp-button slot="middle-actions" data-priority="4">
                        Bulk Edit
                    </sp-button>
                    <sp-button slot="middle-actions" data-priority="5">
                        Export CSV
                    </sp-button>
                    <sp-button slot="middle-actions" data-priority="6">
                        Import Products
                    </sp-button>

                    <!-- Primary Actions -->
                    <sp-action-button
                        slot="end-actions"
                        quiet
                        data-priority="7"
                    >
                        <sp-icon-settings slot="icon"></sp-icon-settings>
                    </sp-action-button>
                    <sp-button slot="end-actions" data-priority="2">
                        Preview Store
                    </sp-button>
                    <sp-button
                        slot="end-actions"
                        variant="accent"
                        data-priority="1"
                    >
                        Publish Changes
                    </sp-button>

                    <!-- Status Indicators -->
                    <sp-status-light slot="status" variant="positive">
                        Published
                    </sp-status-light>
                    <span slot="status">127 Products</span>
                    <span slot="status">15 Pending Review</span>
                    <sp-status-light slot="status" variant="notice">
                        Price Updates Required
                    </sp-status-light>
                </sp-header>
            </div>
        </div>
    `;
};

// Status Indicators Comprehensive
export const StatusIndicators = (): TemplateResult => html`
    <div style="display: flex; flex-direction: column; gap: 40px;">
        <div>
            <h3>Multiple Status Types</h3>
            <sp-header
                variant="l2"
                title="Campaign Performance Dashboard"
                show-back
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-status-light slot="status" variant="positive">
                    Live
                </sp-status-light>
                <sp-status-light slot="status" variant="notice">
                    Optimizing
                </sp-status-light>
                <span slot="status">Budget: $2,450 / $5,000</span>
                <span slot="status">CTR: 2.3%</span>
                <span slot="status">Last updated: 5 min ago</span>

                <sp-button slot="end-actions">View Reports</sp-button>
                <sp-button slot="end-actions" variant="accent">
                    Optimize
                </sp-button>
            </sp-header>
        </div>

        <div>
            <h3>Status with Actions</h3>
            <sp-header
                variant="l2"
                title="Content Review Queue"
                show-back
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-status-light slot="status" variant="negative">
                    Action Required
                </sp-status-light>
                <span slot="status">3 items need approval</span>
                <span slot="status">2 items rejected</span>
                <sp-status-light slot="status" variant="info">
                    Review Mode
                </sp-status-light>

                <sp-button slot="end-actions">Approve All</sp-button>
                <sp-button slot="end-actions" variant="accent">
                    Review Next
                </sp-button>
            </sp-header>
        </div>
    </div>
`;

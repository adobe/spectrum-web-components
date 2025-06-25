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
import '@spectrum-web-components/badge/sp-badge.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-duplicate.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-download.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-share.js';

export default {
    title: 'Header/L2 Comprehensive',
    component: 'sp-header',
};

export const L2BasicHeader = (): TemplateResult => {
    const handleBack = () => {
        console.log('Back button clicked');
    };

    return html`
        <div style="margin: 20px;">
            <h3>L2 Basic Header - Back Button & Title</h3>
            <sp-header
                variant="l2"
                title="Basic Page Title"
                show-back
                @sp-header-back=${handleBack}
            ></sp-header>
        </div>
    `;
};

export const L2WithEndActions = (): TemplateResult => {
    const handleBack = () => console.log('Back clicked');
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - End Actions</h3>
            <sp-header
                variant="l2"
                title="Campaign Settings"
                show-back
                @sp-header-back=${handleBack}
            >
                <sp-button slot="end-actions" @click=${handleAction('Export')}>
                    Export
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
    `;
};

export const L2WithStartMiddleEndActions = (): TemplateResult => {
    const handleBack = () => console.log('Back clicked');
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - Start, Middle, End Action Regions</h3>
            <sp-header
                variant="l2"
                title="Advanced Campaign"
                show-back
                @sp-header-back=${handleBack}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Start Action')}
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Middle Action')}
                >
                    Clone
                </sp-button>

                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${handleAction('More')}
                >
                    <sp-icon-more slot="icon"></sp-icon-more>
                </sp-action-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Save')}
                >
                    Save
                </sp-button>
            </sp-header>
        </div>
    `;
};

export const L2WithStatusRow = (): TemplateResult => {
    const handleBack = () => console.log('Back clicked');

    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - Status Row with Multiple Indicators</h3>
            <sp-header
                variant="l2"
                title="Q1 2025 Campaign"
                show-back
                @sp-header-back=${handleBack}
            >
                <sp-badge slot="status" variant="positive">Published</sp-badge>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    Saved 2 minutes ago
                </span>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    95% complete
                </span>
                <sp-badge slot="status" variant="notice">Draft</sp-badge>

                <sp-button slot="end-actions">Preview</sp-button>
                <sp-button slot="end-actions" variant="accent">
                    Launch
                </sp-button>
            </sp-header>
        </div>
    `;
};

export const L2EditableTitle = (): TemplateResult => {
    const handleBack = () => console.log('Back clicked');
    const handleEditStart = () => console.log('Edit started');
    const handleEditSave = (event: CustomEvent) => {
        console.log('Title saved:', event.detail.newTitle);
        // Don't prevent default - let the component handle the save
    };
    const handleEditCancel = () => console.log('Edit cancelled');

    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - Editable Title</h3>
            <sp-header
                variant="l2"
                title="Editable Campaign Name"
                show-back
                editable-title
                @sp-header-back=${handleBack}
                @sp-header-edit-start=${handleEditStart}
                @sp-header-edit-save=${handleEditSave}
                @sp-header-edit-cancel=${handleEditCancel}
            >
                <sp-action-button slot="end-actions" quiet>
                    <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                </sp-action-button>
                <sp-action-button slot="end-actions" quiet>
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                </sp-action-button>
                <sp-button slot="end-actions" variant="accent">
                    Save Changes
                </sp-button>
            </sp-header>
        </div>
    `;
};

export const L2EditableTitleWithValidation = (): TemplateResult => {
    const handleBack = () => console.log('Back clicked');

    // Custom validation function
    const titleValidation = (value: string) => {
        const errors = [];
        if (value.length === 0) {
            errors.push({ message: 'Title cannot be empty', type: 'empty' });
        }
        if (value.length > 100) {
            errors.push({
                message: 'Title must be 100 characters or less',
                type: 'length',
            });
        }
        if (/[<>]/.test(value)) {
            errors.push({
                message: 'Title cannot contain < or > characters',
                type: 'characters',
            });
        }
        return errors.length > 0 ? errors : null;
    };

    const handleEditSave = (event: CustomEvent) => {
        console.log('Attempting to save:', event.detail.newTitle);
        // Simulate server validation
        if (event.detail.newTitle.toLowerCase().includes('error')) {
            event.preventDefault();
            console.log('Server validation failed');
        }
    };

    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - Editable Title with Validation</h3>
            <p>
                Try editing the title. Enter "error" to simulate server
                validation failure.
            </p>
            <sp-header
                variant="l2"
                title="Test Campaign"
                show-back
                editable-title
                .titleValidation=${titleValidation}
                @sp-header-back=${handleBack}
                @sp-header-edit-save=${handleEditSave}
            >
                <sp-button slot="end-actions" variant="accent">Save</sp-button>
            </sp-header>
        </div>
    `;
};

export const L2ComplexExample = (): TemplateResult => {
    const handleBack = () => console.log('Back clicked');
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - Complex Example with All Features</h3>
            <sp-header
                variant="l2"
                title="Complex Campaign Management"
                show-back
                editable-title
                @sp-header-back=${handleBack}
            >
                <!-- Start Actions -->
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Refresh')}
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>

                <!-- Middle Actions -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Clone')}
                >
                    Clone Campaign
                </sp-button>
                <sp-action-button
                    slot="middle-actions"
                    quiet
                    @click=${handleAction('Share')}
                >
                    <sp-icon-share slot="icon"></sp-icon-share>
                </sp-action-button>

                <!-- Status Row -->
                <sp-badge slot="status" variant="positive">Active</sp-badge>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    Performance: 95% ▲
                </span>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    Budget: $50K remaining
                </span>
                <sp-badge slot="status" variant="notice">
                    Optimization needed
                </sp-badge>

                <!-- End Actions -->
                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${handleAction('Download')}
                >
                    <sp-icon-download slot="icon"></sp-icon-download>
                </sp-action-button>
                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${handleAction('More')}
                >
                    <sp-icon-more slot="icon"></sp-icon-more>
                </sp-action-button>
                <sp-button slot="end-actions" @click=${handleAction('Preview')}>
                    Preview
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Launch')}
                >
                    Launch
                </sp-button>
            </sp-header>
        </div>
    `;
};

export const L2DisabledBackButton = (): TemplateResult => {
    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - Disabled Back Button</h3>
            <sp-header
                variant="l2"
                title="Unsaved Changes"
                show-back
                disable-back
            >
                <sp-button slot="end-actions">Discard</sp-button>
                <sp-button slot="end-actions" variant="accent">Save</sp-button>
            </sp-header>
        </div>
    `;
};

export const L2SlottedTitleContent = (): TemplateResult => {
    const handleBack = () => console.log('Back clicked');

    return html`
        <div style="margin: 20px;">
            <h3>L2 Header - Slotted Title Content</h3>
            <sp-header variant="l2" show-back @sp-header-back=${handleBack}>
                <span slot="title">
                    <strong>Campaign:</strong>
                    <em style="color: var(--spectrum-accent-color-900);">
                        Holiday 2024 Meta Ads
                    </em>
                </span>

                <sp-badge slot="status" variant="positive">Live</sp-badge>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    CTR: 2.4%
                </span>

                <sp-button slot="end-actions" variant="accent">
                    View Analytics
                </sp-button>
            </sp-header>
        </div>
    `;
};

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
import '@spectrum-web-components/header/sp-header.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/badge/sp-badge.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-star.js';
import { HeaderValidationError } from '../src/Header.js';

export default {
    title: 'Header/L2 Edit Workflow',
    component: 'sp-header',
    argTypes: {
        title: { control: 'text' },
        editableTitle: { control: 'boolean' },
        showSuccessToast: { control: 'boolean' },
        successToastMessage: { control: 'text' },
    },
};

export const ClickToEdit = (): TemplateResult => html`
    <sp-header
        variant="l2"
        title="Click on this title to edit it"
        editable-title
        show-back
    >
        <sp-badge slot="status" variant="positive">Published</sp-badge>
        <sp-action-button slot="end-actions" variant="accent">
            Publish
        </sp-action-button>
    </sp-header>
`;

export const EditButtonWithTooltip = (): TemplateResult => html`
    <sp-header
        variant="l2"
        title="Hover over the edit icon for tooltip"
        editable-title
        show-back
    >
        <sp-badge slot="status" variant="neutral">Draft</sp-badge>
        <sp-action-button slot="end-actions">Save</sp-action-button>
    </sp-header>
`;

export const LongTitleTruncation = (): TemplateResult => html`
    <div style="max-width: 600px;">
        <sp-header
            variant="l2"
            title="This is a very long title that will be truncated and should show a tooltip when you hover over it to see the full text"
            editable-title
            show-back
        >
            <sp-badge slot="status" variant="info">In Review</sp-badge>
            <sp-action-button slot="end-actions">Review</sp-action-button>
        </sp-header>
    </div>
`;

export const MaxWidthEditField = (): TemplateResult => html`
    <sp-header
        variant="l2"
        title="Edit this to test 400px max width"
        editable-title
        show-back
    >
        <sp-badge slot="status">Ready</sp-badge>
    </sp-header>
`;

export const HorizontalScrollInEdit = (): TemplateResult => html`
    <sp-header
        variant="l2"
        title="Start editing this title and type a very long text to see horizontal scrolling behavior when it exceeds the 400px maximum width constraint"
        editable-title
        show-back
    >
        <sp-badge slot="status" variant="positive">Active</sp-badge>
    </sp-header>
`;

export const CustomValidation = (): TemplateResult => {
    const validateTitle = (value: string): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        if (value.length > 50) {
            errors.push({
                type: 'length',
                message: 'Title must be less than 50 characters',
            });
        }

        if (value.includes('bad')) {
            errors.push({
                type: 'characters',
                message: 'Title cannot contain the word "bad"',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    return html`
        <sp-header
            variant="l2"
            title="Test validation (try 'bad' word or 50+ chars)"
            editable-title
            show-back
            .titleValidation=${validateTitle}
        >
            <sp-badge slot="status" variant="negative">Needs Review</sp-badge>
        </sp-header>
    `;
};

export const CustomToastMessage = (): TemplateResult => html`
    <sp-header
        variant="l2"
        title="Custom toast message example"
        editable-title
        show-back
        success-toast-message="Page title updated successfully!"
    >
        <sp-badge slot="status">Custom</sp-badge>
    </sp-header>
`;

export const DisableToast = (): TemplateResult => html`
    <sp-header
        variant="l2"
        title="No toast will appear after editing"
        editable-title
        show-back
        show-success-toast="false"
    >
        <sp-badge slot="status">Silent</sp-badge>
    </sp-header>
`;

export const ResponsiveEditMode = (): TemplateResult => html`
    <div
        style="resize: horizontal; overflow: auto; border: 1px dashed #ccc; padding: 20px; max-width: 800px; min-width: 300px;"
    >
        <p><em>Resize this container to test responsive behavior:</em></p>
        <sp-header
            variant="l2"
            title="Responsive edit behavior"
            editable-title
            show-back
        >
            <sp-badge slot="status">Responsive</sp-badge>
            <sp-action-button slot="end-actions">Save</sp-action-button>
            <sp-action-button slot="end-actions">Cancel</sp-action-button>
        </sp-header>
    </div>
`;

export const AllFeaturesDemo = (): TemplateResult => {
    const handleEditStart = (event: CustomEvent) => {
        console.log('Edit started:', event.detail);
    };

    const handleEditSave = (event: CustomEvent) => {
        console.log('Edit saved:', event.detail);
    };

    const handleEditCancel = (event: CustomEvent) => {
        console.log('Edit cancelled:', event.detail);
    };

    const handleTitleRenamed = (event: CustomEvent) => {
        console.log('Title renamed:', event.detail);
    };

    return html`
        <div style="max-width: 700px;">
            <h3>Complete Edit Workflow Demo</h3>
            <p><strong>Features to test:</strong></p>
            <ul>
                <li>Click on title text or edit icon to start editing</li>
                <li>Hover over edit icon to see "Rename" tooltip</li>
                <li>Type long text to see horizontal scrolling</li>
                <li>Press Enter to save, Escape to cancel</li>
                <li>Click outside to cancel editing</li>
                <li>Success toast appears after saving</li>
                <li>Title truncation with hover tooltip (if long)</li>
            </ul>

            <sp-header
                variant="l2"
                title="Alignment Plan for Regional Sync Expansion Initiative"
                editable-title
                show-back
                @sp-header-edit-start=${handleEditStart}
                @sp-header-edit-save=${handleEditSave}
                @sp-header-edit-cancel=${handleEditCancel}
                @sp-header-title-renamed=${handleTitleRenamed}
            >
                <sp-badge slot="status" variant="positive">Published</sp-badge>
                <span slot="status">Last updated: 3 hours ago</span>
                <sp-action-button slot="middle-actions" quiet>
                    <sp-icon-star slot="icon"></sp-icon-star>
                    Favorite
                </sp-action-button>
                <sp-action-button slot="end-actions">Review</sp-action-button>
                <sp-button slot="end-actions" variant="accent">
                    Publish
                </sp-button>
            </sp-header>
        </div>
    `;
};

// Comprehensive error handling examples are available in the dedicated
// "Header/Error Handling & Validation" story collection

export const AccessibilityTest = (): TemplateResult => html`
    <div>
        <h3>Accessibility Features</h3>
        <p>
            <strong>Test with keyboard navigation and screen readers:</strong>
        </p>
        <ul>
            <li>Tab to navigate to edit button</li>
            <li>Press Enter or Space to start editing</li>
            <li>Tab to navigation between save/cancel buttons</li>
            <li>All elements have proper aria-labels</li>
            <li>Focus indicators are visible</li>
        </ul>

        <sp-header
            variant="l2"
            title="Test accessibility features here"
            editable-title
            show-back
        >
            <sp-badge slot="status">A11y Test</sp-badge>
        </sp-header>
    </div>
`;

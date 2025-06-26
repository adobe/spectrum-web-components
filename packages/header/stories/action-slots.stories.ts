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
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';

export default {
    title: 'Header/Phase 8 - Action Slots',
    component: 'sp-header',
};

export const BasicActionSlots = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Basic Action Slots - L1 & L2</h3>

            <h4>L1 Header - Start & End Actions</h4>
            <sp-header
                variant="l1"
                title="Campaign Dashboard"
                subtitle="Manage your advertising campaigns"
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Settings')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    Settings
                </sp-action-button>

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

            <h4>L2 Header - Start, Middle & End Actions</h4>
            <sp-header
                variant="l2"
                title="Campaign Details"
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

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Clone')}
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
                    Save Changes
                </sp-button>
            </sp-header>
        </div>
    `;
};

export const ActionSlotsWithDividers = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Action Slots with Dividers - L2 Only</h3>

            <h4>Small Dividers (default)</h4>
            <sp-header
                variant="l2"
                title="Advanced Campaign Settings"
                show-back
                show-action-dividers
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
                    @click=${handleAction('Duplicate')}
                >
                    <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Clone')}
                >
                    Clone
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Export')}
                >
                    Export
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
                    Save All
                </sp-button>
            </sp-header>

            <h4>Medium Dividers</h4>
            <sp-header
                variant="l2"
                title="Content Management System"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Settings')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Upload')}
                >
                    Upload
                </sp-button>

                <sp-button
                    slot="end-actions"
                    @click=${handleAction('Save Draft')}
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

            <h4>Large Dividers</h4>
            <sp-header
                variant="l2"
                title="Project Collaboration Hub"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Share')}
                >
                    <sp-icon-share slot="icon"></sp-icon-share>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Invite')}
                >
                    Invite Users
                </sp-button>

                <sp-button slot="end-actions" @click=${handleAction('Export')}>
                    Export
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Launch')}
                >
                    Launch Project
                </sp-button>
            </sp-header>
        </div>
    `;
};

export const ComplexActionGroups = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Complex Action Groups - Real-world Examples</h3>

            <h4>Content Editor Toolbar</h4>
            <sp-header
                variant="l2"
                title="Article Editor"
                show-back
                show-action-dividers
                editable-title
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <!-- Edit Actions Group -->
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Bold')}
                >
                    B
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Italic')}
                >
                    I
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Underline')}
                >
                    U
                </sp-action-button>

                <!-- View Actions Group -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Preview')}
                >
                    Preview
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Split View')}
                >
                    Split View
                </sp-button>

                <!-- Save Actions Group -->
                <sp-button
                    slot="end-actions"
                    @click=${handleAction('Save Draft')}
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

                <sp-badge slot="status" variant="notice">Draft</sp-badge>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    Last saved 2 minutes ago
                </span>
            </sp-header>

            <h4>Project Management Dashboard</h4>
            <sp-header
                variant="l2"
                title="Q1 2025 Marketing Campaign"
                show-back
                show-action-dividers
                editable-title
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <!-- Quick Actions -->
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Favorite')}
                >
                    ★
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Share')}
                >
                    <sp-icon-share slot="icon"></sp-icon-share>
                </sp-action-button>

                <!-- Collaboration Actions -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Invite Team')}
                >
                    Invite Team
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Comments')}
                >
                    Comments (3)
                </sp-button>

                <!-- Primary Actions -->
                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${handleAction('Export')}
                ></sp-action-button>
                <sp-button slot="end-actions" @click=${handleAction('Clone')}>
                    Clone Project
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Launch')}
                >
                    Launch Campaign
                </sp-button>

                <sp-badge slot="status" variant="positive">Active</sp-badge>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    85% complete
                </span>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    Due in 5 days
                </span>
            </sp-header>
        </div>
    `;
};


export const AccessibilityFeatures = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Accessibility Features - Action Slots</h3>

            <h4>Semantic Grouping with ARIA Labels</h4>
            <sp-header
                variant="l2"
                title="Accessible Action Header"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Edit')}
                    aria-label="Edit current document"
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Delete')}
                    aria-label="Delete current document"
                >
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Preview')}
                    aria-label="Preview document in new window"
                >
                    Preview
                </sp-button>

                <sp-button
                    slot="end-actions"
                    @click=${handleAction('Save Draft')}
                    aria-label="Save document as draft"
                >
                    Save Draft
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Publish')}
                    aria-label="Publish document publicly"
                >
                    Publish
                </sp-button>
            </sp-header>

            <p>
                <strong>Note:</strong>
                Each action slot group has proper ARIA roles and labels for
                screen readers.
            </p>
            <p>
                <strong>Keyboard Navigation:</strong>
                Use Tab to navigate between action groups, and arrow keys within
                groups.
            </p>
        </div>
    `;
};

export const ResponsiveBehavior = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Responsive Action Slots</h3>

            <h4>Desktop Layout (resize window to test)</h4>
            <sp-header
                variant="l2"
                title="Responsive Campaign Dashboard"
                show-back
                show-action-dividers
                editable-title
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Settings')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    Settings
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Share')}
                >
                    <sp-icon-share slot="icon"></sp-icon-share>
                    Share
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Clone Campaign')}
                >
                    Clone Campaign
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Analytics')}
                >
                    View Analytics
                </sp-button>

                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${handleAction('More Options')}
                >
                    <sp-icon-more slot="icon"></sp-icon-more>
                </sp-action-button>
                <sp-button
                    slot="end-actions"
                    @click=${handleAction('Export Data')}
                >
                    Export Data
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Launch')}
                >
                    Launch Campaign
                </sp-button>

                <sp-badge slot="status" variant="positive">Active</sp-badge>
                <span
                    slot="status"
                    style="color: var(--spectrum-neutral-content-color-subdued);"
                >
                    Updated 5 minutes ago
                </span>
            </sp-header>

            <p><strong>Responsive Features:</strong></p>
            <ul>
                <li>
                    Action slots maintain proper spacing at all screen sizes
                </li>
                <li>Dividers scale appropriately</li>
                <li>Focus indicators remain accessible</li>
                <li>
                    Text labels may hide on smaller screens
                    (component-dependent)
                </li>
            </ul>
        </div>
    `;
};

export const EdgeCases = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Edge Cases & Special Scenarios</h3>

            <h4>Single Action Group (Start Only)</h4>
            <sp-header
                variant="l2"
                title="Start Actions Only"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Edit')}
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                    Edit
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Delete')}
                >
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    Delete
                </sp-action-button>
            </sp-header>

            <h4>Single Action Group (End Only)</h4>
            <sp-header
                variant="l2"
                title="End Actions Only"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-button slot="end-actions" @click=${handleAction('Save')}>
                    Save
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Publish')}
                >
                    Publish
                </sp-button>
            </sp-header>

            <h4>Mixed Button Types</h4>
            <sp-header
                variant="l2"
                title="Mixed Button Styles"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Quick Action')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                </sp-action-button>

                <sp-action-button
                    slot="middle-actions"
                    @click=${handleAction('Action Button')}
                >
                    Action Button
                </sp-action-button>

                <sp-button
                    slot="end-actions"
                    quiet
                    @click=${handleAction('Quiet Button')}
                >
                    Quiet Button
                </sp-button>
                <sp-button
                    slot="end-actions"
                    @click=${handleAction('Standard Button')}
                >
                    Standard
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Accent Button')}
                >
                    Accent
                </sp-button>
            </sp-header>

            <h4>No Actions (Empty Slots)</h4>
            <sp-header
                variant="l2"
                title="No Action Buttons"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <!-- No action slots defined - should render cleanly -->
            </sp-header>

            <p>
                <strong>Note:</strong>
                All edge cases handle gracefully with proper spacing and divider
                logic.
            </p>
        </div>
    `;
};

export const SlotLimitations = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Action Slot Limitations</h3>
            <p>
                <strong>L1 Header:</strong> Maximum 2 action slots (start,
                end)<br />
                <strong>L2 Header:</strong> Maximum 3 action slots (start,
                middle, end)<br />
                <strong>Dividers:</strong> Only available for L2 headers with
                <code>show-action-dividers</code> property
            </p>

            <h4>L1 - Attempting Middle Actions (Invalid)</h4>
            <sp-header
                variant="l1"
                title="Invalid L1 Configuration"
                subtitle="Middle actions are not supported in L1"
            >
                <sp-button
                    slot="start-actions"
                    @click=${handleAction('Start')}
                >
                    Start
                </sp-button>

                <!-- This should NOT render in L1 -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Middle')}
                >
                    Middle (Hidden)
                </sp-button>

                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('End')}
                >
                    End
                </sp-button>
            </sp-header>

            <h4>L2 - All Valid Slots</h4>
            <sp-header
                variant="l2"
                title="Valid L2 Configuration"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-button
                    slot="start-actions"
                    @click=${handleAction('Start')}
                >
                    Start
                </sp-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Middle')}
                >
                    Middle
                </sp-button>

                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('End')}
                >
                    End
                </sp-button>
            </sp-header>

            <h4>Empty Slots Handling</h4>
            <sp-header
                variant="l2"
                title="Empty Slots Test"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <!-- Only middle actions provided -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Lonely Middle')}
                >
                    Only Middle
                </sp-button>
            </sp-header>
        </div>
    `;
};

export const OverflowBasicDemo = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Phase 9 - Overflow Handling Demo</h3>
            <p>
                Resize the window to see actions move to the overflow menu when
                space is limited.
            </p>

            <h4>Basic Overflow Behavior</h4>
            <sp-header
                variant="l2"
                title="Project Management Dashboard"
                show-back
                enable-overflow
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    data-priority="low"
                    @click=${handleAction('Settings')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    data-priority="medium"
                    @click=${handleAction('Export')}
                >
                    Export
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    data-priority="medium"
                    @click=${handleAction('Import')}
                >
                    Import
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    data-priority="high"
                    @click=${handleAction('Clone')}
                >
                    Clone Project
                </sp-button>

                <sp-button
                    slot="end-actions"
                    data-priority="critical"
                    variant="accent"
                    @click=${handleAction('Save')}
                >
                    Save Changes
                </sp-button>
                <sp-button
                    slot="end-actions"
                    data-priority="high"
                    @click=${handleAction('Publish')}
                >
                    Publish
                </sp-button>
            </sp-header>

            <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 6px;">
                <h5>Action Priorities in This Example:</h5>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>Critical:</strong> Save Changes (always visible)</li>
                    <li><strong>High:</strong> Clone Project, Publish</li>
                    <li><strong>Medium:</strong> Export, Import</li>
                    <li><strong>Low:</strong> Settings (first to overflow)</li>
                </ul>
            </div>
        </div>
    `;
};

export const OverflowMixedContent = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Overflow with Mixed Content Types</h3>

            <h4>Buttons, Action Buttons, and Icon Actions</h4>
            <sp-header
                variant="l2"
                title="Mixed Content Dashboard"
                show-back
                enable-overflow
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <!-- Icon-only actions (typically low priority) -->
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Edit')}
                    aria-label="Edit item"
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Delete')}
                    aria-label="Delete item"
                >
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Duplicate')}
                    aria-label="Duplicate item"
                >
                    <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                </sp-action-button>

                <!-- Text buttons (medium priority) -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Preview')}
                >
                    Preview
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Export')}
                >
                    Export
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Share')}
                >
                    Share
                </sp-button>

                <!-- Primary actions (high priority) -->
                <sp-button
                    slot="end-actions"
                    @click=${handleAction('Save Draft')}
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

            <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 6px;">
                <h5>Automatic Priority Detection:</h5>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><strong>Icon-only actions:</strong> Low priority (overflow first)</li>
                    <li><strong>Text buttons:</strong> Medium priority</li>
                    <li><strong>Accent buttons:</strong> High priority</li>
                    <li><strong>"Publish" text:</strong> Critical priority (always visible)</li>
                </ul>
            </div>
        </div>
    `;
};


export const OverflowAdvancedScenarios = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Advanced Overflow Scenarios</h3>

            <h4>Real-World Example: Document Editor</h4>
            <sp-header
                variant="l2"
                title="Annual Report 2024.docx"
                show-back
                enable-overflow
                editable-title
                @sp-header-back=${() => console.log('Back clicked')}
                @sp-header-title-renamed=${(event: CustomEvent) =>
                    console.log('Document renamed:', event.detail)}
            >
                <!-- File operations -->
                <sp-action-button
                    slot="start-actions"
                    quiet
                    data-priority="medium"
                    @click=${handleAction('Open File')}
                >
                    <sp-icon-folder-open slot="icon"></sp-icon-folder-open>
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    data-priority="low"
                    @click=${handleAction('Settings')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                </sp-action-button>

                <!-- Formatting tools -->
                <sp-button
                    slot="middle-actions"
                    size="s"
                    data-priority="medium"
                    @click=${handleAction('Bold')}
                >
                    B
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    size="s"
                    data-priority="medium"
                    @click=${handleAction('Italic')}
                >
                    I
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    size="s"
                    data-priority="low"
                    @click=${handleAction('Underline')}
                >
                    U
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    data-priority="low"
                    @click=${handleAction('Insert Table')}
                >
                    Table
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    data-priority="low"
                    @click=${handleAction('Insert Image')}
                >
                    Image
                </sp-button>

                <!-- Save operations -->
                <sp-button
                    slot="end-actions"
                    data-priority="high"
                    @click=${handleAction('Save')}
                >
                    Save
                </sp-button>
                <sp-button
                    slot="end-actions"
                    data-priority="medium"
                    @click=${handleAction('Export PDF')}
                >
                    Export PDF
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    data-priority="critical"
                    @click=${handleAction('Share')}
                >
                    Share
                </sp-button>
            </sp-header>

            <h4>E-commerce Admin: Product Management</h4>
            <sp-header
                variant="l2"
                title="Product: Wireless Headphones Pro"
                show-back
                enable-overflow
                max-visible-actions="4"
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <!-- Product actions -->
                <sp-action-button
                    slot="start-actions"
                    quiet
                    data-priority="medium"
                    @click=${handleAction('View Product')}
                >
                    <sp-icon-view slot="icon"></sp-icon-view>
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    data-priority="low"
                    @click=${handleAction('Duplicate')}
                >
                    <sp-icon-duplicate slot="icon"></sp-icon-duplicate>
                </sp-action-button>

                <!-- Inventory management -->
                <sp-button
                    slot="middle-actions"
                    data-priority="high"
                    @click=${handleAction('Update Stock')}
                >
                    Update Stock
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    data-priority="medium"
                    @click=${handleAction('Set Sale Price')}
                >
                    Set Sale
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    data-priority="medium"
                    @click=${handleAction('Manage Variants')}
                >
                    Variants
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    data-priority="low"
                    @click=${handleAction('View Analytics')}
                >
                    Analytics
                </sp-button>

                <!-- Publishing -->
                <sp-button
                    slot="end-actions"
                    data-priority="high"
                    @click=${handleAction('Save Draft')}
                >
                    Save Draft
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    data-priority="critical"
                    @click=${handleAction('Publish')}
                >
                    Publish
                </sp-button>
            </sp-header>

            <div style="margin-top: 20px; padding: 15px; background: #d4edda; border-radius: 6px;">
                <h5>✅ Phase 9 Features Demonstrated:</h5>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>✅ ResizeObserver-based responsive behavior</li>
                    <li>✅ Priority-based action management</li>
                    <li>✅ Overflow menu with action delegation</li>
                    <li>✅ Configurable overflow thresholds</li>
                    <li>✅ Maximum visible actions limits</li>
                    <li>✅ Smart action width estimation</li>
                    <li>✅ Seamless integration with existing features</li>
                </ul>
            </div>
        </div>
    `;
};

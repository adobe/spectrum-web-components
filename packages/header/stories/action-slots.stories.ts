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
                action-divider-size="m"
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
                action-divider-size="l"
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
                action-divider-size="m"
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

export const DividerComparison = (): TemplateResult => {
    const handleAction = (action: string) => () =>
        console.log(`${action} clicked`);

    return html`
        <div style="margin: 20px;">
            <h3>Action Divider Comparison</h3>

            <h4>Without Dividers</h4>
            <sp-header
                variant="l2"
                title="Standard Layout"
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
                    Clone
                </sp-button>

                <sp-button slot="end-actions" @click=${handleAction('Export')}>
                    Export
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Save')}
                >
                    Save
                </sp-button>
            </sp-header>

            <h4>With Small Dividers</h4>
            <sp-header
                variant="l2"
                title="With Small Dividers"
                show-back
                show-action-dividers
                action-divider-size="s"
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
                    Clone
                </sp-button>

                <sp-button slot="end-actions" @click=${handleAction('Export')}>
                    Export
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Save')}
                >
                    Save
                </sp-button>
            </sp-header>

            <h4>With Medium Dividers</h4>
            <sp-header
                variant="l2"
                title="With Medium Dividers"
                show-back
                show-action-dividers
                action-divider-size="m"
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
                    Clone
                </sp-button>

                <sp-button slot="end-actions" @click=${handleAction('Export')}>
                    Export
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Save')}
                >
                    Save
                </sp-button>
            </sp-header>

            <h4>With Large Dividers</h4>
            <sp-header
                variant="l2"
                title="With Large Dividers"
                show-back
                show-action-dividers
                action-divider-size="l"
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
                    Clone
                </sp-button>

                <sp-button slot="end-actions" @click=${handleAction('Export')}>
                    Export
                </sp-button>
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
            <h3>Action Slot Limitations by Variant</h3>

            <h4>L1 Header - Maximum 2 Slots (start-actions, end-actions)</h4>
            <sp-header
                variant="l1"
                title="L1 With Two Action Slots"
                subtitle="Start and end actions only"
            >
                <!-- Start Actions Slot -->
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

                <!-- End Actions Slot -->
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

                <!-- IMPORTANT: middle-actions slot is NOT available for L1 -->
                <!-- This would be ignored: <sp-button slot="middle-actions">Won't Show</sp-button> -->
            </sp-header>

            <h4>
                L2 Header - Maximum 3 Slots (start-actions, middle-actions,
                end-actions)
            </h4>
            <sp-header
                variant="l2"
                title="L2 With Three Action Slots"
                show-back
                show-action-dividers
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <!-- Start Actions Slot -->
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

                <!-- Middle Actions Slot (L2 ONLY) -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Clone')}
                >
                    Clone
                </sp-button>
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Preview')}
                >
                    Preview
                </sp-button>

                <!-- End Actions Slot -->
                <sp-button slot="end-actions" @click=${handleAction('Export')}>
                    Export
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Save')}
                >
                    Save Changes
                </sp-button>
            </sp-header>

            <h4>L1 Attempted with Middle Actions (Won't Render)</h4>
            <sp-header
                variant="l1"
                title="L1 Ignores Middle Actions"
                subtitle="Middle actions are ignored in L1 variant"
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Settings')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    Settings
                </sp-action-button>

                <!-- This middle-actions slot will NOT render in L1 -->
                <sp-button
                    slot="middle-actions"
                    @click=${handleAction('Ignored')}
                >
                    This Won't Show
                </sp-button>

                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Publish')}
                >
                    Publish
                </sp-button>
            </sp-header>

            <div
                style="background: #f0f8ff; padding: 16px; border-radius: 8px; margin-top: 16px;"
            >
                <h4 style="margin-top: 0;">📋 Action Slot Constraints</h4>
                <ul>
                    <li>
                        <strong>L1 Header:</strong>
                        Maximum 2 action slots
                        <ul>
                            <li>
                                ✅
                                <code>start-actions</code>
                                - Left-aligned actions
                            </li>
                            <li>
                                ❌
                                <code>middle-actions</code>
                                - Not available in L1
                            </li>
                            <li>
                                ✅
                                <code>end-actions</code>
                                - Right-aligned actions
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>L2 Header:</strong>
                        Maximum 3 action slots
                        <ul>
                            <li>
                                ✅
                                <code>start-actions</code>
                                - Left-aligned actions
                            </li>
                            <li>
                                ✅
                                <code>middle-actions</code>
                                - Center actions (L2 only)
                            </li>
                            <li>
                                ✅
                                <code>end-actions</code>
                                - Right-aligned actions
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>Dividers:</strong>
                        Only available for L2 headers with
                        <code>show-action-dividers</code>
                    </li>
                    <li>
                        <strong>Multiple Actions:</strong>
                        Each slot can contain multiple buttons
                    </li>
                </ul>
            </div>
        </div>
    `;
};

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

export default {
    title: 'Header/Figma Examples',
    component: 'sp-header',
};

export const FigmaL1Examples = (): TemplateResult => html`
    <div
        style="display: flex; flex-direction: column; gap: 2rem; background: #f5f5f5; padding: 2rem;"
    >
        <!-- L1 Example 1: Create -->
        <div style="background: white; border-radius: 8px; overflow: hidden;">
            <sp-header
                variant="l1"
                title="Create"
                subtitle="This report analyzes underperforming creative assets to uncover areas of improvement and growth opportunities. It highlights key metrics"
            >
                <sp-button slot="end-actions" variant="accent">Next</sp-button>
            </sp-header>
        </div>

        <!-- L1 Example 2: Campaigns -->
        <div style="background: white; border-radius: 8px; overflow: hidden;">
            <sp-header
                variant="l1"
                title="Campaigns"
                subtitle="This report analyzes underperforming creative assets to uncover areas of improvement and growth opportunities. It highlights key metrics"
            >
                <sp-button slot="end-actions">Label</sp-button>
                <sp-button slot="end-actions" variant="accent">Label</sp-button>
            </sp-header>
        </div>

        <!-- L1 Example 3: Insights -->
        <div style="background: white; border-radius: 8px; overflow: hidden;">
            <sp-header
                variant="l1"
                title="Insights"
                subtitle="This report analyzes underperforming creative assets to uncover areas of improvement and growth opportunities. It highlights key metrics"
            >
                <sp-button slot="end-actions">Label</sp-button>
                <sp-button slot="end-actions">Label</sp-button>
                <sp-button slot="end-actions">Label</sp-button>
                <sp-button slot="end-actions">Label</sp-button>
                <sp-button slot="end-actions" variant="accent">Label</sp-button>
            </sp-header>
        </div>
    </div>
`;

export const FigmaL2Examples = (): TemplateResult => {
    const handleEditSave = (event: CustomEvent) => {
        console.log('Title saved:', event.detail.newTitle);
        // Prevent default to handle the save externally
        event.preventDefault();
    };

    return html`
        <div
            style="display: flex; flex-direction: column; gap: 2rem; background: #f5f5f5; padding: 2rem;"
        >
            <!-- L2 Example 1: New Meta Ads activation -->
            <div
                style="background: white; border-radius: 8px; overflow: hidden;"
            >
                <sp-header
                    variant="l2"
                    title="New Meta Ads activation"
                    show-back
                >
                    <sp-button slot="end-actions" variant="accent">
                        Next
                    </sp-button>
                </sp-header>
            </div>

            <!-- L2 Example 2: Campaign with status -->
            <div
                style="background: white; border-radius: 8px; overflow: hidden;"
            >
                <sp-header
                    variant="l2"
                    title="Q1 2025 Kayak Adventures - Meta Campaign"
                    show-back
                >
                    <sp-badge slot="status" variant="positive">
                        Published
                    </sp-badge>
                    <span
                        slot="status"
                        style="color: var(--spectrum-neutral-content-color-subdued);"
                    >
                        Saved just now
                    </span>
                </sp-header>
            </div>

            <!-- L2 Example 3: Google DV360 -->
            <div
                style="background: white; border-radius: 8px; overflow: hidden;"
            >
                <sp-header variant="l2" title="Google DV360" show-back>
                    <sp-button slot="end-actions" variant="accent">
                        New activation
                    </sp-button>
                </sp-header>
            </div>

            <!-- L2 Example 4: Page title with labels -->
            <div
                style="background: white; border-radius: 8px; overflow: hidden;"
            >
                <sp-header variant="l2" title="Page title" show-back>
                    <sp-button slot="end-actions">Label</sp-button>
                    <sp-button slot="end-actions">Label</sp-button>
                    <sp-button slot="end-actions">Label</sp-button>
                    <sp-button slot="end-actions">Label</sp-button>
                    <sp-button slot="end-actions" variant="accent">
                        Label
                    </sp-button>
                    <sp-badge slot="status" variant="neutral">Label</sp-badge>
                    <sp-badge slot="status" variant="neutral">Label</sp-badge>
                    <sp-badge slot="status" variant="neutral">Label</sp-badge>
                    <sp-badge slot="status" variant="neutral">Label</sp-badge>
                    <sp-badge slot="status" variant="neutral">Label</sp-badge>
                </sp-header>
            </div>

            <!-- L2 Example 5: Editable page title -->
            <div
                style="background: white; border-radius: 8px; overflow: hidden;"
            >
                <sp-header
                    variant="l2"
                    title="Page title"
                    show-back
                    editable-title
                    @sp-header-edit-save=${handleEditSave}
                >
                    <sp-button slot="end-actions">Export</sp-button>
                    <sp-action-button slot="end-actions" quiet>
                        <sp-icon-more slot="icon"></sp-icon-more>
                    </sp-action-button>
                    <sp-button slot="end-actions" variant="accent">
                        Publish
                    </sp-button>
                </sp-header>
            </div>

            <!-- L2 Example 6: WK'ND Spring Meta -->
            <div
                style="background: white; border-radius: 8px; overflow: hidden;"
            >
                <sp-header
                    variant="l2"
                    title="WK'ND Spring Meta"
                    show-back
                    editable-title
                    @sp-header-edit-save=${handleEditSave}
                >
                    <span
                        slot="status"
                        style="color: var(--spectrum-neutral-content-color-subdued);"
                    >
                        95% ▼
                    </span>
                    <span
                        slot="status"
                        style="color: var(--spectrum-neutral-content-color-subdued);"
                    >
                        1 of 3 Templates
                    </span>
                    <sp-action-button slot="end-actions" quiet>
                        <sp-icon-edit slot="icon"></sp-icon-edit>
                    </sp-action-button>
                    <sp-action-button slot="end-actions" quiet>
                        <sp-icon-delete slot="icon"></sp-icon-delete>
                    </sp-action-button>
                </sp-header>
            </div>
        </div>
    `;
};

export const FigmaSpacingDemo = (): TemplateResult => html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
        <h3>Spacing Guidelines (from Figma)</h3>
        <div
            style="background: white; border: 2px dashed #ccc; position: relative;"
        >
            <sp-header
                variant="l1"
                title="Settings"
                subtitle="Component spacing demonstration"
            >
                <sp-action-button slot="start-actions" quiet>
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    Settings
                </sp-action-button>
                <sp-button slot="end-actions">Save</sp-button>
                <sp-button slot="end-actions" variant="accent">Next</sp-button>
            </sp-header>
            <!-- Spacing indicators would go here in a real design tool -->
        </div>
    </div>
`;

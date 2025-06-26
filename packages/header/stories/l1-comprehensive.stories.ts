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
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-star.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-export.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';

export default {
    title: 'Header/L1 Comprehensive',
    component: 'sp-header',
    parameters: {
        docs: {
            description: {
                component: `
# L1 Header Implementation - Phase 3 Complete

This demonstrates the completed Phase 3 implementation featuring:

- ✅ **Title and subtitle slots** - Both property-based and slot-based content
- ✅ **Start and end action slots** - Flexible slot management
- ✅ **Proper slot management** - Focus control and keyboard navigation

## Slot Features:

### Title & Subtitle Slots
- **title slot**: Supports rich content, falls back to title property
- **subtitle slot**: Supports rich content, falls back to subtitle property

### Action Slots
- **start-actions slot**: Left-aligned action buttons
- **end-actions slot**: Right-aligned action buttons
- **Focus management**: Automatic keyboard navigation between action slots

## Usage Patterns:

1. **Property-based**: Use \`title\` and \`subtitle\` properties for simple text
2. **Slot-based**: Use \`slot="title"\` and \`slot="subtitle"\` for rich content
3. **Mixed**: Can combine property and slot approaches as needed
                `,
            },
        },
    },
};

// Test 1: Basic L1 with properties
export const BasicL1Properties = (): TemplateResult => html`
    <sp-header
        variant="l1"
        title="Dashboard Overview"
        subtitle="Complete analytics and performance metrics for your campaign portfolio"
    >
        <sp-action-button slot="end-actions" variant="accent">
            <sp-icon-settings slot="icon"></sp-icon-settings>
            Settings
        </sp-action-button>
        <sp-button slot="end-actions" variant="primary">Publish</sp-button>
    </sp-header>
`;
BasicL1Properties.parameters = {
    docs: {
        description: {
            story: 'Basic L1 header using title and subtitle properties with end actions.',
        },
    },
};

// Test 2: L1 with slotted content
export const L1WithSlottedContent = (): TemplateResult => html`
    <sp-header variant="l1">
        <span slot="title">
            <strong>Project</strong>
            <em>Portfolio</em>
                            <sp-status-light variant="positive">New</sp-status-light>
        </span>
        <span slot="subtitle">
            Comprehensive project management dashboard featuring
            <strong>real-time collaboration</strong>
            and advanced analytics
        </span>
        <sp-action-button slot="start-actions" quiet>
            <sp-icon-star slot="icon"></sp-icon-star>
            Favorite
        </sp-action-button>
        <sp-action-button slot="end-actions" quiet>
            <sp-icon-more slot="icon"></sp-icon-more>
        </sp-action-button>
        <sp-button slot="end-actions" variant="accent">Export</sp-button>
    </sp-header>
`;
L1WithSlottedContent.parameters = {
    docs: {
        description: {
            story: 'L1 header using rich slotted content for title and subtitle, with both start and end actions.',
        },
    },
};

// Test 3: Multiple action slots
export const L1MultipleActions = (): TemplateResult => html`
    <sp-header
        variant="l1"
        title="Analytics Dashboard"
        subtitle="Track performance metrics and optimize your campaigns"
    >
        <sp-action-button slot="start-actions" quiet>
            <sp-icon-settings slot="icon"></sp-icon-settings>
            Settings
        </sp-action-button>
        <sp-action-button slot="start-actions" quiet>
            <sp-icon-bookmark slot="icon"></sp-icon-bookmark>
            Bookmark
        </sp-action-button>
        <sp-action-button slot="start-actions" quiet>
            <sp-icon-help slot="icon"></sp-icon-help>
            Help
        </sp-action-button>
        <sp-action-button slot="end-actions" quiet>
            <sp-icon-export slot="icon"></sp-icon-export>
            Export
        </sp-action-button>
        <sp-action-button slot="end-actions" quiet>
            <sp-icon-more slot="icon"></sp-icon-more>
        </sp-action-button>
        <sp-button slot="end-actions" variant="secondary">Save Draft</sp-button>
        <sp-button slot="end-actions" variant="accent">Publish</sp-button>
    </sp-header>
`;
L1MultipleActions.parameters = {
    docs: {
        description: {
            story: 'L1 header with multiple start and end actions to test slot management and focus control.',
        },
    },
};

// Test 4: Minimal L1
export const L1Minimal = (): TemplateResult => html`
    <sp-header variant="l1" title="Simple Page Title"></sp-header>
`;
L1Minimal.parameters = {
    docs: {
        description: {
            story: 'Minimal L1 header with just a title, no subtitle or actions.',
        },
    },
};

// Test 5: L1 with only subtitle slot
export const L1OnlySubtitleSlot = (): TemplateResult => html`
    <sp-header variant="l1" title="Standard Title">
        <div slot="subtitle">
            <em>Rich subtitle content</em>
            with
                            <sp-status-light variant="neutral">Status</sp-status-light>
            and additional formatting
        </div>
    </sp-header>
`;
L1OnlySubtitleSlot.parameters = {
    docs: {
        description: {
            story: 'L1 header mixing property-based title with rich slotted subtitle.',
        },
    },
};

// Test 6: L1 with only title slot
export const L1OnlyTitleSlot = (): TemplateResult => html`
    <sp-header variant="l1" subtitle="Standard subtitle text">
        <div slot="title">
                            <sp-status-light variant="info">Featured</sp-status-light>
            <strong>Rich Title Content</strong>
        </div>
        <sp-action-button slot="end-actions" variant="accent">
            Action
        </sp-action-button>
    </sp-header>
`;
L1OnlyTitleSlot.parameters = {
    docs: {
        description: {
            story: 'L1 header mixing rich slotted title with property-based subtitle.',
        },
    },
};

// Test 7: Start actions only
export const L1StartActionsOnly = (): TemplateResult => html`
    <sp-header
        variant="l1"
        title="Left-aligned Actions"
        subtitle="Demonstrating start actions slot usage"
    >
        <sp-action-button slot="start-actions" quiet>
            <sp-icon-settings slot="icon"></sp-icon-settings>
            Settings
        </sp-action-button>
        <sp-action-button slot="start-actions" quiet>
            <sp-icon-star slot="icon"></sp-icon-star>
            Favorite
        </sp-action-button>
    </sp-header>
`;
L1StartActionsOnly.parameters = {
    docs: {
        description: {
            story: 'L1 header with only start actions to test left-aligned slot behavior.',
        },
    },
};

// Test 8: Long content
export const L1LongContent = (): TemplateResult => html`
    <sp-header
        variant="l1"
        title="Very Long Title That Demonstrates Text Overflow Behavior and Responsive Design Considerations"
        subtitle="This is an extremely long subtitle that contains extensive descriptive text to thoroughly test how the component handles text overflow, wrapping behavior, and responsive design across different screen sizes and viewport widths while maintaining proper layout and accessibility"
    >
        <sp-action-button slot="start-actions" quiet>
            Start Action 1
        </sp-action-button>
        <sp-action-button slot="start-actions" quiet>
            Start Action 2
        </sp-action-button>
        <sp-action-button slot="start-actions" quiet>
            Start Action 3
        </sp-action-button>
        <sp-action-button slot="end-actions" quiet>
            End Action 1
        </sp-action-button>
        <sp-action-button slot="end-actions" quiet>
            End Action 2
        </sp-action-button>
        <sp-button slot="end-actions" variant="accent">
            Primary Action
        </sp-button>
    </sp-header>
`;
L1LongContent.parameters = {
    docs: {
        description: {
            story: 'L1 header with long content to test text overflow and responsive behavior.',
        },
    },
};

// Interactive demo
export const L1InteractiveDemo = (): TemplateResult => {
    const handleActionClick = (action: string) => {
        console.log(`${action} clicked`);
        alert(`${action} action triggered!`);
    };

    return html`
        <sp-header variant="l1">
            <span slot="title">
                Interactive Demo
                <sp-status-light variant="positive">Live</sp-status-light>
            </span>
            <span slot="subtitle">
                Click actions to test slot functionality and event handling
            </span>
            <sp-action-button
                slot="start-actions"
                quiet
                @click=${() => handleActionClick('Settings')}
            >
                <sp-icon-settings slot="icon"></sp-icon-settings>
                Settings
            </sp-action-button>
            <sp-action-button
                slot="start-actions"
                quiet
                @click=${() => handleActionClick('Bookmark')}
            >
                <sp-icon-bookmark slot="icon"></sp-icon-bookmark>
                Bookmark
            </sp-action-button>
            <sp-action-button
                slot="end-actions"
                quiet
                @click=${() => handleActionClick('Export')}
            >
                <sp-icon-export slot="icon"></sp-icon-export>
                Export
            </sp-action-button>
            <sp-button
                slot="end-actions"
                variant="accent"
                @click=${() => handleActionClick('Publish')}
            >
                Publish
            </sp-button>
        </sp-header>
    `;
};
L1InteractiveDemo.parameters = {
    docs: {
        description: {
            story: 'Interactive L1 header demo with clickable actions to test slot functionality.',
        },
    },
};

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
import { HeaderValidationError } from '@spectrum-web-components/header';

import '@spectrum-web-components/header/sp-header.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/status-light/sp-status-light.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-star.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';

export default {
    title: 'Header/Accessibility & Testing',
    component: 'sp-header',
    parameters: {
        docs: {
            description: {
                component: `
# Header Accessibility & Testing

Comprehensive accessibility features and testing scenarios for the header component.

## ✅ Accessibility Features

### Key Accessibility Features:

- **Proper ARIA Structure**: Banner role, heading levels, group roles, and semantic markup
- **Enhanced Focus Management**: Smart focus order with context-aware navigation
- **Screen Reader Support**: ARIA labels, live regions, and proper announcements
- **Keyboard Navigation**: Full keyboard support with proper tab order
- **Error Handling**: Accessible validation with role="alert" and aria-live regions
- **High Contrast Support**: Focus indicators and visual feedback compatible with high contrast mode

### Testing Guidelines:

1. **Screen Reader Testing**: Use NVDA, JAWS, or VoiceOver to verify announcements
2. **Keyboard Navigation**: Tab through all interactive elements
3. **Focus Management**: Check focus indicators and tab order
4. **Color Contrast**: Verify accessibility in high contrast mode
5. **Responsive Behavior**: Test at different screen sizes

### ARIA Roles and Labels:

- \`role="banner"\` - Main header landmark
- \`role="heading"\` with \`aria-level\` - Proper heading hierarchy
- \`role="group"\` - Semantic grouping for actions and status
- \`role="alert"\` - Error announcements
- \`aria-live="polite"\` - Live region updates
- \`aria-describedby\` - Associate errors with inputs
- \`aria-invalid\` - Form validation states

### Keyboard Shortcuts:

- **Tab** - Navigate between interactive elements
- **Enter/Space** - Activate buttons and editable title
- **Escape** - Cancel edit mode
- **Arrow Keys** - Navigate within action groups (via FocusGroupController)
                `,
            },
        },
    },
};

// Complete L1 Accessibility Demo
export const L1AccessibilityDemo = (): TemplateResult => {
    const handleAction = (action: string) => () => {
        console.log(`${action} action triggered`);
        // Simulate screen reader announcement
        const announcement = `${action} action activated`;
        console.log(`Screen reader: ${announcement}`);
    };

    return html`
        <div style="margin: 20px 0;">
            <h3>L1 Header - Complete Accessibility Implementation</h3>
            <p>
                <strong>Testing Instructions:</strong>
                <br />
                1. Use Tab to navigate through elements
                <br />
                2. Test with screen reader (role="banner", heading levels)
                <br />
                3. Verify focus indicators are visible
                <br />
                4. Check action group semantics with aria-labels
            </p>

            <sp-header
                variant="l1"
                title="Accessible Dashboard"
                subtitle="Complete accessibility implementation with ARIA landmarks and semantic markup"
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Settings')}
                    aria-label="Open application settings"
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                    Settings
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleAction('Favorite')}
                    aria-label="Add to favorites"
                >
                    <sp-icon-star slot="icon"></sp-icon-star>
                    Favorite
                </sp-action-button>

                <sp-button
                    slot="end-actions"
                    @click=${handleAction('Save')}
                    aria-label="Save current changes"
                >
                    Save
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleAction('Create New')}
                    aria-label="Create new item"
                >
                    Create New
                </sp-button>
            </sp-header>

            <div
                style="background: #f5f5f5; padding: 15px; margin-top: 15px; border-radius: 4px;"
            >
                <strong>Accessibility Features:</strong>
                <br />
                ✅ role="banner" on header element
                <br />
                ✅ role="heading" with aria-level="1" on title
                <br />
                ✅ role="group" with aria-labels on action slots
                <br />
                ✅ Enhanced focus management with smart tab order
                <br />
                ✅ Screen reader friendly button labels
                <br />
                ✅ High contrast mode support
            </div>
        </div>
    `;
};

// L2 Editable Title Accessibility
export const L2EditableAccessibilityDemo = (): TemplateResult => {
    const validation = (value: string): HeaderValidationError[] | null => {
        if (value.length === 0) {
            return [{ type: 'empty', message: 'Title cannot be empty' }];
        }
        if (value.length > 50) {
            return [
                {
                    type: 'length',
                    message: 'Title must be 50 characters or less',
                },
            ];
        }
        return null;
    };

    const handleTitleSave = (event: CustomEvent) => {
        console.log('Title saved:', event.detail);
        // Simulate screen reader announcement
        const announcement = `Page title updated to: ${event.detail.newTitle}`;
        console.log(`Screen reader: ${announcement}`);
    };

    const handleBack = () => {
        console.log('Back navigation triggered');
        console.log('Screen reader: Navigating back to previous page');
    };

    return html`
        <div style="margin: 20px 0;">
            <h3>L2 Header - Editable Title Accessibility</h3>
            <p>
                <strong>Testing Instructions:</strong>
                <br />
                1. Tab to back button, then title, then edit button
                <br />
                2. Click title or edit button to enter edit mode
                <br />
                3. Test error validation with empty or long text
                <br />
                4. Use Enter to save, Escape to cancel
                <br />
                5. Verify error announcements and focus management
            </p>
            <sp-header
                variant="l2"
                title="Accessible Editable Title - Test Keyboard Navigation"
                editable-title
                show-back
                .titleValidation=${validation}
                @sp-header-back=${handleBack}
                @sp-header-edit-save=${handleTitleSave}
            >
                <sp-status-light slot="status" variant="info">
                    Accessibility Test
                </sp-status-light>
                <span slot="status">Focus management active</span>
                <sp-button slot="end-actions" aria-label="Save all changes">
                    Save Changes
                </sp-button>
            </sp-header>

            <div
                style="background: #f5f5f5; padding: 15px; margin-top: 15px; border-radius: 4px;"
            >
                <strong>L2 Accessibility Features:</strong>
                <br />
                ✅ role="heading" with aria-level="2" for sub-page context
                <br />
                ✅ Edit state announced with aria-live regions
                <br />
                ✅ Error states with role="alert" for immediate attention
                <br />
                ✅ Smart focus restoration after edit operations
                <br />
                ✅ Keyboard shortcuts (Enter/Escape) properly handled
                <br />
                ✅ Screen reader friendly edit workflow
            </div>
        </div>
    `;
};

// Keyboard Navigation Test
export const KeyboardNavigationTest = (): TemplateResult => {
    const focusLog: string[] = [];

    const trackFocus = (element: string) => () => {
        focusLog.push(`Focus: ${element}`);
        console.log(`Focus moved to: ${element}`);

        // Update display
        const logElement = document.querySelector('#focus-log');
        if (logElement) {
            logElement.innerHTML = focusLog
                .slice(-5)
                .map((log) => `<div>${log}</div>`)
                .join('');
        }
    };

    const handleAction = (action: string) => () => {
        console.log(`Action: ${action}`);
        focusLog.push(`Action: ${action}`);
    };

    return html`
        <div style="margin: 20px 0;">
            <h3>Keyboard Navigation Testing</h3>
            <p>
                <strong>Keyboard Test Instructions:</strong>
                <br />
                1. Use Tab to navigate through all interactive elements
                <br />
                2. Use Shift+Tab to navigate backwards
                <br />
                3. Use Enter/Space to activate buttons
                <br />
                4. Click on title to enter edit mode, then test keyboard
                shortcuts
                <br />
                5. Watch the focus log below to track navigation
            </p>

            <sp-header
                variant="l2"
                title="Keyboard Navigation Test Header"
                editable-title
                show-back
                @sp-header-back=${() => {
                    trackFocus('Back Button')();
                    handleAction('Back')();
                }}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${() => {
                        trackFocus('Start Action 1')();
                        handleAction('Start 1')();
                    }}
                    @focus=${trackFocus('Start Action 1')}
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${() => {
                        trackFocus('Start Action 2')();
                        handleAction('Start 2')();
                    }}
                    @focus=${trackFocus('Start Action 2')}
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${() => {
                        trackFocus('Middle Action')();
                        handleAction('Middle')();
                    }}
                    @focus=${trackFocus('Middle Action')}
                >
                    Preview
                </sp-button>

                <sp-button
                    slot="end-actions"
                    @click=${() => {
                        trackFocus('End Action 1')();
                        handleAction('End 1')();
                    }}
                    @focus=${trackFocus('End Action 1')}
                >
                    Save
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${() => {
                        trackFocus('End Action 2')();
                        handleAction('End 2')();
                    }}
                    @focus=${trackFocus('End Action 2')}
                >
                    Publish
                </sp-button>

                <sp-status-light slot="status" variant="info">
                    Testing
                </sp-status-light>
                <span slot="status">Keyboard navigation active</span>
            </sp-header>

            <div
                style="background: #f5f5f5; padding: 15px; margin-top: 15px; border-radius: 4px;"
            >
                <strong>Focus Log (Last 5 Events):</strong>
                <div
                    id="focus-log"
                    style="margin-top: 8px; font-family: monospace; font-size: 12px;"
                ></div>
            </div>

            <div
                style="background: #e3f2fd; padding: 15px; margin-top: 15px; border-radius: 4px;"
            >
                <strong>Expected Tab Order:</strong>
                <br />
                1. Back Button → 2. Title (when editable) → 3. Start Actions →
                4. Middle Actions → 5. End Actions
                <br />
                <strong>In Edit Mode:</strong>
                Title Input → Save Button → Cancel Button
            </div>
        </div>
    `;
};

// Screen Reader Test
export const ScreenReaderTest = (): TemplateResult => {
    const simulateScreenReader = (message: string) => {
        console.log(`Screen Reader: ${message}`);
        // In a real implementation, this would trigger actual screen reader announcements
    };

    const handleInteraction = (action: string) => () => {
        console.log(`User action: ${action}`);

        // Simulate different screen reader announcements
        switch (action) {
            case 'navigate-to-header':
                simulateScreenReader('Banner landmark, Page header');
                break;
            case 'read-title':
                simulateScreenReader(
                    'Heading level 2, Screen Reader Testing Dashboard'
                );
                break;
            case 'enter-edit':
                simulateScreenReader(
                    'Edit mode activated, Title text field, Screen Reader Testing Dashboard'
                );
                break;
            case 'validation-error':
                simulateScreenReader('Alert: Title cannot be empty');
                break;
            case 'save-success':
                simulateScreenReader('Title updated successfully');
                break;
            default:
                simulateScreenReader(`${action} button activated`);
        }
    };

    return html`
        <div style="margin: 20px 0;">
            <h3>Screen Reader Compatibility Test</h3>
            <p>
                <strong>Screen Reader Test Instructions:</strong>
                <br />
                1. Test with NVDA, JAWS, or VoiceOver
                <br />
                2. Navigate by landmarks (banner role)
                <br />
                3. Navigate by headings (heading roles)
                <br />
                4. Test edit workflow announcements
                <br />
                5. Check status indicator readings
                <br />
                6. Verify error state announcements
            </p>

            <sp-header
                variant="l2"
                title="Screen Reader Testing Dashboard"
                editable-title
                show-back
                @sp-header-back=${handleInteraction('Back Navigation')}
                @sp-header-edit-start=${handleInteraction('Edit Start')}
                @sp-header-edit-save=${handleInteraction('Save Success')}
            >
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${handleInteraction('Quick Edit')}
                    aria-label="Quick edit options"
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>

                <sp-button
                    slot="middle-actions"
                    @click=${handleInteraction('Preview Mode')}
                    aria-label="Enter preview mode"
                >
                    Preview
                </sp-button>

                <sp-button
                    slot="end-actions"
                    @click=${handleInteraction('Save Draft')}
                    aria-label="Save current changes as draft"
                >
                    Save Draft
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${handleInteraction('Publish Content')}
                    aria-label="Publish content immediately"
                >
                    Publish
                </sp-button>

                <sp-status-light
                    slot="status"
                    variant="positive"
                    aria-label="Status: Published"
                >
                    Published
                </sp-status-light>
                <span slot="status" role="status" aria-label="Last update time">
                    Updated 5 minutes ago
                </span>
                <span
                    slot="status"
                    role="status"
                    aria-label="Completion percentage"
                >
                    85% Complete
                </span>
            </sp-header>

            <div
                style="background: #f5f5f5; padding: 15px; margin-top: 15px; border-radius: 4px;"
            >
                <strong>Screen Reader Features:</strong>
                <br />
                ✅ Banner landmark for page header identification
                <br />
                ✅ Proper heading hierarchy (aria-level based on variant)
                <br />
                ✅ Descriptive ARIA labels for all interactive elements
                <br />
                ✅ Role="status" for dynamic content
                <br />
                ✅ Role="alert" for validation errors
                <br />
                ✅ Live regions for state change announcements
            </div>
        </div>
    `;
};

// Comprehensive Testing Scenario
export const ComprehensiveTestingScenario = (): TemplateResult => {
    const validation = (value: string): HeaderValidationError[] | null => {
        if (value.length === 0)
            return [{ type: 'empty', message: 'Title cannot be empty' }];
        if (value.length > 60)
            return [{ type: 'length', message: 'Title too long' }];
        return null;
    };

    const events: string[] = [];
    const logEvent = (eventName: string) => (event: CustomEvent) => {
        events.push(`${new Date().toLocaleTimeString()}: ${eventName}`);
        console.log(`${eventName}:`, event.detail);

        const logElement = document.querySelector('#comprehensive-event-log');
        if (logElement) {
            logElement.innerHTML = events
                .slice(-8)
                .map((event) => `<div>${event}</div>`)
                .join('');
        }
    };

    return html`
        <div style="margin: 20px 0;">
            <h3>Comprehensive Testing Scenario</h3>
            <p>
                <strong>Complete Feature Test:</strong>
                <br />
                This scenario tests all major features together:
                <br />
                • L2 header with all action regions
                <br />
                • Editable title with validation
                <br />
                • Status indicators
                <br />
                • Complete accessibility implementation
                <br />
                • Event logging and debugging
            </p>

            <sp-header
                variant="l2"
                title="Complete Feature Testing Dashboard - Edit Me!"
                editable-title
                show-back
                enable-overflow
                overflow-threshold="800"
                .titleValidation=${validation}
                @sp-header-back=${logEvent('Back Clicked')}
                @sp-header-edit-start=${logEvent('Edit Started')}
                @sp-header-edit-save=${logEvent('Edit Save Attempted')}
                @sp-header-edit-cancel=${logEvent('Edit Cancelled')}
                @sp-header-title-renamed=${logEvent(
                    'Title Successfully Renamed'
                )}
            >
                <!-- Start Actions -->
                <sp-action-button
                    slot="start-actions"
                    quiet
                    data-priority="1"
                    aria-label="Quick edit mode"
                >
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    data-priority="2"
                    aria-label="Application settings"
                >
                    <sp-icon-settings slot="icon"></sp-icon-settings>
                </sp-action-button>

                <!-- Middle Actions -->
                <sp-button slot="middle-actions" data-priority="3">
                    Preview
                </sp-button>
                <sp-button slot="middle-actions" data-priority="4">
                    History
                </sp-button>

                <!-- End Actions -->
                <sp-action-button
                    slot="end-actions"
                    quiet
                    data-priority="6"
                    aria-label="More options"
                >
                    <sp-icon-more slot="icon"></sp-icon-more>
                </sp-action-button>
                <sp-button slot="end-actions" data-priority="2">
                    Save Draft
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
                    Active
                </sp-status-light>
                <span slot="status">Last saved: 3 minutes ago</span>
                <span slot="status">92% Complete</span>
                <sp-status-light slot="status" variant="notice">
                    Review Pending
                </sp-status-light>
            </sp-header>

            <div
                style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;"
            >
                <div
                    style="background: #f5f5f5; padding: 15px; border-radius: 4px;"
                >
                    <strong>Test Checklist:</strong>
                    <br />
                    ✅ L1/L2 variants
                    <br />
                    ✅ Editable title workflow
                    <br />
                    ✅ Action slot management
                    <br />
                    ✅ Status indicators
                    <br />
                    ✅ Overflow handling
                    <br />
                    ✅ Validation & error states
                    <br />
                    ✅ Keyboard navigation
                    <br />
                    ✅ Screen reader support
                    <br />
                    ✅ Event system
                    <br />
                    ✅ Responsive behavior
                </div>

                <div
                    style="background: #e3f2fd; padding: 15px; border-radius: 4px;"
                >
                    <strong>Event Log (Last 8 Events):</strong>
                    <div
                        id="comprehensive-event-log"
                        style="margin-top: 8px; font-family: monospace; font-size: 12px; max-height: 120px; overflow-y: auto;"
                    ></div>
                </div>
            </div>
        </div>
    `;
};

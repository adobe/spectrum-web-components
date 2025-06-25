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
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';

export default {
    title: 'Header/Testing Scenarios',
    component: 'sp-header',
    parameters: {
        docs: {
            description: {
                component: `
# Header Testing Scenarios

Comprehensive testing scenarios for header component development and QA validation.

## Testing Categories:

- **Functionality Testing**: Core features, edit workflow, event handling
- **Responsive Design**: Different screen sizes and breakpoints
- **Accessibility Testing**: Keyboard navigation, screen readers, ARIA
- **Performance Testing**: Large datasets, rapid interactions
- **Edge Cases**: Boundary conditions, unusual inputs
- **Integration Testing**: With other components and systems
- **Cross-browser Compatibility**: Different browsers and devices
- **User Experience**: Real-world usage scenarios

## Test Coverage:

✅ L1 and L2 variants  
✅ Editable title workflow  
✅ Action slot management  
✅ Status indicators  
✅ Error handling  
✅ Keyboard navigation  
✅ Screen reader compatibility  
✅ Responsive behavior  
✅ Performance optimization  
                `,
            },
        },
    },
};

// Test 1: Complete L1 Functionality
export const L1FunctionalityTest = (): TemplateResult => {
    const handleActionClick = (action: string) => {
        console.log(`${action} action clicked`);
    };

    return html`
        <div style="max-width: 800px;">
            <h3>L1 Complete Functionality Test</h3>
            <p>
                <strong>Test Checklist:</strong>
                <br />
                ✓ Title and subtitle display
                <br />
                ✓ Start and end action slots
                <br />
                ✓ Multiple action buttons
                <br />
                ✓ Click event handling
                <br />
                ✓ Responsive layout
            </p>
            <sp-header
                variant="l1"
                title="Dashboard Analytics Platform"
                subtitle="Comprehensive data visualization and business intelligence suite for enterprise teams"
            >
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
                    <sp-icon-star slot="icon"></sp-icon-star>
                    Bookmark
                </sp-action-button>
                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${() => handleActionClick('More')}
                >
                    <sp-icon-more slot="icon"></sp-icon-more>
                </sp-action-button>
                <sp-button
                    slot="end-actions"
                    variant="secondary"
                    @click=${() => handleActionClick('Export')}
                >
                    Export Data
                </sp-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${() => handleActionClick('Publish')}
                >
                    Publish Report
                </sp-button>
            </sp-header>
        </div>
    `;
};
L1FunctionalityTest.parameters = {
    docs: {
        description: {
            story: 'Complete L1 header functionality test with all features: title, subtitle, multiple action slots, and event handling.',
        },
    },
};

// Test 2: L2 Complete Edit Workflow
export const L2EditWorkflowTest = (): TemplateResult => {
    const events: string[] = [];

    const logEvent = (eventName: string) => (event: CustomEvent) => {
        events.push(`${eventName}: ${JSON.stringify(event.detail)}`);
        console.log(`${eventName}:`, event.detail);

        // Update the event log display
        const logElement = document.querySelector('#event-log');
        if (logElement) {
            logElement.innerHTML = events
                .slice(-5)
                .map((event) => `<div>${event}</div>`)
                .join('');
        }
    };

    const validation = (value: string) => {
        if (value.length > 80) {
            return [
                { type: 'length', message: 'Max character limit reached.' },
            ];
        }
        return null;
    };

    return html`
        <div style="max-width: 800px;">
            <h3>L2 Complete Edit Workflow Test</h3>
            <p>
                <strong>Test Checklist:</strong>
                <br />
                ✓ Click to edit title
                <br />
                ✓ Keyboard shortcuts (Enter/Escape)
                <br />
                ✓ Outside click to cancel
                <br />
                ✓ Validation and error states
                <br />
                ✓ Success toast notification
                <br />
                ✓ Event emission and logging
            </p>

            <sp-header
                variant="l2"
                title="Project Management Dashboard - Test Complete Edit Workflow"
                editable-title
                show-back
                max-title-length="80"
                .titleValidation=${validation}
                @sp-header-back=${logEvent('Back Clicked')}
                @sp-header-edit-start=${logEvent('Edit Started')}
                @sp-header-edit-save=${logEvent('Edit Save Attempted')}
                @sp-header-edit-cancel=${logEvent('Edit Cancelled')}
                @sp-header-title-renamed=${logEvent(
                    'Title Successfully Renamed'
                )}
            >
                <sp-badge slot="status" variant="positive">Active</sp-badge>
                <span slot="status">Last modified: 2 hours ago</span>
                <sp-action-button slot="middle-actions" quiet>
                    <sp-icon-star slot="icon"></sp-icon-star>
                    Favorite
                </sp-action-button>
                <sp-action-button slot="end-actions">Review</sp-action-button>
                <sp-button slot="end-actions" variant="accent">Save</sp-button>
            </sp-header>

            <div
                style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;"
            >
                <strong>Event Log (Last 5 Events):</strong>
                <div
                    id="event-log"
                    style="font-family: monospace; margin-top: 10px; min-height: 100px;"
                >
                    No events yet - try interacting with the header
                </div>
            </div>
        </div>
    `;
};
L2EditWorkflowTest.parameters = {
    docs: {
        description: {
            story: 'Complete L2 header edit workflow test with event logging, validation, and all interactive features.',
        },
    },
};

// Test 3: Responsive Design Testing
export const ResponsiveDesignTest = (): TemplateResult => html`
    <div>
        <h3>Responsive Design Test</h3>
        <p>
            <strong>Test Instructions:</strong>
            <br />
            Resize your browser window or use device simulation to test
            responsive behavior.
        </p>

        <div style="margin-bottom: 30px;">
            <h4>Desktop (800px+)</h4>
            <div style="width: 100%; border: 1px solid #ccc; padding: 10px;">
                <sp-header
                    variant="l1"
                    title="Desktop View - Full Feature Set"
                    subtitle="All action buttons visible with proper spacing"
                >
                    <sp-action-button slot="start-actions" quiet>
                        Action 1
                    </sp-action-button>
                    <sp-action-button slot="start-actions" quiet>
                        Action 2
                    </sp-action-button>
                    <sp-action-button slot="start-actions" quiet>
                        Action 3
                    </sp-action-button>
                    <sp-action-button slot="end-actions" quiet>
                        End 1
                    </sp-action-button>
                    <sp-action-button slot="end-actions" quiet>
                        End 2
                    </sp-action-button>
                    <sp-button slot="end-actions" variant="accent">
                        Primary
                    </sp-button>
                </sp-header>
            </div>
        </div>

        <div style="margin-bottom: 30px;">
            <h4>Tablet (600px)</h4>
            <div style="width: 600px; border: 1px solid #ccc; padding: 10px;">
                <sp-header
                    variant="l2"
                    title="Tablet View - Compressed Layout"
                    editable-title
                    show-back
                >
                    <sp-badge slot="status" variant="info">Tablet</sp-badge>
                    <sp-action-button slot="middle-actions" quiet>
                        Middle
                    </sp-action-button>
                    <sp-action-button slot="end-actions" quiet>
                        Action
                    </sp-action-button>
                    <sp-button slot="end-actions" variant="accent">
                        Save
                    </sp-button>
                </sp-header>
            </div>
        </div>

        <div style="margin-bottom: 30px;">
            <h4>Mobile (400px)</h4>
            <div style="width: 400px; border: 1px solid #ccc; padding: 10px;">
                <sp-header
                    variant="l2"
                    title="Mobile View Test"
                    editable-title
                    show-back
                >
                    <sp-badge slot="status" variant="notice">Mobile</sp-badge>
                    <sp-button slot="end-actions" variant="accent">
                        Action
                    </sp-button>
                </sp-header>
            </div>
        </div>
    </div>
`;
ResponsiveDesignTest.parameters = {
    docs: {
        description: {
            story: 'Tests responsive design behavior at different screen sizes and breakpoints.',
        },
    },
};

// Test 4: Accessibility Testing
export const AccessibilityTest = (): TemplateResult => html`
    <div style="max-width: 800px;">
        <h3>Accessibility Testing</h3>
        <p>
            <strong>Test Instructions:</strong>
            <br />
            1. Use Tab key to navigate through all interactive elements
            <br />
            2. Test with screen reader (NVDA, JAWS, VoiceOver)
            <br />
            3. Verify ARIA labels and roles
            <br />
            4. Test keyboard shortcuts in edit mode
            <br />
            5. Check focus indicators and contrast
        </p>

        <div style="margin-bottom: 30px;">
            <h4>Keyboard Navigation Test</h4>
            <sp-header
                variant="l2"
                title="Accessibility Test - Use Tab to Navigate"
                editable-title
                show-back
            >
                <sp-badge slot="status" variant="positive">A11y</sp-badge>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    aria-label="First action"
                >
                    1
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    aria-label="Second action"
                >
                    2
                </sp-action-button>
                <sp-action-button
                    slot="middle-actions"
                    quiet
                    aria-label="Middle action"
                >
                    M
                </sp-action-button>
                <sp-action-button
                    slot="end-actions"
                    quiet
                    aria-label="End action"
                >
                    E
                </sp-action-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    aria-label="Primary action"
                >
                    Primary
                </sp-button>
            </sp-header>
        </div>

        <div style="background: #f0f0f0; padding: 15px; border-radius: 4px;">
            <strong>Accessibility Checklist:</strong>
            <br />
            ✓ Proper heading levels (h1 for L1, h2 for L2)
            <br />
            ✓ ARIA labels on all interactive elements
            <br />
            ✓ Keyboard navigation support
            <br />
            ✓ Focus management during edit mode
            <br />
            ✓ Screen reader announcements
            <br />
            ✓ High contrast mode compatibility
            <br />
            ✓ Tooltip accessibility
        </div>
    </div>
`;
AccessibilityTest.parameters = {
    docs: {
        description: {
            story: 'Comprehensive accessibility testing including keyboard navigation, screen readers, and ARIA compliance.',
        },
    },
};

// Test 5: Performance Testing
export const PerformanceTest = (): TemplateResult => {
    const performanceData: { action: string; time: number }[] = [];

    const measurePerformance = (action: string) => () => {
        const start = performance.now();

        // Simulate some processing
        setTimeout(() => {
            const end = performance.now();
            const duration = end - start;
            performanceData.push({ action, time: duration });

            console.log(`${action} took ${duration.toFixed(2)}ms`);

            // Update performance display
            const perfElement = document.querySelector('#performance-log');
            if (perfElement) {
                perfElement.innerHTML = performanceData
                    .slice(-10)
                    .map(
                        (p) => `<div>${p.action}: ${p.time.toFixed(2)}ms</div>`
                    )
                    .join('');
            }
        }, 0);
    };

    return html`
        <div style="max-width: 800px;">
            <h3>Performance Testing</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Rapidly click action buttons to test performance
                <br />
                2. Edit title multiple times quickly
                <br />
                3. Monitor console and performance log
                <br />
                4. Test with large numbers of actions
            </p>

            <sp-header
                variant="l2"
                title="Performance Test - Click Actions Rapidly"
                editable-title
                show-back
                @sp-header-edit-start=${measurePerformance('Edit Start')}
                @sp-header-edit-save=${measurePerformance('Edit Save')}
                @sp-header-edit-cancel=${measurePerformance('Edit Cancel')}
            >
                <sp-badge slot="status" variant="info">Performance</sp-badge>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${measurePerformance('Start Action 1')}
                >
                    Action 1
                </sp-action-button>
                <sp-action-button
                    slot="start-actions"
                    quiet
                    @click=${measurePerformance('Start Action 2')}
                >
                    Action 2
                </sp-action-button>
                <sp-action-button
                    slot="middle-actions"
                    quiet
                    @click=${measurePerformance('Middle Action')}
                >
                    Middle
                </sp-action-button>
                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${measurePerformance('End Action 1')}
                >
                    End 1
                </sp-action-button>
                <sp-action-button
                    slot="end-actions"
                    quiet
                    @click=${measurePerformance('End Action 2')}
                >
                    End 2
                </sp-action-button>
                <sp-button
                    slot="end-actions"
                    variant="accent"
                    @click=${measurePerformance('Primary Action')}
                >
                    Primary
                </sp-button>
            </sp-header>

            <div
                style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px;"
            >
                <strong>Performance Log (Last 10 Actions):</strong>
                <div
                    id="performance-log"
                    style="font-family: monospace; margin-top: 10px; min-height: 100px;"
                >
                    No actions yet - try clicking buttons or editing the title
                </div>
            </div>
        </div>
    `;
};
PerformanceTest.parameters = {
    docs: {
        description: {
            story: 'Performance testing for rapid interactions, edit operations, and action button clicks.',
        },
    },
};

// Test 6: Edge Cases and Boundary Testing
export const EdgeCasesTest = (): TemplateResult => html`
    <div style="max-width: 800px;">
        <h3>Edge Cases and Boundary Testing</h3>

        <div style="margin-bottom: 30px;">
            <h4>Empty State</h4>
            <sp-header variant="l1" title="" subtitle="">
                <!-- No actions -->
            </sp-header>
        </div>

        <div style="margin-bottom: 30px;">
            <h4>Minimal L2</h4>
            <sp-header variant="l2" title="Minimal">
                <!-- Just title, no other content -->
            </sp-header>
        </div>

        <div style="margin-bottom: 30px;">
            <h4>Maximum Content L1</h4>
            <sp-header
                variant="l1"
                title="Extremely Long Title That Tests Text Overflow Behavior and Layout Constraints in Various Screen Sizes and Responsive Breakpoints"
                subtitle="This is an exceptionally long subtitle that contains extensive descriptive text to thoroughly test how the component handles text overflow, wrapping behavior, and responsive design across different viewport widths while maintaining proper layout hierarchy and accessibility standards"
            >
                <sp-action-button slot="start-actions" quiet>
                    Start 1
                </sp-action-button>
                <sp-action-button slot="start-actions" quiet>
                    Start 2
                </sp-action-button>
                <sp-action-button slot="start-actions" quiet>
                    Start 3
                </sp-action-button>
                <sp-action-button slot="start-actions" quiet>
                    Start 4
                </sp-action-button>
                <sp-action-button slot="end-actions" quiet>
                    End 1
                </sp-action-button>
                <sp-action-button slot="end-actions" quiet>
                    End 2
                </sp-action-button>
                <sp-action-button slot="end-actions" quiet>
                    End 3
                </sp-action-button>
                <sp-button slot="end-actions" variant="secondary">
                    Secondary
                </sp-button>
                <sp-button slot="end-actions" variant="accent">
                    Primary Action
                </sp-button>
            </sp-header>
        </div>

        <div style="margin-bottom: 30px;">
            <h4>Unicode and Special Characters</h4>
            <sp-header
                variant="l2"
                title="测试 Unicode 字符 🚀 emoji and spëciál çhars"
                editable-title
                show-back
            >
                <sp-badge slot="status" variant="info">Unicode ✅</sp-badge>
            </sp-header>
        </div>

        <div style="margin-bottom: 30px;">
            <h4>Rapid State Changes</h4>
            <sp-header
                variant="l2"
                title="Rapid state change test"
                editable-title
                show-back
            >
                <sp-badge slot="status" variant="notice">Changing</sp-badge>
            </sp-header>
        </div>
    </div>
`;
EdgeCasesTest.parameters = {
    docs: {
        description: {
            story: 'Edge cases including empty states, maximum content, Unicode characters, and boundary conditions.',
        },
    },
};

// Test 7: Integration Testing
export const IntegrationTest = (): TemplateResult => {
    let headerCount = 1;

    const addHeader = () => {
        headerCount++;
        const container = document.querySelector('#dynamic-headers');
        if (container) {
            const newHeader = document.createElement('sp-header');
            newHeader.setAttribute('variant', 'l2');
            newHeader.setAttribute('title', `Dynamic Header ${headerCount}`);
            newHeader.setAttribute('editable-title', '');
            newHeader.innerHTML = `
                <sp-badge slot="status" variant="info">Dynamic ${headerCount}</sp-badge>
                <sp-action-button slot="end-actions">Action ${headerCount}</sp-action-button>
            `;
            container.appendChild(newHeader);
        }
    };

    const removeLastHeader = () => {
        const container = document.querySelector('#dynamic-headers');
        if (container && container.children.length > 0) {
            container.removeChild(container.lastElementChild!);
        }
    };

    return html`
        <div style="max-width: 800px;">
            <h3>Integration Testing</h3>
            <p>
                <strong>
                    Test dynamic addition/removal of headers and integration
                    with other components:
                </strong>
            </p>

            <div style="margin-bottom: 20px;">
                <sp-button @click=${addHeader}>Add Header</sp-button>
                <sp-button @click=${removeLastHeader}>Remove Last</sp-button>
            </div>

            <sp-header
                variant="l1"
                title="Static Integration Test Header"
                subtitle="Testing integration with dynamic content below"
            >
                <sp-action-button slot="end-actions" @click=${addHeader}>
                    Add Dynamic Header
                </sp-action-button>
            </sp-header>

            <div id="dynamic-headers" style="margin-top: 20px;">
                <!-- Dynamic headers will be added here -->
            </div>
        </div>
    `;
};
IntegrationTest.parameters = {
    docs: {
        description: {
            story: 'Integration testing with dynamic content creation, removal, and interaction with other components.',
        },
    },
};

// Test 8: Real-world Usage Scenarios
export const RealWorldScenarios = (): TemplateResult => {
    const scenarios = [
        {
            title: 'Dashboard Home',
            variant: 'l1',
            subtitle: "Welcome back! Here's your daily overview",
            status: 'positive',
            actions: ['Settings', 'Help', 'Profile', 'Export', 'Share'],
        },
        {
            title: 'Project Settings',
            variant: 'l2',
            editable: true,
            status: 'info',
            actions: ['Save', 'Cancel', 'Reset'],
        },
        {
            title: 'Campaign Builder',
            variant: 'l2',
            editable: true,
            status: 'warning',
            actions: ['Preview', 'Save Draft', 'Publish'],
        },
    ];

    return html`
        <div style="max-width: 800px;">
            <h3>Real-world Usage Scenarios</h3>
            <p>Common usage patterns and realistic content examples.</p>

            ${scenarios.map(
                (scenario, index) => html`
                    <div
                        style="margin-bottom: 30px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;"
                    >
                        <h4>Scenario ${index + 1}: ${scenario.title}</h4>
                        <sp-header
                            variant=${scenario.variant}
                            title=${scenario.title}
                            subtitle=${scenario.variant === 'l1'
                                ? scenario.subtitle
                                : ''}
                            ?editable-title=${scenario.editable}
                            ?show-back=${scenario.variant === 'l2'}
                        >
                            <sp-badge slot="status" variant=${scenario.status}>
                                ${scenario.status === 'positive'
                                    ? 'Active'
                                    : scenario.status === 'info'
                                      ? 'Draft'
                                      : 'Needs Review'}
                            </sp-badge>
                            ${scenario.actions.map(
                                (action) => html`
                                    <sp-action-button slot="end-actions" quiet>
                                        ${action}
                                    </sp-action-button>
                                `
                            )}
                        </sp-header>
                    </div>
                `
            )}
        </div>
    `;
};
RealWorldScenarios.parameters = {
    docs: {
        description: {
            story: 'Real-world usage scenarios demonstrating common patterns and configurations in actual applications.',
        },
    },
};

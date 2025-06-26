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
import '@spectrum-web-components/status-light/sp-status-light.js';
import '@spectrum-web-components/button/sp-button.js';
import { HeaderValidationError } from '../src/Header.js';

export default {
    title: 'Header/Error Handling & Validation',
    component: 'sp-header',
    parameters: {
        docs: {
            description: {
                component: `
# Header Error Handling & Validation

This collection demonstrates comprehensive error handling and validation scenarios for the header component's editable title feature.

## Test Scenarios Covered:

- **Character Limit Validation**: Real-time feedback when exceeding maximum length
- **Custom Validation Rules**: Complex validation logic with multiple error types
- **Empty Title Validation**: Preventing empty titles
- **Server-side Validation**: Simulating server validation failures
- **Multiple Error States**: Handling multiple validation errors simultaneously
- **Real-time Feedback**: Immediate validation as user types
- **Visual Error States**: Red borders, warning icons, and error messages

## Key Features:

- 🔴 **Visual Error States**: Red borders and warning triangle icons
- ⚡ **Real-time Validation**: Errors appear as user types
- 📝 **Custom Error Messages**: Configurable validation messages
- 🎯 **Multiple Error Types**: Length, characters, empty, server errors
- ♿ **Accessible**: Proper ARIA labels and semantic markup
                `,
            },
        },
    },
};

// Test 1: Basic Character Limit
export const CharacterLimitValidation = (): TemplateResult => html`
    <div style="max-width: 600px;">
        <h3>Character Limit Validation</h3>
        <p>
            <strong>Test Instructions:</strong>
            <br />
            1. Click to edit the title
            <br />
            2. Type more than 50 characters
            <br />
            3. Observe real-time error with red border and warning icon
            <br />
            4. Error message should say "Max character limit reached."
        </p>
        <sp-header
            variant="l2"
            title="In suscipit tortor id congue egestas eu at ut eget"
            editable-title
            show-back
            max-title-length="50"
        >
                            <sp-status-light slot="status" variant="notice">Draft</sp-status-light>
            <sp-action-button slot="end-actions">Save</sp-action-button>
        </sp-header>
    </div>
`;
CharacterLimitValidation.parameters = {
    docs: {
        description: {
            story: 'Tests the built-in character limit validation with real-time feedback. The error appears immediately when typing exceeds the limit.',
        },
    },
};

// Test 2: Custom Validation Rules
export const CustomValidationRules = (): TemplateResult => {
    const customValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        if (value.length > 100) {
            errors.push({
                type: 'length',
                message: 'Title must be 100 characters or less',
            });
        }

        if (/[<>]/.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Title cannot contain < or > characters',
            });
        }

        if (value.toLowerCase().includes('forbidden')) {
            errors.push({
                type: 'characters',
                message: 'Title cannot contain forbidden words',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    return html`
        <div style="max-width: 600px;">
            <h3>Custom Validation Rules</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Click to edit the title
                <br />
                2. Try typing "forbidden" to see custom validation
                <br />
                3. Try typing "&lt;" or "&gt;" characters
                <br />
                4. Try typing more than 100 characters
                <br />
                5. Multiple errors can appear simultaneously
            </p>
            <sp-header
                variant="l2"
                title="Test custom validation rules here"
                editable-title
                show-back
                .titleValidation=${customValidation}
            >
                <sp-status-light slot="status" variant="info">Testing</sp-status-light>
                <sp-action-button slot="end-actions">Validate</sp-action-button>
            </sp-header>
        </div>
    `;
};
CustomValidationRules.parameters = {
    docs: {
        description: {
            story: 'Demonstrates custom validation rules including forbidden words, special characters, and length limits. Multiple validation errors can be shown simultaneously.',
        },
    },
};

// Test 3: Server-side Validation Simulation
export const ServerSideValidation = (): TemplateResult => {
    const handleEditSave = (event: CustomEvent) => {
        const newTitle = event.detail.newTitle;

        // Simulate server validation
        if (newTitle.toLowerCase().includes('server-error')) {
            event.preventDefault();
            alert(
                'Server validation failed: Title cannot contain "server-error"'
            );
        } else if (newTitle.toLowerCase().includes('duplicate')) {
            event.preventDefault();
            alert('Server validation failed: This title already exists');
        } else {
            console.log('Title saved successfully:', newTitle);
        }
    };

    return html`
        <div style="max-width: 600px;">
            <h3>Server-side Validation Simulation</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Click to edit the title
                <br />
                2. Type "server-error" to simulate server validation failure
                <br />
                3. Type "duplicate" to simulate duplicate title error
                <br />
                4. Try saving with Enter or click the checkmark
                <br />
                5. Server errors are shown via preventDefault() and alerts
            </p>
            <sp-header
                variant="l2"
                title="Test server validation here"
                editable-title
                show-back
                @sp-header-edit-save=${handleEditSave}
            >
                <sp-status-light slot="status" variant="notice">Pending</sp-status-light>
                <sp-action-button slot="end-actions">Submit</sp-action-button>
            </sp-header>
        </div>
    `;
};
ServerSideValidation.parameters = {
    docs: {
        description: {
            story: 'Simulates server-side validation by preventing the save event and showing error messages. This demonstrates how external validation can be integrated.',
        },
    },
};

// Test 4: Multiple Error Types
export const MultipleErrorTypes = (): TemplateResult => {
    const complexValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        // Empty validation
        if (!value.trim()) {
            errors.push({
                type: 'empty',
                message: 'Title cannot be empty',
            });
        }

        // Length validation
        if (value.length > 30) {
            errors.push({
                type: 'length',
                message: 'Max character limit reached.',
            });
        }

        // Character validation
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Title cannot contain special characters',
            });
        }

        // Custom business rule
        if (
            value.toLowerCase().includes('test') &&
            value.toLowerCase().includes('error')
        ) {
            errors.push({
                type: 'server',
                message:
                    'Business rule violation: Cannot combine "test" and "error"',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    return html`
        <div style="max-width: 600px;">
            <h3>Multiple Error Types</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Clear the title completely (empty validation)
                <br />
                2. Type more than 30 characters (length validation)
                <br />
                3. Add special characters like !@# (character validation)
                <br />
                4. Type "test error" together (business rule validation)
                <br />
                5. Multiple errors will stack below the input
            </p>
            <sp-header
                variant="l2"
                title="Multiple validation test"
                editable-title
                show-back
                .titleValidation=${complexValidation}
            >
                <sp-status-light slot="status" variant="negative">Invalid</sp-status-light>
                <sp-action-button slot="end-actions">
                    Fix Errors
                </sp-action-button>
            </sp-header>
        </div>
    `;
};
MultipleErrorTypes.parameters = {
    docs: {
        description: {
            story: 'Demonstrates multiple validation error types appearing simultaneously. Shows how different error types stack and display together.',
        },
    },
};

// Test 5: Real-time vs Save-time Validation
export const RealTimeVsSaveValidation = (): TemplateResult => {
    // Real-time validation only for character limit
    const realTimeValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        if (value.length > 40) {
            return [
                {
                    type: 'length',
                    message: 'Max character limit reached.',
                },
            ];
        }
        return null;
    };

    // Save-time validation for complex rules
    const handleSaveValidation = (event: CustomEvent) => {
        const newTitle = event.detail.newTitle;

        if (newTitle.toLowerCase().includes('forbidden')) {
            event.preventDefault();
            alert('Save-time validation: Title cannot contain "forbidden"');
        }
    };

    return html`
        <div style="max-width: 600px;">
            <h3>Real-time vs Save-time Validation</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Type more than 40 characters (real-time validation)
                <br />
                2. Type "forbidden" and try to save (save-time validation)
                <br />
                3. Notice the difference in timing and feedback
            </p>
            <sp-header
                variant="l2"
                title="Real-time validation test"
                editable-title
                show-back
                .titleValidation=${realTimeValidation}
                @sp-header-edit-save=${handleSaveValidation}
            >
                <sp-status-light slot="status" variant="info">Testing</sp-status-light>
                <sp-action-button slot="end-actions">Save</sp-action-button>
            </sp-header>
        </div>
    `;
};
RealTimeVsSaveValidation.parameters = {
    docs: {
        description: {
            story: 'Compares real-time validation (immediate feedback) with save-time validation (validated on submit). Shows different validation strategies.',
        },
    },
};

// Test 6: Accessibility and Keyboard Navigation
export const AccessibilityTest = (): TemplateResult => {
    const validation = (value: string): HeaderValidationError[] | null => {
        if (value.length > 35) {
            return [
                {
                    type: 'length',
                    message: 'Max character limit reached.',
                },
            ];
        }
        return null;
    };

    return html`
        <div style="max-width: 600px;">
            <h3>Accessibility and Keyboard Navigation</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Use Tab to navigate to the edit button
                <br />
                2. Press Enter to start editing
                <br />
                3. Type more than 35 characters to see error
                <br />
                4. Press Escape to cancel or Enter to save
                <br />
                5. Test with screen reader for ARIA labels
            </p>
            <sp-header
                variant="l2"
                title="Accessibility test with keyboard"
                editable-title
                show-back
                .titleValidation=${validation}
            >
                <sp-status-light slot="status" variant="positive">Accessible</sp-status-light>
                <sp-action-button slot="end-actions">
                    Test A11y
                </sp-action-button>
            </sp-header>
        </div>
    `;
};
AccessibilityTest.parameters = {
    docs: {
        description: {
            story: 'Tests keyboard navigation and accessibility features including ARIA labels, screen reader compatibility, and keyboard shortcuts.',
        },
    },
};

// Test 7: Edge Cases and Boundary Testing
export const EdgeCases = (): TemplateResult => {
    const edgeCaseValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        // Test exactly at limit
        if (value.length === 25) {
            errors.push({
                type: 'length',
                message: 'Exactly at 25 character limit',
            });
        }

        // Test one over limit
        if (value.length === 26) {
            errors.push({
                type: 'length',
                message: 'One character over limit',
            });
        }

        // Test way over limit
        if (value.length > 50) {
            errors.push({
                type: 'length',
                message: 'Way over character limit!',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    return html`
        <div style="max-width: 600px;">
            <h3>Edge Cases and Boundary Testing</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Type exactly 25 characters (boundary test)
                <br />
                2. Type exactly 26 characters (one over boundary)
                <br />
                3. Type way more than 50 characters (extreme case)
                <br />
                4. Test with special Unicode characters
                <br />
                5. Test with very long strings
            </p>
            <sp-header
                variant="l2"
                title="Edge case testing"
                editable-title
                show-back
                .titleValidation=${edgeCaseValidation}
            >
                <sp-status-light slot="status" variant="notice">Edge Testing</sp-status-light>
                <sp-action-button slot="end-actions">
                    Test Edge
                </sp-action-button>
            </sp-header>
        </div>
    `;
};
EdgeCases.parameters = {
    docs: {
        description: {
            story: 'Tests edge cases and boundary conditions including exact character limits, Unicode characters, and extreme inputs.',
        },
    },
};

// Test 8: Performance and Rapid Input
export const PerformanceTest = (): TemplateResult => {
    const performanceValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        // Simulate expensive validation
        const start = performance.now();

        // Complex regex validation
        const hasComplexPattern = /^[A-Za-z0-9\s\-_]+$/.test(value);

        if (!hasComplexPattern) {
            return [
                {
                    type: 'characters',
                    message:
                        'Only letters, numbers, spaces, hyphens, and underscores allowed',
                },
            ];
        }

        if (value.length > 30) {
            return [
                {
                    type: 'length',
                    message: 'Max character limit reached.',
                },
            ];
        }

        const end = performance.now();
        console.log(`Validation took ${end - start} milliseconds`);

        return null;
    };

    return html`
        <div style="max-width: 600px;">
            <h3>Performance and Rapid Input</h3>
            <p>
                <strong>Test Instructions:</strong>
                <br />
                1. Type very quickly to test performance
                <br />
                2. Paste long text to test bulk input
                <br />
                3. Add special characters to trigger validation
                <br />
                4. Check browser console for validation timing
                <br />
                5. Test with debounced vs immediate validation
            </p>
            <sp-header
                variant="l2"
                title="Performance test input"
                editable-title
                show-back
                .titleValidation=${performanceValidation}
            >
                <sp-status-light slot="status" variant="info">Performance</sp-status-light>
                <sp-action-button slot="end-actions">
                    Benchmark
                </sp-action-button>
            </sp-header>
        </div>
    `;
};
PerformanceTest.parameters = {
    docs: {
        description: {
            story: 'Tests performance with rapid input, complex validation rules, and bulk text operations. Logs validation timing to console.',
        },
    },
};

// Interactive Demo with All Features
export const ComprehensiveDemo = (): TemplateResult => {
    const allValidation = (value: string): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        if (!value.trim()) {
            errors.push({ type: 'empty', message: 'Title cannot be empty' });
        }

        if (value.length > 60) {
            errors.push({
                type: 'length',
                message: 'Max character limit reached.',
            });
        }

        if (/[<>]/.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Cannot contain < or > characters',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    const handleAllEvents = (eventType: string) => (event: CustomEvent) => {
        console.log(`${eventType}:`, event.detail);
    };

    return html`
        <div style="max-width: 700px;">
            <h3>Comprehensive Error Handling Demo</h3>
            <p>
                <strong>Interactive Test Suite:</strong>
                <br />
                This demo combines all error handling features for comprehensive
                testing. Check the browser console for event details.
            </p>
            <ul>
                <li>✅ Character limit validation (60 chars)</li>
                <li>✅ Real-time error feedback</li>
                <li>✅ Visual error states (red border, warning icon)</li>
                <li>✅ Multiple error types</li>
                <li>✅ Keyboard navigation (Tab, Enter, Escape)</li>
                <li>✅ Event logging to console</li>
            </ul>

            <sp-header
                variant="l2"
                title="Comprehensive validation test - try breaking the rules!"
                editable-title
                show-back
                .titleValidation=${allValidation}
                @sp-header-edit-start=${handleAllEvents('Edit Started')}
                @sp-header-edit-save=${handleAllEvents('Edit Saved')}
                @sp-header-edit-cancel=${handleAllEvents('Edit Cancelled')}
                @sp-header-title-renamed=${handleAllEvents('Title Renamed')}
            >
                <sp-status-light slot="status" variant="positive">
                    All Features
                </sp-status-light>
                <sp-action-button slot="middle-actions" quiet>
                    Test
                </sp-action-button>
                <sp-action-button slot="end-actions">Save</sp-action-button>
                <sp-button slot="end-actions" variant="accent">
                    Publish
                </sp-button>
            </sp-header>
        </div>
    `;
};
ComprehensiveDemo.parameters = {
    docs: {
        description: {
            story: 'Comprehensive demo showcasing all error handling features together. Perfect for testing and demonstrating the complete functionality.',
        },
    },
};

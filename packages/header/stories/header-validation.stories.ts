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
    title: 'Header/Validation & Error Handling',
    component: 'sp-header',
    parameters: {
        docs: {
            description: {
                component: `
# Header Validation & Error Handling

Comprehensive validation and error handling scenarios for the header component's editable title feature.

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

// Basic Validation Examples
export const CharacterLimitValidation = (): TemplateResult => html`
    <div style="max-width: 600px; margin: 20px 0;">
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
            title="This title is intentionally long to demonstrate character limit validation behavior"
            editable-title
            show-back
            max-title-length="50"
            @sp-header-back=${() => console.log('Back clicked')}
        >
            <sp-status-light slot="status" variant="notice">
                Draft
            </sp-status-light>
            <sp-action-button slot="end-actions">Save</sp-action-button>
        </sp-header>
    </div>
`;

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

        if (value.trim().length === 0) {
            errors.push({
                type: 'empty',
                message: 'Title cannot be empty',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    return html`
        <div style="max-width: 600px; margin: 20px 0;">
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
                5. Clear the title to test empty validation
                <br />
                6. Multiple errors can appear simultaneously
            </p>
            <sp-header
                variant="l2"
                title="Test custom validation rules here"
                editable-title
                show-back
                .titleValidation=${customValidation}
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-status-light slot="status" variant="info">
                    Testing
                </sp-status-light>
                <sp-action-button slot="end-actions">Validate</sp-action-button>
            </sp-header>
        </div>
    `;
};

// Server-side Validation
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
        } else if (newTitle.toLowerCase().includes('unauthorized')) {
            event.preventDefault();
            alert(
                'Server validation failed: You do not have permission to use this title'
            );
        } else {
            console.log('Title saved successfully:', newTitle);
        }
    };

    return html`
        <div style="max-width: 600px; margin: 20px 0;">
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
                4. Type "unauthorized" to simulate permission error
                <br />
                5. Try saving with Enter or click the checkmark
                <br />
                6. Server errors are shown via preventDefault() and alerts
            </p>
            <sp-header
                variant="l2"
                title="Test server validation here"
                editable-title
                show-back
                @sp-header-back=${() => console.log('Back clicked')}
                @sp-header-edit-save=${handleEditSave}
            >
                <sp-status-light slot="status" variant="notice">
                    Pending
                </sp-status-light>
                <sp-action-button slot="end-actions">Submit</sp-action-button>
            </sp-header>
        </div>
    `;
};

// Complex Validation Scenarios
export const MultipleErrorTypes = (): TemplateResult => {
    const complexValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        // Length validation
        if (value.length > 80) {
            errors.push({
                type: 'length',
                message: 'Title must be 80 characters or less',
            });
        }

        // Empty validation
        if (value.trim().length === 0) {
            errors.push({
                type: 'empty',
                message: 'Title cannot be empty',
            });
        }

        // Special characters
        if (/[<>&"']/.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Title cannot contain special characters: < > & " \'',
            });
        }

        // Profanity/content filtering
        const forbiddenWords = ['spam', 'test123', 'delete'];
        const containsForbidden = forbiddenWords.some((word) =>
            value.toLowerCase().includes(word.toLowerCase())
        );
        if (containsForbidden) {
            errors.push({
                type: 'characters',
                message: 'Title contains forbidden words or patterns',
            });
        }

        // Format validation
        if (value.length > 0 && /^\s/.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Title cannot start with whitespace',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    return html`
        <div style="max-width: 600px; margin: 20px 0;">
            <h3>Multiple Error Types</h3>
            <p>
                <strong>Test Complex Validation:</strong>
                <br />
                • Type more than 80 characters for length error
                <br />
                • Clear title completely for empty error
                <br />
                • Type "&lt;&gt;&amp;" for special character error
                <br />
                • Type "spam" or "delete" for content error
                <br />
                • Start with spaces for format error
                <br />
                • Try combinations to see multiple errors
            </p>
            <sp-header
                variant="l2"
                title="Advanced validation test - try various error scenarios"
                editable-title
                show-back
                .titleValidation=${complexValidation}
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-status-light slot="status" variant="notice">
                    Testing
                </sp-status-light>
                <sp-action-button slot="end-actions">
                    Validate All
                </sp-action-button>
            </sp-header>
        </div>
    `;
};

// Real-time vs Save Validation
export const RealTimeVsSaveValidation = (): TemplateResult => {
    const realTimeValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        if (value.length > 60) {
            return [
                {
                    type: 'length',
                    message: 'Real-time: Character limit exceeded',
                },
            ];
        }
        return null;
    };

    const handleSaveValidation = (event: CustomEvent) => {
        const newTitle = event.detail.newTitle;

        // Additional validation only on save
        if (newTitle.toLowerCase().includes('save-only-error')) {
            event.preventDefault();
            alert(
                'Save-time validation: This phrase is only checked when saving'
            );
        } else if (newTitle.toLowerCase() === newTitle && newTitle.length > 0) {
            event.preventDefault();
            alert(
                'Save-time validation: Title must contain at least one uppercase letter'
            );
        } else {
            console.log('Both validations passed, title saved:', newTitle);
        }
    };

    return html`
        <div style="max-width: 600px; margin: 20px 0;">
            <h3>Real-time vs Save-time Validation</h3>
            <p>
                <strong>Testing Different Validation Phases:</strong>
                <br />
                •
                <strong>Real-time:</strong>
                Character count shows errors immediately
                <br />
                •
                <strong>Save-time:</strong>
                Additional checks when saving
                <br />
                • Type "save-only-error" to test save-time validation
                <br />
                • Use all lowercase to test uppercase requirement
                <br />
                • Real-time limit: 60 characters
            </p>
            <sp-header
                variant="l2"
                title="Test real-time and save-time validation phases"
                editable-title
                show-back
                .titleValidation=${realTimeValidation}
                @sp-header-back=${() => console.log('Back clicked')}
                @sp-header-edit-save=${handleSaveValidation}
            >
                <sp-status-light slot="status" variant="info">
                    Dual Validation
                </sp-status-light>
                <sp-action-button slot="end-actions">
                    Test Save
                </sp-action-button>
            </sp-header>
        </div>
    `;
};

// Performance and Edge Cases
export const EdgeCasesAndPerformance = (): TemplateResult => {
    const edgeCaseValidation = (
        value: string
    ): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        // Unicode and emoji validation
        if (/[\u{1F600}-\u{1F6FF}]/u.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Emojis are not allowed in titles',
            });
        }

        // Very long strings
        if (value.length > 200) {
            errors.push({
                type: 'length',
                message:
                    'Title is extremely long and may cause performance issues',
            });
        }

        // Pattern validation
        if (value.includes('  ')) {
            errors.push({
                type: 'characters',
                message: 'Multiple consecutive spaces are not allowed',
            });
        }

        // SQL injection simulation
        if (/('|"|;|--|\bDROP\b|\bSELECT\b)/i.test(value)) {
            errors.push({
                type: 'characters',
                message: 'Title contains potentially unsafe characters',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    return html`
        <div style="max-width: 600px; margin: 20px 0;">
            <h3>Edge Cases & Performance Testing</h3>
            <p>
                <strong>Test Edge Cases:</strong>
                <br />
                • Try emojis: 😀 🎉 📝
                <br />
                • Test very long strings (200+ characters)
                <br />
                • Use double spaces: "test spaces"
                <br />
                • Security patterns: DROP, SELECT, quotes
                <br />
                • Unicode characters: åëîøü
                <br />
                • Performance with rapid typing
            </p>
            <sp-header
                variant="l2"
                title="Edge case validation testing - try unusual inputs"
                editable-title
                show-back
                .titleValidation=${edgeCaseValidation}
                @sp-header-back=${() => console.log('Back clicked')}
            >
                <sp-status-light slot="status" variant="negative">
                    High Security
                </sp-status-light>
                <sp-action-button slot="end-actions">
                    Test Edge Cases
                </sp-action-button>
            </sp-header>
        </div>
    `;
};

// Comprehensive Demo
export const ComprehensiveValidationDemo = (): TemplateResult => {
    const allValidation = (value: string): HeaderValidationError[] | null => {
        const errors: HeaderValidationError[] = [];

        if (value.length > 100)
            errors.push({ type: 'length', message: 'Max 100 characters' });
        if (value.trim().length === 0)
            errors.push({ type: 'empty', message: 'Cannot be empty' });
        if (/[<>&]/.test(value))
            errors.push({ type: 'characters', message: 'Invalid characters' });
        if (value.toLowerCase().includes('forbidden')) {
            errors.push({
                type: 'characters',
                message: 'Contains forbidden word',
            });
        }

        return errors.length > 0 ? errors : null;
    };

    const handleAllEvents = (eventType: string) => (event: CustomEvent) => {
        console.log(`${eventType}:`, event.detail);

        if (
            eventType === 'Save' &&
            event.detail.newTitle.toLowerCase().includes('server-fail')
        ) {
            event.preventDefault();
            alert('Server-side validation failed!');
        }
    };

    return html`
        <div style="max-width: 600px; margin: 20px 0;">
            <h3>Comprehensive Validation Demo</h3>
            <p>
                <strong>All Features Combined:</strong>
                <br />
                • Real-time validation (length, empty, characters)
                <br />
                • Content filtering ("forbidden" word)
                <br />
                • Server-side simulation ("server-fail")
                <br />
                • Complete event logging
                <br />
                • Accessible error states
                <br />
                • Toast notifications on success
            </p>
            <sp-header
                variant="l2"
                title="Complete validation demonstration with all features"
                editable-title
                show-back
                show-success-toast
                success-toast-message="Title updated successfully with full validation!"
                .titleValidation=${allValidation}
                @sp-header-back=${handleAllEvents('Back')}
                @sp-header-edit-start=${handleAllEvents('Edit Start')}
                @sp-header-edit-save=${handleAllEvents('Save')}
                @sp-header-edit-cancel=${handleAllEvents('Cancel')}
                @sp-header-title-renamed=${handleAllEvents('Success')}
            >
                <sp-status-light slot="status" variant="positive">
                    All Features
                </sp-status-light>
                <span slot="status">Comprehensive validation active</span>
                <sp-action-button slot="end-actions">
                    Test All Features
                </sp-action-button>
            </sp-header>
        </div>
    `;
};

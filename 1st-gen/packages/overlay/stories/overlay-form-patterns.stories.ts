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
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

export default {
    title: 'Overlay/Patterns & Examples/Form Integration',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Form-specific overlay patterns including validation popovers, field helpers, and picker integration.',
            },
        },
    },
};

/**
 * Validation popover - show field errors near input
 * 
 * **Use case:** Display validation errors positioned near form fields
 * 
 * **Key features:**
 * - Programmatically controlled based on validation state
 * - Positioned near the field that needs attention
 * - Dismissible with close interaction
 * - Accessible error association
 * 
 * 📖 [Forms Integration Guide](./FORMS-INTEGRATION.md#validation-patterns)
 */
export const ValidationPopover = (): TemplateResult => {
    const validateEmail = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const overlay = document.querySelector('#email-error') as any;
        const value = input.value;
        
        const isValid = value.includes('@') && value.includes('.');
        overlay.open = !isValid && value.length > 0;
    };
    
    return html`
        <style>
            .form-container {
                padding: 40px;
                max-width: 500px;
            }
            .form-field {
                margin-bottom: 25px;
            }
        </style>
        <div class="form-container">
            <div class="form-field">
                <sp-field-label for="email-field" required>
                    Email address
                </sp-field-label>
                <sp-textfield 
                    id="email-field"
                    placeholder="user@example.com"
                    @input=${validateEmail}
                ></sp-textfield>
                <sp-overlay 
                    id="email-error"
                    trigger="email-field@focus"
                    type="auto"
                    placement="bottom-start"
                >
                    <sp-popover variant="error">
                        <sp-dialog size="s" no-divider>
                            <p>Please enter a valid email address</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <sp-help-text>
                    We'll never share your email with anyone else.
                </sp-help-text>
            </div>
        </div>
    `;
};

ValidationPopover.parameters = {
    docs: {
        description: {
            story: 'Validation popover that appears when a field contains invalid data.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Field help popover - contextual help for complex fields
 * 
 * **Use case:** Provide detailed help or examples for form fields
 * 
 * **Key features:**
 * - Icon button trigger next to field
 * - Rich content with formatting
 * - Doesn't interfere with field interaction
 * 
 * 📖 [Forms Integration Guide](./FORMS-INTEGRATION.md#help-patterns)
 */
export const FieldHelpPopover = (): TemplateResult => {
    return html`
        <style>
            .form-container {
                padding: 40px;
                max-width: 600px;
            }
            .field-with-help {
                display: flex;
                align-items: flex-end;
                gap: 10px;
            }
            .field-wrapper {
                flex: 1;
            }
        </style>
        <div class="form-container">
            <div class="field-with-help">
                <div class="field-wrapper">
                    <sp-field-label for="password-field">
                        Create password
                    </sp-field-label>
                    <sp-textfield 
                        id="password-field"
                        type="password"
                        placeholder="Enter password"
                    ></sp-textfield>
                </div>
                <sp-button id="password-help" variant="secondary" size="m" quiet>
                    ?
                </sp-button>
                <sp-overlay 
                    trigger="password-help@click"
                    type="auto"
                    placement="right-start"
                >
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <h4 slot="heading">Password requirements</h4>
                            <ul style="margin: 0; padding-left: 20px;">
                                <li>At least 8 characters long</li>
                                <li>Contains uppercase and lowercase letters</li>
                                <li>Contains at least one number</li>
                                <li>Contains at least one special character (!@#$%^&*)</li>
                            </ul>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
        </div>
    `;
};

FieldHelpPopover.parameters = {
    docs: {
        description: {
            story: 'Help button that opens a popover with detailed field requirements.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Multi-field validation - coordinated error display
 * 
 * **Use case:** Show validation errors for multiple fields simultaneously
 * 
 * **Key features:**
 * - Independent validation for each field
 * - Coordinated error display
 * - Form-level validation summary
 * 
 * 📖 [Forms Integration Guide](./FORMS-INTEGRATION.md#multi-field-validation)
 */
export const MultiFieldValidation = (): TemplateResult => {
    const validateUsername = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const overlay = document.querySelector('#username-error') as any;
        const value = input.value;
        
        const isValid = value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
        if (overlay) overlay.open = !isValid && value.length > 0;
    };
    
    const validatePassword = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const overlay = document.querySelector('#password-error') as any;
        const value = input.value;
        
        const isValid = value.length >= 8;
        if (overlay) overlay.open = !isValid && value.length > 0;
    };
    
    const validateConfirm = (event: Event) => {
        const input = event.target as HTMLInputElement;
        const overlay = document.querySelector('#confirm-error') as any;
        const passwordField = document.querySelector('#password-field-multi') as any;
        const value = input.value;
        
        const isValid = value === passwordField?.value;
        if (overlay) overlay.open = !isValid && value.length > 0;
    };
    
    return html`
        <style>
            .form-container {
                padding: 40px;
                max-width: 500px;
            }
            .form-field {
                margin-bottom: 25px;
            }
        </style>
        <div class="form-container">
            <h3>Create Account</h3>
            
            <div class="form-field">
                <sp-field-label for="username-field" required>
                    Username
                </sp-field-label>
                <sp-textfield 
                    id="username-field"
                    placeholder="Choose username"
                    @input=${validateUsername}
                ></sp-textfield>
                <sp-overlay 
                    id="username-error"
                    trigger="username-field@focus"
                    type="auto"
                    placement="bottom-start"
                >
                    <sp-popover variant="error">
                        <sp-dialog size="s" no-divider>
                            <p>Username must be at least 3 characters and contain only letters, numbers, and underscores</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
            
            <div class="form-field">
                <sp-field-label for="password-field-multi" required>
                    Password
                </sp-field-label>
                <sp-textfield 
                    id="password-field-multi"
                    type="password"
                    placeholder="Create password"
                    @input=${validatePassword}
                ></sp-textfield>
                <sp-overlay 
                    id="password-error"
                    trigger="password-field-multi@focus"
                    type="auto"
                    placement="bottom-start"
                >
                    <sp-popover variant="error">
                        <sp-dialog size="s" no-divider>
                            <p>Password must be at least 8 characters long</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
            
            <div class="form-field">
                <sp-field-label for="confirm-field" required>
                    Confirm password
                </sp-field-label>
                <sp-textfield 
                    id="confirm-field"
                    type="password"
                    placeholder="Confirm password"
                    @input=${validateConfirm}
                ></sp-textfield>
                <sp-overlay 
                    id="confirm-error"
                    trigger="confirm-field@focus"
                    type="auto"
                    placement="bottom-start"
                >
                    <sp-popover variant="error">
                        <sp-dialog size="s" no-divider>
                            <p>Passwords do not match</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
            
            <sp-button variant="accent">Create Account</sp-button>
        </div>
    `;
};

MultiFieldValidation.parameters = {
    docs: {
        description: {
            story: 'Multiple form fields with independent validation popovers.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Picker integration - form select with overlay
 * 
 * **Use case:** Custom select dropdowns in forms
 * 
 * **Key features:**
 * - Keyboard navigation
 * - Search/filter support
 * - Accessible selection
 * 
 * 📖 [Picker Documentation](../../picker/README.md)
 */
export const PickerIntegration = (): TemplateResult => {
    return html`
        <style>
            .form-container {
                padding: 40px;
                max-width: 500px;
            }
            .form-field {
                margin-bottom: 25px;
            }
        </style>
        <div class="form-container">
            <h3>Contact Information</h3>
            
            <div class="form-field">
                <sp-field-label for="country-picker">
                    Country
                </sp-field-label>
                <sp-picker id="country-picker" label="Country" value="us">
                    <sp-menu-item value="us">United States</sp-menu-item>
                    <sp-menu-item value="uk">United Kingdom</sp-menu-item>
                    <sp-menu-item value="ca">Canada</sp-menu-item>
                    <sp-menu-item value="au">Australia</sp-menu-item>
                    <sp-menu-item value="de">Germany</sp-menu-item>
                    <sp-menu-item value="fr">France</sp-menu-item>
                    <sp-menu-item value="jp">Japan</sp-menu-item>
                    <sp-menu-item value="cn">China</sp-menu-item>
                </sp-picker>
            </div>
            
            <div class="form-field">
                <sp-field-label for="timezone-picker">
                    Time zone
                </sp-field-label>
                <sp-picker id="timezone-picker" label="Time zone" value="pst">
                    <sp-menu-item value="pst">Pacific Standard Time (PST)</sp-menu-item>
                    <sp-menu-item value="mst">Mountain Standard Time (MST)</sp-menu-item>
                    <sp-menu-item value="cst">Central Standard Time (CST)</sp-menu-item>
                    <sp-menu-item value="est">Eastern Standard Time (EST)</sp-menu-item>
                    <sp-menu-item value="utc">Coordinated Universal Time (UTC)</sp-menu-item>
                    <sp-menu-item value="gmt">Greenwich Mean Time (GMT)</sp-menu-item>
                </sp-picker>
            </div>
        </div>
    `;
};

PickerIntegration.parameters = {
    docs: {
        description: {
            story: 'Form with picker components that use overlays for dropdown menus.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Inline form editing - edit with popover overlay
 * 
 * **Use case:** Edit values without navigating away from the page
 * 
 * **Key features:**
 * - Quick inline editing
 * - Save/cancel actions
 * - Preserves context
 * 
 * 📖 [Forms Integration Guide](./FORMS-INTEGRATION.md#inline-editing)
 */
export const InlineFormEditing = (): TemplateResult => {
    const handleSave = () => {
        const nameField = document.querySelector('#edit-name-field') as any;
        const emailField = document.querySelector('#edit-email-field') as any;
        const display = document.querySelector('#user-info-display') as any;
        
        if (nameField && emailField && display) {
            display.innerHTML = `
                <strong>${nameField.value}</strong><br>
                ${emailField.value}
            `;
        }
        
        const overlay = document.querySelector('#edit-overlay') as any;
        if (overlay) overlay.open = false;
    };
    
    const handleCancel = () => {
        const overlay = document.querySelector('#edit-overlay') as any;
        if (overlay) overlay.open = false;
    };
    
    return html`
        <style>
            .profile-container {
                padding: 40px;
                max-width: 600px;
            }
            .user-card {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 20px;
                background: var(--spectrum-gray-100);
                border-radius: 8px;
            }
            .form-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
                justify-content: flex-end;
            }
        </style>
        <div class="profile-container">
            <h3>User Profile</h3>
            <div class="user-card">
                <div id="user-info-display">
                    <strong>John Doe</strong><br>
                    john.doe@example.com
                </div>
                <sp-button id="edit-trigger" variant="secondary">
                    Edit
                </sp-button>
                <sp-overlay 
                    id="edit-overlay"
                    trigger="edit-trigger@click"
                    type="modal"
                    placement="bottom-end"
                >
                    <sp-popover>
                        <sp-dialog size="m" no-divider>
                            <h4 slot="heading">Edit Profile</h4>
                            <sp-field-label for="edit-name-field">
                                Full name
                            </sp-field-label>
                            <sp-textfield 
                                id="edit-name-field"
                                value="John Doe"
                            ></sp-textfield>
                            
                            <sp-field-label for="edit-email-field" style="margin-top: 15px;">
                                Email
                            </sp-field-label>
                            <sp-textfield 
                                id="edit-email-field"
                                value="john.doe@example.com"
                            ></sp-textfield>
                            
                            <div class="form-actions">
                                <sp-button variant="secondary" @click=${handleCancel}>
                                    Cancel
                                </sp-button>
                                <sp-button variant="accent" @click=${handleSave}>
                                    Save
                                </sp-button>
                            </div>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
        </div>
    `;
};

InlineFormEditing.parameters = {
    docs: {
        description: {
            story: 'Inline editing pattern using a popover overlay for quick updates.',
        },
    },
    chromatic: { disableSnapshot: true },
};


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
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import {
    openOverlay,
    VirtualTrigger,
} from '@spectrum-web-components/overlay';

export default {
    title: 'Overlay/Patterns & Examples/Common Patterns',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Real-world overlay patterns and integration examples demonstrating common use cases.',
            },
        },
    },
};

/**
 * Basic tooltip pattern - shows hover help text
 * 
 * **Use case:** Provide additional context or help for UI elements
 * 
 * **Key features:**
 * - Hover interaction with delayed show
 * - Keyboard accessible (shows on focus)
 * - Non-blocking (type="hint")
 * 
 * 📖 [Accessibility Guide](./ACCESSIBILITY.md)
 */
export const TooltipPattern = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
                display: flex;
                gap: 20px;
                align-items: center;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="save-btn" variant="primary">Save</sp-button>
            <sp-overlay 
                trigger="save-btn@hover" 
                type="hint" 
                placement="top"
                delayed
            >
                <sp-tooltip>Save your changes (⌘S)</sp-tooltip>
            </sp-overlay>
            
            <sp-button id="cancel-btn" variant="secondary">Cancel</sp-button>
            <sp-overlay 
                trigger="cancel-btn@hover" 
                type="hint" 
                placement="top"
                delayed
            >
                <sp-tooltip>Discard all changes</sp-tooltip>
            </sp-overlay>
        </div>
    `;
};

TooltipPattern.parameters = {
    docs: {
        description: {
            story: 'Simple tooltip pattern for providing contextual help on hover.',
        },
    },
};

/**
 * Confirmation dialog pattern - modal overlay requiring user decision
 * 
 * **Use case:** Confirm destructive actions or important decisions
 * 
 * **Key features:**
 * - Modal type blocks interaction with page
 * - Underlay dims background
 * - Managed buttons with events
 * - Keyboard accessible (Escape closes)
 * 
 * 📖 [Forms Integration](./FORMS-INTEGRATION.md)
 */
export const ConfirmationDialog = (): TemplateResult => {
    const handleDelete = () => {
        alert('Item deleted!');
    };
    
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="delete-btn" variant="negative">Delete Item</sp-button>
            <sp-overlay trigger="delete-btn@click" type="modal">
                <sp-dialog-wrapper
                    headline="Delete this item?"
                    confirm-label="Delete"
                    cancel-label="Cancel"
                    underlay
                    @confirm=${() => {
                        handleDelete();
                        const overlay = document.querySelector('sp-overlay[trigger="delete-btn@click"]');
                        if (overlay) overlay.open = false;
                    }}
                    @cancel=${() => {
                        const overlay = document.querySelector('sp-overlay[trigger="delete-btn@click"]');
                        if (overlay) overlay.open = false;
                    }}
                >
                    <p>This action cannot be undone. Are you sure you want to delete this item?</p>
                </sp-dialog-wrapper>
            </sp-overlay>
        </div>
    `;
};

ConfirmationDialog.parameters = {
    docs: {
        description: {
            story: 'Modal confirmation dialog for important user decisions.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Dropdown picker pattern - custom select with overlay
 * 
 * **Use case:** Replace native select with styled picker
 * 
 * **Key features:**
 * - Click interaction
 * - Auto placement adapts to viewport
 * - Keyboard navigation support
 * 
 * 📖 [Menus Integration](./MENUS-INTEGRATION.md)
 */
export const DropdownPicker = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-field-label for="country-picker">Select a country</sp-field-label>
            <sp-picker id="country-picker" label="Country" value="us">
                <sp-menu-item value="us">United States</sp-menu-item>
                <sp-menu-item value="uk">United Kingdom</sp-menu-item>
                <sp-menu-item value="ca">Canada</sp-menu-item>
                <sp-menu-item value="au">Australia</sp-menu-item>
                <sp-menu-item value="de">Germany</sp-menu-item>
                <sp-menu-item value="fr">France</sp-menu-item>
            </sp-picker>
        </div>
    `;
};

DropdownPicker.parameters = {
    docs: {
        description: {
            story: 'Dropdown picker component with overlay menu.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Action menu pattern - icon button with dropdown menu
 * 
 * **Use case:** More actions menu, overflow menu
 * 
 * **Key features:**
 * - Action button with hold affordance
 * - Menu closes on item select
 * - Keyboard accessible
 * 
 * 📖 [Menus Integration](./MENUS-INTEGRATION.md#action-menus)
 */
export const ActionMenu = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-action-button id="more-actions">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
            <sp-overlay 
                trigger="more-actions@click" 
                type="auto" 
                placement="bottom-end"
            >
                <sp-popover>
                    <sp-menu @change=${(e: Event) => {
                        const overlay = document.querySelector('sp-overlay[trigger="more-actions@click"]') as any;
                        if (overlay) overlay.open = false;
                    }}>
                        <sp-menu-item>Edit</sp-menu-item>
                        <sp-menu-item>Duplicate</sp-menu-item>
                        <sp-menu-item>Share</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Delete</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

ActionMenu.parameters = {
    docs: {
        description: {
            story: 'Action button with dropdown menu for additional options.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Help system pattern - tooltip + detailed dialog
 * 
 * **Use case:** Quick help on hover, detailed help on click
 * 
 * **Key features:**
 * - Multiple interactions (hover + click)
 * - overlay-trigger for combined pattern
 * - Different content for each interaction
 * 
 * 📖 [overlay-trigger Documentation](./overlay-trigger.md)
 */
export const HelpSystem = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <overlay-trigger triggered-by="hover click" placement="right">
                <sp-button slot="trigger">Export Options</sp-button>
                <sp-tooltip slot="hover-content" delayed>
                    Click for export options
                </sp-tooltip>
                <sp-popover slot="click-content">
                    <sp-dialog size="s" no-divider>
                        <h3 slot="heading">Export Options</h3>
                        <p>Choose your export format:</p>
                        <sp-menu>
                            <sp-menu-item>PDF Document</sp-menu-item>
                            <sp-menu-item>PNG Image</sp-menu-item>
                            <sp-menu-item>SVG Vector</sp-menu-item>
                            <sp-menu-item>JSON Data</sp-menu-item>
                        </sp-menu>
                    </sp-dialog>
                </sp-popover>
            </overlay-trigger>
        </div>
    `;
};

HelpSystem.parameters = {
    docs: {
        description: {
            story: 'Combined hover tooltip and click dialog for progressive disclosure.',
        },
    },
    chromatic: { disableSnapshot: true },
};

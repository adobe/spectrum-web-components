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
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';

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
    const handleDelete = (): void => {
        alert('Item deleted!');
    };

    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="delete-btn" variant="negative">
                Delete Item
            </sp-button>
            <sp-overlay trigger="delete-btn@click" type="modal">
                <sp-dialog-wrapper
                    headline="Delete this item?"
                    confirm-label="Delete"
                    cancel-label="Cancel"
                    underlay
                    @confirm=${() => {
                        handleDelete();
                        const overlay = document.querySelector(
                            'sp-overlay[trigger="delete-btn@click"]'
                        ) as HTMLElement & { open: boolean };
                        if (overlay) overlay.open = false;
                    }}
                    @cancel=${() => {
                        const overlay = document.querySelector(
                            'sp-overlay[trigger="delete-btn@click"]'
                        ) as HTMLElement & { open: boolean };
                        if (overlay) overlay.open = false;
                    }}
                >
                    <p>
                        This action cannot be undone. Are you sure you want to
                        delete this item?
                    </p>
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
            <sp-field-label for="country-picker">
                Select a country
            </sp-field-label>
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
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="more-actions@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
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

/**
 * Split button menu - button with attached dropdown
 *
 * **Use case:** Primary action button with additional options
 *
 * **Key features:**
 * - Main button for primary action
 * - Dropdown for secondary actions
 * - Common in toolbars and forms
 *
 * 📖 [Button Patterns](./README.md#split-buttons)
 */
export const SplitButtonMenu = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .split-button {
                display: inline-flex;
                gap: 0;
            }
            .split-button sp-button {
                border-radius: 0;
            }
            .split-button sp-button:first-child {
                border-start-start-radius: var(--spectrum-button-border-radius);
                border-end-start-radius: var(--spectrum-button-border-radius);
            }
            .split-button sp-button:last-child {
                border-start-end-radius: var(--spectrum-button-border-radius);
                border-end-end-radius: var(--spectrum-button-border-radius);
                border-inline-start: 1px solid rgba(255, 255, 255, 0.2);
            }
        </style>
        <div class="pattern-container">
            <div class="split-button">
                <sp-button
                    variant="accent"
                    @click=${() => alert('Primary action!')}
                >
                    Save
                </sp-button>
                <sp-button variant="accent" id="split-menu-trigger">
                    ▾
                </sp-button>
            </div>
            <sp-overlay
                trigger="split-menu-trigger@click"
                type="auto"
                placement="bottom-end"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="split-menu-trigger@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <sp-menu-item>Save As...</sp-menu-item>
                        <sp-menu-item>Save Copy</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Export...</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

SplitButtonMenu.parameters = {
    docs: {
        description: {
            story: 'Split button pattern with primary action and dropdown menu for secondary actions.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Table row actions - context menu for table rows
 *
 * **Use case:** Actions menu for each row in a table
 *
 * **Key features:**
 * - Efficient with many rows
 * - Consistent positioning
 * - Keyboard accessible
 *
 * 📖 [Table Integration](./README.md#table-patterns)
 */
export const TableRowActions = (): TemplateResult => {
    const rows = [
        { id: 1, name: 'Document 1', status: 'Draft' },
        { id: 2, name: 'Document 2', status: 'Published' },
        { id: 3, name: 'Document 3', status: 'Archived' },
    ];

    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .table {
                width: 100%;
                border-collapse: collapse;
            }
            .table th,
            .table td {
                padding: 12px;
                text-align: left;
                border-bottom: 1px solid var(--spectrum-gray-300);
            }
            .table th {
                background: var(--spectrum-gray-100);
                font-weight: bold;
            }
        </style>
        <div class="pattern-container">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(
                        (row) => html`
                            <tr>
                                <td>${row.name}</td>
                                <td>${row.status}</td>
                                <td>
                                    <sp-action-button
                                        id="row-${row.id}-actions"
                                    >
                                        <sp-icon-more
                                            slot="icon"
                                        ></sp-icon-more>
                                    </sp-action-button>
                                    <sp-overlay
                                        trigger="row-${row.id}-actions@click"
                                        type="auto"
                                        placement="bottom-end"
                                    >
                                        <sp-popover>
                                            <sp-menu
                                                @change=${() => {
                                                    const overlay =
                                                        document.querySelector(
                                                            `sp-overlay[trigger="row-${row.id}-actions@click"]`
                                                        ) as HTMLElement & {
                                                            open: boolean;
                                                        };
                                                    if (overlay)
                                                        overlay.open = false;
                                                }}
                                            >
                                                <sp-menu-item>
                                                    Edit
                                                </sp-menu-item>
                                                <sp-menu-item>
                                                    Duplicate
                                                </sp-menu-item>
                                                <sp-menu-divider></sp-menu-divider>
                                                <sp-menu-item>
                                                    Delete
                                                </sp-menu-item>
                                            </sp-menu>
                                        </sp-popover>
                                    </sp-overlay>
                                </td>
                            </tr>
                        `
                    )}
                </tbody>
            </table>
        </div>
    `;
};

TableRowActions.parameters = {
    docs: {
        description: {
            story: 'Action menu for each table row. Common pattern in data tables and lists.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Card actions - hover overlay on cards
 *
 * **Use case:** Show actions when hovering over cards
 *
 * **Key features:**
 * - Actions revealed on hover
 * - Clean card appearance when not hovered
 * - Good for dashboards and galleries
 *
 * 📖 [Card Patterns](./README.md#card-interactions)
 */
export const CardActions = (): TemplateResult => {
    const cards = [
        { id: 1, title: 'Project Alpha', desc: 'Active project' },
        { id: 2, title: 'Project Beta', desc: 'In progress' },
        { id: 3, title: 'Project Gamma', desc: 'Completed' },
    ];

    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .card-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 20px;
            }
            .card {
                padding: 20px;
                background: var(--spectrum-gray-100);
                border-radius: 8px;
                border: 1px solid var(--spectrum-gray-300);
                position: relative;
            }
            .card h3 {
                margin: 0 0 8px 0;
                font-size: 16px;
            }
            .card p {
                margin: 0;
                font-size: 14px;
                color: var(--spectrum-gray-700);
            }
            .card-actions {
                position: absolute;
                top: 8px;
                right: 8px;
            }
        </style>
        <div class="pattern-container">
            <div class="card-grid">
                ${cards.map(
                    (card) => html`
                        <div class="card">
                            <h3>${card.title}</h3>
                            <p>${card.desc}</p>
                            <div class="card-actions">
                                <sp-action-button
                                    id="card-${card.id}-actions"
                                    quiet
                                >
                                    <sp-icon-more slot="icon"></sp-icon-more>
                                </sp-action-button>
                                <sp-overlay
                                    trigger="card-${card.id}-actions@click"
                                    type="auto"
                                    placement="bottom-end"
                                >
                                    <sp-popover>
                                        <sp-menu
                                            @change=${() => {
                                                const overlay =
                                                    document.querySelector(
                                                        `sp-overlay[trigger="card-${card.id}-actions@click"]`
                                                    ) as HTMLElement & {
                                                        open: boolean;
                                                    };
                                                if (overlay)
                                                    overlay.open = false;
                                            }}
                                        >
                                            <sp-menu-item>Open</sp-menu-item>
                                            <sp-menu-item>Share</sp-menu-item>
                                            <sp-menu-divider></sp-menu-divider>
                                            <sp-menu-item>Delete</sp-menu-item>
                                        </sp-menu>
                                    </sp-popover>
                                </sp-overlay>
                            </div>
                        </div>
                    `
                )}
            </div>
        </div>
    `;
};

CardActions.parameters = {
    docs: {
        description: {
            story: 'Action menu on cards. Common in dashboards, galleries, and grid layouts.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Toolbar popover - rich content in toolbar
 *
 * **Use case:** Text formatting, color pickers, or complex options in toolbar
 *
 * **Key features:**
 * - Toolbar button opens rich popover
 * - Interactive content within popover
 * - Stays open while interacting
 *
 * 📖 [Toolbar Integration](./README.md#toolbar-patterns)
 */
export const ToolbarPopover = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .toolbar {
                display: flex;
                gap: 4px;
                padding: 8px;
                background: var(--spectrum-gray-100);
                border-radius: 8px;
                width: fit-content;
            }
            .color-grid {
                display: grid;
                grid-template-columns: repeat(6, 30px);
                gap: 8px;
                padding: 12px;
            }
            .color-swatch {
                width: 30px;
                height: 30px;
                border-radius: 4px;
                cursor: pointer;
                border: 2px solid transparent;
            }
            .color-swatch:hover {
                border-color: var(--spectrum-gray-700);
            }
        </style>
        <div class="pattern-container">
            <div class="toolbar">
                <sp-action-button>B</sp-action-button>
                <sp-action-button>I</sp-action-button>
                <sp-action-button>U</sp-action-button>
                <sp-action-button id="color-picker">A</sp-action-button>
            </div>
            <sp-overlay
                trigger="color-picker@click"
                type="auto"
                placement="bottom-start"
            >
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <h3
                            slot="heading"
                            style="margin: 0 0 8px 0; font-size: 14px;"
                        >
                            Text Color
                        </h3>
                        <div class="color-grid">
                            ${[
                                '#FF0000',
                                '#00FF00',
                                '#0000FF',
                                '#FFFF00',
                                '#FF00FF',
                                '#00FFFF',
                                '#000000',
                                '#FFFFFF',
                                '#808080',
                                '#FFA500',
                                '#800080',
                                '#008000',
                            ].map(
                                (color) => html`
                                    <div
                                        class="color-swatch"
                                        role="button"
                                        tabindex="0"
                                        style="background-color: ${color};"
                                        @click=${() => {
                                            const overlay =
                                                document.querySelector(
                                                    'sp-overlay[trigger="color-picker@click"]'
                                                ) as HTMLElement & {
                                                    open: boolean;
                                                };
                                            if (overlay) overlay.open = false;
                                        }}
                                        @keydown=${(event: KeyboardEvent) => {
                                            if (
                                                event.key === 'Enter' ||
                                                event.key === ' '
                                            ) {
                                                event.preventDefault();
                                                const overlay =
                                                    document.querySelector(
                                                        'sp-overlay[trigger="color-picker@click"]'
                                                    ) as HTMLElement & {
                                                        open: boolean;
                                                    };
                                                if (overlay)
                                                    overlay.open = false;
                                            }
                                        }}
                                    ></div>
                                `
                            )}
                        </div>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

ToolbarPopover.parameters = {
    docs: {
        description: {
            story: 'Toolbar button with rich popover content. Common in text editors and design tools.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Notification system - toast-style overlays
 *
 * **Use case:** Non-blocking notifications and feedback
 *
 * **Key features:**
 * - type="manual" for custom positioning
 * - Auto-dismiss after timeout
 * - Stacked notifications
 *
 * 📖 [Toast Patterns](../../toast/README.md)
 */
export const NotificationSystem = (): TemplateResult => {
    let notificationCount = 0;

    const showNotification = (message: string): void => {
        notificationCount++;
        const id = `notification-${notificationCount}`;

        const toast = document.createElement('div');
        toast.id = id;
        toast.style.cssText = `
            position: fixed;
            bottom: ${20 + (notificationCount - 1) * 60}px;
            right: 20px;
            padding: 16px 20px;
            background: var(--spectrum-gray-800);
            color: var(--spectrum-gray-50);
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                toast.remove();
                notificationCount--;
            }, 300);
        }, 3000);
    };

    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        </style>
        <div class="pattern-container">
            <sp-button
                @click=${() => showNotification('Task completed successfully!')}
            >
                Show Success
            </sp-button>
            <sp-button
                @click=${() => showNotification('Warning: Low disk space')}
            >
                Show Warning
            </sp-button>
            <sp-button
                @click=${() => showNotification('Error: Operation failed')}
            >
                Show Error
            </sp-button>
        </div>
    `;
};

NotificationSystem.parameters = {
    docs: {
        description: {
            story: 'Toast-style notification system with auto-dismiss and stacking. Common for feedback and alerts.',
        },
    },
    chromatic: { disableSnapshot: true },
};

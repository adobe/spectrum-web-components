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
import { html, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-cut.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-paste.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu.js';
import { openOverlay, VirtualTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';

export default {
    title: 'Overlay/Patterns & Examples/Menu Patterns',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Menu-specific overlay patterns including context menus, action menus, nested menus, and dropdown patterns.',
            },
        },
    },
};

/**
 * Advanced context menu with icons
 *
 * **Use case:** Right-click menu with icons and keyboard shortcuts
 *
 * **Key features:**
 * - VirtualTrigger for cursor positioning
 * - Menu items with icons
 * - Keyboard shortcut hints
 * - Grouped actions with dividers
 *
 * 📖 [Context Menu Guide](./README.md#context-menus)
 */
export const ContextMenuAdvanced = (): TemplateResult => {
    const handleContextMenu = async (event: MouseEvent): Promise<void> => {
        event.preventDefault();

        // Remove any existing context menus
        const existing = document.querySelector('.context-menu-advanced');
        if (existing) existing.remove();

        // Create menu content
        const menu = document.createElement('sp-popover');
        menu.innerHTML = `
            <sp-menu>
                <sp-menu-item>
                    <sp-icon-cut slot="icon"></sp-icon-cut>
                    Cut
                    <span slot="value">⌘X</span>
                </sp-menu-item>
                <sp-menu-item>
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                    Copy
                    <span slot="value">⌘C</span>
                </sp-menu-item>
                <sp-menu-item>
                    <sp-icon-paste slot="icon"></sp-icon-paste>
                    Paste
                    <span slot="value">⌘V</span>
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    Delete
                    <span slot="value">⌫</span>
                </sp-menu-item>
            </sp-menu>
        `;

        // Position at cursor
        const trigger = new VirtualTrigger(event.clientX, event.clientY);

        // Open overlay
        const overlay = await openOverlay(menu, {
            trigger,
            placement: 'right-start',
            type: 'auto',
            notImmediatelyClosable: true,
        });

        overlay.classList.add('context-menu-advanced');
        document.body.appendChild(overlay);

        // Clean up when closed
        overlay.addEventListener(
            'sp-closed',
            () => {
                overlay.remove();
            },
            { once: true }
        );

        // Handle menu item clicks
        menu.addEventListener('change', () => {
            overlay.open = false;
        });
    };

    return html`
        <style>
            .context-area {
                padding: 60px 100px;
                background: var(--spectrum-gray-200);
                border: 2px dashed var(--spectrum-gray-400);
                border-radius: 8px;
                text-align: center;
                cursor: context-menu;
                user-select: none;
            }
        </style>
        <div class="context-area" @contextmenu=${handleContextMenu}>
            <p
                style="margin: 0; color: var(--spectrum-gray-800); font-weight: bold;"
            >
                Right-click here for context menu with icons
            </p>
        </div>
    `;
};

ContextMenuAdvanced.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Advanced context menu with icons and keyboard shortcuts. Right-click to open.',
        },
    },
};

/**
 * Action menu with groups
 *
 * **Use case:** Organized action menu with grouped items
 *
 * **Key features:**
 * - sp-menu-group for categorization
 * - Headers for each group
 * - Dividers between groups
 * - Disabled items where appropriate
 *
 * 📖 [Menu Integration](./README.md#action-menus)
 */
export const ActionMenuWithGroups = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-action-button id="grouped-menu">
                <sp-icon-more slot="icon"></sp-icon-more>
            </sp-action-button>
            <sp-overlay
                trigger="grouped-menu@click"
                type="auto"
                placement="bottom-end"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="grouped-menu@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <sp-menu-group>
                            <span slot="header">File</span>
                            <sp-menu-item>New</sp-menu-item>
                            <sp-menu-item>Open</sp-menu-item>
                            <sp-menu-item>Save</sp-menu-item>
                            <sp-menu-item>Save As...</sp-menu-item>
                        </sp-menu-group>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-group>
                            <span slot="header">Edit</span>
                            <sp-menu-item>Cut</sp-menu-item>
                            <sp-menu-item>Copy</sp-menu-item>
                            <sp-menu-item>Paste</sp-menu-item>
                        </sp-menu-group>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-group>
                            <span slot="header">Share</span>
                            <sp-menu-item>Export</sp-menu-item>
                            <sp-menu-item disabled>Publish</sp-menu-item>
                        </sp-menu-group>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

ActionMenuWithGroups.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Action menu with grouped items using sp-menu-group. Headers organize related actions.',
        },
    },
};

/**
 * Nested menus - multi-level navigation
 *
 * **Use case:** Hierarchical menu structure with submenus
 *
 * **Key features:**
 * - Nested sp-overlay elements
 * - Proper z-index stacking
 * - Hover or click to expand
 * - Breadcrumb-like navigation
 *
 * 📖 [Advanced Menu Patterns](./README.md#nested-menus)
 */
export const NestedMenus = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="nested-trigger">File Menu</sp-button>
            <sp-overlay
                trigger="nested-trigger@click"
                type="auto"
                placement="bottom-start"
            >
                <sp-popover>
                    <sp-menu>
                        <sp-menu-item>New File</sp-menu-item>
                        <sp-menu-item>Open File</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item id="recent-trigger">
                            Recent Files ▸
                        </sp-menu-item>
                        <sp-menu-item id="templates-trigger">
                            From Template ▸
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Close</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>

            <!-- Nested menu for Recent Files -->
            <sp-overlay
                trigger="recent-trigger@hover"
                type="auto"
                placement="right-start"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlays =
                                document.querySelectorAll('sp-overlay[open]');
                            overlays.forEach((overlay) => {
                                (
                                    overlay as HTMLElement & { open: boolean }
                                ).open = false;
                            });
                        }}
                    >
                        <sp-menu-item>Document 1.txt</sp-menu-item>
                        <sp-menu-item>Document 2.txt</sp-menu-item>
                        <sp-menu-item>Presentation.ppt</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Clear Recent</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>

            <!-- Nested menu for Templates -->
            <sp-overlay
                trigger="templates-trigger@hover"
                type="auto"
                placement="right-start"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlays =
                                document.querySelectorAll('sp-overlay[open]');
                            overlays.forEach((overlay) => {
                                (
                                    overlay as HTMLElement & { open: boolean }
                                ).open = false;
                            });
                        }}
                    >
                        <sp-menu-item>Blank Document</sp-menu-item>
                        <sp-menu-item>Report Template</sp-menu-item>
                        <sp-menu-item>Invoice Template</sp-menu-item>
                        <sp-menu-item>Letter Template</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

NestedMenus.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Multi-level nested menus with hover expansion. Common in application menus and file browsers.',
        },
    },
};

/**
 * Dropdown menu - classic dropdown pattern
 *
 * **Use case:** Simple dropdown menu button
 *
 * **Key features:**
 * - Button that opens menu below
 * - Auto placement adjusts to viewport
 * - Menu closes on item selection
 * - Common in navigation and toolbars
 *
 * 📖 [Menu Patterns](./README.md#dropdown-menus)
 */
export const DropdownMenu = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
                display: flex;
                gap: 20px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="file-menu">File ▾</sp-button>
            <sp-overlay
                trigger="file-menu@click"
                type="auto"
                placement="bottom-start"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="file-menu@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <sp-menu-item>New</sp-menu-item>
                        <sp-menu-item>Open</sp-menu-item>
                        <sp-menu-item>Save</sp-menu-item>
                        <sp-menu-item>Save As...</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Close</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>

            <sp-button id="edit-menu">Edit ▾</sp-button>
            <sp-overlay
                trigger="edit-menu@click"
                type="auto"
                placement="bottom-start"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="edit-menu@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <sp-menu-item>Undo</sp-menu-item>
                        <sp-menu-item>Redo</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Cut</sp-menu-item>
                        <sp-menu-item>Copy</sp-menu-item>
                        <sp-menu-item>Paste</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>

            <sp-button id="view-menu">View ▾</sp-button>
            <sp-overlay
                trigger="view-menu@click"
                type="auto"
                placement="bottom-start"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="view-menu@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <sp-menu-item>Zoom In</sp-menu-item>
                        <sp-menu-item>Zoom Out</sp-menu-item>
                        <sp-menu-item>Actual Size</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Fullscreen</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

DropdownMenu.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Classic dropdown menu pattern. Common in application menu bars and navigation.',
        },
    },
};

/**
 * Split button dropdown - primary action with menu
 *
 * **Use case:** Primary action with additional options in dropdown
 *
 * **Key features:**
 * - Main button executes primary action
 * - Dropdown arrow opens menu of alternatives
 * - Visually connected buttons
 * - Common in toolbars and forms
 *
 * 📖 [Split Button Pattern](./README.md#split-buttons)
 */
export const SplitButtonDropdown = (): TemplateResult => {
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
                padding: 0 8px;
            }
        </style>
        <div class="pattern-container">
            <div class="split-button">
                <sp-button
                    variant="accent"
                    @click=${() => alert('Saving document...')}
                >
                    Save
                </sp-button>
                <sp-button variant="accent" id="save-options">▾</sp-button>
            </div>
            <sp-overlay
                trigger="save-options@click"
                type="auto"
                placement="bottom-end"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="save-options@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <sp-menu-item>Save As...</sp-menu-item>
                        <sp-menu-item>Save Copy</sp-menu-item>
                        <sp-menu-item>Save All</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>Export as PDF</sp-menu-item>
                        <sp-menu-item>Export as Image</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>

            <div class="split-button" style="margin-left: 20px;">
                <sp-button
                    variant="primary"
                    @click=${() => alert('Creating new document...')}
                >
                    New
                </sp-button>
                <sp-button variant="primary" id="new-options">▾</sp-button>
            </div>
            <sp-overlay
                trigger="new-options@click"
                type="auto"
                placement="bottom-end"
            >
                <sp-popover>
                    <sp-menu
                        @change=${() => {
                            const overlay = document.querySelector(
                                'sp-overlay[trigger="new-options@click"]'
                            ) as HTMLElement & { open: boolean };
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <sp-menu-item>Blank Document</sp-menu-item>
                        <sp-menu-item>From Template</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>New Folder</sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

SplitButtonDropdown.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Split button pattern with primary action and dropdown menu. Left button executes default action, right opens alternatives.',
        },
    },
};

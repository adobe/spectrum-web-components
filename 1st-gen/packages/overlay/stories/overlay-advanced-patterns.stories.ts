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
import { html, TemplateResult, render } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import {
    openOverlay,
    Overlay,
    VirtualTrigger,
} from '@spectrum-web-components/overlay';
import {
    removeSlottableRequest,
    SlottableRequestEvent,
} from '../src/slottable-request-event.js';

export default {
    title: 'Overlay/Patterns & Examples/Advanced Patterns',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Complex overlay patterns including nested overlays, dynamic content, and advanced VirtualTrigger usage.',
            },
        },
    },
};

/**
 * Nested overlays - overlay within overlay
 * 
 * **Use case:** Multi-level interactions like menus with submenus
 * 
 * **Key features:**
 * - Proper z-index stacking
 * - Independent lifecycle management
 * - ESC key closes in order (most recent first)
 * 
 * 📖 [Architecture Guide](./ARCHITECTURE.md#overlay-stack)
 */
export const NestedOverlays = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="first-trigger" variant="primary">
                Open First Overlay
            </sp-button>
            <sp-overlay trigger="first-trigger@click" type="auto" placement="bottom">
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <h4 slot="heading">First Overlay</h4>
                        <p>This is the first level overlay.</p>
                        <sp-button id="second-trigger">Open Second Overlay</sp-button>
                        <sp-overlay trigger="second-trigger@click" type="auto" placement="right">
                            <sp-popover>
                                <sp-dialog size="s" no-divider>
                                    <h4 slot="heading">Second Overlay</h4>
                                    <p>This overlay is stacked on top.</p>
                                    <sp-button id="third-trigger">Open Third Overlay</sp-button>
                                    <sp-overlay trigger="third-trigger@click" type="auto" placement="right">
                                        <sp-popover>
                                            <sp-dialog size="s" no-divider>
                                                <h4 slot="heading">Third Overlay</h4>
                                                <p>Deepest level. Press ESC to close overlays in order.</p>
                                            </sp-dialog>
                                        </sp-popover>
                                    </sp-overlay>
                                </sp-dialog>
                            </sp-popover>
                        </sp-overlay>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

NestedOverlays.parameters = {
    docs: {
        description: {
            story: 'Multiple overlays nested within each other with proper stacking and focus management.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Dynamic content updates - update overlay content after opening
 * 
 * **Use case:** Loading data, updating based on user interaction
 * 
 * **Key features:**
 * - Content updates after overlay opens
 * - Call Overlay.update() to reposition
 * - Maintains proper positioning
 * 
 * 📖 [Performance Guide](./PERFORMANCE.md#manual-updates)
 */
export const DynamicContentUpdates = (): TemplateResult => {
    let itemCount = 1;
    
    const addItem = () => {
        const list = document.querySelector('#dynamic-list');
        if (!list) return;
        
        const newItem = document.createElement('li');
        newItem.textContent = `Item ${++itemCount}`;
        newItem.style.margin = '10px 0';
        list.appendChild(newItem);
        
        // Update overlay position after content change.
        Overlay.update();
    };
    
    const removeItem = () => {
        const list = document.querySelector('#dynamic-list');
        if (!list || list.children.length === 0) return;
        
        list.removeChild(list.lastElementChild as Element);
        itemCount--;
        
        // Update overlay position after content change.
        Overlay.update();
    };
    
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            #dynamic-list {
                list-style: none;
                padding: 0;
                margin: 20px 0;
            }
            .action-buttons {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="dynamic-trigger" variant="primary">
                Show Dynamic Content
            </sp-button>
            <sp-overlay 
                id="dynamic-overlay"
                trigger="dynamic-trigger@click" 
                type="auto" 
                placement="bottom"
            >
                <sp-popover>
                    <sp-dialog size="m" no-divider>
                        <h4 slot="heading">Dynamic List</h4>
                        <p>Add or remove items and watch the overlay adjust:</p>
                        <ul id="dynamic-list">
                            <li style="margin: 10px 0;">Item 1</li>
                        </ul>
                        <div class="action-buttons">
                            <sp-button @click=${addItem}>Add Item</sp-button>
                            <sp-button @click=${removeItem} variant="secondary">Remove Item</sp-button>
                        </div>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

DynamicContentUpdates.parameters = {
    docs: {
        description: {
            story: 'Overlay content that updates dynamically with proper repositioning.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Virtual positioning - position overlay at specific coordinates
 * 
 * **Use case:** Context menus, coordinate-based positioning
 * 
 * **Key features:**
 * - Position at any x,y coordinates
 * - No DOM trigger element required
 * - Useful for mouse-based interactions
 * 
 * 📖 [Imperative API Guide](./imperative-api.md#virtualtrigger-patterns)
 */
export const VirtualPositioning = (): TemplateResult => {
    const handleClick = async (event: MouseEvent) => {
        // Remove any existing overlays.
        const existing = document.querySelector('.virtual-position-overlay');
        if (existing) existing.remove();
        
        // Create menu content.
        const menu = document.createElement('sp-popover');
        menu.innerHTML = `
            <sp-dialog size="s" no-divider>
                <h4 slot="heading">Positioned at Click</h4>
                <p>X: ${event.clientX}, Y: ${event.clientY}</p>
                <p>This overlay is positioned exactly where you clicked.</p>
            </sp-dialog>
        `;
        
        // Position at click coordinates.
        const trigger = new VirtualTrigger(event.clientX, event.clientY);
        
        // Open overlay.
        const overlay = await openOverlay(menu, {
            trigger,
            placement: 'bottom-start',
            type: 'auto',
        });
        
        overlay.classList.add('virtual-position-overlay');
        document.body.appendChild(overlay);
        
        // Clean up when closed.
        overlay.addEventListener('sp-closed', () => {
            overlay.remove();
        }, { once: true });
    };
    
    return html`
        <style>
            .click-area {
                padding: 100px;
                background: var(--spectrum-gray-200);
                border: 2px dashed var(--spectrum-gray-400);
                border-radius: 8px;
                text-align: center;
                cursor: pointer;
                user-select: none;
            }
        </style>
        <div class="click-area" @click=${handleClick}>
            <p style="margin: 0; color: var(--spectrum-gray-800); font-weight: bold;">
                Click anywhere in this area
            </p>
            <p style="margin: 10px 0 0 0; color: var(--spectrum-gray-700);">
                An overlay will appear at your cursor position
            </p>
        </div>
    `;
};

VirtualPositioning.parameters = {
    docs: {
        description: {
            story: 'Using VirtualTrigger to position overlays at specific coordinates without a DOM element.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Lazy content loading - load overlay content on demand
 * 
 * **Use case:** Optimize performance with many overlays on page
 * 
 * **Key features:**
 * - Content only rendered when needed
 * - Reduces initial DOM size
 * - Automatic cleanup when closed
 * 
 * 📖 [Performance Guide](./PERFORMANCE.md#lazy-loading)
 */
export const LazyContentLoading = (): TemplateResult => {
    const handleSlottableRequest = (event: SlottableRequestEvent): void => {
        const template =
            event.data === removeSlottableRequest
                ? undefined
                : html`
                      <sp-popover>
                          <sp-dialog size="m" no-divider>
                              <h4 slot="heading">Lazy Loaded Content</h4>
                              <p>This content was only created when you opened the overlay!</p>
                              <p>This pattern is great for performance when you have many overlays on a page.</p>
                              <sp-textfield 
                                  placeholder="Interactive content"
                              ></sp-textfield>
                          </sp-dialog>
                      </sp-popover>
                  `;
        render(template, event.target as HTMLElement);
    };
    
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .info-box {
                margin-top: 20px;
                padding: 15px;
                background: var(--spectrum-gray-100);
                border-radius: 4px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="lazy-button">Open Lazy Overlay</sp-button>
            <sp-overlay
                placement="bottom"
                type="auto"
                trigger="lazy-button@click"
                @slottable-request=${handleSlottableRequest}
            ></sp-overlay>
            
            <div class="info-box">
                <p><strong>💡 Performance tip:</strong> The overlay content is only created when you click the button, reducing memory usage for pages with many overlays.</p>
            </div>
        </div>
    `;
};

LazyContentLoading.parameters = {
    docs: {
        description: {
            story: 'Using slottable-request event to lazy load overlay content for better performance.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Complex modal with nested interactions
 * 
 * **Use case:** Multi-step workflows, wizards, complex forms
 * 
 * **Key features:**
 * - Modal prevents page interaction
 * - Internal state management
 * - Multiple interaction types within modal
 * 
 * 📖 [Modal Patterns Guide](./modal-patterns.md)
 */
export const ComplexModal = (): TemplateResult => {
    let step = 1;
    
    const nextStep = () => {
        step++;
        updateContent();
    };
    
    const prevStep = () => {
        step--;
        updateContent();
    };
    
    const updateContent = () => {
        const contentArea = document.querySelector('#wizard-content');
        if (!contentArea) return;
        
        let content = '';
        switch (step) {
            case 1:
                content = `
                    <h4>Step 1: Basic Information</h4>
                    <p>Enter your basic details to get started.</p>
                    <sp-textfield placeholder="Full Name"></sp-textfield>
                `;
                break;
            case 2:
                content = `
                    <h4>Step 2: Contact Details</h4>
                    <p>How can we reach you?</p>
                    <sp-textfield placeholder="Email Address"></sp-textfield>
                `;
                break;
            case 3:
                content = `
                    <h4>Step 3: Preferences</h4>
                    <p>Customize your experience.</p>
                    <sp-textfield placeholder="Preferences"></sp-textfield>
                `;
                break;
        }
        
        contentArea.innerHTML = content;
        
        const prevBtn = document.querySelector('#prev-btn') as any;
        const nextBtn = document.querySelector('#next-btn') as any;
        
        if (prevBtn) prevBtn.disabled = step === 1;
        if (nextBtn) nextBtn.textContent = step === 3 ? 'Finish' : 'Next';
    };
    
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .wizard-content {
                min-height: 150px;
                margin: 20px 0;
            }
            .wizard-actions {
                display: flex;
                justify-content: space-between;
                margin-top: 20px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="wizard-trigger" variant="accent">
                Start Wizard
            </sp-button>
            <sp-overlay 
                trigger="wizard-trigger@click" 
                type="modal"
            >
                <sp-popover>
                    <sp-dialog size="l" no-divider>
                        <div id="wizard-content" class="wizard-content">
                            <h4>Step 1: Basic Information</h4>
                            <p>Enter your basic details to get started.</p>
                            <sp-textfield placeholder="Full Name"></sp-textfield>
                        </div>
                        <div class="wizard-actions">
                            <sp-button 
                                id="prev-btn"
                                variant="secondary" 
                                @click=${prevStep}
                                disabled
                            >
                                Previous
                            </sp-button>
                            <sp-button 
                                id="next-btn"
                                variant="accent" 
                                @click=${nextStep}
                            >
                                Next
                            </sp-button>
                        </div>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

ComplexModal.parameters = {
    docs: {
        description: {
            story: 'Multi-step wizard in a modal overlay with internal state management.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Cascading menus - menu that opens submenus
 * 
 * **Use case:** Multi-level navigation, complex menu structures
 * 
 * **Key features:**
 * - Hover or click to open submenus
 * - Proper positioning relative to parent
 * - Independent close behavior
 * 
 * 📖 [Menu Patterns Guide](./menu-patterns.md)
 */
export const CascadingMenus = (): TemplateResult => {
    const openSubmenu = async (event: MouseEvent, items: string[]) => {
        const button = event.target as HTMLElement;
        const buttonRect = button.getBoundingClientRect();
        
        // Remove existing submenu.
        const existing = document.querySelector('.submenu-overlay');
        if (existing) existing.remove();
        
        // Create submenu.
        const menu = document.createElement('sp-popover');
        menu.innerHTML = `
            <sp-menu>
                ${items.map(item => `<sp-menu-item>${item}</sp-menu-item>`).join('')}
            </sp-menu>
        `;
        
        // Position relative to button.
        const trigger = new VirtualTrigger(
            buttonRect.right,
            buttonRect.top
        );
        
        const overlay = await openOverlay(menu, {
            trigger,
            placement: 'right-start',
            type: 'auto',
        });
        
        overlay.classList.add('submenu-overlay');
        document.body.appendChild(overlay);
        
        overlay.addEventListener('sp-closed', () => {
            overlay.remove();
        }, { once: true });
    };
    
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .menu-item-with-arrow {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="cascading-trigger">Open Menu</sp-button>
            <sp-overlay 
                trigger="cascading-trigger@click" 
                type="auto" 
                placement="bottom-start"
            >
                <sp-popover>
                    <sp-menu>
                        <sp-menu-item>New File</sp-menu-item>
                        <sp-menu-item>New Folder</sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item 
                            @mouseenter=${(e: MouseEvent) => 
                                openSubmenu(e, ['Import from File', 'Import from URL', 'Import from Clipboard'])
                            }
                        >
                            <div class="menu-item-with-arrow">
                                <span>Import</span>
                                <span>▸</span>
                            </div>
                        </sp-menu-item>
                        <sp-menu-item
                            @mouseenter=${(e: MouseEvent) => 
                                openSubmenu(e, ['Export as PDF', 'Export as PNG', 'Export as SVG'])
                            }
                        >
                            <div class="menu-item-with-arrow">
                                <span>Export</span>
                                <span>▸</span>
                            </div>
                        </sp-menu-item>
                    </sp-menu>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

CascadingMenus.parameters = {
    docs: {
        description: {
            story: 'Menu with submenus that open on hover using VirtualTrigger positioning.',
        },
    },
    chromatic: { disableSnapshot: true },
};


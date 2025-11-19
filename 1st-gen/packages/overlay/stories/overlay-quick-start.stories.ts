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
import '@spectrum-web-components/overlay/sp-overlay.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import {
    openOverlay,
    VirtualTrigger,
} from '@spectrum-web-components/overlay';

export default {
    title: 'Overlay/Getting Started/Quick Start',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Simple, copy-paste examples to get started with overlays quickly. Each example includes minimal code and clear explanations.',
            },
        },
    },
};

const exampleStyles = html`
    <style>
        .example-container {
            padding: 40px;
            min-height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .example-info {
            margin-top: 30px;
            padding: 20px;
            background: var(--spectrum-gray-100);
            border-radius: 8px;
            border-left: 4px solid var(--spectrum-accent-color-900);
        }

        .example-info h4 {
            margin-top: 0;
            color: var(--spectrum-gray-900);
        }

        .example-info p {
            margin: 10px 0;
            color: var(--spectrum-gray-700);
            line-height: 1.6;
        }

        .example-info pre {
            background: rgba(0, 0, 0, 0.1);
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
            margin: 15px 0;
        }

        .example-info code {
            font-family: monospace;
            font-size: 13px;
            line-height: 1.5;
        }

        .try-it {
            display: inline-block;
            padding: 8px 16px;
            background: var(--spectrum-accent-color-100);
            border-radius: 4px;
            margin: 10px 0;
            font-weight: bold;
            color: var(--spectrum-gray-900);
        }
    </style>
`;

/**
 * Basic tooltip - hover help text
 * 
 * **What it does:** Shows helpful text when you hover over an element
 * 
 * **When to use:** Provide additional context or explanation for UI elements
 * 
 * **Try it:** Hover over the button to see the tooltip appear
 */
export const BasicTooltip = (): TemplateResult => {
    return html`
        ${exampleStyles}
        <div>
            <div class="example-container">
                <sp-action-button id="tooltip-example">
                    Save
                </sp-action-button>
                <sp-overlay 
                    trigger="tooltip-example@hover" 
                    type="hint" 
                    placement="top"
                    delayed
                >
                    <sp-tooltip>Save your changes (⌘S)</sp-tooltip>
                </sp-overlay>
            </div>

            <div class="example-info">
                <h4>💡 How it works</h4>
                <p>
                    The <code>trigger</code> attribute connects the tooltip to your button
                    using the button's ID. The <code>@hover</code> part tells it to show on hover.
                </p>
                <p class="try-it">👆 Try it: Hover over the Save button above</p>
                
                <h4>📋 Code</h4>
                <pre><code>&lt;sp-action-button id="tooltip-example"&gt;
  Save
&lt;/sp-action-button&gt;

&lt;sp-overlay 
  trigger="tooltip-example@hover" 
  type="hint" 
  placement="top"
  delayed
&gt;
  &lt;sp-tooltip&gt;Save your changes (⌘S)&lt;/sp-tooltip&gt;
&lt;/sp-overlay&gt;</code></pre>

                <h4>🔑 Key points</h4>
                <p>• <strong>trigger:</strong> Connects to button using "id@interaction"</p>
                <p>• <strong>type="hint":</strong> Non-blocking, won't interfere with page</p>
                <p>• <strong>placement:</strong> Where tooltip appears (top, bottom, left, right)</p>
                <p>• <strong>delayed:</strong> Small delay before showing (better UX)</p>
            </div>
        </div>
    `;
};

BasicTooltip.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Simple popover - click to show content
 * 
 * **What it does:** Shows a popover with content when you click a button
 * 
 * **When to use:** Display additional information, forms, or options
 * 
 * **Try it:** Click the button to open the popover
 */
export const SimplePopover = (): TemplateResult => {
    return html`
        ${exampleStyles}
        <div>
            <div class="example-container">
                <sp-button id="popover-example" variant="primary">
                    Show Details
                </sp-button>
                <sp-overlay 
                    trigger="popover-example@click" 
                    type="auto" 
                    placement="bottom"
                >
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <h3 slot="heading">Quick Details</h3>
                            <p>This is a simple popover with some helpful information.</p>
                            <p>Click outside or press ESC to close.</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>

            <div class="example-info">
                <h4>💡 How it works</h4>
                <p>
                    Similar to tooltips, but uses <code>@click</code> instead of <code>@hover</code>.
                    The popover automatically closes when you click outside or press Escape.
                </p>
                <p class="try-it">👆 Try it: Click the "Show Details" button above</p>
                
                <h4>📋 Code</h4>
                <pre><code>&lt;sp-button id="popover-example"&gt;
  Show Details
&lt;/sp-button&gt;

&lt;sp-overlay 
  trigger="popover-example@click" 
  type="auto" 
  placement="bottom"
&gt;
  &lt;sp-popover&gt;
    &lt;sp-dialog size="s" no-divider&gt;
      &lt;h3 slot="heading"&gt;Quick Details&lt;/h3&gt;
      &lt;p&gt;This is a simple popover...&lt;/p&gt;
    &lt;/sp-dialog&gt;
  &lt;/sp-popover&gt;
&lt;/sp-overlay&gt;</code></pre>

                <h4>🔑 Key points</h4>
                <p>• <strong>@click:</strong> Opens on button click</p>
                <p>• <strong>type="auto":</strong> Closes when clicking outside</p>
                <p>• <strong>sp-popover:</strong> Container for popover content</p>
                <p>• <strong>sp-dialog:</strong> Provides consistent spacing and styling</p>
            </div>
        </div>
    `;
};

SimplePopover.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Modal dialog - full attention overlay
 * 
 * **What it does:** Shows a dialog that requires user attention, with dimmed background
 * 
 * **When to use:** Confirm important actions, collect user input, show critical information
 * 
 * **Try it:** Click the button to open the modal dialog
 */
export const ModalDialog = (): TemplateResult => {
    return html`
        ${exampleStyles}
        <div>
            <div class="example-container">
                <sp-button id="modal-example" variant="accent">
                    Delete Item
                </sp-button>
                <sp-overlay 
                    trigger="modal-example@click" 
                    type="modal"
                >
                    <sp-dialog-wrapper
                        headline="Delete this item?"
                        confirm-label="Delete"
                        cancel-label="Cancel"
                        underlay
                        @confirm=${() => {
                            alert('Item deleted!');
                            const overlay = document.querySelector('sp-overlay[trigger="modal-example@click"]') as any;
                            if (overlay) overlay.open = false;
                        }}
                        @cancel=${() => {
                            const overlay = document.querySelector('sp-overlay[trigger="modal-example@click"]') as any;
                            if (overlay) overlay.open = false;
                        }}
                    >
                        <p>This action cannot be undone. Are you sure?</p>
                    </sp-dialog-wrapper>
                </sp-overlay>
            </div>

            <div class="example-info">
                <h4>💡 How it works</h4>
                <p>
                    Modal dialogs block interaction with the page until closed. The underlay dims
                    the background to focus attention. Use <code>sp-dialog-wrapper</code> for
                    built-in action buttons.
                </p>
                <p class="try-it">👆 Try it: Click "Delete Item" to see the modal</p>
                
                <h4>📋 Code</h4>
                <pre><code>&lt;sp-button id="modal-example"&gt;
  Delete Item
&lt;/sp-button&gt;

&lt;sp-overlay 
  trigger="modal-example@click" 
  type="modal"
&gt;
  &lt;sp-dialog-wrapper
    headline="Delete this item?"
    confirm-label="Delete"
    cancel-label="Cancel"
    underlay
    @confirm=\${handleConfirm}
    @cancel=\${handleCancel}
  &gt;
    &lt;p&gt;This action cannot be undone.&lt;/p&gt;
  &lt;/sp-dialog-wrapper&gt;
&lt;/sp-overlay&gt;</code></pre>

                <h4>🔑 Key points</h4>
                <p>• <strong>type="modal":</strong> Blocks page interaction</p>
                <p>• <strong>underlay:</strong> Dims background</p>
                <p>• <strong>sp-dialog-wrapper:</strong> Provides action buttons</p>
                <p>• <strong>@confirm/@cancel:</strong> Handle button clicks</p>
            </div>
        </div>
    `;
};

ModalDialog.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Context menu - right-click menu
 * 
 * **What it does:** Shows a menu when you right-click in an area
 * 
 * **When to use:** Provide contextual actions for elements or regions
 * 
 * **Try it:** Right-click in the shaded area to open the menu
 */
export const ContextMenu = (): TemplateResult => {
    const handleContextMenu = async (event: MouseEvent) => {
        event.preventDefault();
        
        // Remove any existing context menus.
        const existing = document.querySelector('.context-menu-quick-start');
        if (existing) existing.remove();
        
        // Create menu content.
        const menu = document.createElement('sp-popover');
        menu.innerHTML = `
            <sp-menu>
                <sp-menu-item>Cut</sp-menu-item>
                <sp-menu-item>Copy</sp-menu-item>
                <sp-menu-item>Paste</sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item>Delete</sp-menu-item>
            </sp-menu>
        `;
        
        // Position at cursor.
        const trigger = new VirtualTrigger(event.clientX, event.clientY);
        
        // Open overlay.
        const overlay = await openOverlay(menu, {
            trigger,
            placement: 'right-start',
            type: 'auto',
            notImmediatelyClosable: true,
        });
        
        overlay.classList.add('context-menu-quick-start');
        document.body.appendChild(overlay);
        
        // Clean up when closed.
        overlay.addEventListener('sp-closed', () => {
            overlay.remove();
        }, { once: true });
        
        // Handle menu item clicks.
        menu.addEventListener('change', () => {
            overlay.open = false;
        });
    };
    
    return html`
        ${exampleStyles}
        <div>
            <div class="example-container">
                <div 
                    style="
                        padding: 60px 100px;
                        background: var(--spectrum-gray-200);
                        border: 2px dashed var(--spectrum-gray-400);
                        border-radius: 8px;
                        text-align: center;
                        cursor: context-menu;
                        user-select: none;
                    "
                    @contextmenu=${handleContextMenu}
                >
                    <p style="margin: 0; color: var(--spectrum-gray-800); font-weight: bold;">
                        Right-click here to open menu
                    </p>
                </div>
            </div>

            <div class="example-info">
                <h4>💡 How it works</h4>
                <p>
                    Context menus use the imperative API with <code>VirtualTrigger</code> to
                    position the menu at the cursor. This requires more code but gives you
                    full control.
                </p>
                <p class="try-it">👆 Try it: Right-click in the shaded area above</p>
                
                <h4>📋 Code</h4>
                <pre><code>import { openOverlay, VirtualTrigger } from '@spectrum-web-components/overlay';

const handleContextMenu = async (event: MouseEvent) => {
  event.preventDefault();
  
  const menu = document.createElement('sp-popover');
  menu.innerHTML = \`
    &lt;sp-menu&gt;
      &lt;sp-menu-item&gt;Cut&lt;/sp-menu-item&gt;
      &lt;sp-menu-item&gt;Copy&lt;/sp-menu-item&gt;
      &lt;sp-menu-item&gt;Paste&lt;/sp-menu-item&gt;
    &lt;/sp-menu&gt;
  \`;
  
  const trigger = new VirtualTrigger(event.clientX, event.clientY);
  const overlay = await openOverlay(menu, {
    trigger,
    placement: 'right-start',
    type: 'auto',
  });
  
  document.body.appendChild(overlay);
};

// In your template:
&lt;div @contextmenu=\${handleContextMenu}&gt;
  Right-click here
&lt;/div&gt;</code></pre>

                <h4>🔑 Key points</h4>
                <p>• <strong>VirtualTrigger:</strong> Position at cursor coordinates</p>
                <p>• <strong>openOverlay():</strong> Programmatic API for advanced control</p>
                <p>• <strong>event.preventDefault():</strong> Suppress browser context menu</p>
                <p>• <strong>notImmediatelyClosable:</strong> Prevents instant closing on right-click</p>
            </div>
        </div>
    `;
};

ContextMenu.parameters = {
    chromatic: { disableSnapshot: true },
};

/**
 * Next steps
 * 
 * Now that you've seen the basics, explore more advanced patterns and features.
 */
export const NextSteps = (): TemplateResult => {
    return html`
        <style>
            .next-steps {
                max-width: 800px;
                margin: 0 auto;
                padding: 40px 20px;
            }

            .next-steps h2 {
                color: var(--spectrum-gray-900);
                margin-bottom: 30px;
            }

            .step-card {
                padding: 25px;
                margin: 20px 0;
                background: var(--spectrum-gray-100);
                border-radius: 8px;
                border-left: 4px solid var(--spectrum-accent-color-900);
            }

            .step-card h3 {
                margin-top: 0;
                color: var(--spectrum-gray-900);
            }

            .step-card p {
                margin: 10px 0;
                color: var(--spectrum-gray-700);
                line-height: 1.6;
            }

            .step-card sp-link {
                display: inline-block;
                margin-top: 10px;
            }
        </style>

        <div class="next-steps">
            <h2>What's next?</h2>

            <div class="step-card">
                <h3>📚 Explore common patterns</h3>
                <p>
                    See real-world examples of validation popovers, action menus,
                    help systems, and more with complete code samples.
                </p>
                <sp-link @click=${() => {
                    window.location.hash = '#overlay-patterns-examples-common-patterns--tooltip-pattern';
                }}>
                    View pattern library →
                </sp-link>
            </div>

            <div class="step-card">
                <h3>⚙️ Learn the full API</h3>
                <p>
                    Dive deep into all the options, attributes, and events available
                    for sp-overlay, overlay-trigger, and the trigger() directive.
                </p>
                <sp-link @click=${() => {
                    window.location.hash = '#overlay-api-reference-sp-overlay--modal';
                }}>
                    Read API documentation →
                </sp-link>
            </div>

            <div class="step-card">
                <h3>🔧 Handle edge cases</h3>
                <p>
                    Learn how to handle scrolling containers, z-index conflicts,
                    dynamic content, and other tricky scenarios.
                </p>
                <sp-link @click=${() => {
                    window.location.hash = '#overlay-edge-cases-troubleshooting-edge-cases--nested-scrolling';
                }}>
                    View edge cases →
                </sp-link>
            </div>

            <div class="step-card">
                <h3>🐛 Fix common problems</h3>
                <p>
                    Side-by-side comparisons showing broken code vs. fixed code
                    for the most common overlay issues.
                </p>
                <sp-link @click=${() => {
                    window.location.hash = '#overlay-edge-cases-troubleshooting-troubleshooting--wont-open';
                }}>
                    Troubleshoot issues →
                </sp-link>
            </div>
        </div>
    `;
};

NextSteps.parameters = {
    chromatic: { disableSnapshot: true },
};


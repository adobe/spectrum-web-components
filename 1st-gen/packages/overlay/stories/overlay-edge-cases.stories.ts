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
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

export default {
    title: 'Overlay/Edge Cases & Troubleshooting/Edge Cases',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Common edge cases and their solutions. These examples demonstrate how to handle tricky scenarios.',
            },
        },
    },
};

/**
 * Nested scrolling - overlay in scrollable container
 * 
 * **Problem:** Overlay doesn't stay with trigger when parent scrolls
 * 
 * **Solution:** Overlay system automatically updates position on scroll
 * 
 * 📖 [Troubleshooting Guide](./TROUBLESHOOTING.md#positioning-issues)
 */
export const NestedScrolling = (): TemplateResult => {
    return html`
        <style>
            .scroll-container {
                height: 300px;
                overflow-y: scroll;
                border: 2px solid var(--spectrum-gray-400);
                padding: 20px;
            }
            .scroll-content {
                height: 800px;
                padding: 20px;
            }
            .scroll-content p {
                margin: 20px 0;
            }
        </style>
        <div class="scroll-container">
            <div class="scroll-content">
                <p>Scroll down to see the button...</p>
                <p>Keep scrolling...</p>
                <p>Almost there...</p>
                <p>
                    <sp-button id="scroll-trigger">Show Overlay</sp-button>
                    <sp-overlay trigger="scroll-trigger@click" type="auto" placement="right">
                        <sp-popover>
                            <sp-dialog size="s" no-divider>
                                <p>This overlay stays positioned correctly even when you scroll the container.</p>
                                <p>Try scrolling up and down!</p>
                            </sp-dialog>
                        </sp-popover>
                    </sp-overlay>
                </p>
                <p>More content below...</p>
                <p>More content below...</p>
                <p>More content below...</p>
            </div>
        </div>
    `;
};

NestedScrolling.parameters = {
    docs: {
        description: {
            story: 'Overlays in scrollable containers automatically update their position on scroll.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Z-index issues - overlay appearing behind content
 * 
 * **Problem:** Overlay appears behind other content
 * 
 * **Solution:** Overlays are automatically appended to a top-level overlay container with high z-index
 * 
 * 📖 [Architecture](./ARCHITECTURE.md#overlay-stack)
 */
export const ZIndexIssues = (): TemplateResult => {
    return html`
        <style>
            .high-z {
                position: relative;
                z-index: 100;
                background: var(--spectrum-gray-200);
                padding: 20px;
                margin-bottom: 20px;
            }
            .normal-z {
                position: relative;
                z-index: 1;
                background: var(--spectrum-gray-300);
                padding: 20px;
            }
        </style>
        <div>
            <div class="high-z">
                <h3>High z-index container (z-index: 100)</h3>
                <p>This element has a high z-index, but overlays still appear on top.</p>
            </div>
            <div class="normal-z">
                <sp-button id="zindex-trigger">Show Overlay</sp-button>
                <sp-overlay trigger="zindex-trigger@click" type="auto" placement="top">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>✅ This overlay correctly appears above all content</p>
                            <p>Overlays are rendered in a top-level container to avoid z-index issues.</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
        </div>
    `;
};

ZIndexIssues.parameters = {
    docs: {
        description: {
            story: 'Overlays are automatically managed in a top-level container to avoid z-index conflicts.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Dynamic content - content that updates while overlay is open
 * 
 * **Problem:** Overlay doesn't resize when content changes
 * 
 * **Solution:** Call `Overlay.update()` after content changes
 * 
 * 📖 [Performance Guide](./PERFORMANCE.md#manual-updates)
 */
export const DynamicContent = (): TemplateResult => {
    let expanded = false;
    
    const toggleContent = () => {
        expanded = !expanded;
        const overlay = document.querySelector('#dynamic-overlay') as any;
        const content = overlay?.querySelector('.dynamic-content');
        
        if (content) {
            content.innerHTML = expanded 
                ? '<p>Expanded content with more details...</p><p>Additional information...</p><p>Even more content...</p>'
                : '<p>Basic content</p>';
            
            // Important: Update overlay position after content change
            import('@spectrum-web-components/overlay/sp-overlay.js').then(module => {
                (module as any).Overlay?.update();
            });
        }
    };
    
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="dynamic-trigger">Show Dynamic Overlay</sp-button>
            <sp-overlay 
                id="dynamic-overlay"
                trigger="dynamic-trigger@click" 
                type="auto" 
                placement="bottom"
            >
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <div class="dynamic-content">
                            <p>Basic content</p>
                        </div>
                        <sp-button @click=${toggleContent}>
                            Toggle Content
                        </sp-button>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

DynamicContent.parameters = {
    docs: {
        description: {
            story: 'Updating overlay content dynamically with Overlay.update().',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Rapid toggle - preventing issues with quick open/close
 * 
 * **Problem:** Rapidly clicking causes overlay to get stuck
 * 
 * **Solution:** Overlay system handles debouncing automatically
 * 
 * 📖 [Troubleshooting Guide](./TROUBLESHOOTING.md#interaction-issues)
 */
export const RapidToggle = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .info {
                margin-top: 20px;
                padding: 15px;
                background: var(--spectrum-gray-100);
                border-radius: 4px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="rapid-trigger">Click Me Rapidly!</sp-button>
            <sp-overlay trigger="rapid-trigger@click" type="auto" placement="bottom">
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <p>Try clicking the trigger button multiple times quickly.</p>
                        <p>The overlay handles rapid toggling gracefully.</p>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
            <div class="info">
                <p><strong>Try this:</strong> Click the button multiple times as fast as you can. The overlay system automatically handles rapid interactions without getting stuck or creating multiple overlays.</p>
            </div>
        </div>
    `;
};

RapidToggle.parameters = {
    docs: {
        description: {
            story: 'Overlay system handles rapid toggle interactions without issues.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Multiple overlays - managing overlay stack
 * 
 * **Problem:** Multiple overlays conflicting or not stacking correctly
 * 
 * **Solution:** Overlay stack automatically manages z-index and focus
 * 
 * 📖 [Architecture](./ARCHITECTURE.md#overlay-stack)
 */
export const MultipleOverlays = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="first-trigger">Open First Overlay</sp-button>
            <sp-overlay trigger="first-trigger@click" type="auto" placement="bottom">
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <p>First overlay content</p>
                        <sp-button id="second-trigger">Open Second Overlay</sp-button>
                        <sp-overlay trigger="second-trigger@click" type="auto" placement="right">
                            <sp-popover>
                                <sp-dialog size="s" no-divider>
                                    <p>Second overlay (stacked on top)</p>
                                    <sp-button id="third-trigger">Open Third Overlay</sp-button>
                                    <sp-overlay trigger="third-trigger@click" type="auto" placement="right">
                                        <sp-popover>
                                            <sp-dialog size="s" no-divider>
                                                <p>Third overlay (highest in stack)</p>
                                                <p>Press ESC to close overlays in order</p>
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

MultipleOverlays.parameters = {
    docs: {
        description: {
            story: 'Multiple overlays are automatically stacked with proper z-index and focus management.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Long content - overlay taller than viewport
 * 
 * **Problem:** Overlay content extends beyond viewport
 * 
 * **Solution:** Overlay automatically adjusts placement and adds scroll if needed
 * 
 * 📖 [Troubleshooting Guide](./TROUBLESHOOTING.md#positioning-issues)
 */
export const LongContent = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 40px;
            }
            .long-content p {
                margin: 15px 0;
            }
        </style>
        <div class="pattern-container">
            <sp-button id="long-trigger">Show Long Content</sp-button>
            <sp-overlay trigger="long-trigger@click" type="auto" placement="bottom">
                <sp-popover>
                    <sp-dialog size="s" no-divider>
                        <div class="long-content">
                            <h3 slot="heading">Long Content Example</h3>
                            ${Array(20).fill(0).map((_, i) => html`
                                <p>Content paragraph ${i + 1}</p>
                            `)}
                        </div>
                    </sp-dialog>
                </sp-popover>
            </sp-overlay>
        </div>
    `;
};

LongContent.parameters = {
    docs: {
        description: {
            story: 'Overlays with content taller than viewport handle scrolling appropriately.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Small viewport - mobile/responsive behavior
 * 
 * **Problem:** Overlay too large for mobile screens
 * 
 * **Solution:** Use type="page" for full-screen overlays on mobile
 * 
 * 📖 [Accessibility Guide](./ACCESSIBILITY.md#responsive-considerations)
 */
export const SmallViewport = (): TemplateResult => {
    return html`
        <style>
            .pattern-container {
                padding: 20px;
            }
            .mobile-sim {
                width: 375px;
                height: 667px;
                border: 3px solid var(--spectrum-gray-800);
                border-radius: 20px;
                overflow: hidden;
                margin: 0 auto;
                padding: 20px;
                background: white;
            }
            .info {
                margin-bottom: 20px;
                padding: 15px;
                background: var(--spectrum-gray-100);
                border-radius: 4px;
            }
        </style>
        <div class="pattern-container">
            <div class="info">
                <p><strong>Responsive behavior:</strong> On small screens, use type="page" for full-screen overlays that are easier to interact with.</p>
            </div>
            <div class="mobile-sim">
                <h3>Mobile View (375x667)</h3>
                <sp-button id="mobile-trigger">Show Overlay</sp-button>
                <sp-overlay trigger="mobile-trigger@click" type="page" placement="bottom">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <h4 slot="heading">Mobile Overlay</h4>
                            <p>On mobile, overlays can take full screen for better usability.</p>
                            <sp-menu>
                                <sp-menu-item>Option 1</sp-menu-item>
                                <sp-menu-item>Option 2</sp-menu-item>
                                <sp-menu-item>Option 3</sp-menu-item>
                            </sp-menu>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
        </div>
    `;
};

SmallViewport.parameters = {
    docs: {
        description: {
            story: 'Responsive overlay behavior for mobile and small viewports.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Clip path parent - workaround for clipping issues
 * 
 * **Problem:** Parent with overflow:hidden or clip-path clips overlay
 * 
 * **Solution:** Overlays render in top-level container by default
 * 
 * 📖 [Architecture](./ARCHITECTURE.md#rendering-strategy)
 */
export const ClipPathParent = (): TemplateResult => {
    return html`
        <style>
            .clipped-container {
                overflow: hidden;
                width: 300px;
                height: 200px;
                border: 2px solid var(--spectrum-gray-400);
                padding: 20px;
                position: relative;
            }
            .info {
                margin-bottom: 20px;
                padding: 15px;
                background: var(--spectrum-gray-100);
                border-radius: 4px;
            }
        </style>
        <div>
            <div class="info">
                <p><strong>Clipping workaround:</strong> Even though the parent has overflow:hidden, the overlay renders correctly because it's placed in a top-level container.</p>
            </div>
            <div class="clipped-container">
                <p>Container with overflow: hidden</p>
                <sp-button id="clip-trigger">Show Overlay</sp-button>
                <sp-overlay trigger="clip-trigger@click" type="auto" placement="bottom">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>✅ This overlay is NOT clipped by the parent!</p>
                            <p>It renders in a top-level container.</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
            </div>
        </div>
    `;
};

ClipPathParent.parameters = {
    docs: {
        description: {
            story: 'Overlays avoid clipping issues by rendering in a top-level container.',
        },
    },
    chromatic: { disableSnapshot: true },
};


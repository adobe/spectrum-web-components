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
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    title: 'Overlay',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component: `
A comprehensive overlay system for creating tooltips, popovers, dialogs, and menus. 

## Getting Started

Choose from multiple APIs based on your needs:
- **\`<sp-overlay>\`** - Simple declarative overlays
- **\`<overlay-trigger>\`** - Multiple interactions (hover + click)
- **\`trigger()\` directive** - Lit framework integration
- **Imperative API** - Advanced programmatic control

Start with the Overview story below to explore the system.
                `,
            },
        },
        viewMode: 'docs',
    },
};

/**
 * Overview of the Overlay system
 *
 * The Spectrum Web Components overlay system provides multiple APIs for creating
 * tooltips, popovers, dialogs, and other floating UI elements. Choose the right
 * approach based on your needs.
 */
export const Overview = (): TemplateResult => {
    return html`
        <style>
            .landing-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 40px 20px;
                font-family: var(--spectrum-body-font-family);
            }

            .hero {
                text-align: center;
                margin-bottom: 60px;
            }

            .hero h1 {
                font-size: 48px;
                margin-bottom: 20px;
                color: var(--spectrum-gray-900);
            }

            .hero p {
                font-size: 20px;
                color: var(--spectrum-gray-700);
                max-width: 800px;
                margin: 0 auto;
                line-height: 1.6;
            }

            .quick-links {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 20px;
                margin-bottom: 60px;
            }

            .quick-link-card {
                padding: 30px;
                background: var(--spectrum-gray-100);
                border-radius: 8px;
                border: 2px solid transparent;
                transition: all 0.2s ease;
                cursor: pointer;
            }

            .quick-link-card:hover {
                border-color: var(--spectrum-accent-color-900);
                background: var(--spectrum-gray-75);
                transform: translateY(-2px);
            }

            .quick-link-card h3 {
                margin-top: 0;
                margin-bottom: 15px;
                color: var(--spectrum-gray-900);
                font-size: 20px;
            }

            .quick-link-card p {
                margin: 0 0 15px 0;
                color: var(--spectrum-gray-700);
                line-height: 1.5;
            }

            .comparison-table {
                width: 100%;
                margin: 40px 0;
                border-collapse: collapse;
                background: var(--spectrum-gray-50);
            }

            .comparison-table thead {
                background: var(--spectrum-gray-200);
            }

            .comparison-table th,
            .comparison-table td {
                padding: 15px;
                text-align: left;
                border: 1px solid var(--spectrum-gray-300);
            }

            .comparison-table th {
                font-weight: bold;
                color: var(--spectrum-gray-900);
            }

            .comparison-table code {
                background: rgba(0, 0, 0, 0.1);
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 13px;
            }

            .example-section {
                margin: 60px 0;
            }

            .example-section h2 {
                margin-bottom: 20px;
                color: var(--spectrum-gray-900);
            }

            .code-example {
                background: var(--spectrum-gray-200);
                padding: 20px;
                border-radius: 8px;
                margin: 15px 0;
                overflow-x: auto;
            }

            .code-example pre {
                margin: 0;
                font-family: monospace;
                font-size: 14px;
                line-height: 1.5;
            }

            .feature-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 30px;
                margin: 40px 0;
            }

            .feature-item {
                padding: 20px;
                background: var(--spectrum-gray-75);
                border-radius: 8px;
            }

            .feature-item h4 {
                margin-top: 0;
                margin-bottom: 10px;
                color: var(--spectrum-gray-900);
            }

            .feature-item p {
                margin: 0;
                color: var(--spectrum-gray-700);
                font-size: 14px;
                line-height: 1.5;
            }

            .section-divider {
                margin: 60px 0;
            }

            .cta-section {
                text-align: center;
                padding: 40px;
                background: linear-gradient(
                    135deg,
                    var(--spectrum-accent-color-100) 0%,
                    var(--spectrum-accent-color-200) 100%
                );
                border-radius: 8px;
                margin-top: 60px;
            }

            .cta-section h2 {
                margin-top: 0;
                color: var(--spectrum-gray-900);
            }

            .cta-section p {
                font-size: 18px;
                margin-bottom: 30px;
                color: var(--spectrum-gray-800);
            }
        </style>

        <div class="landing-container">
            <div class="hero">
                <h1>Overlay System</h1>
                <p>
                    A comprehensive, accessible overlay system for creating
                    tooltips, popovers, dialogs, and menus. Multiple APIs to fit
                    your workflow, from simple declarative markup to advanced
                    programmatic control.
                </p>
            </div>

            <div class="quick-links">
                <div
                    class="quick-link-card"
                    @click=${() => {
                        window.location.hash =
                            '#overlay-getting-started-decision-tree--interactive';
                    }}
                >
                    <h3>🧭 Decision Tree</h3>
                    <p>
                        Not sure which API to use? Use our interactive guide to
                        find the perfect solution for your use case.
                    </p>
                    <sp-link>Get started →</sp-link>
                </div>

                <div
                    class="quick-link-card"
                    @click=${() => {
                        window.location.hash =
                            '#overlay-patterns-examples-common-patterns--tooltip-pattern';
                    }}
                >
                    <h3>📚 Common Patterns</h3>
                    <p>
                        Explore real-world examples of tooltips, menus, dialogs,
                        and more with copy-paste code.
                    </p>
                    <sp-link>View patterns →</sp-link>
                </div>

                <div
                    class="quick-link-card"
                    @click=${() => {
                        window.location.hash =
                            '#overlay-api-reference-sp-overlay--modal';
                    }}
                >
                    <h3>⚙️ API Reference</h3>
                    <p>
                        Complete reference for sp-overlay, overlay-trigger, and
                        the trigger() directive.
                    </p>
                    <sp-link>View API docs →</sp-link>
                </div>

                <div
                    class="quick-link-card"
                    @click=${() => {
                        window.location.hash =
                            '#overlay-edge-cases-troubleshooting-troubleshooting--wont-open';
                    }}
                >
                    <h3>🔧 Troubleshooting</h3>
                    <p>
                        Common issues and solutions with side-by-side
                        comparisons of broken vs. fixed code.
                    </p>
                    <sp-link>Fix problems →</sp-link>
                </div>
            </div>

            <sp-divider size="m" class="section-divider"></sp-divider>

            <div class="example-section">
                <h2>Quick start examples</h2>
                <p>
                    Here's how to create a basic overlay with each API approach:
                </p>

                <h3>Using &lt;sp-overlay&gt; (declarative)</h3>
                <div class="code-example">
                    <pre><code>&lt;sp-button id="trigger"&gt;Show Popover&lt;/sp-button&gt;
&lt;sp-overlay trigger="trigger@click" type="auto" placement="bottom"&gt;
  &lt;sp-popover&gt;
    &lt;sp-dialog no-divider&gt;Popover content&lt;/sp-dialog&gt;
  &lt;/sp-popover&gt;
&lt;/sp-overlay&gt;</code></pre>
                </div>

                <h3>Using &lt;overlay-trigger&gt; (multiple interactions)</h3>
                <div class="code-example">
                    <pre><code>&lt;overlay-trigger triggered-by="hover click"&gt;
  &lt;sp-button slot="trigger"&gt;Button&lt;/sp-button&gt;
  &lt;sp-tooltip slot="hover-content"&gt;Tooltip&lt;/sp-tooltip&gt;
  &lt;sp-popover slot="click-content"&gt;Popover&lt;/sp-popover&gt;
&lt;/overlay-trigger&gt;</code></pre>
                </div>

                <h3>Using trigger() directive (Lit)</h3>
                <div class="code-example">
                    <pre><code>import { trigger } from '@spectrum-web-components/overlay';

html\`
  &lt;sp-button \${trigger(() => html\`
    &lt;sp-popover&gt;Content&lt;/sp-popover&gt;
  \`, { placement: 'bottom' })}&gt;
    Click me
  &lt;/sp-button&gt;
\`</code></pre>
                </div>

                <h3>Using imperative API (advanced)</h3>
                <div class="code-example">
                    <pre><code>import { openOverlay, VirtualTrigger } from '@spectrum-web-components/overlay';

const trigger = new VirtualTrigger(event.clientX, event.clientY);
const overlay = await openOverlay(popover, {
  trigger,
  placement: 'right-start',
  type: 'auto'
});
document.body.appendChild(overlay);</code></pre>
                </div>
            </div>

            <sp-divider size="m" class="section-divider"></sp-divider>

            <div class="example-section">
                <h2>When to use each API</h2>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>API</th>
                            <th>Best for</th>
                            <th>Key features</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>&lt;sp-overlay&gt;</code></td>
                            <td>Simple, single-interaction overlays</td>
                            <td>Declarative, easy to use, works everywhere</td>
                        </tr>
                        <tr>
                            <td><code>&lt;overlay-trigger&gt;</code></td>
                            <td>Multiple interactions (hover + click)</td>
                            <td>
                                Handles multiple interaction types elegantly
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <code>trigger()</code>
                                directive
                            </td>
                            <td>Lit framework projects</td>
                            <td>
                                Template-based, TypeScript support, reactive
                            </td>
                        </tr>
                        <tr>
                            <td><code>Overlay.open()</code></td>
                            <td>Programmatic control, virtual positioning</td>
                            <td>
                                Full control, VirtualTrigger, dynamic creation
                            </td>
                        </tr>
                        <tr>
                            <td><code>slottable-request</code></td>
                            <td>Performance optimization</td>
                            <td>Lazy loading, reduces DOM nodes</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <sp-divider size="m" class="section-divider"></sp-divider>

            <div class="example-section">
                <h2>Key features</h2>
                <div class="feature-grid">
                    <div class="feature-item">
                        <h4>🎯 Smart Positioning</h4>
                        <p>
                            Automatically adjusts placement to stay within
                            viewport boundaries
                        </p>
                    </div>
                    <div class="feature-item">
                        <h4>♿ Accessible</h4>
                        <p>
                            Built-in keyboard navigation, focus management, and
                            ARIA support
                        </p>
                    </div>
                    <div class="feature-item">
                        <h4>🎨 Themeable</h4>
                        <p>
                            Integrates with Spectrum theme system for consistent
                            styling
                        </p>
                    </div>
                    <div class="feature-item">
                        <h4>📦 Flexible Content</h4>
                        <p>
                            Support for tooltips, popovers, dialogs, menus, and
                            custom content
                        </p>
                    </div>
                    <div class="feature-item">
                        <h4>🔄 Multiple Interactions</h4>
                        <p>
                            Click, hover, longpress, or combine multiple
                            triggers
                        </p>
                    </div>
                    <div class="feature-item">
                        <h4>🚀 Performance</h4>
                        <p>Lazy loading support and optimized rendering</p>
                    </div>
                    <div class="feature-item">
                        <h4>🎭 Modal Types</h4>
                        <p>
                            Auto, modal, page, hint, inline, and replace overlay
                            types
                        </p>
                    </div>
                    <div class="feature-item">
                        <h4>🎪 Nested Support</h4>
                        <p>
                            Handle complex nested overlay scenarios with proper
                            stacking
                        </p>
                    </div>
                </div>
            </div>

            <sp-divider size="m" class="section-divider"></sp-divider>

            <div class="cta-section">
                <h2>Ready to get started?</h2>
                <p>
                    Use our interactive decision tree to find the right overlay
                    solution for your project, or explore our pattern library
                    for inspiration.
                </p>
                <sp-button
                    variant="accent"
                    @click=${() => {
                        window.location.hash =
                            '#overlay-getting-started-decision-tree--interactive';
                    }}
                >
                    Find your solution
                </sp-button>
            </div>
        </div>
    `;
};

Overview.parameters = {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
    docs: {
        description: {
            story: 'Comprehensive overview of the Spectrum Web Components overlay system, including API comparisons, quick start examples, and navigation to detailed documentation sections.',
        },
        source: {
            code: null, // Hide the source code
        },
    },
};

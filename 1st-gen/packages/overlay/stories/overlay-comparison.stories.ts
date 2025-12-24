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
import '@spectrum-web-components/dialog/sp-dialog.js';
import '@spectrum-web-components/divider/sp-divider.js';
import { openOverlay } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/overlay/sp-overlay.js';
import { trigger } from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';

export default {
    title: 'Overlay/Getting Started/API Comparison',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Side-by-side comparison of all overlay APIs to help you choose the right approach for your use case.',
            },
        },
    },
};

const comparisonStyles = html`
    <style>
        .comparison-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .intro {
            text-align: center;
            margin-bottom: 40px;
        }

        .intro h2 {
            color: var(--spectrum-gray-900);
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .api-card {
            padding: 20px;
            background: var(--spectrum-gray-100);
            border-radius: 8px;
            border-top: 4px solid var(--spectrum-accent-color-900);
        }

        .api-card h3 {
            margin-top: 0;
            color: var(--spectrum-gray-900);
            font-family: monospace;
        }

        .api-card .demo {
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 20px 0;
        }

        .api-card .code {
            background: rgba(0, 0, 0, 0.1);
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
            overflow-x: auto;
        }

        .api-card .code pre {
            margin: 0;
            font-family: monospace;
            font-size: 12px;
            line-height: 1.5;
        }

        .api-card .pros-cons {
            margin: 15px 0;
        }

        .api-card .pros-cons h4 {
            font-size: 14px;
            margin: 10px 0 5px 0;
            color: var(--spectrum-gray-800);
        }

        .api-card .pros-cons ul {
            margin: 0;
            padding-left: 20px;
        }

        .api-card .pros-cons li {
            font-size: 13px;
            color: var(--spectrum-gray-700);
            margin: 5px 0;
        }

        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin: 40px 0;
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

        .comparison-table td {
            color: var(--spectrum-gray-700);
        }

        .comparison-table code {
            background: rgba(0, 0, 0, 0.1);
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 12px;
        }

        .comparison-table .check {
            color: var(--spectrum-positive-color-900);
            font-weight: bold;
        }

        .comparison-table .partial {
            color: var(--spectrum-notice-color-900);
        }

        .comparison-table .no {
            color: var(--spectrum-gray-500);
        }

        .decision-section {
            margin: 40px 0;
            padding: 30px;
            background: var(--spectrum-gray-100);
            border-radius: 8px;
        }

        .decision-section h3 {
            margin-top: 0;
            color: var(--spectrum-gray-900);
        }

        .decision-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .decision-card {
            padding: 20px;
            background: var(--spectrum-gray-50);
            border-radius: 8px;
            border-left: 4px solid var(--spectrum-accent-color-900);
        }

        .decision-card h4 {
            margin-top: 0;
            color: var(--spectrum-gray-900);
        }

        .decision-card p {
            margin: 10px 0 0 0;
            color: var(--spectrum-gray-700);
            font-size: 14px;
            line-height: 1.5;
        }
    </style>
`;

/**
 * Side-by-side API comparison
 *
 * **Use case:** Compare all four overlay APIs with the same use case
 *
 * **Key features:**
 * - Live demos of each API approach
 * - Code examples for direct comparison
 * - Pros and cons for each approach
 *
 * 📖 [Getting Started Guide](./GETTING-STARTED.md)
 */
export const SideBySide = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison-container">
            <div class="intro">
                <h2>API Comparison: Same Task, Four Ways</h2>
                <p>
                    All four examples below create the same overlay: a tooltip
                    on hover and popover on click. See which API fits your
                    project best.
                </p>
            </div>

            <div class="comparison-grid">
                <!-- sp-overlay -->
                <div class="api-card">
                    <h3>&lt;sp-overlay&gt;</h3>
                    <div class="demo">
                        <sp-button id="overlay-demo">Button</sp-button>
                        <sp-overlay
                            trigger="overlay-demo@hover"
                            type="hint"
                            placement="top"
                            delayed
                        >
                            <sp-tooltip>Tooltip text</sp-tooltip>
                        </sp-overlay>
                        <sp-overlay
                            trigger="overlay-demo@click"
                            type="auto"
                            placement="bottom"
                        >
                            <sp-popover>
                                <sp-dialog size="s" no-divider>
                                    Popover content
                                </sp-dialog>
                            </sp-popover>
                        </sp-overlay>
                    </div>
                    <div class="code">
                        <pre><code>&lt;sp-button id="btn"&gt;Button&lt;/sp-button&gt;
&lt;sp-overlay trigger="btn@hover" type="hint"&gt;
  &lt;sp-tooltip&gt;Tooltip&lt;/sp-tooltip&gt;
&lt;/sp-overlay&gt;
&lt;sp-overlay trigger="btn@click" type="auto"&gt;
  &lt;sp-popover&gt;...&lt;/sp-popover&gt;
&lt;/sp-overlay&gt;</code></pre>
                    </div>
                    <div class="pros-cons">
                        <h4>Pros:</h4>
                        <ul>
                            <li>Works everywhere (vanilla JS, React, etc.)</li>
                            <li>Fine-grained control</li>
                            <li>Clear separation of concerns</li>
                        </ul>
                        <h4>Cons:</h4>
                        <ul>
                            <li>Verbose for multiple interactions</li>
                            <li>Requires unique IDs</li>
                        </ul>
                    </div>
                </div>

                <!-- overlay-trigger -->
                <div class="api-card">
                    <h3>&lt;overlay-trigger&gt;</h3>
                    <div class="demo">
                        <overlay-trigger
                            triggered-by="hover click"
                            placement="bottom"
                        >
                            <sp-button slot="trigger">Button</sp-button>
                            <sp-tooltip slot="hover-content" delayed>
                                Tooltip text
                            </sp-tooltip>
                            <sp-popover slot="click-content">
                                <sp-dialog size="s" no-divider>
                                    Popover content
                                </sp-dialog>
                            </sp-popover>
                        </overlay-trigger>
                    </div>
                    <div class="code">
                        <pre><code>&lt;overlay-trigger triggered-by="hover click"&gt;
  &lt;sp-button slot="trigger"&gt;
    Button
  &lt;/sp-button&gt;
  &lt;sp-tooltip slot="hover-content"&gt;
    Tooltip
  &lt;/sp-tooltip&gt;
  &lt;sp-popover slot="click-content"&gt;
    ...
  &lt;/sp-popover&gt;
&lt;/overlay-trigger&gt;</code></pre>
                    </div>
                    <div class="pros-cons">
                        <h4>Pros:</h4>
                        <ul>
                            <li>Multiple interactions in one element</li>
                            <li>No ID management needed</li>
                            <li>Clean slot-based API</li>
                        </ul>
                        <h4>Cons:</h4>
                        <ul>
                            <li>Less flexible than sp-overlay</li>
                            <li>Extra wrapper element</li>
                        </ul>
                    </div>
                </div>

                <!-- trigger() directive -->
                <div class="api-card">
                    <h3>trigger() directive</h3>
                    <div class="demo">
                        <sp-button
                            ${tooltip(
                                () => html`
                                    Tooltip text
                                `
                            )}
                            ${trigger(
                                () => html`
                                    <sp-popover>
                                        <sp-dialog size="s" no-divider>
                                            Popover content
                                        </sp-dialog>
                                    </sp-popover>
                                `,
                                {
                                    triggerInteraction: 'click',
                                    overlayOptions: { placement: 'bottom' },
                                }
                            )}
                        >
                            Button
                        </sp-button>
                    </div>
                    <div class="code">
                        <pre><code>html\`
  &lt;sp-button
    \${tooltip(() => html\`Tooltip\`)}
    \${trigger(() => html\`
      &lt;sp-popover&gt;...&lt;/sp-popover&gt;
    \`, {
      triggerInteraction: 'click',
      overlayOptions: { placement: 'bottom' }
    })}
  &gt;
    Button
  &lt;/sp-button&gt;
\`</code></pre>
                    </div>
                    <div class="pros-cons">
                        <h4>Pros:</h4>
                        <ul>
                            <li>Perfect for Lit projects</li>
                            <li>Template-based, reactive</li>
                            <li>TypeScript integration</li>
                        </ul>
                        <h4>Cons:</h4>
                        <ul>
                            <li>Lit framework only</li>
                            <li>Requires understanding directives</li>
                        </ul>
                    </div>
                </div>

                <!-- Imperative API -->
                <div class="api-card">
                    <h3>Overlay.open()</h3>
                    <div class="demo">
                        <sp-button
                            id="imperative-demo"
                            @mouseenter=${async (event: Event) => {
                                const tooltip =
                                    document.createElement('sp-tooltip');
                                tooltip.textContent = 'Tooltip text';
                                const overlay = await openOverlay(tooltip, {
                                    trigger: event.target as HTMLElement,
                                    type: 'hint',
                                    placement: 'top',
                                });
                                document.body.appendChild(overlay);
                            }}
                            @click=${async (event: Event) => {
                                const popover =
                                    document.createElement('sp-popover');
                                popover.innerHTML = `<sp-dialog size="s" no-divider>Popover content</sp-dialog>`;
                                const overlay = await openOverlay(popover, {
                                    trigger: event.target as HTMLElement,
                                    type: 'auto',
                                    placement: 'bottom',
                                });
                                document.body.appendChild(overlay);
                            }}
                        >
                            Button
                        </sp-button>
                    </div>
                    <div class="code">
                        <pre><code>button.addEventListener('click', async (e) => {
  const popover = document.createElement('sp-popover');
  popover.innerHTML = '...';
  
  const overlay = await openOverlay(popover, {
    trigger: event.target,
    type: 'auto',
    placement: 'bottom'
  });
  
  document.body.appendChild(overlay);
});</code></pre>
                    </div>
                    <div class="pros-cons">
                        <h4>Pros:</h4>
                        <ul>
                            <li>Full programmatic control</li>
                            <li>Virtual positioning support</li>
                            <li>Dynamic overlay creation</li>
                        </ul>
                        <h4>Cons:</h4>
                        <ul>
                            <li>More code to write</li>
                            <li>Manual lifecycle management</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
};

SideBySide.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Compare all four overlay APIs with live examples showing the same use case implemented in different ways.',
        },
    },
};

/**
 * Feature comparison table
 *
 * **Use case:** Quickly compare capabilities across all APIs
 *
 * **Key features:**
 * - Comprehensive feature matrix
 * - Performance characteristics
 * - Framework requirements
 *
 * 📖 [Architecture Documentation](./ARCHITECTURE.md)
 */
export const FeatureMatrix = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison-container">
            <div class="intro">
                <h2>Feature Comparison Matrix</h2>
                <p>
                    Compare features and capabilities across all overlay APIs.
                </p>
            </div>

            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th><code>&lt;sp-overlay&gt;</code></th>
                        <th><code>&lt;overlay-trigger&gt;</code></th>
                        <th><code>trigger()</code></th>
                        <th><code>Overlay.open()</code></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Framework Support</strong></td>
                        <td class="check">✓ Any framework</td>
                        <td class="check">✓ Any framework</td>
                        <td class="partial">⚠ Lit only</td>
                        <td class="check">✓ Any framework</td>
                    </tr>
                    <tr>
                        <td><strong>Multiple Interactions</strong></td>
                        <td class="partial">⚠ Multiple elements</td>
                        <td class="check">✓ Single element</td>
                        <td class="check">✓ Multiple directives</td>
                        <td class="partial">⚠ Manual setup</td>
                    </tr>
                    <tr>
                        <td><strong>Virtual Positioning</strong></td>
                        <td class="check">✓ Supported</td>
                        <td class="check">✓ Supported</td>
                        <td class="no">✗ Not supported</td>
                        <td class="check">✓ VirtualTrigger</td>
                    </tr>
                    <tr>
                        <td><strong>Programmatic Control</strong></td>
                        <td class="check">✓ Via properties</td>
                        <td class="check">✓ Via properties</td>
                        <td class="check">✓ Via options</td>
                        <td class="check">✓ Full control</td>
                    </tr>
                    <tr>
                        <td><strong>TypeScript Support</strong></td>
                        <td class="check">✓ Full</td>
                        <td class="check">✓ Full</td>
                        <td class="check">✓ Excellent</td>
                        <td class="check">✓ Full</td>
                    </tr>
                    <tr>
                        <td><strong>Lazy Loading</strong></td>
                        <td class="check">✓ slottable-request</td>
                        <td class="check">✓ slottable-request</td>
                        <td class="partial">⚠ Template render</td>
                        <td class="check">✓ Manual</td>
                    </tr>
                    <tr>
                        <td><strong>Nested Overlays</strong></td>
                        <td class="check">✓ Full support</td>
                        <td class="check">✓ Full support</td>
                        <td class="check">✓ Full support</td>
                        <td class="check">✓ Full support</td>
                    </tr>
                    <tr>
                        <td><strong>Learning Curve</strong></td>
                        <td>Low</td>
                        <td>Low</td>
                        <td>Medium</td>
                        <td>High</td>
                    </tr>
                    <tr>
                        <td><strong>Code Verbosity</strong></td>
                        <td>Medium-High</td>
                        <td>Low-Medium</td>
                        <td>Low</td>
                        <td>High</td>
                    </tr>
                    <tr>
                        <td><strong>Performance</strong></td>
                        <td>Good</td>
                        <td>Good</td>
                        <td>Excellent</td>
                        <td>Good</td>
                    </tr>
                </tbody>
            </table>

            <div class="decision-section">
                <h3>When to Use Each API</h3>
                <div class="decision-grid">
                    <div class="decision-card">
                        <h4>&lt;sp-overlay&gt;</h4>
                        <p>
                            <strong>Best for:</strong>
                            Simple single-interaction overlays, fine-grained
                            control, virtual positioning, or when you need
                            maximum flexibility.
                        </p>
                    </div>
                    <div class="decision-card">
                        <h4>&lt;overlay-trigger&gt;</h4>
                        <p>
                            <strong>Best for:</strong>
                            Multiple interactions per trigger (hover + click),
                            clean markup, or when you want a slot-based API.
                        </p>
                    </div>
                    <div class="decision-card">
                        <h4>trigger() directive</h4>
                        <p>
                            <strong>Best for:</strong>
                            Lit framework projects, template-based development,
                            reactive content, or when you want excellent
                            TypeScript integration.
                        </p>
                    </div>
                    <div class="decision-card">
                        <h4>Overlay.open()</h4>
                        <p>
                            <strong>Best for:</strong>
                            Dynamic overlay creation, context menus,
                            programmatic control, or advanced use cases
                            requiring full lifecycle management.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

FeatureMatrix.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Comprehensive feature comparison table showing capabilities, requirements, and trade-offs of each overlay API.',
        },
    },
};

/**
 * Performance comparison
 *
 * **Use case:** Understand performance implications of each API
 *
 * **Key features:**
 * - Performance characteristics
 * - Memory footprint comparison
 * - Initialization overhead
 *
 * 📖 [Performance Guide](./PERFORMANCE.md)
 */
export const PerformanceComparison = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison-container">
            <div class="intro">
                <h2>Performance Comparison</h2>
                <p>
                    Understanding the performance characteristics of each API
                    helps you make informed decisions.
                </p>
            </div>

            <div class="decision-section">
                <h3>Performance Characteristics</h3>
                <div class="comparison-grid">
                    <div class="api-card">
                        <h3>&lt;sp-overlay&gt;</h3>
                        <div class="pros-cons">
                            <h4>Initialization:</h4>
                            <ul>
                                <li>Lightweight element registration</li>
                                <li>Controllers initialized on demand</li>
                                <li>Minimal overhead per instance</li>
                            </ul>
                            <h4>Runtime:</h4>
                            <ul>
                                <li>Event listeners per overlay</li>
                                <li>Efficient DOM updates</li>
                                <li>Good for 10-50 overlays</li>
                            </ul>
                            <h4>Memory:</h4>
                            <ul>
                                <li>~2KB per overlay instance</li>
                                <li>Content in DOM (use slottable-request)</li>
                            </ul>
                        </div>
                    </div>

                    <div class="api-card">
                        <h3>&lt;overlay-trigger&gt;</h3>
                        <div class="pros-cons">
                            <h4>Initialization:</h4>
                            <ul>
                                <li>Slightly heavier than sp-overlay</li>
                                <li>Multiple controllers per instance</li>
                                <li>triggered-by optimization helps</li>
                            </ul>
                            <h4>Runtime:</h4>
                            <ul>
                                <li>Multiple event listeners managed</li>
                                <li>Efficient slot management</li>
                                <li>Good for 10-30 overlays</li>
                            </ul>
                            <h4>Memory:</h4>
                            <ul>
                                <li>~3KB per overlay instance</li>
                                <li>Multiple content slots in DOM</li>
                            </ul>
                        </div>
                    </div>

                    <div class="api-card">
                        <h3>trigger() directive</h3>
                        <div class="pros-cons">
                            <h4>Initialization:</h4>
                            <ul>
                                <li>Fastest initialization</li>
                                <li>Leverages Lit's reactivity</li>
                                <li>No custom element overhead</li>
                            </ul>
                            <h4>Runtime:</h4>
                            <ul>
                                <li>Lit template updates</li>
                                <li>Excellent reactivity</li>
                                <li>Best for 50+ overlays</li>
                            </ul>
                            <h4>Memory:</h4>
                            <ul>
                                <li>~1KB per directive</li>
                                <li>Templates rendered on demand</li>
                            </ul>
                        </div>
                    </div>

                    <div class="api-card">
                        <h3>Overlay.open()</h3>
                        <div class="pros-cons">
                            <h4>Initialization:</h4>
                            <ul>
                                <li>No upfront cost</li>
                                <li>Pay-per-use model</li>
                                <li>Lazy by nature</li>
                            </ul>
                            <h4>Runtime:</h4>
                            <ul>
                                <li>Manual event management</li>
                                <li>Flexible optimization</li>
                                <li>Good for dynamic/rare overlays</li>
                            </ul>
                            <h4>Memory:</h4>
                            <ul>
                                <li>~1.5KB per overlay</li>
                                <li>You control lifecycle</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="decision-section">
                <h3>Performance Recommendations</h3>
                <div class="decision-grid">
                    <div class="decision-card">
                        <h4>Many Overlays (50+)</h4>
                        <p>
                            Use
                            <code>trigger()</code>
                            directive with Lit for best performance, or
                            implement lazy loading with
                            <code>slottable-request</code>
                            for other approaches.
                        </p>
                    </div>
                    <div class="decision-card">
                        <h4>Context Menus</h4>
                        <p>
                            Use
                            <code>Overlay.open()</code>
                            with VirtualTrigger for zero upfront cost and
                            dynamic creation only when needed.
                        </p>
                    </div>
                    <div class="decision-card">
                        <h4>Heavy Content</h4>
                        <p>
                            Always use
                            <code>slottable-request</code>
                            event to lazy load content, regardless of which API
                            you choose.
                        </p>
                    </div>
                    <div class="decision-card">
                        <h4>Mobile/Low-End Devices</h4>
                        <p>
                            Prefer
                            <code>&lt;sp-overlay&gt;</code>
                            or
                            <code>trigger()</code>
                            directive, and always implement lazy loading for
                            better memory usage.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

PerformanceComparison.parameters = {
    chromatic: { disableSnapshot: true },
    docs: {
        description: {
            story: 'Performance characteristics and recommendations for each overlay API approach.',
        },
    },
};

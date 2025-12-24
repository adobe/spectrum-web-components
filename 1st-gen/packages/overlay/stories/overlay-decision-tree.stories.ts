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
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/radio/sp-radio.js';

export default {
    title: 'Overlay/Getting Started/Decision Tree',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Interactive guide to help you choose the right overlay approach for your use case.',
            },
        },
    },
};

interface DecisionState {
    interactions?: string;
    framework?: string;
    virtual?: string;
    control?: string;
    content?: string;
}

const recommendations: Record<
    string,
    { title: string; description: string; example: string; docs: string }
> = {
    'overlay-trigger': {
        title: '<overlay-trigger>',
        description:
            'Use overlay-trigger when you need multiple interaction types (hover + click) on the same trigger element. Perfect for tooltips with additional click actions.',
        example: `<overlay-trigger triggered-by="click hover">
  <sp-button slot="trigger">Button</sp-button>
  <sp-popover slot="click-content">Click content</sp-popover>
  <sp-tooltip slot="hover-content">Hover content</sp-tooltip>
</overlay-trigger>`,
        docs: './overlay-trigger.md',
    },
    'trigger-directive': {
        title: 'trigger() directive',
        description:
            'Use the trigger directive when working with Lit templates. It provides a clean, template-based API with excellent TypeScript integration.',
        example: `import { trigger } from '@spectrum-web-components/overlay';

html\`
  <sp-button \${trigger(() => html\`
    <sp-popover>Content</sp-popover>
  \`, { placement: 'bottom' })}>
    Click me
  </sp-button>
\``,
        docs: './trigger-directive.md',
    },
    'imperative-api': {
        title: 'Overlay.open() - Imperative API',
        description:
            'Use the imperative API when you need programmatic control, virtual positioning (VirtualTrigger), or dynamic overlay creation based on runtime conditions.',
        example: `import { openOverlay, VirtualTrigger } from '@spectrum-web-components/overlay';

element.addEventListener('contextmenu', async (event) => {
  event.preventDefault();
  const trigger = new VirtualTrigger(event.clientX, event.clientY);
  const overlay = await openOverlay(popover, {
    trigger,
    placement: 'right-start',
    type: 'auto'
  });
  document.body.appendChild(overlay);
});`,
        docs: './imperative-api.md',
    },
    'sp-overlay': {
        title: '<sp-overlay>',
        description:
            'Use sp-overlay for simple, declarative overlays with a single interaction type. Great for straightforward tooltip or popover implementations.',
        example: `<sp-button id="trigger">Click me</sp-button>
<sp-overlay trigger="trigger@click" type="auto" placement="bottom">
  <sp-popover>Overlay content</sp-popover>
</sp-overlay>`,
        docs: './README.md',
    },
    'slottable-request': {
        title: 'slottable-request event',
        description:
            'Use slottable-request when you need lazy content loading for performance optimization. Perfect for complex content or many overlays on a page.',
        example: `<sp-overlay
  trigger="button@click"
  @slottable-request=\${handleRequest}
></sp-overlay>

<script>
function handleRequest(event) {
  if (event.data === removeSlottableRequest) {
    this.innerHTML = '';
  } else {
    // Lazy load content
    this.innerHTML = '<sp-popover>...</sp-popover>';
  }
}
</script>`,
        docs: './slottable-request.md',
    },
};

export const Interactive = (): TemplateResult => {
    const state: DecisionState = {};

    const updateDecision = (): void => {
        const container = document.querySelector('.decision-container');
        if (!container) return;

        const result = container.querySelector('.decision-result');
        if (!result) return;

        // Decision logic
        let recommendation = 'sp-overlay';

        if (state.interactions === 'multiple') {
            recommendation = 'overlay-trigger';
        } else if (state.framework === 'lit') {
            recommendation = 'trigger-directive';
        } else if (state.virtual === 'yes' || state.control === 'yes') {
            recommendation = 'imperative-api';
        } else if (state.content === 'lazy') {
            recommendation = 'slottable-request';
        }

        const rec = recommendations[recommendation];

        result.innerHTML = `
            <div class="recommendation">
                <h3>✅ Recommended: ${rec.title}</h3>
                <p>${rec.description}</p>
                <h4>Example:</h4>
                <pre><code>${rec.example}</code></pre>
                <p>
                    <sp-link href="${rec.docs}" target="_blank">
                        📖 Read the full documentation
                    </sp-link>
                </p>
            </div>
        `;
    };

    return html`
        <style>
            .decision-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }

            .decision-step {
                margin: 30px 0;
                padding: 20px;
                background: var(--spectrum-gray-100);
                border-radius: 8px;
            }

            .decision-step h3 {
                margin-top: 0;
                color: var(--spectrum-gray-800);
            }

            .decision-result {
                margin-top: 40px;
                padding: 30px;
                background: var(--spectrum-accent-background-color-default);
                border-radius: 8px;
                min-height: 100px;
            }

            .recommendation {
                color: var(--spectrum-gray-50);
            }

            .recommendation h3 {
                margin-top: 0;
                color: var(--spectrum-gray-50);
            }

            .recommendation h4 {
                margin-top: 20px;
                margin-bottom: 10px;
                color: var(--spectrum-gray-50);
            }

            .recommendation pre {
                background: rgba(0, 0, 0, 0.3);
                padding: 15px;
                border-radius: 4px;
                overflow-x: auto;
            }

            .recommendation code {
                color: var(--spectrum-gray-50);
                font-family: monospace;
                font-size: 13px;
                line-height: 1.5;
            }

            sp-radio-group {
                margin-top: 15px;
            }

            .intro {
                text-align: center;
                margin-bottom: 40px;
            }

            .intro h2 {
                color: var(--spectrum-gray-800);
            }
        </style>

        <div class="decision-container">
            <div class="intro">
                <h2>Find the right overlay solution</h2>
                <p>
                    Answer a few questions to find the best overlay approach for
                    your needs.
                </p>
            </div>

            <div class="decision-step">
                <h3>1. How many interaction types do you need?</h3>
                <p>
                    Do you need to support multiple interactions (like hover +
                    click) on the same trigger?
                </p>
                <sp-radio-group
                    @change=${(event: Event) => {
                        const target = event.target as HTMLElement & {
                            selected: string;
                        };
                        state.interactions = target.selected;
                        updateDecision();
                    }}
                >
                    <sp-radio value="single">
                        Single interaction (click OR hover OR longpress)
                    </sp-radio>
                    <sp-radio value="multiple">
                        Multiple interactions (hover + click, etc.)
                    </sp-radio>
                </sp-radio-group>
            </div>

            <div class="decision-step">
                <h3>2. What framework are you using?</h3>
                <sp-radio-group
                    @change=${(event: Event) => {
                        const target = event.target as HTMLElement & {
                            selected: string;
                        };
                        state.framework = target.selected;
                        updateDecision();
                    }}
                >
                    <sp-radio value="lit">Lit</sp-radio>
                    <sp-radio value="vanilla">
                        Vanilla JS / Other framework
                    </sp-radio>
                </sp-radio-group>
            </div>

            <div class="decision-step">
                <h3>3. Do you need virtual positioning?</h3>
                <p>
                    Virtual positioning allows you to position overlays at
                    specific coordinates without a DOM element (e.g., context
                    menus).
                </p>
                <sp-radio-group
                    @change=${(event: Event) => {
                        const target = event.target as HTMLElement & {
                            selected: string;
                        };
                        state.virtual = target.selected;
                        updateDecision();
                    }}
                >
                    <sp-radio value="no">No, I have a trigger element</sp-radio>
                    <sp-radio value="yes">
                        Yes, position at cursor/coordinates
                    </sp-radio>
                </sp-radio-group>
            </div>

            <div class="decision-step">
                <h3>4. Do you need programmatic control?</h3>
                <p>
                    Do you need to create and manage overlays dynamically based
                    on runtime conditions?
                </p>
                <sp-radio-group
                    @change=${(event: Event) => {
                        const target = event.target as HTMLElement & {
                            selected: string;
                        };
                        state.control = target.selected;
                        updateDecision();
                    }}
                >
                    <sp-radio value="no">No, declarative is fine</sp-radio>
                    <sp-radio value="yes">Yes, I need full control</sp-radio>
                </sp-radio-group>
            </div>

            <div class="decision-step">
                <h3>5. How should content be loaded?</h3>
                <p>
                    For performance, you might want to lazy load overlay content
                    only when needed.
                </p>
                <sp-radio-group
                    @change=${(event: Event) => {
                        const target = event.target as HTMLElement & {
                            selected: string;
                        };
                        state.content = target.selected;
                        updateDecision();
                    }}
                >
                    <sp-radio value="immediate">
                        Load immediately (simple)
                    </sp-radio>
                    <sp-radio value="lazy">Lazy load (optimized)</sp-radio>
                </sp-radio-group>
            </div>

            <div class="decision-result">
                <p style="text-align: center; color: var(--spectrum-gray-50);">
                    👆 Answer the questions above to see your recommendation
                </p>
            </div>
        </div>
    `;
};

Interactive.parameters = {
    chromatic: { disableSnapshot: true },
};

export const QuickReference = (): TemplateResult => {
    return html`
        <style>
            .quick-ref {
                max-width: 1000px;
                margin: 0 auto;
                padding: 20px;
            }

            .ref-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }

            .ref-card {
                padding: 20px;
                background: var(--spectrum-gray-100);
                border-radius: 8px;
                border-left: 4px solid var(--spectrum-accent-color-900);
            }

            .ref-card h3 {
                margin-top: 0;
                color: var(--spectrum-gray-800);
                font-family: monospace;
                font-size: 16px;
            }

            .ref-card p {
                color: var(--spectrum-gray-700);
                margin: 10px 0;
            }

            .ref-card ul {
                margin: 10px 0;
                padding-left: 20px;
            }

            .ref-card li {
                color: var(--spectrum-gray-700);
                margin: 5px 0;
            }
        </style>

        <div class="quick-ref">
            <h2>Overlay API Quick Reference</h2>
            <p>Choose the right approach for your use case:</p>

            <div class="ref-grid">
                <div class="ref-card">
                    <h3>&lt;sp-overlay&gt;</h3>
                    <p><strong>Best for:</strong></p>
                    <ul>
                        <li>Simple, single-interaction overlays</li>
                        <li>Static declarative usage</li>
                        <li>Straightforward tooltips/popovers</li>
                    </ul>
                    <p><strong>Example use cases:</strong></p>
                    <ul>
                        <li>Basic tooltips</li>
                        <li>Simple dropdowns</li>
                        <li>Help text popovers</li>
                    </ul>
                </div>

                <div class="ref-card">
                    <h3>&lt;overlay-trigger&gt;</h3>
                    <p><strong>Best for:</strong></p>
                    <ul>
                        <li>Multiple interaction types per trigger</li>
                        <li>Hover + click combinations</li>
                        <li>Complex trigger patterns</li>
                    </ul>
                    <p><strong>Example use cases:</strong></p>
                    <ul>
                        <li>Button with tooltip and menu</li>
                        <li>Hover preview + click details</li>
                        <li>Multi-modal interactions</li>
                    </ul>
                </div>

                <div class="ref-card">
                    <h3>Overlay.open()</h3>
                    <p><strong>Best for:</strong></p>
                    <ul>
                        <li>Programmatic control</li>
                        <li>Virtual positioning</li>
                        <li>Dynamic creation</li>
                    </ul>
                    <p><strong>Example use cases:</strong></p>
                    <ul>
                        <li>Context menus</li>
                        <li>Coordinate-based positioning</li>
                        <li>Runtime-generated overlays</li>
                    </ul>
                </div>

                <div class="ref-card">
                    <h3>trigger() directive</h3>
                    <p><strong>Best for:</strong></p>
                    <ul>
                        <li>Lit framework projects</li>
                        <li>Template-based development</li>
                        <li>TypeScript integration</li>
                    </ul>
                    <p><strong>Example use cases:</strong></p>
                    <ul>
                        <li>Lit component tooltips</li>
                        <li>Dynamic Lit templates</li>
                        <li>Reactive overlay content</li>
                    </ul>
                </div>

                <div class="ref-card">
                    <h3>slottable-request</h3>
                    <p><strong>Best for:</strong></p>
                    <ul>
                        <li>Performance optimization</li>
                        <li>Lazy content loading</li>
                        <li>Many overlays on page</li>
                    </ul>
                    <p><strong>Example use cases:</strong></p>
                    <ul>
                        <li>Table row menus</li>
                        <li>Complex form helpers</li>
                        <li>Heavy content overlays</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
};

QuickReference.parameters = {
    chromatic: { disableSnapshot: true },
};

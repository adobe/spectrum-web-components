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
import '@spectrum-web-components/overlay/overlay-trigger.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/dialog/sp-dialog.js';

export default {
    title: 'Overlay/Edge Cases & Troubleshooting/Troubleshooting',
    component: 'sp-overlay',
    parameters: {
        docs: {
            description: {
                component:
                    'Side-by-side comparisons of common issues and their solutions. See the problem and the fix in action.',
            },
        },
    },
};

const comparisonStyles = html`
    <style>
        .comparison {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .example {
            padding: 30px;
            border: 2px solid var(--spectrum-gray-400);
            border-radius: 8px;
            min-height: 200px;
        }
        .broken {
            background: rgba(255, 0, 0, 0.05);
            border-color: var(--spectrum-red-900);
        }
        .fixed {
            background: rgba(0, 255, 0, 0.05);
            border-color: var(--spectrum-green-900);
        }
        .example h3 {
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .example code {
            background: rgba(0, 0, 0, 0.1);
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 13px;
        }
        .example pre {
            background: rgba(0, 0, 0, 0.1);
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
            font-size: 12px;
        }
        .note {
            margin-top: 15px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            font-size: 14px;
        }
    </style>
`;

/**
 * Overlay won't open - missing or incorrect trigger
 * 
 * **Problem:** Trigger ID doesn't match or element doesn't exist
 * 
 * **Solution:** Ensure trigger ID matches element ID exactly
 * 
 * 📖 [Troubleshooting Guide](./TROUBLESHOOTING.md#overlay-wont-open)
 */
export const WontOpen = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison">
            <div class="example broken">
                <h3>❌ Broken: Wrong trigger ID</h3>
                <sp-button id="correct-id">Click me</sp-button>
                <sp-overlay trigger="wrong-id@click" type="auto">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            This won't open!
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Problem:</strong> The button ID is "correct-id" but the overlay is looking for "wrong-id".
                    <pre><code>&lt;sp-button id="correct-id"&gt;
&lt;sp-overlay trigger="wrong-id@click"&gt;</code></pre>
                </div>
            </div>
            
            <div class="example fixed">
                <h3>✅ Fixed: Matching IDs</h3>
                <sp-button id="matching-id">Click me</sp-button>
                <sp-overlay trigger="matching-id@click" type="auto">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            This works correctly!
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Solution:</strong> Button ID matches the trigger attribute.
                    <pre><code>&lt;sp-button id="matching-id"&gt;
&lt;sp-overlay trigger="matching-id@click"&gt;</code></pre>
                </div>
            </div>
        </div>
    `;
};

WontOpen.parameters = {
    docs: {
        description: {
            story: 'Common issue: trigger ID mismatch preventing overlay from opening.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Overlay won't close - missing close event
 * 
 * **Problem:** No way to close overlay after opening
 * 
 * **Solution:** Dispatch 'close' event or set open=false
 * 
 * 📖 [Troubleshooting Guide](./TROUBLESHOOTING.md#overlay-wont-close)
 */
export const WontClose = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison">
            <div class="example broken">
                <h3>❌ Broken: No close mechanism</h3>
                <sp-button id="no-close-trigger">Open</sp-button>
                <sp-overlay trigger="no-close-trigger@click" type="inline">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>This overlay has no way to close!</p>
                            <sp-button>This button does nothing</sp-button>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Problem:</strong> type="inline" doesn't auto-close, and button doesn't trigger close event.
                </div>
            </div>
            
            <div class="example fixed">
                <h3>✅ Fixed: Close event added</h3>
                <sp-button id="with-close-trigger">Open</sp-button>
                <sp-overlay trigger="with-close-trigger@click" type="inline">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>This overlay can be closed!</p>
                            <sp-button @click=${(e: Event) => {
                                e.target?.dispatchEvent(new Event('close', { bubbles: true }));
                            }}>
                                Close
                            </sp-button>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Solution:</strong> Button dispatches 'close' event that bubbles to overlay.
                    <pre><code>@click=\${(e) => {
  e.target?.dispatchEvent(
    new Event('close', { bubbles: true })
  );
}}</code></pre>
                </div>
            </div>
        </div>
    `;
};

WontClose.parameters = {
    docs: {
        description: {
            story: 'Common issue: no mechanism to close overlay after opening.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Wrong positioning - incorrect placement value
 * 
 * **Problem:** Overlay appears in unexpected position
 * 
 * **Solution:** Use correct placement value
 * 
 * 📖 [Troubleshooting Guide](./TROUBLESHOOTING.md#positioning-issues)
 */
export const WrongPositioning = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison">
            <div class="example broken">
                <h3>❌ Broken: No placement specified</h3>
                <sp-button id="no-placement-trigger">Click me</sp-button>
                <sp-overlay trigger="no-placement-trigger@click" type="auto">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>Placement defaults to 'top' which might not be what you want.</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Problem:</strong> No placement specified, uses default.
                </div>
            </div>
            
            <div class="example fixed">
                <h3>✅ Fixed: Explicit placement</h3>
                <sp-button id="with-placement-trigger">Click me</sp-button>
                <sp-overlay trigger="with-placement-trigger@click" type="auto" placement="bottom-start">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>Positioned exactly where you want it!</p>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Solution:</strong> Specify placement explicitly.
                    <pre><code>&lt;sp-overlay placement="bottom-start"&gt;</code></pre>
                    <p><strong>Options:</strong> top, bottom, left, right (with -start/-end variants)</p>
                </div>
            </div>
        </div>
    `;
};

WrongPositioning.parameters = {
    docs: {
        description: {
            story: 'Common issue: overlay appears in wrong position due to missing or incorrect placement.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Focus problems - overlay doesn't receive focus
 * 
 * **Problem:** Focus not managed correctly
 * 
 * **Solution:** Set receives-focus attribute appropriately
 * 
 * 📖 [Accessibility Guide](./ACCESSIBILITY.md#focus-management)
 */
export const FocusProblems = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison">
            <div class="example broken">
                <h3>❌ Broken: Focus disabled on modal</h3>
                <sp-button id="no-focus-trigger">Open Modal</sp-button>
                <sp-overlay 
                    trigger="no-focus-trigger@click" 
                    type="modal"
                    receives-focus="false"
                >
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>Modal without focus management</p>
                            <sp-button>Can't tab to this</sp-button>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Problem:</strong> Modal overlay should receive focus but receives-focus="false" disables it.
                </div>
            </div>
            
            <div class="example fixed">
                <h3>✅ Fixed: Proper focus management</h3>
                <sp-button id="with-focus-trigger">Open Modal</sp-button>
                <sp-overlay 
                    trigger="with-focus-trigger@click" 
                    type="modal"
                >
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            <p>Modal with focus management</p>
                            <sp-button>Tab to this button</sp-button>
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Solution:</strong> Remove receives-focus="false" or set to "auto" for default behavior.
                    <pre><code>&lt;sp-overlay type="modal"&gt;
&lt;!-- receives-focus defaults to "auto" --&gt;</code></pre>
                </div>
            </div>
        </div>
    `;
};

FocusProblems.parameters = {
    docs: {
        description: {
            story: 'Common issue: incorrect focus management in modal overlays.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Multiple interactions not working
 * 
 * **Problem:** Can't combine hover and click on same trigger
 * 
 * **Solution:** Use overlay-trigger for multiple interactions
 * 
 * 📖 [overlay-trigger Documentation](./overlay-trigger.md)
 */
export const MultipleInteractions = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison">
            <div class="example broken">
                <h3>❌ Broken: Multiple sp-overlay elements</h3>
                <sp-button id="multi-trigger-wrong">Hover or Click</sp-button>
                <sp-overlay trigger="multi-trigger-wrong@hover" type="hint">
                    <sp-tooltip>Tooltip</sp-tooltip>
                </sp-overlay>
                <sp-overlay trigger="multi-trigger-wrong@click" type="auto">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            Popover
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Problem:</strong> Multiple sp-overlay elements can conflict.
                </div>
            </div>
            
            <div class="example fixed">
                <h3>✅ Fixed: Use overlay-trigger</h3>
                <overlay-trigger triggered-by="hover click">
                    <sp-button slot="trigger">Hover or Click</sp-button>
                    <sp-tooltip slot="hover-content" delayed>
                        Tooltip on hover
                    </sp-tooltip>
                    <sp-popover slot="click-content">
                        <sp-dialog size="s" no-divider>
                            Popover on click
                        </sp-dialog>
                    </sp-popover>
                </overlay-trigger>
                <div class="note">
                    <strong>Solution:</strong> Use overlay-trigger for multiple interactions.
                    <pre><code>&lt;overlay-trigger triggered-by="hover click"&gt;
  &lt;sp-button slot="trigger"&gt;
  &lt;sp-tooltip slot="hover-content"&gt;
  &lt;sp-popover slot="click-content"&gt;</code></pre>
                </div>
            </div>
        </div>
    `;
};

MultipleInteractions.parameters = {
    docs: {
        description: {
            story: 'Common issue: trying to use multiple interactions with sp-overlay instead of overlay-trigger.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Performance issues - too many overlays
 * 
 * **Problem:** Page slow with many overlays
 * 
 * **Solution:** Use slottable-request for lazy loading
 * 
 * 📖 [Performance Guide](./PERFORMANCE.md)
 */
export const PerformanceIssues = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison">
            <div class="example broken">
                <h3>❌ Broken: All content loaded</h3>
                <div class="note">
                    <p><strong>Problem:</strong> With many overlays, all content is in DOM:</p>
                    <pre><code>&lt;!-- 100 buttons with overlays --&gt;
&lt;sp-button id="btn1"&gt;Item 1&lt;/sp-button&gt;
&lt;sp-overlay trigger="btn1@click"&gt;
  &lt;sp-popover&gt;
    &lt;!-- Heavy content always in DOM --&gt;
  &lt;/sp-popover&gt;
&lt;/sp-overlay&gt;
&lt;!-- ...99 more... --&gt;</code></pre>
                    <p>Result: 100 popovers × 200 nodes = <strong>20,000 DOM nodes</strong></p>
                </div>
            </div>
            
            <div class="example fixed">
                <h3>✅ Fixed: Lazy loading</h3>
                <div class="note">
                    <p><strong>Solution:</strong> Use slottable-request to load content on demand:</p>
                    <pre><code>&lt;sp-overlay 
  trigger="btn@click"
  @slottable-request=\${handleRequest}
&gt;&lt;/sp-overlay&gt;

function handleRequest(event) {
  if (event.data === removeSlottableRequest) {
    this.innerHTML = '';
  } else {
    // Load content now
    this.innerHTML = '&lt;sp-popover&gt;...&lt;/sp-popover&gt;';
  }
}</code></pre>
                    <p>Result: Only 1-2 active overlays = <strong>200-400 DOM nodes</strong></p>
                    <p>💡 <strong>90% reduction in memory!</strong></p>
                </div>
            </div>
        </div>
    `;
};

PerformanceIssues.parameters = {
    docs: {
        description: {
            story: 'Common issue: performance problems with many overlays on a page.',
        },
    },
    chromatic: { disableSnapshot: true },
};

/**
 * Accessibility issues - missing keyboard support
 * 
 * **Problem:** Overlay not accessible via keyboard
 * 
 * **Solution:** Ensure proper ARIA and keyboard handling
 * 
 * 📖 [Accessibility Guide](./ACCESSIBILITY.md)
 */
export const AccessibilityIssues = (): TemplateResult => {
    return html`
        ${comparisonStyles}
        <div class="comparison">
            <div class="example broken">
                <h3>❌ Broken: Non-focusable trigger</h3>
                <div 
                    id="div-trigger-wrong" 
                    style="padding: 10px; background: var(--spectrum-gray-200); cursor: pointer;"
                >
                    Click me (not keyboard accessible)
                </div>
                <sp-overlay trigger="div-trigger-wrong@click" type="auto">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            Can't reach this with keyboard!
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Problem:</strong> Div element can't receive keyboard focus.
                    <pre><code>&lt;div id="trigger"&gt;Click me&lt;/div&gt;</code></pre>
                </div>
            </div>
            
            <div class="example fixed">
                <h3>✅ Fixed: Keyboard accessible</h3>
                <div 
                    id="div-trigger-fixed" 
                    tabindex="0"
                    role="button"
                    style="padding: 10px; background: var(--spectrum-gray-200); cursor: pointer;"
                    @keydown=${(e: KeyboardEvent) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            (e.target as HTMLElement).click();
                        }
                    }}
                >
                    Click me (keyboard accessible)
                </div>
                <sp-overlay trigger="div-trigger-fixed@click" type="auto">
                    <sp-popover>
                        <sp-dialog size="s" no-divider>
                            Fully keyboard accessible!
                        </sp-dialog>
                    </sp-popover>
                </sp-overlay>
                <div class="note">
                    <strong>Solution:</strong> Add tabindex, role, and keyboard handler.
                    <pre><code>&lt;div 
  tabindex="0" 
  role="button"
  @keydown=\${handleKeydown}
&gt;</code></pre>
                    <p>💡 <strong>Better:</strong> Use sp-button for built-in accessibility.</p>
                </div>
            </div>
        </div>
    `;
};

AccessibilityIssues.parameters = {
    docs: {
        description: {
            story: 'Common issue: overlay trigger not accessible via keyboard.',
        },
    },
    chromatic: { disableSnapshot: true },
};


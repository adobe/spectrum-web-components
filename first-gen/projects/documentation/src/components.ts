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

import './router.js';
import './components/demo-container.js';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import '@spectrum-web-components/top-nav/sp-top-nav.js';
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-add.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-remove.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-star.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-close.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-save-floppy.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-stopwatch.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-user-activity.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-anchor-select.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-polygon-select.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-rect-select.js';
import '@spectrum-web-components/table/sp-table.js';
import '@spectrum-web-components/table/sp-table-body.js';
import '@spectrum-web-components/table/sp-table-cell.js';
import '@spectrum-web-components/table/sp-table-checkbox-cell.js';
import '@spectrum-web-components/table/sp-table-head.js';
import '@spectrum-web-components/table/sp-table-head-cell.js';
import '@spectrum-web-components/table/sp-table-row.js';
import '@spectrum-web-components/field-group/sp-field-group.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/number-field/sp-number-field.js';
import '@spectrum-web-components/card/sp-card.js';
import '@spectrum-web-components/icon/sp-icon.js';

if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        import('@spectrum-web-components/bundle/elements.js');
        import('@spectrum-web-components/grid/sp-grid.js');
    });
} else {
    requestAnimationFrame(() => {
        import('@spectrum-web-components/bundle/elements.js');
        import('@spectrum-web-components/grid/sp-grid.js');
    });
}

class StyledElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        (this.shadowRoot as ShadowRoot).innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: var(--spectrum-gray-50);
                    color: var(--spectrum-gray-800);
                    border: 1px solid;
                    padding: 2em;
                }
            </style>
            <slot></slot>
        `;
    }
}

customElements.define('styled-element', StyledElement);

document
    .querySelector('sp-tab-panel[value="api"]')
    ?.addEventListener('click', (event: Event) => {
        const path = event.composedPath();
        const row = path.find(
            (el) =>
                (el as Element).localName === 'sp-table-row' &&
                (el as Element).id
        ) as HTMLElement;
        if (row) {
            location.hash = row.id;
            (event.target as HTMLElement).dispatchEvent(
                new CustomEvent('copy-text', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        text: row.dataset.value,
                        message: `${row.dataset.name} copied to clipboard!`,
                    },
                })
            );
        }
    });

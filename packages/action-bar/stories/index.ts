/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

export const ActionBarWrapper = ({
    open = false,
    emphasized = false,
    variant = 'sticky',
    flexible = false,
    scoped = false,
} = {}): TemplateResult => {
    if (scoped) {
        return html`
            <sp-action-bar-scoped
                open=${ifDefined(open)}
                ?emphasized=${ifDefined(emphasized)}
                variant=${ifDefined(variant)}
                ?flexible=${ifDefined(flexible)}
            >
                2 selected
                <sp-action-button slot="buttons" label="Edit">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button slot="buttons" label="More">
                    <sp-icon-more slot="icon"></sp-icon-more>
                </sp-action-button>
            </sp-action-bar-scoped>
        `;
    } else {
        return html`
            <sp-action-bar
                open=${ifDefined(open)}
                ?emphasized=${ifDefined(emphasized)}
                variant=${ifDefined(variant)}
                ?flexible=${ifDefined(flexible)}
            >
                2 selected
                <sp-action-button slot="buttons" label="Edit">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
                <sp-action-button slot="buttons" label="More">
                    <sp-icon-more slot="icon"></sp-icon-more>
                </sp-action-button>
            </sp-action-bar>
        `;
    }
};

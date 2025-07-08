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
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/action-bar/sp-action-bar.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-share.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-more.js';

import type { Properties } from './args.js';

export const Template = ({
    emphasized = false,
    open = true,
    tools = true,
    variant,
    content = '2 selected',
    hasActionMenu = false,
}: Properties = {}): TemplateResult => {
    return html`
        <sp-action-bar
            ?open=${open}
            ?emphasized=${emphasized}
            variant=${ifDefined(variant)}
        >
            ${content}
            ${tools
                ? html`
                      <sp-action-button slot="buttons" label="Edit">
                          <sp-icon-edit slot="icon"></sp-icon-edit>
                      </sp-action-button>
                      <sp-action-button slot="buttons" label="Share">
                          <sp-icon-share slot="icon"></sp-icon-share>
                      </sp-action-button>
                  `
                : html``}
            ${hasActionMenu
                ? html`
                      <sp-action-menu label="More Actions" slot="buttons">
                          <sp-menu-item>One</sp-menu-item>
                          <sp-menu-item>Two</sp-menu-item>
                          <sp-menu-item>
                              Select some items
                              <sp-menu slot="submenu" selects="multiple">
                                  <sp-menu-item>A</sp-menu-item>
                                  <sp-menu-item selected>B</sp-menu-item>
                                  <sp-menu-item>C</sp-menu-item>
                              </sp-menu>
                          </sp-menu-item>
                      </sp-action-menu>
                  `
                : html``}
        </sp-action-bar>
    `;
};

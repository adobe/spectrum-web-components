/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';

import treeViewHeadingStyles from './tree-view-heading.css.js';
import treeViewLabelStyles from './tree-view-label.css.js';

/**
 * @slot - The label
 */

export class TreeViewHeading extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [treeViewHeadingStyles, treeViewLabelStyles];
    }

    protected render(): TemplateResult {
        return html`
            <span id="label"><slot></slot></span>
        `;
    }
}

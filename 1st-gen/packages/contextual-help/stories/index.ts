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
import { spreadProps } from '../../../test/lit-helpers.js';
import { StoryArgs } from './args.js';
import '@spectrum-web-components/link/sp-link.js';
import '../sp-contextual-help.js';

export const ContextualHelpMarkup = (args: StoryArgs = {}): TemplateResult => {
    return html`
        <sp-contextual-help
            ${spreadProps(args)}
            placement=${ifDefined(args.placement)}
        >
            <h2 slot="heading">Permission required</h2>
            Your admin must grant you permission before you can create a
            segment.
            <sp-link
                slot="link"
                href="https://opensource.adobe.com/spectrum-web-components/"
            >
                Request permission
            </sp-link>
        </sp-contextual-help>
    `;
};

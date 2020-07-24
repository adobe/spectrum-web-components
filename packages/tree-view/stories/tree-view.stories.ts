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
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
import { thumbnail } from '../../thumbnail/stories/images.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-layers.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-folder.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-document.js';
import '../sp-tree-view.js';
import '../sp-tree-view-item.js';
import '../sp-tree-view-heading.js';

export default {
    component: 'sp-tree-view',
    title: 'Tree View',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-tree-view>
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item open>
                Design Files
                <sp-tree-view slot="children">
                    <sp-tree-view-item>Layer 1</sp-tree-view-item>
                    <sp-tree-view-item>Layer 3</sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
            <sp-tree-view-item>Layer 3</sp-tree-view-item>
            <sp-tree-view-item>Layer 4</sp-tree-view-item>
            <sp-tree-view-item open>
                Group 2
                <sp-tree-view slot="children">
                    <sp-tree-view-item open>
                        Group 3
                        <sp-tree-view slot="children">
                            <sp-tree-view-item>
                                Group 4
                                <sp-tree-view slot="children">
                                    <sp-tree-view-item>
                                        Layer 6
                                        <sp-tree-view slot="children">
                                            <sp-tree-view-item>
                                                Group 5
                                                <sp-tree-view
                                                    slot="children"
                                                ></sp-tree-view>
                                            </sp-tree-view-item>
                                        </sp-tree-view>
                                    </sp-tree-view-item>
                                </sp-tree-view>
                            </sp-tree-view-item>
                        </sp-tree-view>
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const selected = (): TemplateResult => {
    return html`
        <sp-tree-view style="width: 250px;">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const quiet = (): TemplateResult => {
    return html`
        <sp-tree-view quiet style="width: 250px;">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const standalone = (): TemplateResult => {
    return html`
        <sp-tree-view standalone style="width: 250px;">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const standaloneQuiet = (): TemplateResult => {
    return html`
        <sp-tree-view standalone quiet style="width: 250px;">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item selected>Layer 2</sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const filesAndFolders = (): TemplateResult => html`
    <sp-tree-view>
        <sp-tree-view-item open>
            <sp-icon-folder slot="icon"></sp-icon-folder>
            Design Files
            <sp-tree-view slot="children">
                <sp-tree-view-item>
                    <sp-icon-folder slot="icon"></sp-icon-folder>
                    Production Ready
                    <sp-tree-view slot="children">
                        <sp-tree-view-item>
                            <sp-icon-folder slot="icon"></sp-icon-folder>
                            Unopened Child
                        </sp-tree-view-item>
                    </sp-tree-view>
                </sp-tree-view-item>
                <sp-tree-view-item open>
                    <sp-icon-folder slot="icon"></sp-icon-folder>
                    Work in Progress
                    <sp-tree-view slot="children">
                        <sp-tree-view-item open>
                            <sp-icon-folder slot="icon"></sp-icon-folder>
                            Branding
                            <sp-tree-view slot="children">
                                <sp-tree-view-item>
                                    <sp-icon-folder
                                        slot="icon"
                                    ></sp-icon-folder>
                                    Assets
                                    <sp-tree-view slot="children">
                                        <sp-tree-view-item>
                                            <sp-icon-folder
                                                slot="icon"
                                            ></sp-icon-folder>
                                            Unopened Child
                                        </sp-tree-view-item>
                                    </sp-tree-view>
                                </sp-tree-view-item>
                                <sp-tree-view-item open>
                                    <sp-icon-folder
                                        slot="icon"
                                    ></sp-icon-folder>
                                    Explorations
                                    <sp-tree-view slot="children">
                                        <sp-tree-view-item>
                                            <sp-icon-document
                                                slot="icon"
                                            ></sp-icon-document>
                                            CocaCola_01.ai
                                        </sp-tree-view-item>
                                        <sp-tree-view-item>
                                            <sp-icon-document
                                                slot="icon"
                                            ></sp-icon-document>
                                            CocaCola_02.ai
                                        </sp-tree-view-item>
                                    </sp-tree-view>
                                </sp-tree-view-item>
                            </sp-tree-view>
                        </sp-tree-view-item>
                    </sp-tree-view>
                </sp-tree-view-item>
                <sp-tree-view-item>
                    <sp-icon-folder slot="icon"></sp-icon-folder>
                    Archive
                    <sp-tree-view slot="children">
                        <sp-tree-view-item>
                            <sp-icon-folder slot="icon"></sp-icon-folder>
                            Unopened Child
                        </sp-tree-view-item>
                    </sp-tree-view>
                </sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
        <sp-tree-view-item>
            <sp-icon-folder slot="icon"></sp-icon-folder>
            References
            <sp-tree-view slot="children">
                <sp-tree-view-item>
                    <sp-icon-folder slot="icon"></sp-icon-folder>
                    Unopened Child
                </sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
    </sp-tree-view>
`;

export const thumbnails = (): TemplateResult => {
    return html`
        <sp-tree-view>
            <sp-tree-view-item open>
                <sp-thumbnail slot="thumbnail">
                    <img src=${thumbnail} alt="Woman crouching" />
                </sp-thumbnail>
                Composition
                <sp-tree-view slot="children">
                    <sp-tree-view-item>
                        <sp-thumbnail slot="thumbnail">
                            <img src=${thumbnail} alt="Woman crouching" />
                        </sp-thumbnail>
                        Flowers
                    </sp-tree-view-item>
                    <sp-tree-view-item>
                        <sp-thumbnail slot="thumbnail">
                            <img src=${thumbnail} alt="Woman crouching" />
                        </sp-thumbnail>
                        Figure
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const thumbnailsQuiet = (): TemplateResult => {
    return html`
        <sp-tree-view quiet>
            <sp-tree-view-item open>
                <sp-thumbnail slot="thumbnail">
                    <img src=${thumbnail} alt="Woman crouching" />
                </sp-thumbnail>
                Composition
                <sp-tree-view slot="children" quiet>
                    <sp-tree-view-item>
                        <sp-thumbnail slot="thumbnail">
                            <img src=${thumbnail} alt="Woman crouching" />
                        </sp-thumbnail>
                        Flowers
                    </sp-tree-view-item>
                    <sp-tree-view-item>
                        <sp-thumbnail slot="thumbnail">
                            <img src=${thumbnail} alt="Woman crouching" />
                        </sp-thumbnail>
                        Figure
                    </sp-tree-view-item>
                </sp-tree-view>
            </sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const disabled = (): TemplateResult => html`
    <sp-tree-view>
        <sp-tree-view-item>Layer 1</sp-tree-view-item>
        <sp-tree-view-item disabled>
            Group 1
            <sp-tree-view slot="children">
                <sp-tree-view-item>Layer 2</sp-tree-view-item>
                <sp-tree-view-item>Layer 3</sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
        <sp-tree-view-item>Layer 4</sp-tree-view-item>
        <sp-tree-view-item>Layer 5</sp-tree-view-item>
        <sp-tree-view-item open>
            Group 2
            <sp-tree-view slot="children">
                <sp-tree-view-item open>
                    Group 3
                    <sp-tree-view slot="children">
                        <sp-tree-view-item>
                            Group 4
                            <sp-tree-view slot="children">
                                <sp-tree-view-item>
                                    Unopened Child
                                </sp-tree-view-item>
                            </sp-tree-view>
                        </sp-tree-view-item>
                    </sp-tree-view>
                </sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
    </sp-tree-view>
`;

export const sections = (): TemplateResult => html`
    <sp-tree-view>
        <sp-tree-view-heading>Section 1</sp-tree-view-heading>
        <sp-tree-view-item>
            Group 1
            <sp-tree-view slot="children">
                <sp-tree-view-item>Layer 2</sp-tree-view-item>
                <sp-tree-view-item>Layer 3</sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
        <sp-tree-view-item>Layer 4</sp-tree-view-item>
        <sp-tree-view-item>Layer 5</sp-tree-view-item>
        <sp-tree-view-heading>Section 2</sp-tree-view-heading>
        <sp-tree-view-item open>
            Group 2
            <sp-tree-view slot="children">
                <sp-tree-view-item open>
                    Group 3
                    <sp-tree-view slot="children">
                        <sp-tree-view-item>
                            Group 4
                            <sp-tree-view slot="children">
                                <sp-tree-view-item>
                                    Unopened Child
                                </sp-tree-view-item>
                            </sp-tree-view>
                        </sp-tree-view-item>
                    </sp-tree-view>
                </sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
    </sp-tree-view>
`;

export const dropTarget = (): TemplateResult => {
    return html`
        <sp-tree-view style="width: 250px;">
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item drop-target>Layer 2</sp-tree-view-item>
        </sp-tree-view>
    `;
};

export const icons = (): TemplateResult => html`
    <sp-tree-view>
        <sp-tree-view-item>
            <sp-icon-layers slot="icon"></sp-icon-layers>
            Layer 1
        </sp-tree-view-item>
        <sp-tree-view-item open>
            <sp-icon-folder slot="icon"></sp-icon-folder>
            Group 1
            <sp-tree-view slot="children">
                <sp-tree-view-item>
                    <sp-icon-layers slot="icon"></sp-icon-layers>
                    Layer 2
                </sp-tree-view-item>
                <sp-tree-view-item>
                    <sp-icon-layers slot="icon"></sp-icon-layers>
                    Layer 3
                </sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
        <sp-tree-view-item>
            <sp-icon-layers slot="icon"></sp-icon-layers>
            Layer 4
        </sp-tree-view-item>
        <sp-tree-view-item>
            <sp-icon-layers slot="icon"></sp-icon-layers>
            Layer 5
        </sp-tree-view-item>
        <sp-tree-view-item open>
            <sp-icon-folder slot="icon"></sp-icon-folder>
            Group 2
            <sp-tree-view slot="children">
                <sp-tree-view-item open>
                    <sp-icon-folder slot="icon"></sp-icon-folder>
                    Group 3
                    <sp-tree-view slot="children">
                        <sp-tree-view-item>
                            <sp-icon-folder slot="icon"></sp-icon-folder>
                            Group 4
                            <sp-tree-view slot="children">
                                <sp-tree-view-item>
                                    <sp-icon-folder
                                        slot="icon"
                                    ></sp-icon-folder>
                                    Unopened Child
                                </sp-tree-view-item>
                            </sp-tree-view>
                        </sp-tree-view-item>
                    </sp-tree-view>
                </sp-tree-view-item>
            </sp-tree-view>
        </sp-tree-view-item>
    </sp-tree-view>
`;

export const flat = (): TemplateResult => {
    return html`
        <sp-tree-view>
            <sp-tree-view-item>Layer 1</sp-tree-view-item>
            <sp-tree-view-item open can-open>Design Files</sp-tree-view-item>
            <sp-tree-view-item indent="1">Layer 1</sp-tree-view-item>
            <sp-tree-view-item indent="1">Layer 3</sp-tree-view-item>
            <sp-tree-view-item>Layer 3</sp-tree-view-item>
            <sp-tree-view-item>Layer 4</sp-tree-view-item>
            <sp-tree-view-item open can-open>Group 2</sp-tree-view-item>
            <sp-tree-view-item open indent="1" can-open>
                Group 3
            </sp-tree-view-item>
            <sp-tree-view-item indent="2" can-open>Group 4</sp-tree-view-item>
        </sp-tree-view>
    `;
};

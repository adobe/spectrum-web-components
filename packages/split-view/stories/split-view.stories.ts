/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, TemplateResult } from '@spectrum-web-components/base';

import '../sp-split-view.js';

export default {
    title: 'Split View',
    component: 'sp-split-view',
};

export const Horizontal = (): TemplateResult => {
    return html`
        <sp-split-view style="height: 200px" primary-size="100">
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `;
};

export const HorizontalResizable = (): TemplateResult => {
    return html`
        <sp-split-view
            resizable
            primary-min="50"
            primary-size="100"
            secondary-min="50"
            id="testsplit"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                </p>
            </div>
        </sp-split-view>
    `;
};

export const HorizontalResizableCollapsible = (): TemplateResult => {
    return html`
        <sp-split-view
            resizable
            collapsible
            primary-min="50"
            secondary-min="50"
            style="height: 500px;"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </p>
            </div>
        </sp-split-view>
    `;
};

export const Vertical = (): TemplateResult => {
    return html`
        <sp-split-view vertical>
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `;
};

export const VerticalResizable = (): TemplateResult => {
    return html`
        <sp-split-view
            vertical
            resizable
            primary-min="50"
            primary-max="100"
            secondary-min="50"
            style="height: 400px;"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </p>
            </div>
        </sp-split-view>
    `;
};

export const VerticalResizableCollapsible = (): TemplateResult => {
    return html`
        <sp-split-view
            vertical
            resizable
            collapsible
            primary-min="50"
            primary-size="250"
            secondary-min="40"
            style="height: 400px;"
        >
            <div>
                <h1>First panel</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel</h2>
                <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </p>
            </div>
        </sp-split-view>
    `;
};

export const MultipleLevels = (): TemplateResult => {
    return html`
        <sp-split-view
            resizable
            primary-min="50"
            primary-max="200"
            secondary-min="50"
            style="height: 400px; width: 600px;"
        >
            <div>
                <h1>First panel - Level 1</h1>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </div>
            <div>
                <h2>Second panel - Level 1</h2>
                <sp-split-view
                    vertical
                    resizable
                    primary-min="50"
                    primary-size="100"
                    secondary-min="50"
                    style="height: 300px;"
                >
                    <div>
                        <h3>First panel - Level 2</h3>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <div>
                        <h4>Second panel - Level 2</h4>
                        <p>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
                        </p>
                    </div>
                </sp-split-view>
            </div>
        </sp-split-view>
    `;
};

export const OnePaneNoSplitter = (): TemplateResult => {
    return html`
        <sp-split-view style="height: 200px">
            <div>First panel</div>
        </sp-split-view>
    `;
};

export const ShowFirstTwoPanes = (): TemplateResult => {
    return html`
        <sp-split-view style="height: 200px">
            <div>First panel</div>
            <div>Second panel</div>
            <div>Third (invisible) panel</div>
        </sp-split-view>
    `;
};

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

import '@spectrum-web-components/split-view/sp-split-view.js';

export default {
    title: 'Split View',
    component: 'sp-split-view',
    args: {
        primarySize: 100,
    },
    argTypes: {
        primarySize: {
            name: 'primarySize',
            type: { name: 'number', required: false },
            description: 'Size of the primary panel.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: undefined },
            },
            control: {
                type: 'number',
            },
        },
    },
};

interface Properties {
    primarySize?: string;
}

export const Horizontal = (args: Properties): TemplateResult => {
    return html`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `;
};

export const HorizontalResizable = (args: Properties): TemplateResult => {
    return html`
        <sp-split-view
            resizable
            primary-min="50"
            .primarySize="${args.primarySize}"
            secondary-min="50"
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

export const HorizontalResizableCollapsible = (
    args: Properties
): TemplateResult => {
    return html`
        <sp-split-view
            resizable
            collapsible
            primary-min="50"
            secondary-min="50"
            style="height: 500px;"
            .primarySize="${args.primarySize}"
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

HorizontalResizableCollapsible.args = {
    primarySize: undefined,
};

export const Vertical = (args: Properties): TemplateResult => {
    return html`
        <sp-split-view vertical .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
        </sp-split-view>
    `;
};

Vertical.args = {
    primarySize: undefined,
};

export const VerticalResizable = (args: Properties): TemplateResult => {
    return html`
        <sp-split-view
            vertical
            resizable
            primary-min="50"
            primary-max="100"
            secondary-min="50"
            style="height: 400px;"
            .primarySize="${args.primarySize}"
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

VerticalResizable.args = {
    primarySize: undefined,
};

export const VerticalResizableCollapsible = (
    args: Properties
): TemplateResult => {
    return html`
        <sp-split-view
            vertical
            resizable
            collapsible
            primary-min="50"
            secondary-min="40"
            style="height: 400px;"
            .primarySize="${args.primarySize}"
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

VerticalResizableCollapsible.args = {
    primarySize: 250,
};

export const MultipleLevels = (args: Properties): TemplateResult => {
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
                    .primarySize="${args.primarySize}"
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

export const OnePaneNoSplitter = (args: Properties): TemplateResult => {
    return html`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
        </sp-split-view>
    `;
};

export const ShowFirstTwoPanes = (args: Properties): TemplateResult => {
    return html`
        <sp-split-view style="height: 200px" .primarySize="${args.primarySize}">
            <div>First panel</div>
            <div>Second panel</div>
            <div>Third (invisible) panel</div>
        </sp-split-view>
    `;
};

ShowFirstTwoPanes.args = {
    primarySize: undefined,
};

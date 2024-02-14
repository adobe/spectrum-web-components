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

import '@spectrum-web-components/sidenav/sp-sidenav.js';
import '@spectrum-web-components/sidenav/sp-sidenav-item.js';
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';

export default {
    component: 'sp-sidenav',
    title: 'Sidenav',
    argTypes: {
        onChange: { action: 'change' },
    },
};

export const Default = ({
    onChange,
}: {
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-sidenav @change=${onChange} value="Section 1">
            <sp-sidenav-item
                value="Section 1"
                label="Section 1"
            ></sp-sidenav-item>
            <sp-sidenav-item
                selected
                value="Section 2"
                label="Section 2"
            ></sp-sidenav-item>
            <sp-sidenav-heading label="Category 1">
                <sp-sidenav-item
                    value="Section 3"
                    label="Section 3"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 4"
                    label="Section 4"
                ></sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};

export const Multilevel = ({
    onChange,
}: {
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-sidenav variant="multilevel" value="2.3.1" @change=${onChange}>
            <sp-sidenav-item value="foo" label="foo"></sp-sidenav-item>
            <sp-sidenav-item value="baz" label="baz">
                <sp-sidenav-item value="2.1" label="2.1"></sp-sidenav-item>
                <sp-sidenav-item value="2.2" label="2.2"></sp-sidenav-item>
                <sp-sidenav-item value="2.3" label="2.3">
                    <sp-sidenav-item
                        value="2.3.1"
                        label="2.3.1"
                    ></sp-sidenav-item>
                    <sp-sidenav-item
                        disabled
                        value="2.3.2"
                        label="2.3.2"
                    ></sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-item>
            <sp-sidenav-item value="test" label="test"></sp-sidenav-item>
            <sp-sidenav-item value="hi" label="hi"></sp-sidenav-item>
        </sp-sidenav>
    `;
};

Multilevel.storyName = 'Multi-level';

export const MultilevelSlotted = ({
    onChange,
}: {
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-sidenav variant="multilevel" value="2.3.1" @change=${onChange}>
            <sp-sidenav-item value="foo">foo</sp-sidenav-item>
            <sp-sidenav-item value="baz">
                baz
                <sp-sidenav-item value="2.1">2.1</sp-sidenav-item>
                <sp-sidenav-item value="2.2">2.2</sp-sidenav-item>
                <sp-sidenav-item value="2.3">
                    2.3
                    <sp-sidenav-item value="2.3.1">2.3.1</sp-sidenav-item>
                    <sp-sidenav-item disabled value="2.3.2">
                        2.3.2
                    </sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-item>
            <sp-sidenav-item value="test">test</sp-sidenav-item>
            <sp-sidenav-item value="hi">hi</sp-sidenav-item>
        </sp-sidenav>
    `;
};

MultilevelSlotted.storyName = 'Multi-level Slotted';

export const levelsAndDisabled = (): TemplateResult => {
    return html`
        <sp-sidenav>
            <sp-sidenav-heading label="Category 1">
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 2"
                    label="Section 2"
                    disabled
                ></sp-sidenav-item>
                <sp-sidenav-item value="Section 3" label="Section 3" expanded>
                    <sp-sidenav-item
                        value="Section 3a"
                        label="Section 3a"
                    ></sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};

export const manageTabIndex = (): TemplateResult => {
    return html`
        <sp-sidenav manage-tab-index>
            <sp-sidenav-heading label="Category 1">
                <sp-sidenav-item
                    value="Section 0"
                    label="Section 0"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                    selected
                ></sp-sidenav-item>
                <sp-sidenav-item
                    value="Section 2"
                    label="Section 2"
                    disabled
                ></sp-sidenav-item>
                <sp-sidenav-item value="Section 3" label="Section 3">
                    <sp-sidenav-item
                        value="Section 3a"
                        label="Section 3a"
                    ></sp-sidenav-item>
                </sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};

export const Hrefs = ({
    onChange,
}: {
    onChange: () => void;
}): TemplateResult => {
    return html`
        <sp-sidenav @change=${onChange} value="current">
            <sp-sidenav-heading label="Github">
                <sp-sidenav-item
                    href=${window.location.href}
                    label="Current"
                    value="current"
                    selected
                ></sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components"
                    label="Code"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components/issues"
                    label="Issues"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    href="https://github.com/adobe/spectrum-web-components/pulls"
                    label="Pull Requests"
                ></sp-sidenav-item>
            </sp-sidenav-heading>
        </sp-sidenav>
    `;
};

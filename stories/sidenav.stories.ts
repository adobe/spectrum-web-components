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
import { storiesOf } from '@storybook/polymer';
import { decorate } from '@storybook/addon-actions';
import { html } from 'lit-html';

import {
    defineCustomElements,
    SideNav,
    SideNavItem,
    SideNavHeading,
} from '../src';

defineCustomElements(SideNav, SideNavItem, SideNavHeading);

const eventValue = decorate([(args) => [args[0].detail.value]]);

storiesOf('Sidenav', module)
    .add('Default', () => {
        return html`
            <sp-sidenav @select=${eventValue.action('select')}>
                <sp-sidenav-item
                    value="Section 1"
                    label="Section 1"
                ></sp-sidenav-item>
                <sp-sidenav-item
                    selected
                    value="Section 2"
                    label="Section 2"
                ></sp-sidenav-item>
                <sp-sidenav-heading label="CATEGORY 1">
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
    })
    .add('MultiLevel', () => {
        return html`
            <sp-sidenav
                variant="multilevel"
                value="2.3.1"
                @select=${eventValue.action('select')}
            >
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
                            value="2.3.2"
                            label="2.3.2"
                        ></sp-sidenav-item>
                    </sp-sidenav-item>
                </sp-sidenav-item>
                <sp-sidenav-item value="test" label="test"></sp-sidenav-item>
                <sp-sidenav-item value="hi" label="hi"></sp-sidenav-item>
            </sp-sidenav>
        `;
    })
    .add('Hrefs', () => {
        return html`
            <sp-sidenav @select=${eventValue.action('select')}>
                <sp-sidenav-heading label="GITHUB">
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
    });

/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { storiesOf } from '@storybook/polymer';
import { radios, withKnobs } from '@storybook/addon-knobs';
import { html } from 'lit-html';
import * as MediumIcons from '../src/icons/icons-medium';
import '../src/tabs';

import { defineCustomElements, Icon } from '../src';

storiesOf('Tabs', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        return html`
            <sp-tabs selected="1">
                <sp-tab-item label="Tab 1" value="1" tabindex="1"></sp-tab-item>
                <sp-tab-item label="Tab 2" value="2" tabindex="2"></sp-tab-item>
                <sp-tab-item label="Tab 3" value="3" tabindex="3"></sp-tab-item>
                <sp-tab-item label="Tab 4" value="4 tabindex="4"></sp-tab-item>
            </sp-tabs>
        `;
    })
    .add('Vertical', () => {
        return html`
            <sp-tabs selected="1" direction="vertical">
                <sp-tab-item label="Tab 1" value="1" tabindex="1"></sp-tab-item>
                <sp-tab-item label="Tab 2" value="2" tabindex="2"></sp-tab-item>
                <sp-tab-item label="Tab 3" value="3" tabindex="3"></sp-tab-item>
                <sp-tab-item label="Tab 4" value="4 tabindex=" 4></sp-tab-item>
            </sp-tabs>
        `;
    })
    .add('Icons', () => {
        const directions = {
            horizontal: 'Horizontal',
            vertical: 'Vertical',
        };
        const type = radios('Type', directions, directions.horizontal);
        return html`
            <sp-icons-medium></sp-icons-medium>
            <sp-tabs selected="1" direction="${type}">
                <sp-tab-item label="Tab 1" value="1" tabindex="1">
                    <sp-icon
                        slot="icon"
                        size="m"
                        name="ui:CheckmarkSmall"
                    ></sp-icon>
                </sp-tab-item>
                <sp-tab-item label="Tab 2" value="2" tabindex="2">
                    <sp-icon
                        slot="icon"
                        size="m"
                        name="ui:CrossSmall"
                    ></sp-icon>
                </sp-tab-item>
                <sp-tab-item label="Tab 3" value="3" tabindex="3">
                    <sp-icon
                        slot="icon"
                        size="m"
                        name="ui:ChevronDownSmall"
                    ></sp-icon>
                </sp-tab-item>
                <sp-tab-item label="Tab 4" value="4 tabindex=" 4>
                    <sp-icon slot="icon" size="m" name="ui:HelpSmall"></sp-icon>
                </sp-tab-item>
            </sp-tabs>
        `;
    })
    .add('Quiet', () => {
        const directions = {
            horizontal: 'Horizontal',
            vertical: 'Vertical',
        };
        const type = radios('Type', directions, directions.horizontal);
        return html`
        <sp-tabs selected="1" quiet direction="${type}">
            <sp-tab-item label="Tab 1" value="1" tabindex="1"></sp-tab-item>
            <sp-tab-item label="Tab 2" value="2" tabindex="2"></sp-tab-item>
            <sp-tab-item label="Tab 3" value="3" tabindex="3"></sp-tab-item>
            <sp-tab-item label="Tab 4" value="4 tabindex="4""></sp-tab-item>
        </sp-tabs>
        `;
    })
    .add('Compact', () => {
        const directions = {
            horizontal: 'Horizontal',
            vertical: 'Vertical',
        };
        const type = radios('Type', directions, directions.horizontal);
        return html`
        <sp-tabs selected="1" compact direction="${type}">
            <sp-tab-item label="Tab 1" value="1" tabindex="1"></sp-tab-item>
            <sp-tab-item label="Tab 2" value="2" tabindex="2"></sp-tab-item>
            <sp-tab-item label="Tab 3" value="3" tabindex="3"></sp-tab-item>
            <sp-tab-item label="Tab 4" value="4 tabindex="4""></sp-tab-item>
        </sp-tabs>
        `;
    })
    .add('Quiet Compact', () => {
        const directions = {
            horizontal: 'Horizontal',
            vertical: 'Vertical',
        };
        const type = radios('Type', directions, directions.horizontal);
        return html`
        <sp-tabs selected="1" quiet compact direction="${type}">
            <sp-tab-item label="Tab 1" value="1" tabindex="1"></sp-tab-item>
            <sp-tab-item label="Tab 2" value="2" tabindex="2"></sp-tab-item>
            <sp-tab-item label="Tab 3" value="3" tabindex="3"></sp-tab-item>
            <sp-tab-item label="Tab 4" value="4 tabindex="4""></sp-tab-item>
        </sp-tabs>
        `;
    });

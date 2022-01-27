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
import '@spectrum-web-components/action-button/sp-action-button.js';
import { ActionButton } from '@spectrum-web-components/action-button';
import '@spectrum-web-components/action-group/sp-action-group.js';
import { ActionGroup } from '@spectrum-web-components/action-group';
import '@spectrum-web-components/tabs/sp-tab-panel.js';
import '@spectrum-web-components/tabs/sp-tab.js';
import '@spectrum-web-components/tabs/sp-tabs.js';
import { Tab, TabPanel, Tabs } from '@spectrum-web-components/tabs';
import { elementUpdated, expect, fixture, nextFrame } from '@open-wc/testing';
import { html } from '@spectrum-web-components/base';
import { sendKeys } from '@web/test-runner-commands';
import { sendMouse } from '../../../test/plugins/browser.js';

const createTabs = async (): Promise<Tabs> => {
    const tabs = await fixture<Tabs>(
        html`
            <sp-tabs selected="second">
                <sp-tab label="Tab 1" value="first"></sp-tab>
                <sp-tab label="Tab 2" value="second"></sp-tab>
                <sp-tab label="Tab 3" value="third"></sp-tab>
                <sp-tab-panel value="first">
                    <sp-action-group selects="single">
                        <sp-action-button selected value="1">
                            Single Button 1
                        </sp-action-button>
                        <sp-action-button value="2">
                            Single Button 2
                        </sp-action-button>
                        <sp-action-button value="3">
                            Single Button 3
                        </sp-action-button>
                    </sp-action-group>
                </sp-tab-panel>
                <sp-tab-panel value="second">
                    <sp-action-group selects="multiple">
                        <sp-action-button value="1">
                            Multiple Button 1
                        </sp-action-button>
                        <sp-action-button selected value="2">
                            Multiple Button 2
                        </sp-action-button>
                        <sp-action-button selected value="3">
                            Multiple Button 3
                        </sp-action-button>
                    </sp-action-group>
                </sp-tab-panel>
                <sp-tab-panel value="third">
                    <sp-action-group>
                        <sp-action-button value="1">
                            None Button 1
                        </sp-action-button>
                        <sp-action-button value="2">
                            None Button 2
                        </sp-action-button>
                        <sp-action-button selected value="3">
                            None Button 3
                        </sp-action-button>
                    </sp-action-group>
                </sp-tab-panel>
            </sp-tabs>
        `
    );
    await elementUpdated(tabs);
    return tabs;
};

describe('Action Group inside of Tabs', () => {
    it('accurately navigates the desired element', async () => {
        const el = await createTabs();
        const tab1 = el.querySelector('sp-tab[value="first"]') as Tab;
        const tab2 = el.querySelector('sp-tab[value="second"]');
        const tab3 = el.querySelector('sp-tab[value="third"]') as Tab;
        const tabPanel1 = el.querySelector(
            'sp-tab-panel[value="first"]'
        ) as TabPanel;
        const tabPanel2 = el.querySelector(
            'sp-tab-panel[value="second"]'
        ) as TabPanel;
        const tabPanel3 = el.querySelector(
            'sp-tab-panel[value="third"]'
        ) as TabPanel;
        const actionGroup1 = tabPanel1.querySelector(
            'sp-action-group'
        ) as ActionGroup;
        const actionGroup2 = tabPanel2.querySelector(
            'sp-action-group'
        ) as ActionGroup;
        const actionGroup3 = tabPanel3.querySelector(
            'sp-action-group'
        ) as ActionGroup;
        const actionButton1 = actionGroup1.querySelector(
            '[selected]'
        ) as ActionButton;
        const actionButton2 = actionGroup2.querySelector(
            '[selected]'
        ) as ActionButton;
        const actionButton3 = actionGroup3.querySelector(
            '[selected]'
        ) as ActionButton;

        el.focus();
        expect(el.contains(document.activeElement)).to.be.true;
        expect(document.activeElement === tab2).to.be.true;

        actionGroup2.focus();
        expect(document.activeElement === actionButton2).to.be.true;

        await nextFrame();
        await sendKeys({
            press: 'ArrowLeft',
        });

        expect(document.activeElement === tab1).to.be.false;
        expect(actionGroup2.contains(document.activeElement)).to.be.true;

        el.focus();
        expect(document.activeElement === tab2).to.be.true;

        await sendKeys({
            press: 'ArrowRight',
        });

        expect(document.activeElement === tab3).to.be.true;

        await sendKeys({
            press: 'Enter',
        });

        expect(document.activeElement === tab3).to.be.true;

        actionGroup3.focus();
        expect(document.activeElement === actionButton3).to.be.true;

        await sendKeys({
            press: 'ArrowLeft',
        });

        expect(document.activeElement === tab2).to.be.false;
        expect(actionGroup3.contains(document.activeElement)).to.be.true;

        const boundingRect = tab1.getBoundingClientRect();
        // tab1.click() doesn't current reach into the focus management here.
        await sendMouse({
            steps: [
                {
                    type: 'click',
                    position: [
                        boundingRect.left + boundingRect.width / 2,
                        boundingRect.top + boundingRect.height / 2,
                    ],
                },
            ],
        });
        expect(document.activeElement === tab1).to.be.true;

        actionGroup1.focus();
        expect(document.activeElement === actionButton1).to.be.true;

        await sendKeys({
            press: 'ArrowRight',
        });

        expect(document.activeElement === tab2).to.be.false;
        expect(actionGroup1.contains(document.activeElement)).to.be.true;
    });
});

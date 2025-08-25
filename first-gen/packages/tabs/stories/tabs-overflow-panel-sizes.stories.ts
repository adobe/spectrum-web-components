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
import { TemplateResult } from '@spectrum-web-components/base';
import { OverflowProperties, renderTabsOverflowExample } from './index.js';

export default {
    title: 'Tabs Overflow/Sizes/with Panel',
    component: 'sp-tabs-overflow',
};

export const s = (args: OverflowProperties): TemplateResult => {
    return renderTabsOverflowExample(args);
};
s.args = {
    size: 's',
    includeTabPanel: true,
};
export const m = (args: OverflowProperties): TemplateResult => {
    return renderTabsOverflowExample(args);
};
m.args = {
    size: 'm',
    includeTabPanel: true,
};
export const l = (args: OverflowProperties): TemplateResult => {
    return renderTabsOverflowExample(args);
};
l.args = {
    size: 'l',
    pincludeTabPanelanel: true,
};
export const XL = (args: OverflowProperties): TemplateResult => {
    return renderTabsOverflowExample(args);
};
XL.args = {
    size: 'xl',
    includeTabPanel: true,
};

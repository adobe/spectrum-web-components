/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { TemplateResult } from '@spectrum-web-components/base';
import { OverflowProperties, renderTabsOverflowExample } from './index.js';

export default {
    title: 'Tabs Overflow',
    component: 'sp-tabs-overflow',
};

export const compact = (args: OverflowProperties): TemplateResult => {
    return renderTabsOverflowExample(args);
};
compact.args = {
    compact: true,
};

export const autoscroll = (args: OverflowProperties): TemplateResult => {
    return renderTabsOverflowExample(args);
};
autoscroll.args = {
    selected: 10,
    autoscroll: true,
};

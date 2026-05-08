/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { defineElement } from '@spectrum-web-components/core/element/index.js';

import { Tab } from './Tab.js';
import { TabPanel } from './TabPanel.js';
import { Tabs } from './Tabs.js';

export * from './Tab.js';
export * from './TabPanel.js';
export * from './Tabs.js';
declare global {
  interface HTMLElementTagNameMap {
    'swc-tab': Tab;
    'swc-tab-panel': TabPanel;
    'swc-tabs': Tabs;
  }
}
defineElement('swc-tab', Tab);
defineElement('swc-tab-panel', TabPanel);
defineElement('swc-tabs', Tabs);

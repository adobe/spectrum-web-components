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

import { Tabs } from '@spectrum-web-components/tabs';

const tabs = document.querySelector('sp-tabs') as Tabs;
tabs.addEventListener('change', (event: Event) => {
    const target = event.target as Tabs;
    const { selected } = target;
    const { pathname } = location;
    const isAPI = pathname.search('api') > -1;
    switch (selected) {
        case 'api': {
            if (isAPI) return;
            const dest = (pathname + '/api/').replace('//a', '/a');
            history.pushState({}, document.title, dest);
            break;
        }
        case 'examples': {
            if (!isAPI) return;
            const dest = pathname.split('/api')[0] + '/';
            history.pushState({}, document.title, dest);
            break;
        }
    }
});

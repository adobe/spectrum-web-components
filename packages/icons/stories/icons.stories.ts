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
import { html } from 'lit-html';

import '../';
import '../../icon';
import '../../iconset/lib/icons-demo';
import { color } from '@storybook/addon-knobs';

storiesOf('Icons', module)
    .add(
        'List - Medium',
        () => html`
            <icons-demo style="color: ${color('Color', '#000', 'Element')}">
                <sp-icons-medium></sp-icons-medium>
            </icons-demo>
        `
    )
    .add(
        'List - Large',
        () => html`
            <icons-demo style="color: ${color('Color', '#000', 'Element')}">
                <sp-icons-large></sp-icons-large>
            </icons-demo>
        `
    );

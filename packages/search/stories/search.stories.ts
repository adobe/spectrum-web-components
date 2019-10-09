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
import { action } from '@storybook/addon-actions';
import { html } from 'lit-html';

import '../';
import { Search } from '../';

storiesOf('Search', module)
    .add(
        'Default',
        () => html`
            <sp-search
                @submit=${(e: Event) => {
                    e.preventDefault();
                    const search = e.target as Search;
                    action(`Search: ${search.value}`)();
                }}
            ></sp-search>
            <sp-search disabled></sp-search>
        `
    )
    .add(
        'Quiet',
        () => html`
            <sp-search
                quiet
                @submit=${(e: Event) => {
                    e.preventDefault();
                    const search = e.target as Search;
                    action(`Search: ${search.value}`)();
                }}
            ></sp-search>
            <sp-search quiet disabled></sp-search>
        `
    );

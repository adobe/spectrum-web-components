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
import { html } from 'lit-html';
import { boolean } from '@storybook/addon-knobs';

import '../lib';

storiesOf('Textarea', module).add('Default', () => {
    const grows = boolean('Grows', false, 'Element');
    const quiet = boolean('Quiet', false, 'Element');
    return html`
        <sp-textfield
            multiline
            label="Enter your life story"
            ?grows=${grows}
            ?quiet=${quiet}
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            disabled
            ?grows=${grows}
            ?quiet=${quiet}
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\w\\s]+"
            required
            valid
            value="A valid input"
            ?grows=${grows}
            ?quiet=${quiet}
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            required
            valid
            value="A valid input"
            disabled
            ?grows=${grows}
            ?quiet=${quiet}
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            required
            value="Not a valid input"
            ?grows=${grows}
            ?quiet=${quiet}
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            invalid
            required
            value="Not a valid input"
            disabled
            ?grows=${grows}
            ?quiet=${quiet}
        ></sp-textfield>
    `;
});

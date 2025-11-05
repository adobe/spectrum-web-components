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
import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

export default {
    component: 'sp-textfield',
    title: 'Textarea',
};

export const Default = (): TemplateResult => {
    return html`
        <sp-textfield
            multiline
            label="Enter your life story"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\w\\s]+"
            required
            valid
            value="A valid input"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            required
            valid
            value="A valid input"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            required
            value="Not a valid input"
            placeholder="Enter your life story"
        ></sp-textfield>
        <sp-textfield
            multiline
            label="Enter your life story"
            pattern="[\\d]+"
            invalid
            required
            value="Not a valid input"
            disabled
            placeholder="Enter your life story"
        ></sp-textfield>
    `;
};

export const quiet = (): TemplateResult => html`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        multiline
        id="story"
        quiet
        placeholder="Enter your life story"
    ></sp-textfield>
`;

export const defaultAutofocus = (): TemplateResult => html`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        multiline
        id="story"
        autofocus
        placeholder="Enter your life story"
    ></sp-textfield>
`;

export const quietAutofocus = (): TemplateResult => html`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        multiline
        id="story"
        autofocus
        quiet
        placeholder="Enter your life story"
    ></sp-textfield>
`;

export const grows = (): TemplateResult => html`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        multiline
        id="story"
        value="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        grows
        placeholder="Enter your life story"
    ></sp-textfield>
`;

export const growsQuiet = (): TemplateResult => html`
    <sp-field-label for="story">Enter your life story...</sp-field-label>
    <sp-textfield
        multiline
        id="story"
        value="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
        grows
        quiet
        placeholder="Enter your life story"
    ></sp-textfield>
`;

export const growsEmpty = (): TemplateResult => html`
    <sp-field-label for="empty">
        This textfield hasn't been used yet
    </sp-field-label>
    <sp-textfield multiline id="empty" grows placeholder="You can type here">
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;

export const growsWithLargeWords = (): TemplateResult => html`
    <sp-field-label for="story">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        id="story"
        value="Sed utperspiciatisundeomnisistenatuserrorsitvoluptatemaccusantiumdoloremquelaudantium,totamemaperiam, eaque ipsa quae ab illo inventore veritatis etquasiarchitectobeataevitaedictasuntexplicabo. Nemo enimipsamvoluptatemquiavoluptassitaspernaturautoditautfugitsedquiaconsequunturmagnidoloreseosquirationevoluptatemsequinesciunt."
        grows
        placeholder="Enter your life story"
    ></sp-textfield>
`;

export const readonly = (): TemplateResult => html`
    <sp-textfield
        multiline
        label="Enter your life story"
        value="A readonly textarea"
        readonly
        placeholder="Enter your life story"
    ></sp-textfield>
`;

export const resizeControls = (): TemplateResult => html`
    <sp-textfield
        multiline
        style="resize: none;"
        label="No resize control"
        placeholder="No resize control"
    ></sp-textfield>

    <sp-textfield
        multiline
        style="resize: vertical;"
        label="Vertical resize control"
        placeholder="Vertical resize control"
    ></sp-textfield>

    <sp-textfield
        multiline
        style="resize: horizontal;"
        label="Horizontal resize control"
        placeholder="Horizontal resize control"
    ></sp-textfield>
`;

export const sized = (): TemplateResult => html`
    <sp-field-label for="sized">
        This textfield hasn't been used yet
    </sp-field-label>
    <sp-textfield
        multiline
        id="sized"
        placeholder="You can type here"
        style="width: 400px"
    >
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;

export const with5Rows = (): TemplateResult => html`
    <sp-field-label for="predefinedRows">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        id="predefinedRows"
        value="Line 1
Line 2
Line 3
Line 4
Line 5"
        placeholder="Enter your life story"
        rows="5"
    ></sp-textfield>
`;

export const rowsDefeatsGrows = (): TemplateResult => html`
    <sp-field-label for="predefinedRows">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        grows
        id="predefinedRows"
        value="Line 1
Line 2
Line 3
Line 4
Line 5"
        placeholder="Enter your life story"
        rows="3"
    ></sp-textfield>
`;

export const with1Row = (): TemplateResult => html`
    <sp-field-label for="predefinedRows">
        Enter your life story with very long words...
    </sp-field-label>
    <sp-textfield
        multiline
        id="predefinedRows"
        value="Line 1"
        placeholder="Enter your life story"
        rows="1"
    ></sp-textfield>
`;

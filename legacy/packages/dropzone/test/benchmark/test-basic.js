"use strict";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import { html } from "lit";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
measureFixtureCreation(html`
    <sp-dropzone id="dropzone">
        <sp-illustrated-message heading="Drag and Drop Your File">
            <svg>
                <use xlink:href="geometry.svg#upload_geometry" />
            </svg>
        </sp-illustrated-message>

        <div style="color: grey">
            <div>
                <label for="file-input">
                    <sp-link>Select a File</sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
            </div>
        </div>
    </sp-dropzone>
`);
//# sourceMappingURL=test-basic.js.map

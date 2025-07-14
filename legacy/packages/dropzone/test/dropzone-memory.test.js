"use strict";
import { html } from "@open-wc/testing";
import "@spectrum-web-components/dropzone/sp-dropzone.js";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
testForMemoryLeaks(html`
    <sp-dropzone></sp-dropzone>
`);
//# sourceMappingURL=dropzone-memory.test.js.map

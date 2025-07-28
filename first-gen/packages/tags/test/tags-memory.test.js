"use strict";
import { html } from "@open-wc/testing";
import "@spectrum-web-components/tags/sp-tag.js";
import "@spectrum-web-components/tags/sp-tags.js";
import { testForMemoryLeaks } from "../../../test/testing-helpers.js";
testForMemoryLeaks(html`
    <sp-tags>
        <sp-tag>Tag 1</sp-tag>
        <sp-tag invalid>Tag 2</sp-tag>
        <sp-tag disabled>Tag 3</sp-tag>
    </sp-tags>
`);
//# sourceMappingURL=tags-memory.test.js.map

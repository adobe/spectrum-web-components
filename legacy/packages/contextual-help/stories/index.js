"use strict";
import { html } from "@spectrum-web-components/base";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import { spreadProps } from "../../../test/lit-helpers.js";
import "@spectrum-web-components/link/sp-link.js";
import "../sp-contextual-help.js";
export const ContextualHelpMarkup = (args = {}) => {
  return html`
        <sp-contextual-help
            ${spreadProps(args)}
            placement=${ifDefined(args.placement)}
        >
            <h2 slot="heading">Permission required</h2>
            Your admin must grant you permission before you can create a
            segment.
            <sp-link
                slot="link"
                href="https://opensource.adobe.com/spectrum-web-components/"
            >
                Request permission
            </sp-link>
        </sp-contextual-help>
    `;
};
//# sourceMappingURL=index.js.map

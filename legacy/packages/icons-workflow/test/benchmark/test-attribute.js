"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
const iconset = document.createElement("sp-icons-medium");
document.body.append(iconset);
measureFixtureCreation(html`
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow100"></sp-icon>
`);
//# sourceMappingURL=test-attribute.js.map

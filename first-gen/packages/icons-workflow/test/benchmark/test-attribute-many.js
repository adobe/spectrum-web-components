"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons/sp-icons-medium.js";
import { html } from "@spectrum-web-components/base";
import { measureFixtureCreation } from "../../../../test/benchmark/helpers.js";
const iconset = document.createElement("sp-icons-medium");
document.body.append(iconset);
measureFixtureCreation(html`
    <sp-icon name="ui:Arrow100"></sp-icon>
    <sp-icon name="ui:Arrow200"></sp-icon>
    <sp-icon name="ui:Arrow300"></sp-icon>
    <sp-icon name="ui:Arrow400"></sp-icon>
    <sp-icon name="ui:Arrow500"></sp-icon>
    <sp-icon name="ui:Arrow600"></sp-icon>
    <sp-icon name="ui:Arrow75"></sp-icon>
    <sp-icon name="ui:Asterisk100"></sp-icon>
    <sp-icon name="ui:Asterisk200"></sp-icon>
    <sp-icon name="ui:Asterisk300"></sp-icon>
    <sp-icon name="ui:Asterisk75"></sp-icon>
    <sp-icon name="ui:Checkmark100"></sp-icon>
    <sp-icon name="ui:Checkmark200"></sp-icon>
    <sp-icon name="ui:Checkmark300"></sp-icon>
    <sp-icon name="ui:Checkmark400"></sp-icon>
    <sp-icon name="ui:Checkmark50"></sp-icon>
    <sp-icon name="ui:Checkmark500"></sp-icon>
    <sp-icon name="ui:Checkmark600"></sp-icon>
    <sp-icon name="ui:Checkmark75"></sp-icon>
    <sp-icon name="ui:Chevron100"></sp-icon>
    <sp-icon name="ui:Chevron200"></sp-icon>
    <sp-icon name="ui:Chevron300"></sp-icon>
    <sp-icon name="ui:Chevron400"></sp-icon>
    <sp-icon name="ui:Chevron500"></sp-icon>
    <sp-icon name="ui:Chevron600"></sp-icon>
    <sp-icon name="ui:Chevron75"></sp-icon>
    <sp-icon name="ui:CornerTriangle100"></sp-icon>
    <sp-icon name="ui:CornerTriangle200"></sp-icon>
    <sp-icon name="ui:CornerTriangle300"></sp-icon>
    <sp-icon name="ui:CornerTriangle75"></sp-icon>
    <sp-icon name="ui:Cross100"></sp-icon>
    <sp-icon name="ui:Cross200"></sp-icon>
    <sp-icon name="ui:Cross300"></sp-icon>
    <sp-icon name="ui:Cross400"></sp-icon>
    <sp-icon name="ui:Cross500"></sp-icon>
    <sp-icon name="ui:Cross600"></sp-icon>
`);
//# sourceMappingURL=test-attribute-many.js.map

"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/textfield/sp-textfield.js";
import "@spectrum-web-components/field-label/sp-field-label.js";
import "@spectrum-web-components/help-text/sp-help-text.js";
export default {
  component: "sp-textfield",
  title: "Textfield"
};
export const Default = () => {
  return html`
        <sp-textfield placeholder="Enter your name"></sp-textfield>
        <sp-textfield placeholder="Enter your name" disabled></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="[\\w\\s]*"
            required
            value="A valid input"
        ></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="[\\w\\s]*"
            required
            value="A valid input"
            disabled
        ></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="[\\d]*"
            value="Not a valid input"
        ></sp-textfield>
        <sp-textfield
            placeholder="Enter your name"
            pattern="^[\\d]$"
            required
            value="Not a valid input"
            disabled
        ></sp-textfield>
    `;
};
export const growsOnly = () => {
  return html`
        <sp-field-label for="grows-only">
            This Textfield has the "grows" attribute without the "multiline"
            attribute
        </sp-field-label>
        <sp-textfield
            grows
            id="grows-only"
            placeholder="Does not grow or display incorrectly"
        ></sp-textfield>
    `;
};
export const quiet = () => {
  return html`
        <sp-field-label for="name">Enter your name</sp-field-label>
        <sp-textfield
            id="name"
            placeholder="This Text Field doesn't make much noise"
            quiet
        ></sp-textfield>
    `;
};
export const defaultAutofocus = () => {
  return html`
        <sp-field-label for="name">Enter your name</sp-field-label>
        <sp-textfield
            id="name"
            placeholder="Include your first and last name"
            autofocus
        ></sp-textfield>
    `;
};
export const quietAutofocus = () => {
  return html`
        <sp-field-label for="name">Enter your name</sp-field-label>
        <sp-textfield
            id="name"
            placeholder="Include your first and last name"
            autofocus
            quiet
        ></sp-textfield>
    `;
};
export const notRequiredWithPattern = () => {
  return html`
        <sp-textfield
            placeholder="Enter z, x, c, or v"
            pattern="[zxcv]+"
        ></sp-textfield>
    `;
};
export const allowedKeys = () => {
  return html`
        <sp-textfield
            placeholder="Enter your name"
            allowed-keys="a-z"
        ></sp-textfield>
    `;
};
export const withNameAttribute = () => {
  return html`
        <sp-textfield
            name="name"
            placeholder="Enter your name"
            allowed-keys="a-z"
        ></sp-textfield>
    `;
};
export const readonly = () => html`
    <sp-textfield
        label="Enter your life story"
        value="A readonly textfield"
        readonly
        placeholder="Enter your life story"
    ></sp-textfield>
`;
export const types = () => html`
    <sp-textfield label="Default" placeholder="default (text)"></sp-textfield>
    <sp-textfield label="Text" type="text" placeholder="text"></sp-textfield>
    <sp-textfield label="URL" type="url" placeholder="url"></sp-textfield>
    <sp-textfield label="Tel" type="tel" placeholder="tel"></sp-textfield>
    <sp-textfield
        label="E-Mail"
        type="email"
        placeholder="email"
    ></sp-textfield>
    <sp-textfield
        label="Password"
        type="password"
        placeholder="password"
    ></sp-textfield>
`;
export const empty = () => html`
    <sp-field-label for="empty">
        This textfield hasn't been used yet
    </sp-field-label>
    <sp-textfield id="empty" placeholder="You can type here">
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;
export const sized = () => html`
    <sp-field-label for="sized">
        This textfield hasn't been used yet
    </sp-field-label>
    <sp-textfield
        id="sized"
        placeholder="You can type here"
        style="width: 400px"
    >
        <sp-help-text slot="help-text">
            Even empty Textfield display correctly while waiting for content.
        </sp-help-text>
    </sp-textfield>
`;
//# sourceMappingURL=textfield.stories.js.map

"use strict";
import "@spectrum-web-components/search/sp-search.js";
import { html } from "@spectrum-web-components/base";
export default {
  component: "sp-search",
  title: "Search"
};
export const Default = () => html`
    <sp-search></sp-search>
    <sp-search disabled></sp-search>
`;
export const autofocus = () => html`
    <sp-search autofocus></sp-search>
`;
export const focusedOverflowing = () => html`
    <sp-search
        value="this is a really long search term that overflows the available space"
    ></sp-search>
`;
export const Quiet = () => html`
    <sp-search quiet></sp-search>
    <sp-search quiet disabled></sp-search>
`;
export const holdValueOnEscape = () => html`
    <sp-search holdValueOnEscape></sp-search>
`;
//# sourceMappingURL=search.stories.js.map

"use strict";
import { html } from "@spectrum-web-components/base";
import { spreadProps } from "../../../test/lit-helpers.js";
import { ifDefined } from "@spectrum-web-components/base/src/directives.js";
import "@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js";
import "@spectrum-web-components/breadcrumbs/sp-breadcrumb-item.js";
const dummyOrganizer = [
  "Your stuff",
  "Files",
  "Team",
  "In progress",
  "Trend",
  "Winter",
  "Assets",
  "18x24"
];
export const getBreadcrumbsWithLinks = (count) => {
  const breadcrumbs = [];
  for (let i = 0; i < count; i++) {
    breadcrumbs.push(html`
            <sp-breadcrumb-item href=${window.location.href}>
                ${dummyOrganizer[i] || `Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);
  }
  return breadcrumbs;
};
export const getBreadcrumbs = (count) => {
  const breadcrumbs = [];
  for (let i = 0; i < count; i++) {
    breadcrumbs.push(html`
            <sp-breadcrumb-item value=${i}>
                ${dummyOrganizer[i] || `Breadcrumb ${i}`}
            </sp-breadcrumb-item>
        `);
  }
  return breadcrumbs;
};
export const getResizableStyles = () => {
  return html`
        <style>
            .resizable-container {
                border: 2px solid;
                padding: 20px;
                width: 300px;
                resize: both;
                overflow: auto;
            }
        </style>
    `;
};
export const Template = (args) => html`
    <sp-breadcrumbs
        ${spreadProps(args)}
        max-visible-items=${ifDefined(args["max-visible-items"])}
        @change=${args.onChange}
        ?compact=${args.compact}
    >
        <sp-breadcrumb-item value="0">Your stuff</sp-breadcrumb-item>
        <sp-breadcrumb-item ?disabled=${args.disabled} value="1">
            Files
        </sp-breadcrumb-item>
        <sp-breadcrumb-item value="2">Team</sp-breadcrumb-item>
        <sp-breadcrumb-item value="3">In progress</sp-breadcrumb-item>
    </sp-breadcrumbs>
`;
//# sourceMappingURL=template.js.map

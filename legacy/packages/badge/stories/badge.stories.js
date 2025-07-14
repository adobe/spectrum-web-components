"use strict";
import "@spectrum-web-components/badge/sp-badge.js";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js";
export default {
  title: "Badge",
  component: "sp-badge"
};
export const Default = () => {
  return html`
        <sp-badge>Badge</sp-badge>
    `;
};
export const Icons = () => {
  return html`
        <sp-badge>No icon</sp-badge>

        <sp-badge>
            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
            Icon and label
        </sp-badge>

        <sp-badge>
            <sp-icon-checkmark-circle slot="icon"></sp-icon-checkmark-circle>
        </sp-badge>
    `;
};
export const Sizes = () => {
  return html`
        <div style="display: flex; align-items: center; gap: 8px;">
            <sp-badge size="s">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Small
            </sp-badge>
            <sp-badge size="m">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Medium
            </sp-badge>
            <sp-badge size="l">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Large
            </sp-badge>
            <sp-badge size="xl">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                Extra-large
            </sp-badge>
            <sp-badge style="max-width: 180px">
                <sp-icon-checkmark-circle
                    slot="icon"
                ></sp-icon-checkmark-circle>
                This long content automatically wraps, but shows no more than
                two lines
            </sp-badge>
        </div>
    `;
};
export const Semantic = () => {
  return html`
        <sp-badge variant="accent">Accent</sp-badge>
        <sp-badge variant="positive">Positive</sp-badge>
        <sp-badge variant="informative">Informative</sp-badge>
        <sp-badge variant="negative">Negative</sp-badge>
        <sp-badge variant="neutral">Neutral</sp-badge>
        <sp-badge variant="notice">Notice</sp-badge>
    `;
};
export const NonSemantic = () => {
  return html`
        <sp-badge variant="seafoam">Seafoam</sp-badge>
        <sp-badge variant="indigo">Indigo</sp-badge>
        <sp-badge variant="purple">Purple</sp-badge>
        <sp-badge variant="fuchsia">Fuchsia</sp-badge>
        <sp-badge variant="magenta">Magenta</sp-badge>
        <sp-badge variant="yellow">Yellow</sp-badge>
        <sp-badge variant="gray">Gray</sp-badge>
        <sp-badge variant="red">Red</sp-badge>
        <sp-badge variant="orange">Orange</sp-badge>
        <sp-badge variant="chartreuse">Chartreuse</sp-badge>
        <sp-badge variant="celery">Celery</sp-badge>
        <sp-badge variant="green">Green</sp-badge>
        <sp-badge variant="cyan">Cyan</sp-badge>
        <sp-badge variant="blue">Blue</sp-badge>
    `;
};
export const Inline = () => {
  return html`
        Badge is a simple
        <sp-badge variant="positive" size="s">inline</sp-badge>
        element that should
        <sp-badge variant="neutral" size="s">flow</sp-badge>
        with the rest of the page:
        <sp-badge variant="negative">Missing</sp-badge>
        <sp-badge variant="positive">Successful</sp-badge>
        <sp-badge variant="accent">Accent</sp-badge>
    `;
};
export const Fixed = () => {
  return html`
        <div
            style="position: relative; width: 400px; height: 200px; background: #eee"
        >
            <sp-badge>None</sp-badge>
            <sp-badge
                fixed="block-start"
                style="position: absolute; top: 0; left: 200px;"
            >
                block-start
            </sp-badge>
            <sp-badge
                fixed="inline-end"
                style="position: absolute; right: 0; top: 100px;"
            >
                inline-end
            </sp-badge>
            <sp-badge
                fixed="block-end"
                style="position: absolute; bottom: 0; left: 200px;"
            >
                block-end
            </sp-badge>
            <sp-badge
                fixed="inline-start"
                style="position: absolute; left: 0; top: 100px;"
            >
                inline-start
            </sp-badge>
        </div>
    `;
};
//# sourceMappingURL=badge.stories.js.map

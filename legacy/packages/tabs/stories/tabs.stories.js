"use strict";
import "@spectrum-web-components/icon/sp-icon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import "@spectrum-web-components/tabs/sp-tabs.js";
import "@spectrum-web-components/tabs/sp-tab.js";
import "@spectrum-web-components/tabs/sp-tab-panel.js";
import { html } from "@spectrum-web-components/base";
export default {
  component: "sp-tabs",
  title: "Tabs",
  argTypes: {
    direction: {
      name: "direction",
      type: { name: "string", required: false },
      description: "The direction of the Tabs element",
      table: {
        type: {
          summary: '"vertical" | "vertical-right" | "horizontal"'
        },
        defaultValue: { summary: "horizontal" }
      },
      control: {
        type: "text"
      }
    },
    verticalTab: { control: "boolean" },
    auto: { control: "boolean" }
  },
  args: {
    direction: "horizontal",
    type: false,
    verticalTab: false,
    auto: false
  }
};
const panels = () => html`
    <sp-tab-panel value="1">Content for "Really Long Name"</sp-tab-panel>
    <sp-tab-panel value="2">Content for tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for tab 4</sp-tab-panel>
`;
export const Default = (args) => {
  return html`
        <style>
            sp-tabs {
                display: grid;
                grid-template-columns: 100%;
            }
            sp-tab-panel {
                grid-area: 2/1/2/1;
                transition: opacity var(--spectrum-animation-duration-300)
                        ease-in-out,
                    transform var(--spectrum-animation-duration-300) ease-in-out;
            }
            sp-tab-panel:not([selected]) {
                display: unset;
                opacity: 0;
                height: 0;
                pointer-events: none;
                transform: translateY(calc(var(--swc-scale-factor) * 6px));
                transition: opacity var(--spectrum-animation-duration-300)
                        ease-in-out,
                    transform var(--spectrum-animation-duration-300) ease-in-out,
                    height 0s ease var(--spectrum-animation-duration-300);
            }
        </style>
        <sp-tabs
            selected="1"
            ?auto=${args.auto}
            label="Demo Tabs"
            direction=${args.direction}
        >
            <sp-tab value="2">Tab 2</sp-tab>
            <sp-tab value="3">Tab 3</sp-tab>
            <sp-tab value="4">Tab 4</sp-tab>
            <sp-tab value="1" selected>Really Long Name</sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const Autofocus = (args) => {
  return html`
        <sp-tabs
            selected="1"
            autofocus
            ?auto=${args.auto}
            label="Demo Tabs"
            direction=${args.direction}
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const disabledTabs = (args) => {
  return html`
        <sp-tabs
            selected="1"
            disabled
            ?auto=${args.auto}
            label="Disabled Tabs"
            direction=${args.direction}
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const disabledTab = (args) => {
  return html`
        <sp-tabs
            selected="1"
            ?auto=${args.auto}
            label="Disabled Tab"
            direction=${args.direction}
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2" disabled></sp-tab>
            <sp-tab label="Tab 3" value="3" disabled></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const emphasized = (args) => {
  return html`
        <sp-tabs selected="1" emphasized ?auto=${args.auto} label="Demo Tabs">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const emphasizedQuiet = (args) => {
  return html`
        <style>
            sp-tabs {
                display: grid;
                grid-template-columns: 100%;
            }
        </style>
        <sp-tabs
            selected="1"
            emphasized
            quiet
            ?auto=${args.auto}
            label="Demo Tabs"
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const Vertical = (args) => {
  return html`
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
Vertical.args = {
  direction: "vertical"
};
export const verticalQuiet = (args) => {
  return html`
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
            quiet
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
verticalQuiet.args = {
  direction: "vertical"
};
export const verticalEmphasizedQuiet = (args) => {
  return html`
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
            quiet
            emphasized
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
verticalEmphasizedQuiet.args = {
  direction: "vertical"
};
export const verticalCompact = (args) => {
  return html`
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
            compact
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
verticalCompact.args = {
  direction: "vertical"
};
export const verticalQuietCompact = (args) => {
  return html`
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
            quiet
            compact
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
verticalQuietCompact.args = {
  direction: "vertical"
};
export const VerticalSized = (args) => {
  return html`
        <style>
            sp-tabs {
                display: grid;
                height: 75vh;
                --swc-tabs-list-justify-content: center;
            }
        </style>
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
VerticalSized.args = {
  direction: "vertical"
};
export const VerticalRight = (args) => {
  return html`
        <style>
            sp-tabs {
                height: 75vh;
                --swc-tabs-list-justify-content: center;
            }
        </style>
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
VerticalRight.args = {
  direction: "vertical-right"
};
export const Icons = ({
  direction,
  verticalTab,
  auto
}) => {
  return html`
        <sp-tabs selected="1" direction=${direction} ?auto=${auto}>
            <sp-tab label="Tab 1" value="1" ?vertical=${verticalTab}>
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab label="Tab 2" value="2" ?vertical=${verticalTab}>
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab label="Tab 3" value="3" ?vertical=${verticalTab}>
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab label="Tab 4" value="4" ?vertical=${verticalTab}>
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const IconsWithSlottedLabel = ({
  direction,
  verticalTab,
  auto
}) => {
  return html`
        <sp-tabs selected="1" direction=${direction} ?auto=${auto}>
            <sp-tab value="1" ?vertical=${verticalTab}>
                Tab 1
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab value="2" ?vertical=${verticalTab}>
                Tab 2
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab value="3" ?vertical=${verticalTab}>
                Tab 3
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab value="4" ?vertical=${verticalTab}>
                Tab 4
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const IconsOnly = ({
  direction,
  verticalTab,
  auto
}) => {
  return html`
        <sp-tabs selected="1" direction=${direction} ?auto=${auto}>
            <sp-tab aria-label="Tab 1" value="1" ?vertical=${verticalTab}>
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab aria-label="Tab 2" value="2" ?vertical=${verticalTab}>
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab aria-label="Tab 3" value="3" ?vertical=${verticalTab}>
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab aria-label="Tab 4" value="4" ?vertical=${verticalTab}>
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const iconsIi = (args) => {
  return html`
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
        >
            <sp-tab label="Tab 1" value="1" vertical>
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab label="Tab 2" value="2" vertical>
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab label="Tab 3" value="3" vertical>
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab label="Tab 4" value="4" vertical>
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
iconsIi.args = {
  direction: "vertical"
};
iconsIi.storyName = "Icons II";
export const iconsIii = (args) => {
  return html`
        <sp-tabs
            selected="1"
            direction=${args.direction}
            ?auto=${args.auto}
            label="Demo Tabs"
        >
            <sp-tab label="Tab 1" value="1">
                <sp-icon-checkmark slot="icon"></sp-icon-checkmark>
            </sp-tab>
            <sp-tab label="Tab 2" value="2">
                <sp-icon-close slot="icon"></sp-icon-close>
            </sp-tab>
            <sp-tab label="Tab 3" value="3">
                <sp-icon-chevron-down slot="icon"></sp-icon-chevron-down>
            </sp-tab>
            <sp-tab label="Tab 4" value="4">
                <sp-icon-help slot="icon"></sp-icon-help>
            </sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
iconsIii.args = {
  direction: "vertical"
};
iconsIii.storyName = "Icons III";
export const Quiet = ({ direction, auto }) => {
  return html`
        <style>
            sp-tabs {
                display: grid;
                grid-template-columns: 100%;
            }
        </style>
        <sp-tabs selected="1" quiet direction=${direction} ?auto=${auto}>
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const Compact = ({ direction, auto }) => {
  return html`
        <sp-tabs selected="1" compact direction=${direction} ?auto=${auto}>
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
export const quietCompact = ({
  direction,
  auto
}) => {
  return html`
        <style>
            sp-tabs {
                display: grid;
                grid-template-columns: 100%;
            }
        </style>
        <sp-tabs
            selected="1"
            quiet
            compact
            direction=${direction}
            ?auto=${auto}
        >
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
quietCompact.storyName = "Quiet Compact";
//# sourceMappingURL=tabs.stories.js.map

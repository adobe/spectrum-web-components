import './sp-icon-38633c83.js';
import './sp-icon-checkmark-d09c2329.js';
import './sp-icon-chevron-down-50786964.js';
import './sp-icon-help-d701da7b.js';
import './sp-tab-panel-d09734cd.js';
import { x } from './lit-html-126adc72.js';
import './IconBase-d00b1a4e.js';
import './lit-element-9354aa77.js';
import './define-element-e64f5ea4.js';
import './if-defined-ae83b405.js';
import './query-d0113d5a.js';
import './base-511c8c11.js';
import './Checkmark-87ba3c87.js';
import './custom-tag-b5526d41.js';
import './ChevronDown-8a6d0720.js';
import './Help-10c43472.js';
import './tab.css-2694ea48.js';
import './resize-controller-55608b66.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './sizedMixin-43fe982f.js';
import './focusable-6cc2c3b2.js';
import './focus-visible-03398d98.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './observe-slot-text-16ab7d67.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-b8bfe193.js';
import './observe-slot-presence-ae37a9bc.js';

var tabs_stories = {
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
const panels = () => x`
    <sp-tab-panel value="1">Content for "Really Long Name"</sp-tab-panel>
    <sp-tab-panel value="2">Content for tab 2</sp-tab-panel>
    <sp-tab-panel value="3">Content for tab 3</sp-tab-panel>
    <sp-tab-panel value="4">Content for tab 4</sp-tab-panel>
`;
const Default = (args) => {
  return x`
        <style>
            sp-tabs {
                display: grid;
                grid-template-columns: 100%;
            }
            sp-tab-panel {
                grid-area: 2/1/2/1;
                transition: opacity
                        var(--spectrum-global-animation-duration-300)
                        ease-in-out,
                    transform var(--spectrum-global-animation-duration-300)
                        ease-in-out;
            }
            sp-tab-panel:not([selected]) {
                display: unset;
                opacity: 0;
                height: 0;
                pointer-events: none;
                transform: translateY(
                    var(
                        --spectrum-dropdown-flyout-menu-offset-y,
                        var(--spectrum-global-dimension-size-75)
                    )
                );
                transition: opacity
                        var(--spectrum-global-animation-duration-300)
                        ease-in-out,
                    transform var(--spectrum-global-animation-duration-300)
                        ease-in-out,
                    height 0s ease var(--spectrum-global-animation-duration-300);
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
const Autofocus = (args) => {
  return x`
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
const disabledTabs = (args) => {
  return x`
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
const disabledTab = (args) => {
  return x`
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
const emphasized = (args) => {
  return x`
        <sp-tabs selected="1" emphasized ?auto=${args.auto} label="Demo Tabs">
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
const emphasizedQuiet = (args) => {
  return x`
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
const Vertical = (args) => {
  return x`
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
const verticalQuiet = (args) => {
  return x`
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
const verticalEmphasizedQuiet = (args) => {
  return x`
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
const verticalCompact = (args) => {
  return x`
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
const verticalQuietCompact = (args) => {
  return x`
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
const VerticalSized = (args) => {
  return x`
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
const VerticalRight = (args) => {
  return x`
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
const Icons = ({
  direction,
  verticalTab,
  auto
}) => {
  return x`
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
const IconsWithSlottedLabel = ({
  direction,
  verticalTab,
  auto
}) => {
  return x`
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
const IconsOnly = ({
  direction,
  verticalTab,
  auto
}) => {
  return x`
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
const iconsIi = (args) => {
  return x`
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
const iconsIii = (args) => {
  return x`
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
const Quiet = ({ direction, auto }) => {
  return x`
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
const Compact = ({ direction, auto }) => {
  return x`
        <sp-tabs selected="1" compact direction=${direction} ?auto=${auto}>
            <sp-tab label="Tab 1" value="1"></sp-tab>
            <sp-tab label="Tab 2" value="2"></sp-tab>
            <sp-tab label="Tab 3" value="3"></sp-tab>
            <sp-tab label="Tab 4" value="4"></sp-tab>
            ${panels()}
        </sp-tabs>
    `;
};
const quietCompact = ({
  direction,
  auto
}) => {
  return x`
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
const __namedExportsOrder = ['Default', 'Autofocus', 'disabledTabs', 'disabledTab', 'emphasized', 'emphasizedQuiet', 'Vertical', 'verticalQuiet', 'verticalEmphasizedQuiet', 'verticalCompact', 'verticalQuietCompact', 'VerticalSized', 'VerticalRight', 'Icons', 'IconsWithSlottedLabel', 'IconsOnly', 'iconsIi', 'iconsIii', 'Quiet', 'Compact', 'quietCompact'];

export { Autofocus, Compact, Default, Icons, IconsOnly, IconsWithSlottedLabel, Quiet, Vertical, VerticalRight, VerticalSized, __namedExportsOrder, tabs_stories as default, disabledTab, disabledTabs, emphasized, emphasizedQuiet, iconsIi, iconsIii, quietCompact, verticalCompact, verticalEmphasizedQuiet, verticalQuiet, verticalQuietCompact };

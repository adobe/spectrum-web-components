import './sp-icon-DHw3q-p5.js';
import './sp-icon-checkmark-Du0cKYB0.js';
import './sp-icon-chevron-down-Dies57Og.js';
import './sp-icon-help-D-wmkzPP.js';
import './sp-tab-panel-BJzcOGRm.js';
import { x } from './lit-html-COgVUehj.js';
import './IconBase-BC0FCRBc.js';
import './lit-element-BulMEkr1.js';
import './state-ChcedIDn.js';
import './define-element-2VgsDjbW.js';
import './if-defined-DDJGFaN4.js';
import './query-DQF6X5qW.js';
import './base-u8Z1Hrsd.js';
import './custom-tag-Diwq7nXX.js';
import './Checkmark-D8WZ4StE.js';
import './ChevronDown-s8uTipb9.js';
import './Help-DwXA_pCu.js';
import './tab.css-Dh6IU813.js';
import './resize-controller-BJKfu6ft.js';
import './RovingTabindex-BIFuw_W7.js';
import './FocusGroup-CQTGJWkN.js';
import './sizedMixin-D4VoaNlz.js';
import './focusable-D81tHnNY.js';
import './focus-visible-D29Av9Xb.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './mutation-controller-D2lT1xZk.js';
import './observe-slot-text-Mz9mFVuX.js';
import './query-assigned-nodes-DAYI4epk.js';
import './random-id-BST1Puzz.js';

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

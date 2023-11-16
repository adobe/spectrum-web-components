import './sp-action-menu-4c215dfc.js';
import './sp-menu-2e53fd90.js';
import './sp-menu-item-578cf3df.js';
import './sp-menu-group-2ff35224.js';
import './sp-menu-divider-8cad1a78.js';
import './sp-tooltip-0a1fc8b5.js';
import { A as ActionMenuMarkup } from './index-121a5e9c.js';
import { m as makeOverBackground } from './index-53a75a80.js';
import './sp-icon-settings-17668eb4.js';
import { x } from './lit-html-126adc72.js';
import './sp-action-button-77300bea.js';
import './lit-element-9354aa77.js';
import './sp-icon-corner-triangle300-d126a472.js';
import './CornerTriangle300-488cc3d0.js';
import './custom-tag-c228386e.js';
import './IconBase-d9572ad8.js';
import './define-element-617dba69.js';
import './ButtonBase-f782d237.js';
import './like-anchor-86192240.js';
import './if-defined-ae83b405.js';
import './focusable-c7e64029.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-03ae7746.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-c8b87639.js';
import './base-511c8c11.js';
import './sizedMixin-29c62bc2.js';
import './query-d0113d5a.js';
import './observe-slot-presence-ae37a9bc.js';
import './sp-icon-more-04da5606.js';
import './More-78935819.js';
import './custom-tag-b5526d41.js';
import './Picker-2a08fe09.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './sp-icon-chevron100-b4103ec6.js';
import './Chevron100-6f55b923.js';
import './sp-icon-alert-4033bfea.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './directive-2bb7789e.js';
import './style-map-156e3c36.js';
import './state-59f591cf.js';
import './spectrum-icon-checkmark.css-a8f99d4c.js';
import './divider.css-d14b5633.js';
import './focusable-selectors-252ae36e.js';
import './sp-icon-8061244b.js';
import './sp-button-b85e30a6.js';
import './sp-icon-help-038cfed3.js';
import './Help-10c43472.js';
import './Settings-ea0a470e.js';

var actionMenu_stories = {
  component: "sp-action-menu",
  title: "Action menu",
  argTypes: {
    disabled: {
      name: "disabled",
      type: { name: "boolean", required: false },
      description: "Disable this control. It will not receive focus or events.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the menu is open or not.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: "boolean"
    },
    visibleLabel: {
      name: "Visible Label",
      description: "The placeholder content for the picker.",
      type: { name: "string", required: false },
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      },
      control: "text"
    },
    tooltipDescription: {
      name: "Tooltip Description",
      type: { name: "string", required: false },
      description: "Tooltip description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" }
      },
      control: {
        type: "text"
      }
    },
    tooltipPlacement: {
      name: "Tooltip Placement",
      type: { name: "string", required: false },
      description: "Tooltip Placement.",
      table: {
        defaultValue: { summary: "bottom" }
      },
      control: {
        options: [
          "auto",
          "auto-start",
          "auto-end",
          "top",
          "bottom",
          "right",
          "left",
          "top-start",
          "top-end",
          "bottom-start",
          "bottom-end",
          "right-start",
          "right-end",
          "left-start",
          "left-end",
          "none"
        ],
        type: "select"
      }
    },
    quiet: {
      name: "quiet",
      type: { name: "boolean", required: false },
      description: "Quiet rendering",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    staticValue: {
      name: "static",
      type: { name: "string", required: false },
      description: "The visual static variant to apply to the button.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "none" }
      },
      control: {
        type: "select",
        labels: {
          white: "white",
          black: "black",
          none: void 0
        },
        options: ["white", "black", "none"]
      }
    }
  },
  args: {
    visibleLabel: "More Actions",
    disabled: false,
    open: false,
    quiet: false,
    tooltipDescription: "",
    tooltipPlacement: "bottom",
    static: void 0
  }
};
const Template = (args = {}) => ActionMenuMarkup(args);
const Default = (args = {}) => Template(args);
const staticWhite = (args = {}) => Template(args);
staticWhite.args = {
  staticValue: "white"
};
staticWhite.decorators = [makeOverBackground()];
const staticBlack = (args = {}) => Template(args);
staticBlack.args = {
  staticValue: "black"
};
staticBlack.decorators = [makeOverBackground()];
const quiet = (args = {}) => Template(args);
quiet.args = {
  quiet: true
};
const labelOnly = ({
  changeHandler = () => void 0,
  disabled = false,
  open = false,
  size = "m",
  selects: selects2 = "",
  selected = false
} = {}) => x`
    <sp-action-menu
        ?disabled=${disabled}
        ?open=${open}
        size=${size}
        @change=${(event) => {
  navigator.clipboard.writeText(event.target.value);
  changeHandler(event);
}}
        .selects=${selects2 ? selects2 : void 0}
        value=${selected ? "Select Inverse" : ""}
    >
        <span slot="label-only">Label Only</span>
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>
        <sp-menu-item>Feather...</sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    </sp-action-menu>
`;
const selects = (args = {}) => Template({
  ...args,
  selects: "single",
  selected: true
});
selects.args = {
  open: true
};
const iconOnly = (args = {}) => Template(args);
iconOnly.args = {
  visibleLabel: ""
};
const tooltipDescriptionAndPlacement = (args = {}) => Template(args);
tooltipDescriptionAndPlacement.args = {
  tooltipDescription: "Your tooltip string here",
  visibleLabel: "",
  tooltipPlacement: "bottom"
};
const customIcon = (args) => Template(args);
customIcon.args = {
  customIcon: x`
        <sp-icon-settings slot="icon"></sp-icon-settings>
    `,
  visibleLabel: ""
};
const submenu = () => {
  return x`
        <sp-action-menu label="More Actions">
            <sp-menu-item>One</sp-menu-item>
            <sp-menu-item>Two</sp-menu-item>
            <sp-menu-item>
                Select some items
                <sp-menu slot="submenu" selects="multiple">
                    <sp-menu-item>A</sp-menu-item>
                    <sp-menu-item selected>B</sp-menu-item>
                    <sp-menu-item>C</sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
    `;
};
const controlled = () => {
  const state = {
    snap: true,
    grid: false,
    guides: true,
    latestChange: ""
  };
  function toggle(prop) {
    return (event) => {
      const item = event.target;
      state[prop] = !state[prop];
      item.selected = state[prop];
    };
  }
  function onChange(event) {
    state.latestChange = event.target.value;
    logState();
  }
  function logState() {
    document.getElementById(
      "state-json"
    ).textContent = `application state: ${JSON.stringify(state)}`;
  }
  return x`
        <sp-action-menu label="View" @change=${onChange}>
            <sp-menu-item value="action" @click=${() => alert("action")}>
                Non-selectable action
            </sp-menu-item>
            <sp-menu-item
                value="snap"
                ?selected=${state.snap}
                @click=${toggle("snap")}
            >
                Snap
            </sp-menu-item>
            <sp-menu-item>
                Show
                <sp-menu
                    slot="submenu"
                    selects="multiple"
                    @change=${(event) => event.preventDefault()}
                >
                    <sp-menu-item
                        value="grid"
                        ?selected=${state.grid}
                        @click=${toggle("grid")}
                    >
                        Grid
                    </sp-menu-item>
                    <sp-menu-item
                        value="guides"
                        ?selected=${state.guides}
                        @click=${toggle("guides")}
                    >
                        Guides
                    </sp-menu-item>
                </sp-menu>
            </sp-menu-item>
        </sp-action-menu>
        <span id="state-json"></span>
    `;
};
const groups = () => x`
    <sp-action-menu open>
        <sp-menu-group id="cms">
            <span slot="header">cms</span>
            <sp-menu-item value="updateAllSiteContent">
                Update All Content
            </sp-menu-item>
            <sp-menu-item value="refreshAllXDs">Refresh All XDs</sp-menu-item>
        </sp-menu-group>
        <sp-menu-group id="ssg">
            <span slot="header">ssg</span>
            <sp-menu-item value="clearCache">Clear Cache</sp-menu-item>
        </sp-menu-group>
        <sp-menu-group id="vrt">
            <span slot="header">vrt</span>
            <sp-menu-item value="vrt-contributions">Contributions</sp-menu-item>
            <sp-menu-item value="vrt-internal">Internal</sp-menu-item>
            <sp-menu-item value="vrt-public">Public</sp-menu-item>
            <sp-menu-item value="vrt-patterns">Patterns</sp-menu-item>
            <sp-menu-item value="vrt">All</sp-menu-item>
        </sp-menu-group>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-group id="misc">
            <sp-menu-item value="logout">Logout</sp-menu-item>
        </sp-menu-group>
    </sp-action-menu>
`;
const __namedExportsOrder = ['Default', 'staticWhite', 'staticBlack', 'quiet', 'labelOnly', 'selects', 'iconOnly', 'tooltipDescriptionAndPlacement', 'customIcon', 'submenu', 'controlled', 'groups'];

export { Default, __namedExportsOrder, controlled, customIcon, actionMenu_stories as default, groups, iconOnly, labelOnly, quiet, selects, staticBlack, staticWhite, submenu, tooltipDescriptionAndPlacement };

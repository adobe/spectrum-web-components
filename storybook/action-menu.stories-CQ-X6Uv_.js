import './sp-action-menu-CLMosuoO.js';
import './sp-menu-NoHhz2Bv.js';
import './sp-menu-item-CWWLaX2f.js';
import './sp-menu-group-DhhsrCdH.js';
import './sp-menu-divider-DCLO5iB5.js';
import './sp-tooltip-CeUXLYQg.js';
import { s as slottableRequest } from './slottable-request-directive-KFtRYWgP.js';
import { A as ActionMenuMarkup } from './index-cDvXFPZQ.js';
import { m as makeOverBackground } from './index-BXtPlHii.js';
import { i as isOverlayOpen } from './index-DY1O5Zi9.js';
import './sp-icon-settings-CvbmSwwW.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-action-button-goT3a6ga.js';
import './lit-element-BL-po2DW.js';
import './sp-icon-corner-triangle300-DLHcMdbF.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-C8frIgMv.js';
import './define-element-Cg7S_Nvo.js';
import './ButtonBase-DQebF_98.js';
import './like-anchor-DX5I66Td.js';
import './focusable-C5h4CSZb.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Dl5hWaOm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-sqnytUIU.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-icon-more-x3XDjgpq.js';
import './More-C2yzfCOG.js';
import './custom-tag-Diwq7nXX.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-yMC2iBEr.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-DxxQHHup.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-alert-ENkod3pK.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './state-CK9f3Zm-.js';
import './when-DEJm_QN9.js';
import './spectrum-icon-checkmark.css-BE42-QMN.js';
import './random-id-BST1Puzz.js';
import './divider.css-Y7Qapv-N.js';
import './focusable-selectors-CUZEb4r9.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './sp-icon-R1TCc8mN.js';
import './sp-button-BKAPrKbL.js';
import './sp-icon-help-Cg_fYhcw.js';
import './Help-BVQBuYxu.js';
import './Settings-yr5sbexZ.js';

var actionMenu_stories = {
  component: "sp-action-menu",
  title: "Action menu",
  argTypes: {
    onChange: { action: "change" },
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
    },
    align: {
      name: "align",
      type: { name: "string", required: false },
      description: "Alignment of the Action Menu",
      table: {
        defaultValue: { summary: "start" }
      },
      control: {
        type: "select",
        labels: {
          start: "start",
          end: "end"
        }
      },
      options: ["start", "end"]
    }
  },
  args: {
    align: "start",
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
  align = "start",
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
        style=${o(align === "end" ? "float: inline-end;" : void 0)}
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
selects.decorators = [isOverlayOpen];
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
const submenu = ({ align = "start" } = {}) => {
  return x`
        <sp-action-menu
            label="More Actions"
            style=${o(
    align === "end" ? "float: inline-end;" : void 0
  )}
        >
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
const controlled = ({ align = "start" } = {}) => {
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
    document.getElementById("state-json").textContent = `application state: ${JSON.stringify(state)}`;
  }
  return x`
        <sp-action-menu
            label="View"
            @change=${onChange}
            style=${o(
    align === "end" ? "float: inline-end;" : void 0
  )}
        >
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
const groups = ({
  align = "start",
  onChange
}) => x`
    <sp-action-menu
        @change=${({ target: { value } }) => onChange(value)}
        open
        style=${o(align === "end" ? "float: inline-end;" : void 0)}
    >
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
groups.decorators = [isOverlayOpen];
const groupsWithSelects = ({
  onChange
}) => {
  return x`
        <sp-action-menu
            @change=${({ target: { value } }) => onChange(value)}
            label="Filter or Sort"
        >
            <sp-menu-group selects="single">
                <span slot="header">Sort By</span>
                <sp-menu-item>Name</sp-menu-item>
                <sp-menu-item>Created</sp-menu-item>
                <sp-menu-item>Modified</sp-menu-item>
            </sp-menu-group>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-group selects="multiple">
                <sp-menu-item>Reverse Order</sp-menu-item>
            </sp-menu-group>
        </sp-action-menu>
    `;
};
groupsWithSelects.swc_vrt = {
  skip: true
};
const directive = () => {
  const renderSubmenu = () => x`
        <sp-menu-item>Submenu Item 1</sp-menu-item>
        <sp-menu-item>Submenu Item 2</sp-menu-item>
        <sp-menu-item>Submenu Item 3</sp-menu-item>
        <sp-menu-item>Submenu Item 4</sp-menu-item>
    `;
  const renderOptions = () => x`
        <sp-menu-item>Deselect</sp-menu-item>
        <sp-menu-item>Select Inverse</sp-menu-item>
        <sp-menu-item>
            Feather...
            <sp-menu
                slot="submenu"
                ${slottableRequest(renderSubmenu)}
            ></sp-menu>
        </sp-menu-item>
        <sp-menu-item>Select and Mask...</sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item>Save Selection</sp-menu-item>
        <sp-menu-item disabled>Make Work Path</sp-menu-item>
    `;
  return x`
        <sp-action-menu ${slottableRequest(renderOptions)}>
            <span slot="label">
                Select a Country with a very long label, too long in fact
            </span>
        </sp-action-menu>
    `;
};
directive.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['Default', 'staticWhite', 'staticBlack', 'quiet', 'labelOnly', 'selects', 'iconOnly', 'tooltipDescriptionAndPlacement', 'customIcon', 'submenu', 'controlled', 'groups', 'groupsWithSelects', 'directive'];

export { Default, __namedExportsOrder, controlled, customIcon, actionMenu_stories as default, directive, groups, groupsWithSelects, iconOnly, labelOnly, quiet, selects, staticBlack, staticWhite, submenu, tooltipDescriptionAndPlacement };

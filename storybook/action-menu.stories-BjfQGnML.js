import './sp-action-menu-D53JT_ig.js';
import './sp-menu-divider-Lgd4v3Zk.js';
import './sp-menu-group-Qa8njTXg.js';
import './sp-menu-item-lWzihiU5.js';
import './sp-menu-DLS2qTtM.js';
import { s as slottableRequest } from './slottable-request-directive-BvrOiskA.js';
import './sp-tooltip-vBnzseXL.js';
import { m as makeOverBackground } from './index-Cly4X37w.js';
import { i as isOverlayOpen } from './index-lhoNpeV0.js';
import { A as ActionMenuMarkup } from './index-CDWPAlOh.js';
import './sp-icon-settings-BK2xqv4h.js';
import { x } from './lit-html-COgVUehj.js';
import { o } from './if-defined-DDJGFaN4.js';
import './sp-action-button-C4sd6SlC.js';
import './lit-element-BulMEkr1.js';
import './sp-icon-corner-triangle300-D56ofuvE.js';
import './custom-tag-B5IH9PTE.js';
import './CornerTriangle300-B0AKm-jy.js';
import './IconBase-XNwB0O-B.js';
import './state-Cl59WR3S.js';
import './define-element-C4UuMSqY.js';
import './ButtonBase-vQ52yrzS.js';
import './like-anchor-BMTFbWfx.js';
import './focusable-0UaXYqOQ.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-Bj4_fBJm.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-DUWGHsWj.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-icon-more-e_KudOoz.js';
import './custom-tag-Diwq7nXX.js';
import './More-D5VvzTyj.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-CW_Vwg7Z.js';
import './spectrum-icon-chevron.css-CeYia-Jd.js';
import './sp-icon-chevron100-BOrsj08X.js';
import './Chevron100-OyV1wQMZ.js';
import './sp-icon-alert-DVg_HKM-.js';
import './MatchMedia-SZ42m4IA.js';
import './DependencyManger-Dpkh1Bse.js';
import './PendingState-Dn01Sbyv.js';
import './get-label-from-slot-Cg6mfN40.js';
import './platform-r3Lf9REX.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './divider.css-B4Y_licH.js';
import './random-id-BST1Puzz.js';
import './spectrum-icon-checkmark.css-CUMq8Erd.js';
import './RovingTabindex-Bozun0RY.js';
import './FocusGroup-VP8jhztA.js';
import './async-directive-DF6rMZJ5.js';
import './directive-helpers-icdnqxxc.js';
import './focusable-selectors-CUZEb4r9.js';
import './sp-button-DPZvBYiQ.js';
import './sp-icon-CfAg73k4.js';
import './sp-icon-help-C4oOiEkV.js';
import './Help-DwXA_pCu.js';
import './Settings-CixAMf6J.js';

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
    staticColorValue: {
      name: "static-color",
      type: { name: "string", required: false },
      description: "The visual static color variant to apply to the button.",
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
    forcePopover: false,
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
const forcePopoverOnMobile = () => x`
    <div style="padding: 40px">
        <h1>Force Popover on Mobile</h1>
        <p>
            The force-popover attribute overrides the mobile device
            functionality of rendering a tray so that a popover will always
            render no matter the device.
        </p>
        <ol>
            <li>Open Chrome DevTools (or equivalent).</li>
            <li>Toggle the Device Toolbar (the phone/tablet icon).</li>
            <li>Select a device preset (e.g. iPhone 12).</li>
            <li>
                Chrome will set user-agent strings, simulate touch, and adjust
                DPI.
            </li>
            <li>Reload the page</li>
            <li>Click the Action Menu and see a popover</li>
        </ol>
        <sp-action-menu force-popover>
            <span slot="icon">
                <sp-icon-settings></sp-icon-settings>
            </span>
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
        </sp-action-menu>
    </div>
`;
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
        id="groups"
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
groupsWithSelects.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
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
directive.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true }
};
const withScrollEvent = () => {
  function handleActionMenuScroll() {
    console.log("attached action menu scroll listener");
  }
  function renderMenuItems() {
    return Array.from(
      { length: 30 },
      (_, i) => x`
                <sp-menu-item style="width: 100%;">
                    This is an Action Menu Item ${i + 1}
                </sp-menu-item>
            `
    );
  }
  return x`
        <sp-action-menu @scroll=${handleActionMenuScroll} open>
            <span slot="label">This is an Action Menu</span>
            ${renderMenuItems()}
        </sp-action-menu>
    `;
};
withScrollEvent.parameters = {
  chromatic: { disableSnapshot: true }
};
const MenuItemAlerts = () => x`
    <sp-action-menu size="m">
        <span slot="label">More Actions</span>
        <sp-menu-item @click=${() => alert("Deselect")}>Deselect</sp-menu-item>
        <sp-menu-item @click=${() => alert("Select inverse")}>
            Select inverse
        </sp-menu-item>
        <sp-menu-item @click=${() => alert("Feather...")}>
            Feather...
        </sp-menu-item>
        <sp-menu-item @click=${() => alert("Select and mask...")}>
            Select and mask...
        </sp-menu-item>
        <sp-menu-divider></sp-menu-divider>
        <sp-menu-item @click=${() => alert("Save selection")}>
            Save selection
        </sp-menu-item>
        <sp-menu-item disabled>Make work path</sp-menu-item>
    </sp-action-menu>
`;
const __namedExportsOrder = ['Default', 'staticWhite', 'staticBlack', 'quiet', 'forcePopoverOnMobile', 'labelOnly', 'selects', 'iconOnly', 'tooltipDescriptionAndPlacement', 'customIcon', 'submenu', 'controlled', 'groups', 'groupsWithSelects', 'directive', 'withScrollEvent', 'MenuItemAlerts'];

export { Default, MenuItemAlerts, __namedExportsOrder, controlled, customIcon, actionMenu_stories as default, directive, forcePopoverOnMobile, groups, groupsWithSelects, iconOnly, labelOnly, quiet, selects, staticBlack, staticWhite, submenu, tooltipDescriptionAndPlacement, withScrollEvent };

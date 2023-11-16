import './sp-overlay-160eb278.js';
import './sp-action-button-0f8bdf2f.js';
import './sp-action-menu-a46530c4.js';
import './sp-action-group-1e1a03cc.js';
import './sp-popover-adc6def6.js';
import './sp-menu-group-0604b0e3.js';
import './sp-menu-item-d1901258.js';
import './sp-menu-divider-96e8aafa.js';
import './sp-tooltip-439ccb6f.js';
import './sp-icon-rect-select-21ffb2d7.js';
import { notAgain } from './dialog-base.stories-e62e76dd.js';
import { x } from './lit-html-126adc72.js';
import { l } from './if-defined-ae83b405.js';
import './define-element-467f3dc4.js';
import './lit-element-9354aa77.js';
import './platform-a32a5617.js';
import './ElementResolution-b58a0825.js';
import './condition-attribute-with-id-62869347.js';
import './VirtualTrigger-ca1345a7.js';
import './first-focusable-in-184a26e2.js';
import './focusable-selectors-252ae36e.js';
import './sizedMixin-95b38e3e.js';
import './base-511c8c11.js';
import './query-d0113d5a.js';
import './state-879d3fe4.js';
import './style-map-156e3c36.js';
import './directive-2bb7789e.js';
import './sp-icon-corner-triangle300-26ee005b.js';
import './CornerTriangle300-488cc3d0.js';
import './custom-tag-c228386e.js';
import './IconBase-fdbfb1c1.js';
import './ButtonBase-4ebd5d24.js';
import './like-anchor-79c92c76.js';
import './focusable-df7b829e.js';
import './focus-visible-03398d98.js';
import './observe-slot-text-2a3e6366.js';
import './mutation-controller-81a30f7f.js';
import './query-assigned-nodes-6218f033.js';
import './observe-slot-presence-ae37a9bc.js';
import './sp-icon-more-d39e1471.js';
import './More-78935819.js';
import './custom-tag-b5526d41.js';
import './Picker-7a452146.js';
import './spectrum-icon-chevron.css-d3283c08.js';
import './sp-icon-chevron100-d31cf739.js';
import './Chevron100-6f55b923.js';
import './sp-icon-alert-107ad358.js';
import './sp-menu-a6b50bf6.js';
import './MatchMedia-0123f918.js';
import './class-map-14530ec2.js';
import './RovingTabindex-ca5f8b64.js';
import './FocusGroup-0f0b800e.js';
import './spectrum-icon-checkmark.css-2fc91f81.js';
import './divider.css-d14b5633.js';
import './RectSelect-7ce6add0.js';
import './DialogBase-dd54052e.js';
import './sp-underlay-fdfe1df4.js';
import './sp-button-c571335c.js';
import './sp-dialog-cda58311.js';
import './sp-divider-5c291ed1.js';
import './sp-close-button-8c1265c1.js';
import './spectrum-icon-cross.css-8adfc305.js';
import './sp-button-group-6af1a728.js';
import './AlertDialog-09588482.js';
import './resize-controller-55608b66.js';
import './modal.css-ad9e835e.js';
import './sp-checkbox-afeb5232.js';
import './CheckboxBase-d69c7aeb.js';
import './sp-icon-checkmark300-5f52d70f.js';
import './Checkmark300-0ba007ba.js';
import './sp-icon-dash300-87ebfff7.js';
import './Dash300-2d8f97df.js';
import './spectrum-icon-dash.css-7fdeaf11.js';
import './dialog.stories-55707848.js';
import './images-68360f9e.js';
import './index-e70970e1.js';

var overlayElement_stories = {
  title: "Overlay Element",
  component: "sp-overlay",
  args: {
    open: true,
    delayed: false
  },
  argTypes: {
    open: {
      name: "open",
      type: { name: "boolean", required: false },
      description: "Whether the second accordion item is open.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    },
    delayed: {
      name: "delayed",
      type: { name: "boolean", required: false },
      description: "Whether the tooltips are delayed.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: false }
      },
      control: {
        type: "boolean"
      }
    }
  }
};
const Template = ({
  interaction,
  open,
  placement,
  type,
  delayed
}) => x`
    <style>
        .wrapper {
            will-change: transform;
        }
    </style>
    <div class="wrapper">
        <sp-action-button id="trigger">Open the overlay</sp-action-button>
        <sp-overlay
            ?open=${open}
            trigger="trigger@${interaction}"
            type=${l(type)}
            placement=${l(placement)}
            offset="-10"
        >
            <sp-popover dialog ?delayed=${delayed}>
                <p>
                    Content goes here.
                    ${type === "modal" || type === "page" ? x`
                              Or, a link,
                              <sp-link
                                  href="https://opensource.adobe.com/spectrum-web-components"
                              >
                                  Spectrum Web Components
                              </sp-link>
                              .
                          ` : ""}
                </p>
            </sp-popover>
        </sp-overlay>
    </div>
`;
const modal = (args) => Template(args);
modal.args = {
  interaction: "click",
  placement: "right",
  type: "modal"
};
const page = ({
  interaction,
  open,
  placement,
  type
}) => x`
    <sp-action-button id="trigger">Open the overlay</sp-action-button>
    <sp-overlay
        ?open=${open}
        trigger="trigger@${interaction}"
        type=${l(type)}
        placement=${l(placement)}
    >
        ${notAgain()}
    </sp-overlay>
`;
page.args = {
  interaction: "click",
  placement: "right",
  type: "page"
};
const click = (args) => Template(args);
click.args = {
  interaction: "click",
  placement: "right",
  type: "auto"
};
const hover = (args) => Template(args);
hover.args = {
  interaction: "hover",
  placement: "right"
};
const longpress = (args) => Template(args);
longpress.args = {
  interaction: "longpress",
  placement: "right",
  type: "auto"
};
const receivesFocus = ({
  interaction,
  open,
  placement,
  receivesFocus: receivesFocus2,
  type
}) => x`
    <sp-action-button id="trigger">
        Open the overlay (with focus)
    </sp-action-button>
    <sp-overlay
        ?open=${open}
        trigger="trigger@${interaction}"
        type=${l(type)}
        placement=${l(placement)}
        .receivesFocus=${receivesFocus2}
    >
        <a href="https://example.com">Click Content</a>
    </sp-overlay>
`;
receivesFocus.args = {
  interaction: "click",
  placement: "bottom-start",
  type: "auto",
  receivesFocus: "true"
};
const transformed = (args) => x`
    <style>
        .transformed {
            transform: translateX(-50%);
            position: absolute;
            inset: auto;
            inset-inline-start: 200px;
            inset-block-start: 200px;
            inline-size: 100px;
            block-size: 50px;
        }
    </style>
    <div class="transformed">${Template(args)}</div>
`;
transformed.args = {
  interaction: "click",
  placement: "right",
  type: "auto"
};
const contained = (args) => x`
    <style>
        .contained {
            contain: strict;
            position: absolute;
            inset: auto;
            inset-inline-start: 200px;
            inset-block-start: 200px;
            inline-size: 200px;
            block-size: 50px;
            padding-block: 75px;
            padding-inline-start: 300px;
        }
    </style>
    <div class="contained">${Template(args)}</div>
`;
contained.args = {
  interaction: "click",
  placement: "right",
  type: "auto"
};
const all = ({ delayed }) => x`
    <sp-action-button id="trigger" hold-affordance>
        Open the overlay
    </sp-action-button>
    <sp-overlay trigger="trigger@click" type="auto" placement="right">
        <sp-popover dialog>Click content</sp-popover>
    </sp-overlay>
    <sp-overlay ?delayed=${delayed} trigger="trigger@hover" type="hint">
        <sp-tooltip>Hover content</sp-tooltip>
    </sp-overlay>
    <sp-overlay trigger="trigger@longpress" type="auto" placement="right">
        <sp-popover dialog>Longpress content</sp-popover>
    </sp-overlay>
`;
const actionGroup = ({ delayed }) => {
  const popoverOffset = [6, -13];
  return x`
        <style>
            sp-popover sp-action-group {
                padding: calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) *
                            0.75
                    )
                    calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2
                    );
            }
            .root {
                inset-inline-end: 0em;
                inset-block-start: 3em;
                padding-block-end: 3em;
            }
            .root > sp-action-group > sp-action-button,
            .root > sp-action-group > sp-action-menu {
                top: 3em;
                position: relative;
            }
        </style>
        <sp-popover open class="root">
            <sp-action-group vertical quiet emphasized selects="single">
                <sp-action-button id="trigger-1" hold-affordance>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                </sp-action-button>
                <sp-action-button id="trigger-2" hold-affordance>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button id="trigger-3" hold-affordance>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                </sp-action-button>
                <sp-action-menu placement="left">
                    <sp-menu-group id="cms">
                        <span slot="header">cms</span>
                        <sp-menu-item value="updateAllSiteContent">
                            Update All Content
                        </sp-menu-item>
                        <sp-menu-item value="refreshAllXDs">
                            Refresh All XDs
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="ssg">
                        <span slot="header">ssg</span>
                        <sp-menu-item value="clearCache">
                            Clear Cache
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="vrt">
                        <span slot="header">vrt</span>
                        <sp-menu-item value="vrt-contributions">
                            Contributions
                        </sp-menu-item>
                        <sp-menu-item value="vrt-internal">
                            Internal
                        </sp-menu-item>
                        <sp-menu-item value="vrt-public">Public</sp-menu-item>
                        <sp-menu-item value="vrt-patterns">
                            Patterns
                        </sp-menu-item>
                        <sp-menu-item value="vrt">All</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group id="misc">
                        <sp-menu-item value="logout">Logout</sp-menu-item>
                    </sp-menu-group>
                </sp-action-menu>
            </sp-action-group>
        </sp-popover>
        <sp-overlay ?delayed=${delayed} trigger="trigger-1@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-1@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-2@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay
            ?delayed=${delayed}
            trigger="trigger-3@hover"
            type="hint"
            open
        >
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-3@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
    `;
};
const actionGroupWithFilters = ({
  delayed
}) => {
  const popoverOffset = [6, -13];
  return x`
        <style>
            sp-popover sp-action-group {
                padding: calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) *
                            0.75
                    )
                    calc(
                        var(--spectrum-actiongroup-vertical-spacing-regular) / 2
                    );
            }
            .root {
                inset-inline-end: 0em;
                inset-block-start: 3em;
                padding-block-end: 3em;
                overflow: hidden;
            }
            .root > sp-action-group > sp-action-button,
            .root > sp-action-group > sp-action-menu {
                top: 3em;
                position: relative;
            }
            sp-action-button,
            sp-action-menu {
                background-image: linear-gradient(
                    rgba(125, 125, 125, 0.2),
                    rgba(125, 125, 125, 0.2)
                );
                background-blend-mode: multiply;
                filter: brightness(1) saturate(1);
            }
        </style>
        <p>
            This story outlines some CSS usage that is not yet covered by the
            placement calculations within the Overlay API.
        </p>
        <sp-popover open class="root">
            <sp-action-group vertical quiet emphasized selects="single">
                <sp-action-button id="trigger-1" hold-affordance>
                    <sp-icon-anchor-select slot="icon"></sp-icon-anchor-select>
                    <sp-tooltip ?delayed=${delayed} self-managed>
                        Hover
                    </sp-tooltip>
                    <sp-overlay
                        trigger="trigger-1@longpress"
                        type="auto"
                        placement="right-start"
                        .offset=${popoverOffset}
                    >
                        <sp-popover tip>
                            <sp-action-group vertical quiet>
                                <sp-action-button>
                                    <sp-icon-anchor-select
                                        slot="icon"
                                    ></sp-icon-anchor-select>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-polygon-select
                                        slot="icon"
                                    ></sp-icon-polygon-select>
                                </sp-action-button>
                                <sp-action-button>
                                    <sp-icon-rect-select
                                        slot="icon"
                                    ></sp-icon-rect-select>
                                </sp-action-button>
                            </sp-action-group>
                        </sp-popover>
                    </sp-overlay>
                </sp-action-button>
                <sp-action-button id="trigger-2" hold-affordance>
                    <sp-icon-polygon-select
                        slot="icon"
                    ></sp-icon-polygon-select>
                </sp-action-button>
                <sp-action-button id="trigger-3" hold-affordance>
                    <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    <sp-tooltip ?delayed=${delayed} self-managed>
                        Hover
                    </sp-tooltip>
                </sp-action-button>
                <sp-action-menu>
                    <sp-menu-group id="cms">
                        <span slot="header">cms</span>
                        <sp-menu-item value="updateAllSiteContent">
                            Update All Content
                        </sp-menu-item>
                        <sp-menu-item value="refreshAllXDs">
                            Refresh All XDs
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="ssg">
                        <span slot="header">ssg</span>
                        <sp-menu-item value="clearCache">
                            Clear Cache
                        </sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group id="vrt">
                        <span slot="header">vrt</span>
                        <sp-menu-item value="vrt-contributions">
                            Contributions
                        </sp-menu-item>
                        <sp-menu-item value="vrt-internal">
                            Internal
                        </sp-menu-item>
                        <sp-menu-item value="vrt-public">Public</sp-menu-item>
                        <sp-menu-item value="vrt-patterns">
                            Patterns
                        </sp-menu-item>
                        <sp-menu-item value="vrt">All</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group id="misc">
                        <sp-menu-item value="logout">Logout</sp-menu-item>
                    </sp-menu-group>
                </sp-action-menu>
            </sp-action-group>
        </sp-popover>
        <sp-overlay ?delayed=${delayed} trigger="trigger-2@hover" type="hint">
            <sp-tooltip>Hover</sp-tooltip>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-2@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
        <sp-overlay
            trigger="trigger-3@longpress"
            type="auto"
            placement="right-start"
            .offset=${popoverOffset}
        >
            <sp-popover tip>
                <sp-action-group vertical quiet>
                    <sp-action-button>
                        <sp-icon-anchor-select
                            slot="icon"
                        ></sp-icon-anchor-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-polygon-select
                            slot="icon"
                        ></sp-icon-polygon-select>
                    </sp-action-button>
                    <sp-action-button>
                        <sp-icon-rect-select slot="icon"></sp-icon-rect-select>
                    </sp-action-button>
                </sp-action-group>
            </sp-popover>
        </sp-overlay>
    `;
};
const __namedExportsOrder = ['modal', 'page', 'click', 'hover', 'longpress', 'receivesFocus', 'transformed', 'contained', 'all', 'actionGroup', 'actionGroupWithFilters'];

export { __namedExportsOrder, actionGroup, actionGroupWithFilters, all, click, contained, overlayElement_stories as default, hover, longpress, modal, page, receivesFocus, transformed };

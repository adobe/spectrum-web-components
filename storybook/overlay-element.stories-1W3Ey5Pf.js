import './sp-dialog-Cua0Cown.js';
import './sp-overlay-OxllywZv.js';
import './sp-action-button-yJ_5Ao_n.js';
import './sp-action-menu-uc15JKgb.js';
import './sp-action-group-7kE1EGOH.js';
import './sp-popover-jafHnpZt.js';
import './sp-menu-group-3Mvqxw6r.js';
import './sp-menu-item-BnuqroME.js';
import './sp-menu-divider-IXmQjkt_.js';
import './sp-link-iCuo0bPC.js';
import './sp-tooltip-7K0riup7.js';
import './sp-icon-rect-select-5XsWNean.js';
import { notAgain } from './dialog-base.stories-_22nXRxZ.js';
import './overlay-story-components-i1TywTbm.js';
import { x } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './sp-divider-KH2bPAuz.js';
import './divider.css-w129hLpK.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-D9_yg9Lr.js';
import './define-element-s04w2teA.js';
import './base-STdhtiz1.js';
import './sp-close-button-__rs1xx6.js';
import './spectrum-icon-cross.css-Lnx-mdgp.js';
import './ButtonBase-jlLlzNEe.js';
import './like-anchor-Gwp5ooDH.js';
import './focusable-mx5LgJ38.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-eZT7feU8.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-u86daeBT.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-_0RU6XqS.js';
import './sp-button-group-RLQ_aOSl.js';
import './sp-icon-alert-CNIIZm3E.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-00b_a74d.js';
import './sp-button-W8hFYHyg.js';
import './when-kvvOyHr2.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './platform-c1C9ET3y.js';
import './ElementResolution-TTOqkMM7.js';
import './VirtualTrigger-HyCzwVi1.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './state-BSEind79.js';
import './style-map-ak5mT6xX.js';
import './sp-icon-corner-triangle300-XX4Nm8CT.js';
import './CornerTriangle300-wDtTC9xD.js';
import './sp-icon-more-xai1q3s_.js';
import './More-RXlxfRbl.js';
import './Picker-C-8dV5AK.js';
import './spectrum-icon-chevron.css-8l4pupPT.js';
import './sp-icon-chevron100-3PcMAyn_.js';
import './Chevron100-WZwzwvjg.js';
import './sp-menu-aukB87hm.js';
import './MatchMedia-SMh19R1m.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './spectrum-icon-checkmark.css-T4LCyo5k.js';
import './RectSelect-HhUJrrJw.js';
import './DialogBase-Xym0ozoD.js';
import './sp-underlay--W8tWQXm.js';
import './modal.css-CqpIvq2y.js';
import './sp-checkbox-bH9eQ7fi.js';
import './CheckboxMixin-rYFFIjuG.js';
import './sp-icon-checkmark300-FSKOj9NV.js';
import './Checkmark300-lOa7puRL.js';
import './sp-icon-dash300-b7-YZtT_.js';
import './Dash300-GtH_7nnW.js';
import './spectrum-icon-dash.css-WF-6HO_o.js';
import './dialog.stories-N-otTd6v.js';
import './images-WJGovbiS.js';
import './sp-radio--AnLPphx.js';
import './sp-radio-group-uTRv3ohC.js';
import './FieldGroup-fpJGfT_1.js';
import './manage-help-text-kfeeNmRL.js';
import './overlay-trigger-1yxAoScN.js';

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
  delayed,
  style
}) => x`
    ${style === "will-change" ? x`
              <style>
                  .wrapper {
                      will-change: transform;
                  }
              </style>
          ` : x`
              <style>
                  .wrapper {
                      container-type: size;
                  }
              </style>
          `}
    <div class="wrapper">
        <sp-action-button id="trigger">Open the overlay</sp-action-button>
        <sp-overlay
            ?open=${open}
            trigger="trigger@${interaction}"
            type=${l(type)}
            placement=${l(placement)}
            offset="-10"
        >
            <sp-popover ?delayed=${delayed}>
                <sp-dialog size="s" no-divider>
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
                </sp-dialog>
            </sp-popover>
        </sp-overlay>
    </div>
`;
const modal = (args) => Template(args);
modal.args = {
  interaction: "click",
  placement: "right",
  style: "will-change",
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
  style: "container-type",
  type: "auto"
};
const hover = (args) => Template(args);
hover.args = {
  interaction: "hover",
  placement: "right",
  style: "will-change"
};
const hoverTooltip = ({
  interaction,
  open,
  placement,
  type
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
            <sp-tooltip>Tooltip goes here.</sp-tooltip>
        </sp-overlay>
    </div>
`;
hoverTooltip.args = {
  interaction: "hover",
  placement: "right"
};
const longpress = (args) => Template(args);
longpress.args = {
  interaction: "longpress",
  placement: "right",
  style: "container-type",
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
        <sp-popover>
            <sp-dialog size="s" no-divider>
                <a href="https://example.com">Click Content</a>
            </sp-dialog>
        </sp-popover>
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
        <sp-popover>
            <sp-dialog size="s" no-divider>Click content</sp-dialog>
        </sp-popover>
    </sp-overlay>
    <sp-overlay ?delayed=${delayed} trigger="trigger@hover" type="hint">
        <sp-tooltip>Hover content</sp-tooltip>
    </sp-overlay>
    <sp-overlay trigger="trigger@longpress" type="auto" placement="right">
        <sp-popover>
            <sp-dialog size="s" no-divider>Longpress content</sp-dialog>
        </sp-popover>
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
const transientHover = () => x`
    <transient-hover></transient-hover>
`;
transientHover.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['modal', 'page', 'click', 'hover', 'hoverTooltip', 'longpress', 'receivesFocus', 'transformed', 'contained', 'all', 'actionGroup', 'actionGroupWithFilters', 'transientHover'];

export { __namedExportsOrder, actionGroup, actionGroupWithFilters, all, click, contained, overlayElement_stories as default, hover, hoverTooltip, longpress, modal, page, receivesFocus, transformed, transientHover };

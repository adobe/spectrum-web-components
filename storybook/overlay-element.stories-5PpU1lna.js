import './sp-dialog-XKvTqFNY.js';
import './sp-overlay--o1x0r8m.js';
import './sp-action-button-XdC2aqha.js';
import './sp-action-menu-Oqrjl9vJ.js';
import './sp-action-group-5N_Ss3pv.js';
import './sp-popover-VEiJb0fr.js';
import './sp-menu-group-ZOYXvU4Z.js';
import './sp-menu-item-6ynCq98U.js';
import './sp-menu-divider-4ENnd-xz.js';
import './sp-link-9-4MahKS.js';
import './sp-tooltip-CFA-Rw4-.js';
import './sp-slider-fwIyuim4.js';
import './sp-icon-rect-select-4DIwA7Pi.js';
import { notAgain } from './dialog-base.stories-NeszxJ1b.js';
import './overlay-story-components-5U7z6ODt.js';
import { r as removeSlottableRequest } from './slottable-request-event-SQgFLN7g.js';
import { x, D } from './lit-html-GmIhAbMP.js';
import { l } from './if-defined-pV6JZKXB.js';
import './sp-divider-0OMoE3Ub.js';
import './divider.css-J1TsgOfe.js';
import './lit-element-xBOPiTek.js';
import './sizedMixin-i8vReDsT.js';
import './define-element-2SKaLcgv.js';
import './query-assigned-elements-1m6Cs7Ix.js';
import './base-STdhtiz1.js';
import './sp-close-button-DVfTfovy.js';
import './spectrum-icon-cross.css-fyatyW0U.js';
import './ButtonBase-75QTpX6n.js';
import './like-anchor-aNXO7yKS.js';
import './focusable-n0Bfj6en.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-mc0YsU0d.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-jGvx5qKR.js';
import './query-JMOstM_r.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-6HeAKn4X.js';
import './sp-icon-cross500-EcTOQQfP.js';
import './Cross500-CuS5PwKf.js';
import './sp-button-group-afh0Oacp.js';
import './sp-icon-alert-vqzws53s.js';
import './custom-tag-JXLWq-Sj.js';
import './AlertDialog-2tK3LDxw.js';
import './sp-button-sPWnnZvf.js';
import './when-kvvOyHr2.js';
import './random-id-M2k-wjyE.js';
import './condition-attribute-with-id-nb2zon-s.js';
import './resize-controller--ByFn5Jx.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './ElementResolution-TTOqkMM7.js';
import './first-focusable-in-LZ7hcu4z.js';
import './focusable-selectors-VCrFWGqo.js';
import './platform-c1C9ET3y.js';
import './state-q_CC9QX6.js';
import './style-map-ak5mT6xX.js';
import './sp-icon-corner-triangle300-WaZEcosI.js';
import './CornerTriangle300-scOUseNi.js';
import './sp-icon-more--guHacSU.js';
import './More-RXlxfRbl.js';
import './Picker-5zHIcXlB.js';
import './spectrum-icon-chevron.css-hA8DP86t.js';
import './sp-icon-chevron100-nm_fX2AN.js';
import './Chevron100-ok1mOHjI.js';
import './sp-menu-fUm6H3kk.js';
import './MatchMedia-SMh19R1m.js';
import './DependencyManger-0SYmL--C.js';
import './RovingTabindex-LnbiEVTh.js';
import './FocusGroup-TIL3fP6n.js';
import './Popover-JIiF3pUZ.js';
import './spectrum-icon-checkmark.css-1U1WWTA-.js';
import './LanguageResolution-433GhF-m.js';
import './import-mabg3nA1.js';
import './sp-field-label-zgYSrBxX.js';
import './streaming-listener-99YRN1c8.js';
import './async-directive-cHMFxS7f.js';
import './directive-helpers-WPlpPO1F.js';
import './repeat-ry-ySa1b.js';
import './RectSelect-HhUJrrJw.js';
import './DialogBase-VGYaSJtL.js';
import './sp-underlay--7mtYQ6F.js';
import './modal.css-JF8KQ-ZN.js';
import './sp-checkbox-j4ZFpjrl.js';
import './CheckboxMixin-kidUFubh.js';
import './sp-icon-checkmark300-om5e-DYg.js';
import './Checkmark300-WAcytU8S.js';
import './sp-icon-dash300-eD3Pp0lE.js';
import './Dash300-GtH_7nnW.js';
import './spectrum-icon-dash.css-itJ-5huq.js';
import './dialog.stories-0ikTEhA6.js';
import './images-WJGovbiS.js';
import './sp-radio-kS8T5UUv.js';
import './sp-radio-group-SbQbJXko.js';
import './FieldGroup-RQbVJGfw.js';
import './manage-help-text-f9KNpcsn.js';
import './overlay-trigger-r8bBoxZd.js';

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
                <sp-action-menu label="More Actions" placement="left">
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
                <sp-action-menu label="More Actions">
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
const lazyElements = () => {
  const handleSlottableRequest = (event) => {
    const template = event.data === removeSlottableRequest ? void 0 : x`
                      <sp-popover>
                          <sp-dialog no-divider>
                              <sp-slider
                                  value="5"
                                  step="0.5"
                                  min="0"
                                  max="20"
                                  label="Awesomeness"
                              ></sp-slider>
                              <div id="styled-div">
                                  The background of this div should be blue
                              </div>
                              <sp-button>
                                  Press Me
                                  <sp-tooltip self-managed delayed>
                                      Click to open another popover.
                                  </sp-tooltip>
                              </sp-button>
                          </sp-dialog>
                      </sp-popover>
                  `;
    D(template, event.target);
  };
  return x`
        <sp-button id="button">Trigger</sp-button>
        <sp-overlay
            placement="bottom"
            type="auto"
            trigger="button@click"
            @slottable-request=${handleSlottableRequest}
        ></sp-overlay>
    `;
};
lazyElements.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['modal', 'page', 'click', 'hover', 'hoverTooltip', 'longpress', 'receivesFocus', 'transformed', 'contained', 'all', 'actionGroup', 'actionGroupWithFilters', 'transientHover', 'lazyElements'];

export { __namedExportsOrder, actionGroup, actionGroupWithFilters, all, click, contained, overlayElement_stories as default, hover, hoverTooltip, lazyElements, longpress, modal, page, receivesFocus, transformed, transientHover };

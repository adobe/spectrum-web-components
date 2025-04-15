import './sp-action-menu-D53JT_ig.js';
import './sp-menu-DLS2qTtM.js';
import './sp-menu-item-lWzihiU5.js';
import './sp-menu-divider-Lgd4v3Zk.js';
import './sp-menu-group-Qa8njTXg.js';
import { V as VirtualTrigger } from './VirtualTrigger-BIS5joYI.js';
import './sp-popover-r5xb8poc.js';
import './sp-icon-show-menu-mZeZ7oed.js';
import { x } from './lit-html-COgVUehj.js';
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
import './if-defined-DDJGFaN4.js';
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
import './RovingTabindex-Bozun0RY.js';
import './FocusGroup-VP8jhztA.js';
import './spectrum-icon-checkmark.css-CUMq8Erd.js';
import './random-id-BST1Puzz.js';
import './divider.css-B4Y_licH.js';
import './Popover-wo0uA6Tm.js';
import './ShowMenu-t3rqWNPf.js';

var submenu_stories = {
  component: "sp-menu",
  title: "Menu/Submenu"
};
function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
class SubmenuReady extends HTMLElement {
  constructor() {
    super();
    this.handleMenuOpened = async (event) => {
      this.menu.removeEventListener("sp-opened", this.handleMenuOpened);
      await nextFrame();
      await event.target.updateComplete;
      this.submenu = document.querySelector("#submenu-item-1");
      if (!this.submenu) {
        return;
      }
      this.submenu.addEventListener("sp-opened", this.handleSubmenuOpened);
      this.submenu.click();
    };
    this.handleSubmenuOpened = async (event) => {
      this.submenu.removeEventListener("sp-opened", this.handleSubmenuOpened);
      await nextFrame();
      await event.target.updateComplete;
      this.submenuChild = document.querySelector(
        "#submenu-item-2"
      );
      if (!this.submenuChild) {
        return;
      }
      this.submenuChild.addEventListener(
        "sp-opened",
        this.handleSubmenuChildOpened
      );
      this.submenuChild.click();
    };
    this.handleSubmenuChildOpened = async (event) => {
      this.submenuChild.removeEventListener(
        "sp-opened",
        this.handleSubmenuChildOpened
      );
      await nextFrame();
      await event.target.updateComplete;
      this.ready(true);
    };
    this.readyPromise = Promise.resolve(false);
    this.readyPromise = new Promise((res) => {
      this.ready = res;
      this.setup();
    });
  }
  async setup() {
    await nextFrame();
    this.menu = document.querySelector(`sp-action-menu`);
    this.menu.addEventListener("sp-opened", this.handleMenuOpened);
    this.menu.addEventListener(
      "sp-closed",
      () => {
        this.menu.removeEventListener(
          "sp-opened",
          this.handleMenuOpened
        );
      },
      { once: true }
    );
    this.menu.open = true;
  }
  get updateComplete() {
    return this.readyPromise;
  }
}
customElements.define("submenu-ready", SubmenuReady);
const submenuDecorator = (story) => {
  return x`
        ${story()}
        <submenu-ready></submenu-ready>
    `;
};
const submenu = () => {
  const getValueEls = () => {
    return {
      root: document.querySelector("#root-value"),
      first: document.querySelector("#first-value"),
      second: document.querySelector("#second-value")
    };
  };
  const clearValues = () => {
    const valueEls = getValueEls();
    valueEls.root.textContent = "";
    valueEls.first.textContent = "";
    valueEls.second.textContent = "";
  };
  const handleRootChange = (event) => {
    const valueEls = getValueEls();
    valueEls.root.textContent = event.target.value;
  };
  const handleFirstDescendantChange = (event) => {
    const valueEls = getValueEls();
    valueEls.first.textContent = event.target.selected[0] || "";
  };
  const handleSecondDescendantChange = (event) => {
    const valueEls = getValueEls();
    valueEls.second.textContent = event.target.selected[0] || "";
  };
  return x`
        <sp-action-menu
            label="More Actions"
            @change=${handleRootChange}
            @sp-opened=${clearValues}
        >
            <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
            <sp-menu-group
                @change=${() => console.log("group change")}
                role="none"
            >
                <span slot="header">New York</span>
                <sp-menu-item>Bronx</sp-menu-item>
                <sp-menu-item id="submenu-item-1">
                    Brooklyn
                    <sp-menu
                        slot="submenu"
                        @change=${handleFirstDescendantChange}
                    >
                        <sp-menu-item id="submenu-item-2">
                            Ft. Greene
                            <sp-menu
                                slot="submenu"
                                @change=${handleSecondDescendantChange}
                            >
                                <sp-menu-item>S. Oxford St</sp-menu-item>
                                <sp-menu-item>S. Portland Ave</sp-menu-item>
                                <sp-menu-item>S. Elliot Pl</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item disabled>Park Slope</sp-menu-item>
                        <sp-menu-item>Williamsburg</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
                <sp-menu-item>
                    Manhattan
                    <sp-menu
                        slot="submenu"
                        @change=${handleFirstDescendantChange}
                    >
                        <sp-menu-item disabled>SoHo</sp-menu-item>
                        <sp-menu-item>
                            Union Square
                            <sp-menu
                                slot="submenu"
                                @change=${handleSecondDescendantChange}
                            >
                                <sp-menu-item>14th St</sp-menu-item>
                                <sp-menu-item>Broadway</sp-menu-item>
                                <sp-menu-item>Park Ave</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item>Upper East Side</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
                <sp-menu-item disabled>
                    Queens
                    <sp-menu slot="submenu">
                        <sp-menu-item>
                            You shouldn't be able to see this!
                        </sp-menu-item>
                        <sp-menu-item>Forest Hills</sp-menu-item>
                        <sp-menu-item>Jamaica</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-menu-group>
        </sp-action-menu>
        <div>
            Root value:
            <span id="root-value"></span>
            <br />
            First descendant value:
            <span id="first-value"></span>
            <br />
            Second descendant value:
            <span id="second-value"></span>
            <br />
        </div>
    `;
};
submenu.decorators = [submenuDecorator];
const contextMenu = () => {
  const contextmenu = async (event) => {
    event.preventDefault();
    const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
    const overlay = document.querySelector("sp-overlay");
    clearValues();
    overlay.triggerElement = virtualTrigger;
    overlay.willPreventClose = true;
    overlay.type = "auto";
    overlay.placement = "right-start";
    overlay.open = true;
  };
  const getValueEls = () => {
    return {
      root: document.querySelector("#root-value"),
      first: document.querySelector("#first-value")
    };
  };
  const clearValues = () => {
    const valueEls = getValueEls();
    valueEls.root.textContent = "";
    valueEls.first.textContent = "";
  };
  const handleRootChange = (event) => {
    var _a;
    const valueEls = getValueEls();
    valueEls.root.textContent = event.target.value;
    (_a = event.target.parentElement) == null ? void 0 : _a.dispatchEvent(
      new Event("close", { bubbles: true })
    );
  };
  const handleFirstDescendantChange = (event) => {
    const valueEls = getValueEls();
    valueEls.first.textContent = event.target.selected[0] || "";
  };
  return x`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
            active-overlay::part(theme) {
                --swc-menu-width: 200px;
            }
        </style>
        <div class="app-root" @contextmenu=${contextmenu}>
            <div>
                Root value:
                <span id="root-value"></span>
                <br />
                First descendant value:
                <span id="first-value"></span>
                <br />
            </div>
        </div>
        <sp-overlay>
            <sp-popover
                style="max-width: 33vw;"
                @click=${(event) => {
    var _a;
    return (_a = event.target) == null ? void 0 : _a.dispatchEvent(
      new Event("close", { bubbles: true })
    );
  }}
            >
                <sp-menu @change=${handleRootChange}>
                    <sp-menu-group>
                        <span slot="header">Options</span>
                        <sp-menu-item>
                            Copy
                            <span slot="value">⌘​S</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Paste
                            <span slot="value">⌘​P</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Cut
                            <span slot="value">⌘​X</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Select layer
                            <sp-menu
                                slot="submenu"
                                selects="single"
                                @change=${handleFirstDescendantChange}
                            >
                                <sp-menu-item selected>Ellipse 1</sp-menu-item>
                                <sp-menu-item>Rectangle</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item>
                            Group
                            <span slot="value">⌘​G</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Unlock
                            <span slot="value">⌘​L</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Bring to front
                            <span slot="value">⇧​⌘​​]</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Bring forward
                            <span slot="value">⌘​​]</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Send backward
                            <span slot="value">⌘​​[</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Send to back
                            <span slot="value">⇧​⌘​​[</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Delete
                            <span slot="value">DEL</span>
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        </sp-overlay>
    `;
};
const customRootSubmenu = () => {
  return x`
        <sp-action-menu label="More Actions">
            <sp-menu-item>Bronx</sp-menu-item>
            <sp-menu-item id="submenu-item-1">
                Brooklyn
                <div role="menuitem" slot="submenu" style="padding: 12px">
                    <img
                        src="https://placekitten.com/200/200"
                        alt="Kitten"
                        style="width: 100%; height: auto; border-radius: 4px"
                    />
                    <p>I am an arbitrary content in submenu</p>
                </div>
            </sp-menu-item>
        </sp-action-menu>
    `;
};
const customRootSubmenuWithScroll = () => {
  return x`
        <sp-action-menu label="More Actions">
            <sp-menu-item>Bronx</sp-menu-item>
            <sp-menu-item id="submenu-item-1">
                Brooklyn
                <div role="menuitem" slot="submenu" style="padding: 12px">
                <sp-menu-item>Additional options</sp-menu-item>
                <sp-menu-item>Available on request</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                <sp-menu-item value="item-1">Deselect</sp-menu-item>
                <sp-menu-item value="item-2">Select inverse</sp-menu-item>
                <sp-menu-item value="item-3">Feather...</sp-menu-item>
                <sp-menu-item value="item-4">Select and mask...</sp-menu-item>
                <sp-menu-item value="item-5">Save selection</sp-menu-item>
                </div>
            </sp-menu-item>
        </sp-action-menu>
    `;
};
customRootSubmenu.swc_vrt = {
  skip: true
};
const __namedExportsOrder = ['submenu', 'contextMenu', 'customRootSubmenu', 'customRootSubmenuWithScroll'];

export { __namedExportsOrder, contextMenu, customRootSubmenu, customRootSubmenuWithScroll, submenu_stories as default, submenu };

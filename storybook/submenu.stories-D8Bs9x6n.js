import './sp-action-menu-DL0xMz0a.js';
import './sp-menu-DXtsQmAq.js';
import './sp-menu-item-BHd3Rv6A.js';
import './sp-menu-divider-CNpjll6K.js';
import './sp-menu-group-kRbHN3UQ.js';
import { V as VirtualTrigger } from './VirtualTrigger-DaUs6dN5.js';
import './sp-popover-ZCxd8XTH.js';
import './sp-icon-show-menu-7VZeY0Av.js';
import { x } from './lit-html-COgVUehj.js';
import './sp-action-button-BNqBs9pZ.js';
import './lit-element-BL-po2DW.js';
import './sp-icon-corner-triangle300-D-Yh9bB4.js';
import './CornerTriangle300-B7hvHiLM.js';
import './custom-tag-B5IH9PTE.js';
import './IconBase-B8dJ3OhJ.js';
import './define-element-DeMmBNCp.js';
import './ButtonBase-C0zwFpsa.js';
import './like-anchor-vdd4WF9w.js';
import './if-defined-DDJGFaN4.js';
import './focusable-X_T5Q3Xx.js';
import './focus-visible-D29Av9Xb.js';
import './observe-slot-text-CWSEtJ4X.js';
import './mutation-controller-D2lT1xZk.js';
import './query-assigned-nodes-DAYI4epk.js';
import './base-u8Z1Hrsd.js';
import './query-DQF6X5qW.js';
import './sizedMixin-Cu5eACid.js';
import './observe-slot-presence-Ceiwt-jV.js';
import './sp-icon-more-BWz9HQI4.js';
import './More-C2yzfCOG.js';
import './custom-tag-Diwq7nXX.js';
import './slottable-request-event-DXuuyGoq.js';
import './Picker-C_NCGHjX.js';
import './spectrum-icon-chevron.css-C5c2rYXA.js';
import './sp-icon-chevron100-BzwTbKQ2.js';
import './Chevron100-2ZEB0c-t.js';
import './sp-icon-alert-C8ua4NmY.js';
import './MatchMedia-pSNe9kbs.js';
import './DependencyManger-Dpkh1Bse.js';
import './class-map-DdRvesrq.js';
import './directive-Bn5c4u4M.js';
import './style-map-DtKTc8KS.js';
import './when-DEJm_QN9.js';
import './state-BMiL7_R7.js';
import './spectrum-icon-checkmark.css-tikpK1L5.js';
import './random-id-BST1Puzz.js';
import './divider.css-Y7Qapv-N.js';
import './AbstractOverlay-DGIWUGfl.js';
import './Popover-xlmuh0jb.js';
import './ShowMenu-KSxsYvsI.js';

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
const __namedExportsOrder = ['submenu', 'contextMenu'];

export { __namedExportsOrder, contextMenu, submenu_stories as default, submenu };

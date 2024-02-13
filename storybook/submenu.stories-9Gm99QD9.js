import './sp-action-menu-vf-HeNok.js';
import './sp-menu-FQVYzy9J.js';
import './sp-menu-item-WU5O76xQ.js';
import './sp-menu-divider-_m0GybmG.js';
import './sp-menu-group-Qws1YtKq.js';
import { V as VirtualTrigger } from './VirtualTrigger-Sqzey4Y2.js';
import './sp-popover-OhDGQO09.js';
import './sp-icon-show-menu-Lw7qUw2H.js';
import { x } from './lit-html-GmIhAbMP.js';
import './sp-action-button-IL4X3jdR.js';
import './lit-element-xBOPiTek.js';
import './sp-icon-corner-triangle300-9DQQh1mD.js';
import './CornerTriangle300-wDtTC9xD.js';
import './custom-tag-z2Xx81l9.js';
import './IconBase-Tav-FzmR.js';
import './define-element-UHExAFdK.js';
import './ButtonBase-sZHeZCuW.js';
import './like-anchor-njINSPTN.js';
import './if-defined-pV6JZKXB.js';
import './focusable-p9xQieT8.js';
import './focus-visible-68QWcOy-.js';
import './observe-slot-text-5oGzzbFn.js';
import './mutation-controller-KeE5MDSl.js';
import './query-assigned-nodes-7fQrqAdh.js';
import './base-STdhtiz1.js';
import './sizedMixin-6sBuja8e.js';
import './query-JMOstM_r.js';
import './observe-slot-presence-tyJ_SCNf.js';
import './sp-icon-more-8Poneot0.js';
import './More-RXlxfRbl.js';
import './custom-tag-JXLWq-Sj.js';
import './Picker-yxog523o.js';
import './spectrum-icon-chevron.css-nkKXiUlE.js';
import './sp-icon-chevron100-tb9aielX.js';
import './Chevron100-WZwzwvjg.js';
import './sp-icon-alert-8xHFckqN.js';
import './MatchMedia-SMh19R1m.js';
import './class-map-Q7DIFm9x.js';
import './directive-C1gRZbRe.js';
import './style-map-ak5mT6xX.js';
import './state-FLXW5LJZ.js';
import './spectrum-icon-checkmark.css-QI1dlyU-.js';
import './random-id-M2k-wjyE.js';
import './divider.css-w129hLpK.js';
import './Popover-uavtgZAO.js';
import './ShowMenu-Yp5aHsEW.js';

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
        <sp-action-menu @change=${handleRootChange} @sp-opened=${clearValues}>
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

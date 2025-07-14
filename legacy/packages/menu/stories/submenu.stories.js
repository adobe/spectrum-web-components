"use strict";
import { html } from "@spectrum-web-components/base";
import "@spectrum-web-components/action-menu/sp-action-menu.js";
import "@spectrum-web-components/menu/sp-menu.js";
import "@spectrum-web-components/menu/sp-menu-item.js";
import "@spectrum-web-components/menu/sp-menu-divider.js";
import "@spectrum-web-components/menu/sp-menu-group.js";
import { VirtualTrigger } from "@spectrum-web-components/overlay";
import "@spectrum-web-components/popover/sp-popover.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js";
export default {
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
  return html`
        ${story()}
        <submenu-ready></submenu-ready>
    `;
};
export const submenu = () => {
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
  return html`
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
export const contextMenu = () => {
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
  return html`
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
export const customRootSubmenu = () => {
  return html`
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
export const customRootSubmenuWithScroll = () => {
  return html`
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
//# sourceMappingURL=submenu.stories.js.map

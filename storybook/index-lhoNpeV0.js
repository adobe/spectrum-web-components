import { x } from './lit-html-COgVUehj.js';

function nextFrame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}
class IsOverlayOpen extends HTMLElement {
  constructor() {
    super();
    this.sendFocus = async () => {
      var _a;
      const selectedItem = (_a = document.querySelector("[focusable]")) == null ? void 0 : _a.querySelector("[selected]");
      if (selectedItem) {
        selectedItem.focus();
        selectedItem.focused = true;
        await nextFrame();
        selectedItem.scrollIntoView({ block: "start" });
        await nextFrame();
      }
    };
    this.handleOpened = async (event) => {
      const overlay = event.target;
      const actions = [nextFrame(), overlay.updateComplete, this.sendFocus()];
      await Promise.all(actions);
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
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
    document.addEventListener("sp-opened", this.handleOpened);
  }
  get updateComplete() {
    return this.readyPromise;
  }
  // remove event listeners in disconnectCallback
  disconnectedCallback() {
    document.removeEventListener("sp-opened", this.handleOpened);
  }
}
customElements.define("is-overlay-open", IsOverlayOpen);
const isOverlayOpen = (story) => {
  return x`
        ${story()}
        <is-overlay-open></is-overlay-open>
    `;
};
class AreIconsPresent extends HTMLElement {
  constructor() {
    super();
    this.overlayTimeout = null;
    this.sendFocus = async () => {
      var _a;
      const selectedItem = (_a = document.querySelector("[focusable]")) == null ? void 0 : _a.querySelector("[selected]");
      if (selectedItem) {
        selectedItem.focus();
        selectedItem.focused = true;
        await nextFrame();
        selectedItem.scrollIntoView({ block: "start" });
        await nextFrame();
      }
    };
    this.handleOpened = async (event) => {
      if (this.overlayTimeout) {
        clearTimeout(this.overlayTimeout);
        this.overlayTimeout = null;
      }
      const overlay = event.target;
      const actions = [nextFrame(), overlay.updateComplete, this.sendFocus()];
      await Promise.all(actions);
      await nextFrame();
      await nextFrame();
      await nextFrame();
      await nextFrame();
      this.checkIcons();
    };
    this.checkIcons = async () => {
      const icons = [...document.querySelectorAll("sp-icon")];
      const picker = document.querySelector("sp-picker");
      if (picker) {
        const pickerIcon = picker.querySelector("sp-icon");
        if (pickerIcon) {
          icons.push(pickerIcon);
        }
      }
      const iconLoadPromises = Array.from(icons).map((icon) => {
        return new Promise((resolve) => {
          var _a;
          if ("updateComplete" in icon && typeof ((_a = icon.updateComplete) == null ? void 0 : _a.then) === "function") {
            icon.updateComplete.then(() => {
              resolve();
            });
            return;
          }
          const src = icon.getAttribute("src");
          if (!src) {
            const imgElement2 = icon.querySelector("img");
            if (imgElement2) {
              if (imgElement2.complete) {
                resolve();
              } else {
                imgElement2.addEventListener(
                  "load",
                  () => {
                    resolve();
                  },
                  { once: true }
                );
                imgElement2.addEventListener(
                  "error",
                  () => {
                    console.warn(`Failed to load icon image`);
                    resolve();
                  },
                  { once: true }
                );
              }
              return;
            }
            resolve();
            return;
          }
          const imgElement = icon.querySelector("img");
          if (imgElement) {
            if (imgElement.complete) {
              resolve();
            } else {
              imgElement.addEventListener(
                "load",
                () => {
                  resolve();
                },
                { once: true }
              );
              imgElement.addEventListener(
                "error",
                () => {
                  console.warn(
                    `Failed to load icon image: ${src}`
                  );
                  resolve();
                },
                { once: true }
              );
            }
            return;
          }
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => {
            console.warn(`Failed to load icon: ${src}`);
            resolve();
          };
          img.src = src;
        });
      });
      await Promise.all(iconLoadPromises);
      await nextFrame();
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
    document.addEventListener("sp-opened", this.handleOpened);
  }
  get updateComplete() {
    return this.readyPromise;
  }
  // remove event listeners in disconnectCallback
  disconnectedCallback() {
    document.removeEventListener("sp-opened", this.handleOpened);
  }
}
customElements.define("are-icons-present", AreIconsPresent);
const areIconsPresent = (story) => {
  return x`
        ${story()}
        <are-icons-present></are-icons-present>
    `;
};

export { areIconsPresent as a, isOverlayOpen as i };

"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import {
  html,
  SizedMixin,
  SpectrumElement
} from "@spectrum-web-components/base";
import {
  property,
  query
} from "@spectrum-web-components/base/src/decorators.js";
import { ActionButton } from "@spectrum-web-components/action-button";
import { RovingTabindexController } from "@spectrum-web-components/reactive-controllers/src/RovingTabindex.js";
import { MutationController } from "@lit-labs/observers/mutation-controller.js";
import styles from "./action-group.css.js";
const EMPTY_SELECTION = [];
export class ActionGroup extends SizedMixin(SpectrumElement, {
  validSizes: ["xs", "s", "m", "l", "xl"],
  noDefaultSize: true
}) {
  constructor() {
    super();
    this._buttons = [];
    this._buttonSelector = "sp-action-button, sp-action-menu";
    this.rovingTabindexController = new RovingTabindexController(
      this,
      {
        focusInIndex: (elements) => {
          let firstEnabledIndex = -1;
          const firstSelectedIndex = elements.findIndex((el, index) => {
            if (!elements[firstEnabledIndex] && !el.disabled) {
              firstEnabledIndex = index;
            }
            return el.selected && !el.disabled;
          });
          return elements[firstSelectedIndex] ? firstSelectedIndex : firstEnabledIndex;
        },
        elements: () => this.buttons,
        hostDelegatesFocus: true,
        isFocusableElement: (el) => !el.disabled
      }
    );
    this.compact = false;
    this.emphasized = false;
    this.justified = false;
    this.label = "";
    this.quiet = false;
    this.vertical = false;
    this._selected = EMPTY_SELECTION;
    this.hasManaged = false;
    this.manageButtons = () => {
      if (!this.slotElement) {
        return;
      }
      const assignedElements = this.slotElement.assignedElements({
        flatten: true
      });
      const buttons = assignedElements.reduce((acc, el) => {
        if (el.matches(this._buttonSelector)) {
          acc.push(el);
        } else {
          const buttonDescendents = Array.from(
            el.querySelectorAll(`:scope > ${this._buttonSelector}`)
          );
          acc.push(...buttonDescendents);
        }
        return acc;
      }, []);
      this.buttons = buttons;
      if (this.selects || !this.hasManaged) {
        const currentlySelectedButtons = [];
        this.buttons.forEach((button) => {
          if (button.selected) {
            currentlySelectedButtons.push(button.value);
          }
        });
        this.setSelected(this.selected.concat(currentlySelectedButtons));
      }
      this.manageChildren();
      this.manageSelects();
      this.hasManaged = true;
    };
    new MutationController(this, {
      config: {
        childList: true,
        subtree: true
      },
      callback: () => {
        this.manageButtons();
      },
      skipInitial: true
    });
  }
  static get styles() {
    return [styles];
  }
  set buttons(buttons) {
    if (buttons === this.buttons) return;
    this._buttons = buttons;
    this.rovingTabindexController.clearElementCache();
  }
  get buttons() {
    return this._buttons;
  }
  set selected(selected) {
    this.requestUpdate("selected", this._selected);
    this._selected = selected;
    this.updateComplete.then(() => {
      this.applySelects();
      this.manageChildren();
    });
  }
  get selected() {
    return this._selected;
  }
  dispatchChange(old) {
    const applyDefault = this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
        cancelable: true
      })
    );
    if (!applyDefault) {
      this.setSelected(old);
      this.buttons.map((button) => {
        button.selected = this.selected.includes(button.value);
      });
    }
  }
  setSelected(selected, announce) {
    if (selected === this.selected) return;
    const old = this.selected;
    this.requestUpdate("selected", old);
    this._selected = selected;
    if (!announce) return;
    this.dispatchChange(old);
  }
  focus(options) {
    this.rovingTabindexController.focus(options);
  }
  deselectSelectedButtons() {
    this.buttons.forEach((button) => {
      if (!button.selected) return;
      button.selected = false;
      button.tabIndex = -1;
      button.setAttribute(
        this.selects ? "aria-checked" : (
          /* c8 ignore */
          "aria-pressed"
        ),
        "false"
      );
    });
  }
  handleActionButtonChange(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  handleClick(event) {
    const target = event.target;
    if (typeof target.value === "undefined") {
      return;
    }
    switch (this.selects) {
      case "single": {
        this.deselectSelectedButtons();
        target.selected = true;
        target.tabIndex = 0;
        target.setAttribute("aria-checked", "true");
        this.setSelected([target.value], true);
        break;
      }
      case "multiple": {
        const selected = [...this.selected];
        target.selected = !target.selected;
        target.setAttribute(
          "aria-checked",
          target.selected ? "true" : "false"
        );
        if (target.selected) {
          selected.push(target.value);
        } else {
          selected.splice(this.selected.indexOf(target.value), 1);
        }
        this.setSelected(selected, true);
        this.buttons.forEach((button) => {
          button.tabIndex = -1;
        });
        target.tabIndex = 0;
        break;
      }
      default:
        break;
    }
  }
  async applySelects() {
    await this.manageSelects(true);
  }
  async manageSelects(applied) {
    if (!this.buttons.length) {
      return;
    }
    const options = this.buttons;
    switch (this.selects) {
      case "single": {
        this.setAttribute("role", "radiogroup");
        const selections = [];
        const updates = options.map(async (option) => {
          await option.updateComplete;
          if (option instanceof ActionButton)
            option.setAttribute("role", "radio");
          option.setAttribute(
            "aria-checked",
            option.selected ? "true" : "false"
          );
          if (option.selected) {
            selections.push(option);
          }
        });
        if (applied) break;
        await Promise.all(updates);
        const selected = selections.map((button) => {
          return button.value;
        });
        this.setSelected(selected || EMPTY_SELECTION);
        break;
      }
      case "multiple": {
        if (this.getAttribute("role") === "radiogroup") {
          this.removeAttribute("role");
        }
        const selection = [];
        const selections = [];
        const updates = options.map(async (option) => {
          await option.updateComplete;
          if (option instanceof ActionButton)
            option.setAttribute("role", "checkbox");
          option.setAttribute(
            "aria-checked",
            option.selected ? "true" : "false"
          );
          if (option.selected) {
            selection.push(option.value);
            selections.push(option);
          }
        });
        if (applied) break;
        await Promise.all(updates);
        const selected = !!selection.length ? selection : EMPTY_SELECTION;
        this.setSelected(selected);
        break;
      }
      default:
        if (this.selected.length) {
          const selections = [];
          const updates = options.map(async (option) => {
            await option.updateComplete;
            if (option instanceof ActionButton)
              option.setAttribute("role", "button");
            if (option.selected) {
              option.setAttribute("aria-pressed", "true");
              selections.push(option);
            } else {
              option.removeAttribute("aria-pressed");
            }
          });
          if (applied) break;
          await Promise.all(updates);
          this.setSelected(
            selections.map((button) => {
              return button.value;
            })
          );
        } else {
          this.buttons.forEach((option) => {
            if (option instanceof ActionButton)
              option.setAttribute("role", "button");
          });
          break;
        }
    }
    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "toolbar");
    }
  }
  render() {
    return html`
            <slot role="presentation" @slotchange=${this.manageButtons}></slot>
        `;
  }
  firstUpdated(changes) {
    super.firstUpdated(changes);
    this.addEventListener("click", this.handleClick);
  }
  updated(changes) {
    super.updated(changes);
    if (changes.has("selects")) {
      this.manageSelects();
      this.manageChildren();
      if (!!this.selects) {
        this.shadowRoot.addEventListener(
          "change",
          this.handleActionButtonChange
        );
      } else {
        this.shadowRoot.removeEventListener(
          "change",
          this.handleActionButtonChange
        );
      }
    }
    if (changes.has("quiet") || changes.has("emphasized") || changes.has("size") || changes.has("staticColor")) {
      this.manageChildren(changes);
    }
    if (changes.has("label") && (this.label || typeof changes.get("label") !== "undefined")) {
      if (this.label.length) {
        this.setAttribute("aria-label", this.label);
      } else {
        this.removeAttribute("aria-label");
      }
    }
  }
  manageChildren(changes) {
    this.buttons.forEach((button) => {
      if (this.quiet || (changes == null ? void 0 : changes.get("quiet"))) {
        button.quiet = this.quiet;
      }
      if (this.emphasized || (changes == null ? void 0 : changes.get("emphasized"))) {
        button.emphasized = this.emphasized;
      }
      if (this.staticColor || (changes == null ? void 0 : changes.get("staticColor"))) {
        button.staticColor = this.staticColor;
      }
      if (this.selects || !this.hasManaged) {
        button.selected = this.selected.includes(button.value);
      }
      if (this.size && (this.size !== "m" || typeof (changes == null ? void 0 : changes.get("size")) !== "undefined")) {
        button.size = this.size;
      }
    });
  }
}
ActionGroup.shadowRootOptions = {
  ...SpectrumElement.shadowRootOptions,
  delegatesFocus: true
};
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionGroup.prototype, "compact", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionGroup.prototype, "emphasized", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionGroup.prototype, "justified", 2);
__decorateClass([
  property({ type: String })
], ActionGroup.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionGroup.prototype, "quiet", 2);
__decorateClass([
  property({ type: String })
], ActionGroup.prototype, "selects", 2);
__decorateClass([
  property({ reflect: true, attribute: "static-color" })
], ActionGroup.prototype, "staticColor", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], ActionGroup.prototype, "vertical", 2);
__decorateClass([
  property({ type: Array })
], ActionGroup.prototype, "selected", 1);
__decorateClass([
  query("slot")
], ActionGroup.prototype, "slotElement", 2);
//# sourceMappingURL=ActionGroup.dev.js.map
